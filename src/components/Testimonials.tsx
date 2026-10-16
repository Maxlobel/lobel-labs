import { testimonials } from "@/data/testimonials";
export default function Testimonials() {
  const approved = testimonials.filter((item) => item.approvedForPublication);
  if (!approved.length) return null;
  return (
    <section
      className="section-shell pt-0"
      aria-labelledby="testimonials-heading"
    >
      <h2 id="testimonials-heading" className="text-2xl font-semibold">
        What clients and coworkers say about Max
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {approved.map((item) => (
          <figure
            key={`${item.name}-${item.quote}`}
            className="rounded-xl border border-border bg-card p-6"
          >
            <blockquote className="leading-relaxed">“{item.quote}”</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold">{item.name}</span>
              <span className="mt-1 block text-muted-foreground">
                {item.relationship} · {item.attribution}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
