// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://mahade.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), sitemap({
    filter: (page) => !page.includes('/404'),
  }), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});