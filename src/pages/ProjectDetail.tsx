import { useParams } from "react-router-dom";
import { projects } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <>
      <Navigation />
      <main id="main" className="section-shell max-w-4xl">
        <a href="/#projects" className="text-sm text-primary">
          Back to selected work
        </a>
        <p className="eyebrow mt-10">
          {project.category} · {project.status}
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{project.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-10 space-y-8">
          {[
            { title: "The problem", text: project.problem },
            { title: "My contribution", text: project.contribution },
            { title: "Where it stands", text: project.current },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.github && (
            <Button asChild variant="outline">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source on GitHub
              </a>
            </Button>
          )}
          <Button asChild>
            <a href="/#request-info">Discuss a similar challenge</a>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
