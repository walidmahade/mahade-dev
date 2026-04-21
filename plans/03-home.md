# 03 — Homepage

Build `src/pages/index.astro` with 9 sections, each in its own component file. Add a single GSAP motion island.

## Files created

```
src/
├── pages/
│   └── index.astro
├── components/
│   └── home/
│       ├── Hero.astro
│       ├── TrustBar.astro
│       ├── Services.astro
│       ├── FeaturedWork.astro
│       ├── Process.astro
│       ├── Pricing.astro
│       ├── Testimonial.astro
│       ├── Faq.astro
│       ├── FinalCta.astro
│       └── HomeMotion.tsx    # GSAP island, client:load
└── data/
    ├── services.ts
    ├── process.ts
    ├── pricing.ts
    ├── testimonials.ts
    ├── projects.ts
    └── faq.ts
```

## Copy (canonical source)

Copy lives in data files so it's easy to revise. Don't inline strings in components beyond structural markup.

### `src/data/services.ts`

```ts
export type Service = { title: string; body: string; icon: string };

export const services: Service[] = [
  {
    title: 'Webflow Development',
    body: 'Pixel-perfect builds from your Figma designs. Clean structure, reusable components, CMS-ready.',
    icon: 'layers',
  },
  {
    title: 'SEO Optimization',
    body: 'Technical SEO baked in: semantic markup, meta, schema, sitemaps, Core Web Vitals.',
    icon: 'search',
  },
  {
    title: 'Speed Optimization',
    body: 'Lighthouse 95+ builds. Image optimization, lazy loading, critical CSS, zero layout shift.',
    icon: 'zap',
  },
  {
    title: 'Maintenance & Support',
    body: 'Ongoing updates, new pages, A/B tests, bug fixes. One flat monthly rate.',
    icon: 'wrench',
  },
];
```

### `src/data/process.ts`

```ts
export type ProcessStep = { num: string; title: string; body: string };

export const process: ProcessStep[] = [
  { num: '01', title: 'Discovery',
    body: 'Kick-off call to align on scope, goals, brand, and deadline. I send back a written brief within 24 hours.' },
  { num: '02', title: 'Design handoff',
    body: 'You send Figma. I map components, flag edge cases, and propose CMS structure before writing a line of code.' },
  { num: '03', title: 'Build',
    body: 'Daily Loom updates on a staging URL. Responsive from day one. You review and comment asynchronously.' },
  { num: '04', title: 'Launch',
    body: 'DNS cutover, SEO check, analytics wiring, post-launch monitoring for a week. Then into retainer.' },
];
```

### `src/data/pricing.ts`

```ts
export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const pricing: PricingTier[] = [
  {
    name: 'Retainer',
    price: '$1,999',
    cadence: '/month',
    description: 'Unlimited Webflow pages for agencies and teams shipping often.',
    features: [
      'Unlimited pages per month',
      'One request at a time, 48h turnaround',
      'Pause or cancel any time',
      'SEO + speed optimization included',
      'Direct Slack channel',
    ],
    cta: { label: 'Book a call', href: 'https://cal.com/mahade/30min' },
    featured: true,
  },
  {
    name: 'Hourly',
    price: 'From $__', // TODO: user fills hourly rate before launch
    cadence: '/hour',
    description: 'Scoped one-off projects billed by the hour through Upwork.',
    features: [
      'Fixed-scope engagements',
      'Escrow via Upwork',
      'Weekly time reports',
      'No minimum commitment',
    ],
    cta: { label: 'Hire on Upwork', href: 'https://www.upwork.com/freelancers/~01ed6a4d8e51dc09fc?mp_source=share' },
  },
];
```

### `src/data/testimonials.ts`

```ts
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: 'He took a detailed mock up and put it in place perfectly at a reasonable cost and did so quickly.',
    author: 'Daniel Garcia',
    role: 'Cloud Architect',
  },
  // TODO: collect 3-5 more from past clients
];
```

### `src/data/projects.ts`

