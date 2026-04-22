# 30 More High-Intent Webflow Blog Posts — Implementation Plan (Batch 2)

> **For agentic workers:** Continues from [`2026-04-21-30-webflow-blog-posts.md`](./2026-04-21-30-webflow-blog-posts.md). Infra (MDX components, schema, styles) is already on `main` — do NOT rebuild it. This plan is post-specs only.

**Goal:** Ship 30 more MDX posts (posts 31–60) expanding into Ecommerce, Interactions/Animations, Memberships, Localization, additional Migrations, Forms, CRO, advanced SEO, industry-fit guides, and custom-code topics.

**Shared across all posts:**
- Voice: first-person Mahade Walid, working Webflow dev, opinionated, specific numbers. Match `src/content/blog/hire-webflow-developer-2026.mdx`.
- Lead with the answer. No "Conclusion" H2. End with `<FaqSchema />` then `<CtaCard variant="..." />`.
- No HTML comments in MDX. Use `{/* */}` only if required.
- Imports block (include at top of every post):
  ```mdx
  import Figure from '@/components/blog/Figure.astro';
  import Callout from '@/components/blog/Callout.astro';
  import YouTube from '@/components/blog/YouTube.astro';
  import CtaCard from '@/components/blog/CtaCard.astro';
  import FaqSchema from '@/components/blog/FaqSchema.astro';
  ```
- No YouTube unless verifiable (none assumed).
- Word count: strictly 1500–4000. Individual targets per post.
- Cluster taxonomy (already in schema): `hire-hub | vs | migration | agency | seo-hub | cms-hub | perf-hub | integrations | meta`. New clusters this batch reuse `cms-hub` (memberships, ecommerce cms), `perf-hub` (interactions), `seo-hub` (international, internal linking), `migration`, `integrations`, `vs`, `agency`, and `hire-hub` (industry-fit). No schema changes.
- Hero image: Unsplash hotlink with `?w=1600&q=80&auto=format&fit=crop`.
- Publishing schedule: Mon/Wed/Fri starting 2026-05-25 (resuming from post 30's May 19 + 3 days offset).

## Per-post workflow (same as batch 1)

1. Write MDX at `src/content/blog/<slug>.mdx`.
2. Verify body word count with:
   ```bash
   awk '/^---$/{f=!f; next} !f' src/content/blog/<slug>.mdx | grep -v '^import ' | wc -w
   ```
3. Commit single-file: `git add src/content/blog/<slug>.mdx && git commit -m "blog: add \"<short title>\""`.
4. No `pnpm build` per post; batch build at post 45 and at finish.

## Posts 31–60

Each spec gives: title, description, pubDate, tags, cluster, primary keyword, target words, H2 outline (7–10), 6 FAQ questions (answers written at author time), required internal links, media plan, CTA variant. All post MDX files in `src/content/blog/`.

### 31. `webflow-ecommerce-2026` (Ecommerce pillar) — 3500w · `consult` CTA
- **Title:** Webflow Ecommerce in 2026: What It Can and Can't Do
- **Description:** A working developer's honest read on Webflow Ecommerce — when it fits, what it's missing, and how it compares to Shopify and Stripe-only checkouts.
- **pubDate:** 2026-05-25 · **cluster:** `cms-hub` · **tags:** `["ecommerce", "pillar"]`
- **Primary keyword:** `webflow ecommerce`
- **H2:** 1) The one-paragraph verdict · 2) What Webflow Ecommerce does well · 3) Where it falls short vs Shopify · 4) Product CMS and variants · 5) Checkout customization (and the limits) · 6) Payment processors: Stripe, PayPal, Apple Pay · 7) Shipping, tax, and inventory · 8) Abandoned cart, email, and post-purchase · 9) When Webflow Ecommerce fits (and when it doesn't)
- **Internal links:** `/blog/webflow-ecommerce-vs-shopify`, `/blog/webflow-ecommerce-stripe`, `/blog/webflow-ecommerce-product-cms`, `/blog/webflow-ecommerce-checkout`, `/blog/webflow-vs-shopify` (existing), `/contact`
- **Media:** Hero Unsplash ecom desk; 2 markdown tables (plan comparison, Webflow vs Shopify feature matrix); `<Callout type="warning">` on the biggest Webflow Ecom limitation.

### 32. `webflow-ecommerce-vs-shopify` — 3000w · `consult`
- **Title:** Webflow Ecommerce vs Shopify: When Each One Wins
- **Description:** A technical comparison of Webflow Ecommerce and Shopify — TCO, design freedom, checkout, apps, and the clear use-case boundaries.
- **pubDate:** 2026-05-27 · **cluster:** `vs` · **tags:** `["ecommerce", "comparisons", "shopify"]`
- **Primary keyword:** `webflow ecommerce vs shopify`
- **H2:** 1) Quick verdict · 2) Design and theming freedom · 3) Product catalog and variants · 4) Checkout and conversion · 5) Apps and extensibility · 6) Marketing and SEO tools · 7) Pricing and TCO over 3 years · 8) Who should pick which
- **Internal links:** `/blog/webflow-ecommerce-2026`, `/blog/webflow-vs-shopify` (existing), `/blog/shopify-to-webflow-hybrid`, `/blog/webflow-seo-checklist-2026`, `/contact`
- **Media:** Comparison table; pricing TCO table; `<Callout type="note">` on migration direction.

