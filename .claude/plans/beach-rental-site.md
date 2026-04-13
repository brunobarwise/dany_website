# Beach Rental Website — Implementation Plan

**Status:** planning
**Last updated:** 2026-03-25
**Skill:** `beach-rental-site`

---

## 0. Information to Gather Before Starting

Two separate intake sessions with the owner. Both must be completed before any page goes live; the legal session (0b) can run in parallel with technical implementation but must finish before deployment.

### 0a. Content & Technical Intake

These are required before writing a single line of code:

| # | Question | Where it's used |
|---|---|---|
| 1 | Property name (e.g. "Villa Les Embruns") | `<title>`, Hero, OG tags |
| 2 | Short tagline FR + EN (1 sentence) | Hero section |
| 3 | Town / region | Meta description, Map section |
| 4 | GPS coordinates (lat, lng) — approximate recommended (see §8e) | `Map.astro` — Leaflet marker |
| 5 | Number of guests / bedrooms | Amenities section, contact form |
| 6 | Full amenities list (see `.claude/guides/amenities-icons.md`) | `Amenities.astro` |
| 7 | Booking platform URLs (Airbnb listing, Abritel, Booking.com, LBC) | `BookingLinks.astro` |
| 8 | Owner contact email (for Web3Forms registration) | Web3Forms access key |
| 9 | Photos (8–16, WebP preferred, max ~200 KB each), grouped by category: interior, bedrooms, outdoor, beach access | `public/images/gallery/<category>/` |
| 10 | Hero photo (landscape, 1920×1080 min) | `public/images/hero.webp` |
| 11 | 2–4 guest reviews (name or initials, rating, text, date) — written consent required per reviewer | `Reviews.astro` |
| 12 | Desired domain name (e.g. `villalesembruns.fr`) | Cloudflare + Vercel setup |
| 13 | Cancellation policy — conditions and deadlines (e.g. "full refund if cancelled 30+ days before arrival") | `PracticalInfo.astro` |
| 14 | House rules — max occupancy, pets, noise, check-in/out times, smoking, parties | `PracticalInfo.astro` |
| 15 | Insurance: can the owner confirm the property is insured for short-term rental? (builds guest trust if mentioned on site) | `PracticalInfo.astro` |

### 0b. Legal & RGPD Intake

Required to draft the Mentions Légales and Politique de Confidentialité. Can be collected in a separate session while technical implementation is underway, but must be resolved before go-live.

**Identity & legal status**

| # | Question | Where it's used |
|---|---|---|
| L1 | Owner's full legal name | Mentions légales — publisher identity |
| L2 | Owner's address (PO box or legal address accepted for privacy) | Mentions légales |
| L3 | Owner's phone number | Mentions légales |
| L4 | Operating as **particulier** or registered business (auto-entrepreneur, SARL, SCI…)? | Mentions légales — SIRET required if business |
| L5 | If business: SIRET, RCS registration city, share capital | Mentions légales |
| L6 | Who is the directeur de la publication? (usually the owner) | Mentions légales |

**Rental compliance**

| # | Question | Where it's used |
|---|---|---|
| L7 | Is the property the owner's **primary residence** (résidence principale) or a **secondary residence** (résidence secondaire)? | Determines registration obligations, 120-day cap applicability, and whether changement d'usage is needed — see §9i |
| L8 | Is the property already declared as meublé de tourisme at the mairie? | Compliance checklist — must happen before first rental |
| L9 | Does the commune require a numéro d'enregistrement? If yes, what is it? | Footer, BookingLinks section, mentions légales |
| L10 | Does current home insurance explicitly cover short-term rental? | Compliance checklist |

**RGPD choices**

| # | Question | Where it's used |
|---|---|---|
| L12 | Preferred retention period for contact form enquiries (e.g. 1 year after rental season) | Politique de confidentialité |
| L13 | hCaptcha in v1: yes or no? (no = no cookie banner needed; yes = consent banner required) | Politique de confidentialité — cookie section |
| L14 | Email address for RGPD data subject requests (can be same as contact email) | Politique de confidentialité |

---

## 1. Project Bootstrap

```bash
# In the desired parent directory
npm create astro@latest <project-name> -- --template minimal --typescript strict
cd <project-name>
npx astro add tailwind sitemap
npm install astro-i18next swiper leaflet
```

Directory name convention: use kebab-case, match the domain name if possible (e.g. `villa-les-embruns`).

**Important**: this project is an Astro static site — it has nothing to do with the existing `dany_test` TypeScript skeleton. Either scaffold in a sub-directory or create a separate repo.

**Immediately after bootstrap — create the i18n skeleton** before writing any component:

```bash
mkdir -p src/i18n
touch src/i18n/fr.json src/i18n/en.json
```

Populate both files with the full key list from `.claude/guides/beach-rental-stack.md` (all values empty strings). This allows `t()` calls to resolve without errors during development. Values are filled in at the end (Step 14).

---

## 2. Configuration Files

### 2a. `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import astroI18next from 'astro-i18next';

export default defineConfig({
  site: 'https://YOUR_DOMAIN.fr',
  integrations: [
    tailwind(),
    sitemap(),
    astroI18next(),
  ],
});
```

### 2b. `tailwind.config.mjs` — coastal palette

```js
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        sand:  { DEFAULT: '#F5E6C8', dark: '#D4B896' },
        ocean: { DEFAULT: '#2B6CB0', light: '#63B3ED' },
        foam:  '#F0F9FF',
        dusk:  '#2D3748',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### 2c. `i18n.json` (astro-i18next config)

```json
{
  "defaultLocale": "fr",
  "locales": ["fr", "en"]
}
```

### 2d. `vercel.json`

**This is the complete, final `vercel.json`.** Do not create a minimal version first and update later — define it once with all redirects and security headers from the start:

```json
{
  "redirects": [
    { "source": "/", "destination": "/fr", "permanent": false }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",     "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https://*.tile.openstreetmap.org; connect-src 'self' https://api.web3forms.com"
        }
      ]
    }
  ]
}
```

**CSP notes:**
- All fonts, JS, and CSS are self-hosted — no CDN origins needed in `script-src`, `style-src`, or `font-src`
- `'unsafe-inline'` for scripts is a known limitation of static Astro output (no nonce support); SRI on self-hosted assets is not applicable — the tradeoff is accepted for v1
- If hCaptcha is enabled later, add `https://js.hcaptcha.com` to `script-src` and `https://hcaptcha.com` to `connect-src` and `frame-src`
- OSM tiles require `https://*.tile.openstreetmap.org` in `img-src` even with the deferred load pattern

