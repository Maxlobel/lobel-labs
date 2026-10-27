import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FieldnotePoster from "@/components/FieldnotePoster";
import { fieldnotes, getFieldnote } from "@/data/fieldnotes";
import "./fieldnotes.css";

export default function FieldnoteDetail() {
  const { slug } = useParams();
  const note = getFieldnote(slug || "");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [slug]);
  if (!note) return <Navigate to="/fieldnotes" replace />;
  const next = fieldnotes[(fieldnotes.findIndex((item) => item.slug === note.slug) + 1) % fieldnotes.length];

  return (
    <>
      <Navigation />
      <main id="main" className="fieldnotes-page fn-detail pt-16">
        <div className="fn-container fn-detail-top">
          <Link className="fn-back" to="/fieldnotes"><ArrowLeft size={16} aria-hidden="true" /> BACK TO ALL FIELDNOTES</Link>
          <span>NO. {note.number} / {note.category.toUpperCase()}</span>
        </div>
        <article className="fn-container" aria-labelledby="note-title">
          <header className="fn-detail-header">
            <p className="fn-kicker">FIELDNOTE {note.number} / EDITORIAL CONCEPT</p>
            <h1 id="note-title">{note.headline}</h1>
            <p className="fn-detail-deck">{note.description}</p>
            <p className="fn-status"><span className="fn-dot" /> Concept preview. This is a research plan, not a completed study or a set of findings.</p>
          </header>
          <div className="fn-detail-cover"><FieldnotePoster note={note} wide /></div>
          <div className="fn-article-layout">
            <aside className="fn-article-aside"><span>THE WORKING OUTLINE</span><div className="fn-aside-rule" /><span>QUESTION</span><span>METHOD</span><span>EVIDENCE</span><span>WHY IT MATTERS</span></aside>
            <div className="fn-article-body">
              <section><p className="fn-kicker">01 / THE QUESTION</p><h2>What I want to understand</h2><p className="fn-lead">{note.question}</p></section>
              <section><p className="fn-kicker">02 / THE INVESTIGATION</p><h2>How I would approach it</h2><ol>{note.approach.map((item) => <li key={item}>{item}</li>)}</ol></section>
              <section><p className="fn-kicker">03 / EVIDENCE CHECK</p><h2>What I would need to prove it</h2><p>Before making a public claim, the story needs original evidence that can be independently checked.</p><ul>{note.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section className="fn-article-takeaway"><p className="fn-kicker">04 / WHY IT MATTERS</p><p>{note.whyItMatters}</p></section>
            </div>
          </div>
        </article>
        <section className="fn-container fn-next" aria-label="Next fieldnote">
          <div><p className="fn-kicker">KEEP EXPLORING</p><h2>Follow another question.</h2></div>
          <Link to={`/fieldnotes/${next.slug}`} className="fn-next-link"><span>{next.category.toUpperCase()} / NO. {next.number}</span><strong>{next.headline}</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
