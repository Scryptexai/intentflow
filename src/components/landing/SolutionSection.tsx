import { motion } from "framer-motion";
import { Wallet, Shield, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    number: 1,
    title: "Do Real Transactions",
    description: "Swap, bridge, stake on any supported dApp across multiple chains.",
  },
  {
    icon: Shield,
    number: 2,
    title: "Auto-Verify On-Chain",
    description: "We verify your transaction via RPC. No screenshots needed.",
  },
  {
    icon: Sparkles,
    number: 3,
    title: "AI Generates Content",
    description: "Unique caption and image based on YOUR actual activity.",
  },
  {
    icon: Share2,
    number: 4,
    title: "Share & Mint Proof",
    description: "One-click post to X. Mint immutable proof NFT.",
  },
];

const SolutionSection = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            How INTENT Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From transaction to verified proof in 4 steps
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-intent-blue mb-4">
                <span className="text-lg font-bold text-primary-foreground">{step.number}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-lg">⚡</span>
            <span className="font-medium text-foreground">2 Minutes. Quality Signal. Competitive Edge.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
