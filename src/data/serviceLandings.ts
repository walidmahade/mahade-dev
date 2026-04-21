import { site } from './site';
import type { ServiceIconName } from '../components/site/serviceIcons';

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
        cadence: '/one-off',
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
        cadence: '/60 min',
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

export type ServiceLandingWithContent = ServiceLanding & {
  content: NonNullable<ServiceLanding['content']>;
};

export const getDynamicServiceLandings = (): ServiceLandingWithContent[] =>
  serviceLandings.filter(
    (s): s is ServiceLandingWithContent => s.content !== undefined,
  );
