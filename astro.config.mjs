import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.alexcaumartin.com',
  output: 'static',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false }
  },
  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [500, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
      optimizedFallbacks: true
    },
    {
      name: 'IBM Plex Sans',
      cssVariable: '--font-sans',
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      optimizedFallbacks: true
    }
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-CA', fr: 'fr-CA' }
      }
    })
  ]
});
