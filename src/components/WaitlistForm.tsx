import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Wallet, Twitter, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import WaitlistBadge from "@/components/waitlist/WaitlistBadge";

const TWITTER_PROFILE_URL = "https://x.com/intent_sbs";

interface WaitlistEntry {
  wallet_address: string;
  twitter_followed: boolean;
  badge_minted: boolean;
  badge_image_url: string | null;
}

const WaitlistForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [hasFollowed, setHasFollowed] = useState(false);
  const [showFollowPrompt, setShowFollowPrompt] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistEntry, setWaitlistEntry] = useState<WaitlistEntry | null>(null);
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);

  // Check if wallet is already on waitlist when address changes
  useEffect(() => {
    const checkWaitlist = async () => {
      if (!walletAddress || walletAddress.length < 42) return;
      
      const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!ethAddressRegex.test(walletAddress)) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('check-waitlist', {
          body: { walletAddress }
        });
        
        if (!error && data?.isOnWaitlist) {
          setIsOnWaitlist(true);
          setWaitlistEntry(data.entry);
          setHasFollowed(true);
          setStatus("success");
        }
      } catch (e) {
        // Silently fail - user might not be on waitlist
      }
    };

    const timer = setTimeout(checkWaitlist, 500);
    return () => clearTimeout(timer);
  }, [walletAddress]);

  const handleTwitterFollow = () => {
    window.open(TWITTER_PROFILE_URL, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setHasFollowed(true);
      setShowFollowPrompt(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasFollowed) {
      setShowFollowPrompt(true);
      return;
    }
    
    if (!walletAddress) return;
    
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(walletAddress)) {
      toast.error("Please enter a valid wallet address (0x...)");
      return;
    }
    
    setStatus("loading");
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          wallet_address: walletAddress,
          twitter_followed: hasFollowed
        });
      
      if (error) {
        if (error.code === '23505') {
          toast.info("This wallet is already on the waitlist!");
          setIsOnWaitlist(true);
          // Fetch existing entry data
          const { data } = await supabase.functions.invoke('check-waitlist', {
            body: { walletAddress }
          });
          if (data?.entry) {
            setWaitlistEntry(data.entry);
          }
        } else {
          throw error;
        }
        setStatus("success");
        return;
      }
      
      setStatus("success");
      setIsOnWaitlist(true);
      setWaitlistEntry({
        wallet_address: walletAddress,
        twitter_followed: hasFollowed,
        badge_minted: false,
        badge_image_url: null
      });
      toast.success("You're on the list! Mint your Early Access Badge below.");
      
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Failed to join waitlist. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleBadgeMinted = () => {
    if (waitlistEntry) {
      setWaitlistEntry({
        ...waitlistEntry,
        badge_minted: true
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-md mx-auto space-y-4 px-2 sm:px-0"
    >
      {/* Twitter Follow Button */}
      <div className="relative">
        <motion.button
          onClick={handleTwitterFollow}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${
            hasFollowed
              ? "bg-green-500/20 border border-green-500/30 text-green-400"
              : "bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20"
          }`}
        >
          {hasFollowed ? (
            <>
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Following @intent_sbs</span>
            </>
          ) : (
            <>
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Follow @intent_sbs on Twitter</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            </>
          )}
        </motion.button>
        
        <AnimatePresence>
          {showFollowPrompt && !hasFollowed && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-7 left-0 right-0 text-center text-xs text-yellow-400"
            >
              Please follow us on Twitter first to join the waitlist
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Wallet Address Form */}
      <form onSubmit={handleSubmit} className="relative group mt-8">
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-primary rounded-xl blur-md transition-opacity duration-300 ${
          hasFollowed ? "opacity-30 group-focus-within:opacity-50" : "opacity-10"
        }`} />
        
        {/* Input container */}
        <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
          hasFollowed ? "border-border" : "border-muted opacity-60"
        }`}>
          <div className="flex items-center px-3 sm:pl-4 py-3 sm:py-0">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder={hasFollowed ? "Enter wallet address (0x...)" : "Follow Twitter to unlock"}
              disabled={status === "loading" || (status === "success" && isOnWaitlist) || !hasFollowed}
              className="flex-1 px-3 sm:px-4 py-0 sm:py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-mono text-xs sm:text-sm disabled:cursor-not-allowed w-full"
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={status === "loading" || (status === "success" && isOnWaitlist) || !walletAddress || !hasFollowed}
            whileHover={hasFollowed ? { scale: 1.02 } : {}}
            whileTap={hasFollowed ? { scale: 0.98 } : {}}
            className="m-2 px-4 sm:px-6 py-2.5 bg-gradient-primary rounded-lg text-primary-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
          >
            {status === "idle" && (
              <>
                Join Waitlist
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </>
            )}
            {status === "loading" && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {status === "success" && (
              <>
                <Check className="w-4 h-4" />
                Joined!
              </>
            )}
            {status === "error" && (
              <>
                Try Again
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </>
            )}
          </motion.button>
        </div>
      </form>
      
      {/* Success message */}
      {status === "success" && isOnWaitlist && !waitlistEntry?.badge_minted && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs sm:text-sm text-primary"
        >
          You're on the list! Mint your badge below.
        </motion.p>
      )}
      
      {/* Waitlist Badge */}
      {isOnWaitlist && walletAddress && (
        <WaitlistBadge
          walletAddress={walletAddress}
          isOnWaitlist={isOnWaitlist}
          badgeMinted={waitlistEntry?.badge_minted}
          badgeImageUrl={waitlistEntry?.badge_image_url || undefined}
          onBadgeMinted={handleBadgeMinted}
        />
      )}
      
      {!hasFollowed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          Complete the Twitter follow to unlock the waitlist form
        </motion.p>
      )}
    </motion.div>
  );
};

export default WaitlistForm;
