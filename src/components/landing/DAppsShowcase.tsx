import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";

// Import local logos
import arcNetworkLogo from "@/assets/logos/chains/arc-network.jpg";
import arcflowLogo from "@/assets/logos/arc/arcflow-finance.jpg";
import curveLogo from "@/assets/logos/arc/curve.jpg";
import mintauraLogo from "@/assets/logos/arc/mintaura.jpg";
import infinityNameLogo from "@/assets/logos/arc/infinity-name.jpg";
import watchoorLogo from "@/assets/logos/arc/watchoor.jpg";
import synthraLogo from "@/assets/logos/arc/synthra.jpg";
import superfaceLogo from "@/assets/logos/arc/superface.jpg";
import paraLogo from "@/assets/logos/arc/para.jpg";
import crossmintLogo from "@/assets/logos/arc/crossmint.jpg";

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
    logo: arcNetworkLogo,
    isLive: true,
    dapps: [
      { name: "ArcFlow Finance", description: "Native DEX & liquidity hub", logo: arcflowLogo, url: "https://arcflow.finance", category: "DEX" },
      { name: "Curve", description: "Stablecoin DEX", logo: curveLogo, url: "https://curve.fi", category: "DEX" },
      { name: "MintAura", description: "NFT marketplace", logo: mintauraLogo, url: "https://mintaura.io", category: "NFT" },
      { name: "Infinity Name", description: "Web3 domain service", logo: infinityNameLogo, url: "https://infinityname.io", category: "Identity" },
      { name: "Watchoor", description: "Portfolio tracker", logo: watchoorLogo, url: "https://watchoor.com", category: "Tools" },
      { name: "Synthra", description: "Synthetic assets", logo: synthraLogo, url: "https://synthra.io", category: "DeFi" },
      { name: "Superface", description: "Social platform", logo: superfaceLogo, url: "https://superface.xyz", category: "Social" },
      { name: "Para", description: "Wallet infrastructure", logo: paraLogo, url: "https://para.io", category: "Wallet" },
      { name: "Crossmint", description: "NFT checkout", logo: crossmintLogo, url: "https://crossmint.com", category: "NFT" },
    ]
  },
];

const DAppsShowcase = () => {
  const [activeChainIndex, setActiveChainIndex] = useState(0);

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
            Generate proof-of-activity from verified dApps on Arc Network
          </p>
        </motion.div>

        {/* Chain Selector */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {chainsData.map((chain, index) => (
              <motion.button
                key={chain.slug}
                onClick={() => setActiveChainIndex(index)}
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
                />
                <span className={`text-sm font-medium ${
                  activeChainIndex === index ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {chain.name}
                </span>
                {chain.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                )}
              </motion.button>
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
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Live
              </span>
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {activeChain.dapps.map((dapp, index) => (
              <motion.a
                key={dapp.name}
                href={dapp.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-xl bg-card/80 border border-border transition-all group hover:border-primary/30 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={dapp.logo}
                    alt={dapp.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  {dapp.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
          More chains & dApps added weekly • Request integration on Discord
        </motion.p>
      </div>
    </section>
  );
};

export default DAppsShowcase;
