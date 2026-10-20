import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/SectionHeading";
import { enquiryHref } from "@/lib/enquiry";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-5xl text-maroon sm:text-6xl">This page isn&apos;t on the menu.</h1>
      <Ornament className="my-8 w-40" />
      <p className="max-w-md text-lg text-ink-soft">
        The page you were looking for has moved or never existed. Let&apos;s get you back to the feast.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/menu" variant="secondary">Explore Our Menu</ButtonLink>
        <ButtonLink href={enquiryHref()} variant="ghost">Plan Your Event</ButtonLink>
      </div>
    </section>
  );
}
