import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See The Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            Generic vs INTENT Generated
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generic Farming */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-card/30 border border-destructive/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-destructive">Generic Farming</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50 border border-border">
                <p className="text-muted-foreground italic">
                  "Just swapped on Arc! 🚀"
                </p>
              </div>
              
              <div className="aspect-video rounded-xl bg-muted/20 border border-border flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Generic placeholder image</span>
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  No dApp links
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  Forgettable, blends into noise
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  No proof of real activity
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* INTENT Generated */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-card/30 border border-primary/30 glow-primary"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary">INTENT Generated</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50 border border-primary/20">
                <p className="text-foreground text-sm leading-relaxed">
                  "Just tested Arc Network's sub-second finality on @ArcFlowFinance - bridged 50 USDC via Across Protocol and executed swap to EURC in 0.8 seconds. The USDC-native gas makes fee prediction trivial. This is what institutional DeFi needs.
                  <br /><br />
                  <span className="text-primary">https://arcflow.finance</span>
                  <br />
                  <span className="text-primary">https://across.to</span>"
                </p>
              </div>
              
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-intent-blue/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm">Custom AI-generated image</span>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  Real dApp links included
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  Professional, stands out
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  Verifiable on-chain proof
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
