import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CampaignData {
  campaignType: string;
  tones: string[];
  arcContext: string[];
  customInput: string;
  intentCategory?: string;
  targetDApps?: string[];
  actionOrder?: string[];
  timeWindow?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignData, walletAddress } = await req.json();

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    const ANTHROPIC_BASE_URL = Deno.env.get("ANTHROPIC_BASE_URL") || "https://api.z.ai/api/anthropic";

    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const data = campaignData as CampaignData;

    const systemPrompt = `You are a Web3 social media expert creating engaging campaign captions for Arc Network DeFi users. 
Your captions should:
- Be authentic and exciting
- Include relevant emojis
- Mention @ArcFlowFinance 
- Include hashtags like #ArcNetwork #DeFi #Web3
- Be concise but impactful (under 280 characters for Twitter compatibility)
- Reflect the user's actual DeFi actions and achievements`;

    const userPrompt = `Create a social media caption for a DeFi campaign with these details:
- Campaign Type: ${data.campaignType || 'General'}
- Tones: ${data.tones?.join(', ') || 'Professional'}
- Intent Category: ${data.intentCategory || 'DeFi Activity'}
- Target dApps: ${data.targetDApps?.join(', ') || 'Arc Ecosystem'}
- Actions Completed: ${data.actionOrder?.join(' → ') || 'Exploring'}
- Time Window: ${data.timeWindow || 'Today'}
- Custom Context: ${data.customInput || 'None'}
- Wallet: ${walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Anonymous'}

Generate ONE compelling caption that celebrates this DeFi journey. Make it shareable and engaging.`;

    const response = await fetch(`${ANTHROPIC_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Z.AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const caption = result.content?.[0]?.text || "🚀 Just completed my DeFi journey on Arc Network! #ArcNetwork #DeFi";

    // Generate image prompt based on the caption
    const imagePrompt = `Web3 DeFi themed digital art: ${data.intentCategory || 'blockchain'} visualization, futuristic neon colors, Arc Network branding, abstract geometric patterns, cyber aesthetic, professional social media graphic`;

    return new Response(
      JSON.stringify({
        caption,
        imagePrompt,
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Generate caption error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate caption",
        success: false,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
