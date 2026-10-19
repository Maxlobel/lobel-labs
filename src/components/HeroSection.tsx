import { ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="portfolio-hero relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-ambient absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:left-1/4 sm:h-96 sm:w-96" />
        <div className="hero-ambient hero-ambient-gold absolute bottom-[16%] right-[8%] h-72 w-72 rounded-full bg-secondary/5 blur-3xl sm:right-1/4 sm:h-96 sm:w-96" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="hero-enter mb-8 flex justify-center" aria-hidden="true">
          <div className="relative">
            <Lightbulb
              className="lightbulb-apple-glow h-28 w-28 text-yellow-400 sm:h-32 sm:w-32"
              strokeWidth={1.5}
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-secondary/15 blur-xl" />
          </div>
        </div>
        <h1
          id="hero-title"
          className="hero-enter hero-enter-name text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient-primary">Max</span>{" "}
          <span className="text-gradient-secondary">Lobel</span>
        </h1>
        <p className="hero-enter hero-enter-copy mx-auto mt-5 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          Building the future with{" "}
          <span className="font-semibold text-primary">AI</span>,{" "}
          <span className="font-semibold text-primary">data</span>, and{" "}
          <span className="font-semibold text-secondary">
            creative firepower
          </span>
          .
        </p>
        <div className="hero-enter hero-enter-actions mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
          <Button asChild size="lg" className="btn-hero px-8 py-6 text-lg">
            <a href="#projects">
              Explore My Work
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-secondary px-8 py-6 text-lg"
          >
            <a href={site.booking} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>
      </div>
      <a
        href="#about"
        aria-label="Scroll to About Max"
        className="hero-enter hero-enter-actions absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-primary/30">
          <span className="mt-2 h-3 w-1 animate-bounce rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}
