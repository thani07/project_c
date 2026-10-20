import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { WhatsAppCTA } from "@/components/enquiry/WhatsAppCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact and Catering Enquiry",
  description:
    "Tell SRK Catering about your event, guest count and menu preferences to start planning your South Indian catering.",
};

const nextSteps = [
  "Share your event details using the form.",
  "The team reviews your requirements and gets in touch to discuss them.",
  "Menu, date and price are confirmed with you before anything is final.",
];

export default function ContactPage() {
  const c = siteConfig.contact;
  const rows: { icon: typeof Phone; node: React.ReactNode }[] = [];
  if (c.phoneDisplay) rows.push({ icon: Phone, node: <a href={`tel:${c.phoneHref}`} className="underline-offset-4 hover:underline">{c.phoneDisplay}</a> });
  if (c.email) rows.push({ icon: Mail, node: <a href={`mailto:${c.email}`} className="underline-offset-4 hover:underline">{c.email}</a> });
  if (c.address) rows.push({ icon: MapPin, node: <span>{c.address}</span> });
  if (c.serviceArea) rows.push({ icon: MapPin, node: <span>Service area: {c.serviceArea}</span> });
  if (c.hours) rows.push({ icon: Clock, node: <span>{c.hours}</span> });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your celebration"
        intro="Tell us about your event and the food you have in mind. We'll take it from there."
        image="idli-sambar-b"
        focal="50% 45%"
        trail={[{ label: "Contact" }]}
      />

      <section className="py-14 sm:py-20" aria-label="Catering enquiry">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div id="enquiry" className="scroll-mt-28 lg:col-span-7">
            <h2 className="font-display text-3xl text-charcoal sm:text-4xl">Catering enquiry</h2>
            <p className="mt-3 mb-10 max-w-xl text-ink-soft">
              Fields marked with <span className="text-maroon">*</span> are required. If you came here from a package or menu
              item, we&apos;ve filled that in for you.
            </p>
            <Suspense fallback={<p className="text-ink-soft">Loading the enquiry form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>

          <aside className="space-y-10 lg:col-span-5" aria-label="Contact details and next steps">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-2xl text-maroon">Get in touch</h2>
              {rows.length > 0 ? (
                <ul className="mt-5 space-y-4 text-charcoal">
                  {rows.map((r, i) => (
                    <li key={i} className="flex gap-3"><r.icon className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />{r.node}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Use the enquiry form and our team will respond using the details you share.
                </p>
              )}
              <div className="mt-6">
                <WhatsAppCTA label="Chat on WhatsApp" />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-maroon">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-4 text-sm leading-relaxed text-ink-soft">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-gold font-display text-maroon">{i + 1}</span>
                    <span className="pt-1">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
