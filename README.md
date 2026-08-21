# Paria Creative Vision

A full-stack portfolio merging software engineering and photography into one unified product — built with performance, accessibility, and a clear design vision.

Live site: [paria.eu](https://paria.eu)

## Tech Stack

- **Next.js 16** — App Router, Server Components, PPR, static generation
- **TypeScript** — Strict mode, types generated from Supabase schema
- **Tailwind CSS v4** — Custom design system with three-layer design tokens
- **Supabase** — PostgreSQL database, Storage, row-level security
- **Auth0** — Authentication and role-based access control
- **TanStack Query v5** — Server state, optimistic updates, cache management
- **RxJS** — Real-time event pipeline (dedup, buffer, coalesce)
- **Framer Motion** — Scroll-triggered animations
- **Vercel** — CI/CD and deployment

## Features

- Photography portfolio with masonry gallery, category/subcategory filtering, and lightbox viewer
- Private admin CMS — photo upload pipeline (Sharp + Supabase Storage + DB), edit, delete, and on-demand cache invalidation
- TalentAtlas hiring dashboard — role-based kanban board, campaigns, live WebSocket updates via RxJS pipeline
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

Four route groups under one Next.js app — each with its own layout, auth model, and data layer:

- **`(portfolio)`** — public photography portfolio (`paria.eu/*`)
- **`(admin)`** — private photo CMS (`paria.eu/admin/*`), Auth0-gated
- **`(talent-atlas)`** — authenticated hiring dashboard (`paria.eu/talent-atlas/*`), role-based
- **`(verdikt)`** — early-stage B2B SaaS prototype (`paria.eu/verdikt/*`)

```
src/
├── app/
│   ├── layout.tsx                          # Root shell (fonts only)
│   ├── (portfolio)/                        # Public portfolio — Header + Footer layout
│   │   ├── page.tsx                        # /
│   │   ├── portfolio/[[...slug]]/page.tsx  # /portfolio + /portfolio/[cat]/[sub]
│   │   ├── work/[slug]/page.tsx            # /work — case studies
│   │   ├── articles/page.tsx               # /articles — Medium RSS
│   │   └── about/page.tsx                  # /about
│   ├── (admin)/admin/                      # Admin CMS — Auth0-gated sidebar layout
│   │   ├── layout.tsx                      # AdminAuthGate + AdminSidebar
│   │   ├── page.tsx                        # /admin
│   │   ├── upload/page.tsx                 # /admin/upload
│   │   ├── photos/page.tsx                 # /admin/photos
│   │   └── photos/[id]/edit/page.tsx       # /admin/photos/[id]/edit
│   ├── (talent-atlas)/talent-atlas/        # TalentAtlas — Auth0 + role-based
│   │   └── (app)/                          # Inner group: QueryProvider + RealtimeSync + AuthGate
│   │       ├── dashboard/page.tsx
│   │       ├── candidates/page.tsx         # Kanban board
│   │       ├── campaigns/page.tsx
│   │       ├── companies/page.tsx
│   │       └── settings/page.tsx
│   ├── (verdikt)/verdikt/                  # Early SaaS prototype
│   │   └── dashboard/page.tsx
│   └── api/
│       ├── admin/photos/route.ts           # POST + GET photos
│       ├── admin/photos/[id]/route.ts      # PATCH + DELETE photo
│       ├── talent-atlas/candidates/route.ts
│       ├── talent-atlas/candidates/[id]/route.ts
│       ├── talent-atlas/campaigns/route.ts
│       └── talent-atlas/companies/route.ts
├── components/
│   ├── features/         # admin/ · talentAtlas/ · portfolio/ · home/ · work/ · articles/ · about/
│   ├── layout/           # Container, Grid, Stack, Header, Footer
│   ├── providers/        # QueryProvider, WebVitals
│   └── ui/               # Shared design-system primitives
├── data/                 # Static content
├── hooks/
│   ├── talent-atlas/     # useCandidates, useCampaigns, useCompanies, useRealtimeSync
│   ├── useRole.ts
│   ├── useWebSocket.ts
│   └── useHeaderScroll.ts
├── lib/
│   ├── api/              # photos, workProjects, mediumArticles, admin/photos
│   ├── auth0/            # withAuth HOF, session helpers, roles, __tests__
│   ├── realtime/         # wsStream (RxJS pipeline), __tests__
│   ├── schemas/          # Zod schemas — talentAtlas
│   ├── store/            # talentAtlasStore (in-memory singleton)
│   ├── query/            # queryClient, queryKeys
│   ├── routes/           # Centralised route constants
│   └── supabase/         # server, client, static clients
└── types/                # photo.types, work.types, ui.types, database.types (generated)
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
