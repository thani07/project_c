export interface EnquiryValues {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  foodPreference: string;
  servingStyle: string;
  packageId: string;
  location: string;
  budget: string;
  notes: string;
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function isValidPhone(raw: string): boolean {
  const s = raw.replace(/[\s().-]/g, "");
  if (s.startsWith("+")) return /^\+\d{8,15}$/.test(s);
  return /^(91|0)?[6-9]\d{9}$/.test(s);
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}

function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function validateEnquiry(v: EnquiryValues, now = new Date()): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number so we can reach you.";
  else if (!isValidPhone(v.phone)) e.phone = "Enter a valid phone number, e.g. 98765 43210 or +91 98765 43210.";
  if (v.email.trim() && !isValidEmail(v.email.trim())) e.email = "That email address doesn't look right.";
  if (!v.eventType) e.eventType = "Please choose an event type.";
  if (!v.eventDate) e.eventDate = "Please choose your event date.";
  else if (v.eventDate < todayISO(now)) e.eventDate = "The event date can't be in the past.";
  if (!v.guests) e.guests = "Please choose an approximate guest count.";
  if (!v.foodPreference) e.foodPreference = "Please choose a food preference.";
  if (!v.servingStyle) e.servingStyle = "Please choose a serving style, or 'Not decided yet'.";
  if (v.location.trim().length < 3) e.location = "Please tell us the venue or city.";
  if (v.notes.length > 1500) e.notes = "Please keep additional requirements under 1500 characters.";
  if (!v.consent) e.consent = "Please agree so we can contact you about this enquiry.";
  return e;
}

export { todayISO };
