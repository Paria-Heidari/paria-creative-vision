# Paria Creative Vision

A full-stack portfolio merging software engineering and photography into one unified product — built with performance, accessibility, and a clear design vision.

Live site: [paria.eu](https://paria.eu)

## Tech Stack

- **Next.js 16** — App Router, Server Components, static generation
- **TypeScript** — Strict mode, types generated from Supabase schema
- **Tailwind CSS v4** — Custom design system with design tokens
- **Supabase** — PostgreSQL database, storage, and row-level security
- **Framer Motion** — Scroll-triggered animations
- **Vercel** — CI/CD and deployment

## Features

- Photography portfolio with masonry gallery, category/subcategory filtering, and lightbox viewer
- Engineering work section with case studies and key decision documentation
- Articles section pulling from Medium via RSS
- Custom design system — tokens, typography scale, and components built from scratch
- Fully accessible — semantic HTML, keyboard navigation, ARIA labels, focus management
- CI/CD pipeline — lint, type check, and build on every push to main

## Getting Started

### Prerequisites

- Node.js 22+
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run supabase:types  # Regenerate TypeScript types from Supabase schema
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key
MEDIUM_USERNAME=your_medium_username
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home
│   ├── portfolio/        # Photography gallery
│   ├── work/             # Engineering work & case studies
│   ├── articles/         # Medium articles
│   └── about/            # About page
├── components/
│   ├── features/         # Page-specific components
│   ├── layout/           # Container, Grid, Stack, Header, Footer
│   └── ui/               # Shared UI components and design system
├── data/                 # Static content and project data
├── lib/                  # Supabase clients, API layer, utilities
├── styles/               # Design tokens and global CSS
└── types/                # TypeScript definitions
```

## TypeScript Type Generation

This project uses generated TypeScript types to ensure type safety with Supabase. The types are automatically generated from your database schema and provide full autocomplete and type checking for all database queries.

### Generate Types

Use the provided npm script:

```bash
npm run supabase:types
```

Alternatively, run the command directly:

```bash
npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

**Note:** Find your project ID in Supabase Dashboard → Project Settings → General.

### When to Regenerate Types

Regenerate types after any database schema changes:

- Adding or removing tables
- Modifying column definitions
- Updating relationships or constraints

## CI/CD

Every push to `main` runs lint, type check, and a full build before deploying to Vercel. Pull requests run the same checks without deploying.

## License

© 2026 Paria Creative Vision. All rights reserved.
