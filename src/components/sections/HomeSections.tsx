import Link from "next/link";
import { CalendarHeart, ChefHat, ClipboardList, Flame, MessagesSquare, Salad, ScrollText, Utensils } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament, SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { MenuCard } from "@/components/menu/MenuCard";
import { PackageCard } from "@/components/menu/PackageCard";
import { homeServices } from "@/data/services";
import { menuItems } from "@/data/menu";
import { packages } from "@/data/packages";
import { galleryImages } from "@/data/gallery";
import { enquiryHref } from "@/lib/enquiry";
import { cn } from "@/lib/cn";

/* ---------- Brand story ---------- */
export function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ivory-deep sm:aspect-[5/6]">
            <Photo name="thali-veg" sizes="(min-width:1024px) 46vw, 100vw" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-10 h-2/3 w-2/3 border border-gold/70" />
          <div className="absolute -bottom-8 -right-2 hidden w-[42%] overflow-hidden rounded-[var(--radius-card)] border-[6px] border-ivory shadow-[var(--shadow-lift)] sm:block lg:-right-8">
            <div className="relative aspect-square">
              <Photo name="marigold-garland" sizes="22vw" />
            </div>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:pl-6" delay={120}>
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title="Rooted in Tradition. Served with Love."
          />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>
              A South Indian feast is more than a meal. It is an order of service, a rhythm of flavours and a way of welcoming
              people to your table, from the first spoon of payasam to the last of the curd rice.
            </p>
            <p>
              SRK Catering is built around that tradition. We plan menus course by course, cook with familiar South Indian
              ingredients and serve with the warmth a celebration deserves, so you can spend your day with the people who matter.
            </p>
          </div>
          <div className="mt-9">
            <ButtonLink href="/about" variant="secondary">Discover Our Story</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Catering services (bento) ---------- */
export function ServicesHighlight() {
  const spans = [
    "lg:col-span-7 min-h-[22rem] lg:min-h-[26rem]",
    "lg:col-span-5 min-h-[22rem] lg:min-h-[26rem]",
    "lg:col-span-5 min-h-[22rem] lg:min-h-[26rem]",
    "lg:col-span-7 min-h-[22rem] lg:min-h-[26rem]",
  ];
  return (
    <section aria-labelledby="services-title" className="bg-ivory-deep/60 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Catering services"
            title="A feast for every occasion"
            intro="Whether it is a wedding for a thousand or a housewarming for thirty, we plan the menu, the serving style and the timing around your day."
          />
          <ButtonLink href="/services" variant="ghost" className="self-start lg:self-end">View all services</ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {homeServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 80} className={cn("flex", spans[i])}>
              <ServiceCard
                className="w-full"
                title={s.title}
                text={s.text}
                image={s.image}
                href={enquiryHref({ event: s.eventType })}
                sizes={i % 3 === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 42vw, 100vw"}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Signature menu ---------- */
const signatureIds = ["leaf-meal", "idli-sambar", "masala-dosa", "ven-pongal", "medu-vadai", "mysore-pak", "payasam", "wedding-feast"];

export function SignatureMenu() {
  const items = signatureIds.map((id) => menuItems.find((m) => m.id === id)).filter(Boolean) as typeof menuItems;
  return (
    <section aria-labelledby="menu-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          id="menu-title"
            eyebrow="Signature menu"
          title="Flavours that feel like home"
          intro="A taste of what we can prepare. Every menu is shaped around your event."
        />
        <Ornament className="mx-auto mt-8 w-48" />
        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 4) * 70}>
              <MenuCard item={item} showPrice={false} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <ButtonLink href="/menu">Explore the Full Menu</ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why SRK ---------- */
const reasons = [
  { icon: Flame, title: "Traditional South Indian Flavours", text: "Recipes and serving orders rooted in the way South Indian celebrations have always been enjoyed." },
  { icon: ClipboardList, title: "Thoughtfully Planned Menus", text: "Menus built course by course around your guests, your timings and your dietary needs." },
  { icon: ChefHat, title: "Attention to Food Preparation", text: "Careful preparation of each dish, from the tempering of spices to the final garnish." },
  { icon: CalendarHeart, title: "Catering for Memorable Occasions", text: "From intimate housewarmings to large weddings, planned so you can enjoy the day." },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-leaf py-20 text-ivory sm:py-24" data-on-dark>
      <div className="container-page">
        <SectionHeading tone="dark" id="why-title"
            eyebrow="Why SRK Catering" title="Tradition in every detail" />
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 70} className="border-t border-gold/60 pt-6">
              <r.icon className="size-7 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/80">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Packages ---------- */
export function SignaturePackages() {
  return (
    <section aria-labelledby="packages-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="packages-title"
            eyebrow="Signature packages"
          title="Start with a package, then make it yours"
          intro="These sample packages show how a menu can come together. Guest ranges and prices are illustrative placeholders; your final plan is confirmed by our team."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80} className="flex">
              <PackageCard pkg={p} featured={i === 1} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Gallery preview ---------- */
const previewIds = ["g-sadya", "g-mysore", "g-banquet", "g-idli", "g-dosa-b", "g-payasam", "g-serving-a"];
const previewLayout = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "col-span-2 md:col-span-1",
];

export function GalleryPreview() {
  const items = previewIds.map((id) => galleryImages.find((g) => g.id === id)).filter(Boolean) as typeof galleryImages;
  return (
    <section aria-labelledby="gallery-title" className="bg-ivory-deep/60 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="gallery-title"
            eyebrow="Event gallery" title="A glimpse of the feast" intro="Illustrative imagery of South Indian food and celebrations. Our own event photographs will appear here as they are added." />
          <ButtonLink href="/gallery" variant="secondary" className="self-start lg:self-end">View Full Gallery</ButtonLink>
        </div>
        <ul className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 lg:auto-rows-[13rem] lg:gap-4">
          {items.map((g, i) => (
            <li key={g.id} className={cn("img-zoom relative overflow-hidden rounded-[var(--radius-card)] bg-ivory-deep", previewLayout[i])}>
              <Link href={`/gallery?image=${g.id}`} className="absolute inset-0 block" aria-label={`Open in gallery: ${g.caption}`}>
                <Photo name={g.image} sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
const steps = [
  { icon: ScrollText, title: "Share Your Event Details", text: "Tell us the occasion, date, venue and approximate guest count." },
  { icon: Utensils, title: "Choose Your Menu", text: "Pick a sample package or tell us the dishes you have in mind." },
  { icon: MessagesSquare, title: "Discuss Your Requirements", text: "We talk through serving style, dietary needs, timings and budget." },
  { icon: Salad, title: "Confirm Your Catering Plan", text: "Once you are happy, the team confirms your plan in writing." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading align="center" id="how-title"
            eyebrow="How it works" title="From first hello to the first serving" />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-gold/70 lg:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative">
              <span className="relative inline-flex size-12 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-maroon">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl text-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mx-auto mt-14 max-w-2xl rounded border border-line bg-white/60 p-4 text-center text-sm text-ink-soft">
          The event date, final menu and price are confirmed by the SRK Catering team after you share your requirements. Sending an
          enquiry does not reserve a date.
        </p>
      </div>
    </section>
  );
}
