# 08 — Polish

Final pass: 404 page, favicon, accessibility sweep, Lighthouse audit, cross-browser check.

## 404 page

`src/pages/404.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
---
<Layout
  title="Page not found — Mahade Walid"
  description="The page you're looking for doesn't exist."
  noindex={true}
>
  <Section size="hero" tone="paper">
    <Container>
      <div class="text-center max-w-xl mx-auto">
        <p class="text-display-xl text-brand font-display">404</p>
        <DisplayHeading as="h1" size="lg" class="mt-2">Page not found</DisplayHeading>
        <p class="mt-4 text-ink-muted">
          The page you&rsquo;re looking for moved, never existed, or took the rest of the week off.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" class="inline-flex h-11 items-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover transition-colors">
            Back home
          </a>
          <a href="/work" class="inline-flex h-11 items-center rounded-[10px] border border-line-strong px-5 font-medium text-ink hover:bg-paper-tint transition-colors">
            See the work
          </a>
        </div>
      </div>
    </Container>
  </Section>
</Layout>
```

## Favicon + app icons

Generate from an `M` mark or simplified monogram. Place in `public/`:

- `favicon.svg` — primary, scales to any size
- `favicon.ico` — fallback for older browsers
- `apple-touch-icon.png` (180×180)
- `icon-192.png`, `icon-512.png` (for PWA manifest, optional)

Minimal SVG favicon (`public/favicon.svg`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#4353FF"/>
  <text x="50%" y="54%" font-family="ui-sans-serif, system-ui, sans-serif"
        font-weight="700" font-size="18" fill="white"
        text-anchor="middle" dominant-baseline="middle">M</text>
</svg>
```

Reference in `Layout.astro`:

```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## Accessibility sweep

Run through each page with these checks:

- [ ] **Keyboard:** Tab through every page; every interactive element reachable and visibly focused
- [ ] **Landmarks:** `<header>`, `<main>`, `<footer>`, `<nav>` with `aria-label` where ambiguous
- [ ] **Headings:** H1 once per page; no skipped levels
- [ ] **Images:** every `<img>` has an `alt` (use `alt=""` for purely decorative)
- [ ] **Links vs buttons:** use `<a>` for navigation, `<button>` for actions. External links have `rel="noopener"`
- [ ] **Color contrast:** body text ≥ 7:1 against background (run axe DevTools)
- [ ] **Forms:** N/A (no forms in this build) — reconfirmed
- [ ] **Reduced motion:** enable in DevTools → Rendering → prefers-reduced-motion reduce. No animations fire; all content visible

## Lighthouse audit

Run against production build (`pnpm build && pnpm preview`):

Target: ≥ 95 on each category for every page.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 95+ | 100 | 100 | 100 |
| `/work` | 95+ | 100 | 100 | 100 |
| `/work/amply` | 95+ | 100 | 100 | 100 |
| `/about` | 95+ | 100 | 100 | 100 |
| `/contact` | 95+ (Cal embed will cost some) | 100 | 95+ | 100 |
| `/blog` | 95+ | 100 | 100 | 100 |

**Expected remediation areas:**
- Contact: Cal.com embed adds third-party script weight. Acceptable drop to ~90 perf.
- Homepage: hero image LCP — preload hero screenshot via `<link rel="preload" as="image">` if needed.
- All: ensure no unused JS/CSS; Tailwind v4 handles purging automatically.

## Cross-browser check

Test in:
- Chrome (latest)
- Safari (latest macOS + iOS)
- Firefox (latest)

Viewports:
- 360 × 640 (mobile)
- 768 × 1024 (tablet)
- 1280 × 800 (laptop)
- 1920 × 1080 (desktop)

Known gotchas to verify:
- **Safari:** `backdrop-blur` on header works; font weights render correctly
- **iOS:** Cal.com embed scrolls properly inside its container
- **Firefox:** Focus ring color matches token
- **All:** GSAP animations honor `prefers-reduced-motion`

## Pre-launch checklist

- [ ] All links resolve (run a link checker, e.g. `pnpm dlx linkinator http://localhost:4321 --recurse`)
- [ ] All external links open in new tab with `rel="noopener"`
- [ ] Cal.com, Upwork, GitHub links tested and correct
- [ ] GA tracking ID correct; pageviews reaching GA
- [ ] `sitemap-index.xml` accessible at production URL
- [ ] `robots.txt` accessible at production URL
- [ ] `mahade.dev` root and `www.mahade.dev` both resolve (set up redirect if needed)
- [ ] SSL cert valid; green padlock
- [ ] Favicon shows in browser tabs and when bookmarked
- [ ] Share-test: paste `mahade.dev` into Slack/Twitter — OG image + title appear
- [ ] Mobile performance tested on real device (not just DevTools emulation)
- [ ] 404 page renders and links home
- [ ] `plans/` directory cleaned up or moved to a `docs/` subdirectory if kept

## Post-launch

1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Request indexing for homepage and `/work/amply`
4. Monitor Core Web Vitals in Search Console for first week
5. Add hourly rate to `src/data/pricing.ts` once user finalizes it
6. Collect 3–5 more testimonials from past clients and add to `src/data/testimonials.ts`
7. Capture real Amply screenshots if placeholders were used

## Done

Project complete when:
- All 9 plan files (00–08) have been executed and their acceptance checklists pass
- Site deployed to Cloudflare Pages at `mahade.dev`
- Lighthouse targets met
- User has manually walked through every page on real devices and signed off
