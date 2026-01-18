import { motion } from "framer-motion";
import { Rocket, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Proof of Structured Participation
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Turn Your On-Chain Actions</span>
          <br />
          <span className="text-gradient">Into Unique Campaigns</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          <span className="text-foreground font-medium">Verify</span>
          <span className="mx-2 text-primary">•</span>
          <span className="text-foreground font-medium">Generate</span>
          <span className="mx-2 text-primary">•</span>
          <span className="text-foreground font-medium">Share</span>
          <span className="mx-2 text-primary">•</span>
          <span className="text-foreground font-medium">Prove</span>
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <motion.a
            href="https://app.intent.sbs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg glow-primary hover:bg-primary/90 transition-all"
          >
            <Rocket className="w-5 h-5" />
            <span>Launch App</span>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary/50 text-foreground rounded-xl font-medium text-lg border border-border hover:bg-secondary/70 transition-all"
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo (1:30)</span>
          </motion.button>
        </motion.div>
        
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/50 border border-border text-sm text-muted-foreground"
        >
          <div className="w-2 h-2 rounded-full bg-usdc animate-pulse" />
          <span className="font-mono">🔒 Official Arc Network Ecosystem Partner</span>
        </motion.div>
        
        {/* Chain Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground font-mono"
        >
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Built on Arc Testnet
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-intent-blue" />
            Chain ID: 5042002
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
