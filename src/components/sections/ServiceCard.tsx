import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import type { ImageKey } from "@/data/images";

/** Image-led service tile with copy over a restrained gradient. */
export function ServiceCard({
  title,
  text,
  image,
  href,
  actionLabel = "Plan this event",
  className,
  sizes,
}: {
  title: string;
  text: string;
  image: ImageKey;
  href: string;
  actionLabel?: string;
  className?: string;
  sizes: string;
}) {
  return (
    <article className={cn("img-zoom group relative isolate overflow-hidden rounded-[var(--radius-card)] bg-charcoal text-ivory", className)} data-on-dark>
      <div className="absolute inset-0 -z-10">
        <Photo name={image} sizes={sizes} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 via-55% to-transparent" />
      </div>
      <div className="flex h-full flex-col justify-end p-6 sm:p-8">
        <h3 className="font-display text-2xl sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/85 sm:text-[0.95rem]">{text}</p>
        <Link
          href={href}
          className="mt-5 inline-flex w-fit items-center gap-2 border-b border-gold pb-1 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:text-gold after:absolute after:inset-0"
        >
          {actionLabel}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          <span className="sr-only">: {title}</span>
        </Link>
      </div>
    </article>
  );
}
