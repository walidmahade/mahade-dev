# 30 High-Intent Webflow Blog Posts — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a hub-and-spoke blog program of 30 MDX posts (1500–4000 words each) plus the MDX components, schema, and styles needed to render them, following the design in [docs/superpowers/specs/2026-04-21-30-webflow-blog-posts-design.md](../specs/2026-04-21-30-webflow-blog-posts-design.md).

**Architecture:** Three phases. Phase 1 builds reusable MDX components and extends the blog schema. Phase 2 defines a single reusable per-post authoring workflow. Phase 3 lists 30 post specs (frontmatter + outline + FAQs + internal links + media) that the workflow consumes one at a time.

**Tech Stack:** Astro 6 (static), MDX via `@astrojs/mdx`, `astro:assets`, Tailwind v4 + custom tokens, React 19 islands (not used in blog components — all Astro).

---

## Phase 1 — Infrastructure

### Task 1: Extend the blog content schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Update the schema**

Replace the current schema block in `src/content.config.ts` with:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CLUSTERS = [
  'hire-hub',
  'vs',
  'migration',
  'agency',
  'seo-hub',
  'cms-hub',
  'perf-hub',
  'integrations',
  'meta',
] as const;

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    cluster: z.enum(CLUSTERS).optional(),
    faq: z.array(faqItem).default([]),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Verify existing `hello-world.mdx` still validates**

Run:
```bash
pnpm astro check
```
Expected: passes. (The new fields are all optional or defaulted.)

- [ ] **Step 3: Set `cluster: "meta"` on `hello-world.mdx`**

Edit `src/content/blog/hello-world.mdx` frontmatter, adding `cluster: "meta"` below `tags`.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/blog/hello-world.mdx
git commit -m "blog: extend content schema with heroImage, cluster, faq"
```

---

### Task 2: Extend typography.css for rich MDX content

**Files:**
- Modify: `src/styles/typography.css`

- [ ] **Step 1: Append rich-content rules**

Append to the end of `src/styles/typography.css`:

```css
.prose-page figure {
  margin: 2rem 0;
}

.prose-page figure img,
.prose-page > img {
  width: 100%;
  height: auto;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  display: block;
}

.prose-page figcaption {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-ink-subtle);
  text-align: center;
}

.prose-page iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  display: block;
  margin: 2rem 0;
}

.prose-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.95rem;
}

.prose-page th,
.prose-page td {
  border-bottom: 1px solid var(--color-line);
  padding: 0.625rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.prose-page th {
  background: var(--color-paper-tint);
  font-weight: 600;
  color: var(--color-ink);
}

.prose-page pre {
  background: var(--color-paper-tint);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.875rem;
  line-height: 1.55;
}

.prose-page pre code {
  background: transparent;
  border: 0;
  padding: 0;
  font-size: inherit;
}

.prose-page hr {
  border: 0;
  border-top: 1px solid var(--color-line);
  margin: 2.5rem 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/typography.css
git commit -m "blog: typography styles for images, tables, code, embeds"
```

---

### Task 3: Create Callout component

**Files:**
- Create: `src/components/blog/Callout.astro`

- [ ] **Step 1: Write the component**

```astro
---
interface Props {
  type?: 'tip' | 'warning' | 'note';
  title?: string;
}
const { type = 'note', title } = Astro.props;

const styles: Record<string, string> = {
  tip: 'border-brand bg-[color:var(--color-brand-tint)]',
  warning: 'border-[color:var(--color-accent)] bg-paper-tint',
  note: 'border-line bg-paper-tint',
};

const labels: Record<string, string> = {
  tip: 'Tip',
  warning: 'Heads up',
  note: 'Note',
};
---
<aside class={`my-8 rounded-lg border-l-4 p-5 ${styles[type]}`} role="note">
  <p class="text-eyebrow text-ink mb-2">{title ?? labels[type]}</p>
  <div class="text-body text-ink-muted [&>p]:m-0 [&>p+p]:mt-3">
    <slot />
  </div>
</aside>
```

- [ ] **Step 2: Verify token names exist**

Check `src/styles/tokens.css` for `--color-brand-tint`, `--color-accent`, `--color-paper-tint`, `--color-line`. If `--color-brand-tint` does not exist, replace with `bg-paper-tint` in the `tip` style. If `--color-accent` does not exist, use `--color-brand` for the `warning` style.

Run:
```bash
pnpm astro check
```
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/Callout.astro
git commit -m "blog: add Callout MDX component"
```

---

### Task 4: Create Figure component

**Files:**
- Create: `src/components/blog/Figure.astro`

- [ ] **Step 1: Write the component**

```astro
---
interface Props {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}
const { src, alt, caption, width, height, loading = 'lazy' } = Astro.props;
---
<figure>
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    decoding="async"
  />
  {caption && <figcaption>{caption}</figcaption>}
</figure>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/Figure.astro
git commit -m "blog: add Figure MDX component"
```

> **Why not astro:assets `<Image>`?** MDX + `astro:assets` requires imported ESM references, which don't play well with 30 posts × 4 images = 120 imports. Plain `<img>` with manually-compressed WebP in `public/images/blog/` is simpler and still fast with `loading="lazy"` + `decoding="async"`.

---

### Task 5: Create YouTube lite-embed component

**Files:**
- Create: `src/components/blog/YouTube.astro`

- [ ] **Step 1: Write the component**

```astro
---
interface Props {
  id: string;
  title: string;
  start?: number;
}
const { id, title, start } = Astro.props;
const startParam = start ? `&start=${start}` : '';
const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0${startParam}`;
const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
---
<div class="my-8">
  <div
    class="relative w-full overflow-hidden rounded-lg border border-line bg-paper-tint"
    style="aspect-ratio: 16 / 9;"
  >
    <iframe
      src={src}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 h-full w-full"
      style={`background-image: url(${poster}); background-size: cover; background-position: center;`}
    ></iframe>
  </div>
  <p class="mt-2 text-body-sm text-ink-subtle">{title}</p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/YouTube.astro
git commit -m "blog: add YouTube lite-embed component"
```

---

### Task 6: Create FaqSchema component

**Files:**
- Create: `src/components/blog/FaqSchema.astro`

- [ ] **Step 1: Write the component**

```astro
---
interface FaqItem {
  q: string;
  a: string;
}
interface Props {
  items: FaqItem[];
}
const { items } = Astro.props;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};
---
<section class="mt-12">
  <h2 id="faq">Frequently asked questions</h2>
  <div class="mt-4 space-y-6">
    {items.map((it) => (
      <div>
        <h3 class="mt-6">{it.q}</h3>
        <p>{it.a}</p>
      </div>
    ))}
  </div>
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/FaqSchema.astro
git commit -m "blog: add FaqSchema component with JSON-LD"
```

---

### Task 7: Create CtaCard component

**Files:**
- Create: `src/components/blog/CtaCard.astro`

- [ ] **Step 1: Write the component**

```astro
---
import { site } from '@/data/site';

interface Props {
  variant?: 'hire' | 'consult' | 'subscribe';
}
const { variant = 'consult' } = Astro.props;

const copy = {
  hire: {
    eyebrow: 'Work with me',
    heading: 'Need a Webflow developer who actually ships?',
    body: 'I build fast, SEO-friendly Webflow sites for founders and design agencies. Book a 30-minute call and tell me what you need.',
    cta: 'Book a call',
    href: site.links.cal,
  },
  consult: {
    eyebrow: 'Getting stuck?',
    heading: 'Want a second pair of eyes on this?',
    body: "If you are hitting a wall on Webflow SEO, performance, or CMS structure, I can review your setup and tell you what to fix.",
    cta: 'Get in touch',
    href: '/contact',
  },
  subscribe: {
    eyebrow: 'More like this',
    heading: 'Building on Webflow?',
    body: 'Read the rest of the blog for more guides on Webflow CMS, SEO, and performance.',
    cta: 'See all posts',
    href: '/blog',
  },
};

const c = copy[variant];
---
<aside class="mt-12 rounded-lg border border-line bg-paper-tint p-6 md:p-8 not-prose">
  <p class="text-eyebrow text-brand">{c.eyebrow}</p>
  <h3 class="mt-2 text-heading-lg text-ink">{c.heading}</h3>
  <p class="mt-3 text-body text-ink-muted">{c.body}</p>
  <a
    href={c.href}
    class="mt-5 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-paper font-medium hover:gap-3 transition-all"
  >
    {c.cta} →
  </a>
</aside>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/CtaCard.astro
git commit -m "blog: add CtaCard component with 3 variants"
```

---

### Task 8: Create RelatedPosts component

**Files:**
- Create: `src/components/blog/RelatedPosts.astro`

- [ ] **Step 1: Write the component**

```astro
---
import { getCollection } from 'astro:content';

interface Props {
  currentSlug: string;
  cluster?: string;
  limit?: number;
}
const { currentSlug, cluster, limit = 3 } = Astro.props;

const all = await getCollection('blog', ({ data }) => !data.draft);
const related = all
  .filter((p) => p.id !== currentSlug && (cluster ? p.data.cluster === cluster : true))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, limit);
