import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter } from "lucide-react";

interface DApp {
  name: string;
  description: string;
  logo: string;
  url: string;
  category: string;
  chain: string;
  chainLogo: string;
}

const dapps: DApp[] = [
  // Base
  { name: "Aerodrome", description: "Leading DEX on Base", logo: "https://aerodrome.finance/favicon.ico", url: "https://aerodrome.finance", category: "DEX", chain: "Base", chainLogo: "https://onchaingm.com/chains/base.jpg" },
  { name: "BaseSwap", description: "Native Base swap protocol", logo: "https://baseswap.fi/favicon.ico", url: "https://baseswap.fi", category: "DEX", chain: "Base", chainLogo: "https://onchaingm.com/chains/base.jpg" },
  { name: "Aave", description: "Lending & borrowing", logo: "https://aave.com/favicon.ico", url: "https://aave.com", category: "Lending", chain: "Base", chainLogo: "https://onchaingm.com/chains/base.jpg" },
  // Soneium
  { name: "SoneSwap", description: "Soneium native DEX", logo: "https://ui-avatars.com/api/?name=SS&background=6366f1&color=fff", url: "#", category: "DEX", chain: "Soneium", chainLogo: "https://onchaingm.com/chains/soneium.jpeg" },
  { name: "SoneLend", description: "Lending protocol", logo: "https://ui-avatars.com/api/?name=SL&background=8b5cf6&color=fff", url: "#", category: "Lending", chain: "Soneium", chainLogo: "https://onchaingm.com/chains/soneium.jpeg" },
  // UniChain
  { name: "UniSwap", description: "Universal swap", logo: "https://app.uniswap.org/favicon.ico", url: "https://app.uniswap.org", category: "DEX", chain: "UniChain", chainLogo: "https://onchaingm.com/chains/unichain.jpg" },
  { name: "UniLend", description: "UniChain lending", logo: "https://ui-avatars.com/api/?name=UL&background=ec4899&color=fff", url: "#", category: "Lending", chain: "UniChain", chainLogo: "https://onchaingm.com/chains/unichain.jpg" },
  // Linea
  { name: "SyncSwap", description: "Linea DEX", logo: "https://syncswap.xyz/favicon.ico", url: "https://syncswap.xyz", category: "DEX", chain: "Linea", chainLogo: "https://onchaingm.com/chains/linea.png" },
  { name: "LineaBank", description: "Lending on Linea", logo: "https://ui-avatars.com/api/?name=LB&background=14b8a6&color=fff", url: "#", category: "Lending", chain: "Linea", chainLogo: "https://onchaingm.com/chains/linea.png" },
  // Optimism
  { name: "Velodrome", description: "OP native DEX", logo: "https://velodrome.finance/favicon.ico", url: "https://velodrome.finance", category: "DEX", chain: "Optimism", chainLogo: "https://onchaingm.com/chains/optimism.svg" },
  { name: "Sonne Finance", description: "OP lending", logo: "https://ui-avatars.com/api/?name=SF&background=f43f5e&color=fff", url: "https://sonne.finance", category: "Lending", chain: "Optimism", chainLogo: "https://onchaingm.com/chains/optimism.svg" },
  // HyperEVM
  { name: "HyperLiquid", description: "Perps DEX", logo: "https://onchaingm.com/chains/hyperliquid.png", url: "https://hyperliquid.xyz", category: "Perps", chain: "HyperEVM", chainLogo: "https://onchaingm.com/chains/hyperliquid.png" },
];

const chains = ["All", "Base", "Soneium", "UniChain", "Linea", "Optimism", "HyperEVM"];
const categories = ["All", "DEX", "Lending", "Perps", "Bridge"];

const DAppsShowcase = () => {
  const [selectedChain, setSelectedChain] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDapps = dapps.filter((dapp) => {
    const chainMatch = selectedChain === "All" || dapp.chain === selectedChain;
    const categoryMatch = selectedCategory === "All" || dapp.category === selectedCategory;
    return chainMatch && categoryMatch;
  });

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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {/* Chain Filter */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Chain:</span>
            {chains.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  selectedChain === chain
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {chain}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-sm text-muted-foreground">Type:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-accent/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* dApps Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDapps.map((dapp) => (
              <motion.a
                key={dapp.name}
                href={dapp.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-xl bg-card/80 border border-border hover:border-primary/30 transition-all group"
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
                  <img
                    src={dapp.chainLogo}
                    alt={dapp.chain}
                    className="w-5 h-5 rounded-full object-cover absolute top-2 right-2"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  {dapp.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{dapp.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {dapp.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{dapp.chain}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDapps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            No dApps found with current filters
          </motion.div>
        )}

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
