"use client";

import Image from "next/image";
import { useState } from "react";
import { getImage, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

interface PhotoProps {
  name: ImageKey;
  sizes: string;
  /** Preload for above-the-fold (LCP) imagery only; everything else lazy-loads. */
  preload?: boolean;
  className?: string;
  imgClassName?: string;
  /** Override the curated focal point. */
  focal?: string;
  quality?: 60 | 75 | 85;
}

/**
 * Fills its positioned parent with a cropped, lazily loaded photograph.
 * The parent controls the aspect ratio. On a load error it shows a labelled
 * tonal block instead of a broken-image icon.
 */
export function Photo({ name, sizes, preload, className, imgClassName, focal, quality = 75 }: PhotoProps) {
  const img = getImage(name);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={img.alt}
        className={cn("absolute inset-0 flex items-end bg-ivory-deep p-4 text-sm text-ink-soft", className)}
      >
        {img.alt}
      </div>
    );
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      quality={quality}
      preload={preload}
      loading={preload ? undefined : "lazy"}
      onError={() => setFailed(true)}
      className={cn("object-cover", className, imgClassName)}
      style={{ objectPosition: focal ?? img.focal ?? "50% 50%" }}
    />
  );
}
