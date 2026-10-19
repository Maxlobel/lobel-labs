import {
  MapPin,
  Building2,
  Mountain,
  Sailboat,
  Flag,
  CookingPot,
  Database,
  Bot,
  Code2,
} from "lucide-react";

const toolGroups = [
  {
    title: "Data & analytics",
    icon: Database,
    tools: ["Python", "SQL", "Excel", "Domo", "Power BI", "Google Analytics"],
  },
  {
    title: "AI & automation",
    icon: Bot,
    tools: ["ChatGPT", "Claude", "Make.com", "n8n"],
  },
  {
    title: "Web & development",
    icon: Code2,
    tools: ["React", "TypeScript", "Supabase", "GitHub", "WordPress"],
  },
];
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="section-shell">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="section-title">
            About <span className="text-gradient-primary">Max</span>
          </h2>
          <p className="section-intro mx-auto">
            Data analyst, AI builder, and a curious person with a lot of
            interests.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          <div className="relative order-2 flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 px-7 py-10 text-center lg:order-1 lg:min-h-96">
            <div
              aria-hidden="true"
              className="absolute h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative">
              <p className="text-sm font-medium text-primary">
                Beyond the screen
              </p>
              <p className="mt-3 text-3xl font-bold leading-tight">
                Usually building.
                <br />
                <span className="text-gradient-secondary">Always curious.</span>
              </p>
              <div className="mt-9 grid grid-cols-2 gap-x-9 gap-y-6">
                {[
                  { icon: Mountain, label: "Skiing" },
                  { icon: Flag, label: "Golf" },
                  { icon: Sailboat, label: "On the water" },
                  { icon: CookingPot, label: "Cooking" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <item.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 space-y-5 lg:order-2">
            <div className="space-y-3">
              <p className="flex items-center gap-2 font-semibold text-primary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
                Senior Analyst @ Digitas
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                South Boston, MA
              </p>
            </div>
            <div className="space-y-4 leading-relaxed text-foreground/85">
              <p>
                I'm a Senior Analyst at{" "}
                <span className="font-semibold text-primary">Digitas</span>,
                where I help Titleist turn marketing data into clear insights
                and better decisions. My work brings together analytics, client
                collaboration, and automation.
              </p>
              <p>
                I enjoy getting to the root of a problem, building something
                useful, and making it easier for people to do their best work.
                Outside my day job, I explore AI tools and build practical
                solutions for individuals and small businesses.
              </p>
              <p>
                My background spans software development, business analytics,
                and healthcare analytics. I studied Information Science at the
                University of Maryland, with a Data Science specialization and a
                minor in Entrepreneurship Technology.
              </p>
              <p className="text-muted-foreground">
                Outside work, you'll find me skiing, golfing, cooking, or
                getting out on the water. Fishing, boating, and time with
                friends are usually part of the plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ToolsTechnologiesSection() {
  return (
    <section
      className="section-shell pt-4 sm:pt-6"
      aria-labelledby="tools-heading"
    >
      <h2 id="tools-heading" className="text-center text-3xl font-bold">
        Technical Stack & <span className="text-gradient-primary">Tools</span>
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {toolGroups.map((group) => (
          <div key={group.title} className="text-center">
            <group.icon
              className="mx-auto mb-4 h-8 w-8 text-primary"
              aria-hidden="true"
            />
            <h3 className="mb-4 font-semibold">{group.title}</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {group.tools.map((tool) => (
                <li key={tool} className="badge">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
