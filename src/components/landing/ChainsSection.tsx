import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const chains = [
  { name: "Base", logo: "https://onchaingm.com/chains/base.jpg", status: "hot" },
  { name: "Soneium", logo: "https://onchaingm.com/chains/soneium.jpeg", status: "hot" },
  { name: "UniChain", logo: "https://onchaingm.com/chains/unichain.jpg", status: "hot" },
  { name: "Linea", logo: "https://onchaingm.com/chains/linea.png", status: "hot" },
  { name: "Optimism", logo: "https://onchaingm.com/chains/optimism.svg", status: "live" },
  { name: "Ink", logo: "https://onchaingm.com/chains/logoInk.png", status: "live" },
  { name: "Plume", logo: "https://onchaingm.com/chains/plume.jpg", status: "live" },
  { name: "HyperEVM", logo: "https://onchaingm.com/chains/hyperliquid.png", status: "live" },
  { name: "World", logo: "https://onchaingm.com/chains/world.svg", status: "live" },
  { name: "Superposition", logo: "https://onchaingm.com/chains/superposition.jpg", status: "new" },
  { name: "Katana", logo: "https://onchaingm.com/chains/katana.jpg", status: "new" },
  { name: "Plasma", logo: "https://onchaingm.com/chains/Plasma.jpg", status: "new" },
];

const ChainsSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Supported Chains
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Generate proofs from your activity across the entire Web3 ecosystem
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {chains.map((chain, index) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ y: -4 }}
              className="relative p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all flex flex-col items-center gap-3 group cursor-pointer"
            >
              {chain.status === "hot" && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full">
                  HOT
                </span>
              )}
              {chain.status === "new" && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                  NEW
                </span>
              )}
              
              <img
                src={chain.logo}
                alt={chain.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${chain.name}&background=1e293b&color=fff`;
                }}
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {chain.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href="https://onchaingm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>View all chains on OnchainGM</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ChainsSection;
