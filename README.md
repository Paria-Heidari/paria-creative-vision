# Paria Creative Vision

A modern photography portfolio built with Next.js and Supabase.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - PostgreSQL database and authentication
- **Vercel** - Deployment platform

## Features

- 📸 Responsive photo gallery with masonry layout
- 🗂️ Category and subcategory filtering
- ⚡ Server-side rendering for optimal performance
- 🎨 Clean, minimalist design
- 📱 Mobile-responsive

## Getting Started

### Prerequisites

- Node.js 18+
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

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
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

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # API and utilities
├── types/           # TypeScript definitions
└── data/            # Mock data
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or build manually:

```bash
npm run build
npm run start
```

## License

© 2026 Paria Creative Vision. All rights reserved.
