import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { enquiryHref } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SRK Catering brings the traditions of the South Indian feast to weddings, family functions and corporate events, with menus planned course by course.",
};

const principles = [
  { title: "Tradition first", text: "We respect the order of a South Indian meal: what is served first, what follows, and how it all ends with payasam and curd rice." },
  { title: "Planned with you", text: "No two celebrations are alike. We listen to your guest list, timings and dietary needs before suggesting a menu." },
  { title: "Prepared with care", text: "Good catering is made in the details: fresh tempering, balanced seasoning and food that reaches the leaf at its best." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A table set with tradition"
        intro="SRK Catering is built on a simple idea: a celebration is better when the food feels like home."
        image="thali-veg"
        focal="50% 50%"
        trail={[{ label: "About Us" }]}
      />

      <section aria-labelledby="philosophy-title" className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="philosophy-title" eyebrow="Our philosophy" title="Food that brings everyone to the same table" />
          </Reveal>
          <Reveal className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg lg:col-span-7" delay={100}>
            <p>
              South Indian hospitality has a way of making every guest feel like family. A leaf is laid, the first serving of rice
              goes down, and the meal unfolds in a familiar rhythm, each dish placed with intent.
            </p>
            <p>
              We bring that same spirit to catering. Our approach is to keep the flavours honest, the menus well planned and the
              service warm, so that the food becomes part of the memory of your celebration.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Culinary traditions" className="bg-ivory-deep/60 py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Photo name="sadya-feast" sizes="(min-width:1024px) 48vw, 100vw" />
          </Reveal>
          <Reveal className="flex flex-col justify-center" delay={100}>
            <p className="eyebrow">South Indian culinary traditions</p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">The banana-leaf feast</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Across Tamil Nadu, Kerala, Karnataka and Andhra, the celebratory meal is served on a banana leaf, with salt and
              pickle at the top corner and the rice and its accompaniments laid out in a considered order. Tiffin favourites such
              as idli, dosa, vadai and pongal anchor the morning, while sweets such as payasam and Mysore pak close the meal.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              We draw on these traditions when we plan a menu, and adapt them to your community, your region and your occasion.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading id="approach-title" align="center" eyebrow="Our approach" title="How we cater" />
          <Ornament className="mx-auto mt-8 w-40" />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="border-t border-gold pt-6">
                <h3 className="font-display text-2xl text-maroon">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Food preparation and service" className="bg-charcoal py-20 text-ivory sm:py-28" data-on-dark>
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow !text-gold">Preparation and service</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Cooked fresh, served with attention</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ivory/80">
              A large celebration depends on planning: quantities, timings, serving order and the people who make it all flow. We
              work through these with you in advance so that on the day, the food arrives hot, the leaves are filled in turn and
              you are free to be with your guests.
            </p>
            <div className="mt-8">
              <ButtonLink href={enquiryHref()} variant="light">Plan Your Event</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5" delay={100}>
            <Photo name="serving-b" sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
