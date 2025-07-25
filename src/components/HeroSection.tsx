import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";
import lightbulbHero from "@/assets/lightbulb-hero.jpg";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const GlobalGlow = () => {
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [mobileGlow, setMobileGlow] = useState({ x: 0, y: 0, active: false });

  // Desktop: follow mouse globally
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Mobile: follow thumb on scroll
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      setMobileGlow({
        x: window.innerWidth * 0.8,
        y: window.scrollY + window.innerHeight * 0.8,
        active: true,
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Mobile: follow touch
  useEffect(() => {
    if (!isMobile) return;
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMobileGlow({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        });
      }
    };
    const handleTouchEnd = () => setMobileGlow((g) => ({ ...g, active: false }));
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <>
      {/* Desktop Glow */}
      {!isMobile && (
        <div
          style={{
            left: mouse.x - 100,
            top: mouse.y - 100,
            opacity: 0.25,
            pointerEvents: "none",
            position: "fixed",
            width: 200,
            height: 200,
            zIndex: 0,
          }}
          className="pointer-events-none rounded-full bg-primary/30 blur-xl"
        />
      )}
      {/* Mobile Glow */}
      {isMobile && mobileGlow.active && (
        <div
          style={{
            left: mobileGlow.x - 60,
            top: mobileGlow.y - 60,
            opacity: 0.18,
            pointerEvents: "none",
            position: "fixed",
            width: 120,
            height: 120,
            zIndex: 0,
            transition: 'opacity 0.2s, width 0.2s, height 0.2s, top 0.2s, left 0.2s',
          }}
          className="pointer-events-none rounded-full bg-primary/20 blur"
        />
      )}
    </>
  );
};

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/5"></div>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Lightbulb Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Lightbulb 
                className="w-32 h-32 text-yellow-400 lightbulb-apple-glow" 
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl pointer-events-none"></div>
            </div>
          </div>
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-gradient-primary">Max</span>{" "}
              <span className="text-gradient-secondary">Lobel</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building the future with{" "}
              <span className="text-primary font-semibold">AI</span>,{" "}
              <span className="text-primary font-semibold">data</span>, and{" "}
              <span className="text-secondary font-semibold">creative firepower</span>.
            </p>
          </div>
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button 
              size="lg" 
              className="btn-hero text-lg px-8 py-6"
              onClick={() => scrollToSection("#projects")}
            >
              Explore My Work
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-secondary text-lg px-8 py-6"
              onClick={() => scrollToSection("#contact")}
            >
              Book a Call
            </Button>
          </div>
          {/* Secondary CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {/* Removed Hire Me button */}
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// Why Teams Hire Me Section
export const WhyHireMeSection = () => (
  <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Why Teams Hire Me
      </h2>
      <ul className="space-y-6 text-lg">
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xl">⚡</span>
          <span>SQL, Python, Tableau, PowerBi, Domo, Palantir – <span className="font-semibold">technical firepower</span></span>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary font-bold text-xl">🎯</span>
          <span>Strategic thinker with real business impact</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xl">💬</span>
          <span>Excellent communicator and team player</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary font-bold text-xl">🏥</span>
          <span>Experienced in healthcare, marketing, and SaaS analytics</span>
        </li>
      </ul>
    </div>
  </section>
);