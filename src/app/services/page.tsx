import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/data/services";
import { enquiryHref } from "@/lib/enquiry";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Catering Services",
  description:
    "South Indian catering for weddings, receptions, engagements, birthdays, housewarmings, family and festive functions, corporate events and bulk meals.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Catering services"
        title="Catering for every kind of celebration"
        intro="From a wedding feast to a corporate lunch, we plan the menu, the serving style and the timing around your event."
        image="banana-leaf-meal"
        focal="50% 50%"
        trail={[{ label: "Services" }]}
      />

      <div className="py-8 sm:py-12">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="py-12 sm:py-16">
              <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={cn("lg:col-span-6", flip && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ivory-deep">
                    <Photo name={s.image} sizes="(min-width:1024px) 48vw, 100vw" />
                  </div>
                </Reveal>
                <Reveal className={cn("lg:col-span-6", flip ? "lg:order-1 lg:pr-8" : "lg:pl-8")} delay={100}>
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h2 id={`${s.id}-title`} className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{s.title}</h2>
                  <p className="mt-2 font-display text-lg italic text-maroon">{s.summary}</p>
                  <p className="mt-5 leading-relaxed text-ink-soft">{s.detail}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-charcoal">
                        <Check className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={enquiryHref({ event: s.eventType })}>
                      Enquire about {s.title.toLowerCase()}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand />
    </>
  );
}
