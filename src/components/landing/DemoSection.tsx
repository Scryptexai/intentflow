import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import demoVideo2 from "@/assets/demo-video-2.mp4";

const DemoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
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
            INTENT Action Flow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Watch the full flow: tx → verify → generate → share
          </motion.p>
        </motion.div>
        
        {/* Single Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />
          <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card/50 shadow-2xl">
            <video
              ref={videoRef}
              src={demoVideo2}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">Share proof-of-activity instantly on social media</p>
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
            { color: "bg-green-500", label: "Real-time Verification" },
            { color: "bg-primary", label: "AI Caption Generation" },
            { color: "bg-intent-blue", label: "Multi-chain Support" },
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
