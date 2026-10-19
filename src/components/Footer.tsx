import { site } from "@/lib/site";
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <a href="/" className="text-xl font-semibold text-primary">
              Max Lobel
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              Practical help with AI, data, and technology. Based in Boston.
            </p>
          </div>
          <nav
            aria-label="Contact links"
            className="flex flex-wrap items-start gap-x-5 gap-y-3 text-sm"
          >
            <a href={`mailto:${site.email}`}>Email Max</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Book a call
            </a>
          </nav>
        </div>
        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Max Lobel</p>
          <div className="flex gap-5">
            <a href="/privacy">Privacy</a>
            <a href="/lab">Private lab</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
