import { MotionConfig } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen text-foreground">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <ResearchSection />
        <SkillsSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
    </div>
  </MotionConfig>
);

export default Index;
