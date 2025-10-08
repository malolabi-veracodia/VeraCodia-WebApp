import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://veracodia.github.io',
  base: process.env.NODE_ENV === 'production' ? '/VeraCodia-WebApp' : '/',
  integrations: [sitemap()],
  output: 'static'
});