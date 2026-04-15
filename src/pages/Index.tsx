import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MetricsBanner from "@/components/MetricsBanner";
import ProjectsGrid from "@/components/ProjectsGrid";
import StickyScrollSection from "@/components/StickyScrollSection";
import TechMarquee from "@/components/TechMarquee";
import FaqSection from "@/components/FaqSection";
import FooterCta from "@/components/FooterCta";
import AchievementsSection from "@/components/AchievementsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <MetricsBanner />
        <ProjectsGrid />
        <StickyScrollSection />
        <TechMarquee />
        <AchievementsSection />
        <FaqSection />
        <FooterCta />
      </main>
    </div>
  );
};

export default Index;
