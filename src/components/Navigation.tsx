import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Private lab", href: "/lab" },
  ];
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:rounded focus:bg-primary focus:p-3 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="/"
            className="text-xl font-bold text-primary"
            aria-label="Max Lobel home"
          >
            Max Lobel<span className="text-secondary">.</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild>
              <a href="/#request-info">Request information</a>
            </Button>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div
          id="mobile-navigation"
          hidden={!open}
          className="border-t border-border px-5 py-5 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              className="font-semibold text-primary"
              href="/#request-info"
              onClick={() => setOpen(false)}
            >
              Request information
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