```ts
export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: number;
  liveUrl: string;
  description: string;
  heroImage: string;            // /images/projects/amply-hero.webp
  screenshots: string[];        // additional images for case study
  tags: string[];
  featured: boolean;
  // Case study content
  problem?: string;
  approach?: string;
  results?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: 'amply',
    name: 'Amply',
    industry: 'SaaS',
    year: 2024,
    liveUrl: 'https://joinamply.com',
    description:
      'Marketing site build for Amply, a creator monetization platform. Built on Webflow with a custom CMS structure for blog and case studies.',
    heroImage: '/images/projects/amply-hero.webp',
    screenshots: [
      '/images/projects/amply-1.webp',
      '/images/projects/amply-2.webp',
      '/images/projects/amply-3.webp',
    ],
    tags: ['Webflow', 'CMS', 'SaaS', 'Marketing site'],
    featured: true,
    problem:
      'Amply was scaling fast and needed a marketing site that could grow with the product — frequent blog posts, new feature pages, and fast experimentation without engineering bottlenecks.',
    approach:
      'Built a component-driven Webflow site with a flexible CMS for blog, team, and case studies. Pre-wired SEO, schema, and a modular hero system so the team can launch new pages in hours, not days.',
    results: [
      { label: 'Lighthouse', value: '98 / 100' },
      { label: 'Pages shipped in first month', value: '12' },
      { label: 'Handoff to marketing', value: 'Week 3' },
    ],
  },
];
```

### `src/data/faq.ts`

```ts
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  { q: 'How long does a typical project take?',
    a: 'A standard marketing site (5–10 pages) takes 2–3 weeks from Figma to launch. Retainer work turns around in 48 hours per request.' },
  { q: 'Do you work with agencies or direct clients?',
    a: 'Both. Agencies appreciate the white-label workflow and flat retainer. Direct clients get end-to-end ownership from discovery to launch.' },
  { q: 'What is included in the $1,999/mo retainer?',
    a: 'Unlimited Webflow pages, one request at a time with 48-hour turnaround, SEO and speed optimization on everything I build, and a direct Slack channel. Pause or cancel any time.' },
  { q: 'Can you migrate an existing site to Webflow?',
    a: 'Yes. Common migrations: WordPress, Squarespace, and Framer. I preserve SEO (redirects, schema, meta) and usually see a speed lift post-migration.' },
  { q: 'Do you handle SEO and speed optimization?',
    a: 'Yes — both are part of every build, not add-ons. Targets: Lighthouse 95+ and Core Web Vitals all green on launch.' },
  { q: 'What timezone do you work in?',
    a: 'Bangladesh (UTC+6). I keep 4–5 hours of overlap with US time and full overlap with EU. Async-first, Slack/Loom-friendly.' },
];
```

## Components

### Hero

`src/components/home/Hero.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { site } from '@/data/site';
import { Button } from '@/components/ui/button';
---
<Section size="hero" tone="paper" class="relative overflow-hidden">
  <!-- subtle gradient accent -->
  <div aria-hidden="true"
       class="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-brand-soft to-transparent opacity-60">
  </div>
  <Container>
    <div class="flex flex-col items-center text-center gap-6" data-hero>
      <Eyebrow data-hero-item>Webflow Developer · Available for projects</Eyebrow>
      <DisplayHeading as="h1" size="xl" class="max-w-4xl" data-hero-item>
        Launch faster with <em class="not-italic text-brand">professional Webflow</em> development
      </DisplayHeading>
      <p class="text-body-lg text-ink-muted max-w-2xl" data-hero-item>
        Scale your agency without hiring full-time developers. One flat monthly rate for unlimited pages — or hire by the hour through Upwork.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2" data-hero-item>
        <a href={site.links.cal} target="_blank" rel="noopener">
          <Button size="lg" client:load>Book a 30-min call</Button>
        </a>
        <a href="/work" class="inline-flex h-12 items-center rounded-[10px] border border-line-strong px-6 text-base font-medium text-ink hover:bg-paper-tint transition-colors">
          View work
        </a>
      </div>
    </div>
  </Container>
</Section>
```

### TrustBar

Shows the 12 client names as plain type (no logos needed yet).

`src/components/home/TrustBar.astro`:

```astro
---
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';

const clients = [
  'Amply', 'Gartnerforbundet', 'Tixio', 'AI-Suitup', 'Ads by Joris',
  'Tangerine Search', 'Bidder', 'Vadio', 'Trez', 'Charly Agency', 'Pretakst',
];
---
<div class="border-y border-line bg-paper py-10">
  <Container>
    <Eyebrow class="text-center mb-6">Teams I have built for</Eyebrow>
    <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {clients.map((c) => (
        <li class="text-ink-subtle font-medium tracking-tight">{c}</li>
      ))}
    </ul>
  </Container>
</div>
```

### Services

`src/components/home/Services.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { services } from '@/data/services';
import { Card } from '@/components/ui/card';
---
<Section tone="paper" id="services">
  <Container>
    <div class="max-w-2xl mb-12">
      <Eyebrow>Services</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">
        Everything you need, under one retainer
      </DisplayHeading>
    </div>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-reveal>
      {services.map((s) => (
        <div class="rounded-lg border border-line bg-paper p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-heading-md text-ink">{s.title}</h3>
          <p class="mt-3 text-ink-muted">{s.body}</p>
        </div>
      ))}
    </div>
  </Container>
</Section>
```

