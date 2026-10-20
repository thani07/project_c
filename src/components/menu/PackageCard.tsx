"use client";

import Link from "next/link";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { enquiryHref } from "@/lib/enquiry";
import type { CateringPackage } from "@/lib/types";

export function PackageCard({ pkg, featured = false }: { pkg: CateringPackage; featured?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `pkg-${pkg.id}-title`;
  const href = enquiryHref({ package: pkg.id });

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border bg-white shadow-[var(--shadow-soft)] ${
        featured ? "border-gold" : "border-line"
      }`}
    >
      <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-ivory-deep">
        <Photo name={pkg.image} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
        {featured && (
          <span className="absolute left-0 top-5 bg-gold px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-charcoal">
            Featured sample
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow">{pkg.diet}</p>
        <h3 className="mt-2 font-display text-2xl text-charcoal">{pkg.name}</h3>
        <p className="mt-1 text-sm italic text-ink-soft">{pkg.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pkg.description}</p>
        <ul className="mt-5 space-y-2 text-sm text-charcoal">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
          <p>{pkg.sampleGuestRange}</p>
          <p>{pkg.samplePricePerPlate}</p>
          <p className="mt-1 font-semibold uppercase tracking-wider text-gold-deep">Illustrative sample, not a quote</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-[3px] border border-maroon bg-maroon px-5 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-maroon-deep"
          >
            Choose this package
          </Link>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="border-b border-gold pb-0.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-maroon hover:border-maroon"
          >
            View menu<span className="sr-only"> for {pkg.name}</span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(92vw,38rem)] max-h-[88vh] overflow-y-auto rounded-[var(--radius-card)] bg-ivory p-0 text-charcoal shadow-[var(--shadow-lift)] backdrop:bg-charcoal/70"
      >
        <div className="relative p-6 sm:p-9">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close package details"
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full text-maroon hover:bg-ivory-deep"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <p className="eyebrow">Sample menu</p>
          <h3 id={titleId} className="mt-2 font-display text-3xl text-maroon">{pkg.name}</h3>
          <p className="mt-2 text-sm text-ink-soft">{pkg.description}</p>
          <dl className="mt-7 space-y-5">
            {pkg.menu.map((m) => (
              <div key={m.course} className="border-t border-line pt-4">
                <dt className="font-display text-lg text-charcoal">{m.course}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{m.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded bg-ivory-deep p-3 text-xs leading-relaxed text-ink-soft">
            {pkg.sampleGuestRange}. {pkg.samplePricePerPlate}. These are illustrative figures only. Final menu, date and price are
            confirmed by the catering team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-[3px] border border-maroon bg-maroon px-5 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ivory hover:bg-maroon-deep"
            >
              Continue to enquiry
            </Link>
            <Button variant="secondary" onClick={() => dialogRef.current?.close()}>Close</Button>
          </div>
        </div>
      </dialog>
    </article>
  );
}
