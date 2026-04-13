import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// @astrojs/sitemap is listed in package.json and will be wired in before deployment.
// It requires the root redirect page (index.astro) to be excluded via filter,
// which appears broken in @astrojs/sitemap@3.7.2 when the redirect returns a Response.

export default defineConfig({
  site: 'https://location-etoiledelamer-capdagde.fr',
  integrations: [tailwind()],
  output: 'static',
});
