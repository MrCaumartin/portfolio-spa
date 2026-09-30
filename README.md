# Portfolio SPA

Static Astro site (English at `/`, French at `/fr/`). Build:
`pnpm install --frozen-lockfile && pnpm run build` (outputs to `dist/`).

## Local dev

    pnpm install
    pnpm dev

Optionally copy `.env.example` to `.env` and set `PUBLIC_GA_MEASUREMENT_ID`
to see the GA snippet locally.

## Scripts

- `pnpm run lint` — ESLint (JS/TS/Astro)
- `pnpm run format` / `pnpm run format:check` — Prettier
- `pnpm run check` — `astro check` type checking

## Site URL

The production URL is set via `site` in `astro.config.mjs`. It drives
canonical links, `og:url`, absolute `hreflang` links and the sitemap
(`sitemap-index.xml`). Update it there if the domain changes.

## Cloudflare Pages deployment

1. Connect the repo in Cloudflare Pages (Git integration).
2. Build command: `pnpm run build`
3. Build output directory: `dist`
4. Production branch `main` → www.alexcaumartin.com. Preview branch
   `develop` → dev.alexcaumartin.com, via a custom domain on the `develop`
   branch alias (DNS CNAME `dev` → `develop.<project>.pages.dev`).
5. **Required manual step:** set `PUBLIC_GA_MEASUREMENT_ID` in the Pages
   **Production** environment variables only — never Preview, so dev sends
   no analytics. Astro/Vite inlines `import.meta.env.*` at build time.

The dev and `*.pages.dev` hosts are kept out of search engines by
`public/_headers` (`X-Robots-Tag: noindex`); production doesn't get it.
