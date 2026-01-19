import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wallet, Shield, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    number: 1,
    title: "Do Real Transaction",
    description: "Swap on ArcFlow, add liquidity, bridge via Across. Use any Arc ecosystem dApp normally.",
  },
  {
    icon: Shield,
    number: 2,
    title: "Auto-Verify On-Chain",
    description: "INTENT checks blockchain via RPC. Verifies contract, event, parameters.",
  },
  {
    icon: Sparkles,
    number: 3,
    title: "AI Generates Content",
    description: "Unique caption based on YOUR transaction. Custom image. Links to dApps used. Always includes @ArcFlowFinance.",
  },
  {
    icon: Share2,
    number: 4,
    title: "Share & Mint Proof",
    description: "One-click post to X/Twitter. Mint proof NFT (immutable record). Stand out from crowd.",
  },
];

const SolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" 
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How INTENT Changes The Game
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From transaction to verified proof in 4 simple steps
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Animated connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border/30">
            <motion.div 
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/50"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative text-center group"
              >
                {/* Step number circle */}
                <motion.div 
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-intent-blue mb-6 glow-primary"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </motion.div>
                
                {/* Icon on hover */}
                <motion.div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-intent-blue opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(199 89% 48% / 0.3)" }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡
            </motion.span>
            <span className="text-lg font-medium text-foreground">
              2 Minutes. Quality Signal. Competitive Advantage.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
