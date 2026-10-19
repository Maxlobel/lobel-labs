import {
  ArrowUpRight,
  Mountain,
  Database,
  Code2,
  Compass,
  Github,
} from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
const icons = [Mountain, Database, Code2, Compass];
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-background to-primary/5"
    >
      <div className="section-shell">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="section-title">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="section-intro mx-auto">
            A mix of things I've built for work, for clients, and just because I
            wanted to see what was possible.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={p.slug}
                className="project-card group flex flex-col rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${i % 2 ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary"}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${p.status === "Complete" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : p.status === "Beta" ? "border-secondary/30 bg-secondary/10 text-secondary" : "border-primary/30 bg-primary/10 text-primary"}`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.category}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <ul className="mb-6 mt-5 flex flex-wrap gap-2">
                  {p.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-border/60 pt-5">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/25 text-primary hover:bg-primary/10"
                  >
                    <a href={p.href || `/projects/${p.slug}`}>
                      {p.href ? "Open Après Boston" : "Explore the project"}
                      <ArrowUpRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-primary/30">
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
              View public projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