### 33. `webflow-ecommerce-stripe` — 2500w · `consult`
- **Title:** Webflow Ecommerce + Stripe: The Full Setup Guide
- **Description:** How to wire Stripe payments into Webflow Ecommerce and Webflow Logic — native integration, fallback methods, and the tax/invoicing setup.
- **pubDate:** 2026-05-29 · **cluster:** `integrations` · **tags:** `["ecommerce", "stripe"]`
- **Primary keyword:** `webflow stripe integration`
- **H2:** 1) Native Stripe in Webflow Ecommerce · 2) Stripe Checkout vs Payment Element · 3) Subscriptions and recurring billing · 4) Tax: Stripe Tax vs manual · 5) Webhooks via Webflow Logic · 6) Receipts and invoicing · 7) Testing the flow · 8) Going live: the pre-launch checklist
- **Internal links:** `/blog/webflow-ecommerce-2026`, `/blog/webflow-ecommerce-checkout`, `/blog/webflow-hubspot-integration`, `/contact`
- **Media:** `<Callout type="tip">` on Stripe Checkout vs Element choice; HTML code block showing webhook handler pattern; tax table.

### 34. `webflow-ecommerce-product-cms` — 2500w · `consult`
- **Title:** Webflow Ecommerce Product CMS Structure That Scales
- **Description:** How to structure Webflow Ecommerce products, variants, and categories so you don't repaint the site at 100 SKUs.
- **pubDate:** 2026-06-01 · **cluster:** `cms-hub` · **tags:** `["ecommerce", "cms"]`
- **Primary keyword:** `webflow ecommerce product cms`
- **H2:** 1) Product vs Collection: the key distinction · 2) Variants: Webflow's native system vs workarounds · 3) Categories, tags, and collections · 4) Product page templates that scale · 5) Filtering and faceted search · 6) Inventory, SKUs, and stock states · 7) Out-of-stock UX · 8) Migration from a legacy CMS
- **Internal links:** `/blog/webflow-cms-structure`, `/blog/webflow-cms-limits`, `/blog/webflow-ecommerce-2026`, `/contact`
- **Media:** Field-reference table; variants example table; `<Callout type="warning">` on Webflow's variant limit.

### 35. `webflow-ecommerce-checkout` — 2000w · `consult`
- **Title:** Webflow Ecommerce Checkout: What You Can Customize (and What You Can't)
- **Description:** The exact set of customizations Webflow allows on the Ecommerce checkout — and the six things you'll hit walls on.
- **pubDate:** 2026-06-03 · **cluster:** `cms-hub` · **tags:** `["ecommerce", "checkout"]`
- **Primary keyword:** `webflow checkout customization`
- **H2:** 1) The checkout architecture · 2) What's fully customizable · 3) What's partially customizable · 4) What's locked · 5) Custom Code tricks that safely work · 6) Mobile checkout UX · 7) Accessibility on checkout · 8) When to move off Webflow checkout
- **Internal links:** `/blog/webflow-ecommerce-2026`, `/blog/webflow-ecommerce-stripe`, `/blog/webflow-form-validation`, `/contact`
- **Media:** Customization matrix; `<Callout type="warning">` on the six locked things.

