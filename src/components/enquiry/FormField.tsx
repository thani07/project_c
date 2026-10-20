import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "block w-full rounded-[3px] border border-line bg-white px-4 py-3 text-base text-charcoal placeholder:text-ink-soft/60 transition-colors focus-visible:border-maroon focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-maroon aria-[invalid=true]:border-maroon aria-[invalid=true]:bg-[#fdf3f3]";

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  /** Receives the aria props the control should spread on itself. */
  children: (aria: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="ml-0.5 text-maroon" aria-hidden="true">*</span>}
        {optional && <span className="ml-1.5 text-xs font-normal text-ink-soft">(optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, "aria-required": required || undefined })}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-sm font-medium text-maroon">{error}</p>}
    </div>
  );
}