### FeaturedWork

`src/components/home/FeaturedWork.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { projects } from '@/data/projects';
import { Image } from 'astro:assets';

const featured = projects.filter((p) => p.featured)[0];
---
<Section tone="tint" id="work">
  <Container>
    <div class="max-w-2xl mb-12">
      <Eyebrow>Featured work</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">Recent case study</DisplayHeading>
    </div>

    <a href={`/work/${featured.slug}`}
       class="group block rounded-xl border border-line bg-paper overflow-hidden shadow-sm hover:shadow-md transition-shadow"
       data-reveal>
      <div class="aspect-[16/10] overflow-hidden bg-paper-sunken">
        <img src={featured.heroImage} alt={`${featured.name} case study`}
             class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
      </div>
      <div class="p-8 md:p-10">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          {featured.tags.map((t) => (
            <span class="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">{t}</span>
          ))}
        </div>
        <h3 class="text-display-md text-ink">{featured.name}</h3>
        <p class="mt-3 max-w-2xl text-body-lg text-ink-muted">{featured.description}</p>
        <div class="mt-6 inline-flex items-center gap-2 text-brand font-medium">
          Read case study <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  </Container>
</Section>
```

### Process

Horizontal 4-step. `src/components/home/Process.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { process } from '@/data/process';
---
<Section tone="paper" id="process">
  <Container>
    <div class="max-w-2xl mb-12">
      <Eyebrow>Process</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">How projects actually run</DisplayHeading>
    </div>
    <ol class="grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-reveal>
      {process.map((step) => (
        <li class="rounded-lg border border-line bg-paper p-6 md:p-8">
          <span class="text-display-md text-brand font-display">{step.num}</span>
          <h3 class="mt-3 text-heading-md">{step.title}</h3>
          <p class="mt-2 text-ink-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  </Container>
</Section>
```

### Pricing

`src/components/home/Pricing.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { pricing } from '@/data/pricing';
---
<Section tone="tint" id="pricing">
  <Container>
    <div class="max-w-2xl mb-12">
      <Eyebrow>Pricing</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">Transparent, no surprises</DisplayHeading>
    </div>
    <div class="grid gap-6 md:grid-cols-2 max-w-4xl" data-reveal>
      {pricing.map((tier) => (
        <div class={`rounded-xl p-8 md:p-10 ${tier.featured ? 'bg-ink text-paper ring-1 ring-ink' : 'bg-paper border border-line'}`}>
          <p class={`text-eyebrow ${tier.featured ? 'text-brand-soft' : 'text-ink-muted'}`}>
            {tier.name}{tier.featured ? ' · Most popular' : ''}
          </p>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-display-md">{tier.price}</span>
            <span class={tier.featured ? 'text-paper/70' : 'text-ink-muted'}>{tier.cadence}</span>
          </div>
          <p class={`mt-4 ${tier.featured ? 'text-paper/80' : 'text-ink-muted'}`}>{tier.description}</p>
          <ul class="mt-6 space-y-3">
            {tier.features.map((f) => (
              <li class="flex gap-2">
                <span aria-hidden="true" class={tier.featured ? 'text-brand-soft' : 'text-brand'}>✓</span>
                <span class={tier.featured ? 'text-paper/90' : 'text-ink'}>{f}</span>
              </li>
            ))}
          </ul>
          <a href={tier.cta.href} target="_blank" rel="noopener"
             class={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-[10px] font-medium transition-colors
                     ${tier.featured ? 'bg-brand text-white hover:bg-brand-hover' : 'border border-ink text-ink hover:bg-paper-tint'}`}>
            {tier.cta.label}
          </a>
        </div>
      ))}
    </div>
  </Container>
</Section>
```

### Testimonial

`src/components/home/Testimonial.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import { testimonials } from '@/data/testimonials';

const t = testimonials[0];
---
<Section tone="paper">
  <Container width="prose">
    <figure class="text-center" data-reveal>
      <span aria-hidden="true" class="text-display-xl font-display text-brand leading-none block">&ldquo;</span>
      <blockquote class="text-display-md text-ink leading-snug -mt-6">
        {t.quote}
      </blockquote>
      <figcaption class="mt-6 text-ink-muted">
        <span class="font-semibold text-ink">{t.author}</span> · {t.role}
      </figcaption>
    </figure>
  </Container>
