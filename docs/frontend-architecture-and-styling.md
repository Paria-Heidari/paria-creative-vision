## Styling

This project uses **Tailwind CSS v4** with **PostCSS** inside the Next.js build pipeline.

### Styling pipeline

1. Global styles start in `src/app/globals.css`.
2. Tailwind is loaded with `@import "tailwindcss";`.
3. `npm run dev` or `npm run build` triggers the Next.js pipeline.
4. Next.js reads `postcss.config.mjs` and runs PostCSS plugins.
5. Tailwind and custom CSS are compiled into final CSS output.
6. The browser receives optimized CSS.

#### Dependencies for this setup

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

For this Next.js + Turbopack setup, you usually **do not need** `@tailwindcss/cli` or a separate Tailwind watch command.

#### Why PostCSS is required

PostCSS is the transformation layer for CSS. Next.js uses it to run the Tailwind PostCSS plugin (and any future CSS transforms) automatically during development and production builds.

---

## Style architecture

I intentionally split global styling into focused files, then import them through one global entry point. This keeps the system maintainable while still giving me one place to control load order.

### File structure and responsibilities

- `src/app/globals.css`
  - Loads Tailwind (`@import "tailwindcss";`)
  - Imports `src/styles/index.css`
- `src/styles/index.css`
  - Central style aggregator for shared global style files
- `src/styles/tokens.css`
  - Design tokens (CSS variables)
  - Theme values and Tailwind token mapping
- `src/styles/base.css`
  - Minimal global defaults and reset-style rules
- `src/styles/animations.css`
  - Reusable animation variables and keyframes

### Token structure

I use semantic token naming so styles stay readable and easy to evolve.

#### 1) Primitive (raw values)

Raw palette or scale values, for example:
- `--gold-500`
- `--gray-900`

#### 2) Semantic (meaning-based)

Tokens by UI role, for example:
- `--color-bg`
- `--color-text`
- `--color-border`

#### 3) Component tokens (optional)

Used only when a shared component needs dedicated variables, for example:
- `--button-primary-bg`
- `--button-primary-text`

### Theme strategy (light / dark / brand)

Base values live in `:root`, and then layers override as needed:

- `:root { ... }` for default light theme
- `@media (prefers-color-scheme: dark) { ... }` for automatic OS dark mode
- Optional `.dark { ... }` if manual dark toggle is added later
- Optional `[data-theme="brandB"] { ... }` for brand-specific theme variants

### Tailwind mapping layer

Keep one mapping layer that links CSS variables to Tailwind tokens:

- `--color-background: var(--color-bg);`
- `--color-foreground: var(--color-text);`

Then components can use utility classes like `bg-background` and `text-foreground`.

### Practical rules I follow

- If a style is app-wide, put it in `src/styles/*`.
- If a style is feature/component-specific, prefer Tailwind classes first.
- If Tailwind classes become noisy or hard to scan:
  - use a nearby `*.module.css`, or
  - use a small utility helper like `cn()` to keep class composition clean.

### Dark mode decision

Current strategy is **system mode only**:
- user changes OS theme,
- site follows automatically via `prefers-color-scheme`,
- no theme toggle button needed right now.

This keeps the first version simple while leaving room to add manual theme switching later.

---

## Custom font setup

My approach is to store font files in `public/fonts`, load them with `next/font/local`, then map them into tokens so usage stays consistent everywhere.

### 1) Add font files

Place `.woff2` files in `public/fonts/...`.

### 2) Load font in `src/app/layout.tsx`

```ts
const Grotesk = localFont({
  src: "../../public/fonts/founders-grotesk-regular.woff2",
  variable: "--font-grotesk",
  display: "swap",
});
```

### 3) Apply font class on root element

Use the generated class/variable on `html` or `body` (depending on your layout convention), for example:

```tsx
<html lang="en" className={`${Grotesk.className} font-grotesk`}>
```

### 4) Map font into tokens

In `tokens.css`:
- `--pri-font-grotesk: var(--font-grotesk);`
- `--semi-font-family-grotesk: var(--pri-font-grotesk);`

### 5) Expose to Tailwind when needed

Inside your Tailwind token mapping layer:
- `--font-family-grotesk: var(--semi-font-family-grotesk);`

Then use either:
- Tailwind utility class like `font-grotesk`, or
- direct CSS variable usage for specific cases.

---

## Notes for future me

- Keep adding tokens by **role**, not by color name, unless it is a primitive token.
- Prefer extending semantic tokens before creating component-specific tokens.
- Keep global CSS minimal; push most UI styling into component-level Tailwind utilities.
- If the design system grows, split `tokens.css` by domain (`color`, `typography`, `spacing`, `motion`) and re-export through `src/styles/index.css`.
