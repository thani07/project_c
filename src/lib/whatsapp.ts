import { siteConfig } from "@/config/site";

/** Digits only, no leading zeros or "+", as wa.me requires. */
export function normaliseWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, "").replace(/^0+/, "");
}

export function isWhatsAppConfigured(number: string = siteConfig.contact.whatsappNumber): boolean {
  const n = normaliseWhatsAppNumber(number);
  return n.length >= 8 && n.length <= 15;
}

/**
 * Builds a https://wa.me/<number>?text=<encoded> URL.
 * Returns null when no WhatsApp number is configured, so callers can hide the action
 * instead of sending enquiries to an arbitrary contact.
 */
export function buildWhatsAppUrl(message: string, number: string = siteConfig.contact.whatsappNumber): string | null {
  if (!isWhatsAppConfigured(number)) return null;
  return `https://wa.me/${normaliseWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;
}

export interface EnquirySummaryInput {
  name?: string;
  phone?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  foodPreference?: string;
  servingStyle?: string;
  packageName?: string;
  menuItems?: string[];
  location?: string;
  budget?: string;
  notes?: string;
}

export function buildEnquiryMessage(i: EnquirySummaryInput): string {
  const fields = [
    i.name && `Name: ${i.name}`,
    i.phone && `Phone: ${i.phone}`,
    i.email && `Email: ${i.email}`,
    i.eventType && `Event: ${i.eventType}`,
    i.eventDate && `Date: ${i.eventDate}`,
    i.guests && `Guests: ${i.guests}`,
    i.foodPreference && `Food preference: ${i.foodPreference}`,
    i.servingStyle && `Serving style: ${i.servingStyle}`,
    i.packageName && `Package: ${i.packageName}`,
    i.menuItems?.length ? `Dishes of interest: ${i.menuItems.join(", ")}` : "",
    i.location && `Venue / location: ${i.location}`,
    i.budget && `Budget: ${i.budget}`,
    i.notes && `Notes: ${i.notes}`,
  ].filter(Boolean);
  const intro = `Hello ${siteConfig.name}, I would like to enquire about catering.`;
  return fields.length ? `${intro}\n\n${fields.join("\n")}` : intro;
}
