import { motion } from "framer-motion";
import intentLogo from "@/assets/intent-logo.png";

const IntentLogo = () => {
  return (
    <motion.div
      className="relative flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo image */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={intentLogo}
          alt="Intent Logo"
          className="w-12 h-12 object-contain"
        />
        <motion.div
          className="absolute -inset-2 bg-primary/30 rounded-full blur-lg -z-10"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Logo text */}
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Intent
      </span>
    </motion.div>
  );
};

export default IntentLogo;
