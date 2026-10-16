import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">
            Boston, MA · Analytics, AI & practical problem solving
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-6xl">
            Make technology{" "}
            <span className="text-gradient-primary">work for you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm Max. I help individuals and small businesses use AI, improve
            everyday workflows, and make sense of their data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#request-info">
                Find out how I can help
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#projects">
                See my work
                <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <aside className="rounded-2xl border border-border bg-card/60 p-7">
          <p className="eyebrow text-secondary">A little context</p>
          <p className="mt-4 text-xl font-semibold">
            Analyst. Builder. Someone you can talk it through with.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Senior Analyst at Digitas, working with Titleist. My background
            spans software development, business analytics, and hands-on
            technical support.
          </p>
          <a
            href="#about"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            More about me
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
}
