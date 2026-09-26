# Portfolio SPA — Design

## Purpose

A bilingual (EN/FR) personal portfolio single-page site for
caumartin.alex@gmail.com: presents background and services and captures
interest via a form. Optimized for near-zero hosting cost.

## Out of scope (see `../../../../platform/SEED.md`)

The interest form's backend (email delivery via SendGrid/SES through a
gateway + microservices) is a separate future project, `platform`. This
site's form is built but **disabled ("coming soon")** until that project
exists and exposes an endpoint to point at.

## Stack

- **Astro**, static output (`astro build`), no SSR/adapter needed.
- Plain CSS with custom properties for design tokens — no CSS framework.
- No JS framework (React/Vue/etc.) — Astro islands not needed since
  there's no client-side interactivity beyond form validation and GA.

## Structure

```
astro.config.mjs             # site URL, i18n, sitemap, self-hosted fonts
src/
  i18n.ts                    # all copy, typed per language (en, fr)
  pages/
    index.astro              # English (/)
    fr/index.astro           # French (/fr/)
    404.astro
  layouts/BaseLayout.astro   # head meta, canonical/hreflang, OG, JSON-LD, GA
  components/
    HomePage.astro           # composes the sections below for a language
    Header.astro             # language switcher
    LangBanner.astro         # "Voir en français" suggestion on /
    Hero.astro
    About.astro
    Services.astro
    Process.astro
    InterestForm.astro
    Footer.astro
  styles/
    tokens.css               # :root custom properties (design tokens)
    global.css               # layered base styles, uses tokens
public/                      # favicons, og-image, manifest, robots.txt
.env.example                 # documents PUBLIC_GA_MEASUREMENT_ID
```

## Languages

- English at `/`, French at `/fr/` (Astro i18n, no default-locale prefix).
- No automatic redirect. Visitors reach their language through absolute
  `hreflang` links and sitemap alternates (search), the header switcher,
  and a dismissible suggestion banner on `/` for `fr*` browsers.

## Design tokens (`tokens.css`)

A single `:root` block covering color, a spacing scale (`--space-1` …
`--space-8`), font sizes, line height and radius. The font family
variable `--font-sans` is provided by Astro's fonts API (JetBrains Mono).

Every component styles from these variables only — no hardcoded colors/
sizes in component `<style>` blocks.

## Content

Hero, About, Services, Process and the interest form. All copy lives in
`src/i18n.ts`, one typed object per language.

## Interest form

- Fields: name, email, message. Client-side required/email validation
  (native HTML5 `required`/`type="email"`, no JS validation library).
- Fields sit in a `disabled` `<fieldset>`, with a "Coming soon — backend
  in progress" note linked via `aria-describedby`.
- `<form>` markup already has the right `name` attributes so wiring it to
  a real endpoint later (fetch POST to the future `platform` gateway) is
  a small follow-up change, not a redesign.

## Analytics

- GA4 via the standard `gtag.js` snippet.
- Script tag uses `async`, placed at the end of `<body>` (non-blocking).
- Measurement ID read from `import.meta.env.PUBLIC_GA_MEASUREMENT_ID`
  (Astro/Vite convention: `PUBLIC_` prefix exposes it client-side).
  Sourced from a local `.env` (gitignored); `.env.example` documents the
  variable name with a placeholder value.
- If the env var is unset (e.g. local dev), skip rendering the snippet
  entirely rather than sending a broken/placeholder ID.

## SEO

- `site` in `astro.config.mjs` drives canonical, `og:url` and absolute
  `hreflang` URLs.
- `@astrojs/sitemap` emits `sitemap-index.xml` with `xhtml:link`
  alternates; `robots.txt` points to it.
- Open Graph/Twitter image (`public/og-image.png`) and JSON-LD
  `Person` + `WebSite`.

## Build & deploy

- `astro build` → default multi-file output (`dist/index.html` + small
  hashed CSS/JS files). No single-file bundler plugin — per
  `modern-web-guidance`, only critical above-fold CSS should be inlined;
  the rest should stay in separate, browser-cacheable files with
  `defer`/`async`.
- Deployed as a Railway **static site** service serving `dist/`.
- `PUBLIC_GA_MEASUREMENT_ID` set as a Railway environment variable for
  the production build (build-time env var, since Astro/Vite inlines
  `import.meta.env.*` at build time — **flagging per project-categories
  rule: this requires the user to add it in Railway's dashboard
  themselves, it can't be set from code**).

## Testing

No test framework — static content site. Verification is manual: run
`astro dev`, check in browser that sections render, GA snippet fires
(network tab), and the form's disabled state displays correctly.

## Error handling

None beyond native HTML5 form validation — no backend to fail against
yet, no client-side JS that can throw during normal use.
