import { useRef, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NoteSection() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    relationship: "",
    content: "",
    permission: false,
  });
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    setError("");
    if (!fields.name.trim() || !fields.content.trim()) {
      setError("Please add your name and a note.");
      return;
    }
    busy.current = true;
    setSending(true);
    try {
      const content = [
        "Website note for review",
        `Name: ${fields.name.trim()}`,
        `Email: ${fields.email.trim() || "Not provided"}`,
        `Relationship: ${fields.relationship}`,
        `Permission to publish note with name and relationship: ${fields.permission ? "Yes" : "No"}`,
        "",
        fields.content.trim(),
      ].join("\n");
      const { error: failure } = await supabase
        .from("notes")
        .insert([{ content }]);
      if (failure) throw failure;
      setSent(true);
    } catch {
      setError(
        "Your note could not be submitted. Your words are still here. Try again or email maxlobel1@gmail.com.",
      );
    } finally {
      busy.current = false;
      setSending(false);
    }
  }
  return (
    <section id="submit-note" className="section-shell">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-center">Worked together?</p>
        <h2 className="mt-3 text-center text-2xl font-semibold sm:text-3xl">
          Submit a note about Max
        </h2>
        <p className="mt-3 text-center leading-relaxed text-muted-foreground">
          Share feedback about working with me. Notes are reviewed before
          anything is published, and only published with permission.
        </p>
        {!open ? (
          <Button
            variant="outline"
            className="mx-auto mt-5 flex"
            onClick={() => setOpen(true)}
            aria-expanded={false}
          >
            Write a note
          </Button>
        ) : sent ? (
          <p
            role="status"
            className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-5"
          >
            Thank you. Your note has been submitted for review.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <fieldset disabled={sending} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="note-name">Your name</Label>
                  <Input
                    id="note-name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) =>
                      setFields({ ...fields, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note-email">
                    Email (optional, kept private)
                  </Label>
                  <Input
                    id="note-email"
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) =>
                      setFields({ ...fields, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note-relationship">How do you know Max?</Label>
                <select
                  id="note-relationship"
                  required
                  value={fields.relationship}
                  onChange={(e) =>
                    setFields({ ...fields, relationship: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Select a relationship</option>
                  <option>Client</option>
                  <option>Coworker</option>
                  <option>Collaborator</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note-content">Your note</Label>
                <Textarea
                  id="note-content"
                  required
                  rows={4}
                  maxLength={3000}
                  value={fields.content}
                  onChange={(e) =>
                    setFields({ ...fields, content: e.target.value })
                  }
                />
              </div>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={fields.permission}
                  onChange={(e) =>
                    setFields({ ...fields, permission: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-cyan-400"
                />
                Max may publish this note with my name and relationship. My
                email stays private.
              </label>
            </fieldset>
            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}
            <div className="flex gap-3">
              <Button type="submit" disabled={sending}>
                {sending ? "Submitting…" : "Submit note"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={sending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
