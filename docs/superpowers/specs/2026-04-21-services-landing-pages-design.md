# Services Landing Pages + Header Megamenu — Design

**Date:** 2026-04-21
**Owner:** Mahade Walid
**Status:** Approved for planning

## Goal

Drive SEO traffic and conversions for five specific service offerings by giving each its own landing page with intent-matched content, and surface them from every page through a header megamenu with distinctive brand-style icons.

## Scope

In scope:
- Five service pages:
  - `/services/figma-to-webflow` — Figma to Webflow Development
  - `/services/webflow-audits` — Webflow Audits
  - `/services/webflow-consultations` — Webflow Consultations
  - `/services/webflow-retainer` — Webflow Retainer
  - `/services/upwork` — Hire me on Upwork (internal landing highlighting Upwork success)
- Header megamenu exposing all five, with custom SVG icons
- Mobile disclosure equivalent of the megamenu
- Footer "Services" column rewired to the new routes
- Five custom 24×24 SVG icons in the brand style

Out of scope:
- No changes to the homepage Services section (stays as-is, 4 generic cards)
- No dark mode, no box-shadows (style-guide rules)
- No new npm dependencies
- No JS framework for the megamenu — CSS-first with `<details>` fallback for mobile
- Upwork profile data fetching / scraping — stats ship as `TBD` placeholders for manual entry

## Success criteria

- Each service page ranks on intent-matched keywords (verified post-launch via GSC; not enforced at build time)
- Megamenu works on keyboard, touch, and mouse with no visible shadows
- Pages pass the project's existing Lighthouse 95+ bar
- All new pages emit `Service` JSON-LD; Upwork page emits a `Person` + `AggregateRating` when stats are filled in
- Build is static (no adapter change), deploys on Cloudflare Pages unchanged

## Non-goals

- Not a full brand refresh of the Services section on home
- Not an Upwork data integration — values are hand-written

---

## Architecture

### Data layer

New file: `src/data/serviceLandings.ts`

```ts
export type ServiceIconKey =
  | 'figmaToWebflow'
  | 'audit'
  | 'consult'
  | 'retainer'
  | 'upwork';

export type ServiceLanding = {
  slug: string;              // url segment, e.g. 'figma-to-webflow'
  name: string;              // "Figma to Webflow Development"
  tagline: string;           // one-liner for megamenu + meta description seed
  icon: ServiceIconKey;
  href: string;              // internal route; upwork is '/services/upwork'
  // Empty for the Upwork entry (it uses a bespoke page).
  // Populated for the four dynamic entries.
  content?: {
    hero: { eyebrow: string; heading: string; sub: string };
    whoFor: string[];
    deliverables: { title: string; body: string }[];
    process: { step: string; body: string }[];
    pricingAnchor: {
      label: string;        // e.g. "Included in retainer"
      price: string;
      cadence: string;
      cta: { label: string; href: string; external?: boolean };
    };
    faq: { q: string; a: string }[];
    keywords: string[];     // SEO meta
  };
};

export const serviceLandings: ServiceLanding[] = [ /* 5 entries */ ];

export const getServiceLanding = (slug: string): ServiceLanding | undefined =>
  serviceLandings.find((s) => s.slug === slug);
```

The array order is the megamenu display order. The Upwork entry carries no `content` block and is filtered out of `getStaticPaths` in the dynamic route.

### Routes

| Path | Source file | Generation |
|---|---|---|
| `/services/figma-to-webflow` | `src/pages/services/[slug].astro` | `getStaticPaths` over the 4 entries that have `content` |
| `/services/webflow-audits` | same | same |
| `/services/webflow-consultations` | same | same |
| `/services/webflow-retainer` | same | same |
| `/services/upwork` | `src/pages/services/upwork.astro` | direct |

### Shared dynamic template

`src/pages/services/[slug].astro` renders seven sections using existing layout primitives (`Layout`, `Section`, `Container`, `Eyebrow`, `DisplayHeading`):

1. **Hero** — breadcrumb (Home / Services / Name), eyebrow, H1 (`display-xl` once per page), lead paragraph, two CTAs (primary "Book a call" to `site.links.cal`, secondary "See work" to `/work`).
2. **Who it's for** — three bullets from `content.whoFor`, rendered as a row of compact `rounded-lg border border-line` cards on `bg-paper-tint`.
3. **What you get** — `content.deliverables` grid, 2×2 on md, 1 column on mobile. Uses the same card shape as the home `Services.astro` without the icon column.
4. **Process** — numbered list styled like `home/Process.astro`, 1 column of steps.
5. **Pricing anchor** — a single card variant of `home/Pricing.astro` showing only the relevant tier and its CTA.
6. **FAQ** — uses existing `FaqAccordion.tsx` island; data comes from `content.faq` (passed in as a prop). The island is already built for this exact shape; no new wrapper needed.
7. **Final CTA** — the inverted ink panel from `pages/work/[slug].astro:170-194`, refactored into a shared component `src/components/layout/CtaBanner.astro` and reused here.

