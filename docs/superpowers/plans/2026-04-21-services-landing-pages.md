# Services Landing Pages + Header Megamenu — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship five service landing pages (`/services/figma-to-webflow`, `/services/webflow-audits`, `/services/webflow-consultations`, `/services/webflow-retainer`, `/services/upwork`) and wire them into a CSS-first header megamenu with distinctive brand-style SVG icons.

**Architecture:** Hybrid routing — one dynamic template `[slug].astro` for the four consistent service pages, and a bespoke `upwork.astro` page for the Upwork showcase. All five services share a single data file (`src/data/serviceLandings.ts`) that also powers the megamenu. A new `CtaBanner.astro` is extracted once and reused by the services pages and the existing work case study.

**Tech Stack:** Astro 6 (static output), Tailwind CSS v4, React 19 (for the FaqAccordion island only), lucide-react (NOT used here — icons are hand-authored inline SVGs to stay on-brand), pnpm.

**Note on testing:** This project has no unit-test harness. Verification is done via `pnpm build` (type-checks and static generation) plus manual browser walkthrough in `pnpm preview`. Each task ends with a `pnpm build` run and a commit.

---

## File Structure

**New files:**
- `src/data/serviceLandings.ts` — single source of truth for the five services
- `src/components/site/ServiceIcon.astro` — 5 inline SVG icons, switched on a `name` prop
- `src/components/layout/CtaBanner.astro` — shared inverted-ink CTA band
- `src/components/site/ServicesMenu.astro` — CSS-first megamenu trigger + panel + inline toggle script
- `src/pages/services/[slug].astro` — dynamic route for the four data-driven pages
- `src/pages/services/upwork.astro` — bespoke Upwork page

**Modified files:**
- `src/components/site/Header.astro` — inject `ServicesMenu.astro` between Work and Tools
- `src/components/site/Footer.astro` — rewire the Services column to the new routes
- `src/pages/work/[slug].astro` — migrate the inline CTA block to `CtaBanner.astro`
- `src/data/testimonials.ts` — add an optional `upwork?: boolean` flag (additive, non-breaking)

**Untouched:** homepage, tokens, Layout, tools, blog, about, contact, 404.

---

## Task 1: Create the ServiceIcon component

**Files:**
- Create: `src/components/site/ServiceIcon.astro`

- [ ] **Step 1: Write the component**

Create `src/components/site/ServiceIcon.astro`:

```astro
---
export type ServiceIconName =
  | 'figmaToWebflow'
  | 'audit'
  | 'consult'
  | 'retainer'
  | 'upwork';

interface Props {
  name: ServiceIconName;
  size?: number;
  class?: string;
}

const { name, size = 24, class: className = '' } = Astro.props;
const attrs = {
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 1.75,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: className,
  'aria-hidden': 'true',
};
---
{name === 'figmaToWebflow' && (
  <svg {...attrs}>
    <rect x="2.5" y="4" width="7" height="16" rx="1.5" />
    <rect x="14.5" y="4" width="7" height="16" rx="1.5" />
    <path d="M9.5 12h5" />
    <path d="m12.5 9.5 2.5 2.5-2.5 2.5" />
  </svg>
)}
{name === 'audit' && (
  <svg {...attrs}>
    <path d="M5 3h8l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M13 3v4h4" />
    <path d="M6 11h6" />
    <circle cx="11" cy="15" r="2.5" />
    <path d="m13 17 2 2" />
  </svg>
)}
{name === 'consult' && (
  <svg {...attrs}>
    <path d="M4 11a8 8 0 1 1 3.2 6.4L3 19l1-4.2A8 8 0 0 1 4 11Z" />
    <path d="M12 8v3" />
    <path d="M10.5 11h3" />
    <path d="M11 14h2" />
  </svg>
)}
{name === 'retainer' && (
  <svg {...attrs}>
    <path d="M20 12a8 8 0 0 1-13.7 5.6" />
    <path d="M4 12a8 8 0 0 1 13.7-5.6" />
    <path d="m17 3 1 3.6L14.5 7" />
    <path d="m7 21-1-3.6L9.5 17" />
  </svg>
)}
{name === 'upwork' && (
  <svg {...attrs}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="m8 14 4-4 4 4" />
    <path d="M12 10v7" />
  </svg>
)}
```

- [ ] **Step 2: Verify the build still works**

Run: `pnpm build`
Expected: build succeeds. The component is not yet imported anywhere, so nothing changes on screen — this just confirms the file parses.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/ServiceIcon.astro
git commit -m "feat(services): add ServiceIcon component with 5 inline SVGs"
```

---

## Task 2: Extract the shared CtaBanner component

**Files:**
- Create: `src/components/layout/CtaBanner.astro`
- Modify: `src/pages/work/[slug].astro:170-194`

- [ ] **Step 1: Create `src/components/layout/CtaBanner.astro`**

```astro
---
import Section from './Section.astro';
import Container from './Container.astro';
import DisplayHeading from './DisplayHeading.astro';

interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

interface Props {
  heading: string;
  primary: Cta;
  secondary?: Cta;
  tone?: 'paper' | 'tint';
}

