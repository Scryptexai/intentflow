import { motion } from "framer-motion";
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
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Arc Community Says
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of Arc testnet users creating quality campaigns
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{testimonial.name}</span>
                      {testimonial.verified && (
                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{testimonial.handle}</span>
                  </div>
                </div>
                <Twitter className="w-5 h-5 text-muted-foreground" />
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
        </div>
        
        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://twitter.com/ArcFlowFinance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Follow @ArcFlowFinance for more</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
