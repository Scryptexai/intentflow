import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Import local logos
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

const dapps: DApp[] = [
  { name: "ArcFlow Finance", description: "Native DEX and liquidity hub of Arc Network.", logo: arcflowLogo, url: "https://arcflow.finance", category: "DEX" },
  { name: "Curve", description: "Deep liquidity for stablecoins and efficient trading.", logo: curveLogo, url: "https://curve.fi", category: "DEX" },
  { name: "MintAura", description: "NFT marketplace for creators and collectors.", logo: mintauraLogo, url: "https://mintaura.io", category: "NFT" },
  { name: "Infinity Name", description: "Web3 domain service for decentralized identity.", logo: infinityNameLogo, url: "https://infinityname.io", category: "Identity" },
  { name: "Watchoor", description: "Portfolio tracker and DeFi analytics.", logo: watchoorLogo, url: "https://watchoor.com", category: "Tools" },
  { name: "Synthra", description: "Synthetic assets and derivatives protocol.", logo: synthraLogo, url: "https://synthra.io", category: "DeFi" },
  { name: "Superface", description: "Social platform for Web3 communities.", logo: superfaceLogo, url: "https://superface.xyz", category: "Social" },
  { name: "Para", description: "Wallet infrastructure for seamless onboarding.", logo: paraLogo, url: "https://para.io", category: "Wallet" },
  { name: "Crossmint", description: "NFT checkout and minting infrastructure.", logo: crossmintLogo, url: "https://crossmint.com", category: "NFT" },
];

const DAppCard = ({ dapp, index }: { dapp: DApp; index: number }) => {
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
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center overflow-hidden shrink-0">
          <img 
            src={dapp.logo} 
            alt={`${dapp.name} logo`}
            className="w-10 h-10 rounded-lg object-cover"
          />
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
