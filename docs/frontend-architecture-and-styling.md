## Frontend Styling Guide

In this project, I use **Tailwind CSS v4** + **PostCSS** with Next.js (Turbopack).

The goal is simple:
- keep styles scalable
- keep naming clean
- avoid random one-off values in components
The goal is simple:
- keep styles scalable
- keep naming clean
- avoid random one-off values in components
1. Styles are written in `src/app/globals.css`.
2. Tailwind is loaded with `@import "tailwindcss";`.
3. Running `npm run dev` or `npm run build` starts the Next.js pipeline.
4. Next.js reads `postcss.config.mjs` and runs PostCSS plugins.
5. Tailwind directives are compiled into final CSS.
6. The browser receives compiled CSS.

#### What to install for this setup

`npm install tailwindcss @tailwindcss/postcss postcss`

For this Next.js + Turbopack project, you usually **do not need** `@tailwindcss/cli` or a separate Tailwind watch command.

#### Why PostCSS is needed here

PostCSS is the CSS processing step. Next.js uses it to run Tailwind's PostCSS plugin and any additional CSS transforms automatically during dev/build.

---
### Style architecture

In this project, I decided to split styles into multiple files and import them in index.css and import index.css in single global entry/place src/app/globals.css.

- src/app/globals.css
@import "tailwindcss";
imports of split global files (index.css)

src/styles/tokens.css
:root variables + @theme mappings and use Tailwind classes

src/styles/base.css
minimal global defaults only

src/styles/tokens/index.css (imports all)

#### Token Structure
1- Keep tokens semantic - use name by role.
3 layers mentally
- Primitive / global: raw palette values ( --gold-500, etc.)
- Semantic: Ui meaning (--color-bg, --color-text, etc.)
- Component (optional): when needed (--button-primary-bg)

2- Split tokens by domain in src/styles/*,  them in globals.css.

3- Theme strategy (light/dark/brand)
Inside tokens:
:root { ...light defaults... }
@media (prefers-color-scheme: dark) {...OS preference automatically...} Or
.dark { ...overrides... }
optional [data-theme="brandB"] { ... }

4- Tailwind mapping layer
Keep a single @theme inline block that maps the css variables to Tailwind tokens.
--color-background: var(--color-bg);
--color-foreground: var(--color-text);
etc.
Then component use Tailwind classes like bg-background text-foreground


#### practical Rule
- If style is app-wide -> put in src/styles/*
- If style is feature/component-specific ->prefer Tailwind classes first
- If Tailwind becomes unreadable -> 
    use *.module.css near that component Or
    A small helper function (cn) 

#### Dark mode 
System mode strategy- Use OS preference automatically via @media (prefers-color-scheme: dark).
- User sets dark mode in OS
- Site follows automatically
- No button needed

### Custom Font
Upload .woff2 file in public/fonts/...
Use next/font/local (for the .woff2) in src/app/layout.tsx then map it to tokens.

1- Load font in layout.tsx
- import local font from public/fonts/...
- assign CSS variable (e.g. "--font-grotesk")
const Grotesk = localFont({
  src: "../../public/fonts/founders-grotesk-regular.woff2",
  variable: "--font-grotesk",
  display: "swap",
});

2- Add variable class to <body>
<html
      lang="en"
      className={`${Grotesk.className} font-grotesk`}
    >
3- In tokens.css, map token to that variable
--pri-font-grotesk: var(--font-grotesk);
then semantic
--sem-font-family-grotesk: var(--pri-font-grotesk);

4- Expose to Tailwind if needed
in @theme inline:
    --font-family-grotesk: var(--sem-font-family-grotesk);
then use 
font-grotesk in classes, Or 
font-family: var(--sem-font-family-brand) in CSS