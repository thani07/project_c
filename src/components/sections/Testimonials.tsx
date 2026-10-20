import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, type Testimonial } from "@/data/testimonials";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col border-t border-gold bg-white p-7 shadow-[var(--shadow-soft)]">
      <Quote className="size-6 text-gold" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-charcoal">{t.quote}</blockquote>
      <figcaption className="mt-5 text-sm text-ink-soft">
        <span className="font-semibold text-charcoal">{t.name}</span>, {t.event}
      </figcaption>
    </figure>
  );
}

/** Renders only when genuine testimonials have been added to data/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-ivory-deep/60 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading align="center" id="testimonials-title" eyebrow="Kind words" title="What our guests say" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.id}><TestimonialCard t={t} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
