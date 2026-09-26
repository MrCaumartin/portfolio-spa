export const languages = ['en', 'fr'] as const;
export type Lang = (typeof languages)[number];

export const localePaths: Record<Lang, string> = { en: '/', fr: '/fr/' };

interface Item {
  title: string;
  detail: string;
}

export interface Strings {
  meta: {
    title: string;
    description: string;
    jobTitle: string;
    locale: string;
    imageAlt: string;
  };
  notFound: { title: string; heading: string; body: string; back: string };
  hero: { tagline: string };
  about: { heading: string; p1: string; p2: string };
  services: { heading: string; items: Item[] };
  process: { heading: string; steps: Item[] };
  form: {
    heading: string;
    comingSoon: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  a11y: { skipLink: string; langNav: string };
  switcher: { href: string; label: string; lang: Lang };
}

const en: Strings = {
  meta: {
    title: 'Alex Caumartin — Full Stack Developer',
    description:
      'Full stack developer specializing in distributed systems, accelerated by AI tooling.',
    jobTitle: 'Full Stack Developer',
    locale: 'en_CA',
    imageAlt: 'Alex Caumartin — Full stack developer'
  },
  notFound: {
    title: 'Page not found — Alex Caumartin',
    heading: 'Page not found',
    body: "The page you're looking for doesn't exist or has moved.",
    back: 'Back to home'
  },
  hero: {
    tagline:
      'Full stack developer specializing in distributed systems, accelerated by AI tooling.'
  },
  about: {
    heading: 'About',
    p1: "I've spent the last 10+ years building production systems — from early-stage startups through to scale. I co-founded RubberDuck, a multi-tenant SaaS CMS that grew to over 800 clients and a 25-person engineering team.",
    p2: "Today I'm a Full Stack Developer at Soumission Rénovation, a platform that connects homeowners with verified, licensed contractors for renovation projects. I work across the stack — from distributed-systems architecture to day-to-day feature delivery — and use AI tools to work faster without cutting corners."
  },
  services: {
    heading: 'Services',
    items: [
      {
        title: 'Backend Development',
        detail:
          'Design and build reliable, well-tested backend systems and APIs.'
      },
      {
        title: 'AI Implementation',
        detail:
          'Integrate LLMs and AI features into real products, from prototype to production.'
      },
      {
        title: 'Technical Consulting',
        detail:
          'Advise on architecture, scaling, and technical decisions before you commit.'
      },
      {
        title: 'Database Optimization',
        detail:
          'Diagnose slow queries and tune schemas for performance at scale.'
      },
      {
        title: 'API Development',
        detail:
          'Build clean, documented APIs that are easy to integrate and maintain.'
      },
      {
        title: 'MCP Integration',
        detail:
          'Connect tools and data sources to AI agents using the Model Context Protocol.'
      }
    ]
  },
  process: {
    heading: 'How it works',
    steps: [
      {
        title: 'Discovery call',
        detail:
          "A short call to understand what you need and whether it's a fit."
      },
      {
        title: 'Scope',
        detail: 'A clear proposal: what gets built, timeline, and cost.'
      },
      {
        title: 'Build',
        detail: 'Regular check-ins as the work progresses, no black boxes.'
      },
      {
        title: 'Handoff',
        detail:
          'Working software, documentation, and a clean handoff to your team.'
      }
    ]
  },
  form: {
    heading: 'Get in touch',
    comingSoon: 'Coming soon — backend in progress.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send'
  },
  a11y: { skipLink: 'Skip to main content', langNav: 'Language' },
  switcher: { href: '/fr/', label: 'Français', lang: 'fr' }
};

const fr: Strings = {
  meta: {
    title: 'Alex Caumartin — Développeur full-stack',
    description:
      "Développeur full-stack spécialisé en systèmes distribués, avec des flux de travail accélérés par l'IA.",
    jobTitle: 'Développeur full-stack',
    locale: 'fr_CA',
    imageAlt: 'Alex Caumartin — Développeur full-stack'
  },
  notFound: {
    title: 'Page introuvable — Alex Caumartin',
    heading: 'Page introuvable',
    body: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil"
  },
  hero: {
    tagline:
      "Développeur full-stack spécialisé en systèmes distribués, avec des flux de travail accélérés par l'IA."
  },
  about: {
    heading: 'À propos',
    p1: "J'ai passé les dix dernières années à bâtir des systèmes en production — de jeunes startups jusqu'à la mise à l'échelle. J'ai cofondé RubberDuck, un CMS SaaS multi-locataire qui a grandi jusqu'à plus de 800 clients et une équipe d'ingénierie de 25 personnes.",
    p2: "Aujourd'hui, je suis développeur full-stack chez Soumission Rénovation, une plateforme qui met en relation les propriétaires avec des entrepreneurs vérifiés et licenciés pour leurs projets de rénovation. Je travaille sur l'ensemble de la pile technologique — de l'architecture de systèmes distribués à la livraison de fonctionnalités au quotidien — et j'utilise des outils d'IA pour aller plus vite sans sacrifier la qualité."
  },
  services: {
    heading: 'Services',
    items: [
      {
        title: 'Développement backend',
        detail:
          'Concevoir et développer des systèmes backend et des API fiables et bien testés.'
      },
      {
        title: 'Implémentation IA',
        detail:
          'Intégrer des LLM et des fonctionnalités IA dans de vrais produits, du prototype à la production.'
      },
      {
        title: 'Consultation technique',
        detail:
          "Conseiller sur l'architecture, la mise à l'échelle et les décisions techniques avant de vous engager."
      },
      {
        title: 'Optimisation de base de données',
        detail:
          'Diagnostiquer les requêtes lentes et ajuster les schémas pour la performance à grande échelle.'
      },
      {
        title: "Développement d'API",
        detail:
          'Développer des API propres et documentées, faciles à intégrer et à maintenir.'
      },
      {
        title: 'Intégration MCP',
        detail:
          "Connecter des outils et des sources de données à des agents IA à l'aide du Model Context Protocol."
      }
    ]
  },
  process: {
    heading: 'Comment ça fonctionne',
    steps: [
      {
        title: 'Appel de découverte',
        detail:
          "Un court appel pour comprendre vos besoins et évaluer si c'est un bon fit."
      },
      {
        title: 'Portée du projet',
        detail:
          "Une proposition claire : ce qui sera construit, l'échéancier et le coût."
      },
      {
        title: 'Réalisation',
        detail:
          "Des suivis réguliers pendant l'avancement du travail, sans zones d'ombre."
      },
      {
        title: 'Livraison',
        detail:
          'Un logiciel fonctionnel, la documentation, et une transition propre vers votre équipe.'
      }
    ]
  },
  form: {
    heading: 'Entrer en contact',
    comingSoon: 'Bientôt disponible — backend en cours de développement.',
    name: 'Nom',
    email: 'Courriel',
    message: 'Message',
    send: 'Envoyer'
  },
  a11y: { skipLink: 'Passer au contenu principal', langNav: 'Langue' },
  switcher: { href: '/', label: 'English', lang: 'en' }
};

export const strings: Record<Lang, Strings> = { en, fr };

export const t = (lang: Lang): Strings => strings[lang];
