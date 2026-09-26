import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
