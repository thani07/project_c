import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { legalNav, primaryNav } from "@/data/nav";
import { menuCategories, menuItems } from "@/data/menu";
import { services } from "@/data/services";
import { enquiryHref } from "@/lib/enquiry";
import { Logo } from "./Logo";
import { WhatsAppCTA } from "@/components/enquiry/WhatsAppCTA";

const social = Object.entries(siteConfig.social).filter(([, url]) => url);

export function SiteFooter() {
  const c = siteConfig.contact;
  const liveCategories = menuCategories.filter((cat) => menuItems.some((m) => m.category === cat.id));
  const hasAnyContact = c.phoneDisplay || c.email || c.address || c.serviceArea || c.hours;

  return (
    <footer className="bg-charcoal text-ivory/80" data-on-dark>
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
            {siteConfig.name} brings the flavours of South India to weddings, receptions, family functions and corporate events,
            planned with care and served with warmth.
          </p>
          <p className="mt-6 font-display text-lg italic text-gold">{siteConfig.tagline}</p>
          {social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize underline-offset-4 hover:text-gold hover:underline">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
          <div>
            <h2 className="eyebrow !text-gold mb-5 font-sans">Explore</h2>
            <ul className="space-y-3 text-sm">
              {primaryNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-gold">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow !text-gold mb-5 font-sans">Menu</h2>
            <ul className="space-y-3 text-sm">
              {liveCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/menu?category=${cat.id}`} className="transition-colors hover:text-gold">{cat.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="eyebrow !text-gold mb-5 font-sans">Catering</h2>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="transition-colors hover:text-gold">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow !text-gold mb-5 font-sans">Get in touch</h2>
          <ul className="space-y-4 text-sm">
            {c.phoneDisplay && (
              <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${c.phoneHref}`} className="hover:text-gold">{c.phoneDisplay}</a></li>
            )}
            {c.email && (
              <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${c.email}`} className="hover:text-gold">{c.email}</a></li>
            )}
            {c.address && (
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><span>{c.address}</span></li>
            )}
            {c.serviceArea && (
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><span>Service area: {c.serviceArea}</span></li>
            )}
            {c.hours && (
              <li className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" /><span>{c.hours}</span></li>
            )}
            {!hasAnyContact && (
              <li className="leading-relaxed text-ivory/70">
                Send us your event details through the enquiry form and our team will get back to you.
              </li>
            )}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Link href={enquiryHref()} className="text-sm font-semibold uppercase tracking-[0.14em] text-gold underline-offset-8 hover:underline">
              Request a Catering Quote
            </Link>
            <WhatsAppCTA variant="outline-light" className="!px-4 !py-2.5" />
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