---

## 3. File & Directory Structure

```
<project-name>/
├── public/
│   ├── fonts/                      ← self-hosted WOFF2 files (§9b — CNIL requirement)
│   │   ├── playfair-display-600.woff2
│   │   ├── playfair-display-700.woff2
│   │   ├── inter-400.woff2
│   │   └── inter-500.woff2
│   ├── images/
│   │   ├── hero.webp               ← main hero photo (WebP, ≤400 KB)
│   │   ├── map-placeholder.webp    ← static map image for deferred OSM load (§9d)
│   │   ├── gallery/
│   │   │   ├── interior/           ← living room, kitchen, dining area
│   │   │   │   ├── 01.webp
│   │   │   │   └── ...
│   │   │   ├── bedrooms/           ← all bedrooms
│   │   │   │   └── ...
│   │   │   ├── outdoor/            ← terrace, garden, parking
│   │   │   │   └── ...
│   │   │   └── beach/              ← beach access, sea views
│   │   │       └── ...
│   │   └── logos/
│   │       ├── airbnb.svg
│   │       ├── abritel.svg
│   │       ├── booking.svg
│   │       └── leboncoin.svg       ← text fallback if no official SVG
│   ├── favicon.svg
│   └── robots.txt                  ← scraping policy + AI crawler opt-out (§8i)
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Gallery.astro
│   │   ├── Amenities.astro
│   │   ├── Map.astro
│   │   ├── BookingLinks.astro
│   │   ├── PracticalInfo.astro     ← cancellation policy, house rules, insurance note
│   │   ├── ContactForm.astro
│   │   └── Reviews.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro             ← meta-refresh fallback (CDN redirect handles most cases)
│   │   ├── fr/
│   │   │   ├── index.astro
│   │   │   ├── mentions-legales.astro
│   │   │   └── politique-de-confidentialite.astro
│   │   └── en/
│   │       ├── index.astro
│   │       ├── legal-notice.astro
│   │       └── privacy-policy.astro
│   ├── styles/
│   │   └── fonts.css               ← @font-face declarations for self-hosted fonts
│   └── i18n/
│       ├── fr.json
│       └── en.json
├── astro.config.mjs
├── tailwind.config.mjs
├── i18n.json
├── package.json
└── vercel.json                     ← single source of truth: redirect + security headers (§8a)
```

**Note on `index.astro` root redirect:** Vercel handles the `/` → `/fr` redirect via `vercel.json` (HTTP 302, instantaneous, no visible page). The `index.astro` fallback is only for non-Vercel environments (local `astro dev`, alternative hosts).

`meta http-equiv="refresh"` causes a perceptible blank-page flash before redirect — avoid it as a primary mechanism. Instead, use a minimal inline script which fires before paint:

```astro
---
// src/pages/index.astro — local dev fallback only; Vercel redirect takes precedence
---
<html>
  <head>
    <script>window.location.replace('/fr');</script>
    <noscript><meta http-equiv="refresh" content="0;url=/fr" /></noscript>
  </head>
  <body></body>
</html>
```

`window.location.replace` fires synchronously before the browser renders the page body, eliminating the blank flash. The `<noscript>` meta-refresh handles the (rare) no-JS case. Do not use `Astro.redirect()` — it requires SSR mode and throws a build error in static mode.

---

## 4. Implementation Order

Work through components in this sequence — each step is independently testable.

### Step 1 — Base layout (`src/layouts/Base.astro`)
- `<html lang>` derived from locale param
- Google Fonts served **locally** (see RGPD §9b — CDN load is a CNIL violation)
- Lucide icons inlined as SVG or self-hosted — no CDN script tag
- SEO meta tags: `<title>`, `<meta description>`, OG tags, hreflang alternates
- `@astrojs/sitemap` wired up via `astro.config.mjs`
- Footer links to `/fr/mentions-legales` and `/fr/politique-de-confidentialite`

### Step 2 — Navigation (`Nav.astro`)
- Fixed top bar with property name + anchor links
- FR/EN language switcher (links `/fr` ↔ `/en`)
- Hamburger collapse on mobile (pure CSS preferred, no JS)

### Step 3 — Hero (`Hero.astro`)
- Full-viewport image with overlay
- Property name + tagline (i18n)
- CTA button scrolling to `#booking`
- Scroll indicator animation (CSS `animate-bounce`)

### Step 4 — Gallery (`Gallery.astro`)
- Swiper.js loaded from **local npm install** (`import 'swiper/css'` etc.) — not CDN
- `loading="lazy"` on all images except first
- Images organised by category: `public/images/gallery/interior/`, `bedrooms/`, `outdoor/`, `beach/`
- Tab or pill filter buttons to switch between categories (pure CSS or minimal JS — no library)
- Lightbox: Swiper's built-in zoom or a simple click-to-fullscreen overlay
- All images must have descriptive `alt` text (FR for default locale, EN for `/en/` route)

### Step 5 — Amenities (`Amenities.astro`)
- 4-column icon grid (Sleeping / Kitchen / Outdoor / Beach)
- Lucide icons as **inline SVG** (copy paths from lucide.dev) — no CDN script
- Data driven from an inline array — easy to update without touching markup

### Step 6 — Map (`Map.astro`)
- Leaflet.js loaded from **local npm install** — not CDN
- OpenStreetMap tiles: disclose in privacy policy as third-party data transfer (OSM Foundation, UK)
- Coordinates and label injected via `define:vars`
- `DOMContentLoaded` guard to avoid SSR issues
- Map loads only after user interaction **or** display a static map image by default with a "Voir la carte" button that loads Leaflet on click — this defers the OSM tile request (and associated IP transfer) until the user opts in

### Step 7 — Booking Links (`BookingLinks.astro`)
- Card grid: one card per platform
- Platform logos in `public/images/logos/` (white on coloured BG via `brightness-0 invert`)
- Each card links out to the owner's listing on that platform — no on-site booking flow

### Step 8 — Practical Info (`PracticalInfo.astro`)

Content driven from intake answers (questions 13–15 of §0a). Displayed as an accordion or tabbed section below BookingLinks.

Three panels:
- **Annulation / Cancellation** — conditions and deadlines, bilingual. Owner provides the text (intake Q13).
- **Règlement intérieur / House Rules** — max occupancy, pets, noise, check-in/out times, smoking, events. Owner provides the text (intake Q14).
- **Assurance / Insurance** — one-sentence statement that the property is covered for short-term rental. Builds guest trust. Only include if owner has confirmed coverage (intake Q15 = yes).

