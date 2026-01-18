import { motion } from "framer-motion";
import { Frown, Clock, Bot } from "lucide-react";

const problems = [
  {
    icon: Frown,
    title: "Generic Farming",
    description: "Everyone posting identical \"just swapped\" tweets. You blend into noise.",
    emoji: "😕",
  },
  {
    icon: Clock,
    title: "Time-Consuming",
    description: "Manual screenshots, writing captions, designing images. 30+ minutes per post.",
    emoji: "⏱️",
  },
  {
    icon: Bot,
    title: "Low Signal",
    description: "Arc Foundation can't tell genuine users from bots. Your effort goes unnoticed.",
    emoji: "🤖",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Testnet Participation Problem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional testnet farming wastes your time and effort
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="text-4xl mb-4">{problem.emoji}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
