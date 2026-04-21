# 00 — Design Spec

**Project:** mahade.dev rebuild
**Goal:** Position Mahade Walid as a premium Webflow developer, drive qualified leads, and rank for Webflow-related search terms.
**Date:** 2026-04-21

## Goals (in priority order)

1. **Portfolio** — showcase Webflow expertise visually and credibly
2. **Leads** — direct contact via Cal.com booking, Upwork, and email
3. **Trust** — justify above-average rates through polish, proof, and presentation
4. **SEO** — rank first page for "webflow developer", "hire webflow developer", "webflow development services", "webflow freelancer"

## Non-goals

- Dark mode
- CMS integration
- Multi-language support
- User accounts / login
- E-commerce / Stripe
- Animations on any page other than home

## Personas

**Primary: Agency founder or in-house marketing lead**
- Needs a reliable Webflow developer for recurring site work
- Pain: in-house hiring is expensive; contractors often ghost or miss deadlines
- Converts by: booking a call via Cal.com or messaging through Upwork
- Trust signals they look for: real portfolio with live site links, testimonials, clear pricing, professional presentation

**Secondary: Direct client (founder of a SaaS or service business)**
- Needs a polished marketing site built on Webflow
- Converts by: same paths
- Trust signals: case study showing similar work

## Offer

- **Retainer:** $1,999/mo for unlimited Webflow pages (flat rate, subscription model — already live on existing site)
- **Hourly:** TBD rate (placeholder in data file; user fills in before launch)
- Extras: SEO, maintenance, hosting setup, page speed, migrations

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Astro 5 (static output, React islands only where interactivity is needed) |
| UI runtime | React 19 (via `@astrojs/react`) |
| Styling | Tailwind CSS v4 (Vite plugin) + CSS custom properties for tokens |
| Component primitives | shadcn/ui (New York variant) |
| Motion | GSAP + ScrollTrigger (homepage only, lazy-loaded) |
| Fonts | `@fontsource/inter`, `@fontsource/instrument-serif` (self-hosted) |
| Deployment | Cloudflare Pages (`@astrojs/cloudflare` adapter, static mode) |
| Analytics | Google Analytics (`G-00ZDLV4JQ0` from existing site) |

## Site map

| Route | Purpose |
|---|---|
| `/` | Long-scroll homepage (see section list below) |
| `/work` | Projects index (Amply only for now) |
| `/work/amply` | Full case study |
| `/about` | Story, credentials, headshot |
| `/contact` | Cal.com embed + Upwork + mailto |
| `/blog` | Stub — empty state + 1 placeholder post |
| `/blog/[slug]` | Placeholder post route |
| `/404` | Custom 404 |

## Homepage section order

1. **Hero** — display H1, subhead, primary CTA ("Book a call") + secondary ("View work")
2. **Trust bar** — "Trusted by teams at" + logo/name row (Amply and the 11 other client names visible on mahade.webflow.io — names only, no logos required initially)
3. **Services** — 4-card grid: Webflow development, SEO, Speed optimization, Maintenance
4. **Featured work** — Amply case study card (links to `/work/amply`) with screenshot + result bullets
5. **Process** — 4-step horizontal: Discovery → Design → Build → Launch
6. **Pricing** — 2 cards: Retainer ($1,999/mo) + Hourly (placeholder rate)
7. **Testimonial** — Daniel Garcia quote, large quote mark, attribution
8. **FAQ** — 6 questions (below), accordion
9. **Final CTA** — large "Let's build something" block with Cal.com + Upwork buttons

## FAQ seed

1. How long does a typical project take?
2. Do you work with agencies or direct clients?
3. What's included in the $1,999/mo retainer?
4. Can you migrate an existing site to Webflow?
5. Do you handle SEO and speed optimization?
6. What timezone / working hours?

(Answers drafted in `plans/03-home.md`.)

## Data model

Typed modules, no CMS:

```
src/data/
├── site.ts          # name, title, email, socials, cal link, upwork link
├── projects.ts      # Project[]
├── testimonials.ts  # Testimonial[]
├── services.ts      # Service[]
├── process.ts       # ProcessStep[]
├── pricing.ts       # PricingTier[]
├── faq.ts           # FaqItem[]
└── posts/           # MD/MDX blog posts (stub)
```

Adding a new project = add entry to `projects.ts` + drop a screenshot in `public/images/projects/`. The `/work` index and case study routes pick it up automatically.

## SEO targets

- Per-page `<title>` + `<meta description>` via `Layout` props
- OpenGraph + Twitter card tags with per-page overrides
- JSON-LD: `Person` (sitewide), `Service` (home + /services section), `Review` (testimonial), `BreadcrumbList` (case studies)
- `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt` allowing all, pointing to sitemap
- Canonical URLs on every page
- H1 contains primary keyword ("Webflow developer") on home + about + work

## Performance budget

- Home Lighthouse ≥ 95 in all four categories
- First Contentful Paint < 1.2s on 4G simulated
- Total JS on homepage ≤ 100kb gzipped (only the GSAP island + React for interactive components)
- All images served as responsive WebP via Astro `<Image />`
- No layout shift (CLS 0)

## Deletions

All of the following are deleted in plan `01-scaffold.md`:
- `index.php`, `404.php`, `uses.php`, `router.php`
- `includes/`, `sections/`
- `archive-tanstack-start/`
- `.htaccess`, `Procfile`, `nixpacks.toml`
- `plans/prd.json`, `plans/progress.txt`, `plans/ralph*.sh` (old blog PRD — superseded)

Kept:
- `assets/images/mahade-headshot.webp` → moves to `public/images/mahade-headshot.webp`
- `CLAUDE.md` → rewritten for new stack in plan `07`
- `.git/`, `.gitignore`, `.vscode/`
- `plans/*.md` (these plans)

## Success criteria

- [ ] All pages render with no console errors
- [ ] Lighthouse ≥95 on home (Perf, A11y, Best Practices, SEO)
- [ ] Keyboard-navigable through every interactive element
- [ ] `prefers-reduced-motion` disables all GSAP animations
- [ ] Cal.com, Upwork, mailto all resolve to correct URLs
- [ ] Sitemap + robots.txt present at `/sitemap-index.xml` and `/robots.txt`
- [ ] Deploys cleanly to Cloudflare Pages
- [ ] CLAUDE.md updated to reflect new stack
