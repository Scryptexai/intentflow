import { motion } from "framer-motion";
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
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-intent-blue mb-6 glow-primary">
                  <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-6 h-6 text-primary-foreground opacity-0 group-hover:opacity-100">
                  <step.icon className="w-full h-full" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-medium text-foreground">
              2 Minutes. Quality Signal. Competitive Advantage.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
