# SRK Catering website

Premium South Indian catering site built with Next.js (App Router), React, TypeScript (strict) and Tailwind CSS v4.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm test           # unit checks for WhatsApp URL building and form validation
```

## Pages

`/` Home, `/menu`, `/services`, `/gallery`, `/about`, `/contact` (enquiry form), plus `/privacy`, `/terms`, `/credits`, a custom 404, `sitemap.xml` and `robots.txt`.

## Things you must configure before launch

| What | Where |
|---|---|
| Phone, WhatsApp number, email, address, service area, social links | `src/config/site.ts` (all empty on purpose; empty values are hidden, nothing is invented) |
| Site URL for metadata | `NEXT_PUBLIC_SITE_URL` env var |
| Real enquiry delivery | `src/lib/submitEnquiry.ts`, then set `enquiryMode: "live"` in `src/config/site.ts`. Until then the form is an **explicit demo** and says it sent nothing. |
| Menu, packages, services, gallery | `src/data/*.ts`. Prices and guest ranges are illustrative samples. |
| Testimonials | `src/data/testimonials.ts` (section is hidden while empty) |
| Privacy Policy and Terms | `src/app/privacy`, `src/app/terms` are templates and need business and legal review |
| Non-vegetarian dishes | Add items with `category: "non-veg"` in `src/data/menu.ts`; the category and diet filter appear automatically |

## Images

All photographs are illustrative stock from Wikimedia Commons (CC / public domain), downloaded to `public/images` and credited at `/credits`. They do not show SRK Catering events. Replace them with the business's own photography: update `scripts/images.manifest.json` or add files, then edit alt text and focal points in `src/data/images.ts`. `scripts/fetch-images.mjs` and `scripts/build-image-data.mjs` regenerate the files and `src/data/image-files.generated.ts`.

## Not included

The optional `/admin` dashboard was deliberately left out: a useful one needs real authentication, server-side authorization and a database, none of which exist yet.
