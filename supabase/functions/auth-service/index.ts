import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { verifyMessage } from 'https://esm.sh/viem@2.44.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface SiweAuthRequest {
  message: string;
  signature: string;
  address: string;
}

// In-memory rate limiting (resets on function cold start, but provides basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // max 10 requests per minute per IP

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function getClientIp(req: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  // Fallback to a generic identifier
  return 'unknown';
}

function parseSiweMessage(message: string): { nonce: string; address: string; expirationTime?: string } | null {
  try {
    const lines = message.split('\n');
    const address = lines[1] || '';
    
    const getField = (prefix: string): string | undefined => {
      const line = lines.find(l => l.startsWith(prefix));
      return line?.replace(prefix, '').trim();
    };

    const nonce = getField('Nonce: ') || '';
    const expirationTime = getField('Expiration Time: ');

    return { nonce, address, expirationTime };
  } catch {
    return null;
  }
}

// Generate a cryptographically secure random password
function generateSecurePassword(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();

  try {
    if (path === 'siwe-auth' && req.method === 'POST') {
      // Rate limiting check
      const clientIp = getClientIp(req);
      const rateCheck = checkRateLimit(clientIp);
      
      if (!rateCheck.allowed) {
        console.warn(`Rate limit exceeded for IP: ${clientIp}`);
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again later.' }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': String(rateCheck.retryAfter || 60)
            } 
          }
        );
      }

      const { message, signature, address } = await req.json() as SiweAuthRequest;

      if (!message || !signature || !address) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Validate Ethereum address format
      const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!ethAddressRegex.test(address)) {
        return new Response(
          JSON.stringify({ error: 'Invalid Ethereum address format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Parse the SIWE message
      const parsed = parseSiweMessage(message);
      if (!parsed) {
        return new Response(
          JSON.stringify({ error: 'Invalid SIWE message format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the message address matches
      if (parsed.address.toLowerCase() !== address.toLowerCase()) {
        return new Response(
          JSON.stringify({ error: 'Address mismatch' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check expiration
      if (parsed.expirationTime && new Date(parsed.expirationTime) < new Date()) {
        return new Response(
          JSON.stringify({ error: 'Message expired' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the signature
      try {
        const isValid = await verifyMessage({
          message,
          signature: signature as `0x${string}`,
          address: address as `0x${string}`,
        });

        if (!isValid) {
          return new Response(
            JSON.stringify({ error: 'Invalid signature' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (verifyError) {
        console.error('Signature verification error:', verifyError);
        return new Response(
          JSON.stringify({ error: 'Signature verification failed' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create Supabase admin client
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

      // Generate email from wallet address for Supabase auth
      const normalizedAddress = address.toLowerCase();
      const email = `${normalizedAddress}@wallet.intent.app`;

      // Try to find existing user first
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === email);

      let session;

      if (existingUser) {
        // User exists - generate a new password and update
        const newPassword = generateSecurePassword();
        
        // Update the user's password
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          { 
            password: newPassword,
            app_metadata: {
              ...existingUser.app_metadata,
              wallet_address: normalizedAddress,
              provider: 'siwe'
            }
          }
        );

        if (updateError) {
          console.error('Password update error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to authenticate user' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Sign in with new password
        const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
          email,
          password: newPassword,
        });

        if (signInError) {
          console.error('Sign in error:', signInError);
          return new Response(
            JSON.stringify({ error: 'Failed to sign in' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        session = signInData.session;
      } else {
        // Create new user with random password
        const password = generateSecurePassword();
        
        const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            wallet_address: normalizedAddress,
            auth_method: 'siwe',
          },
          app_metadata: {
            wallet_address: normalizedAddress,
            provider: 'siwe',
          },
        });

        if (signUpError) {
          console.error('Sign up error:', signUpError);
          return new Response(
            JSON.stringify({ error: 'Failed to create user' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Sign in the newly created user
        const { data: newSignIn, error: newSignInError } = await supabaseAdmin.auth.signInWithPassword({
          email,
          password,
        });

        if (newSignInError) {
          console.error('New user sign in error:', newSignInError);
          return new Response(
            JSON.stringify({ error: 'Failed to sign in new user' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        session = newSignIn.session;
      }

      console.log(`SIWE auth successful for wallet: ${normalizedAddress}`);

      return new Response(
        JSON.stringify({
          success: true,
          session: session ? {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_in: session.expires_in,
            token_type: session.token_type,
          } : null,
          user: session?.user ? {
            id: session.user.id,
            wallet_address: normalizedAddress,
          } : null,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Health check
    if (path === 'health') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Auth service error:', error);
    // Return generic error message without internal details
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});