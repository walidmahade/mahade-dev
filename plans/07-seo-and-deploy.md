# 07 — SEO + Deploy

Wire sitemap, robots, JSON-LD, analytics, and Cloudflare Pages deployment. Update CLAUDE.md for the new stack.

## SEO

### Sitemap

Already installed via `@astrojs/sitemap` in plan 01. Verify `astro.config.mjs`:

```js
integrations: [react(), sitemap({
  filter: (page) => !page.includes('/404'),
})],
```

Build output should include `/sitemap-index.xml` and `/sitemap-0.xml`.

### robots.txt

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://mahade.dev/sitemap-index.xml
```

### Sitewide JSON-LD

Add to `src/layouts/Layout.astro` `<head>`:

```astro
---
import { site } from '@/data/site';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: site.title,
  image: `${site.url}/images/mahade-headshot.webp`,
  sameAs: [
    site.links.github,
    site.links.upwork,
  ].filter(Boolean),
  knowsAbout: ['Webflow', 'Web development', 'SEO', 'Performance optimization'],
};
---
<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

Homepage gets additional `Service` and `Review` schemas in `src/pages/index.astro`:

```astro
---
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Person', name: 'Mahade Walid', url: 'https://mahade.dev' },
  serviceType: 'Webflow Development',
  areaServed: 'Worldwide',
  offers: [
    { '@type': 'Offer', name: 'Monthly Retainer', price: '1999', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Hourly via Upwork', priceCurrency: 'USD' },
  ],
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewBody: 'He took a detailed mock up and put it in place perfectly at a reasonable cost and did so quickly.',
  author: { '@type': 'Person', name: 'Daniel Garcia' },
  itemReviewed: { '@type': 'Person', name: 'Mahade Walid' },
};
---
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
  <script type="application/ld+json" set:html={JSON.stringify(reviewSchema)} />
</Fragment>
```

### Per-page titles (keyword-bearing)

| Page | Title |
|---|---|
| `/` | Webflow Developer — Mahade Walid |
| `/work` | Webflow Portfolio — Mahade Walid |
| `/work/amply` | Amply — Webflow Case Study \| Mahade Walid |
| `/about` | About Mahade Walid — Webflow Developer |
| `/contact` | Contact — Mahade Walid, Webflow Developer |
| `/blog` | Blog — Webflow, SEO, and freelance notes \| Mahade Walid |

### Default OG image

Create `public/images/og-default.png` (1200×630). Contains: Mahade Walid name, "Webflow Developer" tagline, brand gradient accent.

If no designer available yet, generate programmatically at build time using Astro's built-in Satori/html-to-image, or use a simple SVG-to-PNG conversion. For MVP, a hand-designed static PNG is fine.

### Google Analytics

Add to `src/layouts/Layout.astro` `<head>`:

```astro
---
import { site } from '@/data/site';
---
<script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}></script>
<script is:inline define:vars={{ gaId: site.gaId }}>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', gaId, { anonymize_ip: true });
</script>
```

---

## Cloudflare Pages deployment

### 1. Adapter config

`astro.config.mjs` already has `adapter: cloudflare()` from plan 01. For a static marketing site, use static output (the adapter is still needed if we ever add dynamic routes, but `output: 'static'` is fine):

```js
export default defineConfig({
  site: 'https://mahade.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [...],
});
```

### 2. Build settings (Cloudflare Pages dashboard)

- **Framework preset:** Astro
- **Build command:** `pnpm build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Node version:** 20
- **Environment variables:** none required for the static site

### 3. `wrangler.toml` (optional but recommended)

`wrangler.toml`:

```toml
name = "mahade-dev"
compatibility_date = "2026-04-21"
pages_build_output_dir = "./dist"

[vars]
# reserved for future runtime config
```

### 4. Custom domain

After connecting the repo in Cloudflare Pages:
1. Project → Custom domains → Add `mahade.dev`
2. Update DNS: CNAME `@` → `<project>.pages.dev`
3. Cloudflare auto-issues SSL cert

### 5. `_headers` and `_redirects`

`public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=31536000, immutable
```

`public/_redirects`:

```
# Legacy PHP routes → new routes
/uses        /about          301
/index.php   /               301

# Webflow subdomain traffic → main
# (optional — only if you want visitors bounced off mahade.webflow.io)
```

---

## Update CLAUDE.md

Overwrite `/CLAUDE.md` with the new stack reality:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server on http://localhost:4321
pnpm build            # Production build to dist/
pnpm preview          # Preview production build
```

## Architecture Overview

Portfolio + marketing site for Mahade Walid, positioning as a premium Webflow developer.

### Tech Stack
- **Framework:** Astro 5 (static output)
- **UI runtime:** React 19 (islands only)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **UI primitives:** shadcn/ui (New York variant)
- **Motion:** GSAP + ScrollTrigger (homepage only, lazy-loaded)
- **Fonts:** Inter + Instrument Serif (self-hosted via @fontsource)
- **Deployment:** Cloudflare Pages

### Project Structure

```
src/
├── components/
│   ├── home/          # Homepage sections (Hero, Services, etc)
│   ├── layout/        # Primitives (Container, Section, Eyebrow, DisplayHeading)
│   ├── site/          # Header, Footer
│   ├── ui/            # shadcn components — do not edit
│   └── work/          # Project cards, case-study fragments
├── content/
│   └── blog/          # MDX blog posts
├── data/              # Typed data modules (site, projects, testimonials, etc)
├── layouts/           # Layout.astro
├── pages/             # Route files
└── styles/            # tokens.css, typography.css, global.css
```

### Key Patterns

- **Data-driven content:** All copy lives in `src/data/*.ts`. Don't inline content in components.
- **Light mode only.** No dark-mode variants.
- **Motion only on `/`.** Never import `HomeMotion.tsx` outside the homepage.
- **Design tokens:** CSS custom properties in `src/styles/tokens.css`, mapped to Tailwind via `@theme` in `global.css`. See `plans/STYLE_GUIDE.md` for canonical token names and usage rules.
- **Pages:** `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, `/blog`, `/blog/[slug]`, `/404`.

### Adding a new project

1. Drop screenshots in `public/images/projects/<slug>-*.webp`
2. Add entry to `src/data/projects.ts`
3. Set `featured: true` to surface on home + work index
4. `/work/<slug>` case study generates automatically

### Adding a new blog post

1. Create `src/content/blog/<slug>.mdx` with frontmatter (title, description, pubDate, tags, draft)
2. Post renders at `/blog/<slug>` automatically
3. Set `draft: true` to keep unpublished

### Style guide

Canonical design tokens, typography scale, motion rules: `plans/STYLE_GUIDE.md`.
```

## Acceptance checklist

- [ ] `pnpm build` produces `dist/sitemap-index.xml` and `dist/sitemap-0.xml`
- [ ] `dist/robots.txt` present
- [ ] `dist/_headers` and `dist/_redirects` present
- [ ] `Person` JSON-LD validates at https://validator.schema.org/
- [ ] `Service` and `Review` JSON-LD on home validate
- [ ] GA pageview fires on each route (test with GA debug mode)
- [ ] Cloudflare Pages build succeeds end-to-end
- [ ] Custom domain `mahade.dev` resolves and serves HTTPS
- [ ] `CLAUDE.md` updated and committed

## Handoff

Next: `08-polish.md`.
