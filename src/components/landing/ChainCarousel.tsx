import { motion } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";

// Import local logo
import arcNetworkLogo from "@/assets/logos/chains/arc-network.jpg";

interface Chain {
  name: string;
  logo: string;
  tvl: string;
  txns: string;
  users: string;
  isLive: boolean;
}

const chains: Chain[] = [
  { name: "Arc Network", logo: arcNetworkLogo, tvl: "$12M", txns: "2.5M+", users: "180K", isLive: true },
];

const ChainCarousel = () => {
  // For single chain, display as a centered card instead of carousel
  const chain = chains[0];

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
            Supported Network
          </h2>
          <p className="text-muted-foreground">
            Multi-chain activity verification • More chains coming soon
          </p>
        </motion.div>
      </div>

      <div className="flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="relative w-full max-w-sm p-6 rounded-xl border bg-card/50 border-primary/30 hover:border-primary/50 transition-all"
        >
          {/* Live badge */}
          <div className="absolute -top-2 -right-2 z-20">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </span>
          </div>

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
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mt-6"
      >
        Base, Soneium, Pharos, Rise & more coming soon
      </motion.p>
    </section>
  );
};

export default ChainCarousel;