### 36. `webflow-interactions-2-guide` (Interactions pillar) — 3500w · `consult`
- **Title:** Webflow Interactions 2.0: The Complete Guide
- **Description:** A working-dev walkthrough of Webflow Interactions 2.0 — triggers, timelines, scroll animations, page-load, hover, and when not to use them.
- **pubDate:** 2026-06-05 · **cluster:** `perf-hub` · **tags:** `["interactions", "pillar", "animation"]`
- **Primary keyword:** `webflow interactions 2.0`
- **H2:** 1) What changed from Interactions 1 · 2) Triggers explained · 3) Timelines and the "Element Trigger" flow · 4) Scroll-in-view animations · 5) Page load and page trigger · 6) Mouse-move / hover interactions · 7) Class-based interactions · 8) Performance: what hurts LCP and INP · 9) When to reach for GSAP instead
- **Internal links:** `/blog/gsap-in-webflow`, `/blog/webflow-scroll-animations`, `/blog/webflow-site-slow`, `/blog/webflow-core-web-vitals`, `/contact`
- **Media:** Trigger reference table; `<Callout type="warning">` on interactions overhead; `<Callout type="tip">` on class-based reuse.

### 37. `gsap-in-webflow` — 2500w · `consult`
- **Title:** GSAP in Webflow: When to Use It Over Interactions
- **Description:** When Webflow Interactions hit a wall and GSAP earns its weight — with working setups for scroll-triggered animations, SVG, and splits.
- **pubDate:** 2026-06-08 · **cluster:** `perf-hub` · **tags:** `["animation", "gsap"]`
- **Primary keyword:** `gsap webflow`
- **H2:** 1) The line where Interactions stop · 2) Installing GSAP cleanly · 3) ScrollTrigger basics · 4) SplitText and typography effects · 5) SVG and drawSVG patterns · 6) Performance: keep it cheap · 7) Fallbacks when JS fails · 8) GSAP licensing in 2026
- **Internal links:** `/blog/webflow-interactions-2-guide`, `/blog/webflow-site-slow`, `/blog/webflow-custom-code`, `/contact`
- **Media:** JS code block for a ScrollTrigger setup; licensing note callout.

### 38. `webflow-scroll-animations` — 2200w · `consult`
- **Title:** Webflow Scroll Animations: 7 Patterns That Actually Perform
- **Description:** The seven scroll-animation patterns I use on real Webflow sites — with perf notes and the ones to avoid.
- **pubDate:** 2026-06-10 · **cluster:** `perf-hub` · **tags:** `["animation", "scroll"]`
- **Primary keyword:** `webflow scroll animation`
- **H2:** 1) Why most scroll animations look bad · 2) Pattern 1: fade up on enter · 3) Pattern 2: parallax hero · 4) Pattern 3: sticky sections with pinning · 5) Pattern 4: horizontal scroll · 6) Pattern 5: text reveal on scroll · 7) Pattern 6: image sequence on scroll · 8) Pattern 7: scroll progress bar · 9) Perf budget for each pattern
- **Internal links:** `/blog/webflow-interactions-2-guide`, `/blog/gsap-in-webflow`, `/blog/webflow-site-slow`, `/contact`
- **Media:** 7-pattern matrix (Pattern · Complexity · Perf · Use case); `<Callout type="warning">` on patterns that tank mobile.

### 39. `lottie-in-webflow` — 2000w · `consult`
- **Title:** Lottie in Webflow: Before You Add One, Read This
- **Description:** When a Lottie earns its kilobytes on Webflow, when it doesn't, and the settings that keep it from wrecking your LCP.
- **pubDate:** 2026-06-12 · **cluster:** `perf-hub` · **tags:** `["lottie", "animation"]`
- **Primary keyword:** `lottie webflow`
- **H2:** 1) What Lottie is (and isn't) · 2) The real file-size cost · 3) Optimizing a Lottie before upload · 4) Native Webflow Lottie settings walkthrough · 5) Autoplay vs scroll-trigger · 6) Lazy-loading Lotties · 7) When to replace a Lottie with CSS or MP4
- **Internal links:** `/blog/webflow-site-slow`, `/blog/webflow-lazy-loading`, `/blog/webflow-interactions-2-guide`, `/contact`
- **Media:** Optimization before/after table; `<Callout type="warning">` on autoplay Lottie above the fold.

### 40. `webflow-hover-states` — 1800w · `consult`
- **Title:** Hover States in Webflow: The Practical Patterns
- **Description:** The hover-state patterns that survive QA — button, card, image, nav — with accessible fallbacks for touch.
- **pubDate:** 2026-06-15 · **cluster:** `perf-hub` · **tags:** `["interactions", "hover"]`
- **Primary keyword:** `webflow hover state`
- **H2:** 1) Why Webflow hover states feel off · 2) Button hovers that actually scale · 3) Card hovers with depth · 4) Image reveal hovers · 5) Nav link hovers and underline patterns · 6) Touch-device fallbacks · 7) Accessibility: focus states matter more
- **Internal links:** `/blog/webflow-interactions-2-guide`, `/blog/webflow-components-vs-symbols`, `/contact`
- **Media:** `<Callout type="tip">` on combo-class hover patterns; code block showing a focus-visible pattern.

