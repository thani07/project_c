"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Copy, Loader2, Mail, X } from "lucide-react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { FormField, inputClass } from "./FormField";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { siteConfig } from "@/config/site";
import { budgetRanges, eventTypes, foodPreferences, guestRanges, servingStyles } from "@/data/events";
import { menuItems } from "@/data/menu";
import { packages } from "@/data/packages";
import { buildEnquiryMessage } from "@/lib/whatsapp";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { todayISO, validateEnquiry, type EnquiryErrors, type EnquiryValues } from "@/lib/validation";

const empty: EnquiryValues = {
  name: "", phone: "", email: "", eventType: "", eventDate: "", guests: "", foodPreference: "",
  servingStyle: "", packageId: "", location: "", budget: "", notes: "", consent: false,
};

const fieldOrder: (keyof EnquiryValues)[] = [
  "name", "phone", "email", "eventType", "eventDate", "guests", "foodPreference", "servingStyle", "location", "notes", "consent",
];

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const initialEvent = params.get("event") ?? "";
  const initialPackage = params.get("package") ?? "";
  const initialItems = (params.get("items") ?? "").split(",").filter((id) => menuItems.some((m) => m.id === id));

  const [values, setValues] = useState<EnquiryValues>({
    ...empty,
    eventType: eventTypes.some((e) => e.id === initialEvent) ? initialEvent : "",
    packageId: packages.some((p) => p.id === initialPackage) || initialPackage === "custom" ? initialPackage : "",
  });
  const [items, setItems] = useState<string[]>(initialItems);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [copied, setCopied] = useState(false);
  const [minDate] = useState(() => todayISO());
  const [snapshot, setSnapshot] = useState<EnquiryValues | null>(null);

  useEffect(() => {
    if (status === "success" || status === "error") bannerRef.current?.focus();
  }, [status]);

  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const label = (list: readonly { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? "";
  const itemNames = (ids: string[]) => ids.map((id) => menuItems.find((m) => m.id === id)?.name).filter(Boolean) as string[];

  const summaryFor = (v: EnquiryValues) =>
    buildEnquiryMessage({
      name: v.name.trim(),
      phone: v.phone.trim(),
      email: v.email.trim(),
      eventType: label(eventTypes, v.eventType),
      eventDate: v.eventDate,
      guests: v.guests,
      foodPreference: label(foodPreferences, v.foodPreference),
      servingStyle: label(servingStyles, v.servingStyle),
      packageName: v.packageId === "custom" ? "Custom menu" : packages.find((p) => p.id === v.packageId)?.name,
      menuItems: itemNames(items),
      location: v.location.trim(),
      budget: v.budget,
      notes: v.notes.trim(),
    });

  const liveSummary = useMemo(
    () => (snapshot ? summaryFor(snapshot) : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapshot, items],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validateEnquiry(values);
    setErrors(found);
    const firstBad = fieldOrder.find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setFailure("");
    const result = await submitEnquiry(values);
    if (result.ok) {
      setSnapshot(values);
      setStatus("success");
    } else {
      setFailure(result.error);
      setStatus("error");
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(liveSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (status === "success" && snapshot) {
    const demo = siteConfig.enquiryMode === "demo";
    const mailto = siteConfig.contact.email
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Catering enquiry")}&body=${encodeURIComponent(liveSummary)}`
      : null;
    return (
      <div ref={bannerRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] outline-none sm:p-10">
        <CheckCircle2 className="size-10 text-leaf" aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl text-charcoal">
          {demo ? "Your details are ready to share" : "Thank you, we have your enquiry"}
        </h2>
        {demo ? (
          <p className="mt-3 rounded border border-gold/60 bg-ivory p-4 text-sm leading-relaxed text-charcoal">
            <strong>Demo mode:</strong> this website isn&apos;t connected to a booking system yet, so your enquiry has{" "}
            <strong>not been sent or saved</strong>. Please use one of the options below to pass these details to the SRK Catering
            team directly.
          </p>
        ) : (
          <p className="mt-3 text-ink-soft">The SRK Catering team will contact you to discuss your event. Your date is not reserved until confirmed by the team.</p>
        )}

        <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap rounded bg-ivory-deep p-4 font-sans text-sm text-charcoal">{liveSummary}</pre>

        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppCTA message={liveSummary} label="Send on WhatsApp" variant="primary" />
          {mailto && (
            <ButtonAnchor href={mailto} variant="secondary"><Mail className="size-4" aria-hidden="true" />Email these details</ButtonAnchor>
          )}
          <Button type="button" variant="secondary" onClick={copySummary}>
            <Copy className="size-4" aria-hidden="true" />
            {copied ? "Copied" : "Copy details"}
          </Button>
        </div>
        <p className="mt-4 text-sm text-ink-soft" role="status">{copied ? "Details copied to your clipboard." : ""}</p>
        <button
          type="button"
          onClick={() => { setStatus("idle"); setValues(empty); setItems([]); setSnapshot(null); }}
          className="mt-6 text-sm font-semibold text-maroon underline underline-offset-4"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  const err = (k: keyof EnquiryValues) => errors[k];
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="space-y-8">
      {siteConfig.enquiryMode === "demo" && (
        <p id="form-note" className="rounded border border-gold/60 bg-white/70 p-3 text-xs leading-relaxed text-ink-soft">
          <strong className="text-charcoal">Demo form:</strong> this form checks your details but doesn&apos;t send or store them yet. You&apos;ll
          get a summary to share with the team directly.
        </p>
      )}

      {status === "error" && (
        <div ref={bannerRef} tabIndex={-1} role="alert" className="flex gap-3 rounded border border-maroon bg-[#fdf3f3] p-4 text-sm text-maroon outline-none">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">We couldn&apos;t send your enquiry.</p>
            <p className="mt-1">{failure} Your details are still here, so you can try again.</p>
          </div>
        </div>
      )}
      {hasErrors && status !== "error" && (
        <p role="alert" className="text-sm font-medium text-maroon">Please fix the highlighted fields below.</p>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl text-maroon">About you</legend>
        <FormField id="name" label="Full name" required error={err("name")}>
          {(a) => <input {...a} name="name" type="text" autoComplete="name" className={inputClass} value={values.name} onChange={(e) => set("name", e.target.value)} />}
        </FormField>
        <FormField id="phone" label="Phone number" required error={err("phone")} hint="We'll call or message you on this number.">
          {(a) => <input {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={inputClass} value={values.phone} onChange={(e) => set("phone", e.target.value)} />}
        </FormField>
        <FormField id="email" label="Email" optional error={err("email")} className="sm:col-span-2">
          {(a) => <input {...a} name="email" type="email" autoComplete="email" className={inputClass} value={values.email} onChange={(e) => set("email", e.target.value)} />}
        </FormField>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl text-maroon">Your event</legend>
        <FormField id="eventType" label="Event type" required error={err("eventType")}>
          {(a) => (
            <select {...a} name="eventType" className={inputClass} value={values.eventType} onChange={(e) => set("eventType", e.target.value)}>
              <option value="">Select an event</option>
              {eventTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          )}
        </FormField>
        <FormField id="eventDate" label="Event date" required error={err("eventDate")} hint="An approximate date is fine; it isn't reserved until confirmed.">
          {(a) => <input {...a} name="eventDate" type="date" min={minDate} suppressHydrationWarning className={inputClass} value={values.eventDate} onChange={(e) => set("eventDate", e.target.value)} />}
        </FormField>
        <FormField id="guests" label="Number of guests" required error={err("guests")}>
          {(a) => (
            <select {...a} name="guests" className={inputClass} value={values.guests} onChange={(e) => set("guests", e.target.value)}>
              <option value="">Select a range</option>
              {guestRanges.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          )}
        </FormField>
        <FormField id="location" label="Venue or location" required error={err("location")}>
          {(a) => <input {...a} name="location" type="text" autoComplete="off" placeholder="Hall name or city" className={inputClass} value={values.location} onChange={(e) => set("location", e.target.value)} />}
        </FormField>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl text-maroon">Food and service</legend>
        <FormField id="foodPreference" label="Food preference" required error={err("foodPreference")}>
          {(a) => (
            <select {...a} name="foodPreference" className={inputClass} value={values.foodPreference} onChange={(e) => set("foodPreference", e.target.value)}>
              <option value="">Select a preference</option>
              {foodPreferences.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          )}
        </FormField>
        <FormField id="servingStyle" label="Serving style" required error={err("servingStyle")}>
          {(a) => (
            <select {...a} name="servingStyle" className={inputClass} value={values.servingStyle} onChange={(e) => set("servingStyle", e.target.value)}>
              <option value="">Select a style</option>
              {servingStyles.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          )}
        </FormField>
        <FormField id="packageId" label="Selected package or menu" optional hint="Choose a sample package, or leave blank.">
          {(a) => (
            <select {...a} name="packageId" className={inputClass} value={values.packageId} onChange={(e) => set("packageId", e.target.value)}>
              <option value="">No package selected</option>
              {packages.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              <option value="custom">Custom menu</option>
            </select>
          )}
        </FormField>
        <FormField id="budget" label="Budget range" optional>
          {(a) => (
            <select {...a} name="budget" className={inputClass} value={values.budget} onChange={(e) => set("budget", e.target.value)}>
              <option value="">Prefer not to say</option>
              {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        </FormField>

        {items.length > 0 && (
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold text-charcoal">Dishes you&apos;re interested in</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {items.map((id) => (
                <li key={id} className="inline-flex items-center gap-1.5 rounded-[3px] border border-leaf/40 bg-white py-1 pl-3 pr-1 text-sm text-charcoal">
                  {menuItems.find((m) => m.id === id)?.name}
                  <button
                    type="button"
                    onClick={() => setItems((list) => list.filter((x) => x !== id))}
                    aria-label={`Remove ${menuItems.find((m) => m.id === id)?.name}`}
                    className="inline-flex size-7 items-center justify-center rounded hover:bg-ivory-deep"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FormField id="notes" label="Additional requirements" optional error={err("notes")} className="sm:col-span-2" hint="Dietary needs, timings, special dishes, anything we should know.">
          {(a) => <textarea {...a} name="notes" rows={4} className={inputClass} value={values.notes} onChange={(e) => set("notes", e.target.value)} />}
        </FormField>
      </fieldset>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(err("consent"))}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-maroon"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink-soft">
            I agree that SRK Catering may contact me about this enquiry using the details above, as described in the{" "}
            <Link href="/privacy" className="text-maroon underline underline-offset-4">Privacy Policy</Link>.
          </label>
        </div>
        {err("consent") && <p id="consent-error" role="alert" className="mt-2 text-sm font-medium text-maroon">{err("consent")}</p>}
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
}
