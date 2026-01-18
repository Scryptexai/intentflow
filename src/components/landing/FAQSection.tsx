import { motion } from "framer-motion";
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
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about INTENT
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
