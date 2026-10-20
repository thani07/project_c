import { siteConfig } from "@/config/site";
import type { EnquiryValues } from "./validation";

export type SubmitResult = { ok: true; mode: "demo" | "live" } | { ok: false; error: string };

/**
 * Single seam for enquiry delivery.
 *
 * In "demo" mode nothing leaves the browser and nothing is stored; the UI says so.
 * To go live, POST `values` to a real endpoint here (with server-side validation,
 * spam protection and storage) and set siteConfig.enquiryMode to "live".
 */
export async function submitEnquiry(values: EnquiryValues): Promise<SubmitResult> {
  if (siteConfig.enquiryMode === "demo") {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, mode: "demo" };
  }
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) return { ok: false, error: `The server responded with ${res.status}.` };
    return { ok: true, mode: "live" };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Please check your connection and try again." };
  }
}
