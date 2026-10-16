import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "@/data/projects";
export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const title =
      pathname === "/lab"
        ? "Private lab | Max Lobel"
        : pathname === "/privacy"
          ? "Privacy | Max Lobel"
          : project
            ? `${project.title} | Max Lobel`
            : "Max Lobel | AI, Automation & Analytics Consulting";
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
        pathname === "/lab" ? "noindex, nofollow" : "index, follow";
    const description =
      project?.summary ||
      "Practical AI setup, workflow improvements, and analytics help for individuals and small businesses. Meet Max Lobel, a Boston based analyst and builder.";
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
