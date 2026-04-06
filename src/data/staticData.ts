export const ROUTES = {
  home: '/',
  portfolio: '/pages/portfolio',
  articles: '/pages/articles',
  about: '/pages/about',
} as const;

// Navigation data
export const navigation: { name: string; href: string; current: boolean }[] = [
  {
    name: 'HOME',
    href: ROUTES.home,
    current: true,
  },
  { name: 'PORTFOLIO', href: ROUTES.portfolio, current: false },
  { name: 'ARTICLES', href: ROUTES.articles, current: false },
  { name: 'ABOUT', href: ROUTES.about, current: false },
];

// Metadata data
export const metadataInfo = {
  title: 'Paria Creative Vision',
  description: 'Personal portfolio of Paria',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// HomePage data
export const homePageHeroInfo = {
  subTitle: 'Photography & Code',
  heading: 'Exploring the world',
  heading2: 'through code and lens!',
  subHeading: 'Visual Stories by Paria',
  scrollLabel: 'Scroll',
};

export const featuredGalleryInfo = {
  title: 'Featured Collection',
  subTitle: 'Curated photography highlights',
  featuredBadgeLabel: 'Featured',
  ctaLink: {
    href: navigation.find((item) => item.name === 'PORTFOLIO')?.href as string,
    label: 'View Full Portfolio',
  },
};

export const latestArticlesInfo = {
  title: 'Latest Insights',
  content:
    'Exploring the intersection of code and creativity. From web development techniques to AI innovations, I share practical insights and reflections on building digital experiences.',
  ctaLinkData: {
    href: ROUTES.articles,
    label: 'View all articles',
  },
};

export const articlesPageHeroInfo = {
  title: 'Articles',
  heading: 'Insights on code & creativity',
  content:
    'Exploring the intersection of code and creativity. From web development techniques to AI innovations, I share practical insights and reflections on building digital experiences.',
};

/** Button ids must stay in sync with `MEDIUM_ARTICLE_FILTERS` in mediumArticleFilterConfig */
export const articleFilterCategories = [
  { id: 'all', label: 'All Articles', icon: 'newspaper' },
  { id: 'web', label: 'Web Dev', icon: 'code' },
  { id: 'ai', label: 'AI', icon: 'brain' },
] as const;

export const portfolioHeroInfo = {
  title: 'Visual Stories by Paria',
  heading: 'Photography Portfolio',
  content:
    'A curated collection of moments captured across landscapes, cities, and fleeting light.',
};

// Footer data
const currentYear = new Date().getFullYear();
const location = 'Europe';
export const footerInfo = {
  title: 'Paria Creative Vision',
  content:
    'Where code inspires creativity and photography captures emotion. I merge the digital and visual worlds to create stories that reflect both structure and soul. Discover the art of seeing through both logic and light.',
  navigationTitle: 'Navigation',
  contactTitle: 'Get in Touch',
  contactName: 'Paria',
  contactEmail: 'paria.heidari.ph@gmail.com',
  contactMessage: 'Available for collaborations.',
  copyright: `© ${currentYear} Paria Creative Vision. All Rights Reserved.`,
  craftedWith: 'Crafted with passion in',
  location: location,
};

export const textBlockData = {
  title: 'Exploring the world through code and lens!',
  content:
    'Where code inspires creativity and photography captures emotion. I merge the digital and visual worlds to create stories that reflect both structure and soul. Discover the art of seeing through both logic and light.',
};