### 41. `webflow-memberships-review` — 2800w · `consult`
- **Title:** Webflow Memberships Review 2026
- **Description:** A clear-eyed review of Webflow's native Memberships feature — what works, what doesn't, and the kind of project it's right for.
- **pubDate:** 2026-06-17 · **cluster:** `cms-hub` · **tags:** `["memberships"]`
- **Primary keyword:** `webflow memberships`
- **H2:** 1) What Webflow Memberships actually does · 2) Login, signup, and access groups · 3) Gated pages and gated content · 4) Pricing and billing: the big gap · 5) Where it fits (simple communities, private docs) · 6) Where it breaks (billing, tiered access) · 7) When to layer Memberstack or Outseta · 8) The 2026 roadmap hedge
- **Internal links:** `/blog/memberstack-vs-outseta-vs-webflow`, `/blog/webflow-gated-course`, `/blog/webflow-cms-structure`, `/contact`
- **Media:** Feature-reference table; `<Callout type="warning">` on the billing gap.

### 42. `memberstack-vs-outseta-vs-webflow` — 2500w · `consult`
- **Title:** Memberstack vs Outseta vs Webflow Memberships: Which to Pick
- **Description:** A working-dev comparison of the three main ways to gate content and charge for access on Webflow — with decision rules.
- **pubDate:** 2026-06-19 · **cluster:** `vs` · **tags:** `["memberships", "comparisons"]`
- **Primary keyword:** `memberstack vs outseta`
- **H2:** 1) One-line verdict per use case · 2) Webflow Memberships strengths and ceilings · 3) Memberstack: the full-stack user layer · 4) Outseta: CRM + subscriptions + members · 5) Pricing across the three · 6) Dev lift to integrate · 7) The decision matrix
- **Internal links:** `/blog/webflow-memberships-review`, `/blog/webflow-gated-course`, `/blog/webflow-hubspot-integration`, `/contact`
- **Media:** Decision matrix; pricing table; `<Callout type="tip">` on the hybrid pattern.

### 43. `webflow-gated-course` — 2500w · `consult`
- **Title:** Building a Gated Course on Webflow: Full Setup
- **Description:** The end-to-end build of a gated course on Webflow — CMS structure, access control, video hosting, progress tracking, and launch.
- **pubDate:** 2026-06-22 · **cluster:** `cms-hub` · **tags:** `["memberships", "course"]`
- **Primary keyword:** `webflow gated course`
- **H2:** 1) The stack you actually need · 2) CMS: lessons, modules, students · 3) Access control layer (Memberstack or Webflow Memberships) · 4) Video hosting: Mux, Cloudflare Stream, Wistia · 5) Progress tracking pattern · 6) Drip content over time · 7) Payments and renewals · 8) Launch checklist
- **Internal links:** `/blog/webflow-memberships-review`, `/blog/memberstack-vs-outseta-vs-webflow`, `/blog/webflow-ecommerce-stripe`, `/contact`
- **Media:** Stack diagram-as-table; `<Callout type="warning">` on video hosting bandwidth costs.

