import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GlobalGlow from "@/components/GlobalGlow";
import AboutSection, {
  ToolsTechnologiesSection,
} from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import InquirySection from "@/components/InquirySection";
import Testimonials from "@/components/Testimonials";
import NoteSection from "@/components/NoteSection";
import FunFacts from "@/components/FunFacts";
import Footer from "@/components/Footer";
export default function Index() {
  return (
    <>
      <GlobalGlow />
      <Navigation />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ToolsTechnologiesSection />
        <ProjectsSection />
        <ServicesSection />
        <InquirySection />
        <Testimonials />
        <NoteSection />
        <FunFacts />
      </main>
      <Footer />
    </>
  );
}
