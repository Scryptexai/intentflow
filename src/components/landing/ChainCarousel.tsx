import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Import local logo
import arcNetworkLogo from "@/assets/logos/chains/arc-network.jpg";

interface Chain {
  id: string;
  name: string;
  logo: string;
  tvl: string;
  txns: string;
  users: string;
  isLive: boolean;
}

// Define all 5 chains - only Arc has logo for now
const allChains: Chain[] = [
  { id: "arc", name: "Arc Network", logo: arcNetworkLogo, tvl: "$12M", txns: "2.5M+", users: "180K", isLive: true },
  { id: "base", name: "Base", logo: "", tvl: "$8.2B", txns: "450M+", users: "12M", isLive: false },
  { id: "pharos", name: "Pharos", logo: "", tvl: "$45M", txns: "5M+", users: "320K", isLive: false },
  { id: "rise", name: "Rise Chain", logo: "", tvl: "$28M", txns: "3M+", users: "150K", isLive: false },
  { id: "soneium", name: "Soneium", logo: "", tvl: "$65M", txns: "8M+", users: "420K", isLive: false },
];

// Only show chains with logos
const chains = allChains.filter(chain => chain.logo !== "");
const comingSoonChains = allChains.filter(chain => chain.logo === "");

const ChainCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextChain = () => {
    setCurrentIndex((prev) => (prev + 1) % chains.length);
  };

  const prevChain = () => {
    setCurrentIndex((prev) => (prev - 1 + chains.length) % chains.length);
  };

  if (chains.length === 0) return null;

  const chain = chains[currentIndex];

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Supported Networks
          </h2>
          <p className="text-muted-foreground">
            Multi-chain activity verification
          </p>
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-4 px-4">
        {chains.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={prevChain}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

        <motion.div
          key={chain.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="relative w-full max-w-sm p-6 rounded-xl border bg-card/50 border-primary/30 hover:border-primary/50 transition-all"
        >
          {/* Live badge */}
          {chain.isLive && (
            <div className="absolute -top-2 -right-2 z-20">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <img
              src={chain.logo}
              alt={chain.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="font-semibold text-lg text-foreground">{chain.name}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                <TrendingUp className="w-3 h-3" />
                TVL
              </div>
              <span className="text-sm font-semibold text-foreground">{chain.tvl}</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                <Zap className="w-3 h-3" />
                TXs
              </div>
              <span className="text-sm font-semibold text-foreground">{chain.txns}</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                <Users className="w-3 h-3" />
                Users
              </div>
              <span className="text-sm font-semibold text-foreground">{chain.users}</span>
            </div>
          </div>
        </motion.div>

        {chains.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={nextChain}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Pagination dots */}
      {chains.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {chains.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}

      {comingSoonChains.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          {comingSoonChains.map(c => c.name).join(", ")} & more coming soon
        </motion.p>
      )}
    </section>
  );
};

export default ChainCarousel;
