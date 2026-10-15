import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export type IntakePath = "explore" | "project";

type Props = {
  path: IntakePath;
  service?: string;
  onClose: () => void;
};

const ConsultingIntake = ({ path, service, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState({ context: "", goal: "", tools: "", name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const exploring = path === "explore";
  const goalLabel = exploring ? "What feels harder than it should?" : "What would you like to build or improve?";
  const titles = ["A little about you", exploring ? "Where could things work better?" : "Tell me about your idea", "Review & connect"];
  const update = (key: keyof typeof fields, value: string) => setFields(previous => ({ ...previous, [key]: value }));

  useEffect(() => { heading.current?.focus(); }, [step, sent]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    setError("");
    if (step === 0 && !fields.context.trim()) {
      setError("Please share a little about what you do.");
      return;
    }
    if (step === 1 && !fields.goal.trim()) {
      setError("Share a few words, or tell me you are not sure yet.");
      return;
    }
    if (step < 2) { setStep(step + 1); return; }
    if (!fields.name.trim() || !fields.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    busy.current = true;
    setSending(true);
    try {
      const message = [
        "Consulting discovery request",
        `Starting point: ${exploring ? "Help me figure out where to start" : "I have something specific in mind"}`,
        ...(service ? [`Area of interest: ${service}`] : []),
        `About me / my business: ${fields.context.trim()}`,
        `${goalLabel}: ${fields.goal.trim()}`,
        `Current tools or process: ${fields.tools.trim() || "Not provided"}`,
      ].join("\n\n");
      const { error: submissionError } = await supabase.from("contact_submissions").insert([{
        name: fields.name.trim(), email: fields.email.trim(), category: "client", message,
      }]);
      if (submissionError) throw submissionError;
      setSent(true);
    } catch {
      setError("Your request could not be sent. Your answers are still here. Try again, or email maxlobel1@gmail.com.");
    } finally {
      busy.current = false;
      setSending(false);
    }
  };

  return (
    <Dialog open onOpenChange={open => { if (!open && !busy.current) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl p-5 sm:p-8" onOpenAutoFocus={event => { event.preventDefault(); heading.current?.focus(); }}>
        <DialogHeader className="text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Let’s find your next step</p>
          <DialogTitle ref={heading} tabIndex={-1} className="pr-5 text-2xl leading-tight focus:outline-none">{sent ? "Thanks for sharing." : titles[step]}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {sent ? "Your request has been submitted. I’ll review your answers and follow up by email." : "A few questions to start a useful conversation. No technical knowledge needed."}
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="space-y-6 py-2">
            <CheckCircle className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">Want to choose a time now? You can also book a conversation with me.</p>
            <Button asChild className="w-full btn-hero"><a href="https://calendly.com/maxlobel" target="_blank" rel="noopener noreferrer"><Calendar className="mr-2 h-4 w-4" />Schedule a conversation</a></Button>
            <Button variant="ghost" className="w-full" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div aria-label={`Step ${step + 1} of 3`} className="space-y-2">
              <div className="flex gap-2" aria-hidden="true">{titles.map((title, index) => <span key={title} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
              <p className="text-xs text-muted-foreground">Step {step + 1} of 3</p>
            </div>
            <fieldset disabled={sending} className="space-y-5">
              {step === 0 && <div className="space-y-2">
                <Label htmlFor="intake-context">What do you do, and who is this for?</Label>
                <Textarea id="intake-context" required maxLength={1500} rows={4} value={fields.context} onChange={event => update("context", event.target.value)} placeholder="Tell me about your work, business, or personal goals." />
                <p className="text-xs leading-relaxed text-muted-foreground">This can be for you personally, your team, or your business.</p>
              </div>}
              {step === 1 && <>
                <div className="space-y-2">
                  <Label htmlFor="intake-goal">{goalLabel}</Label>
                  <Textarea id="intake-goal" required maxLength={2500} rows={4} value={fields.goal} onChange={event => update("goal", event.target.value)} placeholder={exploring ? "What takes too much time, feels frustrating, or could work better? It’s okay if you’re not sure yet." : "Describe your idea and what a useful result would look like."} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intake-tools">What tools or process do you use today? <span className="font-normal text-muted-foreground">(optional)</span></Label>
                  <Textarea id="intake-tools" maxLength={1500} rows={2} value={fields.tools} onChange={event => update("tools", event.target.value)} placeholder="Share whatever is helpful. You can leave this blank." />
                </div>
              </>}
              {step === 2 && <>
                <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                  <p className="mb-3 font-semibold">What you’re sharing with Max</p>
                  <dl className="space-y-3 break-words">
                    <div><dt className="text-muted-foreground">About you</dt><dd className="whitespace-pre-wrap">{fields.context}</dd></div>
                    <div><dt className="text-muted-foreground">{exploring ? "What could improve" : "Your idea"}</dt><dd className="whitespace-pre-wrap">{fields.goal}</dd></div>
                    {fields.tools.trim() && <div><dt className="text-muted-foreground">Current tools or process</dt><dd className="whitespace-pre-wrap">{fields.tools}</dd></div>}
                    {service && <div><dt className="text-muted-foreground">Area of interest</dt><dd>{service}</dd></div>}
                  </dl>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="intake-name">Name</Label><Input id="intake-name" autoComplete="name" required maxLength={120} value={fields.name} onChange={event => update("name", event.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="intake-email">Email</Label><Input id="intake-email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={event => update("email", event.target.value)} /></div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">I’ll use these details to review your request and contact you about next steps. Please leave out passwords and confidential information.</p>
              </>}
            </fieldset>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <Button type="button" variant="ghost" disabled={sending} onClick={() => { if (step === 0) onClose(); else { setStep(step - 1); setError(""); } }}><ArrowLeft className="mr-2 h-4 w-4" />{step === 0 ? "Cancel" : "Back"}</Button>
              <Button type="submit" disabled={sending} className="btn-hero">{sending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : <>{step === 2 ? "Send to Max" : "Continue"}<ArrowRight className="ml-2 h-4 w-4" /></>}</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultingIntake;
