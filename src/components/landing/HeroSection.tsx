import { motion } from "framer-motion";
import { Rocket, Zap } from "lucide-react";

const chains = [
  { name: "Base", logo: "https://onchaingm.com/chains/base.jpg" },
  { name: "Soneium", logo: "https://onchaingm.com/chains/soneium.jpeg" },
  { name: "UniChain", logo: "https://onchaingm.com/chains/unichain.jpg" },
  { name: "Optimism", logo: "https://onchaingm.com/chains/optimism.svg" },
  { name: "Linea", logo: "https://onchaingm.com/chains/linea.png" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Zap className="w-4 h-4" />
          Multi-Chain On-Chain Proof System
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5"
        >
          <span className="text-foreground">Stop Yapping.</span>
          <br />
          <span className="text-gradient">Start Proving.</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Generate AI-powered campaign content from your real on-chain activity. 
          <span className="text-foreground font-medium"> For yappers, builders, and degens</span> across every chain.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <motion.a
            href="https://app.intent.sbs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all"
          >
            <Rocket className="w-5 h-5" />
            Launch App
          </motion.a>
          
          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary/50 text-foreground rounded-xl font-medium text-lg border border-border hover:bg-secondary/70 transition-all"
          >
            See How It Works
          </motion.a>
        </motion.div>
        
        {/* Supported Chains */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Supported Chains</span>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {chains.map((chain, i) => (
              <motion.div
                key={chain.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border text-sm"
              >
                <img 
                  src={chain.logo} 
                  alt={chain.name} 
                  className="w-5 h-5 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-muted-foreground">{chain.name}</span>
              </motion.div>
            ))}
            <span className="text-muted-foreground text-sm">+20 more</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
