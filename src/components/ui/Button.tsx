import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] px-6 py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-[background,color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-ivory border border-maroon hover:bg-maroon-deep hover:border-maroon-deep shadow-[0_8px_20px_-10px_rgb(111_29_44/0.7)]",
  secondary: "border border-maroon text-maroon hover:bg-maroon hover:text-ivory",
  ghost: "text-maroon hover:text-maroon-deep underline-offset-8 hover:underline px-0",
  light: "bg-ivory text-maroon border border-ivory hover:bg-white hover:border-white",
  "outline-light": "border border-ivory/70 text-ivory hover:bg-ivory hover:text-maroon",
};

interface Common {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: Common & ComponentProps<"button">) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className" | "href"> & { href: string }) {
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}

/** External / protocol links (wa.me, tel:, mailto:). */
export function ButtonAnchor({
  variant = "primary",
  className,
  ...props
}: Common & ComponentProps<"a">) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
