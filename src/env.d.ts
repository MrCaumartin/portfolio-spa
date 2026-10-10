/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_LEAD_BASE_URL?: string;
  readonly PUBLIC_LEAD_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
