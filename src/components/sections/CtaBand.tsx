import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppCTA } from "@/components/enquiry/WhatsAppCTA";
import { enquiryHref } from "@/lib/enquiry";

export function CtaBand({
  title = "Let's Make Your Celebration Deliciously Memorable.",
  text = "Tell us about your event, and let's plan a feast that brings everyone together.",
  cta = "Request a Catering Quote",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-maroon text-ivory" data-on-dark>
      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
        <div className="relative flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-gold/40 sm:inset-6" />
          <div className="relative max-w-lg">
            <p className="eyebrow !text-gold">Begin the conversation</p>
            <h2 id="cta-title" className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ivory/85">{text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={enquiryHref()} variant="light">{cta}</ButtonLink>
              <WhatsAppCTA variant="outline-light" />
            </div>
          </div>
        </div>
        <div className="relative min-h-72 lg:min-h-[28rem]">
          <Photo name="mysore-pak" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
