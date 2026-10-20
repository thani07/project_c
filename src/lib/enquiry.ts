/** Helpers for linking into the enquiry form with context preserved. */
export function enquiryHref(opts: { event?: string; package?: string; items?: string[] } = {}): string {
  const p = new URLSearchParams();
  if (opts.event) p.set("event", opts.event);
  if (opts.package) p.set("package", opts.package);
  if (opts.items?.length) p.set("items", opts.items.join(","));
  const qs = p.toString();
  return qs ? `/contact?${qs}#enquiry` : "/contact#enquiry";
}
