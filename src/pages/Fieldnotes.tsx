import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FieldnotePoster from "@/components/FieldnotePoster";
import { fieldnotes, fieldnoteCategories, type FieldnoteCategory } from "@/data/fieldnotes";
import "./fieldnotes.css";

export default function Fieldnotes() {
  const [category, setCategory] = useState<"All" | FieldnoteCategory>("All");
  const visibleNotes = useMemo(() => category === "All" ? fieldnotes : fieldnotes.filter((note) => note.category === category), [category]);
  const [featured, ...rest] = visibleNotes;
  return (
    <>
      <Navigation />
      <main id="main" className="fieldnotes-page min-h-screen pt-16">
        <section className="fn-container fn-opening" aria-labelledby="fieldnotes-title">
          <Link to="/#projects" className="fn-parent-link">← SELECTED PROJECTS / FIELDNOTES</Link>
          <div className="fn-opening-eyebrow"><span className="fn-dot" /> THE PUBLIC NOTEBOOK OF MAX LOBEL <span className="fn-edition">VOL. 01 / A WORK IN PROGRESS</span></div>
          <div className="fn-opening-content">
            <div>
              <h1 id="fieldnotes-title" className="fn-display">LOOK<br/>CLOSER<span className="fn-period">.</span></h1>
            </div>
            <div className="fn-opening-copy">
              <p>There is a story hiding in almost everything.</p>
              <p className="fn-muted">Data, places, sports, technology, and whatever else sparks a question. One visual language. Many different lenses.</p>
              <a href="#stories" className="fn-explore">EXPLORE THE NOTEBOOK <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="fn-opening-bottom"><span>QUESTIONS FIRST. EVIDENCE NEXT.</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
        </section>

        <section id="stories" className="fn-container fn-stories" aria-labelledby="stories-title">
          <div className="fn-section-heading">
            <div><p className="fn-kicker">01 / THE INDEX</p><h2 id="stories-title">A collection of curiosities<span className="fn-period">.</span></h2></div>
            <p className="fn-muted">The first six entries are <strong>editorial concepts</strong>, showing how finished research and creative work could live here. They are not reported findings.</p>
          </div>
          <div className="fn-filters" role="group" aria-label="Filter fieldnotes by topic">
            {fieldnoteCategories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`fn-filter ${category === item ? "fn-filter-active" : ""}`}>{item}{item === "All" ? <span>{fieldnotes.length.toString().padStart(2, "0")}</span> : null}</button>
            ))}
          </div>

          {featured && (
            <div className="fn-results" aria-live="polite">
              <Link to={`/projects/fieldnotes/${featured.slug}`} className="fn-featured fn-link-card">
                <div className="fn-featured-art"><FieldnotePoster note={featured} wide /></div>
                <div className="fn-featured-copy">
                  <div className="fn-card-meta"><span>EDITORIAL CONCEPT</span><span>NO. {featured.number}</span></div>
                  <span className="fn-featured-tag">{featured.category} / Featured inquiry</span>
                  <h3>{featured.headline}</h3>
                  <p>{featured.description}</p>
                  <span className="fn-card-action">OPEN FIELDNOTE <ArrowUpRight size={17} aria-hidden="true" /></span>
                </div>
              </Link>
              <div className="fn-card-grid">
                {rest.map((note) => (
                  <Link to={`/projects/fieldnotes/${note.slug}`} key={note.slug} className="fn-card fn-link-card">
                    <FieldnotePoster note={note} />
                    <div className="fn-card-content">
                      <div className="fn-card-meta"><span>{note.category.toUpperCase()} / CONCEPT</span><span>NO. {note.number}</span></div>
                      <h3>{note.headline}</h3>
                      <p>{note.description}</p>
                      <span className="fn-card-action">OPEN FIELDNOTE <ArrowUpRight size={16} aria-hidden="true" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="fn-container fn-principle" aria-label="About Fieldnotes">
          <div className="fn-principle-icon"><Compass size={32} strokeWidth={1.5} aria-hidden="true" /></div>
          <div><p className="fn-kicker">02 / THE POINT OF VIEW</p><h2>Different subjects.<br/><em>Same curiosity.</em></h2></div>
          <div className="fn-principle-copy"><p>I like pulling at a question until the interesting pattern starts to show. This is where those investigations, builds, and visual stories will live.</p><p className="fn-muted">Real work will be added after the evidence, presentation, and permission to share are checked.</p></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
