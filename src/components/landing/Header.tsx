import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import IntentLogo from "@/components/IntentLogo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between glass rounded-2xl px-4 sm:px-6 py-3 border border-border">
          <IntentLogo />
          
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Built on Arc
            </motion.div>
            
            <motion.a
              href="https://app.intent.sbs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors"
            >
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Launch App</span>
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