### 44. `webflow-localization-vs-weglot` — 2500w · `consult`
- **Title:** Webflow Localization (Native) vs Weglot vs Linguana: Which to Pick
- **Description:** A working-dev comparison of the three real ways to translate a Webflow site — cost, SEO, maintenance, and the gotchas.
- **pubDate:** 2026-06-24 · **cluster:** `vs` · **tags:** `["localization", "i18n"]`
- **Primary keyword:** `webflow localization`
- **H2:** 1) The three options in one table · 2) Webflow native Localization: what it includes · 3) Weglot: JS-injection translation · 4) Linguana: a CMS-duplication approach · 5) SEO outcomes: indexable translated URLs · 6) Pricing and maintenance over 2 years · 7) Translator workflow · 8) Decision rules by site size
- **Internal links:** `/blog/webflow-multi-language-seo`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-international-seo`, `/contact`
- **Media:** 3-way comparison table; pricing table; `<Callout type="note">` on JS-only translation SEO risk.

### 45. `webflow-multi-language-seo` — 2500w · `consult`
- **Title:** Multi-Language Webflow Sites: SEO and hreflang Setup
- **Description:** The exact hreflang, sitemap, and URL setup for a multi-language Webflow site so Google indexes the right version per country.
- **pubDate:** 2026-06-26 · **cluster:** `seo-hub` · **tags:** `["seo", "i18n", "hreflang"]`
- **Primary keyword:** `webflow hreflang`
- **H2:** 1) URL strategy: subfolder vs subdomain vs ccTLD · 2) hreflang tags: where Webflow supports them · 3) hreflang on static pages · 4) hreflang on CMS templates · 5) Sitemap structure for multi-language · 6) Canonical tags across languages · 7) Search Console setup per region · 8) Common mistakes that tank international rankings
- **Internal links:** `/blog/webflow-localization-vs-weglot`, `/blog/webflow-international-seo`, `/blog/webflow-sitemap-robots-canonical`, `/blog/webflow-seo-checklist-2026`, `/contact`
- **Media:** URL-strategy decision table; hreflang code block; `<Callout type="warning">` on the #1 hreflang mistake.

### 46. `squarespace-to-webflow-migration` — 3000w · `consult`
- **Title:** Squarespace to Webflow Migration: The Honest Guide
- **Description:** What really happens when you migrate a Squarespace site to Webflow — design rebuild scope, SEO risk, redirect mapping, and cost.
- **pubDate:** 2026-06-29 · **cluster:** `migration` · **tags:** `["migration", "squarespace"]`
- **Primary keyword:** `squarespace to webflow migration`
- **H2:** 1) The honest answer on scope · 2) What carries over (content, images, basic structure) · 3) What gets rebuilt (design, CMS, integrations) · 4) SEO risk and redirect map · 5) Squarespace ecommerce → Webflow Ecom or stay on Shopify · 6) Timeline and cost for 10/25/50-page sites · 7) The 2-week post-launch checklist
- **Internal links:** `/blog/wordpress-to-webflow-migration`, `/blog/webflow-vs-squarespace` (existing), `/blog/webflow-seo-checklist-2026`, `/blog/webflow-sitemap-robots-canonical`, `/contact`
- **Media:** Redirect-map sample table; timeline/cost table; `<Callout type="warning">` on the biggest SEO risk.

### 47. `wix-to-webflow-migration` — 2500w · `consult`
- **Title:** Wix to Webflow Migration: What Actually Breaks
- **Description:** The exact failure modes when migrating from Wix to Webflow — URL structure differences, CMS shape mismatches, and the fix-list.
- **pubDate:** 2026-07-01 · **cluster:** `migration` · **tags:** `["migration", "wix"]`
- **Primary keyword:** `wix to webflow migration`
- **H2:** 1) What breaks by default · 2) URL patterns: Wix's quirks vs Webflow's sanity · 3) Wix "Studio Collections" → Webflow CMS · 4) Wix app dependencies that don't carry over · 5) Ecommerce migration path · 6) Redirect map strategy · 7) Timeline by page count · 8) When to stay on Wix
- **Internal links:** `/blog/wordpress-to-webflow-migration`, `/blog/squarespace-to-webflow-migration`, `/blog/webflow-vs-wix` (existing), `/blog/webflow-seo-checklist-2026`, `/contact`
- **Media:** URL pattern comparison table; app-replacement table; `<Callout type="tip">` on getting the redirect map right.

### 48. `shopify-to-webflow-hybrid` — 2500w · `consult`
- **Title:** Shopify to Webflow + Shopify Hybrid: Why and How
- **Description:** Why many ecommerce brands move the marketing site to Webflow but keep Shopify for checkout — and how to wire the two cleanly.
- **pubDate:** 2026-07-03 · **cluster:** `migration` · **tags:** `["migration", "shopify", "ecommerce"]`
- **Primary keyword:** `webflow shopify hybrid`
- **H2:** 1) The hybrid pattern in one paragraph · 2) When it pays off · 3) Architecture: subdomain vs subfolder · 4) Product data: Shopify API + Webflow CMS sync · 5) Product pages on Webflow, cart on Shopify · 6) SEO across the boundary · 7) Analytics and attribution · 8) Maintenance cost over time
- **Internal links:** `/blog/webflow-ecommerce-vs-shopify`, `/blog/webflow-vs-shopify` (existing), `/blog/webflow-sitemap-robots-canonical`, `/blog/webflow-analytics-ga4-plausible`, `/contact`
- **Media:** Architecture diagram-as-table; `<Callout type="warning">` on the SEO risk at the handoff URL.

### 49. `webflow-multi-step-forms` — 2200w · `consult`
- **Title:** Webflow Multi-Step Forms: 3 Ways to Build Them
- **Description:** The three practical ways to build multi-step forms in Webflow — native interactions, Jetboost/Memberstack Forms, and custom code.
- **pubDate:** 2026-07-06 · **cluster:** `integrations` · **tags:** `["forms"]`
- **Primary keyword:** `webflow multi step form`
- **H2:** 1) Why multi-step beats single-step on 6+ fields · 2) Approach 1: native Webflow with Interactions · 3) Approach 2: third-party (Jetboost, MemberstackForms) · 4) Approach 3: custom JS for full control · 5) Validation across steps · 6) Progress indicators · 7) Saving partial submissions · 8) Analytics on drop-off per step
- **Internal links:** `/blog/webflow-form-validation`, `/blog/webflow-hubspot-integration`, `/blog/webflow-file-uploads`, `/contact`
- **Media:** 3-approach decision table; `<Callout type="tip">` on which to pick.

### 50. `webflow-form-validation` — 2000w · `consult`
- **Title:** Webflow Form Validation: Native + Custom Code Patterns
- **Description:** What Webflow's native form validation covers, where it falls short, and the specific custom-code patterns that fill the gaps.
- **pubDate:** 2026-07-08 · **cluster:** `integrations` · **tags:** `["forms", "validation"]`
- **Primary keyword:** `webflow form validation`
- **H2:** 1) What Webflow validates by default · 2) Where native validation is thin · 3) Pattern 1: regex patterns (phone, postal) · 4) Pattern 2: async email/domain validation · 5) Pattern 3: inline error messages with JS · 6) Pattern 4: honeypot and server-side checks · 7) Accessibility considerations
- **Internal links:** `/blog/webflow-multi-step-forms`, `/blog/webflow-hubspot-integration`, `/blog/webflow-custom-code`, `/contact`
- **Media:** Native vs custom comparison table; JS code block for regex pattern; `<Callout type="warning">` on ignoring server-side validation.

### 51. `webflow-file-uploads` — 1800w · `consult`
- **Title:** Webflow File Uploads: What Actually Works
- **Description:** File upload options for Webflow forms — native Uploadcare/Filestack integration, the file-size limits, and the three patterns that ship.
- **pubDate:** 2026-07-10 · **cluster:** `integrations` · **tags:** `["forms", "uploads"]`
- **Primary keyword:** `webflow file upload`
- **H2:** 1) Webflow's native upload limits · 2) Pattern 1: Uploadcare widget · 3) Pattern 2: Filestack/Cloudinary · 4) Pattern 3: S3 pre-signed URLs · 5) Handling large files (>100MB) · 6) Storing file references in CMS or HubSpot · 7) Security considerations
- **Internal links:** `/blog/webflow-multi-step-forms`, `/blog/webflow-form-validation`, `/blog/webflow-custom-code`, `/contact`
- **Media:** 3-pattern matrix; `<Callout type="warning">` on native limits.

### 52. `webflow-ab-testing` — 2500w · `consult`
- **Title:** Webflow A/B Testing in 2026: Tools and Setup
- **Description:** After Google Optimize's sunset, these are the A/B testing tools that actually work on Webflow — with setup and pitfalls.
- **pubDate:** 2026-07-13 · **cluster:** `integrations` · **tags:** `["cro", "ab-testing"]`
- **Primary keyword:** `webflow ab testing`
- **H2:** 1) What changed when Google Optimize ended · 2) VWO: the default enterprise pick · 3) Convert.com: mid-market · 4) Vercel Edge Config / Split: for headless setups · 5) Building your own with Webflow Logic + feature flags · 6) Setup on a Webflow page · 7) Statistical significance without the drama · 8) Avoiding flicker (FOOC)
- **Internal links:** `/blog/webflow-analytics-ga4-plausible`, `/blog/webflow-landing-page-teardown`, `/blog/webflow-custom-code`, `/contact`
- **Media:** Tool-comparison table; pricing table; `<Callout type="tip">` on the FOOC fix.

### 53. `webflow-landing-page-teardown` — 3000w · `consult`
- **Title:** High-Converting Webflow Landing Pages: 9-Point Teardown
- **Description:** A teardown of the 9 things every high-converting Webflow landing page has — with examples from real client work.
- **pubDate:** 2026-07-15 · **cluster:** `agency` · **tags:** `["cro", "landing-pages"]`
- **Primary keyword:** `webflow landing page`
- **H2:** 1) The 9-point scorecard · 2) Above-the-fold clarity · 3) The one-thing CTA · 4) Social proof placement · 5) Feature/benefit balance · 6) Pricing transparency · 7) FAQ right before the final CTA · 8) Mobile-first layout · 9) Speed that actually converts · 10) Form friction: what to remove
- **Internal links:** `/blog/webflow-ab-testing`, `/blog/webflow-core-web-vitals`, `/blog/webflow-site-slow`, `/blog/webflow-for-saas`, `/contact`
- **Media:** Scorecard table; `<Callout type="warning">` on the friction sinkholes; `<Callout type="tip">` on the above-the-fold test.

### 54. `webflow-international-seo` — 2500w · `consult`
- **Title:** Webflow International SEO: hreflang, ccTLDs, and Regional Targeting
- **Description:** The full playbook for international SEO on Webflow — URL patterns, hreflang, Search Console, and Googlebot region targeting.
- **pubDate:** 2026-07-17 · **cluster:** `seo-hub` · **tags:** `["seo", "international"]`
- **Primary keyword:** `webflow international seo`
- **H2:** 1) The 3 URL strategies (subfolder, subdomain, ccTLD) · 2) hreflang tag patterns · 3) International Targeting in Search Console · 4) ccTLDs: when they're worth the cost · 5) Pricing, currency, and local content · 6) Multi-language vs multi-regional · 7) The common pitfalls
- **Internal links:** `/blog/webflow-multi-language-seo`, `/blog/webflow-localization-vs-weglot`, `/blog/webflow-sitemap-robots-canonical`, `/blog/webflow-seo-checklist-2026`, `/contact`
- **Media:** URL-strategy decision table; hreflang code block; `<Callout type="note">` on Search Console region targeting.

### 55. `webflow-internal-linking` — 2500w · `consult`
- **Title:** Webflow Internal Linking Structure: The E-E-A-T Play
- **Description:** The internal linking structure that builds topical authority on a Webflow site — hub-and-spoke, contextual links, and the audit I run every quarter.
- **pubDate:** 2026-07-20 · **cluster:** `seo-hub` · **tags:** `["seo", "internal-linking"]`
- **Primary keyword:** `webflow internal linking`
- **H2:** 1) Why internal linking beats backlinks for new sites · 2) Hub-and-spoke: the core pattern · 3) Contextual links in body copy · 4) Related-posts modules (what works, what doesn't) · 5) Anchor-text strategy · 6) Nofollow and sponsored links · 7) Webflow-specific: CMS multi-reference as an auto-link engine · 8) The quarterly internal linking audit
- **Internal links:** `/blog/webflow-seo-checklist-2026`, `/blog/webflow-schema-markup`, `/blog/webflow-multi-reference-fields`, `/blog/webflow-cms-structure`, `/contact`
- **Media:** Hub-and-spoke diagram-as-table; audit checklist; `<Callout type="tip">` on the multi-reference auto-link pattern.

### 56. `webflow-for-saas` — 2800w · `hire`
- **Title:** Webflow for SaaS: The Marketing Site Template I Recommend
- **Description:** The Webflow setup I recommend for SaaS companies — page structure, CMS for features and use cases, pricing page patterns, and the integrations that matter.
- **pubDate:** 2026-07-22 · **cluster:** `hire-hub` · **tags:** `["saas", "industry"]`
- **Primary keyword:** `webflow for saas`
- **H2:** 1) Why Webflow fits SaaS better than WordPress · 2) The page structure that converts · 3) CMS: features, use cases, integrations, changelog · 4) Pricing page patterns · 5) Customer story page · 6) Blog + help center as separate collections · 7) Auth handoff to the product · 8) Integrations: HubSpot, Segment, Stripe · 9) The launch + month-1 playbook
- **Internal links:** `/blog/webflow-vs-wordpress-2026`, `/blog/webflow-landing-page-teardown`, `/blog/webflow-hubspot-integration`, `/blog/webflow-cms-structure`, `/blog/hire-webflow-developer-2026`, `/contact`, `/work`
- **Media:** Page-structure table; pricing-page pattern matrix; `<Callout type="tip">` on what to CMS vs static.

### 57. `webflow-for-agencies` — 2500w · `hire`
- **Title:** Webflow for Agencies: Client-Proof Setup
- **Description:** The Webflow setup I ship to design agencies building client sites — handoff templates, Editor training, retainer structure, and the billing model.
- **pubDate:** 2026-07-24 · **cluster:** `agency` · **tags:** `["agency", "industry"]`
- **Primary keyword:** `webflow for agencies`
- **H2:** 1) The 3 models: reseller, subcontractor, partner · 2) Project setup that makes handoff easy · 3) Client Editor training · 4) Class naming conventions that scale across projects · 5) Template libraries and style guides · 6) Retainer + ongoing support structure · 7) Billing and reseller pricing · 8) When to bring in a specialist
- **Internal links:** `/blog/white-label-webflow-development`, `/blog/webflow-freelancer-vs-agency`, `/blog/webflow-handoff-checklist`, `/blog/webflow-retainer-vs-project`, `/blog/hire-webflow-developer-2026`, `/contact`, `/work`
- **Media:** 3-model comparison table; retainer pricing table; `<Callout type="tip">` on class conventions.

### 58. `webflow-for-law-firms` — 2200w · `hire`
- **Title:** Webflow for Law Firms: Compliance + Templates
- **Description:** Why Webflow fits small-to-midsize law firms — compliance, disclaimer patterns, practice-area CMS, local SEO, and the template I use.
- **pubDate:** 2026-07-27 · **cluster:** `hire-hub` · **tags:** `["law", "industry"]`
- **Primary keyword:** `webflow for law firms`
- **H2:** 1) Why law firms over-index on WordPress (and why it's wrong) · 2) Compliance basics: ABA + state rules · 3) Disclaimer and advertising-rule patterns · 4) CMS: attorneys, practice areas, case results · 5) Local SEO and schema for attorneys · 6) Contact form + intake pattern · 7) Accessibility and WCAG · 8) Template and launch cost
- **Internal links:** `/blog/webflow-schema-markup`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-cms-structure`, `/blog/hire-webflow-developer-2026`, `/contact`
- **Media:** Practice-area CMS field table; LocalBusiness schema code block; `<Callout type="warning">` on ABA advertising rules.