const { heading, primary, secondary, tone = 'paper' } = Astro.props;
---
<Section tone={tone} size="compact">
  <Container>
    <div class="rounded-xl bg-ink text-paper p-10 md:p-14 text-center">
      <DisplayHeading as="h2" size="md" class="text-paper">
        {heading}
      </DisplayHeading>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={primary.href}
          target={primary.external ? '_blank' : undefined}
          rel={primary.external ? 'noopener' : undefined}
          class="inline-flex h-11 items-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover transition-colors"
        >
          {primary.label}
        </a>
        {secondary && (
          <a
            href={secondary.href}
            target={secondary.external ? '_blank' : undefined}
            rel={secondary.external ? 'noopener' : undefined}
            class="inline-flex h-11 items-center rounded-[10px] border border-paper/40 px-5 font-medium text-paper hover:bg-paper/10 transition-colors"
          >
            {secondary.label}
          </a>
        )}
      </div>
    </div>
  </Container>
</Section>
```

- [ ] **Step 2: Migrate `src/pages/work/[slug].astro` to use it**

Replace lines 170–194 of `src/pages/work/[slug].astro`:

```astro
    <CtaBanner
      heading="Want something similar?"
      primary={{ label: 'Book a call', href: site.links.cal, external: true }}
      secondary={{ label: 'See more work', href: '/work' }}
    />
```

Also add the import near the top of that file alongside the existing imports:

```astro
import CtaBanner from '@/components/layout/CtaBanner.astro';
```

- [ ] **Step 3: Verify the build and run preview**

Run: `pnpm build && pnpm preview`
Expected: build succeeds. Open `http://localhost:4321/work/amply` and confirm the dark CTA block still renders identically to before.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/CtaBanner.astro src/pages/work/[slug].astro
git commit -m "refactor(work): extract CtaBanner for reuse on services pages"
```

---

## Task 3: Add the serviceLandings data file

**Files:**
- Create: `src/data/serviceLandings.ts`

- [ ] **Step 1: Write the file with full content for four dynamic services and a metadata-only Upwork entry**

Create `src/data/serviceLandings.ts`:

```ts
import { site } from './site';
import type { ServiceIconName } from '../components/site/ServiceIcon.astro';

