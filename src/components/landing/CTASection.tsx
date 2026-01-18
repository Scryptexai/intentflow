import { motion } from "framer-motion";
import { Rocket, Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready To Stand Out On Arc Network?
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">
            Start creating quality campaigns in 2 minutes.
          </p>
          
          <p className="text-muted-foreground mb-10">
            No credit card. No waitlist. Just connect wallet.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.a
              href="https://app.intent.sbs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg glow-primary hover:bg-primary/90 transition-all"
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
              <span>Watch 90s Demo</span>
            </motion.button>
          </div>
          
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Built for Arc Network Testnet Community
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
