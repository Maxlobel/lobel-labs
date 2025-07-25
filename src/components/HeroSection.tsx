import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";
import lightbulbHero from "@/assets/lightbulb-hero.jpg";
import { useRef, useState } from "react";

const HeroSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Mouse-following glow */}
      <div
        style={{
          left: mouse.x - 100,
          top: mouse.y - 100,
          opacity: 0.85,
          pointerEvents: "none",
        }}
        className="pointer-events-none fixed z-0 w-[200px] h-[200px] rounded-full bg-primary/80 blur-2xl"
      />
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
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => scrollToSection("#services")}
            >
              Hire Me
            </Button>
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
          <span>Strategic thinker with real business impact (<a href="#" className="underline text-primary hover:text-primary/80">see case study</a>)</span>
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