export type ServiceLanding = {
  slug: string;
  name: string;
  tagline: string;
  icon: ServiceIconName;
  href: string;
  content?: {
    hero: { eyebrow: string; heading: string; sub: string };
    whoFor: string[];
    deliverables: { title: string; body: string }[];
    process: { step: string; body: string }[];
    pricingAnchor: {
      label: string;
      price: string;
      cadence: string;
      bullets: string[];
      cta: { label: string; href: string; external?: boolean };
    };
    faq: { q: string; a: string }[];
    keywords: string[];
  };
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: 'figma-to-webflow',
    name: 'Figma to Webflow Development',
    tagline: 'Pixel-perfect Webflow builds from your Figma files.',
    icon: 'figmaToWebflow',
    href: '/services/figma-to-webflow',
    content: {
      hero: {
        eyebrow: 'Service',
        heading: 'Figma to Webflow, built the way you designed it.',
        sub: 'Hand me your Figma file. You get a pixel-perfect, CMS-ready Webflow site that loads in under a second and ranks on day one.',
      },
      whoFor: [
        'Agencies who need a reliable Webflow partner for overflow work',
        'SaaS founders shipping a new marketing site from a Figma handoff',
        'In-house marketing teams whose designer shipped but the engineer never picked it up',
      ],
      deliverables: [
        {
          title: 'Pixel-accurate build',
          body: 'Every spacing, color, and type treatment matches your Figma within 2px. No drift, no shortcuts.',
        },
        {
          title: 'Reusable components',
          body: 'Symbols and style-guide components so your team can edit without my help. Proper nesting, not a flat soup.',
        },
        {
          title: 'CMS + dynamic pages',
          body: 'Blog, case studies, team, pricing — whatever needs to be editable ships with a Webflow CMS collection.',
        },
        {
          title: 'SEO + speed baked in',
          body: 'Semantic markup, schema, meta, sitemap, Lighthouse 95+, Core Web Vitals green. Not an upsell.',
        },
      ],
      process: [
        { step: 'Figma walkthrough', body: 'We review the file on Loom — I flag missing states, hover, empty, error screens before writing any code.' },
        { step: 'Style guide first', body: 'I build your color + type + component library in Webflow before any page layouts. Keeps the build consistent and fast.' },
        { step: 'Page-by-page build', body: 'Each page goes up on a staging link within 24–48 hours. You leave Loom feedback; I ship revisions same-day.' },
        { step: 'Launch checklist', body: 'SEO audit, 301s, schema, forms tested, analytics fired, Lighthouse run. The 40-item checklist every project clears.' },
      ],
      pricingAnchor: {
        label: 'Included in the monthly retainer',
        price: '$1,999',
        cadence: '/month',
        bullets: [
          'Unlimited Figma to Webflow builds',
          '48-hour turnaround, one request at a time',
          'Pause or cancel any time',
        ],
        cta: { label: 'Book a call', href: site.links.cal, external: true },
      },
      faq: [
        {
          q: 'What if my Figma file is incomplete?',
          a: 'Most are. I flag missing states (hover, empty, error, mobile) during the walkthrough and either fill them in for you or loop your designer back in. I will not start building until the file is build-ready.',
        },
        {
          q: 'How long does a typical Figma to Webflow build take?',
          a: 'A 5–10 page marketing site: 2–3 weeks. A 15–25 page site with CMS: 4–5 weeks. Retainer clients see 48-hour turnaround on individual pages.',
        },
        {
          q: 'Can you match any Figma design?',
          a: 'Within Webflow\'s platform limits, yes. Complex 3D, heavy canvas animation, or custom interactions that require real JS get a Lottie or custom-code workaround — I will flag these at the walkthrough, not mid-build.',
        },
        {
          q: 'Do you work with design systems?',
          a: 'Yes. I mirror your Figma variables as Webflow variables, build components that match your symbol structure, and document the library so your team can edit without me.',
        },
      ],
      keywords: [
        'figma to webflow',
        'figma to webflow developer',
        'convert figma to webflow',
        'figma to webflow conversion',
      ],
    },
  },
  {
    slug: 'webflow-audits',
    name: 'Webflow Audits',
    tagline: 'A deep review of your Webflow site with a fix roadmap.',
    icon: 'audit',
    href: '/services/webflow-audits',
    content: {
      hero: {
        eyebrow: 'Service',
        heading: 'Find out exactly what is wrong with your Webflow site.',
        sub: 'I audit your Webflow build against SEO, speed, accessibility, and structure. You get a prioritized Loom walkthrough and a written roadmap you can hand to any developer.',
      },
      whoFor: [
        'Teams whose Webflow site was built by someone else and is now slow or hard to edit',
        'Agencies inheriting a Webflow project and needing a second pair of eyes before committing',
        'Founders whose Lighthouse score dropped and cannot figure out why',
      ],
      deliverables: [
        {
          title: 'Technical SEO audit',
          body: 'Meta, schema, sitemap, robots, canonical, heading hierarchy, internal linking. Every issue mapped to a URL.',
        },
        {
          title: 'Core Web Vitals + Lighthouse',
          body: 'LCP, CLS, INP tested per template. Field data from CrUX where available. Concrete fixes ordered by impact.',
        },
        {
          title: 'Structure + CMS review',
          body: 'Component reuse, nesting, naming, CMS collection modeling. I flag where your team is fighting the system.',
        },
        {
          title: 'Loom walkthrough + written PDF',
          body: '30-minute Loom that walks every finding plus a shareable PDF checklist. Hand it to any Webflow dev.',
        },
      ],
      process: [
        { step: 'Intake form', body: 'You share staging + production URLs, access to GA + GSC (read-only), and the top 3 things you are worried about.' },
        { step: 'Automated passes', body: 'Lighthouse, PageSpeed Insights, Ahrefs site audit, WAVE accessibility. I capture the raw data before I form opinions.' },
        { step: 'Manual review', body: 'I walk every page, every CMS template, every interaction. Most issues are found here, not in the automated tools.' },
        { step: 'Delivery', body: 'You get the Loom + PDF within 5 business days. One async feedback round included. Optional: I implement the fixes on retainer.' },
      ],
      pricingAnchor: {
        label: 'Fixed-scope audit via Upwork',
        price: 'From $499',
        cadence: '/ one-off',
        bullets: [
          '5-business-day turnaround',
          'Loom walkthrough + written PDF',
          'Escrow via Upwork, one async feedback round',
        ],
        cta: { label: 'Hire on Upwork', href: site.links.upwork, external: true },
      },
      faq: [
        {
          q: 'What counts as a Webflow audit?',
          a: 'SEO, Core Web Vitals, accessibility, component structure, CMS modeling, publish workflow. Not: content strategy, keyword research, paid media. Pure technical review.',
        },
        {
          q: 'Can you fix what you find?',
          a: 'Yes, but on a separate engagement — either via the retainer or a follow-up Upwork job. I keep audit + implementation separate so the audit stays objective.',
        },
        {
          q: 'How long does the audit take?',
          a: '5 business days end-to-end. Rush to 2 business days for 50% surcharge, if I have the slot.',
        },
        {
          q: 'Do you audit sites that are not on Webflow?',
          a: 'No — Webflow only. The structural review is half the value, and it requires deep platform knowledge.',
        },
      ],
      keywords: [
        'webflow audit',
        'webflow site audit',
        'webflow seo audit',
        'webflow site review',
      ],
    },
  },
  {
    slug: 'webflow-consultations',
    name: 'Webflow Consultations',
    tagline: 'One-on-one sessions to unblock your Webflow project.',
    icon: 'consult',
    href: '/services/webflow-consultations',
    content: {
      hero: {
        eyebrow: 'Service',
        heading: 'Get unstuck on Webflow in a single session.',
        sub: 'Book a focused 60 or 90 minute call. I look at your specific problem, hand you a recorded walkthrough, and give you a written action plan.',
      },
      whoFor: [
        'In-house teams maintaining their own Webflow site who hit a structural wall',
        'Founders deciding whether to rebuild in Webflow, migrate away, or stay put',
        'Designers bridging to Webflow who need a sanity-check before handoff',
      ],
      deliverables: [
        {
          title: 'Live screen-share session',
          body: '60 or 90 minutes over Zoom or Meet. Your screen, your site, your questions. No slide decks.',
        },
        {
          title: 'Recorded walkthrough',
          body: 'The call itself plus a dedicated Loom summarizing what we covered and what to do next.',
        },
        {
          title: 'Written action plan',
          body: 'A prioritized 3–5 item list emailed within 24 hours. Each item has a concrete first step.',
        },
        {
          title: 'Follow-up Q&A',
          body: 'One week of async follow-up via email. For deeper implementation help, step up to the retainer.',
        },
      ],
      process: [
        { step: 'Prep form', body: 'You fill a 5-field brief: URL, top 3 questions, what success looks like, current stack, timeline.' },
        { step: 'Pre-read (me)', body: 'I spend 30 minutes in your site before the call. I arrive with hypotheses, not blank-slate questions.' },
        { step: 'The call', body: '60 or 90 focused minutes. I screen-share, you screen-share, we solve the actual problem together.' },
        { step: 'Summary + action plan', body: 'Loom + email within 24 hours. One async follow-up week included.' },
      ],
      pricingAnchor: {
        label: 'Single-session consultation',
        price: 'From $249',
        cadence: '/ 60 min',
        bullets: [
          '60 min ($249) or 90 min ($349)',
          'Pre-read + live session + 24h action plan',
          'One async follow-up week included',
        ],
        cta: { label: 'Book a call', href: site.links.cal, external: true },
      },
      faq: [
        {
          q: 'What can we cover in one session?',
          a: 'Most sessions land on one of: structural rebuild decision, CMS modeling, SEO migration strategy, performance triage, or handoff review. If we cannot fit it, I say so before you pay.',
        },
        {
          q: 'Can you just build the thing for me instead?',
          a: 'Yes — see the retainer or Figma-to-Webflow service. Consultations are for when advice unblocks you, not when you need hands-on-keyboard.',
        },
        {
          q: 'Do you sign NDAs?',
          a: 'Yes. Standard mutual NDA, returned signed within 24 hours.',
        },
        {
          q: 'How soon can we meet?',
          a: 'Usually within the week. Book a slot on Cal.com to see live availability.',
        },
      ],
      keywords: [
        'webflow consultant',
        'hire webflow consultant',
        'webflow consultation',
        'webflow expert advice',
      ],
    },
  },
  {
    slug: 'webflow-retainer',
    name: 'Webflow Retainer',
    tagline: 'Unlimited Webflow pages on a flat monthly subscription.',
    icon: 'retainer',
    href: '/services/webflow-retainer',
    content: {
      hero: {
        eyebrow: 'Service',
        heading: 'Your Webflow team, without the agency overhead.',
        sub: 'Flat $1,999 / month. Unlimited Webflow pages, one request at a time, 48-hour turnaround. Pause or cancel any time.',
      },
      whoFor: [
        'Agencies who need reliable Webflow overflow without managing a freelancer pool',
        'SaaS teams shipping marketing pages weekly — landings, blog, comparison, pricing tests',
        'In-house marketing teams whose backlog has outgrown a one-off engagement',
      ],
      deliverables: [
        {
          title: 'Unlimited Webflow pages',
          body: 'New landings, blog posts, CMS templates, A/B tests, migrations — as many as fit the one-at-a-time queue.',
        },
        {
          title: '48-hour turnaround',
          body: 'Submit a request in the morning, see a staging link within two business days. Most pages ship same-week.',
        },
        {
          title: 'Direct Slack channel',
          body: 'No tickets, no account manager. You ping, I respond within 4 business hours.',
        },
        {
          title: 'SEO + speed on every page',
          body: 'Every page ships with Lighthouse 95+, semantic markup, schema where relevant. Included, not upsold.',
        },
      ],
      process: [
        { step: 'Onboarding call', body: 'We walk your brand, component library, CMS, and the first 3 requests. 30 minutes on day one.' },
        { step: 'Request queue', body: 'You submit requests in a shared Trello / Linear / Notion board. One active at a time. Reorder anytime.' },
        { step: 'Build + staging', body: '48-hour turnaround per request. Staging link in Slack. One round of async feedback. Ship.' },
        { step: 'Monthly review', body: 'Once a month we review throughput, what is working, what to prioritize. Pause or cancel any time.' },
      ],
      pricingAnchor: {
        label: 'Monthly retainer',
        price: '$1,999',
        cadence: '/month',
        bullets: [
          'Unlimited pages, one request at a time',
          '48-hour turnaround, same-day for small edits',
          'Pause or cancel any time',
        ],
        cta: { label: 'Book a call', href: site.links.cal, external: true },
      },
      faq: [
        {
          q: 'What counts as "one request"?',
          a: 'A single deliverable with a clear scope — a landing page, a blog post, a CMS template, a migration chunk. If you are unsure, I tell you before we start.',
        },
        {
          q: 'Can I pause the retainer?',
          a: 'Yes, any time. Pause for a month, pause between sprints, pause for vacation. You pick back up where you left off.',
        },
        {
          q: 'What if I need two things at once?',
          a: 'Rare but possible with the 2-active-request tier at $2,999. Most teams do fine with one, because the 48-hour turnaround is fast enough.',
        },
        {
          q: 'Is there a minimum commitment?',
          a: 'No. Month-to-month. Most clients stay 4+ months; the fastest exit was 1 month (they got acquired).',
        },
      ],
      keywords: [
        'webflow retainer',
        'monthly webflow development',
        'webflow subscription',
        'webflow developer subscription',
      ],
    },
  },
  {
    slug: 'upwork',
    name: 'Hire me on Upwork',
    tagline: 'Escrow-backed hourly engagements via my Top-Rated Upwork profile.',
    icon: 'upwork',
    href: '/services/upwork',
    // No content block — the Upwork page is bespoke.
  },
];