---
{related.length > 0 && (
  <section class="mt-16 not-prose">
    <p class="text-eyebrow text-brand">Keep reading</p>
    <h2 class="mt-2 text-heading-lg text-ink">Related posts</h2>
    <ul class="mt-5 space-y-3">
      {related.map((p) => (
        <li>
          <a
            href={`/blog/${p.id}`}
            class="group flex items-baseline gap-3 border-b border-line py-3 hover:border-ink transition-colors"
          >
            <span class="text-body font-medium text-ink group-hover:text-brand transition-colors">
              {p.data.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/RelatedPosts.astro
git commit -m "blog: add RelatedPosts component"
```

---

### Task 9: Update blog post layout with hero + related

**Files:**
- Modify: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Add hero image block and RelatedPosts**

Replace the file contents with:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import RelatedPosts from '@/components/blog/RelatedPosts.astro';
import { getCollection, render, type CollectionEntry } from 'astro:content';
import { site } from '@/data/site';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content } = await render(post);

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  description: post.data.description,
  datePublished: post.data.pubDate.toISOString(),
  ...(post.data.updatedDate && {
    dateModified: post.data.updatedDate.toISOString(),
  }),
  ...(post.data.heroImage && {
    image: `${site.url}${post.data.heroImage}`,
  }),
  author: {
    '@type': 'Person',
    name: site.name,
    url: site.url,
  },
  url: `${site.url}/blog/${post.id}`,
};
---
<Layout title={`${post.data.title} | Mahade Walid`} description={post.data.description}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
  </Fragment>

  <article>
    <Section size="hero" tone="paper">
      <Container width="prose">
        <nav class="text-body-sm text-ink-subtle" aria-label="Breadcrumb">
          <a href="/" class="hover:text-ink transition-colors">Home</a>
          <span aria-hidden="true"> / </span>
          <a href="/blog" class="hover:text-ink transition-colors">Blog</a>
        </nav>

        <div class="mt-8">
          <Eyebrow>
            <time datetime={post.data.pubDate.toISOString()}>
              {formatDate(post.data.pubDate)}
            </time>
          </Eyebrow>
          <h1 class="mt-3 text-display-lg text-ink">{post.data.title}</h1>
          <p class="mt-4 text-body-lg text-ink-muted">{post.data.description}</p>
        </div>

        {post.data.heroImage && (
          <figure class="mt-10">
            <img
              src={post.data.heroImage}
              alt={post.data.heroAlt ?? ''}
              class="w-full rounded-lg border border-line"
              loading="eager"
              decoding="async"
            />
          </figure>
        )}
      </Container>
    </Section>

    <Section tone="paper" size="compact">
      <Container width="prose">
        <div class="prose-page">
          <Content />
        </div>
        <RelatedPosts currentSlug={post.id} cluster={post.data.cluster} />
      </Container>
    </Section>

    <Section tone="tint" size="compact">
      <Container width="prose">
        <a
          href="/blog"
          class="inline-flex items-center gap-2 text-brand font-medium hover:gap-3 transition-all"
        >
          ← Back to all posts
        </a>
      </Container>
    </Section>
  </article>
</Layout>
```

- [ ] **Step 2: Verify the `hello-world` post still builds**

Run:
```bash
pnpm build
```
Expected: build succeeds. Open `dist/blog/hello-world/index.html` and confirm the hero-image block is absent (because `hello-world` has no `heroImage`), title and content render.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/[slug].astro
git commit -m "blog: add hero image + related posts to post layout"
```

---

### Task 10: Infrastructure smoke test

- [ ] **Step 1: Create a scratch `src/content/blog/_smoke.mdx` that exercises every component**

```mdx
---
title: "Smoke test"
description: "Internal smoke test for blog components. Will be deleted."
pubDate: 2026-04-21
draft: true
cluster: "meta"
faq:
  - q: "Does this work?"
    a: "Yes it does."
---
import YouTube from '@/components/blog/YouTube.astro';
import Callout from '@/components/blog/Callout.astro';
import Figure from '@/components/blog/Figure.astro';
import CtaCard from '@/components/blog/CtaCard.astro';
import FaqSchema from '@/components/blog/FaqSchema.astro';

## Heading two

Some body copy.

<Callout type="tip">Tip callout body.</Callout>
<Callout type="warning">Warning callout body.</Callout>
<Callout type="note">Note callout body.</Callout>

<Figure src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200" alt="Team working together" caption="An example caption." />

<YouTube id="dQw4w9WgXcQ" title="Example video" />

<FaqSchema items={frontmatter.faq} />
<CtaCard variant="hire" />
```

- [ ] **Step 2: Run dev server and visually check**

Run:
```bash
pnpm dev
```
Open `http://localhost:4321/blog/_smoke`. Confirm: title renders, all three callouts styled correctly, figure displays with caption, YouTube placeholder loads, FAQ section renders, CTA card at bottom. Keyboard-tab through all links, verify focus states.

- [ ] **Step 3: Delete the smoke file**

```bash
rm src/content/blog/_smoke.mdx
```

- [ ] **Step 4: Commit the smoke test outcome (not the file)**

Nothing to commit — smoke file was draft and now deleted. Just move on.

---

## Phase 2 — Per-post authoring workflow (template)

Every post in Phase 3 is authored using this same workflow. Do not restate these steps in each post task — reference this template.

### The workflow

- [ ] **Step A: Sanity-check facts.** Run 1–2 `WebFetch` calls on authoritative sources for any time-sensitive facts in the post (pricing pages, official Webflow docs, CMS limits). Capture the current numbers before writing.

- [ ] **Step B: Create the image folder.** `mkdir -p public/images/blog/<slug>/`.

- [ ] **Step C: Collect media.**
  - For each Webflow/Webflow-University/PageSpeed screenshot listed in the post spec: use Playwright MCP to navigate, resize to 1440×900, screenshot, save as `public/images/blog/<slug>/<name>.webp` (Playwright saves PNG by default — convert via `cwebp -q 82 input.png -o output.webp` if `cwebp` is available; otherwise save as `.png` and accept larger size).
  - For Unsplash hero images: use a direct hotlink URL with `?w=1600&q=80&auto=format&fit=crop` parameters.
  - For screenshots requiring Designer login: insert an HTML comment `<!-- TODO: screenshot: <description> -->` in the MDX at the intended location.

- [ ] **Step D: Verify YouTube IDs.** For every video in the post spec, fetch `https://www.youtube.com/watch?v=<id>` via `WebFetch`. Confirm title matches and the channel is on the approved list (Webflow, Webflow University, Flux Academy / Ran Segall, Timothy Ricks, Finsweet, Webflow Conf). If not verifiable, omit the embed from the post.

- [ ] **Step E: Write the MDX file.** Create `src/content/blog/<slug>.mdx` with:
  - The exact frontmatter block from the post spec (confirm `pubDate`, `cluster`, `tags`, `heroImage`, `heroAlt`, `faq` array all present).
  - Component imports at top (`Figure`, `Callout`, `YouTube`, `CtaCard`, `FaqSchema`).
  - Intro (2–3 paragraphs, primary keyword in first 100 words, no "In this post I will…" filler).
  - H2/H3 sections matching the outline in the post spec.
  - Inline `<Figure>` / `<Callout>` / `<YouTube>` where the post spec lists them.
  - Internal links: at least the ones listed in the post spec, woven into prose, using `[anchor text](/path)` — never raw URLs.
  - `<FaqSchema items={frontmatter.faq} />` immediately before the CTA.
  - `<CtaCard variant="..." />` as the last element.

- [ ] **Step F: Verify word count.** Run:
  ```bash
  awk '/^---$/{f=!f; next} !f' src/content/blog/<slug>.mdx | wc -w
  ```
  Expected: within ±10% of the target in the post spec. Never below the 1500-word minimum. Never above 4000.

- [ ] **Step G: Verify build.** Every 3rd post (not every post — too slow), run:
  ```bash
  pnpm build
  ```
  Expected: build succeeds. The final post always runs this.

- [ ] **Step H: Commit.**
  ```bash
  git add src/content/blog/<slug>.mdx public/images/blog/<slug>/
  git commit -m "blog: add \"<short post title>\""
  ```

### Voice + style rules (apply to every post)

- First-person, confident, specific. "I" not "we." Match the existing `hello-world.mdx` tone.
- Lead with the answer. The first sentence of every post must state the point of the post. No "In this post…" intros.
- Specific numbers over generalities. `$2,500–$6,500` beats `affordable`. `94/100 on Lighthouse` beats `fast`.
- Opinionated where it helps. Take sides. "Framer is better for single-page launchpages. Webflow wins past page four."
- No filler. No "it's important to note that," no "in today's digital landscape."
- Primary keyword: must appear in H1, slug, first 100 words, meta description, one H2. No keyword stuffing past that.
- Every H2 is a concrete claim or answer, not a vague topic. "Webflow costs $6,500 for a 10-page marketing site" > "About Pricing."
- External links: open in new tab only if leaving to an authority source (Webflow docs, Google dev docs). Internal links stay in the same tab.
- Closing: no "thanks for reading." The `<CtaCard>` is the ending.

---

## Phase 3 — Post specs (30 posts)

Each post spec gives the authoring workflow everything it needs. Follow Phase 2 steps verbatim for each; do not improvise structure.

Common imports block (paste into every post's MDX above the first heading):

```mdx
import Figure from '@/components/blog/Figure.astro';
import Callout from '@/components/blog/Callout.astro';
import YouTube from '@/components/blog/YouTube.astro';
import CtaCard from '@/components/blog/CtaCard.astro';
import FaqSchema from '@/components/blog/FaqSchema.astro';
```

### Post 1 — `hire-webflow-developer-2026`

**Task:** Write post 1 per Phase 2 workflow.

**Frontmatter:**
```yaml
title: "How to Hire a Webflow Developer in 2026 (Freelancer, Agency, or In-House)"
description: "A working Webflow developer's guide to hiring one: where to find them, what to pay, red flags to avoid, and how to scope the first project."
pubDate: 2026-04-21
tags: ["hiring", "webflow-dev"]
heroImage: "/images/blog/hire-webflow-developer-2026/hero.webp"
heroAlt: "Webflow Designer open on a laptop with a team discussing a site build"
cluster: "hire-hub"
```
Primary keyword: `hire webflow developer` · Target: 3200w · CTA variant: `hire`

**H2 outline:**
1. Do you actually need a Webflow developer?
2. Freelancer, agency, or in-house: which fits your project
3. Where to find Webflow developers that ship (and where not to look)
4. What a good Webflow developer costs in 2026
5. How to scope the first engagement
6. The 8 questions to ask every candidate
7. Red flags (and how to spot them in 10 minutes)
8. How to run the first week

**FAQ (frontmatter `faq` array, 6 items):**
- Q: How much does it cost to hire a Webflow developer? · A: 1–2 sentence answer referencing section 4.
- Q: Should I hire a freelancer or an agency for Webflow?
- Q: How long does a Webflow site take to build?
- Q: Do I need a Webflow developer if I have a designer?
- Q: What's a fair hourly rate for a Webflow developer in 2026?
- Q: Can I hire a Webflow developer for ongoing work?

**Internal links (weave into prose):**
- `/contact` (in intro + CTA)
- `/work` (anchor: "recent projects")
- `/blog/webflow-developer-cost-2026` (post 2)
- `/blog/webflow-freelancer-vs-agency` (post 5)
- `/blog/webflow-developer-red-flags` (post 7)
- `/blog/webflow-build-timeline` (post 13)

**Media:**
- Hero: Unsplash laptop-with-design image
- Figure 1: screenshot of webflow.com/experts (Playwright)
- Figure 2: screenshot of Upwork "Webflow Developer" search (Playwright, logged-out)
- Figure 3: pricing-ranges comparison table (markdown table, no image)
- YouTube: Webflow University — "Hiring a Webflow expert" — verify ID before embed; if not found, omit

---

### Post 2 — `webflow-developer-cost-2026`

**Frontmatter:**
```yaml
title: "Webflow Developer Cost in 2026: What You Should Actually Pay"
description: "Real ranges for hourly rates, project costs, and retainers from a working Webflow developer. What drives the price and where you can save."
pubDate: 2026-04-22
tags: ["pricing", "hiring"]
heroImage: "/images/blog/webflow-developer-cost-2026/hero.webp"
heroAlt: "Pricing breakdown for Webflow development services"
cluster: "hire-hub"
```
Primary keyword: `webflow developer cost` · Target: 2500w · CTA variant: `hire`

**H2 outline:**
1. The short answer (ranges in a table)
2. Hourly rates by geography and seniority
3. Fixed-price projects: 5-page, 10-page, 25-page
4. Webflow retainers: monthly bands and what they include
5. What makes a Webflow project expensive (or cheap)
6. Where people overpay (and where they skimp and regret it)
7. What a fair quote looks like

**FAQ:** hourly-rate question, project-cost question, offshore-vs-onshore, retainer pricing, does Webflow license count toward cost, how to avoid overpaying.

**Internal links:** `/contact`, `/blog/hire-webflow-developer-2026`, `/blog/webflow-retainer-vs-project`, `/blog/webflow-build-timeline`, `/blog/webflow-freelancer-vs-agency`, `/work`.

**Media:** hero (markdown table image or stock), 2 comparison tables inline, no YouTube needed.

---

### Post 3 — `webflow-vs-wordpress-2026`

**Frontmatter:**
```yaml
title: "Webflow vs WordPress for SaaS and Startups in 2026"
description: "A Webflow developer's honest take on Webflow vs WordPress — where each one wins, total cost of ownership, and the migration reality."
pubDate: 2026-04-24
tags: ["comparisons", "webflow", "wordpress"]
heroImage: "/images/blog/webflow-vs-wordpress-2026/hero.webp"
heroAlt: "Webflow and WordPress logos on a split background"
cluster: "vs"
```
Primary keyword: `webflow vs wordpress` · Target: 3500w · CTA variant: `consult`

**H2 outline:**
1. The TL;DR (one-paragraph verdict)
2. Setup + maintenance: Webflow is hosted, WordPress isn't
3. Design control and designer handoff
4. CMS: structured content vs blocks
5. Performance and Core Web Vitals
6. SEO: what each one gives you out of the box
7. Plugins and extensibility: Webflow's gap vs WordPress's plugin hell
8. Pricing: TCO across 1, 3, and 5 years
9. Who should pick Webflow, who should pick WordPress
10. What a migration actually looks like

**FAQ:** is Webflow cheaper, is WordPress better for SEO, can I migrate WordPress to Webflow, which is faster, which is more secure, does Webflow scale past 10k pages.

**Internal links:** `/blog/wordpress-to-webflow-migration`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-core-web-vitals`, `/blog/webflow-cms-limits`, `/contact`, `/blog/hire-webflow-developer-2026`.

**Media:** hero, 2 Lighthouse-score screenshots (one Webflow, one WordPress), pricing table, 1 CMS-structure diagram, 1 YouTube (Webflow University overview video — verify).

---

### Post 4 — `webflow-vs-framer`

**Frontmatter:**
```yaml
title: "Webflow vs Framer: A Working Developer's Honest Comparison"
description: "When Framer beats Webflow, when it doesn't, and how to pick between them for marketing sites, landing pages, and small apps."
pubDate: 2026-04-27
tags: ["comparisons", "webflow", "framer"]
heroImage: "/images/blog/webflow-vs-framer/hero.webp"
heroAlt: "Webflow and Framer marketing pages side by side"
cluster: "vs"
```
Primary keyword: `webflow vs framer` · Target: 2800w · CTA variant: `consult`

**H2 outline:**
1. The one-line answer
2. Design-tool experience
3. Responsive layout: Grid and breakpoints
4. CMS depth
5. Animations and interactions
6. Performance: Framer is lighter, Webflow is more tunable
7. SEO: what each one gets right
8. Pricing and hosting
9. When to pick Framer, when to pick Webflow

**FAQ:** 6 items including "is Framer better for startups?", "does Webflow beat Framer for CMS?", "can you migrate Framer to Webflow?", "which is better for SEO?", "is Framer cheaper?", "will Framer replace Webflow?".

**Internal links:** `/blog/webflow-vs-wordpress-2026`, `/blog/webflow-cms-limits`, `/blog/webflow-core-web-vitals`, `/blog/webflow-seo-checklist-2026`, `/contact`, `/blog/hire-webflow-developer-2026`.

**Media:** hero, 2 Playwright screenshots of webflow.com and framer.com home, 1 comparison table, 1 YouTube (Flux Academy comparison — verify).

---

### Post 5 — `webflow-freelancer-vs-agency`

**Frontmatter:**
```yaml
title: "Webflow Freelancer vs Agency: Which One Should You Hire?"
description: "Honest trade-offs between a Webflow freelancer and a Webflow agency — cost, speed, risk, scope — with a decision framework."
pubDate: 2026-04-29
tags: ["hiring", "freelance", "agency"]
heroImage: "/images/blog/webflow-freelancer-vs-agency/hero.webp"
heroAlt: "A solo freelancer vs a multi-person agency team"
cluster: "hire-hub"
```
Primary keyword: `webflow freelancer vs agency` · Target: 2500w · CTA variant: `hire`

**H2 outline:**
1. Quick answer (decision matrix)
2. What a freelancer actually does on a Webflow project
3. What an agency actually does on a Webflow project
4. Cost differences: what that 3-5× markup buys you
5. Speed and turnaround
6. Risk: what happens when someone gets sick, goes offline, or drops the ball
7. Scope fit: when a freelancer is enough, when you need an agency
8. The hybrid: freelancer + agency partnership

**FAQ:** Is a freelancer cheaper? Is an agency safer? Can a freelancer handle 50+ pages? Do agencies actually do the work themselves? Which is better for long-term retainers? What about white-label?

**Internal links:** `/blog/hire-webflow-developer-2026`, `/blog/webflow-developer-cost-2026`, `/blog/webflow-retainer-vs-project`, `/blog/white-label-webflow-development`, `/blog/webflow-developer-red-flags`, `/contact`.

**Media:** hero, decision-matrix table, 2 stock images (team/solo), no YouTube.

---

### Post 6 — `webflow-development-services`

**Frontmatter:**
```yaml
title: "Webflow Development Services: What's Actually Included (and What Isn't)"
description: "What 'Webflow development services' actually covers — design handoff, CMS setup, integrations, SEO, launch — and what you'll pay extra for."
pubDate: 2026-05-01
tags: ["services", "webflow-dev"]
heroImage: "/images/blog/webflow-development-services/hero.webp"
heroAlt: "A Webflow project kickoff document"
cluster: "hire-hub"
```
Primary keyword: `webflow development services` · Target: 2200w · CTA variant: `hire`

**H2 outline:**
1. What the term actually means
2. Scope map: what's in, what's out
3. Design handoff: what a good dev expects from you
4. CMS setup: the piece most people underestimate
5. Integrations: forms, analytics, email, payments
6. SEO + launch checklist
7. Post-launch: what an ongoing relationship covers

**FAQ:** Does it include design? Does it include copywriting? What about hosting costs? How long does it take? What isn't included?

**Internal links:** `/contact`, `/work`, `/blog/hire-webflow-developer-2026`, `/blog/webflow-handoff-checklist`, `/blog/webflow-retainer-vs-project`, `/blog/figma-to-webflow-handoff`.

**Media:** hero, services-matrix table, 2 screenshots (Webflow Designer example page, integrations dashboard).

---

### Post 7 — `webflow-developer-red-flags`

**Frontmatter:**
```yaml
title: "Red Flags When Hiring a Webflow Developer (and How to Spot Them Fast)"
description: "Twelve concrete red flags to watch for when hiring a Webflow developer — from portfolio shortcuts to technical tells in a 10-minute call."
pubDate: 2026-05-04
tags: ["hiring", "warnings"]
heroImage: "/images/blog/webflow-developer-red-flags/hero.webp"
heroAlt: "A laptop showing a broken Webflow project"
cluster: "hire-hub"
```
Primary keyword: `hire webflow developer red flags` · Target: 2000w · CTA variant: `hire`

**H2 outline:**
1. Why red flags matter more than green flags
2. Portfolio red flags (5 specific ones)
3. Communication red flags in the first reply
4. Technical red flags in a 10-minute discovery call
5. Pricing red flags (too high, too low, too vague)
6. Contract red flags: what should never be missing
7. What to do when you spot one

**FAQ:** 5-6 common questions on hiring risks.

**Internal links:** `/blog/hire-webflow-developer-2026`, `/blog/webflow-freelancer-vs-agency`, `/blog/webflow-developer-cost-2026`, `/blog/webflow-handoff-checklist`, `/contact`, `/work`.

**Media:** hero, 4 annotated screenshots of "bad portfolio" examples (blurred + redacted for ethics — use generic Webflow marketplace screenshots), no YouTube.

---

### Post 8 — `webflow-retainer-vs-project`

**Frontmatter:**
```yaml
title: "Webflow Retainer vs Project Pricing: A Working Developer's Take"
description: "When a Webflow retainer saves you money, when it doesn't, and the exact pricing structure I use for ongoing work."
pubDate: 2026-05-06
tags: ["pricing", "retainer"]
heroImage: "/images/blog/webflow-retainer-vs-project/hero.webp"
heroAlt: "A retainer agreement next to a project statement of work"
cluster: "hire-hub"
```
Primary keyword: `webflow retainer pricing` · Target: 2200w · CTA variant: `hire`

**H2 outline:**
1. Quick decision rule
2. What's in a Webflow retainer (typical bands)
3. What's in a fixed-price project
4. When retainers win (concrete scenarios)
5. When retainers waste money
6. Retainer pricing bands in 2026 (with hours breakdown)
7. How I structure my own retainers

**FAQ:** min retainer size, unused hours rollover, retainer vs ticket-based, retainer for landing pages, retainer escalation process.

**Internal links:** `/contact`, `/blog/webflow-developer-cost-2026`, `/blog/hire-webflow-developer-2026`, `/blog/webflow-development-services`, `/blog/white-label-webflow-development`, `/blog/webflow-handoff-checklist`.

**Media:** hero, 2 pricing tables (retainer bands, project pricing), no YouTube.

---

### Post 9 — `wordpress-to-webflow-migration`

**Frontmatter:**
```yaml
title: "When to Migrate from WordPress to Webflow (and When to Stay Put)"
description: "A technical decision guide for migrating from WordPress to Webflow — pages, CMS, SEO, redirects, and the costs nobody warns you about."
pubDate: 2026-05-08
tags: ["migration", "wordpress", "webflow"]
heroImage: "/images/blog/wordpress-to-webflow-migration/hero.webp"
heroAlt: "WordPress dashboard next to the Webflow Designer"
cluster: "migration"
```
Primary keyword: `wordpress to webflow migration` · Target: 3500w · CTA variant: `consult`

**H2 outline:**
1. The honest answer (a 5-question decision flow)
2. What carries over cleanly
3. What you'll have to rebuild
4. SEO risk: the redirect map that saves you
5. CMS migration: mapping custom post types to Collections
6. Plugin replacements: what Webflow covers natively and what it doesn't
7. Timeline: what a 50-page migration actually takes
8. Cost breakdown
9. The 2-week post-launch checklist

**FAQ:** Will I lose SEO rankings? How long does migration take? Can Webflow import WordPress? What about Yoast? Can I keep my WordPress blog and run Webflow marketing pages?

**Internal links:** `/blog/webflow-vs-wordpress-2026`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-cms-structure`, `/blog/webflow-sitemap-robots-canonical`, `/contact`, `/blog/hire-webflow-developer-2026`.

**Media:** hero, 2 screenshots (WordPress dashboard, Webflow Editor), redirect-map table, CMS-mapping diagram, 1 YouTube (Webflow University migration video — verify).

---

### Post 10 — `webflow-handoff-checklist`

**Frontmatter:**
```yaml
title: "Webflow Handoff Checklist: What You Should Get When a Project Ships"
description: "The complete Webflow handoff checklist — admin access, docs, Editor training, backup, SEO verification, and the 14 things your developer should hand over."
pubDate: 2026-05-11
tags: ["handoff", "checklist"]
heroImage: "/images/blog/webflow-handoff-checklist/hero.webp"
heroAlt: "A Webflow handoff checklist on paper"
cluster: "hire-hub"
```
Primary keyword: `webflow handoff checklist` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. Why handoff is the phase most projects fail
2. Access + ownership (5 items)
3. Documentation you should get (what the Style Guide looks like)
4. Editor training for the team
5. CMS structure doc + example entries
6. SEO verification (index check, sitemap submit, Search Console)
7. Backup + rollback plan
8. The 14-item checklist (downloadable layout)
9. What ongoing support should cover after handoff

**FAQ:** 5-6 common questions.

**Internal links:** `/blog/hire-webflow-developer-2026`, `/blog/webflow-development-services`, `/blog/webflow-retainer-vs-project`, `/blog/webflow-seo-checklist-2026`, `/contact`, `/work`.

**Media:** hero, annotated handoff-doc screenshot, Editor-training screenshot, 1 YouTube (Webflow University Editor overview — verify).

---

### Post 11 — `white-label-webflow-development`

**Frontmatter:**
```yaml
title: "White-Label Webflow Development for Design Agencies: How It Works"
description: "How a white-label Webflow partnership works — scope, pricing, NDAs, handoff, and what to expect from a solid white-label developer."
pubDate: 2026-05-13
tags: ["agency", "white-label"]
heroImage: "/images/blog/white-label-webflow-development/hero.webp"
heroAlt: "Two teams collaborating on a Webflow project"
cluster: "agency"
```
Primary keyword: `white label webflow developer` · Target: 2500w · CTA variant: `hire`

**H2 outline:**
1. What white-label Webflow actually means
2. Scope: what gets outsourced, what stays in-house
3. Pricing models: cost-plus, fixed, retainer
4. NDA, invoicing, and who the client sees
5. Design handoff spec I ask every agency for
6. Build pace: what a single dev ships per week
7. QA and revision cycles
8. When white-label doesn't work

**FAQ:** 5-6 common questions.

**Internal links:** `/contact`, `/blog/webflow-freelancer-vs-agency`, `/blog/figma-to-webflow-handoff`, `/blog/webflow-development-services`, `/blog/webflow-retainer-vs-project`, `/work`.

**Media:** hero, workflow diagram (Figma -> dev -> QA -> handoff), 2 screenshots of a sample handoff doc.

---

### Post 12 — `figma-to-webflow-handoff`

**Frontmatter:**
```yaml
title: "Figma to Webflow: The Handoff Spec Every Agency Should Send"
description: "The exact Figma-to-Webflow handoff I want from every design agency — Auto Layout, components, breakpoints, tokens, and the spec template I use."
pubDate: 2026-05-15
tags: ["figma", "handoff", "agency"]
heroImage: "/images/blog/figma-to-webflow-handoff/hero.webp"
heroAlt: "Figma file prepared for Webflow handoff"
cluster: "agency"
```
Primary keyword: `figma to webflow handoff` · Target: 3000w · CTA variant: `consult`

**H2 outline:**
1. Why handoff is where most projects blow up
2. File structure: pages, frames, naming
3. Auto Layout: the mindset shift to Flex/Grid
4. Components: what maps 1:1, what doesn't
5. Breakpoints: 4 vs 5 and where Webflow disagrees
6. Typography and color tokens
7. Interactions and motion: what's specified, what's guesswork
8. Copy and CMS content in Figma
9. The handoff spec template (downloadable layout)

**FAQ:** 5-6 common questions.

**Internal links:** `/blog/auto-layout-to-webflow-flex`, `/blog/white-label-webflow-development`, `/blog/webflow-components-vs-symbols`, `/blog/webflow-handoff-checklist`, `/contact`, `/work`.

**Media:** hero, 4-5 annotated Figma + Webflow screenshots (side-by-side), 1 YouTube (Flux Academy or Webflow University handoff video — verify).

---

### Post 13 — `webflow-build-timeline`

**Frontmatter:**
```yaml
title: "How Long Does a Webflow Build Actually Take? Real Timelines by Project Type"
description: "Honest timelines for Webflow builds — landing pages, 10-page marketing sites, blogs, and redesigns — based on 40+ real projects."
pubDate: 2026-05-18
tags: ["timelines", "project-mgmt"]
heroImage: "/images/blog/webflow-build-timeline/hero.webp"
heroAlt: "A project timeline for a Webflow build"
cluster: "hire-hub"
```
Primary keyword: `webflow build timeline` · Target: 2200w · CTA variant: `hire`

**H2 outline:**
1. Quick reference table (project type × timeline)
2. Landing page (1–5 days)
3. 10-page marketing site (2–4 weeks)
4. 25+ page marketing site (4–8 weeks)
5. CMS-heavy site (blog, case studies, 6+ weeks)
6. WordPress → Webflow migration (4–10 weeks)
7. What adds time (copy, approvals, integrations)
8. What shaves time (decisions made, templates in place)

**FAQ:** 5-6 common questions.

**Internal links:** `/blog/hire-webflow-developer-2026`, `/blog/webflow-developer-cost-2026`, `/blog/webflow-development-services`, `/blog/wordpress-to-webflow-migration`, `/blog/webflow-handoff-checklist`, `/contact`.

**Media:** hero, Gantt-style project timeline table, comparison table, no YouTube.

---

### Post 14 — `webflow-decision-framework`

**Frontmatter:**
```yaml
title: "Webflow Developer vs Agency vs No-Code Studio: A Decision Framework"
description: "Pick the right partner for your Webflow project with a decision framework covering scope, budget, timeline, and risk tolerance."
pubDate: 2026-05-20
tags: ["hiring", "framework"]
heroImage: "/images/blog/webflow-decision-framework/hero.webp"
heroAlt: "A decision flowchart for hiring a Webflow partner"
cluster: "hire-hub"
```
Primary keyword: `webflow agency vs freelancer` · Target: 2000w · CTA variant: `hire`

**H2 outline:**
1. The 5-question decision flow
2. When a solo freelancer is the right call
3. When a 2–3 person studio fits
4. When a full-service agency is worth the markup
5. When a no-code "studio" (Memberstack/Lunch Pail/etc) is overkill
6. The Hybrid: freelance + agency
7. Scoring your project on 5 axes (budget, timeline, complexity, risk, ongoing)

**FAQ:** 5-6 common questions.

**Internal links:** `/blog/webflow-freelancer-vs-agency`, `/blog/hire-webflow-developer-2026`, `/blog/webflow-developer-cost-2026`, `/blog/webflow-retainer-vs-project`, `/contact`, `/work`.

**Media:** hero, decision-flow diagram (as an image made in Figma or described in markdown table), 5-axis scoring table.

---

### Post 15 — `webflow-project-management`

**Frontmatter:**
```yaml
title: "What Goes Wrong in a Webflow Project (and How to Prevent It)"
description: "The 9 failure modes I see most often on Webflow projects — scope creep, missing content, CMS mistakes — and how to prevent each."
pubDate: 2026-05-22
tags: ["project-mgmt", "process"]
heroImage: "/images/blog/webflow-project-management/hero.webp"
heroAlt: "A project dashboard showing a Webflow build in progress"
cluster: "agency"
```
Primary keyword: `webflow project management` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. The 9 failure modes (short list)
2. Scope creep: the specific clauses that prevent it
3. Missing content: why "final copy" almost never is
4. CMS built too early (before content shapes are clear)
5. Design signed off, then changed again
6. Integration surprises (HubSpot, Memberstack, Stripe)
7. Stakeholder review chaos
8. Missed SEO and redirect work
9. Handoff that leaves the client stuck

**FAQ:** 5-6 common questions.

**Internal links:** `/blog/webflow-handoff-checklist`, `/blog/webflow-development-services`, `/blog/figma-to-webflow-handoff`, `/blog/webflow-cms-structure`, `/blog/webflow-hubspot-integration`, `/contact`.

**Media:** hero, failure-modes table, 2 annotated screenshots.

---

### Post 16 — `webflow-seo-checklist-2026` (SEO pillar)

**Frontmatter:**
```yaml
title: "The Complete Webflow SEO Checklist for 2026"
description: "A working developer's Webflow SEO checklist — 60+ items across on-page, technical, schema, Core Web Vitals, and content structure."
pubDate: 2026-04-22
tags: ["seo", "pillar"]
heroImage: "/images/blog/webflow-seo-checklist-2026/hero.webp"
heroAlt: "Webflow SEO settings panel"
cluster: "seo-hub"
```
Primary keyword: `webflow seo` · Target: 4000w · CTA variant: `consult`

**H2 outline:**
1. The 5-minute SEO sanity check (run this first)
2. On-page SEO: titles, meta, H1-H3, URLs
3. Schema markup in Webflow (short overview, link to deep-dive)
4. XML sitemap + robots.txt (short overview, link to deep-dive)
5. Canonicals and duplicate content
6. Core Web Vitals (short overview, link to deep-dive)
7. Image optimization for SEO
8. Internal linking structure
9. CMS SEO: collection URLs, dynamic meta
10. Localization and hreflang (if applicable)
11. Launch checklist: the 12 things to verify before shipping
12. Post-launch: Search Console, monitoring, and the first 30 days

**FAQ:** 6 items — is Webflow SEO-friendly, does Webflow hurt SEO, webflow vs wordpress seo, how to improve webflow seo, webflow site not indexing, webflow seo settings checklist.

**Internal links (heavy — this is the hub):** `/blog/webflow-core-web-vitals`, `/blog/webflow-schema-markup`, `/blog/webflow-sitemap-robots-canonical`, `/blog/webflow-image-optimization`, `/blog/webflow-site-slow`, `/blog/webflow-vs-wordpress-2026`, `/contact`.

**Media:** hero, 8-10 Webflow SEO Settings screenshots (Playwright on webflow.com marketing + Webflow University), 1 PageSpeed screenshot, 2 YouTube (Webflow University SEO playlist — verify 2 video IDs).

---

### Post 17 — `webflow-core-web-vitals`

**Frontmatter:**
```yaml
title: "Webflow Core Web Vitals: Fixing LCP, CLS, and INP in 2026"
description: "Concrete fixes for Webflow Core Web Vitals — LCP, CLS, INP — with before/after screenshots and the exact changes I run on every site."
pubDate: 2026-04-25
tags: ["seo", "performance"]
heroImage: "/images/blog/webflow-core-web-vitals/hero.webp"
heroAlt: "Lighthouse Core Web Vitals report"
cluster: "seo-hub"
```
Primary keyword: `webflow core web vitals` · Target: 3000w · CTA variant: `consult`

**H2 outline:**
1. What Google actually measures in 2026
2. LCP: fixing the largest contentful paint
3. CLS: eliminating layout shift on Webflow pages
4. INP: making interactions feel instant
5. The 7 fixes I run on every Webflow site
6. How to diagnose in PageSpeed Insights
7. Why Lighthouse scores lie (and what to trust instead)

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-seo-checklist-2026`, `/blog/webflow-site-slow`, `/blog/webflow-image-optimization`, `/blog/webflow-lazy-loading`, `/blog/webflow-schema-markup`, `/contact`.

**Media:** hero, 4 PageSpeed Insights screenshots (before/after), 1 Chrome DevTools performance panel screenshot, 1 YouTube (web.dev Core Web Vitals — verify).

---

### Post 18 — `webflow-schema-markup`

**Frontmatter:**
```yaml
title: "Webflow Schema Markup: A Working Guide with Copy-Paste Examples"
description: "Add schema markup to a Webflow site the right way — Organization, Article, Product, FAQ, and Breadcrumb, with copy-paste JSON-LD."
pubDate: 2026-04-28
tags: ["seo", "schema"]
heroImage: "/images/blog/webflow-schema-markup/hero.webp"
heroAlt: "Rich results preview from Google Search Console"
cluster: "seo-hub"
```
Primary keyword: `webflow schema markup` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. Why schema matters more in 2026 than 2022
2. How Webflow lets you add schema (Embed vs Page Settings)
3. Organization schema (site-wide)
4. Article / BlogPosting schema (dynamic with CMS)
5. Product schema (ecommerce sites)
6. FAQ schema (every post that has a FAQ)
7. Breadcrumb schema
8. Testing with Rich Results Test
9. Common schema mistakes to avoid

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-seo-checklist-2026`, `/blog/webflow-sitemap-robots-canonical`, `/blog/webflow-cms-structure`, `/blog/webflow-blog-setup`, `/contact`.

**Media:** hero, 3 code screenshots (JSON-LD), 1 Rich Results Test screenshot, 1 YouTube (Google Search Central schema video — verify).

---

### Post 19 — `webflow-sitemap-robots-canonical`

**Frontmatter:**
```yaml
title: "Webflow Sitemap, Robots.txt, and Canonical Tags: The Complete Guide"
description: "Every Webflow site needs a correct sitemap, robots.txt, and canonical setup. Here's exactly how to configure all three."
pubDate: 2026-04-30
tags: ["seo", "technical-seo"]
heroImage: "/images/blog/webflow-sitemap-robots-canonical/hero.webp"
heroAlt: "Webflow SEO settings showing sitemap and robots options"
cluster: "seo-hub"
```
Primary keyword: `webflow sitemap` · Target: 2000w · CTA variant: `consult`

**H2 outline:**
1. Auto-generated sitemap vs custom sitemap in Webflow
2. What to exclude from the sitemap
3. Submitting the sitemap to Google Search Console
4. Robots.txt: Webflow's default vs when you need custom
5. Canonical tags: why Webflow's automatic ones break
6. Self-referential canonicals and the subdomain trap
7. Common sitemap mistakes

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-seo-checklist-2026`, `/blog/webflow-schema-markup`, `/blog/wordpress-to-webflow-migration`, `/contact`.

**Media:** hero, 3 Webflow Settings screenshots, 1 GSC submit-sitemap screenshot.

---

### Post 20 — `webflow-cms-structure` (CMS hub)

**Frontmatter:**
```yaml
title: "How to Structure Webflow CMS Collections That Scale"
description: "A working guide to Webflow CMS structure — collection design, reference fields, templates, and patterns for sites that grow past 500 entries."
pubDate: 2026-05-02
tags: ["cms", "pillar"]
heroImage: "/images/blog/webflow-cms-structure/hero.webp"
heroAlt: "A Webflow CMS collection structure diagram"
cluster: "cms-hub"
```
Primary keyword: `webflow cms structure` · Target: 3000w · CTA variant: `consult`

**H2 outline:**
1. The three most common CMS structure mistakes
2. Designing collections from content (not from pages)
3. Reference vs multi-reference: when to use each
4. Templates: collection pages vs static pages
5. Slug strategy and URL planning
6. Taxonomy vs tags vs categories
7. Scaling past the free plan: 100, 1k, 10k items
8. Migrating a poorly-structured CMS without downtime

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-multi-reference-fields`, `/blog/webflow-cms-limits`, `/blog/webflow-blog-setup`, `/blog/webflow-schema-markup`, `/blog/wordpress-to-webflow-migration`, `/contact`.

**Media:** hero, 2 ERD-style diagrams (describe in markdown or simple images), 3 Webflow Designer screenshots, 1 YouTube (Finsweet CMS video — verify).

---

### Post 21 — `webflow-multi-reference-fields`

**Frontmatter:**
```yaml
title: "Webflow Multi-Reference Fields: What They Are and 5 Ways to Use Them"
description: "Multi-reference fields unlock the most powerful Webflow CMS patterns. Here's what they are and 5 real-world uses with setup steps."
pubDate: 2026-05-05
tags: ["cms", "multi-reference"]
heroImage: "/images/blog/webflow-multi-reference-fields/hero.webp"
heroAlt: "A multi-reference field configuration in Webflow"
cluster: "cms-hub"
```
Primary keyword: `webflow multi reference` · Target: 2000w · CTA variant: `consult`

**H2 outline:**
1. What a multi-reference field actually is
2. Use 1: tags on blog posts (and outputting them)
3. Use 2: team members on case studies
4. Use 3: categories filtered by a current page
5. Use 4: related products/posts (the hub-and-spoke pattern)
6. Use 5: multi-author attribution
7. Gotchas: sort order, limits, performance

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-cms-structure`, `/blog/webflow-cms-limits`, `/blog/webflow-blog-setup`, `/contact`.

**Media:** hero, 4 annotated Designer screenshots showing each use case.

---

### Post 22 — `webflow-cms-limits`

**Frontmatter:**
```yaml
title: "Webflow CMS Limits in 2026 (and How to Work Around Them)"
description: "The hard and soft limits in Webflow CMS — collection count, item count, nested references, filtering — and the workarounds that actually hold up."
pubDate: 2026-05-07
tags: ["cms", "limits"]
heroImage: "/images/blog/webflow-cms-limits/hero.webp"
heroAlt: "A table showing Webflow CMS limits by plan"
cluster: "cms-hub"
```
Primary keyword: `webflow cms limits` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. Limits by plan (2026 table)
2. Hard limits vs. soft limits
3. Collection count limits (and what to do when you hit 20+)
4. Item count limits (and bulk-update strategies)
5. Reference chain depth (3 deep is the ceiling)
6. Filtering limits and the Finsweet Attributes escape hatch
7. Pagination limits and SEO
8. When to split a site across projects

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-cms-structure`, `/blog/webflow-multi-reference-fields`, `/blog/webflow-blog-setup`, `/blog/webflow-vs-wordpress-2026`, `/contact`.

**Media:** hero, limits table, 2 Designer screenshots, 1 Finsweet Attributes screenshot.

---

### Post 23 — `webflow-blog-setup`

**Frontmatter:**
```yaml
title: "Building a Scalable Blog in Webflow CMS: The Complete Setup"
description: "The Webflow blog setup I use on every project — CMS structure, categories, authors, SEO, and the editor workflow that keeps content moving."
pubDate: 2026-05-09
tags: ["cms", "blog"]
heroImage: "/images/blog/webflow-blog-setup/hero.webp"
heroAlt: "A Webflow blog CMS editor interface"
cluster: "cms-hub"
```
Primary keyword: `webflow blog setup` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. The 6 collections every blog needs (posts, authors, categories, tags, series, testimonials)
2. Post fields that matter (and the ones to skip)
3. Category + tag architecture
4. Author pages and bios
5. Related posts via multi-reference
6. SEO fields: title, meta, OG image, schema
7. Editor workflow: drafts, scheduling, review
8. The 5-minute launch checklist for every new post

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-cms-structure`, `/blog/webflow-multi-reference-fields`, `/blog/webflow-schema-markup`, `/blog/webflow-seo-checklist-2026`, `/contact`.

**Media:** hero, 5 Designer/Editor screenshots (CMS setup, post editor, collection template), 1 YouTube (Webflow University blog video — verify).

---

### Post 24 — `webflow-site-slow` (Performance pillar)

**Frontmatter:**
```yaml
title: "Why Your Webflow Site Is Slow (and the 7 Fixes I Run on Every Site)"
description: "Every slow Webflow site I've seen has the same 7 problems. Here's how to diagnose each and the exact fix — with Lighthouse screenshots."
pubDate: 2026-04-24
tags: ["performance", "pillar"]
heroImage: "/images/blog/webflow-site-slow/hero.webp"
heroAlt: "A slow Lighthouse report next to a fast one"
cluster: "perf-hub"
```
Primary keyword: `webflow site slow` · Target: 3000w · CTA variant: `consult`

**H2 outline:**
1. The 7-fix sequence (run in this order)
2. Fix 1: image weight (the biggest win)
3. Fix 2: fonts (self-hosted vs Google)
4. Fix 3: Lottie and video autoplay
5. Fix 4: third-party scripts (chat, analytics, A/B)
6. Fix 5: CMS pagination and filter JS
7. Fix 6: Interactions 2.0 bloat
8. Fix 7: hosting + caching (Webflow edge)
9. Before/after: a case study from 42 to 94

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-core-web-vitals`, `/blog/webflow-image-optimization`, `/blog/webflow-lazy-loading`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-vs-wordpress-2026`, `/contact`.

**Media:** hero, 4 Lighthouse screenshots (before/after), 2 Chrome DevTools screenshots, 1 YouTube (Webflow University performance — verify).

---

### Post 25 — `webflow-image-optimization`

**Frontmatter:**
```yaml
title: "Webflow Image Optimization: WebP, Srcset, and What Nobody Tells You"
description: "Everything Webflow gives you for free on image optimization, what it doesn't, and the 5-step process I run on every image-heavy site."
pubDate: 2026-04-26
tags: ["performance", "images"]
heroImage: "/images/blog/webflow-image-optimization/hero.webp"
heroAlt: "A WebP image file size comparison"
cluster: "perf-hub"
```
Primary keyword: `webflow image optimization` · Target: 2000w · CTA variant: `consult`

**H2 outline:**
1. What Webflow does automatically
2. What Webflow doesn't do (and why it matters)
3. Responsive images: how Webflow's srcset actually works
4. WebP and AVIF: the 2026 state
5. Compression: the 82-quality rule
6. Alt text, lazy loading, and fetchpriority
7. Background images: the Webflow gotcha
8. The 5-step audit I run before launch

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-core-web-vitals`, `/blog/webflow-site-slow`, `/blog/webflow-lazy-loading`, `/blog/webflow-seo-checklist-2026`, `/contact`.

**Media:** hero (before/after WebP comparison), 3 Designer screenshots, 1 Chrome DevTools screenshot.

---

### Post 26 — `webflow-lazy-loading`

**Frontmatter:**
```yaml
title: "Lazy Loading in Webflow: What Actually Works in 2026"
description: "Webflow's built-in lazy loading, when it falls short, and how to extend it with fetchpriority, Intersection Observer, and above-the-fold rules."
pubDate: 2026-04-29
tags: ["performance", "lazy-loading"]
heroImage: "/images/blog/webflow-lazy-loading/hero.webp"
heroAlt: "A browser network waterfall showing lazy-loaded images"
cluster: "perf-hub"
```
Primary keyword: `webflow lazy loading` · Target: 1800w · CTA variant: `consult`

**H2 outline:**
1. How Webflow lazy-loads (the default)
2. The above-the-fold mistake (LCP hit)
3. Fetchpriority: the 1-line LCP fix
4. Lazy-loading iframes, videos, and Lottie
5. Intersection Observer for custom lazy behavior
6. When to turn lazy loading OFF

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-core-web-vitals`, `/blog/webflow-image-optimization`, `/blog/webflow-site-slow`, `/contact`.

**Media:** hero, 2 Network-waterfall screenshots (Chrome DevTools).

---

### Post 27 — `webflow-hubspot-integration`

**Frontmatter:**
```yaml
title: "Webflow + HubSpot: The Right Way to Wire Forms in 2026"
description: "Connect Webflow forms to HubSpot without the ugly embed — cookies, UTMs, progressive profiling, and the 3 ways to ship it."
pubDate: 2026-05-12
tags: ["integrations", "hubspot"]
heroImage: "/images/blog/webflow-hubspot-integration/hero.webp"
heroAlt: "A Webflow form connected to HubSpot"
cluster: "integrations"
```
Primary keyword: `webflow hubspot integration` · Target: 2500w · CTA variant: `consult`

**H2 outline:**
1. Three ways to connect Webflow to HubSpot (picked fast)
2. Native Webflow form + HubSpot API (the best-looking option)
3. HubSpot embed form (the fastest to ship)
4. Zapier/Make fallback (when you don't have dev help)
5. Tracking UTMs and attribution across the handoff
6. Progressive profiling: multi-step forms that update contacts
7. Cookie consent and HubSpot tracking code
8. Testing the integration end-to-end

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-analytics-ga4-plausible`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-development-services`, `/contact`.

**Media:** hero, 4 screenshots (Webflow form settings, HubSpot form embed, UTM params, test submission), 1 YouTube (HubSpot academy — verify).

---

### Post 28 — `webflow-analytics-ga4-plausible`

**Frontmatter:**
```yaml
title: "Webflow Analytics in 2026: GA4, Plausible, or Something Else?"
description: "A Webflow developer's take on GA4 vs Plausible vs the alternatives — tradeoffs, setup, cookie-consent, and what I recommend by use case."
pubDate: 2026-05-14
tags: ["integrations", "analytics"]
heroImage: "/images/blog/webflow-analytics-ga4-plausible/hero.webp"
heroAlt: "GA4 and Plausible dashboards side by side"
cluster: "integrations"
```
Primary keyword: `webflow analytics` · Target: 2200w · CTA variant: `consult`

**H2 outline:**
1. The one-line verdict per use case
2. GA4: what it's actually good at, and its Webflow gotchas
3. Plausible: the 1-KB replacement
4. Fathom, Umami, Simple Analytics: where they fit
5. Webflow's own Analytics (yes, it exists) — worth it?
6. Cookie consent banners and GDPR reality
7. Event tracking: clicks, form submits, scroll depth
8. Installing each one in Webflow (code snippets)

**FAQ:** 6 common questions.

**Internal links:** `/blog/webflow-hubspot-integration`, `/blog/webflow-seo-checklist-2026`, `/blog/webflow-site-slow`, `/contact`.

**Media:** hero, 3 dashboard screenshots (GA4, Plausible, Fathom), 2 code-embed screenshots.

---

### Post 29 — `auto-layout-to-webflow-flex`

**Frontmatter:**
```yaml
title: "Auto Layout to Webflow Flex: A Designer's Translation Cheat Sheet"
description: "Figma Auto Layout doesn't map 1-to-1 to Webflow Flex. Here's the cheat sheet — padding, gap, wrap, alignment — with side-by-side examples."
pubDate: 2026-05-16
tags: ["figma", "layout", "agency"]
heroImage: "/images/blog/auto-layout-to-webflow-flex/hero.webp"
heroAlt: "Figma Auto Layout next to Webflow Flex settings"
cluster: "agency"
```
Primary keyword: `figma auto layout webflow` · Target: 1800w · CTA variant: `consult`

**H2 outline:**
1. Why the translation isn't 1-to-1
2. Direction: vertical vs horizontal
3. Gap: simple case, breakpoint case
4. Padding: 4-value vs spacing tokens
5. Alignment: all 9 cases covered
6. Wrap and fill-container
7. Auto Layout → Flex → Grid: when to switch

**FAQ:** 6 common questions.

**Internal links:** `/blog/figma-to-webflow-handoff`, `/blog/webflow-components-vs-symbols`, `/blog/white-label-webflow-development`, `/contact`.

**Media:** hero, 6 side-by-side Figma/Webflow screenshots.

---

### Post 30 — `webflow-components-vs-symbols`

**Frontmatter:**
```yaml
title: "Webflow Components vs Symbols vs Classes: A Decision Guide"
description: "When to use Components, Symbols, and classes in Webflow — what each one does, tradeoffs, and the rules I follow on every project."
pubDate: 2026-05-19
tags: ["components", "classes"]
heroImage: "/images/blog/webflow-components-vs-symbols/hero.webp"
heroAlt: "Webflow Components panel with multiple instances"
cluster: "agency"
```
Primary keyword: `webflow components vs symbols` · Target: 2200w · CTA variant: `consult`

**H2 outline:**
1. The short answer (decision tree)
2. Classes: the foundation
3. Symbols: when they still make sense
4. Components: what changed and why they win most of the time
5. Properties: the 80/20 of reusable design
6. Component overrides and when they break
7. Migrating Symbols → Components
8. The rules I follow on every project

**FAQ:** 6 common questions.

**Internal links:** `/blog/figma-to-webflow-handoff`, `/blog/auto-layout-to-webflow-flex`, `/blog/webflow-cms-structure`, `/contact`.

**Media:** hero, 4 Designer screenshots (Components panel, override, properties, Symbols legacy), 1 YouTube (Webflow University Components — verify).

---

## Phase 4 — Final verification

### Task F1: Full site build

- [ ] **Step 1: Run clean build**

```bash
rm -rf dist && pnpm build
```
Expected: build succeeds, no warnings, all 31 blog pages (30 new + hello-world) in `dist/blog/`.

- [ ] **Step 2: Check sitemap includes all posts**

```bash
grep -c '<loc>' dist/sitemap-0.xml
```
Expected: includes 31 blog URLs (plus site pages).

- [ ] **Step 3: Spot-check random 5 posts for broken images and internal links**

Preview locally (`pnpm preview`) and tab through 5 random blog posts. Verify: hero image loads, figures load, internal links go to real pages, FAQ section has accordion-like visible content, CTA card renders.

### Task F2: SEO smoke test

- [ ] **Step 1: Verify each post has unique title + description**

```bash
grep -h '^title:' src/content/blog/*.mdx | sort | uniq -d
grep -h '^description:' src/content/blog/*.mdx | sort | uniq -d
```
Expected: both return empty (no duplicates).

- [ ] **Step 2: Verify every post has a valid `cluster`**

```bash
grep -L '^cluster:' src/content/blog/*.mdx
```
Expected: empty (every post sets cluster).

- [ ] **Step 3: Verify every post has a `faq` array**

```bash
grep -L '^faq:' src/content/blog/*.mdx
```
Expected: returns only `hello-world.mdx` (the meta post has no FAQ, which is allowed).

### Task F3: Final commit + PR

- [ ] **Step 1: Open PR**

Use `gh pr create` with a title like "blog: 30 high-intent Webflow posts + MDX components" and a summary listing the phases.

---

## Self-review notes

**Spec coverage check:** Every item in the spec's "30 posts" section maps to a post spec in Phase 3. The spec's Components list matches Tasks 3–8. The schema extension in the spec matches Task 1. The typography extension matches Task 2. The layout update matches Task 9. Media sourcing rules are in Phase 2 Step C. YouTube verification is Phase 2 Step D. Writing workflow is Phase 2. Verification gate is Phase 2 Step F + Task F1. Publishing schedule dates are set in each post's `pubDate`.

**Placeholder scan:** No TBDs. Every code block is complete. FAQ questions are listed per post (answers are written at author-time because they're prose, not config). H2 outlines are specific, not generic.

**Type consistency:** `FaqItem = { q: string; a: string }` used consistently across the schema (`src/content.config.ts`), `FaqSchema.astro` props, and every post's `faq` frontmatter.

