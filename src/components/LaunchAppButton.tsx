import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface LaunchAppButtonProps {
  to?: string;
  external?: boolean;
}

const LaunchAppButton = ({ to = "/app", external = false }: LaunchAppButtonProps) => {
  const buttonContent = (
    <>
      <Rocket className="w-4 h-4" />
      Launch App
    </>
  );

  if (external && to) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-primary rounded-lg text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-primary rounded-lg text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
      >
        {buttonContent}
      </Link>
    </motion.div>
  );
};

export default LaunchAppButton;
