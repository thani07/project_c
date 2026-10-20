import { imageFiles, type ImageKey } from "./image-files.generated";
import type { ImageAsset } from "@/lib/types";

/**
 * Image catalog. Files and licences live in image-files.generated.ts (built from
 * scripts/images.manifest.json); alt text and focal points are curated here.
 * All photographs are illustrative stock from Wikimedia Commons, not SRK Catering events.
 */
const meta: Record<ImageKey, { alt: string; focal?: string }> = {
  "sadya-art": { alt: "A South Indian feast served on a banana leaf with rice, curries, pickles and papadam", focal: "60% 50%" },
  "sadya-feast": { alt: "Banana-leaf sadya with rice, papadam, banana and a spread of vegetarian side dishes", focal: "55% 55%" },
  "banana-leaf-meal": { alt: "Traditional South Indian meal on a banana leaf with rice, sides and papadam", focal: "55% 50%" },
  "thali-banana-leaf": { alt: "A South Indian meal laid out on a banana leaf with many small bowls of curries and poriyal", focal: "50% 50%" },
  "thali-veg": { alt: "Round steel plate lined with banana leaf holding puri, rice, sambar and several side dishes", focal: "50% 50%" },
  "thali-cropped": { alt: "Steel tiffin thali with dosa, puri, medu vadai, rice and chutneys", focal: "50% 55%" },
  "karnataka-plantain": { alt: "Karnataka-style lunch served on a plantain leaf with rice, chips, chutney and sides", focal: "50% 50%" },
  "wedding-meal": { alt: "Overhead view of a festive banana-leaf meal with rice, sweets and savouries", focal: "50% 50%" },
  "idli-sambar-a": { alt: "Soft idlis served with sambar and green coconut chutney", focal: "40% 50%" },
  "idli-sambar-b": { alt: "Idli topped with sambar beside chutneys on a banana leaf", focal: "50% 45%" },
  "idli-kempu": { alt: "Red-rice idlis with a bowl of spiced chutney on a banana leaf", focal: "60% 50%" },
  "idli-steam": { alt: "A steel idli steamer on the stove, ready for a batch of idlis", focal: "50% 50%" },
  "dosa-a": { alt: "A long crisp masala dosa on a plate with sambar and coconut chutney", focal: "50% 50%" },
  "dosa-b": { alt: "Golden crisp dosa with coconut chutney and sambar on a steel plate", focal: "45% 45%" },
  "pongal-b": { alt: "Ven pongal garnished with cashews", focal: "50% 40%" },
  "vadai-a": { alt: "Four golden medu vadais on a banana leaf with sambar and chutneys", focal: "50% 60%" },
  "vadai-b": { alt: "Crisp vadai served on a palm-leaf plate", focal: "50% 50%" },
  "lemon-rice": { alt: "Fragrant lemon rice with curry leaves and a lime wedge", focal: "50% 50%" },
  "curd-rice": { alt: "Curd rice garnished with pomegranate, cashews and tempered chilli", focal: "40% 50%" },
  "avial-b": { alt: "Avial, a mixed vegetable and coconut curry with curry leaves", focal: "50% 50%" },
  "rasam-b": { alt: "A bowl of tangy rasam served with papadam", focal: "50% 50%" },
  "payasam-a": { alt: "A glass bowl of saffron-topped payasam beside raw rice on a leaf", focal: "55% 30%" },
  "payasam-c": { alt: "Semiya payasam in a large serving vessel with a ladle", focal: "50% 50%" },
  "mysore-pak": { alt: "Golden Mysore pak squares with a lit diya on a silk cloth", focal: "50% 55%" },
  "sweets-mix": { alt: "Plate of assorted Indian sweets including laddu and barfi", focal: "50% 55%" },
  "sweets-chennai": { alt: "Trays of freshly made sweets in a warm display counter", focal: "50% 88%" },
  "murukku-a": { alt: "Crisp coiled murukku, a traditional Tamil savoury snack", focal: "50% 50%" },
  "murukku-b": { alt: "Two large ring-shaped murukku", focal: "50% 50%" },
  "banquet-decor": { alt: "Flower-decorated entrance arch of a wedding hall at night", focal: "50% 55%" },
  "puducherry-wedding": { alt: "Floral stage backdrop at a South Indian wedding with guests gathered", focal: "50% 50%" },
  "wedding-diya": { alt: "A clay diya burning at a Tamil wedding with soft flowers behind", focal: "60% 45%" },
  "marigold-garland": { alt: "Bright orange marigold flowers, used in South Indian celebrations", focal: "50% 50%" },
  "serving-a": { alt: "A server in a traditional sari carrying a basket of papadam at a feast", focal: "40% 50%" },
  "serving-b": { alt: "A server ladling food onto banana leaves at a sadya serving table", focal: "45% 50%" },
};

export function getImage(key: ImageKey): ImageAsset {
  const f = imageFiles[key];
  return { src: f.src, width: f.width, height: f.height, alt: meta[key].alt, focal: meta[key].focal, source: f.title };
}

export type { ImageKey };
export const allImageKeys = Object.keys(imageFiles) as ImageKey[];