export const getServiceLanding = (slug: string): ServiceLanding | undefined =>
  serviceLandings.find((s) => s.slug === slug);

export const getDynamicServiceLandings = (): ServiceLanding[] =>
  serviceLandings.filter((s) => s.content !== undefined);
```

- [ ] **Step 2: Verify the build**

Run: `pnpm build`
Expected: build succeeds. No output changes yet — the data file is unused.

- [ ] **Step 3: Commit**

```bash
git add src/data/serviceLandings.ts
git commit -m "feat(services): add serviceLandings data with 4 dynamic + 1 upwork entry"
```

---

## Task 4: Create the dynamic `[slug].astro` route

**Files:**
- Create: `src/pages/services/[slug].astro`

- [ ] **Step 1: Write the dynamic route**

Create `src/pages/services/[slug].astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import CtaBanner from '@/components/layout/CtaBanner.astro';
import FaqAccordion from '@/components/home/FaqAccordion';
import {
  getDynamicServiceLandings,
  type ServiceLanding,
} from '@/data/serviceLandings';
import { site } from '@/data/site';
import { Check } from 'lucide-react';

export function getStaticPaths() {
  return getDynamicServiceLandings().map((s) => ({
    params: { slug: s.slug },
    props: { service: s },
  }));
}

interface Props {
  service: ServiceLanding;
}

