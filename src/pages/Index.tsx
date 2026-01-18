import GridBackground from "@/components/GridBackground";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ValuePropsSection from "@/components/landing/ValuePropsSection";
import DemoSection from "@/components/landing/DemoSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import TrustSection from "@/components/landing/TrustSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        {/* Add padding top for fixed header */}
        <div className="pt-20">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <DemoSection />
          <ValuePropsSection />
          <ComparisonSection />
          <SocialProofSection />
          <TrustSection />
          <FAQSection />
          <CTASection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
