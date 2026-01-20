# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paria Creative Vision is a modern photography portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. The application showcases photography work through a responsive gallery with category/subcategory filtering and a lightbox viewer.

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

Uses Next.js App Router with Server Components:

- `/` - Home page with hero and featured photos
- `/pages/portfolio/[[...slug]]` - Main gallery with optional category/subcategory filters
  - Query params: `?category=slug` or `?subcategory=slug`
  - Server-side filtering via Supabase queries
- `/pages/about` - About page
- `/pages/articles` - Articles page

**Important**: Portfolio uses catch-all route `[[...slug]]` but currently filters via query params, not slug params.

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
- `GalleryFilters` - Category/subcategory filter buttons (client-side navigation)
- `Lightbox` - Full-screen photo viewer with prev/next navigation
- `FeaturedGallery` - Featured photos carousel on homepage

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

## Working with Photos API

All photo fetching functions are in `/src/lib/api/photos.ts`:

```typescript
// Get all published photos
const photos = await getAllPhotos();

// Get featured photos (homepage)
const featured = await getFeaturedPhotos(limit);

// Filter by category
const photos = await getPhotosByCategory(categorySlug);

// Filter by subcategory
const photos = await getPhotosBySubcategory(subcategorySlug);

// Get all categories with nested subcategories
const categories = await getAllCategories();
```

**Query Patterns**:
- All queries filter by `published = true`
- Photos ordered by `display_order` (ascending)
- Categories/subcategories joined via `select("*, category:categories(*)")`
- Subcategories within categories are sorted by `display_order`

## Type Definitions

**Photo Types** (`/src/types/photo.types.ts`):
- `Photo` - Photo record with optional `category` and `subcategory` relations
- `Category` - Category with optional `subcategories` array
- `Subcategory` - Subcategory record
- `GalleryFilters` - Filter state interface

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

### Dynamic Routes with Search Params

```typescript
interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;
  // ...
}
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   └── pages/
│       ├── portfolio/[[...slug]]/page.tsx  # Gallery with filters
│       ├── about/page.tsx
│       └── articles/page.tsx
├── components/            # React components (barrel exports)
│   ├── Gallery/          # Gallery components
│   ├── Header/
│   ├── Footer/
│   └── ...
├── lib/
│   ├── api/              # API layer (Supabase queries)
│   └── supabase/         # Supabase client setup
└── types/                # TypeScript definitions
    ├── photo.types.ts    # Business logic types
    └── database.types.ts # Generated Supabase types
```

## Commit Message Conventions

Follow the project's established patterns:
- Use imperative mood: "add feature" not "added feature"
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Keep summary under 50 characters
- Do NOT include Claude Code attribution footers