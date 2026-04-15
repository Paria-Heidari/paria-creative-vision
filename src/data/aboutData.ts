import { routes as ROUTES } from '@/lib/routes/routes';

// Skills data
export const techSkills = [
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
];

export const photoSkills = [
  'Landscape',
  'Street Photography',
  'Travel',
  'Portrait',
  'Architecture',
];

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
  leftCard: {
    title: 'The Developer',
    description:
      'End-to-end ownership from idea to production — grounded in user impact, performance where it matters, and solving the right problems as products grow.',
    skillsLabel: 'Tech Stack',
    skills: techSkills,
  },
  rightCard: {
    title: 'The Photographer',
    description:
      'Capturing moments that tell stories. From sweeping landscapes to intimate street scenes, I seek the extraordinary in the ordinary and the timeless in the fleeting.',
    skillsLabel: 'Specialties',
    skills: photoSkills,
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
