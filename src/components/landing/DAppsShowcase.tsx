import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Loader2 } from "lucide-react";

interface DApp {
  name: string;
  description: string;
  logo: string;
  url: string;
  category: string;
}

interface ChainData {
  name: string;
  slug: string;
  logo: string;
  isLive: boolean;
  dapps: DApp[];
}

const chainsData: ChainData[] = [
  {
    name: "Arc Network",
    slug: "arc",
    logo: "https://pbs.twimg.com/profile_images/1829565692498993154/MKbMRBP0_400x400.jpg",
    isLive: true,
    dapps: [
      { name: "Lynex", description: "Native DEX on Arc", logo: "https://pbs.twimg.com/profile_images/1738269022744567808/dXM0xFP7_400x400.jpg", url: "https://lynex.fi", category: "DEX" },
      { name: "Mendi Finance", description: "Lending & Borrowing", logo: "https://pbs.twimg.com/profile_images/1643660081528766464/aWS2vk_k_400x400.jpg", url: "https://mendi.finance", category: "Lending" },
      { name: "Stargate", description: "Cross-chain bridge", logo: "https://pbs.twimg.com/profile_images/1893011402783137792/5uUB1Asg_400x400.jpg", url: "https://stargate.finance", category: "Bridge" },
      { name: "Velocore", description: "DEX with ve(3,3)", logo: "https://pbs.twimg.com/profile_images/1609158664046587906/AJzQ3gJx_400x400.jpg", url: "https://velocore.xyz", category: "DEX" },
      { name: "LayerZero", description: "Omnichain interoperability", logo: "https://pbs.twimg.com/profile_images/1905953498363576320/rbrJn-lj_400x400.jpg", url: "https://layerzero.network", category: "Infrastructure" },
    ]
  },
  {
    name: "Pharos Network",
    slug: "pharos",
    logo: "https://pbs.twimg.com/profile_images/1869571083962015744/FQoHm0iW_400x400.jpg",
    isLive: false,
    dapps: [
      { name: "SyncSwap", description: "AMM DEX", logo: "https://pbs.twimg.com/profile_images/1907877149451337728/pn-bLDUO_400x400.jpg", url: "#", category: "DEX" },
      { name: "Orbiter Finance", description: "Cross-rollup bridge", logo: "https://pbs.twimg.com/profile_images/1904524802906021890/mw9iy_E__400x400.jpg", url: "#", category: "Bridge" },
      { name: "Ambient Finance", description: "Zero-gas DEX", logo: "https://pbs.twimg.com/profile_images/1705657050915975168/jXkqOg3k_400x400.jpg", url: "#", category: "DEX" },
    ]
  },
  {
    name: "Rise Chain",
    slug: "rise",
    logo: "https://pbs.twimg.com/profile_images/1867542058355638273/qDQeFiED_400x400.jpg",
    isLive: false,
    dapps: [
      { name: "Clober", description: "Orderbook DEX", logo: "https://pbs.twimg.com/profile_images/1695098553930219521/BKfKjTcL_400x400.jpg", url: "#", category: "DEX" },
      { name: "Mitosis", description: "Liquidity protocol", logo: "https://pbs.twimg.com/profile_images/1825521931716612096/YH8sgCqD_400x400.jpg", url: "#", category: "Yield" },
      { name: "Oku Trade", description: "Uniswap interface", logo: "https://pbs.twimg.com/profile_images/1620135006682451970/68rqNqhn_400x400.jpg", url: "#", category: "DEX" },
    ]
  },
  {
    name: "DataHaven",
    slug: "datahaven",
    logo: "https://pbs.twimg.com/profile_images/1913194376966791168/f1WfOv-y_400x400.jpg",
    isLive: false,
    dapps: [
      { name: "Jumper", description: "Cross-chain aggregator", logo: "https://pbs.twimg.com/profile_images/1923047011365523456/bQZa_evq_400x400.jpg", url: "#", category: "Bridge" },
      { name: "Socket", description: "Interoperability protocol", logo: "https://pbs.twimg.com/profile_images/1706272822272798720/l-qd-iV2_400x400.jpg", url: "#", category: "Infrastructure" },
    ]
  },
  {
    name: "Soneium",
    slug: "soneium",
    logo: "https://pbs.twimg.com/profile_images/1823245800091037696/Bmou0pSL_400x400.jpg",
    isLive: false,
    dapps: [
      { name: "Velodrome", description: "Soneium native DEX", logo: "https://pbs.twimg.com/profile_images/1535006943443345410/VkkAYUZE_400x400.jpg", url: "#", category: "DEX" },
      { name: "Kyo Finance", description: "Yield aggregator", logo: "https://pbs.twimg.com/profile_images/1849061648382394368/Zn-KnJF8_400x400.jpg", url: "#", category: "Yield" },
      { name: "Beefy Finance", description: "Yield optimizer", logo: "https://pbs.twimg.com/profile_images/1740741588637966336/Cro4sW3V_400x400.jpg", url: "#", category: "Yield" },
    ]
  },
  {
    name: "Base",
    slug: "base",
    logo: "https://pbs.twimg.com/profile_images/1901719898810351616/G0qc3sEL_400x400.jpg",
    isLive: false,
    dapps: [
      { name: "Aerodrome", description: "Leading DEX on Base", logo: "https://pbs.twimg.com/profile_images/1693059707063205888/gKLIuhhn_400x400.jpg", url: "https://aerodrome.finance", category: "DEX" },
      { name: "Aave", description: "Lending & borrowing", logo: "https://pbs.twimg.com/profile_images/1925998024985546752/8l9LVVKX_400x400.jpg", url: "https://aave.com", category: "Lending" },
      { name: "Uniswap", description: "Universal swap", logo: "https://pbs.twimg.com/profile_images/1817421054597394432/oV93l9qI_400x400.jpg", url: "https://app.uniswap.org", category: "DEX" },
      { name: "Compound", description: "DeFi lending protocol", logo: "https://pbs.twimg.com/profile_images/1669398090228903937/jIaKKBwj_400x400.jpg", url: "https://compound.finance", category: "Lending" },
    ]
  },
];

