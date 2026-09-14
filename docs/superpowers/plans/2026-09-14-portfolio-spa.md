# Portfolio SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a static Astro portfolio SPA (skills summary + disabled interest form + GA4) deployable to Railway as a static site.

**Architecture:** Single Astro project, no SSR adapter. One shared `BaseLayout.astro` handles `<head>` (design tokens, global CSS, conditional GA4 snippet); `index.astro` composes five presentational components (`Hero`, `Skills`, `Experience`, `InterestForm`, `Footer`). No client-side JS framework — Astro ships zero JS by default for static markup.

**Tech Stack:** Astro (static output), plain CSS with custom properties, no test framework (static content — verification is `astro build` + grep/manual browser check per task).

**Spec:** `docs/superpowers/specs/2026-09-14-portfolio-spa-design.md`

## Global Constraints

- No CSS framework, no single-file bundler plugin — normal Astro multi-file output.
- No client-side JS framework (React/Vue/etc.) — plain Astro components only.
- All colors/spacing/typography in components reference CSS custom properties from `src/styles/tokens.css` — no hardcoded values in component `<style>` blocks.
- Interest form ships with `disabled` submit and a "coming soon" note — no live backend call.
- GA4 measurement ID comes only from `import.meta.env.PUBLIC_GA_MEASUREMENT_ID`; if unset, the GA snippet must not render at all.
- Placeholder content marked `TODO: replace placeholder copy` for bio/skills/experience.

---

### Task 1: Scaffold the Astro project

**Files:**
- Create: `portfolio-spa/package.json`
- Create: `portfolio-spa/astro.config.mjs`
- Create: `portfolio-spa/tsconfig.json`
- Create: `portfolio-spa/src/env.d.ts`
- Create: `portfolio-spa/src/pages/index.astro` (temporary placeholder, replaced in Task 6)
- Create: `portfolio-spa/.gitignore`

**Interfaces:**
- Produces: a working `npm run build` producing `dist/index.html`, and `npm run dev` for local preview. Later tasks assume `npm install` has been run in `portfolio-spa/`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio-spa",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.16.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: Create `src/env.d.ts`**

```ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

- [ ] **Step 5: Create placeholder `src/pages/index.astro`**

```astro
---
---
<html>
  <body>
    <h1>Scaffold OK</h1>
  </body>
</html>
```

- [ ] **Step 6: Create `.gitignore`**

```
node_modules/
dist/
.env
```

- [ ] **Step 7: Install dependencies and verify build**

Run: `cd portfolio-spa && npm install && npm run build`
Expected: exits 0, creates `dist/index.html` containing `Scaffold OK`.

Run: `grep -q "Scaffold OK" dist/index.html && echo PASS`
Expected: prints `PASS`.

- [ ] **Step 8: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro .gitignore
git commit -m "chore: scaffold astro project"
```

---

### Task 2: Design tokens and global styles

**Files:**
- Create: `portfolio-spa/src/styles/tokens.css`
- Create: `portfolio-spa/src/styles/global.css`

