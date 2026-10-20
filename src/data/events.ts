import type { EventType } from "@/lib/types";

export const eventTypes: EventType[] = [
  { id: "wedding", label: "Wedding" },
  { id: "reception", label: "Reception" },
  { id: "engagement", label: "Engagement" },
  { id: "birthday", label: "Birthday" },
  { id: "housewarming", label: "Housewarming" },
  { id: "family", label: "Family function" },
  { id: "religious", label: "Religious / festive function" },
  { id: "corporate", label: "Corporate event" },
  { id: "bulk", label: "Bulk / packed meals" },
  { id: "other", label: "Other function" },
];

export const guestRanges = ["Under 100", "100–250", "250–500", "500+"] as const;

export const foodPreferences = [
  { id: "veg", label: "Vegetarian" },
  { id: "non-veg", label: "Non-vegetarian" },
  { id: "both", label: "Both" },
] as const;

export const servingStyles = [
  { id: "traditional", label: "Traditional serving (banana leaf)" },
  { id: "buffet", label: "Buffet" },
  { id: "packed", label: "Packed meals" },
  { id: "undecided", label: "Not decided yet" },
] as const;

export const budgetRanges = ["Prefer to discuss", "Economy", "Mid-range", "Premium"] as const;
