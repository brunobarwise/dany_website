# Beach Rental Site — Stack & Architecture Reference

## Stack Overview

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 4 | Zero-JS by default, excellent static output, component model |
| Styling | Tailwind CSS v3 | Utility-first, no runtime cost |
| Forms | Web3Forms | Free (250/month), no backend, spam-protected via honeypot |
| Gallery | Swiper.js (CDN) | Touch-friendly, free, no bundling needed |
| Map | Leaflet.js (CDN) | Open-source, no API key required |
| i18n | astro-i18next | File-based JSON translation, `/fr` and `/en` routes |
| Hosting | Vercel (free tier) | Auto-deploy from GitHub, edge CDN, easy domain setup |
| Domain | Cloudflare Registrar | Cheapest .fr/.com renewal, free DNS + DDoS protection |

**Total recurring cost:** ~10–15 €/year (domain only). Hosting, form submission, and CDN libraries are free.

---

## Design Tokens (Coastal Palette)

```
sand:   #F5E6C8  (backgrounds, cards)
sand-dark: #D4B896
ocean:  #2B6CB0  (primary interactive, headings)
ocean-light: #63B3ED
foam:   #F0F9FF  (section backgrounds, alt)
dusk:   #2D3748  (body text, dark elements)
```

Fonts:
- **Playfair Display** — display headings (weight 600/700)
- **Inter** — body text (weight 400/500)

Both loaded from Google Fonts in `Base.astro`.

---

## i18n Routing

- Default locale: `fr`
- Routes: `/fr/` and `/en/` — root `/` redirects to `/fr` via `vercel.json`
- Language switcher in `Nav.astro` is a plain `<a href>` link — no JS needed
- All visible strings go through `t('key')` imported from `astro-i18next`

Translation files:
- `src/i18n/fr.json`
- `src/i18n/en.json`

---

## Full i18n Key List

```json
{
  "nav.home": "",
  "nav.gallery": "",
  "nav.amenities": "",
  "nav.booking": "",
  "nav.contact": "",

  "hero.title": "",
  "hero.tagline": "",
  "hero.cta": "",

  "amenities.title": "",
  "amenities.sleeping": "",
  "amenities.kitchen": "",
  "amenities.outdoor": "",
  "amenities.beach": "",

  "booking.title": "",
  "booking.direct_note": "",
  "booking.airbnb_label": "",
  "booking.lbc_label": "",
  "booking.abritel_label": "",
  "booking.booking_label": "",
  "booking.direct_label": "",

  "contact.title": "",
  "contact.subtitle": "",
  "contact.name": "",
  "contact.email": "",
  "contact.arrival": "",
  "contact.departure": "",
  "contact.guests": "",
  "contact.message": "",
  "contact.submit": "",
  "contact.success": "",
  "contact.error": "",

  "reviews.title": ""
}
```

---

## Component Responsibilities

| Component | Section id | Data source | i18n |
|---|---|---|---|
| `Nav.astro` | — | static | yes |
| `Hero.astro` | `#home` | `public/images/hero.jpg` | yes |
| `Gallery.astro` | `#gallery` | `public/images/gallery/*.jpg` | no (alt text only) |
| `Amenities.astro` | `#amenities` | inline array in component | yes |
| `Map.astro` | `#location` | lat/lng constants in frontmatter | no |
| `BookingLinks.astro` | `#booking` | inline array with platform URLs | yes |
| `ContactForm.astro` | `#contact` | Web3Forms API (fetch) | yes |
| `Reviews.astro` | `#reviews` | inline array in component | yes (title only) |

---

## SSR / Hydration Notes

Astro renders all components to static HTML by default. Two components require client-side JS:

- **`Gallery.astro`** — Swiper is initialized via a `<script>` tag after the DOM loads. No Astro island needed since the script is loaded from CDN and runs inline.
- **`Map.astro`** — Leaflet is also CDN-loaded. Use `define:vars` to pass server-side variables (lat/lng) to the inline script. Guard initialization with `DOMContentLoaded`.
- **`ContactForm.astro`** — uses a `<script>` tag for the fetch submission. No framework island needed.

There is **no React/Vue/Svelte** in this project. All JS is vanilla, inline, and loaded from CDN.

---

## Booking Logos

Platform logo files go in `public/images/logos/`. All logos are rendered white on coloured card backgrounds using the Tailwind class `brightness-0 invert`.

| File | Source |
|---|---|
| `airbnb.svg` | https://news.airbnb.com/brand-assets/ |
| `abritel.svg` | https://www.vrbo.com/brand |
| `booking.svg` | https://partner.booking.com — logo download |
| `leboncoin.svg` | No official kit — use text label or simple styled SVG |

---

## Image Optimization

All images should be converted to WebP before committing:

- Gallery: max 1600px wide, quality 82, target ≤ 200 KB each
- Hero: max 1920×1080, quality 85, target ≤ 400 KB
- Tool: `cwebp` CLI or https://squoosh.app

Astro's `<Image>` component (`@astrojs/image`) can be added later for automatic optimization, but manual WebP is sufficient for a static site of this size.

---

## Environment Variables

| Variable | Used in | Notes |
|---|---|---|
| `WEB3FORMS_KEY` | `ContactForm.astro` | Get from https://web3forms.com — enter owner email |
| `PUBLIC_SITE_URL` | `astro.config.mjs` `site` field | Used for sitemap generation |

Set these in the Vercel dashboard under Project → Settings → Environment Variables. Do not commit them.

In the component: `import.meta.env.WEB3FORMS_KEY`.

---

## Deployment Checklist

- [ ] `vercel.json` redirect from `/` to `/fr` in place
- [ ] `site` URL set in `astro.config.mjs` (required for sitemap)
- [ ] `WEB3FORMS_KEY` set in Vercel env vars (not hardcoded)
- [ ] Custom domain added in Vercel dashboard
- [ ] Cloudflare DNS records added (A record + CNAME, proxy OFF for apex)
- [ ] HTTPS auto-provisioned by Vercel (Let's Encrypt, ~5 min after DNS propagation)
- [ ] `npm run build` passes locally before first push
