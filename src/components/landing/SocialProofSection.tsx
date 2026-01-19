import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Twitter, Quote } from "lucide-react";

const testimonials = [
  {
    handle: "@arc_builder_01",
    name: "Alex Chen",
    avatar: "🧑‍💻",
    content: "Finally! A tool that makes my testnet participation actually visible. No more generic 'just swapped' tweets. My Arc campaigns look professional now.",
    verified: true,
  },
  {
    handle: "@defi_explorer",
    name: "Sarah Kim",
    avatar: "👩‍🚀",
    content: "INTENT saved me hours of work. What used to take 30+ minutes now takes 2. The AI-generated captions are genuinely good and the proof NFTs are a nice touch.",
    verified: true,
  },
  {
    handle: "@web3_native",
    name: "Mike Johnson",
    avatar: "🚀",
    content: "The on-chain verification is legit. Arc Foundation can actually see I'm a real user, not a bot. This is how testnet farming should work.",
    verified: true,
  },
  {
    handle: "@arc_maxi",
    name: "Luna Nakamoto",
    avatar: "🌙",
    content: "Been using INTENT for 2 weeks. My engagement went up 3x because the content is actually unique and interesting. Highly recommend for Arc ecosystem users.",
    verified: true,
  },
];

const SocialProofSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
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
            What Arc Community Says
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Join hundreds of Arc testnet users creating quality campaigns
          </motion.p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
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
                y: -6, 
                scale: 1.02,
                boxShadow: "0 20px 40px -15px hsl(199 89% 48% / 0.2)",
                transition: { duration: 0.3 }
              }}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{testimonial.name}</span>
                      {testimonial.verified && (
                        <motion.svg 
                          className="w-4 h-4 text-primary" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </motion.svg>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{testimonial.handle}</span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                <p className="text-foreground leading-relaxed pl-4">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://twitter.com/ArcFlowFinance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Follow @ArcFlowFinance for more</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
