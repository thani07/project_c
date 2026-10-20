"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MenuCard } from "./MenuCard";
import { ButtonLink } from "@/components/ui/Button";
import { menuCategories, menuItems } from "@/data/menu";
import { enquiryHref } from "@/lib/enquiry";
import { cn } from "@/lib/cn";
import type { Diet, MenuCategoryId } from "@/lib/types";

type CategoryFilter = MenuCategoryId | "all";
type DietFilter = Diet | "all";

const liveCategories = menuCategories.filter((c) => menuItems.some((m) => m.category === c.id));
const hasBothDiets = new Set(menuItems.map((m) => m.diet)).size > 1;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-[3px] border px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide transition-colors",
        active
          ? "border-maroon bg-maroon text-ivory"
          : "border-line bg-white/60 text-charcoal hover:border-maroon hover:text-maroon",
      )}
    >
      {children}
    </button>
  );
}

export function MenuExplorer() {
  const params = useSearchParams();
  const initial = params.get("category");
  const [category, setCategory] = useState<CategoryFilter>(
    liveCategories.some((c) => c.id === initial) ? (initial as MenuCategoryId) : "all",
  );
  const [diet, setDiet] = useState<DietFilter>("all");

  const visible = useMemo(
    () =>
      menuItems.filter(
        (m) => (category === "all" || m.category === category) && (diet === "all" || m.diet === diet),
      ),
    [category, diet],
  );

  const grouped = useMemo(
    () =>
      liveCategories
        .map((c) => ({ ...c, items: visible.filter((m) => m.category === c.id) }))
        .filter((g) => g.items.length > 0),
    [visible],
  );

  const reset = () => {
    setCategory("all");
    setDiet("all");
  };

  return (
    <div>
      <div className="sticky top-[4.25rem] z-20 -mx-5 border-y border-line/70 bg-ivory/95 px-5 py-4 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:top-[4.75rem] lg:-mx-12 lg:px-12">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>All dishes</Chip>
          {liveCategories.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</Chip>
          ))}
        </div>
        {hasBothDiets && (
          <div role="group" aria-label="Filter by diet" className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-[0.18em] text-ink-soft">Diet</span>
            <Chip active={diet === "all"} onClick={() => setDiet("all")}>All</Chip>
            <Chip active={diet === "veg"} onClick={() => setDiet("veg")}>Vegetarian</Chip>
            <Chip active={diet === "non-veg"} onClick={() => setDiet("non-veg")}>Non-vegetarian</Chip>
          </div>
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "dish" : "dishes"} shown
      </p>

      {visible.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md text-center">
          <h2 className="font-display text-2xl text-charcoal">No dishes match those filters</h2>
          <p className="mt-3 text-ink-soft">Try a different category, or tell us what you have in mind and we will plan it.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="rounded-[3px] border border-maroon px-5 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-maroon hover:bg-maroon hover:text-ivory">
              Clear filters
            </button>
            <ButtonLink href={enquiryHref()} variant="ghost">Ask about a custom menu</ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-12 space-y-20">
          {grouped.map((g) => (
            <section key={g.id} aria-labelledby={`cat-${g.id}`}>
              <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 id={`cat-${g.id}`} className="font-display text-2xl text-maroon sm:text-3xl">{g.label}</h2>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">{g.items.length} {g.items.length === 1 ? "dish" : "dishes"}</p>
              </div>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item) => (
                  <li key={item.id}><MenuCard item={item} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" /></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
