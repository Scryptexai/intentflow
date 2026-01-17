import { motion } from "framer-motion";

const IntentLogo = () => {
  return (
    <motion.div
      className="relative flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo icon */}
      <div className="relative">
        <motion.div
          className="w-10 h-10 border-gradient rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M2 17L12 22L22 17"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            <motion.path
              d="M2 12L12 17L22 12"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(199, 89%, 48%)" />
                <stop offset="0.5" stopColor="hsl(217, 91%, 60%)" />
                <stop offset="1" stopColor="hsl(262, 83%, 58%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        <motion.div
          className="absolute -inset-1 bg-primary/20 rounded-lg blur-md -z-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Logo text */}
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Intent
      </span>
    </motion.div>
  );
};

export default IntentLogo;
