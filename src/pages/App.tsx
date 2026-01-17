import { motion } from "framer-motion";
import { ArrowLeft, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import GridBackground from "@/components/GridBackground";
import IntentLogo from "@/components/IntentLogo";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/">
              <IntentLogo />
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-primary/10 border border-primary/20">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              App Coming Soon
            </h1>
            
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              The Intent campaign platform is under development. 
              Join the waitlist to be notified when we launch.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Join Waitlist
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default App;
