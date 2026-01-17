import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface CampaignData {
  campaignType: string;
  tones: string[];
  arcContext: string[];
  customInput: string;
  imageStyle: string;
  intentCategory?: string;
  targetDApps?: string[];
  actionOrder?: string[];
  timeWindow?: string;
  dappUrls?: string[];
}

export interface GeneratedCampaign {
  id: string;
  caption: string;
  imageUrl: string | null;
  imageStatus: 'pending' | 'generating' | 'completed' | 'failed';
  captionHash?: string;
  imagePrompt?: string;
  generationMetadata?: {
    campaignType: string;
    imageStyle: string;
    targetDApps: string[];
    attempts: number;
    generatedAt: string;
    hasArcFlowMention: boolean;
    actionOrder?: string[];
    timeWindow?: string;
  };
  proof?: {
    id: string;
    txHash?: string;
    intentFingerprint?: string;
  } | null;
}

// Simple hash function for caption deduplication
async function hashCaption(caption: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(caption.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useCampaignGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateCampaign = useCallback(async (
    campaignData: CampaignData,
    walletAddress: string | null
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Simulated campaign generation
      const caption = `🚀 Just completed my DeFi journey on Arc Network!\n\nActions: ${campaignData.actionOrder?.join(' → ') || 'Exploring'}\nTarget dApps: ${campaignData.targetDApps?.join(', ') || 'Arc Ecosystem'}\n\n#ArcNetwork #DeFi #Web3`;
      
      const captionHash = await hashCaption(caption);
      const campaignId = `campaign-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      setGeneratedCampaign({
        id: campaignId,
        caption,
        imageUrl: null,
        imageStatus: 'completed',
        captionHash,
        generationMetadata: {
          campaignType: campaignData.campaignType,
          imageStyle: campaignData.imageStyle,
          targetDApps: campaignData.targetDApps || [],
          attempts: 1,
          generatedAt: new Date().toISOString(),
          hasArcFlowMention: true,
          actionOrder: campaignData.actionOrder,
          timeWindow: campaignData.timeWindow,
        }
      });

      toast.success('Caption generated!', { icon: '✍️' });
      return { success: true, campaignId };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Campaign generation failed';
      console.error('Campaign generation error:', err);
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const regenerateCampaign = useCallback(async (
    campaignData: CampaignData,
    walletAddress: string | null
  ) => {
    setGeneratedCampaign(null);
    return generateCampaign(campaignData, walletAddress);
  }, [generateCampaign]);

  const updateCaption = useCallback(async (newCaption: string) => {
    if (generatedCampaign) {
      const captionHash = await hashCaption(newCaption);
      setGeneratedCampaign({
        ...generatedCampaign,
        caption: newCaption,
        captionHash
      });
      return true;
    }
    return false;
  }, [generatedCampaign]);

  const completeCampaign = useCallback(async (
    campaignData: CampaignData,
    walletAddress: string
  ) => {
    if (!generatedCampaign) {
      throw new Error('No campaign to complete');
    }

    setIsCompleting(true);
    setError(null);

    try {
      // Simulate completion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const proofId = `proof-${Date.now()}`;
      
      setGeneratedCampaign(prev => prev ? {
        ...prev,
        proof: {
          id: proofId,
          txHash: `0x${Math.random().toString(16).slice(2)}`,
          intentFingerprint: `0x${Math.random().toString(16).slice(2)}`,
        }
      } : null);

      toast('Proof generated!', { icon: '🔒', duration: 3000 });
      
      return { id: proofId };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete campaign';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsCompleting(false);
    }
  }, [generatedCampaign]);

  const resetCampaign = useCallback(() => {
    setGeneratedCampaign(null);
    setError(null);
  }, []);

  return {
    isGenerating,
    isCompleting,
    generatedCampaign,
    error,
    generateCampaign,
    regenerateCampaign,
    updateCaption,
    completeCampaign,
    resetCampaign,
    setGeneratedCampaign
  };
}