**Interfaces:**
- Produces: CSS custom properties consumed by every component created in Tasks 4-6 (`--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border`, `--space-1`..`--space-8`, `--font-sans`, `--font-size-sm/base/lg/xl/2xl`, `--line-height-base`, `--radius-sm/md`, `--shadow-sm`).

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
/*
  Design tokens: the only place raw color/size/font values should appear.
  Components reference these variables, never literals.
*/
:root {
  /* Color */
  --color-bg: #0f1115;
  --color-surface: #171a21;
  --color-text: #e8eaed;
  --color-text-muted: #9aa0a6;
  --color-accent: #5b8def;
  --color-border: #2a2e37;

  /* Spacing scale (4px base, ~1.5x steps) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Typography */
  --font-sans: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.75rem;
  --font-size-2xl: 2.5rem;
  --line-height-base: 1.5;

  /* Shape */
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import "./tokens.css";

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

h1, h2, h3 {
  line-height: 1.2;
  margin: 0 0 var(--space-4);
}

a {
  color: var(--color-accent);
}

section {
  padding: var(--space-7) var(--space-5);
  max-width: 720px;
  margin: 0 auto;
}
```

- [ ] **Step 3: Verify CSS is valid (build still passes with these files present, unreferenced is fine for now)**

Run: `cd portfolio-spa && npm run build`
Expected: exits 0 (files aren't imported yet, so this just guards against a typo breaking the build later — no import to check yet).

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat: add design tokens and global styles"
```

---

### Task 3: BaseLayout with conditional GA4 snippet

**Files:**
- Create: `portfolio-spa/src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `src/styles/global.css` (Task 2).
- Produces: `BaseLayout.astro` accepting a `title: string` prop and a default slot, used by `index.astro` in Task 6. Renders `<html><head>...</head><body><slot /></body></html>`.

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
}

const { title } = Astro.props;
const gaId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {gaId && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
        <script is:inline define:vars={{ gaId }}>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', gaId);
        </script>
      </>
    )}
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Wire a temporary page to verify GA gating (present env var)**

Temporarily replace `src/pages/index.astro` content with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Test"><p>hi</p></BaseLayout>
```

Run: `cd portfolio-spa && PUBLIC_GA_MEASUREMENT_ID=G-TEST123 npm run build`
Expected: exits 0.

Run: `grep -q "gtag/js?id=G-TEST123" dist/index.html && echo PASS_WITH_ID`
Expected: prints `PASS_WITH_ID`.

- [ ] **Step 3: Verify GA gating (absent env var)**

Run: `cd portfolio-spa && npm run build`
Expected: exits 0.

Run: `grep -q "gtag/js" dist/index.html || echo PASS_WITHOUT_ID`
Expected: prints `PASS_WITHOUT_ID` (script must be absent).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add base layout with conditional GA4 snippet"
```

---

### Task 4: Hero, Skills, Experience content components

**Files:**
- Create: `portfolio-spa/src/components/Hero.astro`
- Create: `portfolio-spa/src/components/Skills.astro`
- Create: `portfolio-spa/src/components/Experience.astro`

**Interfaces:**
- Consumes: CSS tokens from Task 2 (via global styles already loaded by `BaseLayout`).
- Produces: three zero-prop components rendering static placeholder content, consumed by `index.astro` in Task 6.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
<section class="hero">
  <h1>Alex Caumartin</h1>
  <!-- TODO: replace placeholder copy -->
  <p class="tagline">Software engineer building pragmatic, well-tested systems.</p>
</section>

<style>
  .hero {
    text-align: center;
    padding-top: var(--space-8);
  }
  h1 {
    font-size: var(--font-size-2xl);
  }
  .tagline {
    color: var(--color-text-muted);
    font-size: var(--font-size-lg);
  }
</style>
```

- [ ] **Step 2: Create `src/components/Skills.astro`**

```astro
---
/* TODO: replace placeholder copy */
const skills = [
  "TypeScript", "Node.js", "React", "PostgreSQL", "Docker", "CI/CD",
];
---
<section class="skills">
  <h2>Skills</h2>
  <ul class="skills-list">
    {skills.map((skill) => <li class="skill-tag">{skill}</li>)}
  </ul>
</section>

<style>
  .skills-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding: 0;
  }
  .skill-tag {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
  }
</style>
```

- [ ] **Step 3: Create `src/components/Experience.astro`**

```astro
---
/* TODO: replace placeholder copy */
const highlights = [
  { role: "Senior Engineer", detail: "Led migration of a monolith to modular services." },
  { role: "Engineer", detail: "Built internal tooling used across three teams." },
];
---
<section class="experience">
  <h2>Experience</h2>
  <ul class="highlights">
    {highlights.map((h) => (
      <li class="highlight">
        <strong>{h.role}</strong>
        <p>{h.detail}</p>
      </li>
    ))}
  </ul>
</section>

<style>
  .highlights {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .highlight {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    box-shadow: var(--shadow-sm);
  }
  .highlight p {
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 4: Verify components compile (temporarily render all three in index.astro)**

Temporarily set `src/pages/index.astro` to:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import Skills from "../components/Skills.astro";
import Experience from "../components/Experience.astro";
---
<BaseLayout title="Test">
  <Hero />
  <Skills />
  <Experience />
</BaseLayout>
```

Run: `cd portfolio-spa && npm run build`
Expected: exits 0.

Run: `grep -q "Skills" dist/index.html && grep -q "Experience" dist/index.html && echo PASS`
Expected: prints `PASS`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/Skills.astro src/components/Experience.astro src/pages/index.astro
git commit -m "feat: add hero, skills, and experience sections"
```

---

### Task 5: Interest form (disabled) and Footer

**Files:**
- Create: `portfolio-spa/src/components/InterestForm.astro`
- Create: `portfolio-spa/src/components/Footer.astro`

**Interfaces:**
- Produces: `InterestForm.astro` and `Footer.astro`, zero-prop components consumed by `index.astro` in Task 6. `InterestForm` field `name` attributes (`name`, `email`, `message`) are the contract the future `platform` gateway integration will read.

- [ ] **Step 1: Create `src/components/InterestForm.astro`**

```astro
<section class="interest">
  <h2>Get in touch</h2>
  <p class="coming-soon">Coming soon — backend in progress.</p>
  <form class="interest-form">
    <label for="name">Name</label>
    <input id="name" name="name" type="text" required disabled />

    <label for="email">Email</label>
    <input id="email" name="email" type="email" required disabled />

    <label for="message">Message</label>
    <textarea id="message" name="message" required disabled></textarea>

    <button type="submit" disabled>Send</button>
  </form>
</section>

<style>
  .coming-soon {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
  }
  .interest-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .interest-form input,
  .interest-form textarea {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    padding: var(--space-2);
    font: inherit;
  }
  .interest-form button {
    align-self: flex-start;
    margin-top: var(--space-2);
    padding: var(--space-2) var(--space-5);
    border-radius: var(--radius-sm);
    border: none;
    background: var(--color-accent);
    color: var(--color-bg);
    font-weight: 600;
  }
  .interest-form button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
<footer class="site-footer">
  <p>&copy; {new Date().getFullYear()} Alex Caumartin</p>
</footer>

<style>
  .site-footer {
    text-align: center;
    padding: var(--space-5);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    border-top: 1px solid var(--color-border);
  }
</style>
```

- [ ] **Step 3: Verify (temporarily render both in index.astro alongside existing sections)**

Add `import InterestForm from "../components/InterestForm.astro";` and `import Footer from "../components/Footer.astro";` to `src/pages/index.astro`, and render `<InterestForm />` and `<Footer />` after `<Experience />` inside `<BaseLayout>`.

Run: `cd portfolio-spa && npm run build`
Expected: exits 0.

Run: `grep -q "Coming soon" dist/index.html && grep -qi "disabled" dist/index.html && echo PASS`
Expected: prints `PASS`.

- [ ] **Step 4: Commit**

```bash
git add src/components/InterestForm.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add disabled interest form and footer"
```

---

### Task 6: Assemble final page

**Files:**
- Modify: `portfolio-spa/src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout` (Task 3), `Hero`/`Skills`/`Experience` (Task 4), `InterestForm`/`Footer` (Task 5).

- [ ] **Step 1: Replace `src/pages/index.astro` with the final composition**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import Skills from "../components/Skills.astro";
import Experience from "../components/Experience.astro";
import InterestForm from "../components/InterestForm.astro";
import Footer from "../components/Footer.astro";
---
<BaseLayout title="Alex Caumartin — Portfolio">
  <Hero />
  <Skills />
  <Experience />
  <InterestForm />
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Build and manually review in browser**

Run: `cd portfolio-spa && npm run build && npm run preview`
Open the printed local URL in a browser. Confirm: hero/skills/experience render, interest form shows disabled fields and "Coming soon", footer renders, no console errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble final portfolio page"
```

---

### Task 7: Env example and Railway deployment docs

**Files:**
- Create: `portfolio-spa/.env.example`
- Create: `portfolio-spa/README.md`

**Interfaces:**
- Produces: documented deployment steps; no code interfaces (final task).

- [ ] **Step 1: Create `.env.example`**

```
# GA4 measurement ID (e.g. G-XXXXXXXXXX). If unset, no analytics snippet renders.
PUBLIC_GA_MEASUREMENT_ID=
```

- [ ] **Step 2: Create `README.md`**

```markdown
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
```

- [ ] **Step 3: Verify build unaffected**

Run: `cd portfolio-spa && npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add .env.example README.md
git commit -m "docs: add env example and railway deployment steps"
```
