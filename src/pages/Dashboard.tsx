import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Activity, Settings, Eye, Share2, Plus, Zap, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { JazziconAvatar } from '@/components/JazziconAvatar';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { useWallet } from '@/contexts/WalletContext';
import { useAccessLevel } from '@/contexts/AccessLevelContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import toast from 'react-hot-toast';

type TabType = 'campaigns' | 'activity' | 'settings';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, address, truncatedAddress, balance, connect } = useWallet();
  const { accessLevel } = useAccessLevel();
  const { campaigns, activities, isLoading, isEmpty } = useDashboardData();
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');

  const tabs = [
    { id: 'campaigns' as TabType, label: 'My Campaigns', icon: LayoutGrid },
    { id: 'activity' as TabType, label: 'Activity', icon: Activity },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  const tierColors = { base: 'text-muted-foreground', active: 'text-primary', advanced: 'text-usdc' };

  // Not connected state - show connect wallet prompt
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="glass rounded-2xl p-8 border border-border/50">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-display font-bold mb-3">Connect Your Wallet</h1>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to access your dashboard, create campaigns, and track your activity on Arc Network.
                </p>
                <Button variant="gradient" size="lg" onClick={connect} className="w-full">
                  Connect Wallet
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Supports MetaMask, WalletConnect, and Coinbase Wallet
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-72 shrink-0">
              <div className="glass rounded-2xl p-6 border border-border/50 sticky top-24 space-y-6">
                <div className="text-center">
                  <JazziconAvatar address={address} diameter={64} className="mx-auto mb-3" />
                  <p className="font-medium">{truncatedAddress}</p>
                  <div className="mt-2 p-3 rounded-lg bg-usdc/10 border border-usdc/30">
                    <span className="text-2xl font-display font-bold text-usdc">{balance}</span>
                    <span className="text-sm text-usdc ml-1">USDC</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Access Level</span>
                    <Badge className={tierColors[accessLevel.tier]}>
                      {accessLevel.tier.charAt(0).toUpperCase() + accessLevel.tier.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{accessLevel.completedCampaigns} campaigns completed</p>
                  {accessLevel.nextUnlock && (
                    <>
                      <Progress value={(accessLevel.completedCampaigns / accessLevel.nextUnlock.requiresCampaigns) * 100} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">{accessLevel.nextUnlock.remaining} more to unlock {accessLevel.nextUnlock.tier}</p>
                    </>
                  )}
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer">
                    <Zap className="w-4 h-4 mr-2" />Get Testnet USDC
                  </a>
                </Button>

                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                      <tab.icon className="w-5 h-5" />{tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
              {activeTab === 'campaigns' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold">My Campaigns</h2>
                    <Button variant="gradient" onClick={() => navigate('/create')}><Plus className="w-4 h-4 mr-2" />New Campaign</Button>
                  </div>
                  {isLoading ? (
                    <div className="glass rounded-2xl p-12 border border-border/50 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : isEmpty ? <EmptyState /> : (
                    <div className="glass rounded-2xl border border-border/50 p-6">
                      <p className="text-muted-foreground">Your campaigns will appear here.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold">Activity</h2>
                  <div className="glass rounded-2xl p-6 border border-border/50">
                    <p className="text-sm text-muted-foreground text-center py-6">No activity yet. Create your first campaign to get started.</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold">Settings</h2>
                  <div className="glass rounded-2xl p-6 border border-border/50">
                    <p className="text-sm text-muted-foreground">Settings coming soon.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