JSON-LD emitted: `Service` schema per page, plus `BreadcrumbList`. Each page's `<title>` and `<meta description>` are derived from `tagline` + `keywords`.

### Upwork page — bespoke

`src/pages/services/upwork.astro` renders five sections:

1. **Hero** — breadcrumb, eyebrow "Hire me on Upwork", H1, sub-paragraph, badge row ("Top-Rated", "Job Success" — rendered as pills using `bg-brand-soft text-brand`).
2. **Stats strip** — four stats (Jobs completed / Hours worked / Total earnings / JSS%). Values are hard-coded strings in the page with a `TODO: fill from Upwork profile` comment, matching the existing placeholder pattern in `src/data/pricing.ts:32` for the hourly rate.
3. **Selected reviews** — grid of 3–4 quotes pulled from `src/data/testimonials.ts`. No new data file; consumes existing `testimonials` and optionally filters by an added `upwork: true` flag (additive, non-breaking).
4. **What you can hire me for** — 4 compact cards linking to the other service pages, each using its `ServiceIcon` + `name` + `tagline`.
5. **Final CTA** — the shared `CtaBanner` with primary "View Upwork profile" (external to `site.links.upwork`) and secondary "Book a call".

JSON-LD emitted: `ProfilePage` + `Person` with `AggregateRating` once stats are filled in (ratingValue, reviewCount). If stats are placeholders, `AggregateRating` is omitted so Google doesn't flag invalid schema.

### Header megamenu

New file: `src/components/site/ServicesMenu.astro`

