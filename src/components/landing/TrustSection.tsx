import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, KeyRound, Lock, Github } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { value: 1247, label: "Campaigns", suffix: "" },
  { value: 847, label: "Proofs Minted", suffix: "" },
  { value: 12, label: "dApps Supported", suffix: "" },
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

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted By Arc Ecosystem
          </h2>
        </motion.div>
        
        {/* Partners with stagger animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-16"
        >
          {partners.map((partner, index) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "hsl(199 89% 48%)" }}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg cursor-default"
            >
              {partner}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Stats with animated counters */}
        <motion.div
          style={{ scale }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="text-center p-4 sm:p-6 rounded-2xl bg-card/30 border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: "hsl(199 89% 48% / 0.5)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Security Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {securityBadges.map((badge) => (
            <motion.div
              key={badge.text}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-muted-foreground hover:border-primary/30 transition-colors"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
