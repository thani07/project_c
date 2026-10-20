import type { CateringPackage } from "@/lib/types";

/**
 * ILLUSTRATIVE SAMPLE PACKAGES. Guest ranges and per-plate figures are
 * placeholders, not SRK Catering rates. Replace before launch.
 */
export const packages: CateringPackage[] = [
  {
    id: "traditional-feast",
    name: "Traditional Feast",
    tagline: "The classic leaf-served South Indian meal",
    description:
      "A full vegetarian meal in the traditional order of service, suited to family functions, housewarmings and festival gatherings.",
    image: "banana-leaf-meal",
    diet: "Vegetarian",
    sampleGuestRange: "Sample: 50–250 guests",
    samplePricePerPlate: "Sample: from ₹350 per plate",
    highlights: ["Banana-leaf service", "Sambar, rasam and kootu", "Payasam to finish"],
    menu: [
      { course: "To begin", items: ["Welcome drink", "Pickle and salt", "Appalam"] },
      { course: "Main", items: ["Rice, sambar, rasam", "Kootu and poriyal", "Vadai"] },
      { course: "To finish", items: ["Payasam", "Curd rice", "Buttermilk"] },
    ],
  },
  {
    id: "wedding-celebration",
    name: "Wedding Celebration",
    tagline: "Tiffin, feast and snack counter for the whole day",
    description:
      "A multi-meal plan for wedding days: a muhurtham tiffin, the grand leaf-served lunch and an evening snack and sweets counter.",
    image: "sadya-art",
    diet: "Vegetarian",
    sampleGuestRange: "Sample: 250–1000 guests",
    samplePricePerPlate: "Sample: from ₹650 per guest",
    highlights: ["Muhurtham tiffin", "Grand leaf-served lunch", "Evening snack counter"],
    menu: [
      { course: "Morning tiffin", items: ["Idli, dosa and vadai", "Ven pongal", "Filter coffee"] },
      { course: "Wedding feast", items: ["Multi-course leaf meal", "Mysore pak and payasam", "Rice varieties"] },
      { course: "Evening", items: ["Snack counter", "Sweets", "Tea and coffee"] },
    ],
  },
  {
    id: "custom-event",
    name: "Custom Event Menu",
    tagline: "Built with you, dish by dish",
    description:
      "Tell us your occasion, guest count, dietary needs and serving format and we will shape a menu around it, from a corporate lunch to an engagement dinner.",
    image: "mysore-pak",
    diet: "Vegetarian and non-vegetarian",
    sampleGuestRange: "Sample: any size, confirmed per request",
    samplePricePerPlate: "Sample: quoted after discussion",
    highlights: ["Flexible dishes and formats", "Buffet, leaf or packed", "Quote after consultation"],
    menu: [
      { course: "You choose", items: ["Tiffin, meals or snacks", "Rice and curries", "Sweets and dessert"] },
      { course: "We advise", items: ["Quantities and timings", "Serving style", "Dietary requirements"] },
    ],
  },
];
