import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "@/data/projects";
import { getFieldnote } from "@/data/fieldnotes";
export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const note = pathname.startsWith("/fieldnotes/") ? getFieldnote(pathname.slice("/fieldnotes/".length)) : undefined;
    const title =
      pathname === "/lab"
        ? "Private lab | Max Lobel"
        : pathname === "/fieldnotes"
          ? "Fieldnotes | Max Lobel"
          : note
            ? `${note.headline} | Fieldnotes by Max Lobel`
        : pathname === "/privacy"
          ? "Privacy | Max Lobel"
          : project
            ? `${project.title} | Max Lobel`
            : "Max Lobel | AI, Data & Creative Projects";
    document.title = title;
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = `https://maxlobel.com${pathname}`;
    const robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (robots)
      robots.content =
        pathname === "/lab" || Boolean(note?.status === "concept") ? "noindex, nofollow" : "index, follow";
    const description =
      note?.description ||
      (pathname === "/fieldnotes" ? "A visual notebook of questions, investigations, and creative work across data, AI, sports, cities, and systems from Max Lobel." : undefined) ||
      project?.summary ||
      "Explore Max Lobel's projects, background, and practical work in AI, data, and automation. Based in Boston and open to consulting and collaboration.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `https://maxlobel.com${pathname}`);
  }, [pathname]);
  return null;
}
