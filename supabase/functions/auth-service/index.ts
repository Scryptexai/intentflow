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

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();

  try {
    if (path === 'siwe-auth' && req.method === 'POST') {
      const { message, signature, address } = await req.json() as SiweAuthRequest;

      if (!message || !signature || !address) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
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
      const email = `${address.toLowerCase()}@wallet.intent.app`;
      const password = `wallet_${parsed.nonce}_${address.toLowerCase()}`;

      // Try to sign in or create user
      let session;
      const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // User doesn't exist, create one
        const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            wallet_address: address.toLowerCase(),
            auth_method: 'siwe',
          },
        });

        if (signUpError) {
          console.error('Sign up error:', signUpError);
          return new Response(
            JSON.stringify({ error: 'Failed to create user', details: signUpError.message }),
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
      } else {
        session = signInData.session;
      }

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
            wallet_address: address.toLowerCase(),
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
