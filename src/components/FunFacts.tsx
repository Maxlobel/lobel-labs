import { useState } from "react";
import { funFacts } from "@/data/funFacts";
import { nextFactId } from "@/lib/factDeck";
import { Button } from "@/components/ui/button";
const storageKey = "max-facts-seen-v1";
function readSeen(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(stored)
      ? [
          ...new Set<string>(
            stored.filter((id) => funFacts.some((f) => f.id === id)),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
export default function FunFacts() {
  const [seen, setSeen] = useState<string[]>(readSeen);
  const [factId, setFactId] = useState<string | null>(null);
  const fact = funFacts.find((f) => f.id === factId);
  const exhausted = seen.length >= funFacts.length;
  function showNext(reset = false) {
    const previous = reset ? [] : [...new Set([...seen, ...readSeen()])];
    const next = nextFactId(
      funFacts.map((f) => f.id),
      previous,
    );
    if (!next) {
      setSeen(previous);
      return;
    }
    const updated = [...previous, next];
    setSeen(updated);
    setFactId(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      /* The current visit still avoids repeats when storage is unavailable. */
    }
  }
  return (
    <section aria-labelledby="fun-facts-title" className="section-shell pt-0">
      <div className="rounded-2xl border border-secondary/25 bg-secondary/5 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-secondary">Beyond the job title</p>
            <h2 id="fun-facts-title" className="mt-2 text-2xl font-semibold">
              A little more about Max
            </h2>
            <p
              aria-live="polite"
              className="mt-4 leading-relaxed text-muted-foreground"
            >
              {fact?.text ||
                (exhausted
                  ? "You've seen the whole collection on this browser. You can start a fresh round whenever you like."
                  : "Skiing, golf, life on the water, and the projects that come out of it. Explore a few real facts about me.")}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {seen.length} of {funFacts.length} discovered on this browser. No
              repeats until you choose to start again.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 self-start border-secondary/40 text-secondary sm:self-center"
            onClick={() => showNext(exhausted)}
          >
            {exhausted
              ? "Start a new round"
              : fact
                ? "Show another fact"
                : "Discover a fact"}
          </Button>
        </div>
      </div>
    </section>
  );
}
