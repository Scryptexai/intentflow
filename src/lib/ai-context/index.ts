// AI Context for Campaign Generation
// Imported from https://github.com/zamadye/INTENT

import constraints from './constraints.json';

export const AI_CONTEXT = {
  constraints,
  
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
  },
  
  mandatoryRules: {
    mustMention: "@ArcFlowFinance",
    mustIncludeHashtag: "#ArcNetwork",
    maxLength: 280,
    forbiddenTerms: constraints.forbiddenClaims,
    requiredTopics: constraints.mandatoryTopics
  }
};

export type AIContext = typeof AI_CONTEXT;

export function buildSystemPrompt(campaignType: string): string {
  const ctx = AI_CONTEXT;
  const typeConfig = ctx.campaignTypes[campaignType as keyof typeof ctx.campaignTypes] || ctx.campaignTypes.defi;
  
  return `You are a Web3 social media expert creating engaging campaign captions for Arc Network DeFi users.

## About Arc Network
${ctx.arcNetwork.tagline}
Key Features: ${ctx.arcNetwork.keyFeatures.join(', ')}
Backed by: ${ctx.arcNetwork.backedBy.join(', ')}

## Campaign Type: ${campaignType}
Focus: ${typeConfig.focus}
Tone: ${typeConfig.tone}

## MANDATORY RULES
1. MUST mention ${ctx.mandatoryRules.mustMention}
2. MUST include ${ctx.mandatoryRules.mustIncludeHashtag}
3. Maximum ${ctx.mandatoryRules.maxLength} characters
4. MUST reference: ${ctx.mandatoryRules.requiredTopics.join(', ')}

## FORBIDDEN - NEVER USE
${ctx.mandatoryRules.forbiddenTerms.join(', ')}

## Tone Guidelines
- 60% max hype, 40% authentic human voice
- Focus on UX improvements, not financial returns
- Be specific about Arc's unique features (USDC gas, sub-second finality)
- No FOMO tactics or unverified claims

## Available dApps
- ArcFlow Finance (@ArcFlowFinance): DeFi hub - lending, staking, yields
- Arc Bridge: Cross-chain asset bridging
- Arc Swap: Native DEX with concentrated liquidity

Generate ONE compelling caption that follows all rules above.`;
}

export function validateCaption(caption: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const ctx = AI_CONTEXT;
  
  // Check length
  if (caption.length > ctx.mandatoryRules.maxLength) {
    issues.push(`Caption exceeds ${ctx.mandatoryRules.maxLength} characters`);
  }
  
  // Check mandatory mention
  if (!caption.includes('@ArcFlowFinance')) {
    issues.push('Missing @ArcFlowFinance mention');
  }
  
  // Check hashtag
  if (!caption.includes('#ArcNetwork')) {
    issues.push('Missing #ArcNetwork hashtag');
  }
  
  // Check forbidden terms
  const lowerCaption = caption.toLowerCase();
  for (const term of ctx.mandatoryRules.forbiddenTerms) {
    if (lowerCaption.includes(term.toLowerCase())) {
      issues.push(`Contains forbidden term: "${term}"`);
    }
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

export function injectMandatoryElements(caption: string): string {
  let result = caption;
  
  // Inject @ArcFlowFinance if missing
  if (!result.includes('@ArcFlowFinance')) {
    result = result.replace(/on Arc/i, 'on @ArcFlowFinance');
    if (!result.includes('@ArcFlowFinance')) {
      result = `${result} via @ArcFlowFinance`;
    }
  }
  
  // Inject #ArcNetwork if missing
  if (!result.includes('#ArcNetwork')) {
    result = `${result} #ArcNetwork`;
  }
  
  return result.trim();
}
