import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell border-t border-border/60">
      <p className="eyebrow">Selected work</p>
      <h2 className="section-title mt-3">Things I've built and worked on.</h2>
      <p className="section-intro">
        A mix of client work, internal tools, and personal projects. Each is
        labeled with its current stage.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-2xl border border-border bg-card/50 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-sm text-muted-foreground">
                0{i + 1}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs ${p.status === "Complete" ? "border-emerald-400/30 text-emerald-300" : p.status === "Beta" ? "border-secondary/30 text-secondary" : "border-primary/30 text-primary"}`}
              >
                {p.status}
              </span>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{p.category}</p>
            <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={p.href || `/projects/${p.slug}`}
              className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
            >
              {p.href ? "Open Après Boston" : "Read project overview"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-muted-foreground underline underline-offset-4"
      >
        Browse public projects on GitHub
      </a>
    </section>
  );
}
