import { MapPin, Building2 } from "lucide-react";

const toolGroups = [
  {
    title: "Data & analytics",
    copy: "Cleaning information, building reports, and explaining what the numbers mean.",
    tools: ["Python", "SQL", "Excel", "Domo", "Power BI", "Google Analytics"],
  },
  {
    title: "AI & automation",
    copy: "Connecting useful tools and making repeatable work easier.",
    tools: ["ChatGPT", "Claude", "Make.com", "n8n"],
  },
  {
    title: "Web & development",
    copy: "Building and maintaining practical websites and applications.",
    tools: ["React", "TypeScript", "Supabase", "GitHub", "WordPress"],
  },
];
export default function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="eyebrow">The person behind the projects</p>
          <h2 className="section-title mt-3">About Max</h2>
          <p className="mt-5 flex items-center gap-2 text-sm text-primary">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Senior Analyst @ Digitas
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            South Boston, MA
          </p>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            I'm a Senior Analyst at Digitas, where I help Titleist turn
            marketing data into clear insights and better decisions. My work
            brings together analytics, client collaboration, and automation.
          </p>
          <p>
            I studied Information Science with a Data Science specialization at
            the University of Maryland, alongside a minor in Entrepreneurship
            Technology. Since then, I've worked across software development,
            business analytics, and healthcare analytics.
          </p>
          <p>
            I enjoy getting to the root of a problem, building something useful,
            and helping people feel comfortable using it. Outside my day job, I
            explore AI tools and help individuals and small businesses put
            technology to work.
          </p>
          <p>
            Outside work, you'll find me skiing, golfing, cooking, or getting
            out on the water. Fishing, boating, and time with friends are
            usually part of the plan.
          </p>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-9">
        <h3 className="text-xl font-semibold">Technical stack & tools</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {toolGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-primary">{group.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {group.copy}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
