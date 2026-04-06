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
  ctaLink: {
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

export const aboutPageHeroInfo = {
  title: 'About Me',
  heading: 'Thinking end-to-end, building with purpose',
  content: '',
};

export const profileCardInfo = {
  title: 'Hi, I’m Paria',
  bio: [
    'I’m a software developer who found a second language in photography. By day, I craft digital experiences through code - thinking not just about what to build, but why it matters and how it feels to use.',
    'I’ve learned that the same mind that frames a photograph - considering light, composition, and the story in a single moment - is the one that asks whether a feature actually solves the right problem. Both disciplines taught me to see the whole before touching the parts.',
    'This portfolio is where those two worlds meet. Whether I’m architecting a product or chasing golden hour light, I’m always looking for the balance between intention and execution.',
  ],
  imageLink: '/images/about-paria.jpg',
  imageAlt: 'Paria - Software Developer & Photographer',
  location: 'Based in Norway',
  emailBtnLink: 'mailto:paria.heidari.ph@gmail.com',
  emailBtnText: 'Get in Touch',
  githubBtnLink: 'https://github.com/paria-heidari',
  githubBtnText: 'GitHub',
};

export const twoWorldsSectionInfo = {
  title: 'Two Worlds, One Vision',
  subTitle: 'Where analytical thinking meets creative expression',
  developerCard: {
    title: 'The Developer',
    description:
      'End-to-end ownership from idea to production — grounded in user impact, performance where it matters, and solving the right problems as products grow.',
    skillsLabel: 'Tech Stack',
    skills: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Azure',
      'Tailwind CSS',
      'PostgreSQL',
      'Supabase',
      'AI',
      'SCSS',
    ],
  },
  photographerCard: {
    title: 'The Photographer',
    description:
      'Capturing moments that tell stories. From sweeping landscapes to intimate street scenes, I seek the extraordinary in the ordinary and the timeless in the fleeting.',
    skillsLabel: 'Specialties',
    skills: [
      'Landscape',
      'Event Photography',
      'Street Photography',
      'Travel',
      'Portrait',
      'Architecture Photography',
    ],
  },
};

export const aboutCtaSectionInfo = {
  title: "Let's Create Something Together",
  description:
    "Whether you need a web application built, want to collaborate on a photography project, or just want to say hello — I'd love to hear from you.",
  actions: [
    {
      href: 'mailto:paria.heidari.ph@gmail.com',
      label: 'Start a Conversation',
      variant: 'gold' as const,
      external: true,
    },
    {
      href: ROUTES.portfolio,
      label: 'View Portfolio',
      variant: 'tertiary' as const,
    },
  ],
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
