import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
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
      <Navigation />
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <InquirySection />
        <Testimonials />
        <NoteSection />
        <FunFacts />
      </main>
      <Footer />
    </>
  );
}
