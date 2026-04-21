# 04 — Work Index + Case Study

Ship `/work` (projects index) and `/work/[slug]` (dynamic case study page). Only Amply is populated; architecture supports any number of projects by adding to `projects.ts`.

## Files created

```
src/
├── pages/
│   └── work/
│       ├── index.astro
│       └── [slug].astro
└── components/
    └── work/
        ├── ProjectCard.astro
        └── CaseStudyHero.astro
```

## `/work` index page

`src/pages/work/index.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import ProjectCard from '@/components/work/ProjectCard.astro';
import { projects } from '@/data/projects';

const active = projects.filter((p) => p.featured);
---
<Layout
  title="Webflow Portfolio — Mahade Walid"
  description="Selected Webflow development work: SaaS marketing sites, CMS builds, and migrations. Live sites with case studies."
>
  <Section size="hero" tone="paper">
    <Container>
      <Eyebrow>Portfolio</Eyebrow>
      <DisplayHeading as="h1" size="xl" class="mt-3 max-w-3xl">
        Webflow sites, shipped.
      </DisplayHeading>
      <p class="mt-6 max-w-2xl text-body-lg text-ink-muted">
        A selection of recent Webflow builds. Click through for full case studies with problem, approach, and results.
      </p>
    </Container>
  </Section>

  <Section tone="tint">
    <Container>
      <div class="grid gap-8 md:grid-cols-2">
        {active.map((p) => <ProjectCard project={p} />)}
      </div>
      {active.length === 1 && (
        <p class="mt-12 text-center text-body-sm text-ink-subtle">
          More case studies coming soon.
        </p>
      )}
    </Container>
  </Section>
</Layout>
```

## ProjectCard

`src/components/work/ProjectCard.astro`:

```astro
---
import type { Project } from '@/data/projects';
interface Props { project: Project }
const { project } = Astro.props;
---
<a href={`/work/${project.slug}`}
   class="group block rounded-xl border border-line bg-paper overflow-hidden shadow-sm hover:shadow-md transition-shadow">
  <div class="aspect-[16/10] overflow-hidden bg-paper-sunken">
    <img src={project.heroImage} alt={`${project.name} site`}
         class="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
  </div>
  <div class="p-6 md:p-8">
    <div class="flex items-center gap-3 text-body-sm text-ink-subtle">
      <span>{project.industry}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
    </div>
    <h3 class="mt-2 text-heading-lg text-ink">{project.name}</h3>
    <p class="mt-2 text-ink-muted">{project.description}</p>
    <div class="mt-4 inline-flex items-center gap-2 text-brand font-medium">
      Case study <span aria-hidden="true">→</span>
    </div>
  </div>
</a>
```

## Case study page

