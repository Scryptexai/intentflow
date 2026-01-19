import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import appPreview from "@/assets/app-preview.png";

const DemoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-intent-blue/5 to-transparent pointer-events-none" 
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          style={{ y }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            See INTENT In Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Watch how easy it is to create verified campaigns in under 2 minutes
          </motion.p>
        </motion.div>
        
        {/* Video/App Preview Container with 3D effect */}
        <motion.div
          style={{ y: imageY, scale, rotateX: rotate }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative group perspective-1000"
        >
          {/* Animated glow effect */}
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-intent-blue/20 to-accent/20 rounded-3xl blur-2xl"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* App Preview */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card/50"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={appPreview} 
              alt="INTENT App Preview - Create campaigns from on-chain actions" 
              className="w-full h-auto"
            />
            
            {/* Play button overlay */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(199 89% 48% / 0.3)",
                    "0 0 40px hsl(199 89% 48% / 0.5)",
                    "0 0 20px hsl(199 89% 48% / 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-primary"
              >
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Feature highlights below demo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground"
        >
          {[
            { color: "bg-usdc", label: "USDC Gas Fees" },
            { color: "bg-primary", label: "Sub-second Finality" },
            { color: "bg-intent-blue", label: "Arc Testnet" },
          ].map((item) => (
            <motion.div 
              key={item.label}
              className="flex items-center gap-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={`w-2 h-2 rounded-full ${item.color}`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <motion.a
            href="https://app.intent.sbs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl font-medium border border-primary/20 hover:bg-primary/20 transition-all group"
          >
            <span>Try It Yourself</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
