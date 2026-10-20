"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { enquiryHref } from "@/lib/enquiry";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  // Menu state is keyed to the path it was opened on, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = useCallback((v: boolean) => setOpenFor(v ? pathname : null), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, [setOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock, Escape to close, and a focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line/70 bg-ivory/95 backdrop-blur-sm transition-shadow duration-300",
        scrolled && "shadow-[0_8px_24px_-16px_rgb(41_35_31/0.35)]",
      )}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors",
                      active ? "text-maroon" : "text-charcoal/80 hover:text-maroon",
                      "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={enquiryHref()} className="whitespace-nowrap px-5 py-3 max-sm:hidden">
            Plan Your Event
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[3px] border border-line text-maroon transition-colors hover:bg-ivory-deep lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.25rem] bottom-0 z-30 overflow-y-auto bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line/70 border-y border-line/70">
            {primaryNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      "flex items-baseline justify-between py-4 font-display text-[1.75rem] transition-colors",
                      active ? "text-maroon" : "text-charcoal hover:text-maroon",
                    )}
                  >
                    {item.label}
                    {active && <span className="eyebrow">You are here</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 pb-8">
            <ButtonLink href={enquiryHref()} className="w-full" onClick={() => setOpen(false)}>
              Plan Your Event
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
