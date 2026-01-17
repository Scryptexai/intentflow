import { motion } from "framer-motion";
import intentLogo from "@/assets/intent-logo.png";

const GridBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-background opacity-40" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      
      {/* Animated floating logos */}
      {[...Array(6)].map((_, i) => (
        <motion.img
          key={i}
          src={intentLogo}
          alt=""
          className="absolute w-16 h-16 opacity-10"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Onchain animated elements - flowing lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {/* Horizontal flowing lines representing transactions */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0%"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="20 40"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [-60, 60] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Vertical connecting lines */}
        {[...Array(4)].map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${25 + i * 20}%`}
            y1="0%"
            x2={`${25 + i * 20}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="15 30"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [45, -45] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Social media node circles */}
        {[
          { cx: "20%", cy: "30%", icon: "twitter" },
          { cx: "80%", cy: "25%", icon: "wallet" },
          { cx: "70%", cy: "70%", icon: "chain" },
          { cx: "30%", cy: "75%", icon: "link" },
          { cx: "50%", cy: "50%", icon: "hub" },
        ].map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="8"
              fill="none"
              stroke="url(#nodeGradient)"
              strokeWidth="2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="hsl(199, 89%, 48%)"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          </motion.g>
        ))}
        
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Connection lines between nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M 20% 30% Q 35% 40% 50% 50% T 80% 25%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="10 20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M 30% 75% Q 40% 60% 50% 50% T 70% 70%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="10 20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
      
      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-intent-blue/15 rounded-full blur-[80px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default GridBackground;
