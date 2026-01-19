import { motion } from "framer-motion";
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
    description: "Every campaign links to the actual dApps you used.",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "On-Chain Verification",
    description: "RPC-based proof verification. Anti-sybil by design.",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "2-Minute Workflow",
    description: "Traditional method: 30+ minutes. INTENT: 2 minutes.",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Quality > Quantity",
    description: "Stand out from noise. Projects notice the difference.",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Future-Proof Signal",
    description: "Structured participation = better recognition.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why INTENT Is Different
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stand out from the noise with verified, unique content
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{prop.emoji}</span>
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
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
