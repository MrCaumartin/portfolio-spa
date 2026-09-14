# Portfolio SPA — Design

## Purpose

A personal portfolio single-page site for caumartin.alex@gmail.com:
summarizes skills/experience and captures interest via a form. Optimized
for near-zero hosting cost.

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
src/
  pages/index.astro        # single page, composes sections below
  components/
    Hero.astro
    Skills.astro
    Experience.astro
    InterestForm.astro
    Footer.astro
  styles/
    tokens.css              # :root custom properties (design tokens)
    global.css               # base element styles, uses tokens
public/
  favicon, static assets
.env.example                 # documents PUBLIC_GA_MEASUREMENT_ID
```

## Design tokens (`tokens.css`)

A single `:root` block, commented, covering:
- Color: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border`
- Spacing scale: `--space-1` … `--space-8` (e.g. 4px base, doubling/1.5x steps)
- Typography: `--font-sans`, `--font-size-sm/base/lg/xl/2xl`, `--line-height-base`
- Radius/shadow: `--radius-sm/md`, `--shadow-sm`

Every component styles from these variables only — no hardcoded colors/
sizes in component `<style>` blocks. This is the "easy to follow"
guideline: one token file is the whole design system.

## Content

Placeholder copy for bio, skills list (tags/cards), and experience
highlights, clearly marked `TODO: replace placeholder copy` for the user
to fill in after scaffolding.

## Interest form

- Fields: name, email, message. Client-side required/email validation
  (native HTML5 `required`/`type="email"`, no JS validation library).
- Submit button rendered `disabled`, with a small "Coming soon — backend
  in progress" note.
- `<form>` markup already has the right `name` attributes so wiring it to
  a real endpoint later (fetch POST to the future `platform` gateway) is
  a small follow-up change, not a redesign.

## Analytics

- GA4 via the standard `gtag.js` snippet.
- Script tag uses `async`, injected in `<head>` per performance guidance
  (non-blocking).
- Measurement ID read from `import.meta.env.PUBLIC_GA_MEASUREMENT_ID`
  (Astro/Vite convention: `PUBLIC_` prefix exposes it client-side).
  Sourced from a local `.env` (gitignored); `.env.example` documents the
  variable name with a placeholder value.
- If the env var is unset (e.g. local dev), skip rendering the snippet
  entirely rather than sending a broken/placeholder ID.

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
