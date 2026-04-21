# CLAUDE.md

Guidance for Claude Code working in this repository.

## Build & Development Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server on http://localhost:4321
pnpm build          # Production build to dist/
pnpm preview        # Preview the production build locally
```

## Architecture Overview

Portfolio + marketing site for Mahade Walid, positioning as a premium Webflow developer. The site's four goals (in priority order): portfolio showcase, lead capture, trust to justify above-average rates, first-page rank for Webflow-related searches.

### Tech Stack
- **Framework:** Astro 6, static output with `output: 'static'`
- **UI runtime:** React 19 via `@astrojs/react` — islands only, never whole pages
- **Styling:** Tailwind CSS v4 via the Vite plugin + CSS custom properties in `src/styles/tokens.css`
- **UI primitives:** shadcn/ui (New York variant) — vendored into `src/components/ui/`, do not edit
- **Motion:** GSAP + ScrollTrigger, lazy-imported. Homepage only, wired through `src/components/home/HomeMotion.tsx`
- **Content:** Astro Content Collections with the Content Layer API (`glob` loader). Blog posts are MDX in `src/content/blog/`
- **Fonts:** Inter + Geist Variable via `@fontsource/inter` and `@fontsource-variable/geist` — self-hosted, no Google Fonts CDN
- **Deployment:** Cloudflare Pages (`@astrojs/cloudflare` adapter)
- **Analytics:** Google Analytics, loaded only in production builds

### Project Structure

```
src/
├── components/
│   ├── home/          # Hero, TrustBar, Services, FeaturedWork, Process, Pricing, Testimonial, Faq, FinalCta, HomeMotion
│   ├── layout/        # Container, Section, Eyebrow, DisplayHeading — the only layout primitives
│   ├── site/          # Header, Footer (sitewide chrome)
│   ├── work/          # ProjectCard
│   ├── contact/       # CalEmbed
│   └── ui/            # shadcn-vendored — do not edit
├── content/
│   └── blog/          # MDX posts
├── content.config.ts  # Collection schema
├── data/              # Typed content modules (see below)
├── layouts/
│   └── Layout.astro   # Root layout — meta tags, Person JSON-LD, GA, Header, Footer
├── lib/
│   └── utils.ts       # cn() — shadcn helper
├── pages/             # Astro routes
│   ├── index.astro
│   ├── work/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── about.astro
│   ├── contact.astro
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
└── styles/            # global.css, tokens.css, typography.css
```

### Routes

| Path | Purpose |
|---|---|
| `/` | Long-scroll homepage (9 sections) |
| `/work` | Portfolio index, reads from `src/data/projects.ts` |
| `/work/[slug]` | Case study page, generated via `getStaticPaths` |
| `/about` | Story, credentials, headshot |
| `/contact` | Cal.com inline embed + Upwork + mailto |
| `/blog` | Post listing |
| `/blog/[slug]` | MDX post detail |

### Key Patterns

- **Data-driven content.** All copy lives in `src/data/*.ts` (`site`, `projects`, `testimonials`, `services`, `process`, `pricing`, `faq`). Don't inline long strings in components.
- **Light mode only.** Never add dark-mode variants or toggles.
- **No shadows.** Never use `box-shadow` or Tailwind `shadow-*` utilities. Hierarchy comes from borders, tone contrast (`bg-paper` vs `bg-paper-tint`), or `ring-*`. See `plans/STYLE_GUIDE.md` principle 6.
- **Motion only on `/`.** Never import `HomeMotion.tsx` outside the homepage.
- **Design tokens.** CSS custom properties in `src/styles/tokens.css`, mapped to Tailwind via the `@theme` block in `global.css`. The canonical list lives in `plans/STYLE_GUIDE.md`.
- **shadcn islands.** Components that need shared Radix context (e.g. Accordion) must hydrate as a **single** React island — wrap the tree in a `.tsx` component rather than hydrating each shadcn part independently.

### Adding a project

1. Drop screenshots into `public/images/projects/`
2. Add an entry to `src/data/projects.ts` with `featured: true` to surface on the home + work index
3. `/work/<slug>` generates automatically via `getStaticPaths`

### Adding a blog post

1. Create `src/content/blog/<slug>.mdx` with frontmatter (`title`, `description`, `pubDate`, optional `tags`, `updatedDate`, `draft`)
2. Post renders at `/blog/<slug>` and appears in the listing sorted by `pubDate` desc
3. Set `draft: true` to exclude from listing and build

### SEO

- Per-page `<title>` + `<meta description>` via `Layout` props
- Sitewide `Person` JSON-LD in `Layout.astro`
- Homepage emits `Service`, `Review` (one per testimonial), and `FAQPage` schemas
- Case study pages emit `CreativeWork` + `BreadcrumbList`
- Blog posts emit `BlogPosting`
- `@astrojs/sitemap` produces `/sitemap-index.xml` (404 excluded)
- `public/robots.txt` allows all, points to sitemap
- Primary target keywords: "webflow developer", "hire webflow developer", "webflow development services", "webflow freelancer"

### Deployment

Cloudflare Pages. Build command `pnpm build`, output directory `dist`. `wrangler.toml` declares `pages_build_output_dir = "./dist"`. `public/_headers` sets security + cache headers; `public/_redirects` maps legacy PHP routes.

### Style guide

Tokens, type scale, motion rules: `plans/STYLE_GUIDE.md`. That file is the source of truth — if a rule here conflicts with the style guide, the style guide wins.
