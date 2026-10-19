import { useRef, useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type Experiment = { title: string; description: string; status: string };
export default function Lab() {
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Experiment[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to open the lab.");
      setItems(data.experiments);
      setPassword("");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to open the lab. Try again.",
      );
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }
  return (
    <>
      <Navigation />
      <main
        id="main"
        className="section-shell pt-28 sm:pt-32 min-h-[65vh] max-w-4xl"
      >
        <p className="eyebrow">Private notebook</p>
        <h1 className="mt-3 text-4xl font-bold">Experiments & ideas</h1>
        {items ? (
          <>
            <div className="my-7 flex items-center justify-between gap-4">
              <p className="text-muted-foreground">
                Early concepts and work in progress.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setItems(null);
                  setPassword("");
                }}
              >
                Lock lab
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <p className="text-xs font-semibold text-secondary">
                    {item.status}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 max-w-md rounded-2xl border border-border bg-card/60 p-6">
            <LockKeyhole
              className="h-7 w-7 text-secondary"
              aria-hidden="true"
            />
            <p className="mt-4 text-muted-foreground">
              This notebook is password protected. Ask Max if you'd like access.
            </p>
            <form onSubmit={unlock} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lab-password">Lab password</Label>
                <Input
                  id="lab-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength={256}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy}>
                {busy ? "Unlocking…" : "Unlock lab"}
              </Button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
