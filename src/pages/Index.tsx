import { motion } from "framer-motion";
import { Activity, Shield, Sparkles, Link as LinkIcon } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import IntentLogo from "@/components/IntentLogo";
import WaitlistForm from "@/components/WaitlistForm";
import FeatureCard from "@/components/FeatureCard";
import SocialLinks from "@/components/SocialLinks";
import EcosystemDapps from "@/components/EcosystemDapps";
import LaunchAppButton from "@/components/LaunchAppButton";

const features = [
  {
    icon: Activity,
    title: "Onchain Verification",
    description: "Prove real dApp usage through blockchain transactions. No screenshots, no fake engagement.",
  },
  {
    icon: Shield,
    title: "Anti-Sybil Protection",
    description: "Campaign participation tied to actual wallet activity. Bots can't fake real transactions.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Contextual narratives and visuals generated from your verified onchain actions.",
  },
  {
    icon: LinkIcon,
    title: "Proof Credentials",
    description: "Mint cryptographic attestations of your activity. Reusable for future rewards.",
  },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <IntentLogo />
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Built on Arc
              </motion.div>
              <LaunchAppButton to="/dashboard" />
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Coming Soon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Coming Soon
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="text-foreground">From Onchain Actions</span>
              <br />
              <span className="text-gradient">to Automated Campaigns</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Campaign orchestration driven by real blockchain activity. 
              <span className="text-foreground"> No social noise.</span> No fake engagement. 
              Only verifiable onchain behavior.
            </motion.p>
            
            {/* Waitlist form */}
            <WaitlistForm />
            
            {/* Stats or trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono">Transaction-based verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-intent-blue" />
                <span className="font-mono">Anti-bot protection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono">Proof-of-activity credentials</span>
              </div>
            </motion.div>
          </div>
          
          {/* Features grid */}
          <div className="w-full max-w-5xl mx-auto mt-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-2">How It Works</h2>
              <p className="text-muted-foreground">Use dApps → Get verified → Generate content → Mint proof</p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Ecosystem dApps section */}
          <div className="w-full max-w-6xl mx-auto mt-20">
            <EcosystemDapps />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="w-full px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-sm text-muted-foreground"
            >
              Powered by{" "}
              <a href="https://twitter.com/ArcFlowFinance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @ArcFlowFinance
              </a>
            </motion.p>
            
            <SocialLinks />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
