import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GlobalGlow from "@/components/GlobalGlow";
import AboutSection, {
  ToolsTechnologiesSection,
} from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import InquirySection from "@/components/InquirySection";
import Testimonials from "@/components/Testimonials";
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
        <InquirySection />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
