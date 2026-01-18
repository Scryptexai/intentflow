import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, RefreshCw, Shield, Calendar, Wallet, Twitter, Share2 } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import IntentLogo from "@/components/IntentLogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User, Session } from "@supabase/supabase-js";

interface WaitlistEntry {
  id: string;
  wallet_address: string;
  twitter_followed: boolean;
  badge_minted: boolean;
  badge_image_url: string | null;
  share_count: number;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          window.location.href = "/auth";
        } else {
          // Defer role check
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        window.location.href = "/auth";
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking role:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
      
      if (data) {
        fetchWaitlistData();
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWaitlistData = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setWaitlistData(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch waitlist data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <GridBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <GridBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 text-center max-w-md"
          >
            <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges. Contact the administrator to request access.
            </p>
            <div className="space-y-2">
              <Button onClick={handleLogout} variant="outline" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
              <a href="/" className="block">
                <Button variant="ghost" className="w-full">
                  Back to Home
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-border/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IntentLogo />
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground font-medium">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{waitlistData.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Twitter className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {waitlistData.filter(w => w.twitter_followed).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Twitter Follows</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {waitlistData.filter(w => w.badge_minted).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Badges Minted</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {waitlistData.reduce((acc, w) => acc + w.share_count, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Shares</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden"
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Waitlist Entries</h2>
                <Button
                  onClick={fetchWaitlistData}
                  variant="outline"
                  size="sm"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Wallet
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </div>
                      </TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Shares
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Joined
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlistData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No waitlist entries yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      waitlistData.map((entry, index) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-mono text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-mono">
                            <span className="hidden sm:inline">{entry.wallet_address}</span>
                            <span className="sm:hidden">{truncateAddress(entry.wallet_address)}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              entry.twitter_followed 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {entry.twitter_followed ? 'Followed' : 'Not Followed'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              entry.badge_minted 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {entry.badge_minted ? 'Minted' : 'Not Minted'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {entry.share_count}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatDate(entry.created_at)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
