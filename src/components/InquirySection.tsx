import { useState } from "react";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";
import ConsultingIntake, {
  type IntakePath,
} from "@/components/ConsultingIntake";
import { site } from "@/lib/site";

export default function InquirySection() {
  const [path, setPath] = useState<IntakePath | null>(null);
  return (
    <section id="request-info" className="section-shell">
      <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-secondary/5 p-6 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Request information</p>
            <h2 className="section-title mt-3">Let's find your next step.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A few guided questions will help me understand your situation.
              I'll review your answers and follow up by email to discuss what
              could help.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We agree on scope and pricing before any paid work begins.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            {[
              {
                path: "explore" as const,
                title: "Help me figure out where to start",
                copy: "For when you know things could work better.",
                icon: Compass,
              },
              {
                path: "project" as const,
                title: "I have something specific in mind",
                copy: "Tell me about your idea, challenge, or project.",
                icon: MessageCircle,
              },
            ].map((item) => (
              <button
                type="button"
                key={item.path}
                onClick={() => setPath(item.path)}
                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-5 text-left transition-colors hover:border-primary"
              >
                <item.icon
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="flex-1">
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {item.copy}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </button>
            ))}
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to talk?{" "}
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Book a conversation
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      {path && <ConsultingIntake path={path} onClose={() => setPath(null)} />}
    </section>
  );
}
