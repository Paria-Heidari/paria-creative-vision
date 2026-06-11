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

Uses Next.js App Router with route groups and Server Components:

- `(portfolio)` route group — main portfolio site:
  - `/` - Home page with hero and featured photos
  - `/portfolio/[[...slug]]` - Gallery; slug params drive filtering:
    - `/portfolio` — all photos
    - `/portfolio/[categorySlug]` — filter by category
    - `/portfolio/[categorySlug]/[subcategorySlug]` — filter by subcategory
  - `/about` - About page
  - `/articles` - Articles (Medium RSS feed)
  - `/work` - Work / case studies listing
  - `/work/[slug]` - Individual case study
- `(verdikt)` route group — separate early-stage app section at `/verdikt/*`:
  - `/verdikt/dashboard` - Dashboard (prototype)

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
│   ├── layout.tsx                          # Root layout
│   ├── globals.css
│   ├── (portfolio)/                        # Main portfolio site (route group)
│   │   ├── layout.tsx
│   │   ├── page.tsx                        # Home page
│   │   ├── about/page.tsx
│   │   ├── articles/page.tsx
│   │   ├── portfolio/[[...slug]]/page.tsx  # Gallery; slug = [category, subcategory]
│   │   └── work/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   └── (verdikt)/                          # Separate app section (early prototype)
│       └── verdikt/
│           ├── layout.tsx
│           └── dashboard/page.tsx
├── components/
│   ├── branding/Logo/
│   ├── features/                           # Page-specific feature components
│   │   ├── home/
│   │   ├── portfolio/
│   │   ├── articles/
│   │   ├── work/
│   │   │   └── workItemPage/               # Work detail page sections
│   │   └── about/
│   ├── layout/                             # Structural layout components
│   │   ├── Header/  (DesktopNav, MobileNav, MobileNavOverlay)
│   │   ├── Footer/
│   │   ├── Container/
│   │   ├── Body/
│   │   ├── Flex/
│   │   ├── Grid/
│   │   └── Stack/
│   └── ui/                                 # Shared design-system primitives
│       ├── Button/
│       ├── Typography/
│       ├── CtaLink/ & CtaSection/
│       ├── SectionHeader/
│       ├── TextBlock/
│       ├── Divider/ & DecorativeLine/
│       ├── Loading/
│       ├── BackNavigationLink/
│       └── icons/
├── data/                                   # Static content
│   ├── staticData.ts
│   ├── aboutData.ts
│   └── workData.ts
├── hooks/
│   └── useHeaderScroll.ts
├── lib/
│   ├── api/
│   │   ├── photos/photos.ts                # Photo Supabase queries
│   │   ├── workProjects/workProjects.ts    # Work project Supabase queries
│   │   ├── mediumArticles/                 # Medium RSS integration
│   │   └── apiUtils/apiUtils.ts            # Shared error logging
│   ├── routes/routes.ts                    # Centralised route constants
│   ├── supabase/
│   │   ├── server.ts                       # Server Components client (cookies)
│   │   ├── client.ts                       # Browser client
│   │   └── static.ts                       # Singleton for generateStaticParams
│   └── utils/utils.tsx
└── types/
    ├── photo.types.ts
    ├── work.types.ts
    ├── ui.types.ts
    └── database.types.ts                   # Auto-generated from Supabase schema
```

## Commit Message Conventions

Follow the project's established patterns:
- Use imperative mood: "add feature" not "added feature"
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Keep summary under 50 characters
- Do NOT include Claude Code attribution footers