const { service } = Astro.props;
const { content } = service;
if (!content) throw new Error(`Service ${service.slug} is missing content`);

const pageTitle = `${service.name} — Mahade Walid`;
const pageDescription = service.tagline;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.tagline,
  provider: { '@type': 'Person', name: site.name, url: site.url },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: `${site.url}${service.href}`,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services/${service.slug}` },
    { '@type': 'ListItem', position: 3, name: service.name, item: `${site.url}${service.href}` },
  ],
};
---
<Layout title={pageTitle} description={pageDescription}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>

  <Section size="hero" tone="paper">
    <Container>
      <nav class="text-body-sm text-ink-subtle" aria-label="Breadcrumb">
        <a href="/" class="hover:text-ink transition-colors">Home</a>
        <span aria-hidden="true"> / </span>
        <span class="text-ink-muted">Services</span>
        <span aria-hidden="true"> / </span>
        <span class="text-ink-muted">{service.name}</span>
      </nav>

      <div class="mt-8 max-w-3xl">
        <Eyebrow>{content.hero.eyebrow}</Eyebrow>
        <DisplayHeading as="h1" size="xl" class="mt-3">
          {content.hero.heading}
        </DisplayHeading>
        <p class="mt-6 text-body-lg text-ink-muted">
          {content.hero.sub}
        </p>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href={site.links.cal}
          target="_blank"
          rel="noopener"
          class="inline-flex h-11 items-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover transition-colors"
        >
          Book a call
        </a>
        <a
          href="/work"
          class="inline-flex h-11 items-center rounded-[10px] border border-line-strong px-5 font-medium text-ink hover:bg-paper-tint transition-colors"
        >
          See the work
        </a>
      </div>
    </Container>
  </Section>

  <Section tone="tint" size="compact">
    <Container>
      <Eyebrow>Who it is for</Eyebrow>
      <ul class="mt-6 grid gap-4 md:grid-cols-3">
        {content.whoFor.map((item) => (
          <li class="rounded-lg border border-line bg-paper p-6 text-ink">
            {item}
          </li>
        ))}
      </ul>
    </Container>
  </Section>

  <Section tone="paper">
    <Container>
      <Eyebrow>What you get</Eyebrow>
      <h2 class="mt-3 text-display-md text-ink max-w-2xl">
        Everything in scope, nothing upsold.
      </h2>
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        {content.deliverables.map((d) => (
          <div class="rounded-lg border border-line bg-paper p-6 md:p-8">
            <h3 class="text-heading-md text-ink">{d.title}</h3>
            <p class="mt-2 text-ink-muted">{d.body}</p>
          </div>
        ))}
      </div>
    </Container>
  </Section>

  <Section tone="tint">
    <Container>
      <Eyebrow>Process</Eyebrow>
      <h2 class="mt-3 text-display-md text-ink max-w-2xl">
        How this actually runs.
      </h2>
      <ol class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.process.map((step, i) => (
          <li class="rounded-lg border border-line bg-paper p-6 md:p-8">
            <span class="text-display-md text-brand font-display block leading-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 class="mt-4 text-heading-md text-ink">{step.step}</h3>
            <p class="mt-2 text-ink-muted text-body-sm">{step.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  </Section>

  <Section tone="paper">
    <Container>
      <Eyebrow>Pricing</Eyebrow>
      <div class="mt-8 max-w-xl rounded-xl border border-line bg-paper p-8 md:p-10">
        <p class="text-eyebrow text-ink-muted">{content.pricingAnchor.label}</p>
        <div class="mt-4 flex items-baseline gap-1">
          <span class="text-display-md font-display text-ink">{content.pricingAnchor.price}</span>
          <span class="text-ink-muted">{content.pricingAnchor.cadence}</span>
        </div>
        <ul class="mt-6 space-y-3">
          {content.pricingAnchor.bullets.map((b) => (
            <li class="flex gap-3">
              <Check size={18} strokeWidth={2.5} className="text-brand flex-shrink-0 mt-0.5" />
              <span class="text-ink">{b}</span>
            </li>
          ))}
        </ul>
        <a
          href={content.pricingAnchor.cta.href}
          target={content.pricingAnchor.cta.external ? '_blank' : undefined}
          rel={content.pricingAnchor.cta.external ? 'noopener' : undefined}
          class="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-ink text-paper font-medium hover:-translate-y-0.5 transition-transform"
        >
          {content.pricingAnchor.cta.label}
        </a>
      </div>
    </Container>
  </Section>

  <Section tone="tint">
    <Container width="prose">
      <Eyebrow>FAQ</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3 mb-8">
        Questions this service gets
      </DisplayHeading>
      <FaqAccordion items={content.faq} client:visible />
    </Container>
  </Section>

  <CtaBanner
    heading={`Ready to start ${service.name.toLowerCase()}?`}
    primary={{ label: 'Book a call', href: site.links.cal, external: true }}
    secondary={{ label: 'Hire on Upwork', href: site.links.upwork, external: true }}
  />
</Layout>
```

