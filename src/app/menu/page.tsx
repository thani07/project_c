import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { PackageCard } from "@/components/menu/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Explore traditional South Indian meals, tiffin, rice varieties, sweets, snacks and wedding menus, with sample packages you can take straight to an enquiry.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our menu"
        title="Traditional flavours, thoughtfully served"
        intro="Browse sample dishes from our South Indian catering menu. Prices shown are illustrative samples; every menu is confirmed with you."
        image="thali-banana-leaf"
        focal="50% 45%"
        trail={[{ label: "Our Menu" }]}
      />

      <section className="py-14 sm:py-20" aria-label="Menu">
        <div className="container-page">
          <Suspense fallback={<p className="py-20 text-center text-ink-soft">Loading the menu…</p>}>
            <MenuExplorer />
          </Suspense>
        </div>
      </section>

      <section id="packages" aria-labelledby="packages-title" className="bg-ivory-deep/60 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="packages-title"
            eyebrow="Sample packages"
            title="Choose a package to begin"
            intro="Open a package to see a sample menu, then continue to the enquiry form with your choice already selected. Figures are illustrative, not a quote."
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((p, i) => (
              <li key={p.id} className="flex"><PackageCard pkg={p} featured={i === 1} /></li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
