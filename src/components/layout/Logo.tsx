import Link from "next/link";
import { cn } from "@/lib/cn";

/** Kolam-inspired mark: a diamond lattice around a small leaf. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden="true" fill="none">
      <rect x="6" y="6" width="28" height="28" rx="1" transform="rotate(45 20 20)" stroke="currentColor" strokeWidth="1.25" />
      <rect x="11" y="11" width="18" height="18" rx="1" transform="rotate(45 20 20)" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d="M20 12.5c4.2 2.6 5.6 7.4 0 15-5.6-7.6-4.2-12.4 0-15Z" fill="currentColor" />
      <path d="M20 16v10" stroke="var(--logo-vein, #f8f1e5)" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label="SRK Catering, home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark
        className={cn(
          "transition-transform duration-500 group-hover:rotate-[8deg]",
          light ? "text-gold [--logo-vein:#54141f]" : "text-maroon",
        )}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.65rem] font-semibold tracking-tight", light ? "text-ivory" : "text-maroon")}>
          SRK
        </span>
        <span
          className={cn(
            "mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.42em]",
            light ? "text-gold" : "text-gold-deep",
          )}
        >
          Catering
        </span>
      </span>
    </Link>
  );
}