- [ ] **Step 2: Build and spot-check**

Run: `pnpm build`
Expected: build emits `/services/figma-to-webflow/index.html`, `/services/webflow-audits/index.html`, `/services/webflow-consultations/index.html`, `/services/webflow-retainer/index.html`.

Then: `pnpm preview`
Open each of the four URLs. Verify: hero heading renders, all seven sections render, FAQ accordion expands/collapses, the two CTAs at the bottom go to Cal and Upwork.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services/[slug].astro
git commit -m "feat(services): add dynamic [slug] route for 4 core services"
```

---

## Task 5: Create the bespoke Upwork page

**Files:**
- Modify: `src/data/testimonials.ts` (add optional `upwork` flag)
- Create: `src/pages/services/upwork.astro`

- [ ] **Step 1: Extend the Testimonial type**

Replace the full contents of `src/data/testimonials.ts`:

```ts
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  /** Surfaced on the Upwork landing page when true. */
  upwork?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'He took a detailed mock up and put it in place perfectly at a reasonable cost and did so quickly.',
    author: 'Daniel Garcia',
    role: 'Cloud Architect',
    upwork: true,
  },
  // TODO: collect 3-5 more from past clients.
];
```

- [ ] **Step 2: Write the Upwork page**

Create `src/pages/services/upwork.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import CtaBanner from '@/components/layout/CtaBanner.astro';
import ServiceIcon from '@/components/site/ServiceIcon.astro';
import { site } from '@/data/site';
import { testimonials } from '@/data/testimonials';
import { getDynamicServiceLandings } from '@/data/serviceLandings';
import { ArrowUpRight } from 'lucide-react';

// TODO: fill from Upwork profile before launch.
const stats = [
  { label: 'Jobs completed', value: 'TBD' },
  { label: 'Hours worked', value: 'TBD' },
  { label: 'Total earnings', value: 'TBD' },
  { label: 'Job Success Score', value: 'TBD' },
];

const badges = ['Top-Rated', 'Job Success', 'Rising Talent'];

const upworkReviews = testimonials.filter((t) => t.upwork);
const crossLinkServices = getDynamicServiceLandings();

const title = 'Hire me on Upwork — Mahade Walid';
const description =
  'Top-Rated Webflow developer on Upwork. Escrow-backed hourly engagements with weekly time reports and no minimum commitment.';