const DAppsShowcase = () => {
  const [activeChainIndex, setActiveChainIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate chains
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveChainIndex((prev) => (prev + 1) % chainsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeChain = chainsData[activeChainIndex];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Supported dApps
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Generate proof-of-activity from 50+ dApps across multiple chains
          </p>
        </motion.div>

        {/* Chain Selector - Carousel Style */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {chainsData.map((chain, index) => (
              <motion.button
                key={chain.slug}
                onClick={() => {
                  setActiveChainIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
                  activeChainIndex === index
                    ? "bg-primary/10 border-primary/50"
                    : chain.isLive
                    ? "bg-card/50 border-border hover:border-primary/30"
                    : "bg-card/30 border-border/50 opacity-60"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={chain.logo}
                  alt={chain.name}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${chain.name}&background=1e293b&color=fff`;
                  }}
                />
                <span className={`text-sm font-medium ${
                  activeChainIndex === index ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {chain.name}
                </span>
                {chain.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                )}
                {!chain.isLive && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    Soon
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-1 mt-4">
            {chainsData.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeChainIndex === index ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Active Chain Header */}
        <motion.div
          key={activeChain.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <img
            src={activeChain.logo}
            alt={activeChain.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
          />
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              {activeChain.name}
              {activeChain.isLive ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Live
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Coming Soon
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{activeChain.dapps.length} dApps available</p>
          </div>
        </motion.div>

        {/* dApps Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChain.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${
              !activeChain.isLive ? "opacity-60" : ""
            }`}
          >
            {activeChain.dapps.map((dapp, index) => (
              <motion.a
                key={dapp.name}
                href={activeChain.isLive ? dapp.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={activeChain.isLive ? { y: -4, scale: 1.02 } : {}}
                className={`p-4 rounded-xl bg-card/80 border border-border transition-all group ${
                  activeChain.isLive ? "hover:border-primary/30 cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={dapp.logo}
                    alt={dapp.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${dapp.name.substring(0, 2)}&background=1e293b&color=fff`;
                    }}
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  {dapp.name}
                  {activeChain.isLive && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{dapp.description}</p>
                <div className="mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {dapp.category}
                  </span>
                </div>
              </motion.a>
            ))}

            {/* More dApps card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: activeChain.dapps.length * 0.05 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex flex-col items-center justify-center min-h-[120px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">+More</span>
              <span className="text-xs text-muted-foreground">Coming soon</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          More dApps added weekly • Request integration on Discord
        </motion.p>
      </div>
    </section>
  );
};

export default DAppsShowcase;
