import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Lock } from "lucide-react";

interface Chain {
  name: string;
  logo: string;
  tvl: string;
  txns: string;
  users: string;
  isLive: boolean;
}

const chains: Chain[] = [
  { name: "Arc Network", logo: "https://pbs.twimg.com/profile_images/1829565692498993154/MKbMRBP0_400x400.jpg", tvl: "$12M", txns: "2.5M+", users: "180K", isLive: true },
  { name: "Base", logo: "https://pbs.twimg.com/profile_images/1901719898810351616/G0qc3sEL_400x400.jpg", tvl: "$8.2B", txns: "12M+", users: "2.1M", isLive: false },
  { name: "Soneium", logo: "https://pbs.twimg.com/profile_images/1823245800091037696/Bmou0pSL_400x400.jpg", tvl: "$420M", txns: "3.2M+", users: "890K", isLive: false },
  { name: "Pharos Network", logo: "https://pbs.twimg.com/profile_images/1869571083962015744/FQoHm0iW_400x400.jpg", tvl: "$85M", txns: "1.2M+", users: "210K", isLive: false },
  { name: "Rise Chain", logo: "https://pbs.twimg.com/profile_images/1867542058355638273/qDQeFiED_400x400.jpg", tvl: "$45M", txns: "890K+", users: "120K", isLive: false },
  { name: "DataHaven", logo: "https://pbs.twimg.com/profile_images/1913194376966791168/f1WfOv-y_400x400.jpg", tvl: "$28M", txns: "450K+", users: "65K", isLive: false },
  { name: "UniChain", logo: "https://pbs.twimg.com/profile_images/1792994067560685568/nfW2nQDx_400x400.jpg", tvl: "$1.8B", txns: "8.5M+", users: "1.2M", isLive: false },
  { name: "Linea", logo: "https://pbs.twimg.com/profile_images/1908893950612029440/8NZTFyFo_400x400.jpg", tvl: "$1.2B", txns: "15M+", users: "3.5M", isLive: false },
  { name: "Optimism", logo: "https://pbs.twimg.com/profile_images/1734408869498621952/QMf6Xvzk_400x400.jpg", tvl: "$5.6B", txns: "120M+", users: "4.2M", isLive: false },
];

const ChainCarousel = () => {
  const duplicatedChains = [...chains, ...chains];

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
            Multi-chain activity verification • More chains coming soon
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex gap-4"
          animate={{ x: [0, -50 * chains.length * 16] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {duplicatedChains.map((chain, index) => (
            <motion.div
              key={`${chain.name}-${index}`}
              className={`relative flex-shrink-0 w-64 p-4 rounded-xl border transition-all ${
                chain.isLive 
                  ? "bg-card/50 border-primary/30 hover:border-primary/50" 
                  : "bg-card/30 border-border"
              }`}
              whileHover={{ y: chain.isLive ? -4 : 0, scale: chain.isLive ? 1.02 : 1 }}
            >
              {/* Soon overlay for non-live chains */}
              {!chain.isLive && (
                <div className="absolute inset-0 rounded-xl bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Soon</span>
                  </div>
                </div>
              )}

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
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${chain.name}&background=1e293b&color=fff`;
                  }}
                />
                <span className="font-semibold text-foreground">{chain.name}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ChainCarousel;
