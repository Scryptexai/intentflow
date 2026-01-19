import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this safe? Will you ask for my seed phrase?",
    answer: "Never. INTENT only connects your wallet (public address). We never request seed phrases or private keys. All transactions you approve yourself through MetaMask.",
  },
  {
    question: "How does on-chain verification work?",
    answer: "We query Arc Network RPC directly to verify your transaction (contract address, event signature, parameters). Not just tx hash.",
  },
  {
    question: "What if I don't get an airdrop?",
    answer: "INTENT isn't just for airdrops. You're building: Professional content portfolio, Network with Arc ecosystem founders, Early adopter reputation, Technical learning documentation. These have value regardless of tokens.",
  },
  {
    question: "Why is @ArcFlowFinance mandatory in every caption?",
    answer: "INTENT is built for Arc ecosystem. ArcFlow Finance is the flagship protocol. Proper attribution helps ecosystem growth.",
  },
  {
    question: "Is the AI content unique every time?",
    answer: "Yes. AI analyzes YOUR specific transaction (dApps used, amounts, timing) and generates contextual content. Never templates.",
  },
  {
    question: "Can I edit the generated content?",
    answer: "Yes! After AI generates, you can edit caption before posting. Just keep @ArcFlowFinance mention for platform integrity.",
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" 
      />
      
      <div className="max-w-3xl mx-auto relative">
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Everything you need to know about INTENT
          </motion.p>
        </motion.div>
        
        <motion.div
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card/50 border border-border rounded-xl px-6 data-[state=open]:border-primary/30 hover:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