`src/pages/work/[slug].astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export function getStaticPaths() {
  return projects.map((p) => ({ params: { slug: p.slug }, props: { project: p } }));
}

const { project } = Astro.props;
---
<Layout
  title={`${project.name} — Webflow Case Study | Mahade Walid`}
  description={project.description}
  ogImage={project.heroImage}
>
  <article>
    <Section size="hero" tone="paper">
      <Container>
        <nav class="text-body-sm text-ink-subtle" aria-label="Breadcrumb">
          <a href="/" class="hover:text-ink">Home</a> / <a href="/work" class="hover:text-ink">Work</a> / <span>{project.name}</span>
        </nav>
        <div class="mt-8 max-w-3xl">
          <Eyebrow>{project.industry} · {project.year}</Eyebrow>
          <DisplayHeading as="h1" size="xl" class="mt-3">{project.name}</DisplayHeading>
          <p class="mt-6 text-body-lg text-ink-muted">{project.description}</p>
        </div>
        <div class="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span class="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">{t}</span>
          ))}
        </div>
        <a href={project.liveUrl} target="_blank" rel="noopener"
           class="mt-8 inline-flex h-11 items-center gap-2 rounded-[10px] bg-ink px-5 font-medium text-paper hover:bg-ink-muted transition-colors">
          Visit live site <span aria-hidden="true">↗</span>
        </a>
      </Container>
    </Section>

    <Section tone="tint" size="compact">
      <Container>
        <div class="rounded-xl overflow-hidden shadow-md">
          <img src={project.heroImage} alt={`${project.name} — hero screenshot`} class="w-full" />
        </div>
      </Container>
    </Section>

    {project.results && (
      <Section tone="paper">
        <Container>
          <Eyebrow>Results</Eyebrow>
          <dl class="mt-6 grid gap-8 md:grid-cols-3">
            {project.results.map((r) => (
              <div>
                <dt class="text-body-sm text-ink-muted">{r.label}</dt>
                <dd class="mt-1 text-display-md text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    )}

    {project.problem && (
      <Section tone="paper" size="compact">
        <Container width="prose">
          <Eyebrow>Problem</Eyebrow>
          <p class="mt-4 text-body-lg text-ink">{project.problem}</p>
        </Container>
      </Section>
    )}

    {project.approach && (
      <Section tone="paper" size="compact">
        <Container width="prose">
          <Eyebrow>Approach</Eyebrow>
          <p class="mt-4 text-body-lg text-ink">{project.approach}</p>
        </Container>
      </Section>
    )}

    {project.screenshots.length > 0 && (
      <Section tone="tint">
        <Container>
          <Eyebrow>More screens</Eyebrow>
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            {project.screenshots.map((s, i) => (
              <img src={s} alt={`${project.name} screenshot ${i + 1}`}
                   class="rounded-xl shadow-sm" loading="lazy" />
            ))}
          </div>
        </Container>
      </Section>
    )}

    <Section tone="paper" size="compact">
      <Container>
        <div class="rounded-xl bg-ink text-paper p-10 md:p-14 text-center">
          <DisplayHeading as="h2" size="md" class="text-paper">
            Want something similar?
          </DisplayHeading>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <a href={site.links.cal} target="_blank" rel="noopener"
               class="inline-flex h-11 items-center rounded-[10px] bg-brand px-5 font-medium text-white hover:bg-brand-hover transition-colors">
              Book a call
            </a>
            <a href="/work" class="inline-flex h-11 items-center rounded-[10px] border border-paper/40 px-5 font-medium text-paper hover:bg-paper/10 transition-colors">
              See more work
            </a>
          </div>
        </div>
      </Container>
    </Section>
  </article>
</Layout>
```

## Assets to prepare

Drop these files in `public/images/projects/` before first build (can be placeholders initially; user swaps for real screenshots):

- `amply-hero.webp` (1600×1000)
- `amply-1.webp` (1600×1000)
- `amply-2.webp` (1600×1000)
- `amply-3.webp` (1600×1000)

If user hasn't provided screenshots yet, use a solid-color placeholder and mark TODO in commit message.

## JSON-LD for case study

Add to `<slot name="head">` of case study layout:

```astro
---
const caseSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  creator: { '@type': 'Person', name: 'Mahade Walid', url: 'https://mahade.dev' },
  about: project.industry,
  url: `https://mahade.dev/work/${project.slug}`,
  image: `https://mahade.dev${project.heroImage}`,
};
---
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(caseSchema)} />
</Fragment>
```

## Acceptance checklist

- [ ] `/work` renders with Amply card
- [ ] `/work/amply` renders all sections (results, problem, approach, screenshots, CTA)
- [ ] Breadcrumb navigation visible and links work
- [ ] `Visit live site` opens `joinamply.com` in new tab
- [ ] `getStaticPaths` produces routes for every featured project (confirm `pnpm build` output)
- [ ] No GSAP loaded on `/work` or `/work/amply` (DevTools Network check)
- [ ] Images lazy-load below the fold

## Handoff

Next: `05-about-contact.md`.
