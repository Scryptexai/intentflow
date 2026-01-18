import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Loader2, Check, Sparkles, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import earlyAccessBadge from "@/assets/early-access-badge.png";

interface WaitlistBadgeProps {
  walletAddress: string;
  isOnWaitlist: boolean;
  badgeMinted?: boolean;
  badgeImageUrl?: string;
  onBadgeMinted?: () => void;
}

const WaitlistBadge = ({ 
  walletAddress, 
  isOnWaitlist, 
  badgeMinted = false,
  badgeImageUrl,
  onBadgeMinted 
}: WaitlistBadgeProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(badgeMinted);
  const [showBadge, setShowBadge] = useState(false);

  const handleMintBadge = async () => {
    if (!walletAddress || !isOnWaitlist) return;
    
    setIsMinting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mint-badge', {
        body: { walletAddress }
      });
      
      if (error) throw error;
      
      if (data?.success) {
        setMinted(true);
        setShowBadge(true);
        toast.success("Early Access Badge minted successfully!");
        onBadgeMinted?.();
      } else {
        throw new Error(data?.error || "Failed to mint badge");
      }
    } catch (error: any) {
      console.error("Error minting badge:", error);
      toast.error(error.message || "Failed to mint badge. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  const handleDownloadBadge = () => {
    const link = document.createElement('a');
    link.href = badgeImageUrl || earlyAccessBadge;
    link.download = `intent-early-access-${walletAddress.slice(0, 8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOnWaitlist) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur-lg opacity-30" />
        
        <div className="relative bg-card border border-border rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Award className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Early Access Badge</h3>
              <p className="text-xs text-muted-foreground">Proof of waitlist membership</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {minted || badgeMinted ? (
              <motion.div
                key="minted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                {/* Badge Preview */}
                <div 
                  className="relative aspect-square max-w-[200px] sm:max-w-[240px] mx-auto cursor-pointer group"
                  onClick={() => setShowBadge(true)}
                >
                  <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                  <img
                    src={badgeImageUrl || earlyAccessBadge}
                    alt="Early Access Badge"
                    className="relative w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Success message */}
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Badge Verified</span>
                </div>

                {/* Wallet address */}
                <div className="bg-background/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Issued to</p>
                  <p className="font-mono text-xs sm:text-sm text-foreground truncate">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>

                {/* Download button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadBadge}
                  className="w-full py-3 rounded-lg bg-secondary border border-border text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Badge
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="not-minted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                {/* Badge Preview (grayed out) */}
                <div className="relative aspect-square max-w-[160px] sm:max-w-[200px] mx-auto opacity-50 grayscale">
                  <img
                    src={earlyAccessBadge}
                    alt="Early Access Badge Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Mint your exclusive badge as proof of early access
                </p>

                {/* Mint button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMintBadge}
                  disabled={isMinting}
                  className="w-full py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      Mint Badge
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full screen badge modal */}
      <AnimatePresence>
        {showBadge && (minted || badgeMinted) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBadge(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full"
            >
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-xl opacity-50" />
              <img
                src={badgeImageUrl || earlyAccessBadge}
                alt="Early Access Badge"
                className="relative w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="font-mono text-xs text-white/70 bg-black/50 rounded-lg py-2 px-3">
                  {walletAddress}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WaitlistBadge;
