import { motion } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";

const chains = [
  { name: "Base", logo: "https://onchaingm.com/chains/base.jpg", tvl: "$8.2B", txns: "12M+", users: "2.1M" },
  { name: "Soneium", logo: "https://onchaingm.com/chains/soneium.jpeg", tvl: "$420M", txns: "3.2M+", users: "890K" },
  { name: "UniChain", logo: "https://onchaingm.com/chains/unichain.jpg", tvl: "$1.8B", txns: "8.5M+", users: "1.2M" },
  { name: "Linea", logo: "https://onchaingm.com/chains/linea.png", tvl: "$1.2B", txns: "15M+", users: "3.5M" },
  { name: "Optimism", logo: "https://onchaingm.com/chains/optimism.svg", tvl: "$5.6B", txns: "120M+", users: "4.2M" },
  { name: "Ink", logo: "https://onchaingm.com/chains/logoInk.png", tvl: "$180M", txns: "1.8M+", users: "420K" },
  { name: "Plume", logo: "https://onchaingm.com/chains/plume.jpg", tvl: "$95M", txns: "890K+", users: "180K" },
  { name: "HyperEVM", logo: "https://onchaingm.com/chains/hyperliquid.png", tvl: "$2.4B", txns: "45M+", users: "890K" },
  { name: "World", logo: "https://onchaingm.com/chains/world.svg", tvl: "$320M", txns: "5.2M+", users: "1.8M" },
  { name: "Superposition", logo: "https://onchaingm.com/chains/superposition.jpg", tvl: "$45M", txns: "320K+", users: "85K" },
  { name: "Katana", logo: "https://onchaingm.com/chains/katana.jpg", tvl: "$78M", txns: "1.2M+", users: "210K" },
  { name: "Plasma", logo: "https://onchaingm.com/chains/Plasma.jpg", tvl: "$56M", txns: "780K+", users: "120K" },
];

const ChainCarousel = () => {
  // Duplicate for seamless loop
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
            Live Chain Stats
          </h2>
          <p className="text-muted-foreground">
            Real-time activity across supported networks
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
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
              className="flex-shrink-0 w-64 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.02 }}
            >
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
