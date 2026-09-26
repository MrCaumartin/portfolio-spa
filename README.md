# Portfolio SPA

Static Astro site (English at `/`, French at `/fr/`). Build:
`npm ci && npm run build` (outputs to `dist/`).

## Local dev

    npm install
    npm run dev

Optionally copy `.env.example` to `.env` and set `PUBLIC_GA_MEASUREMENT_ID`
to see the GA snippet locally.

## Scripts

- `npm run lint` — ESLint (JS/TS/Astro)
- `npm run format` / `npm run format:check` — Prettier
- `npm run check` — `astro check` type checking

## Site URL

The production URL is set via `site` in `astro.config.mjs`. It drives
canonical links, `og:url`, absolute `hreflang` links and the sitemap
(`sitemap-index.xml`). Update it there if the domain changes.

## Railway deployment

1. Create a new Railway **static site** service pointed at this repo/directory.
2. Build command: `npm ci && npm run build`
3. Publish/output directory: `dist`
4. **Required manual step:** in the Railway service's Variables tab, add
   `PUBLIC_GA_MEASUREMENT_ID` with your real GA4 measurement ID. This must
   be set in Railway's dashboard — it cannot be picked up from code, since
   Astro/Vite inlines `import.meta.env.*` at build time.
