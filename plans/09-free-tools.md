# 09 — Free Tools Hub + Footer Redesign

Ship 10 free tools at `/tools/*` to capture high-intent Webflow-related search traffic, and redesign the footer with a multi-column link structure modelled on SaaS marketing sites (Webflow, Linear, Vercel) for internal link equity and discoverability.

## Research note

The user has an Ahrefs MCP available, but the trial subscription returned `units_limit_workspace: 0` — zero API units available. Tool selection is therefore made from domain expertise and competitive analysis of what ranks well in the Webflow freelance niche rather than from fresh Ahrefs pulls. The picks below map to well-known high-intent search patterns (cost calculators, comparison pages, SEO utilities) that consistently drive qualified traffic on dev/agency sites.

When Ahrefs units become available, re-run keyword-explorer against each tool slug to confirm volume + difficulty and swap in better picks if anything underperforms.

## The 10 tools (ordered by lead-intent)

| # | Slug | What it does | Intent | Primary keywords |
|---|---|---|---|---|
| 1 | `/tools/webflow-cost-calculator` | Pages + CMS + SEO + migration inputs → monthly + one-time price range | Very high (hire intent) | webflow cost, webflow pricing calculator, how much does webflow cost |
| 2 | `/tools/webflow-vs-wordpress` | 5-year TCO comparison with sliders for hosting, dev, updates | High (choice intent) | webflow vs wordpress, should i use webflow, webflow wordpress comparison |
| 3 | `/tools/migration-calculator` | WordPress/Squarespace/Framer → Webflow migration hours + cost estimate | High (hire intent) | migrate wordpress to webflow, webflow migration cost, squarespace to webflow |
| 4 | `/tools/meta-preview` | Live Google SERP snippet preview with pixel-width truncation | High (SEO intent) | meta description preview, google snippet preview, serp preview tool |
| 5 | `/tools/og-preview` | Upload image + fill tags → Twitter / LinkedIn / Slack / Facebook preview | High | og image tester, social media preview generator |
| 6 | `/tools/schema-generator` | LocalBusiness / Person / Article / FAQ / Product JSON-LD builder | High | schema markup generator, json-ld generator, structured data builder |
| 7 | `/tools/core-web-vitals` | URL input → Core Web Vitals fetch (PageSpeed Insights public API, no key) | High | core web vitals test, lighthouse test, check page speed |
| 8 | `/tools/robots-txt-generator` | Preset templates (Webflow, WP, SPA) + custom rules → downloadable file | Medium | robots.txt generator |
| 9 | `/tools/webflow-launch-checklist` | 40-item interactive checklist with localStorage progress | Very high (launch intent) | webflow launch checklist, webflow pre-launch checklist |
| 10 | `/tools/contrast-checker` | HEX / RGB picker → WCAG AA / AAA verdict, adjacent palette suggestions | Medium | contrast checker, wcag contrast, color accessibility |

Every tool page includes:
- SEO-optimized H1 + 2-3 paragraphs of copy targeting the primary keywords
- The functional tool (client-side, zero backend)
- "Hire Mahade" CTA block near the fold and again at the bottom
- 3-tool "Related tools" strip
- Short FAQ (2-4 items) for rich-result eligibility and dwell time
- Per-tool `SoftwareApplication` JSON-LD schema

## Data model

`src/data/tools.ts` exports a `Tool[]` with `slug`, `name`, `tagline`, `keywords`, `icon`, `category`. Drives the `/tools` index, the footer column, each tool's related-tools strip, and the `sitemap`.

## Footer redesign

Modelled on the multi-column SaaS-marketing-site pattern (dense, categorical, anchor-heavy). Layout:

| Column | Content |
|---|---|
| **Services** | Webflow development · SEO optimization · Speed optimization · Maintenance · Migration |
| **Free tools** | All 10 tools (one link each) |
| **Work** | Portfolio index · Featured case study · Industries served |
| **Resources** | Blog · Process · Pricing · FAQ |
| **Compare** | Webflow vs WordPress · Migration cost · Launch checklist |
| **Hire** | Book a call · Upwork · Email · GitHub |

Below the columns: a bottom row with the logo / name / location / copyright / "Built with Astro on Cloudflare Pages" line.

No "Subscribe to newsletter" or email-capture in the footer — lead capture lives on dedicated pages.

## Nav change

Add a `Tools` link to the sticky Header nav between `Work` and `About`.

## Implementation order

1. `plans/09-free-tools.md` (this file)
2. `src/data/tools.ts`
3. `src/components/tools/ToolLayout.astro` + `ToolCta.astro` + `ToolIcon.astro`
4. `src/pages/tools/index.astro`
5. Each tool — Astro page per route, React island (`.tsx`) only where interactivity requires state (cost calc, meta preview, og preview, schema gen, CWV, contrast checker, robots gen, launch checklist). Comparison + migration are pure client-side calculators expressed inline in React.
6. Footer redesign
7. Header nav update
8. Verify + commit + PR

## Out of scope

- Server-side rendering of tool output (everything is client-side; Astro prerenders the shell)
- Authentication / saved preferences (except `localStorage` for the launch checklist)
- A/B testing of CTAs
- Email capture
- Per-tool blog posts (later — each tool deserves a companion long-form post for SEO)
