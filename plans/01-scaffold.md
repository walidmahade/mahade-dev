# 01 — Scaffold

Delete the old PHP site and set up Astro + React + Tailwind v4 + shadcn + Cloudflare.

## Prereqs

- Node 20+ installed
- `pnpm` preferred (falls back to `npm` if user prefers)

## Steps

### 1. Back up the headshot

```bash
mkdir -p /tmp/mahade-preserve
cp assets/images/mahade-headshot.webp /tmp/mahade-preserve/
```

### 2. Delete old site

Delete the following from the repo root:
- `index.php`, `404.php`, `uses.php`, `router.php`
- `includes/`
- `sections/`
- `archive-tanstack-start/`
- `assets/` (headshot already preserved)
- `.htaccess`
- `Procfile`
- `nixpacks.toml`
- `plans/prd.json`
- `plans/progress.txt`
- `plans/ralph.sh`, `plans/ralph-once.sh`

**Keep:** `.git/`, `.gitignore`, `.vscode/`, `CLAUDE.md`, `plans/*.md`.

### 3. Init Astro

From repo root:

```bash
pnpm create astro@latest . -- --template minimal --typescript strict --no-git --skip-houston --install
```

If it refuses because the directory isn't empty, use a temp subdir then move contents up:

```bash
pnpm create astro@latest /tmp/mahade-astro -- --template minimal --typescript strict --no-git --skip-houston --install
rsync -a /tmp/mahade-astro/ ./
rm -rf /tmp/mahade-astro
```

### 4. Add integrations

```bash
pnpm astro add react tailwind sitemap
pnpm add @astrojs/cloudflare
```

Update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://mahade.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [], // tailwind v4 vite plugin added below
  },
});
```

### 5. Tailwind v4 setup

Tailwind v4 uses the Vite plugin, not PostCSS. If `astro add tailwind` installed the v3 integration, remove it and install v4 manually:

```bash
pnpm remove @astrojs/tailwind
pnpm add -D tailwindcss @tailwindcss/vite
```

Edit `astro.config.mjs`:

```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ...
  vite: { plugins: [tailwindcss()] },
});
```

Create `src/styles/global.css`:

```css
@import "tailwindcss";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/700.css";
@import "@fontsource/instrument-serif/400.css";
@import "@fontsource/instrument-serif/400-italic.css";

@import "./tokens.css";
@import "./typography.css";

@theme {
  /* Tailwind v4 theme mapping — see STYLE_GUIDE.md for values */
  --color-ink: #0B0D13;
  --color-ink-muted: #4B5261;
  --color-ink-subtle: #8A90A0;
  --color-paper: #FFFFFF;
  --color-paper-tint: #F7F7F8;
  --color-paper-sunken: #EEEFF2;
  --color-line: #E5E7EB;
  --color-line-strong: #D1D5DB;
  --color-brand: #4353FF;
  --color-brand-hover: #3441E0;
  --color-brand-soft: #EEF0FF;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

Create `src/styles/tokens.css` and `src/styles/typography.css` per STYLE_GUIDE.md — actual content defined in plan `02-design-system.md`.

### 6. Install fonts + GSAP + shadcn deps

```bash
pnpm add @fontsource/inter @fontsource/instrument-serif
pnpm add gsap
pnpm add -D @types/node
```

### 7. Init shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

Prompts:
- Style: New York
- Base color: Neutral (we override via tokens)
- CSS variables: Yes
- Import alias: `@/*` mapped to `src/*`

Update `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Install initial components:

```bash
pnpm dlx shadcn@latest add button card badge input textarea label separator accordion
```

Move the headshot back:

```bash
mkdir -p public/images
cp /tmp/mahade-preserve/mahade-headshot.webp public/images/
```

### 8. Base layout

Create `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const { title, description, canonical, ogImage = '/images/og-default.png', noindex = false } = Astro.props;
const canonicalUrl = canonical ?? new URL(Astro.url.pathname, Astro.site).toString();
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {noindex && <meta name="robots" content="noindex,nofollow" />}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={new URL(ogImage, Astro.site).toString()} />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <slot name="head" />
  </head>
  <body class="bg-paper text-ink font-sans antialiased">
    <slot name="header" />
    <main><slot /></main>
    <slot name="footer" />
  </body>
</html>
```

### 9. Verify

```bash
pnpm dev
```

Visit `http://localhost:4321` — Astro welcome page should render with no errors. Tailwind utilities should apply. Fonts should load (check DevTools → Network → no 404 on Inter/Instrument Serif).

## Acceptance checklist

- [ ] `pnpm dev` starts cleanly with no warnings
- [ ] `pnpm build` completes without errors
- [ ] Old PHP files fully removed (verify with `ls`)
- [ ] `public/images/mahade-headshot.webp` exists
- [ ] shadcn components present at `src/components/ui/`
- [ ] Path alias `@/*` resolves in a test import
- [ ] Tailwind v4 classes work (drop `<div class="bg-brand text-paper p-8">test</div>` in a route)

## Handoff

Next plan: `02-design-system.md` — build layout primitives (Container, Section, Eyebrow) and wire typography.
