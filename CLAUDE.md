# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paria Creative Vision is a modern photography portfolio built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. The application showcases photography work through a responsive gallery with category/subcategory filtering and a lightbox viewer.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build            # Build for production with Turbopack
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint

# Database
npm run supabase:types   # Generate TypeScript types from Supabase schema
```

## Architecture

### Data Flow & Supabase Integration

The application uses **server-side data fetching** with Supabase PostgreSQL as the backend:

1. **Server Components**: All data fetching happens in Server Components (pages) via `/src/lib/api/photos.ts`
2. **Client vs Server Supabase**:
   - `/src/lib/supabase/server.ts` - For Server Components (RSC), uses cookies for auth
   - `/src/lib/supabase/client.ts` - For Client Components (browser), uses localStorage
3. **Type Safety**: Database schema is exported as TypeScript types in `/src/types/database.types.ts`
   - Regenerate after schema changes: `npm run supabase:types`
   - Types are strongly typed from Supabase and used throughout the app

### Database Schema

Key tables:
- `photos` - Photo records with metadata (title, description, dimensions, location, tags)
- `categories` - Top-level categories (e.g., "Nature", "Urban")
- `subcategories` - Nested subcategories within categories
- Relationships: `photos.category_id → categories.id`, `photos.subcategory_id → subcategories.id`

Photos are stored in Supabase Storage, referenced via `storage_path` field.

### Routing & Pages

Uses Next.js App Router with four route groups, each with its own layout and auth model:

- `(portfolio)` route group — public photography portfolio:
  - `/` — Home page with hero and featured photos
  - `/portfolio/[[...slug]]` — Gallery; slug params drive filtering:
    - `/portfolio` — all photos
    - `/portfolio/[categorySlug]` — filter by category
    - `/portfolio/[categorySlug]/[subcategorySlug]` — filter by subcategory
  - `/about` — About page
  - `/articles` — Articles (Medium RSS, ISR revalidate 3600s)
  - `/work` — Work / case studies listing
  - `/work/[slug]` — Individual case study

- `(admin)` route group — private photo CMS at `/admin/*`:
  - Layout: `AdminAuthGate` (Server Component, calls `getAdminSessionOrRedirect()`) + `AdminSidebar`
  - `/admin` — Dashboard / redirect
  - `/admin/upload` — Photo upload (Sharp + Supabase Storage + DB insert + rollback)
  - `/admin/photos` — Photo grid management
  - `/admin/photos/[id]/edit` — Edit photo metadata

- `(talent-atlas)` route group — authenticated hiring dashboard at `/talent-atlas/*`:
  - Outer layout: bare shell
  - Inner `(app)` layout: `QueryProvider` + `RealtimeSync` (WS → TanStack cache) + `TalentAtlasHeader` + `SidebarWithRoles` + `AuthGate`
  - `/talent-atlas/dashboard` — KPI overview
  - `/talent-atlas/candidates` — Kanban board (5 stages, drag-and-drop)
  - `/talent-atlas/campaigns` — Campaign list
  - `/talent-atlas/companies` — Partner companies
  - `/talent-atlas/settings` — Settings

- `(verdikt)` route group — early-stage SaaS prototype at `/verdikt/*`:
  - `/verdikt/dashboard` — Dashboard (prototype)

Route constants are centralised in `/src/lib/routes/routes.ts`.

### Component Architecture

**Barrel Exports**: All components use index files for clean imports:
```typescript
// Import from directory (barrel export)
import { GalleryGrid, GalleryFilters } from '@/components/Gallery';
```

**Server vs Client Components**:
- Most components are Server Components by default
- Client Components (with `"use client"`) are used for:
  - `GalleryFilters` - Interactive filter buttons with URL state
  - `Lightbox` - Modal viewer with keyboard navigation
  - `Header` - Mobile menu toggle

**Key Components**:
- `GalleryGrid` - Masonry layout grid (uses CSS columns)
- `GalleryItem` - Individual photo card, opens lightbox on click
- `GalleryFilters` - Category/subcategory filter buttons (client-side slug navigation)
- `Lightbox` - Full-screen photo viewer with prev/next navigation
- `FeaturedGallery` / `FeaturedGallerySection` - Featured photos on homepage
- `WorkCard` / `WorkGrid` - Work case-study listing
- `workItemPage/` - Work detail sections: `WorkItemPageHero`, `WorkItemSidebar`, `WorkDeepDiveSection`, `KeyDecisionsSection`, `SitePreviewSection`
- `Header/` split into `DesktopNav`, `MobileNav`, `MobileNavOverlay`

### Image Handling

**Supabase Storage Integration**:
- Images stored in Supabase Storage buckets
- Photos reference `storage_path` in database
- Next.js Image component configured for Supabase CDN in `next.config.ts`
- Image URLs constructed as: `${SUPABASE_URL}/storage/v1/object/public/${storage_path}`

**Next.js Image Optimization**:
- Remote patterns configured for Supabase hostname
- Responsive images with automatic format/quality optimization
- Width/height from database for proper aspect ratios

### Styling

**Tailwind CSS v4**:
- Using new v4 syntax with `@tailwind` directive
- Custom fonts: Syne (headings), Inter (body)
- Color system: `background`, `foreground`, `accent` CSS variables
- Custom animations defined in Tailwind config

**Path Aliases**:
- `@/*` maps to `src/*` (configured in `tsconfig.json`)

## Environment Variables

Required environment variables (see `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=              # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # Supabase public/anon key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=  # Server-side key
```

**Important**: The server-side Supabase client expects `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (not `SUPABASE_SERVICE_ROLE_KEY`) per current implementation in `/src/lib/supabase/server.ts:6`.

## Working with the API Layer

### Photos API (`/src/lib/api/photos/photos.ts`)

```typescript
// Get all published photos
const photos = await getAllPhotos();

// Get featured photos (homepage)
const featured = await getFeaturedPhotos(limit);

// Filter by category slug
const photos = await getPhotosByCategory(categorySlug);

// Filter by subcategory slug
const photos = await getPhotosBySubcategory(subcategorySlug);

// Get all categories with nested subcategories
const categories = await getAllCategories();

// Lightweight version for generateStaticParams (uses static client)
const categories = await getAllCategoriesStatic();
```

**Query Patterns**:
- All queries filter by `published = true`
- Photos ordered by `display_order` (ascending)
- Photos join subcategory: `select('*, subcategory:subcategories(*)')`
- Category filter uses inner join on `subcategories.category_id`
- Categories ordered by `display_order`; subcategories sorted by `display_order` via `referencedTable`

### Work Projects API (`/src/lib/api/workProjects/workProjects.ts`)

```typescript
// Listing page
const projects = await getAllWorkProjects();

// Static params generation
const slugs = await getAllWorkProjectSlugs();

// Detail page (includes decisions and articles relations)
const project = await getWorkProjectBySlug(slug);
```

### Supabase Clients

Three client variants:
- `/src/lib/supabase/server.ts` — Server Components, uses cookies for auth context
- `/src/lib/supabase/client.ts` — Client Components (browser), uses localStorage
- `/src/lib/supabase/static.ts` — `getSupabaseStatic()` singleton for `generateStaticParams` (no cookies context)

### Shared Utilities

- `logPostgrestError(context, error)` in `/src/lib/api/apiUtils/apiUtils.ts` — standardised Supabase error logging used by all API functions

## Type Definitions

**Photo Types** (`/src/types/photo.types.ts`):
- `Photo` - Photo record with optional `category` and `subcategory` relations
- `Category` - Category with optional `subcategories` array
- `Subcategory` - Subcategory record
- `GalleryFilters` - Filter state interface

**Work Types** (`/src/types/work.types.ts`):
- `WorkProjectRow`, `WorkDecisionRow`, `WorkArticleRow` - derived from DB types
- `WorkProject` - `WorkProjectRow` with optional `decisions` and `articles` arrays

**UI Types** (`/src/types/ui.types.ts`):
- Shared UI-level types (variants, sizes, etc.)

**Database Types** (`/src/types/database.types.ts`):
- Auto-generated from Supabase schema
- Used for type-safe queries: `supabase.from("photos").select()`
- Regenerate after schema changes

## Common Patterns

### Fetching Data in Server Components

```typescript
import { getAllPhotos } from '@/lib/api/photos';

export default async function Page() {
  const photos = await getAllPhotos();
  return <GalleryGrid photos={photos} />;
}
```

### Client Component with State

```typescript
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [state, setState] = useState();
  // ...
}
```

### Dynamic Routes with Slug Params (portfolio filtering)

```typescript
interface PortfolioPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PortfolioPageProps) {
  const slugArray = (await params)?.slug ?? [];
  const categorySlug = slugArray[0];
  const subcategorySlug = slugArray[1];
  // ...
}
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                          # Root shell (fonts only)
│   ├── globals.css                         # @import "tailwindcss" + token imports
│   ├── (portfolio)/                        # Public photography portfolio
│   │   ├── layout.tsx                      # Header + Footer
│   │   ├── page.tsx                        # / — home, featured photos
│   │   ├── about/page.tsx
│   │   ├── articles/page.tsx               # Medium RSS, ISR revalidate 3600s
│   │   ├── portfolio/[[...slug]]/page.tsx  # /portfolio/[cat]/[sub] — catch-all
│   │   └── work/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (admin)/admin/                      # Private photo CMS
│   │   ├── layout.tsx                      # AdminAuthGate + AdminSidebar
│   │   ├── page.tsx                        # /admin
│   │   ├── upload/page.tsx                 # /admin/upload — Sharp + Storage + DB
│   │   ├── photos/page.tsx                 # /admin/photos — photo grid
│   │   └── photos/[id]/edit/page.tsx       # /admin/photos/[id]/edit
│   ├── (talent-atlas)/talent-atlas/        # Hiring dashboard
│   │   ├── layout.tsx                      # Outer shell
│   │   ├── page.tsx                        # Entry redirect
│   │   └── (app)/                          # Inner group
│   │       ├── layout.tsx                  # QueryProvider + RealtimeSync + Header + Sidebar + AuthGate
│   │       ├── dashboard/page.tsx
│   │       ├── candidates/page.tsx         # Kanban board
│   │       ├── campaigns/page.tsx
│   │       ├── companies/page.tsx
│   │       └── settings/page.tsx
│   ├── (verdikt)/verdikt/                  # Early prototype
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx
│   └── api/
│       ├── admin/photos/route.ts           # POST (upload) + GET
│       ├── admin/photos/[id]/route.ts      # PATCH + DELETE + revalidatePath
│       ├── talent-atlas/candidates/route.ts
│       ├── talent-atlas/candidates/[id]/route.ts  # PATCH stage + WS broadcast
│       ├── talent-atlas/campaigns/route.ts
│       └── talent-atlas/companies/route.ts
├── components/
│   ├── branding/Logo/
│   ├── features/
│   │   ├── admin/                          # AdminSidebar, AdminTopBar, UploadForm, PhotoGrid,
│   │   │                                   #   PhotoCard, PhotoManager, EditPhotoForm, PhotoMetadataCard
│   │   ├── talentAtlas/                    # TalentAtlasHeader, TalentAtlasSidebar, SidebarUserFooter,
│   │   │                                   #   DashboardOverview, KanbanColumn, CandidateCard,
│   │   │                                   #   AddCandidateForm, FeedbackBadge, RealtimeSync
│   │   ├── home/
│   │   ├── portfolio/                      # GalleryGrid, GalleryItem, GalleryFilters, Lightbox
│   │   ├── articles/
│   │   ├── work/
│   │   │   └── workItemPage/
│   │   └── about/
│   ├── layout/                             # Header, Footer, Container, Body, Flex, Grid, Stack
│   ├── providers/                          # QueryProvider, WebVitals
│   └── ui/                                 # Button, Typography, CtaLink, SectionHeader, TextBlock,
│                                           #   Divider, Loading, BackNavigationLink, icons
├── data/
│   ├── staticData.ts
│   ├── aboutData.ts
│   ├── workData.ts
│   └── talentAtlasMockData.ts              # MOCK_CAMPAIGNS, MOCK_CANDIDATES, STAGE_LABELS, STAGE_COLORS
├── hooks/
│   ├── talent-atlas/
│   │   ├── useCandidates.ts               # useQuery + useUpdateCandidateStage (optimistic)
│   │   ├── useCampaigns.ts
│   │   ├── useCompanies.ts
│   │   └── useRealtimeSync.ts             # Subscribes to wsStream, calls setQueryData
│   ├── useRole.ts
│   ├── useWebSocket.ts
│   └── useHeaderScroll.ts
├── lib/
│   ├── api/
│   │   ├── admin/photos.ts                # Supabase admin photo queries
│   │   ├── photos/photos.ts               # Portfolio photo queries
│   │   ├── workProjects/workProjects.ts
│   │   ├── mediumArticles/
│   │   └── apiUtils/apiUtils.ts
│   ├── auth0/
│   │   ├── withAuth.ts                    # HOF — reads session, checks roles, wraps handler
│   │   ├── session.ts                     # getSessionOrRedirect, getAdminSessionOrRedirect
│   │   ├── auth0.ts                       # Auth0 SDK instance
│   │   ├── roles.ts                       # ROLES enum (ADMIN, COORDINATOR, COMPANY, CANDIDATE)
│   │   └── __tests__/withAuth.test.ts
│   ├── realtime/
│   │   ├── wsStream.ts                    # RxJS: Subject → filter(dedup) → bufferTime(200) → coalesce
│   │   └── __tests__/wsStream.test.ts
│   ├── schemas/talentAtlas.ts             # Zod schemas — CreateCampaign, CreateCandidate, UpdateStage
│   ├── store/talentAtlasStore.ts          # In-memory singleton arrays for TalentAtlas
│   ├── query/
│   │   ├── queryClient.ts                 # TanStack Query client config
│   │   └── queryKeys.ts                   # Centralised query key factory
│   ├── routes/routes.ts
│   ├── supabase/
│   │   ├── server.ts                      # Server Components client (cookies)
│   │   ├── client.ts                      # Browser client
│   │   └── static.ts                      # Singleton for generateStaticParams
│   └── utils/utils.tsx
├── styles/                                # tokens.css, base.css, animations
└── types/
    ├── photo.types.ts
    ├── work.types.ts
    ├── ui.types.ts
    ├── ws.types.ts                        # WsEvent discriminated union
    └── database.types.ts                  # Auto-generated from Supabase schema
```

## Commit Message Conventions

Follow the project's established patterns:
- Use imperative mood: "add feature" not "added feature"
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Keep summary under 50 characters
- Do NOT include Claude Code attribution footers