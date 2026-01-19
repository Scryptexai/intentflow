import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Check } from "lucide-react";
import comparisonGeneric from "@/assets/comparison-generic.jpg";
import comparisonIntent from "@/assets/comparison-intent.jpg";

const ComparisonSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" 
      />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            style={{ x: leftX }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="p-6 rounded-2xl bg-card/30 border border-destructive/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-4 h-4 text-destructive" />
              </motion.div>
              <h3 className="text-lg font-semibold text-destructive">Generic Farming</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                className="p-4 rounded-xl bg-background/50 border border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-muted-foreground italic">
                  "Just swapped on Arc! 🚀"
                </p>
              </motion.div>
              
              <motion.div 
                className="aspect-video rounded-xl bg-muted/20 border border-border overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={comparisonGeneric} 
                  alt="Generic farming post" 
                  className="w-full h-full object-cover opacity-80"
                />
              </motion.div>
              
              <motion.ul 
                className="space-y-2 text-sm text-muted-foreground"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.4 }
                  }
                }}
              >
                {["No dApp links", "Forgettable, blends into noise", "No proof of real activity"].map((text) => (
                  <motion.li 
                    key={text}
                    className="flex items-center gap-2"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
          
          {/* INTENT Generated */}
          <motion.div
            style={{ x: rightX }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              boxShadow: "0 20px 40px -15px hsl(199 89% 48% / 0.3)"
            }}
            className="p-6 rounded-2xl bg-card/30 border border-primary/30 glow-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Check className="w-4 h-4 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold text-primary">INTENT Generated</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                className="p-4 rounded-xl bg-background/50 border border-primary/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-foreground text-sm leading-relaxed">
                  "Just tested Arc Network's sub-second finality on @ArcFlowFinance - bridged 50 USDC via Across Protocol and executed swap to EURC in 0.8 seconds. The USDC-native gas makes fee prediction trivial. This is what institutional DeFi needs.
                  <br /><br />
                  <span className="text-primary">https://arcflow.finance</span>
                  <br />
                  <span className="text-primary">https://across.to</span>"
                </p>
              </motion.div>
              
              <motion.div 
                className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-intent-blue/20 to-accent/20 border border-primary/20 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={comparisonIntent} 
                  alt="INTENT generated campaign" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.ul 
                className="space-y-2 text-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.4 }
                  }
                }}
              >
                {[
                  "Real dApp links included",
                  "Professional, stands out",
                  "Verifiable on-chain proof"
                ].map((text) => (
                  <motion.li 
                    key={text}
                    className="flex items-center gap-2 text-foreground"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