</Section>
```

### FAQ

Use shadcn Accordion. `src/components/home/Faq.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import Eyebrow from '../layout/Eyebrow.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { faq } from '@/data/faq';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
---
<Section tone="tint" id="faq">
  <Container width="prose">
    <div class="mb-10">
      <Eyebrow>FAQ</Eyebrow>
      <DisplayHeading as="h2" size="lg" class="mt-3">Questions I get a lot</DisplayHeading>
    </div>
    <Accordion type="single" collapsible client:load>
      {faq.map((item, i) => (
        <AccordionItem value={`q-${i}`} class="border-line">
          <AccordionTrigger class="text-heading-md text-ink">{item.q}</AccordionTrigger>
          <AccordionContent class="text-ink-muted">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Container>
</Section>
```

### FinalCta

`src/components/home/FinalCta.astro`:

```astro
---
import Section from '../layout/Section.astro';
import Container from '../layout/Container.astro';
import DisplayHeading from '../layout/DisplayHeading.astro';
import { site } from '@/data/site';
---
<Section tone="paper" size="compact">
  <Container>
    <div class="rounded-xl bg-ink text-paper p-12 md:p-16 text-center">
      <DisplayHeading as="h2" size="lg" class="text-paper max-w-2xl mx-auto">
        Ready to ship your next Webflow site?
      </DisplayHeading>
      <p class="mt-4 text-paper/80 max-w-xl mx-auto">
        Book a 30-minute call to see if we are a fit, or message me on Upwork.
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={site.links.cal} target="_blank" rel="noopener"
           class="inline-flex h-12 items-center rounded-[10px] bg-brand px-6 font-medium text-white hover:bg-brand-hover transition-colors">
          Book a call
        </a>
        <a href={site.links.upwork} target="_blank" rel="noopener"
           class="inline-flex h-12 items-center rounded-[10px] border border-paper/40 px-6 font-medium text-paper hover:bg-paper/10 transition-colors">
          Hire on Upwork
        </a>
      </div>
    </div>
  </Container>
</Section>
```

## GSAP motion island

`src/components/home/HomeMotion.tsx`:

```tsx
import { useEffect } from 'react';

export default function HomeMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: any;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero entrance
        const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
        gsap.from(heroItems, {
          y: 12,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1,
        });

        // Scroll reveals
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 16,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          });
        });
      });
    })();

    return () => ctx?.revert?.();
  }, []);

  return null;
}
```

## Page

`src/pages/index.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Hero from '@/components/home/Hero.astro';
import TrustBar from '@/components/home/TrustBar.astro';
import Services from '@/components/home/Services.astro';
import FeaturedWork from '@/components/home/FeaturedWork.astro';
import Process from '@/components/home/Process.astro';
import Pricing from '@/components/home/Pricing.astro';
import Testimonial from '@/components/home/Testimonial.astro';
import Faq from '@/components/home/Faq.astro';
import FinalCta from '@/components/home/FinalCta.astro';
import HomeMotion from '@/components/home/HomeMotion';
---
<Layout
  title="Webflow Developer — Mahade Walid"
  description="Professional Webflow development for agencies and teams. Unlimited pages on a flat monthly retainer, or hourly via Upwork."
>
  <Hero />
  <TrustBar />
  <Services />
  <FeaturedWork />
  <Process />
  <Pricing />
  <Testimonial />
  <Faq />
  <FinalCta />
  <HomeMotion client:load />
</Layout>
```

## Motion rules (enforcement)

- No `data-reveal` or `data-hero*` attributes on any page other than `/`
- `HomeMotion.tsx` is **never** imported outside `index.astro`
- If `prefers-reduced-motion: reduce`, the component returns early without registering anything (final visual state = CSS default, which is fully visible because GSAP's `from()` sets start state)

**Important fix for reduced-motion:** Because `gsap.from()` sets the start state on mount, users with reduced-motion would see elements invisible if we returned early. To avoid that, add this CSS in `global.css`:

```css
/* default final state — GSAP overrides during animation */
[data-hero-item],
[data-reveal] { opacity: 1; transform: none; }
```

GSAP's `from()` will briefly set opacity to 0 then animate back; if GSAP doesn't load (reduced-motion), elements stay visible.

## Acceptance checklist

- [ ] All 9 home sections render top-to-bottom with correct tone alternation (paper → tint → paper)
- [ ] Hero headline wraps correctly at all breakpoints (360, 768, 1024, 1440)
- [ ] Amply card links to `/work/amply`
- [ ] Cal.com and Upwork CTAs open in new tab with `rel="noopener"`
- [ ] FAQ accordion expands/collapses via keyboard (Enter/Space)
- [ ] GSAP loads only on `/` — check DevTools → Network on `/about` shows no gsap chunk
- [ ] Toggling `prefers-reduced-motion: reduce` in DevTools results in no animations and all content visible
- [ ] Lighthouse perf ≥ 95 on home

## Handoff

Next plan: `04-work-and-case-study.md`.