Implementation notes:
- Pure HTML `<details>/<summary>` accordion — zero JS, fully accessible, keyboard navigable
- All panel content through `t()` keys — panels are fully bilingual
- Do not implement if intake answers 13–15 are missing — flag as blocker

### Step 9 — Contact Form (`ContactForm.astro`)
- Web3Forms: access key via env var (not frontmatter)
- Fields: Name, Email, Message — pure enquiry form, no booking fields
- Honeypot hidden checkbox (Web3Forms spam protection)
- **Required RGPD consent checkbox** — unchecked by default, blocks submission if not checked:
  `"J'accepte que mes données soient utilisées pour traiter ma demande de réservation, conformément à la politique de confidentialité."`
  The privacy policy link must be **locale-aware** — derive the URL from the current locale param, not hardcoded:
  - `/fr` → `/fr/politique-de-confidentialite`
  - `/en` → `/en/privacy-policy`
- Inline JS `fetch` submission — no page reload, inline success/error feedback

### Step 10 — Reviews (`Reviews.astro`)
- Static data array — no third-party widget
- SVG star rendering
- Placeholder cards until owner provides real reviews

### Step 11 — Legal document drafting session (with owner)

**Prerequisite:** intake questions L1–L13 from §0b must all be answered.

This is a working session, not a coding task. Output is four draft documents reviewed and approved by the owner before any page is built.

**Session agenda:**

1. **Confirm answers** to L1–L13; flag any missing items and block on them before proceeding
2. **Draft Mentions Légales** (FR) — fill the template with L1–L8 answers; owner reviews and approves
3. **Draft Legal Notice** (EN) — translate and adapt; owner approves
4. **Draft Politique de Confidentialité** (FR) — fill template using L9–L13 and known sub-processors (Web3Forms, Vercel, Cloudflare, OSM); owner reviews and approves; particular attention to data retention (L11) and the cookie section (L12)
5. **Draft Privacy Policy** (EN) — translate and adapt; owner approves
6. **Owner sign-off** on all four documents before handing back to developer

**Deliverable:** four approved plain-text or Markdown documents ready to be pasted into the Astro pages in Step 11.

**Blocking conditions — do not proceed to Step 12 without:**
- [ ] Owner has approved all four documents in writing (email or message is sufficient)
- [ ] Numéro d'enregistrement confirmed (or confirmed not required for the commune)
- [ ] Insurance coverage confirmed
- [ ] Web3Forms DPA signed

### Step 12 — Legal pages (build)
- `src/pages/fr/mentions-legales.astro` — paste approved FR content into Base layout
- `src/pages/en/legal-notice.astro` — paste approved EN content
- `src/pages/fr/politique-de-confidentialite.astro` — paste approved FR content; includes cookie policy section
- `src/pages/en/privacy-policy.astro` — paste approved EN content
- All four linked in footer on every page
- Numéro d'enregistrement (if applicable) added to footer and BookingLinks section
- These pages use `Base.astro` layout, plain prose — no section components

### Step 13 — Pages (`src/pages/fr/index.astro` + `en/index.astro`)
- Import all components in section order: Nav → Hero → Gallery → Amenities → Map → BookingLinks → PracticalInfo → ContactForm → Reviews
- Pass `lang` prop where needed

### Step 14 — i18n strings (finalise)
- Fill out all values in `fr.json` and `en.json` (skeleton created at bootstrap — see §1)
- Full key list is in `.claude/guides/beach-rental-stack.md`
- Keys added during implementation to include: `map.load_cta`, all `practicalinfo.*` keys (cancellation, house rules, insurance panel)
- All user-visible strings must go through `t()` — no hardcoded French/English in components

---

## 5. SEO Checklist

### 5a. On-page SEO
- [ ] `<title>` and `<meta name="description">` per locale in `Base.astro`
- [ ] `<html lang="fr">` / `lang="en"` from route param
- [ ] `<link rel="alternate" hreflang="fr" href="/fr/">` in both locale pages
- [ ] OG tags: `og:title`, `og:image` (hero photo), `og:description`, `og:locale`
- [ ] `sitemap.xml` via `@astrojs/sitemap` (auto-generates both locale URLs)
- [ ] All images have meaningful `alt` text — in the language of the page locale
- [ ] Favicon set
- [ ] Structured data (`schema.org/LodgingBusiness` or `VacationRental`) in `Base.astro` `<head>` as JSON-LD — helps Google surface the property in travel search results

### 5b. Local SEO (post-launch — owner actions)

The website alone is insufficient for local visibility. The owner must complete these after go-live:

- [ ] **Google Business Profile** — create at business.google.com. Category: "Vacation home rental". Add photos, description, link to the site, and enable reviews. This is the primary driver of "near me" and map pack search results.
- [ ] **TripAdvisor listing** — free listing at tripadvisor.fr/Owners. Links back to the site.
- [ ] **Gîtes de France / Clévacances** — optional paid classification but provides a recognised quality label and drives direct bookings from French families.
- [ ] **Bing Places** — lower priority but free; mirrors Google Business Profile.
- [ ] **Numéro d'enregistrement** visible on all platform listings and on the site footer — platforms (Airbnb, Booking.com) require it for French properties and it affects ranking in their search results.

### 5c. Review Encouragement (post-stay process)

Static reviews on the site are a starting point. The owner needs a lightweight post-stay process to build external review volume:

- Send a follow-up message 2–3 days after check-out thanking guests and including a direct link to leave a review on Google, Airbnb, or TripAdvisor (whichever platform they booked through)
- Do not incentivise reviews (against platform and FTC/DGCCRF rules)
- Once 5+ Google reviews exist, add the Google Reviews embed to the site (in the §10 backlog)

---

## 6. Accessibility & Mobile

A significant share of booking intent traffic comes from mobile. Accessibility failures also directly hurt SEO (Core Web Vitals, Lighthouse score).

### 6a. Mobile Responsiveness Checklist

- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` in `Base.astro` `<head>`
- [ ] All sections use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) — no fixed-width layouts
- [ ] Touch targets (buttons, links) at least 44×44px — Tailwind `min-h-11 min-w-11` or `p-3` on small elements
- [ ] Gallery Swiper has touch/swipe enabled (default in Swiper — verify not disabled)
- [ ] Contact form inputs have `font-size: 16px` minimum on mobile — prevents iOS auto-zoom on focus (Tailwind `text-base` = 16px)
- [ ] Nav hamburger menu usable with one thumb — test on real device, not just DevTools
- [ ] Map placeholder and "Voir la carte" button legible and tappable at mobile viewport
- [ ] Test on: iPhone Safari, Android Chrome — these are the two engines that matter

### 6b. Accessibility Checklist

- [ ] All interactive elements reachable and operable via keyboard (Tab + Enter/Space)
- [ ] Visible focus indicators — do not suppress `outline` in CSS without a replacement style
- [ ] `<nav>` landmark with `aria-label="Navigation principale"` in `Nav.astro`
- [ ] `<main>` landmark wrapping page content in `Base.astro`
- [ ] `<footer>` landmark in `Base.astro`
- [ ] All section headings form a logical hierarchy (`h1` in Hero, `h2` for each section, `h3` within sections) — no skipped levels
- [ ] Gallery lightbox: trap focus within the overlay when open; close on Escape key; `aria-modal="true"` and `role="dialog"`
- [ ] Contact form: each `<input>` associated with its `<label>` via matching `id`/`for` attributes — no placeholder-only labels
- [ ] Contact form error messages associated with their fields via `aria-describedby`
- [ ] RGPD consent checkbox: `aria-required="true"` and descriptive label text
- [ ] Accordion (`PracticalInfo.astro`): use native `<details>/<summary>` — ARIA semantics built in
- [ ] Color contrast: text on background must meet WCAG AA (4.5:1 for body text, 3:1 for large text) — verify with a contrast checker for the chosen palette
- [ ] Images with decorative function (e.g. overlay gradients) use `aria-hidden="true"` or empty `alt=""`
- [ ] `<html lang>` attribute set correctly per locale (handled in Step 1)

### 6c. CSS & Styling Guidelines

Reference: [CSS Best Practices — andredesousa/css-best-practices](https://github.com/andredesousa/css-best-practices)

The list below maps the most relevant practices from that guide to the choices already made in this plan. Any custom CSS written in Astro `<style>` blocks or in `src/styles/` must follow them.

**Methodology — Atomic CSS via Tailwind**
Tailwind satisfies the "Follow a CSS methodology" requirement. The chosen methodology is Atomic CSS (similar to [Atomic CSS](https://acss.io/) / functional CSS). This is intentional and should not be mixed with BEM or SMACSS conventions — pick one and stick to it. Any custom class names that are necessary (e.g. Swiper overrides) should follow BEM to remain distinguishable from Tailwind utilities.

**Avoid IDs in CSS**
IDs may appear in HTML for anchor links (`#booking`, `#contact`) and JS targeting (`getElementById`), but must never be used as CSS selectors. Use class-based selectors exclusively.

**Prefer CSS over JavaScript**
Already applied in this plan: hamburger nav collapse (`<input type="checkbox">` + CSS sibling selectors), the `<details>/<summary>` accordion in `PracticalInfo.astro`, and the `animate-bounce` scroll indicator in `Hero.astro`. Do not reach for JS to handle what a CSS transition or `:checked` state can do.

**Avoid inline styles**
All styles must go through Tailwind utility classes. Never add `style="..."` attributes in component markup. The one exception is Leaflet's internal DOM manipulation — that is library-owned and outside our control.

**Avoid magic numbers**
Do not write arbitrary pixel values in custom CSS. Stick to Tailwind's spacing/sizing scale (which uses a consistent `rem`-based system). If a value is not on the scale, add it to `tailwind.config.mjs` under `theme.extend` rather than hardcoding it inline.

**Use relative units**
Tailwind's default scale is `rem`-based. Any custom CSS that falls outside Tailwind should use `rem` or `em` for font sizes and spacing; `%`, `vw`, `vh` for layout; never `px` for typography.

**Avoid `!important` reactively**
Tailwind provides the `!` prefix (e.g. `!mt-0`) for the rare cases where `!important` is genuinely needed. Never use `!important` to fight specificity — if a Tailwind class is being overridden by library CSS (Swiper, Leaflet), use a more specific selector or a wrapper class instead.

**Avoid dangerous and extra selectors**
Custom CSS in `<style>` blocks should be scoped. Avoid targeting bare element selectors (`div`, `p`, `img`) globally — they leak into child components. Use Astro's `<style>` block scoping (default behaviour) or prefix with a component-specific class.

**Remove unused CSS**
Tailwind's `content` array in `tailwind.config.mjs` already covers `src/**/*.{astro,html,js,ts}`. Do not import full Swiper or Leaflet CSS bundles blindly — import only the modules used:

```js
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```

**Cross-browser compatibility**
Tailwind uses PostCSS with Autoprefixer by default — vendor prefixes are handled automatically. Do not write `-webkit-`, `-moz-` or other prefixes manually. Define a `browserslist` in `package.json` if specific targets need to be locked (recommended: `"> 0.5%, last 2 versions, not dead"`).

**Separate global vs local styles**
- Global: `src/styles/fonts.css` (only `@font-face` declarations — nothing else)
- Component: Astro `<style>` blocks (scoped by default)
- Utility overrides (Swiper/Leaflet theming): a dedicated `src/styles/overrides.css` imported once in `Base.astro` — never scattered across components

**Lint the CSS**
Add stylelint for any custom CSS files:

```bash
npm install -D stylelint stylelint-config-standard
```

```json
// .stylelintrc.json
{ "extends": ["stylelint-config-standard"] }
```

Run as part of CI or pre-commit (`lint-staged`). Tailwind utility classes in HTML are not linted by stylelint — that's intentional.

**Minimize expensive properties**
Avoid animating `box-shadow`, `border-radius`, `filter`, or `width`/`height` — these trigger layout or paint. Use `transform` and `opacity` for animations (GPU-composited). The `animate-bounce` Tailwind class uses `transform`, which is correct.

### 6d. Lighthouse / Performance Targets (pre-launch)

Run `npx lighthouse <url> --view` after `npm run preview` or against the Vercel preview URL:

| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

Common causes of low scores on this stack: render-blocking fonts (fixed by `font-display: swap`), unoptimised images (fixed by §7 WebP conversion), missing `alt` text.

---

## 7. Image Preparation

Owner provides photos grouped by category (intake Q9). Before committing to the repo, convert all to WebP. **The hero image and gallery images have different size requirements and must be converted separately.**

```bash
# Hero — minimum 1920px wide required; do NOT cap width at 1600px
cwebp -q 85 hero.jpg -o hero.webp
# If the source is wider than 1920px, scale it down to exactly 1920:
# cwebp -q 85 -resize 1920 0 hero.jpg -o hero.webp

# Map placeholder — small static image, no wide resize needed
cwebp -q 82 -resize 800 0 map-placeholder.jpg -o map-placeholder.webp

# Gallery images — cap at 1600px wide
for f in gallery/**/*.jpg; do
  dir=$(dirname "$f")
  base=$(basename "$f" .jpg)
  cwebp -q 82 -resize 1600 0 "$f" -o "${dir}/${base}.webp"
done
```