---
<Layout title={title} description={description}>
  <Section size="hero" tone="paper">
    <Container>
      <nav class="text-body-sm text-ink-subtle" aria-label="Breadcrumb">
        <a href="/" class="hover:text-ink transition-colors">Home</a>
        <span aria-hidden="true"> / </span>
        <span class="text-ink-muted">Services</span>
        <span aria-hidden="true"> / </span>
        <span class="text-ink-muted">Upwork</span>
      </nav>

      <div class="mt-8 max-w-3xl">
        <Eyebrow>Hire me on Upwork</Eyebrow>
        <DisplayHeading as="h1" size="xl" class="mt-3">
          Escrow-backed Webflow work, through a Top-Rated profile.
        </DisplayHeading>
        <p class="mt-6 text-body-lg text-ink-muted">
          If you prefer to engage through Upwork — whether for procurement, escrow, or just the comfort of a platform you already use — my Top-Rated profile is open to scoped engagements at an hourly rate.
        </p>
      </div>

      <div class="mt-8 flex flex-wrap gap-2">
        {badges.map((b) => (
          <span class="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
            {b}
          </span>
        ))}
      </div>

      <a
        href={site.links.upwork}
        target="_blank"
        rel="noopener"
        class="mt-8 inline-flex h-11 items-center gap-2 rounded-[10px] bg-ink px-5 font-medium text-paper hover:-translate-y-0.5 transition-transform"
      >
        View Upwork profile
        <ArrowUpRight size={18} strokeWidth={2} />
      </a>
    </Container>
  </Section>

  <Section tone="tint" size="compact">
    <Container>
      <Eyebrow>Upwork track record</Eyebrow>
      <dl class="mt-6 grid gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div>
            <dt class="text-body-sm text-ink-muted">{s.label}</dt>
            <dd class="mt-1 text-display-md text-ink font-display">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  </Section>

  {upworkReviews.length > 0 && (
    <Section tone="paper">
      <Container>
        <Eyebrow>Selected reviews</Eyebrow>
        <DisplayHeading as="h2" size="lg" class="mt-3">
          What Upwork clients say
        </DisplayHeading>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          {upworkReviews.map((r) => (
            <figure class="rounded-lg border border-line bg-paper p-6 md:p-8">
              <blockquote class="text-body-lg text-ink">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption class="mt-4 text-body-sm text-ink-muted">
                <span class="font-medium text-ink">{r.author}</span>
                <span aria-hidden="true"> · </span>
                {r.role}{r.company ? `, ${r.company}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )}

  <Section tone="tint">
    <Container>
      <Eyebrow>What you can hire me for</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">
        Four common Upwork engagements
      </DisplayHeading>
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        {crossLinkServices.map((svc) => (
          <a
            href={svc.href}
            class="group flex items-start gap-5 rounded-lg border border-line bg-paper p-6 md:p-8 hover:border-line-strong transition-colors"
          >
            <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <ServiceIcon name={svc.icon} size={24} />
            </span>
            <span>
              <h3 class="text-heading-md text-ink">{svc.name}</h3>
              <p class="mt-2 text-ink-muted">{svc.tagline}</p>
              <span class="mt-4 inline-flex items-center gap-2 text-brand font-medium group-hover:gap-3 transition-all">
                Read more <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </Container>
  </Section>

  <CtaBanner
    heading="Ready to start on Upwork?"
    primary={{ label: 'View Upwork profile', href: site.links.upwork, external: true }}
    secondary={{ label: 'Book a call first', href: site.links.cal, external: true }}
  />
</Layout>
```

- [ ] **Step 3: Verify the build**

Run: `pnpm build`
Expected: build emits `/services/upwork/index.html`. In `pnpm preview`, confirm:
- Hero renders with the three badge pills
- Stats strip shows 4 TBD values
- Review section shows the existing Daniel Garcia quote
- Cross-link grid shows 4 service cards with the custom SVG icons
- CTA banner renders at the bottom

- [ ] **Step 4: Commit**

```bash
git add src/data/testimonials.ts src/pages/services/upwork.astro
git commit -m "feat(services): add bespoke Upwork landing page"
```

---

## Task 6: Build the ServicesMenu megamenu component

**Files:**
- Create: `src/components/site/ServicesMenu.astro`

- [ ] **Step 1: Write the component**

Create `src/components/site/ServicesMenu.astro`:

```astro
---
import ServiceIcon from './ServiceIcon.astro';
import { serviceLandings } from '@/data/serviceLandings';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const pathname = Astro.url.pathname;
const isActive = pathname.startsWith('/services');
---
<div class="services-menu relative" data-services-menu>
  <button
    type="button"
    class:list={[
      'services-menu__trigger inline-flex items-center gap-1 text-sm transition-colors',
      isActive ? 'text-ink font-medium' : 'text-ink-muted hover:text-ink',
    ]}
    aria-haspopup="menu"
    aria-expanded="false"
    aria-controls="services-menu-panel"
  >
    Services
    <ChevronDown size={14} strokeWidth={2} className="services-menu__chevron transition-transform" />
  </button>

  <div
    id="services-menu-panel"
    class="services-menu__panel absolute left-0 top-full mt-2 w-[480px] max-w-[calc(100vw-3rem)] rounded-lg border border-line-strong bg-paper p-2"
    role="menu"
  >
    {serviceLandings.map((svc, i) => {
      const isLast = svc.slug === 'upwork';
      return (
        <>
          {isLast && (
            <div class="my-1 border-t border-line" aria-hidden="true" />
          )}
          <a
            href={svc.href}
            class="services-menu__row group flex items-start gap-4 rounded-md p-3 hover:bg-paper-tint transition-colors"
            role="menuitem"
          >
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-colors">
              <ServiceIcon name={svc.icon} size={20} />
            </span>
            <span class="flex-1 min-w-0">
              <span class="flex items-center gap-1.5 text-body-sm font-medium text-ink">
                {svc.name}
                {isLast && (
                  <ArrowUpRight size={14} strokeWidth={2} className="text-ink-muted" />
                )}
              </span>
              <span class="mt-0.5 block text-body-sm text-ink-muted">
                {svc.tagline}
              </span>
            </span>
          </a>
        </>
      );
    })}
  </div>
</div>

<style>
  .services-menu__panel {
    display: none;
    z-index: 50;
  }

  /* Open on hover (pointer users) */
  @media (hover: hover) {
    .services-menu:hover .services-menu__panel {
      display: block;
    }
    .services-menu:hover .services-menu__chevron {
      transform: rotate(180deg);
    }
  }

  /* Open on keyboard focus */
  .services-menu:focus-within .services-menu__panel {
    display: block;
  }
  .services-menu:focus-within .services-menu__chevron {
    transform: rotate(180deg);
  }

  /* Open via JS toggle (click users) */
  .services-menu.is-open .services-menu__panel {
    display: block;
  }
  .services-menu.is-open .services-menu__chevron {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .services-menu__chevron {
      transition: none;
    }
  }
</style>

<script>
  const menus = document.querySelectorAll<HTMLElement>('[data-services-menu]');
  menus.forEach((menu) => {
    const trigger = menu.querySelector<HTMLButtonElement>('.services-menu__trigger');
    if (!trigger) return;

    const close = () => {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    const toggle = (e: MouseEvent) => {
      e.preventDefault();
      const open = menu.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    trigger.addEventListener('click', toggle);

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target as Node)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });
  });
</script>
```

- [ ] **Step 2: Verify the build**

Run: `pnpm build`
Expected: build succeeds. Component is not yet wired into Header, so no visual change.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/ServicesMenu.astro
git commit -m "feat(services): add CSS-first ServicesMenu megamenu component"
```

---

## Task 7: Wire the megamenu into the site header

**Files:**
- Modify: `src/components/site/Header.astro`

- [ ] **Step 1: Replace the Header contents**

Replace the full contents of `src/components/site/Header.astro`:

```astro
---
import Container from '../layout/Container.astro';
import ServicesMenu from './ServicesMenu.astro';
import { site } from '@/data/site';

const nav = [
  { label: 'Work', href: '/work' },
  // Services is rendered as a megamenu, not a plain link — inserted below.
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const pathname = Astro.url.pathname;
const isActive = (href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);
---
<header class="sticky top-0 z-40 bg-paper/80 backdrop-blur border-b border-line">
  <Container>
    <div class="flex h-16 items-center justify-between">
      <a href="/" class="font-semibold tracking-tight text-ink hover:text-brand transition-colors">
        {site.name}
      </a>

      <nav class="flex items-center gap-6 md:gap-8" aria-label="Primary">
        <ul class="hidden md:flex items-center gap-8">
          <li>
            <a
              href="/work"
              class:list={[
                'text-sm transition-colors',
                isActive('/work')
                  ? 'text-ink font-medium'
                  : 'text-ink-muted hover:text-ink',
              ]}
            >
              Work
            </a>
          </li>
          <li><ServicesMenu /></li>
          {nav
            .filter((item) => item.label !== 'Work')
            .map((item) => (
              <li>
                <a
                  href={item.href}
                  class:list={[
                    'text-sm transition-colors',
                    isActive(item.href)
                      ? 'text-ink font-medium'
                      : 'text-ink-muted hover:text-ink',
                  ]}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>

        <a
          href={site.links.cal}
          target="_blank"
          rel="noopener"
          class="inline-flex h-9 items-center rounded-[10px] bg-brand px-4 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
        >
          Book a call
        </a>
      </nav>
    </div>
  </Container>
</header>
```

- [ ] **Step 2: Verify in the browser**

Run: `pnpm build && pnpm preview`
Open `http://localhost:4321`. Verify:
- Header shows `Work · Services · Tools · About · Blog · Contact` in that order
- Hover over "Services" → panel opens below with all 5 rows
- Each row shows its custom SVG icon, name, and tagline
- The Upwork row has a divider above it and a small external-link glyph
- Click "Services" → panel toggles (class-based)
- Tab into "Services" → panel stays open on focus
- Press Escape → panel closes, focus returns to the trigger
- Navigate to `/services/figma-to-webflow` → "Services" trigger is highlighted as active

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Header.astro
git commit -m "feat(services): wire ServicesMenu into the site header"
```

---

## Task 8: Rewire the Footer "Services" column

**Files:**
- Modify: `src/components/site/Footer.astro:13-22`

- [ ] **Step 1: Replace the Services column entries**

In `src/components/site/Footer.astro`, replace the `Services` column block (currently lines 13–22) with:

```astro
  {
    heading: 'Services',
    links: [
      { label: 'Figma to Webflow', href: '/services/figma-to-webflow' },
      { label: 'Webflow audits', href: '/services/webflow-audits' },
      { label: 'Webflow consultations', href: '/services/webflow-consultations' },
      { label: 'Webflow retainer', href: '/services/webflow-retainer' },
      { label: 'Hire on Upwork', href: '/services/upwork' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
```

- [ ] **Step 2: Verify**

Run: `pnpm build && pnpm preview`
Open any page. Scroll to the footer. Verify the Services column now lists the five service pages plus Pricing, and every link navigates correctly.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Footer.astro
git commit -m "feat(services): rewire Footer Services column to new routes"
```

---

## Task 9: End-to-end verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `pnpm build`
Expected:
- Build succeeds with no warnings beyond existing baseline
- `dist/services/figma-to-webflow/index.html` exists
- `dist/services/webflow-audits/index.html` exists
- `dist/services/webflow-consultations/index.html` exists
- `dist/services/webflow-retainer/index.html` exists
- `dist/services/upwork/index.html` exists
- `dist/sitemap-index.xml` includes all five new URLs

Verify with:
```bash
ls dist/services/
grep -c 'services/' dist/sitemap-0.xml
```
Second command should return `5` (or higher if other routes mention `/services/` — inspect manually if so).

- [ ] **Step 2: Keyboard + mouse walkthrough in preview**

Run: `pnpm preview`

Walk through each of these on the homepage `http://localhost:4321/`:
- Mouse-hover "Services" → panel opens
- Mouse-click "Services" → panel toggles
- Click outside → panel closes
- Tab from "Work" → "Services" gets focus, panel opens via `:focus-within`
- Shift-Tab out → panel closes
- Escape with panel open → panel closes, focus stays on trigger
- Click "Figma to Webflow Development" row → lands on `/services/figma-to-webflow`
- Click "Hire me on Upwork" row → lands on `/services/upwork` (internal, not the external profile)

Walk through each of the five service pages:
- Hero, Who-it's-for, What-you-get, Process, Pricing, FAQ, CTA all render
- FAQ accordion expands and collapses
- Footer Services column links all work
- Breadcrumb trail is correct

- [ ] **Step 3: Lighthouse spot check**

In `pnpm preview`, run Lighthouse (Chrome DevTools → Lighthouse tab) against `http://localhost:4321/services/figma-to-webflow`.
Expected: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
If any category drops below 95, open an issue for follow-up but do not block the merge — this is the same bar the rest of the site holds.

- [ ] **Step 4: Final commit marker (optional)**

If any small fixes were made during verification, commit them now:
```bash
git status
git add -p
git commit -m "fix(services): verification-pass tweaks"
```
Otherwise skip.

---

## Spec coverage check

Mapping each spec section to the task that implements it:

| Spec section | Task |
|---|---|
| `ServiceLanding` type + `serviceLandings` array | Task 3 |
| Dynamic `/services/[slug]` route | Task 4 |
| Bespoke `/services/upwork` page | Task 5 |
| Seven-section template (Hero / Who for / Deliverables / Process / Pricing / FAQ / CTA) | Task 4 |
| Upwork page five sections + stats TBD + cross-links | Task 5 |
| `ServicesMenu.astro` CSS-first megamenu with hover / focus-within / click / Escape | Tasks 6–7 |
| `ServiceIcon.astro` — 5 custom SVGs | Task 1 |
| `CtaBanner.astro` refactor | Task 2 |
| Footer rewire | Task 8 |
| `Service` + `BreadcrumbList` JSON-LD | Task 4 |
| Build + manual verification | Task 9 |

All spec sections are accounted for.
