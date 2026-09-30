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
  notFound: { heading: string; body: string; back: string };
  hero: { tagline: string };
  about: { heading: string; p1: string; p2: string };
  services: { heading: string; items: Item[] };
  process: { heading: string; steps: Item[] };
  form: {
    heading: string;
    comingSoon: string;
    legend: string;
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
    title: 'Alex Caumartin · Full Stack Developer',
    description:
      'Full stack developer. I build distributed systems and SaaS platforms, and I co-founded a multi-tenant CMS that grew to over 800 clients.',
    jobTitle: 'Full Stack Developer',
    locale: 'en_CA',
    imageAlt: 'Alex Caumartin, with fox logo'
  },
  notFound: {
    heading: 'Page not found',
    body: "The page you're looking for doesn't exist or has moved.",
    back: 'Back to home'
  },
  hero: {
    tagline:
      "I build distributed systems and SaaS platforms. I've been shipping production software for over 10 years."
  },
  about: {
    heading: 'About',
    p1: "I've been building production systems for more than 10 years. I co-founded RubberDuck, a multi-tenant SaaS CMS. It grew to over 800 clients, and the engineering team grew to 25 people.",
    p2: "Today I'm a full stack developer at Soumission Rénovation, a platform that connects homeowners with verified, licensed contractors for their renovation projects. I work on everything from the architecture of our distributed systems to shipping features. I also use AI tools in my day-to-day work."
  },
  services: {
    heading: 'Services',
    items: [
      {
        title: 'Backend & APIs',
        detail:
          'I design the backend services and APIs your product runs on, then build and test them.'
      },
      {
        title: 'AI integration',
        detail:
          'Adding LLM features to a product you already have, or connecting your tools and data to AI agents through MCP.'
      },
      {
        title: 'Technical consulting',
        detail:
          "Planning a new system or hitting a scaling problem? We go over the architecture together and I tell you what I'd change."
      },
      {
        title: 'Database optimization',
        detail:
          'When your database slows down, I find the cause and fix the queries, indexes or schema.'
      }
    ]
  },
  process: {
    heading: 'How it works',
    steps: [
      {
        title: 'Discovery call',
        detail:
          "A short call about what you need. If I'm not the right person for it, I'll tell you."
      },
      {
        title: 'Scope',
        detail:
          "A written proposal: what I'll build, how long it will take and what it will cost."
      },
      {
        title: 'Build',
        detail:
          'I keep you posted as I go, and you can see where things stand at any point.'
      },
      {
        title: 'Handoff',
        detail:
          'You get the working software and its documentation, and I walk your team through it.'
      }
    ]
  },
  form: {
    heading: 'Get in touch',
    comingSoon: 'Coming soon. The backend for this form is still in progress.',
    legend: 'Your details',
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
    title: 'Alex Caumartin · Développeur full-stack',
    description:
      "Développeur full-stack. Je bâtis des systèmes distribués et des plateformes SaaS, et j'ai cofondé un CMS multi-locataire qui a dépassé les 800 clients.",
    jobTitle: 'Développeur full-stack',
    locale: 'fr_CA',
    imageAlt: 'Alex Caumartin, avec logo de renard'
  },
  notFound: {
    heading: 'Page introuvable',
    body: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil"
  },
  hero: {
    tagline:
      'Je bâtis des systèmes distribués et des plateformes SaaS. Ça fait plus de 10 ans que je mets du code en production.'
  },
  about: {
    heading: 'À propos',
    p1: "Je bâtis des systèmes en production depuis plus de 10 ans. J'ai cofondé RubberDuck, un CMS SaaS multi-locataire. On a dépassé les 800 clients, et l'équipe d'ingénierie a grandi jusqu'à 25 personnes.",
    p2: "Aujourd'hui, je suis développeur full-stack chez Soumission Rénovation, une plateforme qui met en relation les propriétaires avec des entrepreneurs vérifiés, détenteurs d'une licence de la RBQ, pour leurs projets de rénovation. Je touche à tout, de l'architecture de nos systèmes distribués jusqu'à la livraison de fonctionnalités. J'utilise aussi des outils d'IA dans mon travail de tous les jours."
  },
  services: {
    heading: 'Services',
    items: [
      {
        title: 'Backend et API',
        detail:
          'Je conçois les services backend et les API sur lesquels roule votre produit, puis je les développe et je les teste.'
      },
      {
        title: "Intégration de l'IA",
        detail:
          'Ajouter des fonctionnalités basées sur des LLM à un produit existant, ou brancher vos outils et vos données à des agents IA avec MCP.'
      },
      {
        title: 'Services-conseils techniques',
        detail:
          "Vous planifiez un nouveau système ou vous avez un problème de mise à l'échelle? On regarde l'architecture ensemble et je vous dis ce que je changerais."
      },
      {
        title: 'Optimisation de base de données',
        detail:
          'Quand votre base de données ralentit, je trouve la cause et je corrige les requêtes, les index ou le schéma.'
      }
    ]
  },
  process: {
    heading: 'Comment ça fonctionne',
    steps: [
      {
        title: 'Appel de découverte',
        detail:
          'Un court appel pour parler de vos besoins. Si je ne suis pas la bonne personne, je vous le dis.'
      },
      {
        title: 'Portée du projet',
        detail:
          'Une proposition écrite : ce que je vais construire, en combien de temps et à quel coût.'
      },
      {
        title: 'Réalisation',
        detail:
          "Je vous tiens au courant en cours de route, et vous pouvez voir où j'en suis en tout temps."
      },
      {
        title: 'Livraison',
        detail:
          'Vous recevez le logiciel fonctionnel et sa documentation, et je fais le tour du projet avec votre équipe.'
      }
    ]
  },
  form: {
    heading: 'Me joindre',
    comingSoon:
      'Bientôt disponible. Le backend de ce formulaire est encore en développement.',
    legend: 'Vos coordonnées',
    name: 'Nom',
    email: 'Courriel',
    message: 'Message',
    send: 'Envoyer'
  },
  a11y: { skipLink: 'Passer au contenu principal', langNav: 'Langue' },
  switcher: { href: '/', label: 'English', lang: 'en' }
};

const strings: Record<Lang, Strings> = { en, fr };

export const t = (lang: Lang): Strings => strings[lang];

interface BannerStrings {
  label: string;
  text: string;
  close: string;
}

// Keyed by target language; written in that language.
export const langBanner: Record<Lang, BannerStrings> = {
  en: {
    label: 'Language suggestion',
    text: 'Also available in',
    close: 'Dismiss'
  },
  fr: {
    label: 'Suggestion de langue',
    text: 'Également offert en',
    close: 'Fermer'
  }
};
