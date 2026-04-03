import { ROUTES } from '@/data/routes';

// Navigation data
export const navigation = [
  {
    name: 'HOME',
    href: ROUTES.home,
    current: true,
  },
  { name: 'PORTFOLIO', href: ROUTES.portfolio },
  { name: 'ARTICLES', href: ROUTES.articles },
  { name: 'ABOUT', href: ROUTES.about },
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
  heading: 'Exploring the world through code and lens!',
  subHeading: 'Visual Stories by Paria',
  scrollLabel: 'Scroll',
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
