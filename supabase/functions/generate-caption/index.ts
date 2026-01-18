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

// AI Context from GitHub repo: https://github.com/zamadye/INTENT
const AI_CONTEXT = {
  arcNetwork: {
    name: "Arc Network",
    tagline: "Economic OS for the internet",
    chainId: 5042002,
    rpcUrl: "https://rpc.testnet.arc.network",
    explorer: "https://testnet.arcscan.app",
    nativeGas: "USDC",
    keyFeatures: [
      "USDC as native gas - no volatility",
      "Sub-second deterministic finality",
      "Full EVM compatibility",
      "Stable transaction fees"
    ],
    backedBy: ["Circle", "BlackRock", "Chainlink"]
  },
  
  dapps: {
    arcflow: {
      name: "ArcFlow Finance",
      twitter: "@ArcFlowFinance",
      url: "https://arcflow.finance",
      category: "DeFi",
      actions: ["deposit", "withdraw", "stake", "unstake", "claim_rewards", "borrow", "repay"]
    },
    arcBridge: {
      name: "Arc Bridge",
      url: "https://bridge.arc.network",
      category: "Bridge",
      actions: ["bridge_in", "bridge_out", "claim_bridged"]
    },
    arcSwap: {
      name: "Arc Swap",
      url: "https://swap.arc.network",
      category: "Trading",
      actions: ["swap", "add_liquidity", "remove_liquidity", "collect_fees"]
    }
  },
  
  mandatoryRules: {
    mustMention: "@ArcFlowFinance",
    mustIncludeHashtag: "#ArcNetwork",
    maxLength: 280,
    requiredTopics: ["Arc Network", "USDC gas"],
    forbiddenTerms: [
      "airdrop guaranteed", "profit", "price increase", "guaranteed returns",
      "financial advice", "10x", "100x", "moon", "lambo", "rich", "free money",
      "investment advice", "NFA", "not financial advice", "confirmed airdrop",
      "easy money", "risk free", "guaranteed yield"
    ]
  },
  
  campaignTypes: {
    defi: {
      focus: "DeFi opportunities on Arc",
      requiredMention: "@ArcFlowFinance",
      tone: "Educational, specific benefits",
      avoid: ["financial promises", "airdrop claims", "price speculation"]
    },
    builder: {
      focus: "Developer experience and tooling",
      hashtags: ["#ArcNetwork", "#BuildOnArc"],
      tone: "Technical, authentic dev experience",
      avoid: ["unverified performance claims", "FOMO tactics"]
    },
    social: {
      focus: "Community and human stories",
      tone: "Authentic, inclusive, curious",
      avoid: ["false promises", "gatekeeping", "insider language"]
    }
  }
};

function buildSystemPrompt(campaignType: string): string {
  const ctx = AI_CONTEXT;
  const typeConfig = ctx.campaignTypes[campaignType as keyof typeof ctx.campaignTypes] || ctx.campaignTypes.defi;
  
  return `You are a Web3 social media expert creating engaging campaign captions for Arc Network DeFi users.

## About Arc Network
${ctx.arcNetwork.tagline} - A purpose-built EVM-compatible Layer-1 blockchain designed for stablecoin finance.
Key Features: ${ctx.arcNetwork.keyFeatures.join(', ')}
Backed by: ${ctx.arcNetwork.backedBy.join(', ')}

## Campaign Type: ${campaignType}
Focus: ${typeConfig.focus}
Tone: ${typeConfig.tone}

## MANDATORY RULES - MUST FOLLOW
1. MUST mention ${ctx.mandatoryRules.mustMention} in EVERY caption
2. MUST include ${ctx.mandatoryRules.mustIncludeHashtag} hashtag
3. Maximum ${ctx.mandatoryRules.maxLength} characters total
4. MUST reference one of: ${ctx.mandatoryRules.requiredTopics.join(' or ')}

## FORBIDDEN TERMS - NEVER USE THESE
${ctx.mandatoryRules.forbiddenTerms.join(', ')}

## Tone Guidelines
- 60% max hype, 40% authentic human voice
- Focus on UX improvements and real benefits, NOT financial returns
- Be specific about Arc's unique features (USDC gas, sub-second finality)
- No FOMO tactics, no unverified claims, no price speculation
- Use relevant emojis sparingly (1-3 max)

## Available dApps to Reference
- ArcFlow Finance (@ArcFlowFinance): DeFi hub - lending, staking, yields
- Arc Bridge (bridge.arc.network): Cross-chain asset bridging  
- Arc Swap (swap.arc.network): Native DEX with concentrated liquidity

Generate ONE compelling, authentic caption that strictly follows ALL rules above. The caption must feel genuine and human, not corporate or over-hyped.`;
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
    const campaignType = data.campaignType || 'defi';
    const systemPrompt = buildSystemPrompt(campaignType);

    const userPrompt = `Create a social media caption for this specific DeFi campaign:

Campaign Details:
- Type: ${data.campaignType || 'General DeFi'}
- Tones: ${data.tones?.join(', ') || 'Professional, Authentic'}
- Intent Category: ${data.intentCategory || 'DeFi Activity'}
- Target dApps: ${data.targetDApps?.join(', ') || 'ArcFlow Finance'}
- Actions Completed: ${data.actionOrder?.join(' → ') || 'Exploring the ecosystem'}
- Time Window: ${data.timeWindow || 'Today'}
- User Context: ${data.customInput || 'General Arc Network exploration'}
- Wallet: ${walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Anonymous user'}

Remember: 
- MUST include @ArcFlowFinance 
- MUST include #ArcNetwork
- Max 280 characters
- Be authentic and human, not corporate
- Focus on the specific actions/journey described above

Generate ONE caption now:`;

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
    let caption = result.content?.[0]?.text || "";
    
    // Validate and fix caption if needed
    if (!caption.includes('@ArcFlowFinance')) {
      caption = caption.replace(/on Arc/i, 'on @ArcFlowFinance');
      if (!caption.includes('@ArcFlowFinance')) {
        caption = `${caption} via @ArcFlowFinance`;
      }
    }
    
    if (!caption.includes('#ArcNetwork')) {
      caption = `${caption} #ArcNetwork`;
    }
    
    // Trim to max length
    if (caption.length > 280) {
      caption = caption.substring(0, 277) + '...';
    }

    // Generate image prompt based on campaign type and context
    const imagePrompt = `Web3 DeFi themed digital art for ${data.intentCategory || 'blockchain'}: 
    futuristic finance visualization, neon cyan (#00D9FF) and dark blue (#0A0E27) color scheme, 
    Arc Network branding style, abstract geometric patterns representing ${data.actionOrder?.join(' and ') || 'DeFi activities'}, 
    cyber aesthetic, clean modern fintech design, professional social media graphic, 
    no text overlays, no human faces, innovative technology visualization`;

    return new Response(
      JSON.stringify({
        caption: caption.trim(),
        imagePrompt,
        success: true,
        metadata: {
          campaignType,
          hasArcFlowMention: caption.includes('@ArcFlowFinance'),
          hasHashtag: caption.includes('#ArcNetwork'),
          length: caption.length
        }
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
