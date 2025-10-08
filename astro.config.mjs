import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://VeraCodia/VeraCodia-WebApp.github.io',
  base: '/veracodia-website',
  integrations: [sitemap()],
  output: 'static'
});