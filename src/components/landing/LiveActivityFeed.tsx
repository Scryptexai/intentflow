import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Share2, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ActivityItem {
  id: string;
  wallet_address: string;
  action: "created" | "minted" | "shared";
  timestamp: Date;
  caption?: string;
}

const formatWallet = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const getActivityIcon = (action: string) => {
  switch (action) {
    case "created":
      return <Zap className="w-4 h-4 text-primary" />;
    case "minted":
      return <Award className="w-4 h-4 text-green-400" />;
    case "shared":
      return <Share2 className="w-4 h-4 text-blue-400" />;
    default:
      return <Activity className="w-4 h-4 text-muted-foreground" />;
  }
};

const getActivityText = (action: string) => {
  switch (action) {
    case "created":
      return "created DeFi campaign";
    case "minted":
      return "minted proof NFT";
    case "shared":
      return "shared to Twitter";
    default:
      return "activity";
  }
};

export const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial campaigns
    const fetchInitialCampaigns = async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, wallet_address, created_at, is_minted, share_count, caption")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data) {
        const mappedActivities: ActivityItem[] = data.flatMap((campaign) => {
          const items: ActivityItem[] = [
            {
              id: `${campaign.id}-created`,
              wallet_address: campaign.wallet_address,
              action: "created",
              timestamp: new Date(campaign.created_at),
              caption: campaign.caption,
            },
          ];
          
          if (campaign.is_minted) {
            items.push({
              id: `${campaign.id}-minted`,
              wallet_address: campaign.wallet_address,
              action: "minted",
              timestamp: new Date(campaign.created_at),
            });
          }
          
          if (campaign.share_count > 0) {
            items.push({
              id: `${campaign.id}-shared`,
              wallet_address: campaign.wallet_address,
              action: "shared",
              timestamp: new Date(campaign.created_at),
            });
          }
          
          return items;
        });

        setActivities(mappedActivities.slice(0, 8));
      }
      setIsLoading(false);
    };

    fetchInitialCampaigns();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("campaigns-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "campaigns",
        },
        (payload) => {
          const newCampaign = payload.new as any;
          const newActivity: ActivityItem = {
            id: `${newCampaign.id}-created`,
            wallet_address: newCampaign.wallet_address,
            action: "created",
            timestamp: new Date(newCampaign.created_at),
            caption: newCampaign.caption,
          };
          
          setActivities((prev) => [newActivity, ...prev.slice(0, 7)]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "campaigns",
        },
        (payload) => {
          const updated = payload.new as any;
          const old = payload.old as any;
          
          // Check if minted status changed
          if (updated.is_minted && !old.is_minted) {
            const mintActivity: ActivityItem = {
              id: `${updated.id}-minted-${Date.now()}`,
              wallet_address: updated.wallet_address,
              action: "minted",
              timestamp: new Date(),
            };
            setActivities((prev) => [mintActivity, ...prev.slice(0, 7)]);
          }
          
          // Check if share count increased
          if (updated.share_count > (old.share_count || 0)) {
            const shareActivity: ActivityItem = {
              id: `${updated.id}-shared-${Date.now()}`,
              wallet_address: updated.wallet_address,
              action: "shared",
              timestamp: new Date(),
            };
            setActivities((prev) => [shareActivity, ...prev.slice(0, 7)]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => [...prev]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-semibold text-foreground">Live Activity</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activities.length === 0) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-semibold text-foreground">Live Activity</h2>
          </div>
          <p className="text-center text-muted-foreground">
            No recent activity. Be the first to create a campaign!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-semibold text-foreground">Recent Campaigns Created</h2>
          <span className="text-xs text-muted-foreground ml-2">LIVE</span>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
            <AnimatePresence mode="popLayout">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-border/30 last:border-b-0"
                >
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/50">
                      {getActivityIcon(activity.action)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-primary font-medium">
                          {formatWallet(activity.wallet_address)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getActivityText(activity.action)}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
