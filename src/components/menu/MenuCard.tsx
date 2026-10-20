import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { enquiryHref } from "@/lib/enquiry";
import type { MenuItem } from "@/lib/types";

export function DietMark({ diet }: { diet: MenuItem["diet"] }) {
  const veg = diet === "veg";
  return (
    <span
      className={`inline-flex size-[1.125rem] items-center justify-center border-[1.5px] bg-white ${veg ? "border-leaf" : "border-maroon"}`}
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`size-2 rounded-full ${veg ? "bg-leaf" : "bg-maroon"}`} />
    </span>
  );
}

export function MenuCard({
  item,
  showPrice = true,
  categoryLabel,
  sizes = "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw",
}: {
  item: MenuItem;
  showPrice?: boolean;
  categoryLabel?: string;
  sizes?: string;
}) {
  return (
    <article className="group flex h-full flex-col">
      <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ivory-deep">
        <Photo name={item.image} sizes={sizes} />
        <div className="absolute left-3 top-3"><DietMark diet={item.diet} /></div>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        {categoryLabel && <p className="eyebrow !text-[0.6875rem]">{categoryLabel}</p>}
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug text-charcoal">{item.name}</h3>
          {showPrice && item.samplePrice && (
            <p className="shrink-0 pt-1 text-sm font-semibold text-maroon">
              ₹{item.samplePrice}
              <span className="block text-right text-[0.625rem] font-normal uppercase tracking-wider text-ink-soft">sample</span>
            </p>
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
        <Link
          href={enquiryHref({ items: [item.id] })}
          className="mt-4 w-fit border-b border-gold pb-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-maroon transition-colors hover:border-maroon"
        >
          Enquire<span className="sr-only"> about {item.name}</span>
        </Link>
      </div>
    </article>
  );
}
