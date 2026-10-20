import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <article className="container-page py-14 sm:py-20">
      <Breadcrumbs trail={[{ label: title }]} />
      <h1 className="mt-8 font-display text-4xl text-maroon sm:text-5xl">{title}</h1>
      {updated && <p className="mt-3 text-sm text-ink-soft">{updated}</p>}
      <div className="mt-6 max-w-[var(--container-prose)] space-y-5 leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-charcoal [&_a]:text-maroon [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