Or use Squoosh (browser-based, free) for manual conversion — set resize and quality per image type.

Targets:
- Hero: ≤ 400 KB, minimum 1920px wide
- Gallery images: ≤ 200 KB each, max 1600px wide
- Map placeholder: ≤ 80 KB

Place converted files into the correct paths under `public/images/` (§3). Verify hero dimensions with `identify hero.webp` (ImageMagick) or in the browser DevTools Network tab.

---

## 7. Deployment

```bash
# 1. Init git and push to GitHub
git init && git add . && git commit -m "init: beach rental site scaffold"
gh repo create <project-name> --public --push

# 2. Go to vercel.com → New Project → import repo
# Framework: Astro (auto-detected)
# Build: npm run build | Output: dist
# → Deploy (~60s)

# 3. Add custom domain in Vercel → Settings → Domains
# → Vercel provides A record + CNAME
# → Add both in Cloudflare DNS (proxy OFF / grey cloud for apex)
# → Vercel auto-provisions TLS via Let's Encrypt
```

Environment variables to set in Vercel dashboard (do not commit to git):

| Key | Value |
|---|---|
| `PUBLIC_WEB3FORMS_KEY` | Your Web3Forms access key |
| `PUBLIC_SITE_URL` | `https://your-domain.fr` |

Use the `PUBLIC_` prefix so the key is available in client-side `<script>` tags at runtime (`import.meta.env.PUBLIC_WEB3FORMS_KEY`). The key is not a secret — see §8d for the correct mental model.

Before deploying, run a local build to catch errors:

```bash
npm run build && npm run preview
```

---

## 8. Security & Anti-spam

### 8a. HTTP Security Headers

Security headers are defined in `vercel.json` — see §2d for the complete, canonical configuration. Do not duplicate or maintain a separate copy here.

Summary of headers applied:

| Header | Value | Purpose |
|---|---|---|
| `X-Frame-Options` | `DENY` | Prevents clickjacking via iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage to third parties |
| `Permissions-Policy` | camera/mic/geolocation off | Restricts browser feature access |
| `Content-Security-Policy` | self + OSM + Web3Forms | Controls allowed resource origins |

The repo is **public** by design — the codebase contains no secrets (Web3Forms key is not secret; see §8d). A public repo is acceptable and simplifies Vercel integration.

### 8b. Subresource Integrity (SRI)

Swiper, Leaflet, and Lucide are all self-hosted via npm — SRI does not apply to locally bundled assets. There are no CDN script tags in the current plan.

The only external script that may be added is **hCaptcha** (`https://js.hcaptcha.com/1/api.js`). hCaptcha intentionally loads sub-scripts dynamically, which makes SRI impossible for its loader. Containment is via CSP `frame-src` and `connect-src` instead — see §2d.

If any CDN script tag is ever added in future, generate an SRI hash before deploying:

```bash
curl -s <CDN_URL> | openssl dgst -sha384 -binary | openssl base64 -A
```

Pin to an exact patch version (e.g. `library@1.2.3`, not `library@1`) so the hash stays stable.

### 8c. Contact Form Spam Mitigation

| Measure | Implementation | Status |
|---|---|---|
| Honeypot field | Web3Forms hidden checkbox — bots fill it, humans don't | planned (Step 9) |
| Time-based submission check | Record render timestamp; reject if submitted in under 3 s | planned (Step 9) |
| Cloudflare rate limiting | WAF rule: block IP submitting form endpoint > 5 times/min | planned (post-deploy) |
| hCaptcha / Turnstile | Web3Forms natively supported — `data-captcha="true"` on form div | decision pending |
| Submission cap | Web3Forms free tier: 250/month — soft ceiling, not per-IP throttle | accepted limitation |

**Time-based check** — add to `ContactForm.astro` inside the `<script>` block that handles `fetch` submission:

```js
const renderTime = Date.now();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (Date.now() - renderTime < 3000) {
    return;
  }
  // proceed with Web3Forms fetch
});
```

Bots that submit instantly are silently dropped client-side before reaching Web3Forms. No user-visible change.

**Cloudflare rate limiting rule** — configure after the first deploy, in Cloudflare → Security → WAF → Rate Limiting Rules:

- Expression: `http.request.uri.path eq "/fr" and http.request.method eq "POST"`
  (Web3Forms receives the POST from the browser directly to `api.web3forms.com` — this rule targets any direct POST abuse to the page itself; adjust if the form action URL differs)
- Threshold: 5 requests per minute per IP
- Action: Block (10 minutes)

For a seasonal rental with 1–2 genuine enquiries per day, this threshold will never be hit by legitimate users.

**CAPTCHA decision point** — hCaptcha adds a visible puzzle on mobile, which increases form abandonment. Consider **Cloudflare Turnstile** as an alternative: it is invisible by default (no user interaction unless risk score is high), free, and does not set tracking cookies. Web3Forms does not natively support Turnstile — it would require verifying the Turnstile token server-side, which is not possible in a static Astro build without a serverless function. For v1, honeypot + time check + Cloudflare rate limiting is the recommended stack; revisit only if spam volume becomes a problem.

To enable hCaptcha via Web3Forms if needed:

```html
<!-- In Base.astro <head> -->
<script src="https://js.hcaptcha.com/1/api.js" async defer></script>

<!-- Inside <form>, before submit button -->
<div class="h-captcha" data-captcha="true"></div>
```

Web3Forms validates server-side automatically. No separate hCaptcha site key needed. If enabled, add `https://js.hcaptcha.com` to `script-src` and `https://hcaptcha.com` to `connect-src` and `frame-src` in the CSP (§2d).

### 8d. Web3Forms Access Key — Correct Mental Model

The `WEB3FORMS_KEY` **is not a secret**. Web3Forms is a client-side service; the key is always visible in page source by design — that's how it works. Putting it in an env var does not hide it from users.

Use an env var anyway, for a different reason: it lets you use different keys for local dev vs production (separate submission inboxes, separate rate limits). Do not represent this as a security measure in documentation or code comments.

The owner's **email address** is not exposed — it's stored in Web3Forms' backend tied to the key. This is a genuine security benefit. Never add a raw `mailto:` link to the site HTML.

If a mailto fallback is ever needed, assemble it in JS rather than hardcoding it in HTML:

