import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Link, Shield, Zap, Trophy, TrendingUp } from "lucide-react";

const props = [
  {
    icon: Sparkles,
    emoji: "✨",
    title: "Every Post Is Unique",
    description: "AI analyzes YOUR specific transaction. Never generic templates.",
  },
  {
    icon: Link,
    emoji: "🔗",
    title: "Real dApp Attribution",
    description: "Every campaign includes 2-3 dApp links. @ArcFlowFinance mandatory mention.",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "On-Chain Verification",
    description: "RPC-based proof (not just tx hash submission). Anti-sybil by design.",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Sub-2-Minute Flow",
    description: "Traditional method: 30+ minutes. INTENT: 2 minutes total.",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Quality > Quantity",
    description: "100 INTENT users > 10,000 blind swaps. Arc Foundation sees the difference.",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Future-Proof",
    description: "Structured participation = better airdrop signal. Early adopters remembered.",
  },
];

const ValuePropsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ y }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Why INTENT Is Different
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Stand out from the noise with verified, unique content
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {props.map((prop, index) => (
            <motion.div
              key={prop.title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px -15px hsl(199 89% 48% / 0.25)",
                transition: { duration: 0.3 }
              }}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/40 transition-all cursor-default"
            >
              <div className="flex items-start gap-4">
                <motion.span 
                  className="text-2xl flex-shrink-0"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {prop.emoji}
                </motion.span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
