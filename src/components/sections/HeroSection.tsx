import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Ornament } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { enquiryHref } from "@/lib/enquiry";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-charcoal text-ivory" data-on-dark>
      <div className="absolute inset-0 -z-10">
        <Photo name="sadya-art" sizes="100vw" preload quality={85} focal="62% 50%" />
        {/* Mobile: darken from the bottom so the dish stays visible above the copy. Desktop: darken from the left. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 via-45% to-charcoal/10 lg:bg-gradient-to-r lg:from-charcoal/90 lg:via-charcoal/55 lg:via-45% lg:to-transparent" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-7rem)] flex-col justify-end pb-12 pt-[52svh] sm:pb-16 lg:min-h-[44rem] lg:justify-center lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow !text-gold">South Indian Catering</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[2.75rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.5rem]"
          >
            Every Feast Begins with <span className="italic text-gold">Tradition.</span>
          </h1>
          <Ornament className="my-7 w-44" />
          <p className="max-w-lg text-lg leading-relaxed text-ivory/90 sm:text-xl">
            Authentic South Indian flavours, lovingly prepared for your most memorable celebrations.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/menu" variant="light">Explore Our Menu</ButtonLink>
            <ButtonLink href={enquiryHref()} variant="outline-light">Plan Your Event</ButtonLink>
          </div>
          <p className="mt-8 text-xs tracking-[0.08em] text-ivory/65">{siteConfig.supportingMessage}</p>
        </div>
      </div>
    </section>
  );
}