```astro
<a id="mailto-fallback" href="#contact">Nous écrire</a>
<script>
  const a = document.getElementById('mailto-fallback');
  a.href = ['mailto', ':', 'contact', '@', 'votresite.fr'].join('');
</script>
```

This avoids inline event handlers (which conflict with CSP) and keeps the address out of the raw HTML.

### 8e. GPS Coordinates — Physical Security Consideration

The open question "approximate or exact pin?" needs context to be useful:

An exact pin on a publicly listed vacant property tells a potential burglar the location of an asset that may be unoccupied. This is a real physical security risk documented in insurance guidance for short-term rentals.

**Recommendation:** use a pin that indicates the general neighbourhood (within ~200m) but not the exact building. Guests receive the exact address at booking confirmation via the platform, not from the public website.

### 8f. Repository & Secrets Hygiene

The plan creates a **public** GitHub repo. Add a `.gitignore` before the first commit:

```
.env
.env.local
.env.*.local
node_modules/
dist/
.DS_Store
```

Never create a `.env` file with the Web3Forms key locally — use `vercel dev` to inject env vars from the Vercel dashboard. If a `.env` is accidentally committed to a public repo, rotate the Web3Forms key immediately via the Web3Forms dashboard.

### 8g. Cloudflare Proxy — Apex vs www

The apex domain (`votresite.fr`) must be **DNS only (grey cloud)** — required for Vercel TLS provisioning.

`www.votresite.fr` (CNAME) can and should be **Cloudflare proxied (orange cloud)**:
- Free WAF, DDoS mitigation, and bot scoring
- Configure a Cloudflare Redirect Rule: `votresite.fr → www.votresite.fr` to funnel all traffic through the protected subdomain

### 8h. Phone Number — Scraping Protection

If the owner wants a phone number on the public site, never hardcode it as a raw text node or inside a `tel:` href in HTML — scrapers and lead-generation bots harvest these for robocall lists.

**Preferred approach: click-to-reveal**

The number is hidden behind a button. Reveal happens client-side on click; the raw number is never in the initial DOM.

```astro
<button id="reveal-phone" class="underline text-ocean">
  {t('contact.show_phone')}
</button>
<a id="phone-link" href="#" class="hidden text-dusk"></a>
<script>
  document.getElementById('reveal-phone').addEventListener('click', () => {
    const parts = ['+33', '6', '12', '34', '56', '78'];
    const link = document.getElementById('phone-link');
    link.href = 'tel:' + parts.join('').replace('+', '+');
    link.textContent = parts.join('\u00a0');
    link.classList.remove('hidden');
    document.getElementById('reveal-phone').remove();
  });
</script>
```

Add i18n keys: `"contact.show_phone": "Afficher le numéro"` / `"Show phone number"`.

**Alternative: omit the phone number entirely**
For a rental site where all inbound contact goes through the form, a public phone number is optional. If the owner has no prior demand for phone contact, the form-only approach is simpler and exposes nothing. Raise this in the owner intake session.

**Do not use:**
- CSS `direction: rtl` reversal tricks — breaks screen readers and copy-paste
- `<img>` or `<canvas>` rendering — inaccessible, cannot be tapped on mobile
- HTML entity encoding alone (`&#48;` etc.) — decoded by every browser and most scrapers

**`robots.txt` note:** phone numbers or emails exposed in `schema.org` JSON-LD are harvestable regardless of DOM obfuscation — omit `telephone` and `email` fields from the `LodgingBusiness` structured data block (§5a).

### 8i. `robots.txt` — Scraping Policy

A `robots.txt` at the site root instructs compliant crawlers. It does not stop malicious scrapers, but it handles the long tail of automated crawlers and prevents the site from being indexed by AI training datasets if the owner wishes.

Create `public/robots.txt` (Astro serves `public/` as the site root):

```
User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: https://YOUR_DOMAIN.fr/sitemap-index.xml
```

The `Sitemap` line must point to the actual sitemap URL generated by `@astrojs/sitemap` — replace `YOUR_DOMAIN.fr` before deploying. The GPTBot/CCBot/anthropic-ai directives are opt-out requests for AI training crawlers; compliance is voluntary but respected by the named bots.

### Summary Checklist

- [ ] `vercel.json` contains redirect + all security headers (§2d — single definition)
- [ ] No CDN `<script>` or `<link>` tags — all assets self-hosted
- [ ] Honeypot field present in `ContactForm.astro`
- [ ] Time-based submission check in `ContactForm.astro` (`< 3 s` rejection)
- [ ] Cloudflare rate limiting WAF rule configured post-deploy (§8c)
- [ ] Decision made on hCaptcha / Turnstile (§11 — discuss with owner)
- [ ] No raw `mailto:` links or hardcoded email addresses in HTML
- [ ] Phone number uses click-to-reveal pattern or omitted entirely (§8h)
- [ ] `telephone` and `email` omitted from JSON-LD structured data
- [ ] `public/robots.txt` created with AI crawler opt-out directives
- [ ] `PUBLIC_WEB3FORMS_KEY` env var set in Vercel dashboard
- [ ] `.gitignore` committed before first commit (no `.env` file needed — use `vercel dev`)
- [ ] Map pin uses approximate location (~200m offset)
- [ ] `www` subdomain proxied through Cloudflare (orange cloud)
- [ ] Apex domain DNS only (grey cloud)
- [ ] Cloudflare apex → www redirect rule configured

---

## 9. RGPD & Obligations Légales (France)

### 9a. Situation réelle — le site N'EST PAS sans collecte de données

Contrary to the initial assumption, the plan as designed involves several personal data flows. All must be addressed before go-live.

| Data flow | Personal data | Legal basis | Action required |
|---|---|---|---|
| Contact form (Web3Forms) | Name, email, dates, message | Consent (Art. 6.1.a) | Consent checkbox + DPA with Web3Forms |
| Google Fonts from CDN | IP address, User-Agent | — | **Self-host fonts** — CNIL ruled CDN load a violation |
| Swiper/Leaflet from CDN | IP address, User-Agent | — | **Self-host via npm** — already installed |
| OpenStreetMap tiles | IP address | Legitimate interest | Disclose in privacy policy; defer load until user clicks |
| Vercel infrastructure logs | IP address, request logs | Legitimate interest | Disclose as sub-processor in privacy policy |

### 9b. Fonts — Self-hosting (mandatory)

The CNIL (January 2022 ruling) and the Austrian DSB have both issued decisions ruling that loading Google Fonts directly from Google CDN violates GDPR because IP addresses are transferred to the US without adequate safeguards. This is not a grey area.

