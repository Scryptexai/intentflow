import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur-md opacity-30 group-focus-within:opacity-50 transition-opacity duration-300" />
        
        {/* Input container */}
        <div className="relative flex items-center bg-card border border-border rounded-xl overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-5 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-mono text-sm"
          />
          
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success" || !email}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="m-2 px-6 py-2.5 bg-gradient-primary rounded-lg text-primary-foreground font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {status === "idle" && (
              <>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </>
            )}
            {status === "loading" && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {status === "success" && (
              <>
                <Check className="w-4 h-4" />
                Joined!
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-primary mt-3"
        >
          You're on the list. We'll be in touch soon.
        </motion.p>
      )}
    </motion.form>
  );
};

export default WaitlistForm;
