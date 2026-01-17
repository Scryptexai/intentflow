import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';

export interface Campaign {
  id: string;
  thumbnail: string | null;
  caption: string;
  type: string;
  status: string;
  createdAt: Date;
  imageUrl: string | null;
}

export interface ActivityItem {
  type: 'completed' | 'created' | 'minted';
  description: string;
  timestamp: Date;
  campaignId?: string;
}

export function useDashboardData() {
  const { address, isConnected } = useWallet();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    if (!address || !isConnected) {
      setCampaigns([]);
      setActivities([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Placeholder - will integrate with database later
      setCampaigns([]);
      setActivities([]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    activities,
    isLoading,
    error,
    refetch: fetchCampaigns,
    isEmpty: campaigns.length === 0,
  };
}
