import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Box } from "lucide-react";

// Import local logos for Arc Network
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
  logo: string | null;
  url: string;
  category: string;
}

interface ChainData {
  name: string;
  slug: string;
  logo: string | null;
  isLive: boolean;
  dapps: DApp[];
}

// Placeholder component for missing logos
const PlaceholderLogo = ({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-[8px]",
    md: "w-10 h-10 text-xs",
    lg: "w-12 h-12 text-sm"
  };
  
  const colors = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-purple-500",
    "from-emerald-500 to-green-500",
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  
  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center font-bold text-white`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};

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
  {
    name: "Base",
    slug: "base",
    logo: null,
    isLive: false,
    dapps: [
      { name: "Aave", description: "Lending & borrowing protocol", logo: null, url: "https://aave.com", category: "DeFi" },
      { name: "Aerodrome", description: "Central trading hub on Base", logo: null, url: "https://aerodrome.finance", category: "DEX" },
      { name: "BasePaint", description: "Collaborative art platform", logo: null, url: "https://basepaint.xyz", category: "NFT" },
      { name: "Drakula", description: "Social video platform", logo: null, url: "https://drakula.app", category: "Social" },
      { name: "Farcaster", description: "Decentralized social network", logo: null, url: "https://farcaster.xyz", category: "Social" },
      { name: "Moonwell", description: "DeFi lending protocol", logo: null, url: "https://moonwell.fi", category: "DeFi" },
      { name: "Seamless", description: "Native lending protocol", logo: null, url: "https://seamlessprotocol.com", category: "DeFi" },
      { name: "Uniswap", description: "Decentralized exchange", logo: null, url: "https://uniswap.org", category: "DEX" },
    ]
  },
  {
    name: "Rise Chain",
    slug: "rise",
    logo: null,
    isLive: false,
    dapps: [
      { name: "B3X", description: "Trading platform", logo: null, url: "#", category: "DeFi" },
      { name: "Boom", description: "Gaming ecosystem", logo: null, url: "#", category: "Gaming" },
      { name: "Centuari", description: "DeFi hub", logo: null, url: "#", category: "DeFi" },
      { name: "For The Kingdom", description: "Gaming & NFT", logo: null, url: "#", category: "Gaming" },
      { name: "Gaspump", description: "Token launchpad", logo: null, url: "#", category: "Launchpad" },
      { name: "Haifu", description: "AI trading agent", logo: null, url: "#", category: "AI" },
      { name: "Icarus", description: "DeFi protocol", logo: null, url: "#", category: "DeFi" },
      { name: "Inari", description: "NFT marketplace", logo: null, url: "#", category: "NFT" },
      { name: "Meteoro", description: "DEX aggregator", logo: null, url: "#", category: "DEX" },
      { name: "Netrum", description: "Infrastructure", logo: null, url: "#", category: "Infra" },
      { name: "Omnihub", description: "Cross-chain bridge", logo: null, url: "#", category: "Bridge" },
      { name: "Pheasant", description: "Cross-chain protocol", logo: null, url: "#", category: "Bridge" },
      { name: "Qupaca", description: "NFT & community", logo: null, url: "#", category: "NFT" },
      { name: "Riceballz", description: "Community platform", logo: null, url: "#", category: "Social" },
      { name: "Risechad", description: "Community hub", logo: null, url: "#", category: "Social" },
      { name: "RISEx", description: "Native DEX", logo: null, url: "#", category: "DEX" },
      { name: "Shiren", description: "NFT collection", logo: null, url: "#", category: "NFT" },
      { name: "Spacefox", description: "DeFi platform", logo: null, url: "#", category: "DeFi" },
      { name: "Spine", description: "Infrastructure layer", logo: null, url: "#", category: "Infra" },
      { name: "Surflayer", description: "L2 solution", logo: null, url: "#", category: "Infra" },
      { name: "ZNS", description: "Domain name service", logo: null, url: "#", category: "Identity" },
    ]
  },
  {
    name: "Soneium",
    slug: "soneium",
    logo: null,
    isLive: false,
    dapps: [
      { name: "2P2E", description: "Play-to-earn gaming", logo: null, url: "#", category: "Gaming" },
      { name: "Across", description: "Cross-chain bridge", logo: null, url: "https://across.to", category: "Bridge" },
      { name: "Evermoon", description: "Gaming platform", logo: null, url: "#", category: "Gaming" },
      { name: "Kyo Finance", description: "DeFi protocol", logo: null, url: "#", category: "DeFi" },
      { name: "Layer3", description: "Quest platform", logo: null, url: "https://layer3.xyz", category: "Quest" },
      { name: "Morpho Vaults", description: "Lending vaults", logo: null, url: "https://morpho.org", category: "DeFi" },
      { name: "RubyScore", description: "Reputation scoring", logo: null, url: "#", category: "Identity" },
      { name: "Sake Finance", description: "DeFi protocol", logo: null, url: "#", category: "DeFi" },
      { name: "SoneFi", description: "Native DeFi hub", logo: null, url: "#", category: "DeFi" },
      { name: "SoneX", description: "Native DEX", logo: null, url: "#", category: "DEX" },
      { name: "Untitled Bank", description: "Banking protocol", logo: null, url: "#", category: "DeFi" },
    ]
  },
  {
    name: "Pharos",
    slug: "pharos",
    logo: null,
    isLive: false,
    dapps: []
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
            Generate proof-of-activity from verified dApps across multiple chains
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
                    : "bg-card/30 border-border/50 opacity-70 hover:opacity-100"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {chain.logo ? (
                  <img
                    src={chain.logo}
                    alt={chain.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <PlaceholderLogo name={chain.name} size="sm" />
                )}
                <span className={`text-sm font-medium ${
                  activeChainIndex === index ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {chain.name}
                </span>
                {chain.isLive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Soon</span>
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
          {activeChain.logo ? (
            <img
              src={activeChain.logo}
              alt={activeChain.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden">
              <PlaceholderLogo name={activeChain.name} size="md" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              {activeChain.name}
              {activeChain.isLive ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Live
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Coming Soon
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeChain.dapps.length > 0 ? `${activeChain.dapps.length} dApps available` : "dApps coming soon"}
            </p>
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
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${!activeChain.isLive ? "opacity-70" : ""}`}
          >
            {activeChain.dapps.map((dapp, index) => (
              <motion.a
                key={dapp.name}
                href={dapp.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-xl bg-card/80 border border-border transition-all group hover:border-primary/30 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  {dapp.logo ? (
                    <img
                      src={dapp.logo}
                      alt={dapp.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <PlaceholderLogo name={dapp.name} size="md" />
                  )}
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
              transition={{ delay: activeChain.dapps.length * 0.03 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex flex-col items-center justify-center min-h-[120px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">+More</span>
              <span className="text-xs text-muted-foreground">Coming soon</span>
            </motion.div>

            {/* Empty state for chains with no dApps */}
            {activeChain.dapps.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-12 text-center"
              >
                <Box className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">dApps for {activeChain.name} coming soon</p>
              </motion.div>
            )}
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
