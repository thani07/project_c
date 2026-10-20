import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ trail, tone = "dark" }: { trail: { label: string; href?: string }[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${tone === "light" ? "text-ivory/80" : "text-ink-soft"}`}>
        <li>
          <Link href="/" className="hover:underline underline-offset-4">Home</Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            {t.href && i < trail.length - 1 ? (
              <Link href={t.href} className="hover:underline underline-offset-4">{t.label}</Link>
            ) : (
              <span aria-current="page" className={tone === "light" ? "text-ivory" : "text-charcoal"}>{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
