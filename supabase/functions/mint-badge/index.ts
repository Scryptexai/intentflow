import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return new Response(
        JSON.stringify({ success: false, error: 'Wallet address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Minting badge for wallet:', walletAddress);

    // Check if user is on waitlist
    const { data: waitlistEntry, error: fetchError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (fetchError || !waitlistEntry) {
      console.error('Waitlist fetch error:', fetchError);
      return new Response(
        JSON.stringify({ success: false, error: 'Wallet not found on waitlist' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if badge already minted
    if (waitlistEntry.badge_minted) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Badge already minted',
          badgeImageUrl: waitlistEntry.badge_image_url 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique badge ID
    const badgeId = crypto.randomUUID();
    const badgeTimestamp = new Date().toISOString();

    // Create badge metadata
    const badgeMetadata = {
      id: badgeId,
      type: 'early_access',
      wallet: walletAddress,
      issuedAt: badgeTimestamp,
      verified: true,
      version: '1.0'
    };

    console.log('Badge metadata:', badgeMetadata);

    // Update waitlist entry with badge info
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({
        badge_minted: true,
        badge_minted_at: badgeTimestamp,
        badge_image_url: null // Using local asset for now
      })
      .eq('wallet_address', walletAddress);

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update badge status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Badge minted successfully for:', walletAddress);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Badge minted successfully',
        badge: badgeMetadata
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in mint-badge function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
