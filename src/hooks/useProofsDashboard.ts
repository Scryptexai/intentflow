import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';

export interface DashboardProof {
  id: string;
  campaign_id: string;
  wallet_address: string;
  status: string;
  created_at: string;
  minted_at: string | null;
  verified_at: string | null;
  intent_category: number | null;
  intent_fingerprint: string | null;
  proof_cost: number | null;
  token_id: string | null;
  tx_hash: string | null;
  metadata_hash: string | null;
  campaign: {
    id: string;
    campaign_type: string;
    caption: string;
    image_url: string | null;
    arc_context: string[];
  } | null;
}

export interface ProofStats {
  totalProofs: number;
  uniqueUsers: number;
  userProofs: number;
  verifiedCount: number;
}

export const useProofsDashboard = () => {
  const { address } = useWallet();
  const [proofs, setProofs] = useState<DashboardProof[]>([]);
  const [stats, setStats] = useState<ProofStats>({
    totalProofs: 0,
    uniqueUsers: 0,
    userProofs: 0,
    verifiedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProofs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Placeholder - will integrate with database later
      setProofs([]);
      setStats({
        totalProofs: 0,
        uniqueUsers: 0,
        userProofs: 0,
        verifiedCount: 0,
      });
    } catch (err) {
      console.error('Error fetching proofs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch proofs');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchProofs();
  }, [fetchProofs]);

  const userProofs = proofs;

  return {
    proofs,
    userProofs,
    stats,
    loading,
    error,
    refetch: fetchProofs,
  };
};
