# Technical architecture

Tech stack choices and frontend/application architecture for Paria Creative Vision.
For product context (problem, goals, user flow), see
[project_description.md](./project_description.md).

---

## Tech stack & why

| Choice | What | Why |
|--------|------|-----|
| **Framework** | Next.js 16 (App Router) | SSR for SEO and fast first load; Server Components for data; single codebase for portfolio + future API. |
| **Language** | TypeScript | Type safety, refactor confidence, and alignment with Supabase-generated types. |
| **Styling** | Tailwind CSS v4 | Fast UI iteration, design tokens, small production CSS. |
| **Backend / data** | Supabase (PostgreSQL, Storage) | Managed Postgres + file storage, TypeScript type generation, no server to run. |
| **Animations** | Framer Motion | Declarative animations for gallery and lightbox. |
| **Icons** | Lucide React | Lightweight, consistent set. |
| **Build** | Turbopack | Faster dev and build. |

**Summary:** Next.js + Supabase keeps the stack modern and scalable with minimal ops; TypeScript + generated DB types keep the codebase maintainable.

---
## Data Model & Database Design
**Supabase**
  - PostgreSQL database
  - File storage
  - Authentication (optional)

**Database Design**
Entity–Relationship Diagram (ERD) of the portfolio database built on Supabase PostgreSQL.

![DatabaseDesign](./diagrams/database_design.png)

---
## Frontend Architecture

**Separation of Concerns**
- Components - only handle UI: `src/components/`  
- Data/API: `src/lib/api/`  
- Types: `src/types/`  
- Static content: `src/data/`

**Scalability / Reusability**
- Keep components small and focused
- Use barrel files (`index.ts`) in component folders for cleaner imports
- Prefer feature-based folders plus a `shared/` folder for primitives reused across features (buttons, text blocks, icons).
- Next.js App Router structure with nested routes for portfolio filtering

### How the app works (step by step)

1. The user opens a route such as `/`, `/portfolio`, `/portfolio/[category]`, `/work/[slug]`, or `/articles`.
2. Next.js server components fetch data using `src/lib/api/*` functions.
3. Supabase returns database rows and image storage paths.
4. Server-rendered HTML is sent to the browser for fast first paint and SEO.
5. Client components hydrate for interactions (filter buttons, lightbox, mobile menu).
6. Portfolio filter clicks push new slug-based URLs; Next.js re-renders the server component with the new slug params.

### Top-level folder structure

```text
public/                        # Static assets served directly
docs/                          # Project documentation
src/
├── app/                          # Next.js App Router pages & layouts
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles entry point
│   ├── (portfolio)/              # Route group — main portfolio site
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home page (hero + featured gallery)
│   │   ├── about/page.tsx
│   │   ├── articles/page.tsx
│   │   ├── portfolio/[[...slug]]/page.tsx  # Gallery; slug=[category, subcategory]
│   │   └── work/
│   │       ├── page.tsx          # Work / case studies listing
│   │       └── [slug]/page.tsx   # Individual case study
│   └── (verdikt)/                # Route group — separate app prototype
│       └── verdikt/
│           ├── layout.tsx
│           └── dashboard/page.tsx
│
├── components/
│   ├── branding/Logo/
│   ├── features/                 # Page-specific feature components
│   │   ├── home/                 # Hero, FeaturedGallery, LatestArticles, SelectedWork
│   │   ├── portfolio/            # GalleryGrid, GalleryItem, GalleryFilters, Lightbox, PortfolioPageHero
│   │   ├── articles/             # ArticleCard, ArticleGrid, ArticleFilter, ArticleList
│   │   ├── work/                 # WorkCard, WorkGrid, WorkPageHero
│   │   │   └── workItemPage/     # WorkItemPageHero, WorkItemSidebar, WorkDeepDiveSection,
│   │   │                         #   KeyDecisionsSection, SitePreviewSection
│   │   └── about/                # ProfileCard, DualCardSection, AboutPageHero
│   ├── layout/                   # Structural layout components
│   │   ├── Header/               # Header, DesktopNav, MobileNav, MobileNavOverlay
│   │   ├── Footer/               # Footer, SocialIcons
│   │   ├── Container/            # Max-width wrapper
│   │   ├── Body/                 # Page body wrapper
│   │   ├── Flex/                 # Flex layout primitive
│   │   ├── Grid/                 # Grid layout primitive + GridItem
│   │   └── Stack/                # Stack layout primitive
│   └── ui/                       # Shared design-system components
│       ├── Button/               # Button with variants
│       ├── Typography/           # Type scale component
│       ├── CtaLink/ & CtaSection/
│       ├── SectionHeader/
│       ├── TextBlock/
│       ├── Divider/ & DecorativeLine/
│       ├── Loading/
│       ├── BackNavigationLink/
│       └── icons/                # SVG icon components
│
├── data/                         # Static content
│   ├── staticData.ts
│   ├── aboutData.ts
│   └── workData.ts
│
├── hooks/
│   └── useHeaderScroll.ts        # Scroll-aware header hide/show + background state
│
├── lib/                          # API & utilities
│   ├── api/
│   │   ├── photos/photos.ts      # Supabase queries for photos/categories
│   │   ├── workProjects/         # Supabase queries for work_projects/decisions/articles
│   │   ├── mediumArticles/       # Medium RSS integration
│   │   └── apiUtils/apiUtils.ts  # Shared Postgrest error logging
│   ├── routes/routes.ts          # Centralised route path constants
│   ├── supabase/
│   │   ├── server.ts             # Server-component Supabase client (cookies)
│   │   ├── client.ts             # Browser Supabase client
│   │   └── static.ts             # Singleton client for generateStaticParams
│   └── utils/utils.tsx
│
├── styles/                       # Global CSS (tokens, base, animations)
├── types/                        # TypeScript types
│   ├── database.types.ts         # Auto-generated Supabase types
│   ├── photo.types.ts            # Photo domain types
│   ├── work.types.ts             # Work project domain types
│   └── ui.types.ts               # Shared UI types (variants, sizes)
└── data/                         # Static content and project data
```

---
## System architecture

High-level view of how the browser, Next.js app, and external services work together.

![System Architecture](./diagrams/system_architecture.png)

---
## Build Tools

- **Turbopack** - Fast incremental builds used by Next.js for dev and build workflows.
---
## Deployment

- **Vercel** - Hosting and deployment target for this app.
