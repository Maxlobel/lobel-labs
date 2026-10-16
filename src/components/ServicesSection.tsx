import { Bot, Workflow, BarChart3, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "AI setup & guidance",
    icon: Bot,
    copy: "Find useful ways to bring AI into your work or everyday life.",
    result:
      "A focused setup, reusable prompts, and a walkthrough so you can use it confidently.",
  },
  {
    title: "Workflow & technical improvements",
    icon: Workflow,
    copy: "Work through a recurring frustration or a technology problem that's slowing you down.",
    result:
      "A working improvement to your process, website, or connected tools, with a clear handoff.",
  },
  {
    title: "Analytics & reporting",
    icon: BarChart3,
    copy: "Turn scattered information into something you can trust and use.",
    result:
      "Organized data, a useful report or dashboard, and an explanation of what it tells you.",
  },
];
export default function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <p className="eyebrow">Services & consulting</p>
      <h2 className="section-title mt-3">Practical help. A clear next step.</h2>
      <p className="section-intro">
        You don't need to know which tool you need. Start with what you want to
        do or what could work better.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className="flex flex-col rounded-2xl border border-border bg-card/60 p-6"
          >
            <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.copy}
            </p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-semibold text-secondary">
                What we can work toward
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.result}
              </p>
            </div>
            <Button
              asChild
              variant="link"
              className="mt-auto justify-start px-0 pt-5 text-primary"
            >
              <a href="#request-info">
                Tell me what you have in mind
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
