import Navigation from "@/components/Navigation";
import HeroSection, { WhyHireMeSection } from "@/components/HeroSection";
import AboutSection, { ToolsTechnologiesSection } from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <WhyHireMeSection />
      <AboutSection />
      <ToolsTechnologiesSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperimentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
