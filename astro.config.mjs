import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.location-etoiledelamer-capdagde.fr',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        page !== 'https://www.location-etoiledelamer-capdagde.fr/' &&
        !page.includes('/mentions-legales') &&
        !page.includes('/legal'),
    }),
  ],
  output: 'static',
});
