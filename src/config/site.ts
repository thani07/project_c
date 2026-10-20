/**
 * Central, editable business configuration.
 *
 * Contact fields are intentionally empty: no phone number, email, address or
 * social account has been supplied for SRK Catering. Fill them in here and the
 * header, footer, contact page, WhatsApp actions and structured data all pick
 * them up. Empty values are hidden in the UI rather than faked.
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  supportingMessage: string;
  description: string;
  announcement: string;
  url: string;
  contact: {
    whatsappNumber: string;
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    address: string;
    serviceArea: string;
    hours: string;
  };
  enquiryMode: "demo" | "live";
  social: { instagram: string; facebook: string; youtube: string };
}

export const siteConfig: SiteConfig = {
  name: "SRK Catering",
  tagline: "Every Feast Begins with Tradition.",
  supportingMessage:
    "Bringing the Rich Flavours of South India to Life's Most Memorable Celebrations.",
  description:
    "South Indian catering for weddings, receptions, family functions, traditional ceremonies and corporate events. Authentic flavours, thoughtfully planned menus.",
  announcement: "Bringing Traditional South Indian Flavours to Your Special Occasions.",
  /** Production origin, used for metadata. Set NEXT_PUBLIC_SITE_URL when deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    /** International format digits only, e.g. "919876543210". Leave empty until supplied. */
    whatsappNumber: "",
    /** Human-readable phone, e.g. "+91 98765 43210". */
    phoneDisplay: "",
    /** Phone for tel: links, e.g. "+919876543210". */
    phoneHref: "",
    email: "",
    address: "",
    serviceArea: "",
    hours: "",
  },

  /**
   * How enquiries are handled. "demo" means the form validates and shows an honest
   * demo result but sends and stores nothing. Wire a real endpoint in src/lib/submitEnquiry.ts
   * and switch this to "live" when a backend exists.
   */
  enquiryMode: "demo",

  /** Add real profile URLs here; empty entries are not rendered. */
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
};

export const hasContactDetails = Boolean(
  siteConfig.contact.phoneDisplay || siteConfig.contact.email || siteConfig.contact.address,
);
