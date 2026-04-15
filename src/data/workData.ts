import { WorkCardProps } from '@/components/features/work/WorkCard';
import { routes as ROUTES } from '@/lib/routes/routes';

export const workProjects = [
  {
    slug: 'portfolio-website',
    title: 'Paria Creative Vision',
    subtitle: 'Full-stack portfolio · React · TypeScript · Next.js · Supabase',
    year: '2025–2026',
    role: 'Solo — Product Design, Architecture, Engineering',
    coverImage: '/images/work/website-cover.png',
    previewImage: '/images/work/preview-cover.jpg',
    description:
      'A full-stack portfolio merging software engineering and photography into one unified product — built with performance, accessibility, and a clear design vision.',
    tags: [
      'Next.js 15',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
      'PostgreSQL',
    ],
    status: 'live' as const,
    links: {
      live: 'https://paria.eu',
      github: '',
    },
    workDeepDive: {
      problem:
        'I wanted to build something that felt like me: one product where engineering depth and visual craft live together, showing end-to-end ownership instead of two separate identities.',
      decisions: [
        {
          title: 'Next.js App Router over Pages Router',
          description:
            'Server Components allow data fetching without client-side waterfalls. Every page loads with complete data — no loading spinners, no layout shift. This also improved Lighthouse scores significantly.',
        },
        {
          title: 'Supabase over a headless CMS',
          description:
            'For the backend, I used Supabase, which provides a managed PostgreSQL database, storage, and an API layer. This let me focus on product features instead of infrastructure while still getting a typed, scalable backend out of the box. A key advantage was type safety: by generating TypeScript types directly from the database schema, queries become type-safe, refactoring becomes safer and more predictable, and frontend and backend stay in sync.',
        },
        {
          title: 'Custom design system over a component library',
          description:
            'Using shadcn or MUI would hide the design thinking. Building tokens, typography scale, and components from scratch shows I can own the full visual layer.',
        },
        {
          title: 'CI/CD pipeline from day one',
          description:
            'Every push to main runs lint, type check, and a full build before deploying to Vercel. Catching regressions early — even on a solo project — keeps the codebase production-ready at all times and mirrors the discipline expected in a team environment.',
        },
        {
          title: 'TypeScript strict mode from the start',
          description:
            'No any, no shortcuts. Types are generated directly from the Supabase schema, so the database and frontend stay in sync automatically. Refactoring is safe, onboarding is faster, and bugs surface at compile time instead of in production.',
        },
        {
          title: 'Accessibility as a constraint — for everyone from the start',
          description:
            'Semantic HTML, keyboard navigation, ARIA labels, and focus management in the lightbox were built in from the beginning — not added later. In markets like Norway where WCAG compliance is taken seriously, this is a baseline, not a bonus.',
        },
      ],
      outcome:
        'A live production site that serves as both a photography portfolio and an engineering case study. The architecture decisions became interview talking points that communicate product thinking, not just coding ability.',
      articles: [
        {
          title:
            'Next.js Portfolio Architecture: Modular, Scalable and Maintainable',
          href: 'https://paria-heidari.medium.com/next-js-portfolio-architecture-modular-scalable-and-maintainable-7a92437bef8a',
        },
        {
          title:
            'From Architecture to Code: Implementing the Interactive Features',
          href: 'https://paria-heidari.medium.com/from-architecture-to-code-implementing-the-interactive-features-8f17b0643219',
        },
      ],
    },
  },
  {
    slug: 'verdikt',
    title: 'Verdikt',
    subtitle: 'Business decision management · SaaS',
    year: '2025',
    role: 'Solo — Product Design, Architecture, Engineering',
    coverImage: '/images/work/verdikt-cover.png',
    description:
      'A role-based decision management system for cross-department approvals — HR, Finance, IT, and Operations. Features a workflow state machine, append-only audit trail, and KPI analytics dashboard.',
    tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Recharts', 'Tailwind CSS'],
    status: 'coming-soon' as const,
    links: {
      live: '',
      github: '',
    },
    workDeepDive: {
      problem:
        'Organizations make dozens of decisions weekly — budget approvals, hiring requests, vendor contracts. Most are tracked in email chains with no audit trail, no analytics, and no accountability.',
      decisions: [
        {
          title: 'Workflow modeled as a state machine',
          body: 'Invalid status transitions are impossible at the code level, not just the UI. This mirrors how real compliance systems work and eliminates an entire class of data integrity bugs.',
        },
        {
          title: 'Rejection requires a reason — enforced at API level',
          body: 'A rejected decision without explanation is useless to the requester. Enforcing this server-side (not just form validation) means it cannot be bypassed by any client.',
        },
        {
          title: 'decided_at separated from updated_at',
          body: 'Time-to-decision is a business metric. Mixing it with updated_at would pollute the signal every time a comment is added or a field is edited. Separate fields, separate concerns.',
        },
      ],
      outcome:
        'Currently in development. The architecture and data model are designed — building the UI next.',
      articles: [],
    },
  },
] as const;

type WorkProject = (typeof workProjects)[number];

const SelectedWorkSlugs = ['portfolio-website', 'dashboard'] as const;

const selectedWorkProjects = SelectedWorkSlugs.map((slug) =>
  workProjects.find((project) => project.slug === slug),
).filter(Boolean) as WorkProject[];

const selectedWorkCards: WorkCardProps[] = selectedWorkProjects.map(
  (project, index) => ({
    number: `0${index + 1}`,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    tags: project.tags,
    status: project.status,
    href: `${ROUTES.work}/${project.slug}`,
  }),
);

export const selectedWorkSectionData = {
  info: {
    title: 'Selected Work',
    subTitle: 'A selection of my work',
    ctaLink: {
      href: ROUTES.work,
      label: 'View All Work',
    },
  },
  cards: selectedWorkCards,
};

export const workPageHeroData = {
  title: 'Work',
  subtitle: 'Engineering work & product thinking',
  description:
    "A selection of things I've built — from full-stack products to tools at the intersection of engineering and creativity.",
};