Fix: download the font files and serve them from `public/fonts/`:

```bash
# Use google-webfonts-helper (https://gwfh.madewithlove.com) to download
# WOFF2 files for Playfair Display (600, 700) and Inter (400, 500)
# Place in public/fonts/
```

In `Base.astro`, replace the Google Fonts `<link>` with:

```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/playfair-display-600.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
/* repeat for 700, and for Inter 400/500 */
```

### 9c. Third-party JS — Self-hosting via npm

Swiper and Leaflet are already installed as npm packages. Import them directly instead of using CDN script tags — the bundler includes them in the static output, no external request made:

```js
// In Gallery.astro frontmatter or a client script
import Swiper from 'swiper';
import 'swiper/css';

// In Map.astro
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
```

This eliminates the jsDelivr and unpkg IP transfers entirely.

### 9d. OpenStreetMap — Deferred Load Pattern

OSM tile requests cannot be avoided if the map is always rendered. Implement a "lazy consent" pattern: show a static placeholder image with a button; load Leaflet and tiles only when the user clicks.

```astro
<div id="map-placeholder" class="...">
  <img src="/images/map-placeholder.jpg" alt="Localisation approximative" />
  <button id="load-map">{t('map.load_cta')}</button>
</div>
<div id="map" class="hidden h-96 ..."></div>
<script>
  document.getElementById('load-map').addEventListener('click', () => {
    document.getElementById('map-placeholder').remove();
    document.getElementById('map').classList.remove('hidden');
    // initialise Leaflet here
  });
</script>
```

Add to i18n: `"map.load_cta": "Afficher la carte interactive"` / `"Show interactive map"`.

### 9e. Contact Form — Consent & RGPD

The form requires explicit, informed consent (RGPD Art. 6.1.a) before processing personal data. Add a mandatory, unchecked-by-default checkbox:

```astro
---
const { lang } = Astro.params;
const privacyUrl = lang === 'en' ? '/en/privacy-policy' : '/fr/politique-de-confidentialite';
const privacyLabel = lang === 'en' ? 'privacy policy' : 'politique de confidentialité';
const consentText = lang === 'en'
  ? 'I agree that my personal data will be used to process my enquiry, in accordance with the'
  : 'J\'accepte que mes données personnelles soient utilisées pour traiter ma demande, conformément à la';
---
<label class="flex items-start gap-3 text-sm text-dusk cursor-pointer">
  <input type="checkbox" name="rgpd_consent" required class="mt-1 accent-ocean" />
  <span>
    {consentText}
    <a href={privacyUrl} class="underline text-ocean">{privacyLabel}</a>.
  </span>
</label>
```

The form must not submit if this checkbox is unchecked (`required` attribute handles this natively).

### 9f. Web3Forms — DPA Required

Web3Forms acts as a **data processor** under RGPD Art. 28. A Data Processing Agreement must be in place before the form goes live.

Steps:
1. Log in to Web3Forms dashboard
2. Navigate to Settings → Legal / DPA
3. Review and accept the DPA (Web3Forms provides a standard GDPR-compliant DPA)
4. Download and store a copy with the project documentation

Web3Forms default data retention: form submissions are stored for 30 days then deleted. This must be disclosed in the privacy policy.

### 9g. Cookie Audit

Run a DevTools audit before go-live. Expected state after self-hosting all assets:

| Source | Cookies set | Notes |
|---|---|---|
| Swiper (self-hosted) | None | |
| Leaflet (self-hosted) | None | |
| hCaptcha (if enabled) | Yes — functional + analytics | Requires prior consent banner if enabled |
| Web3Forms | None (API call only) | |
| Vercel | None by default | Vercel Analytics (if enabled later) would add cookies |

**If hCaptcha is not used: no cookie banner is needed.** This is the recommended path for v1 — honeypot only, no cookies, no banner required.

If hCaptcha is added later, implement a consent banner (e.g. using `cookie-consent` npm package) before enabling it.

### 9h. Registre des Activités de Traitement (RAT)

RGPD Art. 30 requires the data controller (the property owner) to maintain a record of all processing activities. For a sole trader / individual, this can be a simple spreadsheet. It must include:

