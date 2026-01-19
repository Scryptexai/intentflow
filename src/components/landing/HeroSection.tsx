import { motion } from "framer-motion";
import { Rocket, Shield } from "lucide-react";
import HeroBackground from "./HeroBackground";

const chains = [
  { name: "Arc Network", logo: "https://pbs.twimg.com/profile_images/1829565692498993154/MKbMRBP0_400x400.jpg", isLive: true },
  { name: "Pharos", logo: "https://pbs.twimg.com/profile_images/1869571083962015744/FQoHm0iW_400x400.jpg", isLive: false },
  { name: "Rise Chain", logo: "https://pbs.twimg.com/profile_images/1867542058355638273/qDQeFiED_400x400.jpg", isLive: false },
  { name: "Base", logo: "https://pbs.twimg.com/profile_images/1901719898810351616/G0qc3sEL_400x400.jpg", isLive: false },
  { name: "Soneium", logo: "https://pbs.twimg.com/profile_images/1823245800091037696/Bmou0pSL_400x400.jpg", isLive: false },
];

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Animated Background - Verification Flow */}
      <HeroBackground />
      
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Shield className="w-4 h-4" />
          On-Chain Proof of Activity
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
        >
          <span className="text-foreground">Stop Farming Blindly.</span>
          <br />
          <span className="text-gradient">Prove Your Real On-Chain Activity.</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          INTENT verifies swaps, bridges, and LPs — then generates 
          <span className="text-foreground font-medium"> shareable proof and campaign content.</span>
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://app.intent.sbs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
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
        
      </div>
    </section>
  );
};

export default HeroSection;
