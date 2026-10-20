import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/data/images";

/** Compact image hero used on inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  focal,
  trail,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageKey;
  focal?: string;
  trail: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-ivory" data-on-dark>
      <div className="absolute inset-0 -z-10">
        <Photo name={image} sizes="100vw" preload focal={focal} quality={75} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/35 lg:bg-gradient-to-r lg:from-charcoal/90 lg:via-charcoal/65 lg:to-charcoal/20" />
      </div>
      <div className="container-page pb-14 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
        <Breadcrumbs trail={trail} tone="light" />
        <div className="mt-14 max-w-2xl sm:mt-20">
          <p className="eyebrow !text-gold">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">{intro}</p>
        </div>
      </div>
    </section>
  );
}
