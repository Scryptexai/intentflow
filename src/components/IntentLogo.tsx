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
      {/* Logo image with clear background */}
      <motion.div
        className="relative w-10 h-10 rounded-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={intentLogo}
          alt="Intent Logo"
          className="w-full h-full object-cover drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
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
