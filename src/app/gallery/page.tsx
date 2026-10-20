import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual look at South Indian meals, tiffin, sweets, buffets, food counters and festive event setups.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A feast for the eyes"
        intro="Banana-leaf meals, breakfast counters, sweets and celebrations that set the tone for the food we love to serve."
        image="sadya-feast"
        focal="50% 55%"
        trail={[{ label: "Gallery" }]}
      />
      <section className="py-14 sm:py-20" aria-label="Photo gallery">
        <div className="container-page">
          <Suspense fallback={<p className="py-20 text-center text-ink-soft">Loading the gallery…</p>}>
            <GalleryExplorer />
          </Suspense>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-soft">
            These are illustrative photographs of South Indian food and celebrations and do not document SRK Catering events.
            Our own event photographs will replace them as they become available. See{" "}
            <Link href="/credits" className="text-maroon underline underline-offset-4">image credits</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