- Purpose of processing (handling booking enquiries)
- Categories of data (name, email, dates, message)
- Recipients (Web3Forms, then owner's email inbox)
- Retention period (recommend: delete enquiries after the rental season + 1 year)
- Technical measures (HTTPS, Web3Forms DPA, consent checkbox)

This document does not need to be submitted to the CNIL but must be available on request.

### 9i. French Vacation Rental Legal Obligations (non-website)

These apply to the rental business itself and affect what must appear in legal documents. Obligations differ significantly based on whether the property is a **primary residence** (résidence principale) or a **secondary residence** (résidence secondaire) — this must be established at intake (§0b L7).

**Déclaration en mairie (Art. L.324-1 Code du Tourisme)**
Required for all meublés de tourisme regardless of residence type. Filed before the first rental. The mairie issues a receipt. Simple, free process in most communes.

**Numéro d'enregistrement (Art. L.324-1-1 Code du Tourisme)**
Required only in communes that have adopted it (Paris, Lyon, Bordeaux, Nice, Toulouse, Biarritz, and many coastal communes). The requirement and process differ by residence type:

| | Primary residence | Secondary residence |
|---|---|---|
| Registration required | Yes, if commune adopted it | Yes, if commune adopted it |
| 120-day annual cap | Yes — cannot be rented more than 120 nights/year as primary residence | No cap — but may require **autorisation de changement d'usage** (see below) |
| Process complexity | Low — declaration at mairie | Medium to high depending on commune |

If required: the number must appear on all listings (Airbnb, Booking.com, LBC) and visibly on this website (footer + BookingLinks section).

**Autorisation de changement d'usage (secondary residences in regulated communes)**
Secondary residences in cities with a housing tension ordinance (Paris and many others) may require a formal change-of-use authorisation before being rented as a meublé de tourisme. This is handled at the mairie and is separate from the declaration. Non-compliance can result in significant fines (up to €50,000 in Paris). Owner must verify with their commune before the first rental.

**Taxe de séjour**
Must be collected per night per adult and remitted to the commune quarterly (or annually in some communes). Platforms collect and remit automatically for platform bookings. Direct bookings require the owner to collect and remit manually. Rate varies by commune and property category.

**Classement Atout France**
Optional 1–5 star classification. Required only to use the "meublé de tourisme classé" label. Adds credibility and marginally improves platform search ranking.

**Assurance villégiature / multirisques propriétaire non-occupant**
Specific rental liability insurance required. Most standard home insurance policies explicitly exclude short-term rental — owner must verify in writing with their insurer before the first booking.

---

### 9j. Required Legal Documents — Checklist

The following documents must exist before the site goes live. They are the owner's responsibility to draft (with professional help if needed); the developer's responsibility to publish correctly.

### Website documents (digital, published on the site)

**1. Mentions Légales** — legally required by LCEN (Loi n° 2004-575 du 21 juin 2004)

Must contain:
- Full name and address of the site publisher (the owner)
- Phone number
- Email address
- If operating as a business: SIRET/SIREN number, RCS registration, share capital
- Name of the publication director
- Host identity: Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA

Published at: `/fr/mentions-legales` and `/en/legal-notice`

**2. Politique de Confidentialité** — required by RGPD Art. 13/14

Must contain:
- Identity and contact details of the data controller (the owner)
- Contact of the DPO if applicable (not required for individuals)
- What data is collected (name, email, dates, message via contact form)
- Legal basis for each processing (consent for contact form)
- Retention period (Web3Forms: 30 days; owner inbox: recommended 1 year after stay)
- Recipients and sub-processors: Web3Forms (US, covered by DPA + EU-US DPF), Vercel (US, DPA available), Cloudflare (US, DPA available), OpenStreetMap Foundation (UK)
- User rights: access, rectification, erasure, restriction, portability, opposition (Art. 15–21)
- Right to withdraw consent at any time
- Right to lodge a complaint with the CNIL (www.cnil.fr)
- No automated decision-making or profiling

Published at: `/fr/politique-de-confidentialite` and `/en/privacy-policy`

**3. Politique de Gestion des Cookies** — required by CNIL guidelines (délibération n° 2020-091)

For v1 (no hCaptcha, self-hosted assets): a brief statement that the site sets no tracking cookies, no analytics, no advertising cookies. Include in the privacy policy — no separate banner needed.

If hCaptcha or analytics are added later, a full consent banner is required before those scripts load.

Published: as a section within the privacy policy page.

### Offline documents (owner's records, not published)

**4. Registre des Activités de Traitement (RAT)** — RGPD Art. 30, required for all data controllers

Simple spreadsheet. Template fields: processing name, purpose, legal basis, data categories, recipients, retention period, security measures. Not submitted to CNIL but available on request.

**5. Data Processing Agreement with Web3Forms** — RGPD Art. 28

Available in Web3Forms dashboard. Download and store a signed copy.

**6. Déclaration de meublé de tourisme** — Code du Tourisme Art. L.324-1

Filed with the local mairie before the first rental. The mairie issues a receipt. Keep a copy.

**7. Numéro d'enregistrement** (if applicable) — Code du Tourisme Art. L.324-1-1

Issued by the mairie or préfecture in regulated communes. Must appear on: this website, all platform listings, all rental contracts.

**8. Attestation d'assurance villégiature / multirisques propriétaire non-occupant**

Issued by the insurer. Verify coverage explicitly covers short-term rental (meublé de tourisme). Keep current year's certificate on file.

**9. État des lieux (template)** — recommended, not strictly mandatory

Template form for check-in/check-out property condition. Protects both parties in deposit disputes. Owner responsibility — not published on the site.

### Pre-launch compliance checklist

- [ ] Mentions légales page live and linked in footer
- [ ] Politique de confidentialité page live and linked in footer
- [ ] RGPD consent checkbox on contact form (unchecked by default, blocks submission)
- [ ] Google Fonts self-hosted (no CDN load)
- [ ] Swiper and Leaflet loaded from npm, not CDN
- [ ] OSM map deferred until user interaction
- [ ] Web3Forms DPA signed and stored
- [ ] RAT created and stored by owner
- [ ] Cookie audit passed (no tracking cookies in v1)
- [ ] Numéro d'enregistrement obtained and visible on site (if required by commune)
- [ ] Insurance certificate covers short-term rental
- [ ] Déclaration en mairie filed

---

## 10. Future Enhancements (Backlog)

| Feature | Effort | Notes |
|---|---|---|
| Google Reviews embed | Low | Trigger: once owner has 5+ Google reviews. Free widget or static update each season. |
| Pricing table section | Low | Static seasonal table (FR/EN) |
| Google Business Profile photos | Low | Owner action post-launch: upload gallery photos to GBP for additional search visibility |
| Structured data (JSON-LD) | Low | `schema.org/VacationRental` in `Base.astro` for Google travel search rich results |
| Owner login to update content | High | Would require a CMS (Decap CMS / Tina) — out of scope for v1 |
| Multi-property support | High | Structural change — separate repo per property is simpler |

**Out of scope — requires a new site:** availability calendar, online booking flow, payment processing (Stripe or otherwise). These features imply server-side state, payment compliance (PCI), and a fundamentally different architecture than a static site. If the owner decides to pursue them in future, the correct path is a new build, not an extension of this one.

---

## 11. Open Questions for Owner

Questions requiring a decision before implementation can begin or complete. Legal and RGPD questions are captured in full in §0b (L1–L13) — only non-overlapping items are listed here.

**Site & content**
- [ ] Which booking platforms do you currently use? (determines BookingLinks cards to show)
- [ ] Do you have an existing domain, or do we register one? (Cloudflare Registrar recommended)
- [ ] Do you want a pricing/rates section (static seasonal table)?
- [ ] Language priority: FR primary, EN secondary — correct?
- [ ] Cancellation policy text (FR + EN) — required for `PracticalInfo.astro` Step 8 (intake Q13)
- [ ] House rules text (FR + EN) — required for `PracticalInfo.astro` Step 8 (intake Q14)
- [ ] Insurance: confirmed for short-term rental? If yes, should a mention appear on the site? (intake Q15)

**Contact information**
- [ ] Should a phone number appear on the site? If yes, it will use a click-to-reveal pattern (§8h) — never a raw number in HTML. If the contact form covers all inbound enquiries, the number can be omitted entirely.

**Privacy & map**
- [ ] Approximate or exact map pin? Recommendation: ~200m offset (§8e).

**Spam**
- [ ] Has the owner had spam on a previous contact form? Determines whether hCaptcha is added from day one (see §8c). No prior spam → honeypot alone is sufficient for v1.

**Reviews (RGPD)**
- [ ] Does the owner have consent from each person whose name and review will appear on the site? Publishing a name and opinion is personal data processing. Either obtain written consent per reviewer or use initials only (e.g. "Marie L." rather than full name is borderline — initials only is safer).

