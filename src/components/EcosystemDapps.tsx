import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface DApp {
  name: string;
  description: string;
  logo: string;
  url: string;
  category: string;
}

const dapps: DApp[] = [
  {
    name: "ArcFlow Finance",
    description: "Native DEX and liquidity hub of Arc Network. Built for traders, trusted by communities.",
    logo: "https://arcflow.finance/favicon.ico",
    url: "https://arcflow.finance",
    category: "DEX"
  },
  {
    name: "Curve",
    description: "Deep liquidity for stablecoins and efficient trading with low slippage.",
    logo: "https://curve.fi/favicon.ico",
    url: "https://curve.fi",
    category: "DEX"
  },
  {
    name: "Fluid",
    description: "Next-gen DEX combining lending and trading in a unified liquidity layer.",
    logo: "https://fluid.instadapp.io/favicon.ico",
    url: "https://fluid.instadapp.io",
    category: "DEX"
  },
  {
    name: "Aave",
    description: "Leading DeFi lending protocol for borrowing and earning on your crypto assets.",
    logo: "https://aave.com/favicon.ico",
    url: "https://aave.com",
    category: "Lending"
  },
  {
    name: "Morpho",
    description: "Peer-to-peer layer on top of lending protocols for optimized rates.",
    logo: "https://morpho.org/favicon.ico",
    url: "https://morpho.org",
    category: "Lending"
  },
  {
    name: "Stargate",
    description: "Omnichain liquidity transport protocol for seamless cross-chain transfers.",
    logo: "https://stargate.finance/favicon.ico",
    url: "https://stargate.finance",
    category: "Bridge"
  }
];

// Individual DApp card component with proper React state for image fallback
const DAppCard = ({ dapp, index }: { dapp: DApp; index: number }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.a
      key={dapp.name}
      href={dapp.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300"
    >
      {/* Category badge */}
      <span className="absolute top-4 right-4 px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted/50 rounded">
        {dapp.category}
      </span>

      <div className="flex items-start gap-4">
        {/* Logo with safe fallback using React state */}
        <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center overflow-hidden shrink-0">
          {!imageError ? (
            <img 
              src={dapp.logo} 
              alt={`${dapp.name} logo`}
              className="w-8 h-8 object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-lg font-bold text-primary">
              {dapp.name[0]}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {dapp.name}
            </h3>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {dapp.description}
          </p>
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.a>
  );
};

const EcosystemDapps = () => {
  return (
    <section className="w-full py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 border border-primary/20 rounded-full text-primary">
          Ecosystem
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Supported dApps
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Intent tracks your interactions with the best DeFi protocols on Arc Network. 
          Real usage, real rewards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
        {dapps.map((dapp, index) => (
          <DAppCard key={dapp.name} dapp={dapp} index={index} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 text-sm text-muted-foreground"
      >
        More integrations coming soon...
      </motion.p>
    </section>
  );
};

export default EcosystemDapps;