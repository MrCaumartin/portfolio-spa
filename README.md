# Portfolio SPA

Static Astro site. Build: `npm run build` (outputs to `dist/`).

## Local dev

    npm install
    npm run dev

Optionally copy `.env.example` to `.env` and set `PUBLIC_GA_MEASUREMENT_ID`
to see the GA snippet locally.

## Railway deployment

1. Create a new Railway **static site** service pointed at this repo/directory.
2. Build command: `npm install && npm run build`
3. Publish/output directory: `dist`
4. **Required manual step:** in the Railway service's Variables tab, add
   `PUBLIC_GA_MEASUREMENT_ID` with your real GA4 measurement ID. This must
   be set in Railway's dashboard — it cannot be picked up from code, since
   Astro/Vite inlines `import.meta.env.*` at build time.
