import { useState } from "react";
import GridBackground from "@/components/GridBackground";
import Header from "@/components/landing/Header";
import IntroAnimation from "@/components/landing/IntroAnimation";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ChainsSection from "@/components/landing/ChainsSection";
import ValuePropsSection from "@/components/landing/ValuePropsSection";
import DemoSection from "@/components/landing/DemoSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import { LiveActivityFeed } from "@/components/landing/LiveActivityFeed";
import TrustSection from "@/components/landing/TrustSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      <div className="relative min-h-screen w-full overflow-hidden">
        <GridBackground />
        
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          
          <div className="pt-16">
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <ChainsSection />
            <DemoSection />
            <ValuePropsSection />
            <ComparisonSection />
            <SocialProofSection />
            <LiveActivityFeed />
            <TrustSection />
            <FAQSection />
            <CTASection />
            <FooterSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
