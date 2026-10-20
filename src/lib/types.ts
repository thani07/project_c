import type { ImageKey } from "@/data/images";

export type Diet = "veg" | "non-veg";

export type MenuCategoryId =
  | "meals"
  | "tiffin"
  | "rice"
  | "vegetarian"
  | "non-veg"
  | "sweets"
  | "snacks"
  | "wedding";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryId;
  diet: Diet;
  image: ImageKey;
  /** Illustrative sample price in INR per plate/portion; omitted when not shown. */
  samplePrice?: number;
  featured?: boolean;
}

export interface EventType {
  id: string;
  label: string;
}

export interface CateringService {
  id: string;
  title: string;
  /** Event type id preselected in the enquiry form. */
  eventType: string;
  summary: string;
  detail: string;
  highlights: string[];
  image: ImageKey;
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: ImageKey;
  diet: "Vegetarian" | "Vegetarian and non-vegetarian";
  /** Clearly illustrative figures only. */
  sampleGuestRange: string;
  samplePricePerPlate: string;
  highlights: string[];
  menu: { course: string; items: string[] }[];
}

export type GalleryCategoryId =
  | "meals"
  | "weddings"
  | "tiffin"
  | "sweets"
  | "buffet"
  | "counters"
  | "setups";

export interface GalleryImage {
  id: string;
  image: ImageKey;
  category: GalleryCategoryId;
  caption: string;
  /** Layout hint for the editorial grid. */
  shape: "landscape" | "portrait" | "square";
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position keeping the dish in frame. */
  focal?: string;
  /** Commons file title used to look up attribution. */
  source?: string;
}
