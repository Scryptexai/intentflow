import { motion } from "framer-motion";
import { Frown, Clock, Ghost } from "lucide-react";

const problems = [
  {
    icon: Frown,
    title: "Generic Farming",
    description: "Everyone posting identical 'just swapped' tweets. You're lost in the noise.",
  },
  {
    icon: Clock,
    title: "Time Drain",
    description: "Screenshots, captions, designs. 30+ minutes per post that could go to building.",
  },
  {
    icon: Ghost,
    title: "Zero Proof",
    description: "Projects can't verify real users from bots. Your genuine effort goes unnoticed.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            The Web3 Participation Problem
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Traditional farming wastes your time and gets you nowhere
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
            >
              <problem.icon className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
