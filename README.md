# Étoile de la Mer — Location saisonnière

Static bilingual (FR/EN) rental website for a T2 apartment in Cap d'Agde.

## Stack

- **Astro 4** — static output
- **Tailwind v3** — custom "Golfe du Lion" palette
- **Web3Forms** — contact form (no backend required)
- **Swiper** — gallery (loaded via CDN, only active when images are present)
- **@astrojs/sitemap** — wired in before first deploy (see `astro.config.mjs`)

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output → dist/
npm run preview   # preview the build locally
```

## Key files for content updates

| What | Where |
|---|---|
| FR copy | `src/i18n/fr.json` |
| EN copy | `src/i18n/en.json` |
| Activities + links | `src/data/around.ts` |
| Hero image | `public/images/hero.jpg` — uncomment `<img>` in `Hero.astro` |
| Gallery images | `public/images/gallery/` — populate array in `Gallery.astro` |
| Web3Forms key | `ContactForm.astro` — `WEB3FORMS_KEY` constant |

## Routes

| URL | Page |
|---|---|
| `/` | Redirect → `/fr` |
| `/fr` | Accueil (hero + galerie + équipements + avis) |
| `/fr/autour` | Autour de nous |
| `/fr/reserver` | Réserver |
| `/en` | Home |
| `/en/around` | Around us |
| `/en/book` | Book your stay |

## Deploy

- Target: **Vercel** (static, free tier)
- Domain: `location-etoiledelamer-capdagde.fr` — buy on Cloudflare Registrar, then add to Vercel project
- Wire in `@astrojs/sitemap` integration before first deploy (see comment in `astro.config.mjs`)