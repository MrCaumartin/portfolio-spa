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

## Cloudflare deployment (dev)

The dev site is a Cloudflare Worker (`portfolio-spa`, config in
`wrangler.jsonc`) serving the static `dist/` assets. Workers Builds deploys
it from the `develop` branch to dev.alexcaumartin.com.

- Build command: `pnpm config set --location user //npm.pkg.github.com/:_authToken "$NPM_TOKEN" && pnpm install --frozen-lockfile && pnpm run build`
  (`@mrcaumartin/lead-sdk` is on GitHub Packages; the token goes in the
  user-level config because pnpm may ignore env tokens in the project `.npmrc`)
- Build secret `NPM_TOKEN`: GitHub token with `read:packages` on the
  MrCaumartin account.
- Deploy command: `pnpm exec wrangler deploy`
- `PUBLIC_GA_MEASUREMENT_ID` is a build variable; leave it unset for dev so
  no analytics are sent.
- `PUBLIC_LEAD_BASE_URL` / `PUBLIC_LEAD_SITE_KEY` enable the lead SDK; leave
  both unset for dev so it never talks to production.

`public/_headers` (`X-Robots-Tag: noindex`) keeps dev out of search indexes.

Production isn't set up yet.
