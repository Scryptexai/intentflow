import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Wallet, Twitter, ExternalLink } from "lucide-react";

const TWITTER_PROFILE_URL = "https://x.com/intent_sbs";

const WaitlistForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [hasFollowed, setHasFollowed] = useState(false);
  const [showFollowPrompt, setShowFollowPrompt] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleTwitterFollow = () => {
    window.open(TWITTER_PROFILE_URL, "_blank", "noopener,noreferrer");
    // Set a timeout to enable the button after user has time to follow
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
    
    // Basic wallet address validation (ETH format)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(walletAddress)) {
      return;
    }
    
    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setWalletAddress("");
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-md mx-auto space-y-4"
    >
      {/* Twitter Follow Button */}
      <div className="relative">
        <motion.button
          onClick={handleTwitterFollow}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
            hasFollowed
              ? "bg-green-500/20 border border-green-500/30 text-green-400"
              : "bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20"
          }`}
        >
          {hasFollowed ? (
            <>
              <Check className="w-5 h-5" />
              Following @intent_sbs
            </>
          ) : (
            <>
              <Twitter className="w-5 h-5" />
              Follow @intent_sbs on Twitter
              <ExternalLink className="w-4 h-4" />
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
        <div className={`relative flex items-center bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
          hasFollowed ? "border-border" : "border-muted opacity-60"
        }`}>
          <div className="pl-4">
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder={hasFollowed ? "Enter your wallet address (0x...)" : "Follow Twitter to unlock"}
            disabled={status === "loading" || status === "success" || !hasFollowed}
            className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-mono text-sm disabled:cursor-not-allowed"
          />
          
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success" || !walletAddress || !hasFollowed}
            whileHover={hasFollowed ? { scale: 1.02 } : {}}
            whileTap={hasFollowed ? { scale: 0.98 } : {}}
            className="m-2 px-6 py-2.5 bg-gradient-primary rounded-lg text-primary-foreground font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {status === "idle" && (
              <>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
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
          </motion.button>
        </div>
      </form>
      
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-primary"
        >
          You're on the list. We'll be in touch soon.
        </motion.p>
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
