"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { galleryCategories, galleryImages } from "@/data/gallery";
import { getImage } from "@/data/images";
import { cn } from "@/lib/cn";
import type { GalleryCategoryId } from "@/lib/types";

const aspect = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square" } as const;

export function GalleryExplorer() {
  const params = useSearchParams();
  const [category, setCategory] = useState<GalleryCategoryId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(() => {
    const id = params.get("image");
    return galleryImages.some((g) => g.id === id) ? id : null;
  });
  const returnFocus = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (category === "all" ? galleryImages : galleryImages.filter((g) => g.category === category)),
    [category],
  );
  const index = openId ? visible.findIndex((g) => g.id === openId) : -1;
  const current = index >= 0 ? visible[index] : null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!visible.length) return;
      const next = (Math.max(index, 0) + dir + visible.length) % visible.length;
      setOpenId(visible[next].id);
    },
    [index, visible],
  );

  const close = useCallback(() => {
    setOpenId(null);
    // Wait for the modal dialog to unmount; focusing while it is still open is ignored.
    requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);

  return (
    <div>
      <div role="group" aria-label="Filter gallery by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:flex-wrap">
        {[{ id: "all" as const, label: "All photos" }, ...galleryCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => {
              setCategory(c.id);
              setOpenId(null);
            }}
            className={cn(
              "whitespace-nowrap rounded-[3px] border px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide transition-colors",
              category === c.id
                ? "border-maroon bg-maroon text-ivory"
                : "border-line bg-white/60 text-charcoal hover:border-maroon hover:text-maroon",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{visible.length} photos shown</p>

      <ul className="mt-10 columns-2 gap-3 md:columns-3 lg:gap-4 xl:columns-4">
        {visible.map((g) => (
          <li key={g.id} className="mb-3 break-inside-avoid lg:mb-4">
            <button
              type="button"
              onClick={(e) => {
                returnFocus.current = e.currentTarget;
                setOpenId(g.id);
              }}
              className="img-zoom group relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-ivory-deep text-left"
              aria-label={`View larger: ${g.caption}`}
            >
              <span className={cn("relative block w-full", aspect[g.shape])}>
                <Photo name={g.image} sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw" />
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent px-3 pb-3 pt-10 text-xs text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {g.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && <Lightbox key="lb" item={current} position={index + 1} total={visible.length} onClose={close} onStep={step} />}
    </div>
  );
}

function Lightbox({
  item,
  position,
  total,
  onClose,
  onStep,
}: {
  item: (typeof galleryImages)[number];
  position: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const img = getImage(item.image);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={`Gallery image ${position} of ${total}: ${item.caption}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onStep(1);
        if (e.key === "ArrowLeft") onStep(-1);
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-ivory backdrop:bg-charcoal/95"
    >
      <div className="relative flex h-full flex-col" data-on-dark>
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-sm text-ivory/70" aria-hidden="true">{position} / {total}</p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close gallery viewer"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/30 hover:bg-ivory/10"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 hover:bg-ivory/15 sm:left-5"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <Image
            key={item.id}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="100vw"
            quality={85}
            className="max-h-full w-auto max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 hover:bg-ivory/15 sm:right-5"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p className="px-4 py-4 text-center text-sm text-ivory/85 sm:px-6">{item.caption}</p>
      </div>
    </dialog>
  );
}