Replaces the single "Services" link in `src/components/site/Header.astro:5-11`. The existing `nav` array in Header.astro loses any reference to services (today there isn't one) and gains a slot-style inclusion of `ServicesMenu.astro` between `Work` and `Tools`.

**Desktop behavior (md+):**
- Trigger: `<button>` with text "Services" + a down-chevron. `aria-haspopup="menu"`, `aria-expanded` toggled via a tiny inline script (10 lines, no framework).
- Panel: positioned `absolute` below the header, flush under the trigger, `max-w-[560px]`, `bg-paper border border-line-strong rounded-lg`. No shadow (style-guide rule); depth comes from `border-line-strong` alone (the same pattern used for emphasis elsewhere in the system).
- Content: 5 rows. Each row is an `<a>` with `[24×24 ServiceIcon] [name on top / tagline below]`. Hover/focus: `bg-paper-tint`, icon color shifts to `text-brand`.
- Upwork row: appended after a thin divider, rendered with an external-link glyph suffix. `href="/services/upwork"` — internal per this spec.
- Open/close: hover opens, focus-within keeps open, click on trigger toggles, Escape closes, click outside closes. Implementation: inline script in `ServicesMenu.astro` attaches listeners on mount.

**Mobile behavior (< md):**
- Current header hides the nav on small screens (`hidden md:flex`); that is already the case at `Header.astro:25`. Therefore the megamenu also hides on mobile. However, since the Tools row is visible in the mobile menu today (it isn't — there's no mobile menu), this spec adds no mobile hamburger — we keep parity with the existing header.
- Exception: if a mobile nav lands later, the megamenu degrades into a `<details>` disclosure. Out of scope for this spec.

**Accessibility:**
- Trigger has visible focus ring using the existing `--color-focus-ring` token.
- Roving-tabindex not needed — native tab order is sufficient across 5 items.
- `prefers-reduced-motion: reduce` honored: no slide-in transition.

### Custom SVG icons

New file: `src/components/site/ServiceIcon.astro`

Inline switch on a `key: ServiceIconKey` prop. All five icons:
- `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- Designed in-house, not copies of vendor trademarks. Approx sketches:
  - `figmaToWebflow` — rounded square on the left, rounded square on the right, an arrow between them crossing the center
  - `audit` — rounded document outline with two content lines and a magnifier overlapping the lower-right corner
  - `consult` — rounded speech bubble with a tail, a lightbulb filament inside suggested by three vertical strokes + a dot
  - `retainer` — two arcs forming a circular cycle, each with an arrowhead, 180° opposed
  - `upwork` — a rounded-square frame with an upward chevron inside (evokes the "up" direction without copying the Upwork trademark)

Rendered via `<ServiceIcon name="figmaToWebflow" class="h-6 w-6" />`. Icon color inherits from parent via `currentColor`.

### Footer changes

`src/components/site/Footer.astro` — the "Services" column replaces its anchor links with:
```
- Figma to Webflow development → /services/figma-to-webflow
- Webflow audits               → /services/webflow-audits
- Webflow consultations        → /services/webflow-consultations
- Webflow retainer             → /services/webflow-retainer
- Hire me on Upwork            → /services/upwork
- Pricing                      → /#pricing   (kept)
```
The Upwork link in the "Hire" column stays as an external link to `site.links.upwork`.

### Shared CTA banner (refactor)

Extract the inverted-ink CTA block from `src/pages/work/[slug].astro:170-194` into `src/components/layout/CtaBanner.astro` with props:
```ts
interface Props {
  heading: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
}
```
Work case study page migrates to use it. Each service page uses it. Net code: smaller.

### SEO

Per-page meta:
- `<title>`: `"{name} — Mahade Walid"` pattern (matches existing pages)
- `<meta description>`: `content.tagline` expanded to ~155 chars or copied directly if long enough
- Canonical URL via the existing `Layout.astro` behavior (no change)
- Each page emits `Service` JSON-LD using `site.name` as provider
- Dynamic pages are included in the sitemap automatically via `@astrojs/sitemap` (no config change)

Target keywords per page (from `content.keywords`):
- Figma to Webflow: "figma to webflow", "convert figma to webflow", "figma to webflow developer"
- Audits: "webflow audit", "webflow site audit", "webflow seo audit"
- Consultations: "webflow consultant", "hire webflow consultant", "webflow consultation"
- Retainer: "webflow retainer", "monthly webflow development", "webflow subscription"
- Upwork: "webflow developer upwork", "hire webflow developer upwork"

---

## Data flow

```
src/data/serviceLandings.ts
        │
        ├── consumed by src/components/site/ServicesMenu.astro (megamenu rows)
        │
        ├── consumed by src/pages/services/[slug].astro
        │       │
        │       └── getStaticPaths() filters to entries where content is defined,
        │           renders sections from content fields
        │
        └── consumed by src/pages/services/upwork.astro (for cross-links only)
```

The Upwork page additionally reads `src/data/testimonials.ts` for the reviews section.

---

## Error handling / edge cases

- Dynamic route missing slug → Astro's default 404 (already handled by `src/pages/404.astro`).
- A service entry missing `content` that someone tries to link to via `/services/{slug}` → not generated by `getStaticPaths`, so 404s naturally. No guard code needed.
- Megamenu JS fails to load → the panel is always rendered in the DOM, hidden via CSS `display: none` by default, and revealed by:
  - `:hover` on the wrapper (mouse users)
  - `:focus-within` on the wrapper (keyboard users)
  - A `.is-open` class toggled by the trigger button when JS is present (click users)
  With JS off, hover + focus-within still work — only the click-to-toggle flow is lost, which is acceptable degradation. No wrapping `<a>` fallback needed.
- Reduced motion — no transitions applied at all to the panel.

---

## Testing

- `pnpm build` completes without errors.
- Manual browser check of all five new URLs in `pnpm preview`.
- Keyboard walk-through of the megamenu: Tab into trigger → Enter opens → Tab cycles through rows → Escape closes.
- Lighthouse run on `/services/figma-to-webflow` — target 95+ across the board.
- Mobile viewport check that the megamenu is hidden (no layout regression in the existing `hidden md:flex` behavior).

No unit tests added — this is a static content feature; the existing project has no test harness.

---

## File map

New:
- `src/data/serviceLandings.ts`
- `src/pages/services/[slug].astro`
- `src/pages/services/upwork.astro`
- `src/components/site/ServicesMenu.astro`
- `src/components/site/ServiceIcon.astro`
- `src/components/layout/CtaBanner.astro`

Modified:
- `src/components/site/Header.astro` — inject `ServicesMenu.astro`
- `src/components/site/Footer.astro` — rewire Services column
- `src/pages/work/[slug].astro` — migrate inline CTA to `CtaBanner.astro`
- `src/data/testimonials.ts` — optional `upwork?: boolean` field added

Unchanged:
- Homepage, style tokens, Layout, tools, blog, about, contact, 404

---

## Open questions

None remaining — user resolved Q1 (internal Upwork page), Q2 (medium depth), Q3 (custom icons — deferred to assistant), and final approval on hybrid routing + CSS-first megamenu.
