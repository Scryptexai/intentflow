import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Volume2, VolumeX } from "lucide-react";
import demoVideo1 from "@/assets/demo-video-1.mp4";

const chains = [
  { name: "Arc Network", logo: "https://pbs.twimg.com/profile_images/1829565692498993154/MKbMRBP0_400x400.jpg", isLive: true },
  { name: "Pharos", logo: "https://pbs.twimg.com/profile_images/1869571083962015744/FQoHm0iW_400x400.jpg", isLive: false },
  { name: "Rise Chain", logo: "https://pbs.twimg.com/profile_images/1867542058355638273/qDQeFiED_400x400.jpg", isLive: false },
  { name: "Base", logo: "https://pbs.twimg.com/profile_images/1901719898810351616/G0qc3sEL_400x400.jpg", isLive: false },
  { name: "Soneium", logo: "https://pbs.twimg.com/profile_images/1823245800091037696/Bmou0pSL_400x400.jpg", isLive: false },
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
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
              className="text-lg sm:text-xl text-muted-foreground mb-8"
            >
              INTENT verifies swaps, bridges, and LPs — then generates 
              <span className="text-foreground font-medium"> shareable proof and campaign content.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8"
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
              className="flex flex-col items-center lg:items-start gap-4"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Supported Chains</span>
              <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
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

          {/* Right side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card/50 shadow-2xl">
              <video
                ref={videoRef}
                src={demoVideo1}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">Create verified campaigns in seconds</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
