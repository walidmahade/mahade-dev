# 05 — About + Contact

Two straightforward static pages. No JS beyond the Cal.com embed script.

## Files created

```
src/
├── pages/
│   ├── about.astro
│   └── contact.astro
└── components/
    └── contact/
        └── CalEmbed.astro
```

## About page

`src/pages/about.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import { site } from '@/data/site';
---
<Layout
  title="About Mahade Walid — Webflow Developer"
  description="Senior Webflow developer with 8+ years of frontend experience. I build fast, SEO-ready Webflow sites for agencies and SaaS teams."
>
  <Section size="hero" tone="paper">
    <Container>
      <div class="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Eyebrow>About</Eyebrow>
          <DisplayHeading as="h1" size="xl" class="mt-3">
            I build <em class="not-italic text-brand">Webflow sites</em> that agencies rely on.
          </DisplayHeading>
          <p class="mt-6 text-body-lg text-ink-muted max-w-2xl">
            Eight years building the web as a frontend developer, the last four specialized in Webflow.
            I have shipped sites for SaaS founders, agencies, and in-house marketing teams across Europe and North America.
          </p>
        </div>
        <img src="/images/mahade-headshot.webp" alt="Mahade Walid"
             class="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover ring-4 ring-paper-tint" />
      </div>
    </Container>
  </Section>

  <Section tone="paper" size="compact">
    <Container width="prose">
      <div class="prose-page">
        <h2>Why I specialized in Webflow</h2>
        <p>
          Most agencies hit the same wall: their designers can design, and their developers can build —
          but the hand-off between the two is where projects stall. Webflow collapses that seam.
          I build sites that look exactly like the Figma, ship in days instead of weeks,
          and hand off to non-technical marketers who can update copy without a ticket.
        </p>

        <h2>What you can expect</h2>
        <ul>
          <li><strong>Lighthouse 95+</strong> on every project. Speed is a feature, not an optimization.</li>
          <li><strong>SEO baked in</strong>, not bolted on. Semantic markup, schema, meta, sitemaps.</li>
          <li><strong>Async-first</strong> via Slack and Loom. Daily staging links. No status meetings.</li>
          <li><strong>No black-box handoff.</strong> You get a site your team can edit, not one that requires me to change a headline.</li>
        </ul>

        <h2>Outside work</h2>
        <p>
          I live in Bangladesh, run long distance, listen to way too many audiobooks,
          and occasionally build Three.js experiments for fun.
        </p>
      </div>

      <div class="mt-12 flex flex-wrap gap-3">
        <a href={site.links.cal} target="_blank" rel="noopener"
           class="inline-flex h-11 items-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover transition-colors">
          Book a call
        </a>
        <a href="/work" class="inline-flex h-11 items-center rounded-[10px] border border-line-strong px-5 font-medium text-ink hover:bg-paper-tint transition-colors">
          See the work
        </a>
      </div>
    </Container>
  </Section>
</Layout>
```

## Contact page

`src/pages/contact.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import CalEmbed from '@/components/contact/CalEmbed.astro';
import { site } from '@/data/site';
---
<Layout
  title="Contact — Mahade Walid, Webflow Developer"
  description="Book a 30-minute call, hire via Upwork, or email directly. I reply within 24 hours on weekdays."
>
  <Section size="hero" tone="paper">
    <Container>
      <Eyebrow>Contact</Eyebrow>
      <DisplayHeading as="h1" size="xl" class="mt-3 max-w-3xl">
        Let&rsquo;s talk about your project.
      </DisplayHeading>
      <p class="mt-6 max-w-2xl text-body-lg text-ink-muted">
        The fastest path is a 30-minute call. If you prefer a written brief first, email works great too.
      </p>
    </Container>
  </Section>

  <Section tone="tint">
    <Container>
      <div class="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <!-- Cal embed -->
        <div class="rounded-xl border border-line bg-paper p-2 md:p-4 shadow-sm overflow-hidden">
          <CalEmbed />
        </div>

        <!-- Alternate contact paths -->
        <aside class="space-y-4">
          <a href={site.links.upwork} target="_blank" rel="noopener"
             class="block rounded-xl border border-line bg-paper p-6 hover:shadow-md transition-shadow">
            <Eyebrow>Upwork</Eyebrow>
            <p class="mt-2 text-heading-md text-ink">Hire through Upwork</p>
            <p class="mt-2 text-body-sm text-ink-muted">
              Fixed-scope or hourly engagements with escrow protection.
            </p>
            <span class="mt-4 inline-flex items-center gap-2 text-brand font-medium">
              Go to profile <span aria-hidden="true">↗</span>
            </span>
          </a>

          <a href={`mailto:${site.email}?subject=Webflow%20project%20inquiry`}
             class="block rounded-xl border border-line bg-paper p-6 hover:shadow-md transition-shadow">
            <Eyebrow>Email</Eyebrow>
            <p class="mt-2 text-heading-md text-ink">{site.email}</p>
            <p class="mt-2 text-body-sm text-ink-muted">
              Direct email. Reply within 24 hours on weekdays.
            </p>
            <span class="mt-4 inline-flex items-center gap-2 text-brand font-medium">
              Send email <span aria-hidden="true">→</span>
            </span>
          </a>

          <div class="rounded-xl bg-paper-sunken p-6">
            <Eyebrow>Response time</Eyebrow>
            <p class="mt-2 text-body-sm text-ink">
              Weekdays: within 24 hours.<br/>
              Weekends: Monday morning.<br/>
              Timezone: Bangladesh (UTC+6).
            </p>
          </div>
        </aside>
      </div>
    </Container>
  </Section>
</Layout>
```

## Cal.com embed

`src/components/contact/CalEmbed.astro`:

```astro
---
import { site } from '@/data/site';
const calPath = site.links.cal.replace('https://cal.com/', '');
---
<div
  data-cal-link={calPath}
  data-cal-namespace="30min"
  data-cal-config='{"layout":"month_view"}'
  style="min-height: 640px;"
>
  <noscript>
    <a href={site.links.cal} target="_blank" rel="noopener">Book via Cal.com →</a>
  </noscript>
</div>

<script is:inline>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "30min", { origin: "https://cal.com" });
  Cal.ns["30min"]("inline", {
    elementOrSelector: '[data-cal-namespace="30min"]',
    calLink: "mahade/30min",
    layout: "month_view"
  });
  Cal.ns["30min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
</script>
```

**Fallback note:** If Cal's inline embed script changes its snippet, replace the `<script is:inline>` block with the official snippet from https://cal.com/docs/embedding-embed-instructions. The div above uses the officially supported `data-cal-*` attributes.

## Acceptance checklist

- [ ] `/about` renders with headshot, paragraphs, and CTAs
- [ ] `/contact` renders with Cal.com embed loaded inline (not a popup)
- [ ] Upwork card opens profile in new tab
- [ ] Email card opens default mail client with pre-filled subject
- [ ] `prose-page` styles render lists, headings, and links consistently
- [ ] No GSAP loaded on either page (Network check)
- [ ] Both pages pass Lighthouse a11y

## Handoff

Next: `06-blog-stub.md`.
