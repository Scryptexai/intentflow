import { motion } from "framer-motion";
import { Shield, KeyRound, Lock, Github } from "lucide-react";

const stats = [
  { value: "1,247", label: "Campaigns" },
  { value: "847", label: "Proofs Minted" },
  { value: "12", label: "dApps Supported" },
];

const securityBadges = [
  { icon: Lock, text: "Smart Contracts Verified on Arc Explorer" },
  { icon: KeyRound, text: "Zero Seed Phrase Requests" },
  { icon: Shield, text: "RLS-Secured Backend" },
  { icon: Github, text: "Open Source on GitHub" },
];

const partners = [
  "Arc Network",
  "ArcFlow Finance",
  "Aave",
  "Across",
  "Alchemy",
];

const TrustSection = () => {
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
            Trusted By Arc Ecosystem
          </h2>
        </motion.div>
        
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-16"
        >
          {partners.map((partner, index) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg"
            >
              {partner}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center p-4 sm:p-6 rounded-2xl bg-card/30 border border-border">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {securityBadges.map((badge, index) => (
            <div
              key={badge.text}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-muted-foreground"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