### 59. `webflow-custom-code` — 2500w · `consult`
- **Title:** When to Add Custom Code to a Webflow Site (and When Not To)
- **Description:** The decision rule for when custom code earns its maintenance cost on Webflow — with the six places I reach for it and the six where I don't.
- **pubDate:** 2026-07-29 · **cluster:** `agency` · **tags:** `["custom-code"]`
- **Primary keyword:** `webflow custom code`
- **H2:** 1) The rule of thumb · 2) Where Webflow natively stops short · 3) Six places custom code pays off · 4) Six places custom code is a mistake · 5) Project Settings vs Page Settings vs Embed · 6) Maintenance cost and handover · 7) Security: the Embed gotcha · 8) Refactoring: when to rip out custom code
- **Internal links:** `/blog/gsap-in-webflow`, `/blog/webflow-form-validation`, `/blog/webflow-file-uploads`, `/blog/webflow-schema-markup`, `/contact`
- **Media:** "Pays off vs mistake" 6-item lists; `<Callout type="warning">` on Embed security.

### 60. `webflow-next-js-hybrid` — 2500w · `consult`
- **Title:** Webflow + Next.js: When the Hybrid Pays Off
- **Description:** When pairing Webflow as a CMS with Next.js as the rendering layer makes sense — architecture, API patterns, and the tradeoffs.
- **pubDate:** 2026-07-31 · **cluster:** `vs` · **tags:** `["hybrid", "nextjs"]`
- **Primary keyword:** `webflow next.js`
- **H2:** 1) The problem this solves · 2) Architecture: Webflow CMS as headless source · 3) Webflow API access and rate limits · 4) Rendering pages in Next.js · 5) Publishing flow and staging · 6) SEO across the hybrid · 7) Cost and complexity · 8) When a pure Webflow or pure Next.js is better
- **Internal links:** `/blog/webflow-vs-wordpress-2026`, `/blog/webflow-cms-structure`, `/blog/webflow-custom-code`, `/blog/webflow-ecommerce-vs-shopify`, `/contact`
- **Media:** Architecture diagram-as-table; API limits table; `<Callout type="warning">` on rate limits.

## Final verification (after post 60)

- [ ] `rm -rf dist && pnpm build` — clean build succeeds, 60 new blog URLs + existing ones
- [ ] `grep -h '^title:' src/content/blog/*.mdx | sort | uniq -d` returns empty
- [ ] `grep -h '^description:' src/content/blog/*.mdx | sort | uniq -d` returns empty
- [ ] `grep -L '^cluster:' src/content/blog/*.mdx` returns only `hello-world.mdx` (or empty)
- [ ] Per-post body word count 1500–4000 (verify with awk loop)
- [ ] Open PR titled "blog: 30 more high-intent Webflow posts (batch 2)" targeting `main`

## FAQ template (every post generates 6 Q&As at write time)

Questions embedded in the frontmatter `faq` array. Writer drafts 2–3 sentence answers matching the post's tone. Schema rendered by `<FaqSchema items={frontmatter.faq} />`.
