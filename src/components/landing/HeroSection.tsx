import { motion } from "framer-motion";
import { Rocket, Zap, Shield } from "lucide-react";

const chains = [
  { name: "Arc Network", logo: "https://pbs.twimg.com/profile_images/1829565692498993154/MKbMRBP0_400x400.jpg", isLive: true },
  { name: "Pharos", logo: "https://pbs.twimg.com/profile_images/1869571083962015744/FQoHm0iW_400x400.jpg", isLive: false },
  { name: "Rise Chain", logo: "https://pbs.twimg.com/profile_images/1867542058355638273/qDQeFiED_400x400.jpg", isLive: false },
  { name: "DataHaven", logo: "https://pbs.twimg.com/profile_images/1913194376966791168/f1WfOv-y_400x400.jpg", isLive: false },
  { name: "Soneium", logo: "https://onchaingm.com/chains/soneium.jpeg", isLive: false },
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
          <Shield className="w-4 h-4" />
          On-Chain Proof of Activity
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight"
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
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
        >
          INTENT verifies swaps, bridges, and LPs — then generates 
          <span className="text-foreground font-medium"> shareable proof and campaign content.</span>
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
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${
                  chain.isLive 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-card/50 border-border opacity-60"
                }`}
              >
                <img 
                  src={chain.logo} 
                  alt={chain.name} 
                  className="w-5 h-5 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className={chain.isLive ? "text-foreground" : "text-muted-foreground"}>
                  {chain.name}
                </span>
                {chain.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                )}
              </motion.div>
            ))}
            <span className="text-muted-foreground text-sm">+more soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
