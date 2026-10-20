import type { GalleryCategoryId, GalleryImage } from "@/lib/types";

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "meals", label: "Traditional Meals" },
  { id: "weddings", label: "Wedding Catering" },
  { id: "tiffin", label: "Breakfast and Tiffin" },
  { id: "sweets", label: "Sweets and Desserts" },
  { id: "buffet", label: "Buffet and Service" },
  { id: "counters", label: "Food Counters" },
  { id: "setups", label: "Event Setups" },
];

/** Illustrative stock imagery; replace with SRK Catering's own event photographs when available. */
export const galleryImages: GalleryImage[] = [
  { id: "g-sadya", image: "sadya-art", category: "meals", caption: "A festive banana-leaf sadya", shape: "landscape" },
  { id: "g-thali", image: "thali-veg", category: "meals", caption: "Steel thali on a banana leaf", shape: "square" },
  { id: "g-plantain", image: "karnataka-plantain", category: "meals", caption: "Plantain-leaf lunch", shape: "landscape" },
  { id: "g-leaf-meal", image: "banana-leaf-meal", category: "meals", caption: "Rice and sides on a leaf", shape: "landscape" },
  { id: "g-wedding-feast", image: "thali-banana-leaf", category: "weddings", caption: "A wedding-style leaf spread", shape: "landscape" },
  { id: "g-muhurtham", image: "wedding-meal", category: "weddings", caption: "Muhurtham leaf meal from above", shape: "landscape" },
  { id: "g-marigold", image: "marigold-garland", category: "weddings", caption: "Marigolds for the celebration", shape: "square" },
  { id: "g-diya", image: "wedding-diya", category: "weddings", caption: "A diya at a Tamil wedding", shape: "square" },
  { id: "g-dosa", image: "dosa-a", category: "tiffin", caption: "Masala dosa with chutneys", shape: "landscape" },
  { id: "g-dosa-b", image: "dosa-b", category: "tiffin", caption: "Crisp dosa and sambar", shape: "portrait" },
  { id: "g-idli", image: "idli-sambar-a", category: "tiffin", caption: "Idli with sambar and chutney", shape: "landscape" },
  { id: "g-idli-leaf", image: "idli-sambar-b", category: "tiffin", caption: "Idli on banana leaf", shape: "square" },
  { id: "g-vadai", image: "vadai-a", category: "tiffin", caption: "Medu vadai", shape: "portrait" },
  { id: "g-pongal", image: "pongal-b", category: "tiffin", caption: "Ven pongal with cashews", shape: "square" },
  { id: "g-mysore", image: "mysore-pak", category: "sweets", caption: "Mysore pak and a lit diya", shape: "landscape" },
  { id: "g-sweets", image: "sweets-mix", category: "sweets", caption: "Assorted traditional sweets", shape: "square" },
  { id: "g-payasam", image: "payasam-a", category: "sweets", caption: "Saffron payasam", shape: "landscape" },
  { id: "g-payasam-c", image: "payasam-c", category: "sweets", caption: "Semiya payasam in a serving vessel", shape: "square" },
  { id: "g-serving-a", image: "serving-a", category: "buffet", caption: "Serving papadam at a feast", shape: "portrait" },
  { id: "g-serving-b", image: "serving-b", category: "buffet", caption: "Serving a sadya", shape: "landscape" },
  { id: "g-lemon", image: "lemon-rice", category: "buffet", caption: "Lemon rice", shape: "square" },
  { id: "g-curd", image: "curd-rice", category: "buffet", caption: "Curd rice with pomegranate", shape: "landscape" },
  { id: "g-counter-sweets", image: "sweets-chennai", category: "counters", caption: "A sweets counter", shape: "landscape" },
  { id: "g-steamer", image: "idli-steam", category: "counters", caption: "Idlis steaming in the kitchen", shape: "portrait" },
  { id: "g-murukku", image: "murukku-a", category: "counters", caption: "Murukku snack counter", shape: "square" },
  { id: "g-banquet", image: "banquet-decor", category: "setups", caption: "A flower-decorated hall entrance", shape: "portrait" },
  { id: "g-stage", image: "puducherry-wedding", category: "setups", caption: "A floral wedding stage", shape: "landscape" },
];
