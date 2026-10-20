import type { CateringService } from "@/lib/types";
import type { ImageKey } from "./images";

type Service = Omit<CateringService, "image"> & { image: ImageKey };

/** Descriptions are editable marketing copy, not verified operational claims. */
export const services: Service[] = [
  {
    id: "weddings",
    title: "Wedding Catering",
    eventType: "wedding",
    summary: "Muhurtham breakfast to the grand banana-leaf feast, planned around your ceremony timings.",
    detail:
      "A wedding menu follows the rhythm of the day: a tiffin spread before the muhurtham, a leaf-served lunch with the full progression of rice, sambar, rasam, kootu, poriyal and payasam, and an evening snack counter. Menus are discussed with you course by course.",
    highlights: ["Muhurtham tiffin and lunch", "Traditional leaf service", "Sweets and payasam courses"],
    image: "banquet-decor",
  },
  {
    id: "receptions",
    title: "Reception Catering",
    eventType: "reception",
    summary: "Live counters and a buffet of regional favourites for an evening that flows.",
    detail:
      "Receptions suit a more relaxed format: live dosa and snack counters, a plated or buffet dinner and a dessert station. We can balance classic South Indian dishes with lighter options for a mixed guest list.",
    highlights: ["Live counter options", "Buffet or plated dinner", "Dessert stations"],
    image: "sweets-chennai",
  },
  {
    id: "engagements",
    title: "Engagement Ceremonies",
    eventType: "engagement",
    summary: "An intimate, festive menu for the first celebration of two families.",
    detail:
      "Engagement functions are often smaller and more personal. Expect a compact traditional menu, sweets for the exchange of tambulam and a tiffin or lunch format that suits your venue.",
    highlights: ["Compact traditional menus", "Sweets and savouries", "Tiffin or lunch format"],
    image: "marigold-garland",
  },
  {
    id: "birthdays",
    title: "Birthday Celebrations",
    eventType: "birthday",
    summary: "Family-friendly menus with sweets, snacks and favourites for all ages.",
    detail:
      "From first birthdays to milestone celebrations, we build menus around the guest list, mixing familiar comfort dishes with festive sweets.",
    highlights: ["Child-friendly options", "Sweets and snacks", "Flexible portions"],
    image: "sweets-mix",
  },
  {
    id: "housewarming",
    title: "Housewarming Functions",
    eventType: "housewarming",
    summary: "A welcoming spread to bless a new home, from tiffin to a full leaf meal.",
    detail:
      "Griha pravesam functions traditionally centre on a simple, auspicious menu, often beginning with milk and payasam. We plan the timing and serving around your pooja.",
    highlights: ["Auspicious, simple menus", "Payasam and sweets", "Timed around the pooja"],
    image: "payasam-c",
  },
  {
    id: "family",
    title: "Family Celebrations",
    eventType: "family",
    summary: "Reunions, anniversaries and festival gatherings, served the way home tastes.",
    detail:
      "For gatherings where everyone sits down together, a full traditional meal is hard to beat. We can scale a leaf-served menu to the size of your family and the space you have.",
    highlights: ["Full traditional meals", "Scaled to your space", "Vegetarian-first menus"],
    image: "banana-leaf-meal",
  },
  {
    id: "festive",
    title: "Religious and Festive Functions",
    eventType: "religious",
    summary: "Prasadam-style sweets and festival menus for poojas, homams and temple events.",
    detail:
      "Festive and religious functions often call for specific menus. Share your tradition and any dietary observances and we will plan accordingly.",
    highlights: ["Observance-aware menus", "Sweets and prasadam-style items", "Large-gathering service"],
    image: "mysore-pak",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    eventType: "corporate",
    summary: "Office celebrations, training lunches and festive team meals, served with care.",
    detail:
      "From a Pongal celebration at the office to a working lunch, we can provide a reliable, well-timed South Indian menu in buffet or packed formats.",
    highlights: ["Buffet or packed formats", "Festival celebrations", "Timed service"],
    image: "serving-a",
  },
  {
    id: "bulk",
    title: "Bulk Meals and Packed Food",
    eventType: "bulk",
    summary: "Large-quantity cooking and packed meals for gatherings and distribution.",
    detail:
      "For annadhanam, community events or off-site gatherings, we can discuss large-quantity cooking and packed meal arrangements. Availability and quantities are confirmed per request.",
    highlights: ["Large-quantity cooking", "Packed meal options", "Confirmed per request"],
    image: "idli-steam",
  },
];

export const homeServices: { id: string; title: string; text: string; image: ImageKey; eventType: string }[] = [
  {
    id: "weddings",
    title: "Wedding Catering",
    text: "From the muhurtham tiffin to the grand leaf-served feast, menus planned course by course around your ceremony.",
    image: "banquet-decor",
    eventType: "wedding",
  },
  {
    id: "receptions",
    title: "Reception Catering",
    text: "Live counters, a generous buffet and dessert stations for an evening of good food and conversation.",
    image: "sweets-chennai",
    eventType: "reception",
  },
  {
    id: "family",
    title: "Family Functions",
    text: "Housewarmings, birthdays and festival gatherings, served the way a family meal should taste.",
    image: "banana-leaf-meal",
    eventType: "family",
  },
  {
    id: "corporate",
    title: "Corporate and Bulk Catering",
    text: "Reliable, well-timed South Indian meals for office celebrations, training days and large gatherings.",
    image: "serving-a",
    eventType: "corporate",
  },
];
