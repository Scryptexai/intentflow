import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Calendar, Fingerprint, Info, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JazziconAvatar } from '@/components/JazziconAvatar';
import { useWallet } from '@/contexts/WalletContext';
import { useProofsDashboard, type DashboardProof } from '@/hooks/useProofsDashboard';
import { ProofStatsCard } from '@/components/proofs/ProofStatsCard';
import { ProofVerificationStatus } from '@/components/proofs/ProofVerificationStatus';

const Proofs: React.FC = () => {
  const { address, isConnected } = useWallet();
  const { proofs, userProofs, stats, loading } = useProofsDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');

  const displayProofs = activeTab === 'mine' ? userProofs : proofs;

  const filteredProofs = useMemo(() => {
    let result = [...displayProofs];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.campaign?.caption?.toLowerCase().includes(query) || p.wallet_address.toLowerCase().includes(query));
    }
    return result;
  }, [displayProofs, searchQuery]);

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Intent Proofs</h1>
            <p className="text-muted-foreground">On-chain record of structured participation on Arc Network</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <ProofStatsCard stats={stats} isLoading={loading} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Intent Proofs are records of participation, not collectibles.</p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'mine')} className="mb-6">
            <TabsList className="bg-card/50 border border-border/50">
              <TabsTrigger value="all">All Proofs</TabsTrigger>
              <TabsTrigger value="mine" disabled={!isConnected}>My Proofs {isConnected && `(${userProofs.length})`}</TabsTrigger>
            </TabsList>
          </Tabs>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by caption or address..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-card/50 border-border/50" />
            </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : filteredProofs.length === 0 ? (
            <div className="text-center py-20">
              <Fingerprint className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-display text-xl font-semibold mb-2">No Proofs Found</h3>
              <p className="text-muted-foreground">No completed intents have been recorded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProofs.map((proof, index) => (
                <motion.div key={proof.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card className="overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Fingerprint className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">Proof #{proof.id.slice(0, 8)}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{formatDistanceToNow(new Date(proof.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">{proof.campaign?.caption || 'No caption'}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <JazziconAvatar address={proof.wallet_address} diameter={20} />
                          <span className="text-xs text-muted-foreground font-mono">{truncateAddress(proof.wallet_address)}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs"><Eye className="w-3 h-3 mr-1" />View</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Proofs;
