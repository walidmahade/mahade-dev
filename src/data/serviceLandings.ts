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
    slug: 'white-label-webflow-development',
    name: 'White Label Webflow Development',
    tagline: 'Ship Webflow work under your agency brand, on your timeline.',
    icon: 'whiteLabel',
    href: '/services/white-label-webflow-development',
    content: {
      hero: {
        eyebrow: 'For agencies',
        heading: 'White label Webflow development that ships under your agency brand.',
        sub: 'You win the pitch, you own the client relationship, you keep the margin. I build the Webflow site in the background — invisibly, reliably, on your deadlines — and you hand it off to your client with zero mention of a subcontractor. Fully NDA-backed. Credited to your studio. Staging on your subdomains. Slack channels with your branding.',
      },
      whoFor: [
        'Design agencies that win Webflow work but do not staff full-time Webflow developers',
        'Branding studios who pitch full identity packages and need a build partner for the website leg',
        'Marketing agencies running SEO, paid, or content retainers who want to bolt on Webflow builds without hiring',
        'Creative shops whose in-house devs are backed up and need overflow capacity for a specific launch',
        'Solo freelancers who close bigger deals than they can deliver alone and need a trusted second pair of hands',
        'Web design consultancies scaling from boutique to mid-market and testing partner-led delivery before hiring in-house',
      ],
      deliverables: [
        {
          title: 'Invisible subcontracting',
          body: 'I never contact your client directly, never appear on their invoices, and never reference my name on any deliverable. The site ships credited to your agency, not mine.',
        },
        {
          title: 'Your-branded staging',
          body: 'Staging URLs live on subdomains you control (e.g. staging.youragency.com) with your favicon and a password gate if you need it. No cal.com/mahade links leaking through.',
        },
        {
          title: 'Signed mutual NDA',
          body: 'Every engagement starts with a two-way NDA covering client names, site content, strategy documents, and source files. Returned signed within 24 hours of your request.',
        },
        {
          title: 'Agency-facing Slack channel',
          body: 'A dedicated Shared Channel with your team — your logo, your naming convention. Your client never sees it. I match your working hours and your communication cadence.',
        },
        {
          title: 'Production-ready Webflow builds',
          body: 'Pixel-accurate from your Figma, CMS-modeled for your client to maintain, Lighthouse 95+ out of the gate, SEO + schema + sitemap baked in, launch checklist run on every handoff.',
        },
        {
          title: 'Handoff documentation you can rebrand',
          body: 'Loom walkthroughs of the CMS, component library, and publish workflow — recorded with neutral narration you can forward to your client, or re-record and badge as your own.',
        },
        {
          title: 'Retainer or per-project billing',
          body: 'Pay flat monthly if you have steady Webflow flow, or per-project if you have spiky demand. Same quality, same NDAs, same invisible delivery either way.',
        },
        {
          title: 'Handover without lock-in',
          body: 'If your client ever needs to work with a different developer after launch, they can — the Webflow workspace is transferred clean, the components are documented, and nothing about the build depends on me being available.',
        },
      ],
      process: [
        { step: 'Discovery call with your agency', body: 'A 30-minute Loom + live call, no client present. We walk the brief, the deadline, the Figma (if it exists), the content status, and the budget you have priced for development. I tell you up front whether the scope is realistic — before you commit.' },
        { step: 'NDA + partnership docs', body: 'Mutual NDA executed, contractor agreement signed, payment terms locked. Typically done within 24 hours. I add your brand to my invoicing templates so my invoices never cross your client\'s desk.' },
        { step: 'Kickoff on your tools', body: 'I join your Slack / Asana / Notion / Linear — whatever your agency runs on. I do not stand up parallel tools. Your PM can see my progress the same way they see any other team member\'s.' },
        { step: 'Staging on your subdomain', body: 'First page goes live on staging.youragency.com (or whatever URL you choose) within 48 hours of Figma handoff. You review, you send Loom to your client, I iterate based on your consolidated feedback — not client-direct.' },
        { step: 'Launch + handoff', body: 'Launch checklist run: SEO, Core Web Vitals, analytics, 301 redirects, forms, schema, sitemap, accessibility. Workspace transferred to your client\'s Webflow account (or kept in yours, your call). I record the CMS walkthrough in neutral voiceover so you can forward it or re-record.' },
        { step: 'Ongoing support via your agency', body: 'Post-launch tickets route through your team to me. If your client needs changes, they email you; you forward to me. The client never learns a subcontractor exists. You add your margin on top of my rate and pocket the difference.' },
      ],
      pricingAnchor: {
        label: 'Agency retainer or per-project',
        price: '$1,999',
        cadence: '/month',
        bullets: [
          'Unlimited white-label Webflow builds on retainer',
          'Per-project billing also available for spiky demand',
          'NDA + agency-branded staging on every engagement',
          'No minimum commitment, pause or cancel any time',
        ],
        cta: { label: 'Book a discovery call', href: site.links.cal, external: true },
      },
      faq: [
        {
          q: 'Will my client ever find out you are a subcontractor?',
          a: 'Not unless you tell them. I use your branded staging URLs, I join your Slack under a neutral display name if you want, my invoices go to your agency and never to your client, and I decline any direct contact the client attempts to make. The only way they learn about me is if you disclose it.',
        },
        {
          q: 'Can you match our agency\'s process and tools?',
          a: 'Yes — I work inside Slack, Asana, Notion, Linear, ClickUp, Basecamp, Trello, Jira, and anything else you run. I do not require you to adopt my tools. For file management I match your Figma / Google Drive / Dropbox setup. For time tracking I log against your ticket IDs so your PMs can report up the stack.',
        },
        {
          q: 'What if our client wants to meet the developer on a call?',
          a: 'We plan for it up front. Options: I join the call as an "agency Webflow specialist" under a neutral handle (no personal branding), you relay questions async and I respond via Loom for you to forward, or you bring me on-camera with full disclosure — your call, case-by-case.',
        },
        {
          q: 'How do you handle Figma files we did not create?',
          a: 'Same as any engagement — I walk the file on Loom and flag missing states, mobile breakpoints, hover and error screens, and content gaps before I write a line of code. If your designer or your client\'s designer needs to fill gaps, I hand you a written list you can forward. I never email their designer directly.',
        },
        {
          q: 'Do you sign contracts directly with our agency or with our client?',
          a: 'With your agency, always. You are the prime contractor, you hold the client relationship, and you pay me. I never have a direct contract with your client unless you explicitly arrange it — and even then, under your agency\'s framing.',
        },
        {
          q: 'What is your turnaround time on agency work?',
          a: 'On retainer: 48-hour turnaround per request, one active at a time, same as direct clients. Per-project: a typical 5–10 page marketing site is 2–3 weeks, a 15–25 page CMS-heavy site is 4–5 weeks. Rush slots available at a 50% surcharge if I have the capacity.',
        },
        {
          q: 'How do you handle scope creep from our end client?',
          a: 'Your PM handles the client conversation; I handle the technical estimate. When your client asks for "one more page" or "can we add this feature," you ping me in Slack, I scope it in hours or sprints, you decide whether to absorb it or re-price it with the client. The handoff between us is always async and documented so your margin stays protected.',
        },
        {
          q: 'Will the Webflow site be easy for our client to edit post-launch?',
          a: 'Yes. CMS collections are modeled cleanly, style guide components are named and documented, the Editor role is set up for non-technical staff, and I record a 10–20 minute Loom walking every editable region. Your client can hire any Webflow developer in the future without reverse-engineering the build.',
        },
        {
          q: 'Can you join our AE or sales calls as a technical advisor before the project is won?',
          a: 'Yes — I do pre-sale scoping calls with agency partners on retainer, at no extra charge. I help you scope Webflow projects accurately during the pitch phase so you quote with confidence and avoid under-pricing. Turnaround on scoping asks is 24 hours.',
        },
        {
          q: 'How is this different from hiring a full-time Webflow developer?',
          a: 'No salary, no benefits, no ramp time, no bench when the pipeline dips, no recruiting cost, no management overhead. You get senior Webflow capacity the week you need it and you pause it when the pipeline slows. For agencies doing 2–10 Webflow projects a year, the retainer is cheaper than one full-time hire and more flexible.',
        },
      ],
      keywords: [
        'white label webflow',
        'white label webflow developer',
        'white label webflow development',
        'webflow subcontractor',
        'webflow for agencies',
        'agency webflow partner',
        'outsource webflow development',
        'hire white label webflow developer',
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
