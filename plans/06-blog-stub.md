# 06 — Blog Stub

Minimal `/blog` so the nav link resolves and SEO crawlers can index. Full blog feature (tags, search, pagination, RSS) gets its own plan later.

**Scope for this plan:**
- `/blog` listing page (reads from Astro Content Collections)
- `/blog/[slug]` detail page
- 1 placeholder post in MDX

**Out of scope:**
- Tag/category pages
- RSS feed
- Pagination
- Author pages
- Related posts

## Files created

```
src/
├── content/
│   ├── config.ts
│   └── blog/
│       └── hello-world.mdx
├── pages/
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
```

## Install MDX

```bash
pnpm astro add mdx
```

Confirm `astro.config.mjs` includes `mdx()` in integrations.

## Content config

`src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## Placeholder post

`src/content/blog/hello-world.mdx`:

```mdx
---
title: "Hello — notes from a Webflow developer"
description: "Opening post. What I plan to write about: Webflow patterns, SEO, speed, and the occasional client war story."
pubDate: 2026-04-21
tags: ["meta"]
---

Welcome to the blog. I plan to write about three things here:

1. **Webflow patterns that actually scale** — CMS structures, componentization, and the workarounds I wish I had known about two years ago.
2. **SEO and Core Web Vitals on Webflow** — what Lighthouse scores hide, and how to keep green after launch.
3. **The business side** — retainers, scoping, and working with agencies as a specialist contractor.

First real post coming soon.
```

## Listing page

`src/pages/blog/index.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import DisplayHeading from '@/components/layout/DisplayHeading.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
---
<Layout
  title="Blog — Webflow, SEO, and freelance notes | Mahade Walid"
  description="Notes on Webflow development, SEO, performance, and the business of freelance work."
>
  <Section size="hero" tone="paper">
    <Container>
      <Eyebrow>Blog</Eyebrow>
      <DisplayHeading as="h1" size="xl" class="mt-3 max-w-3xl">
        Notes from the field.
      </DisplayHeading>
      <p class="mt-6 max-w-2xl text-body-lg text-ink-muted">
        Webflow patterns, SEO experiments, and the occasional client war story.
      </p>
    </Container>
  </Section>

  <Section tone="tint">
    <Container width="prose">
      {posts.length === 0 ? (
        <p class="text-ink-muted">No posts yet — first one lands soon.</p>
      ) : (
        <ul class="space-y-8">
          {posts.map((post) => (
            <li class="rounded-lg border border-line bg-paper p-6 md:p-8 hover:shadow-md transition-shadow">
              <a href={`/blog/${post.slug}`} class="block">
                <time datetime={post.data.pubDate.toISOString()} class="text-body-sm text-ink-subtle">
                  {fmt(post.data.pubDate)}
                </time>
                <h2 class="mt-2 text-heading-lg text-ink">{post.data.title}</h2>
                <p class="mt-2 text-ink-muted">{post.data.description}</p>
                <span class="mt-4 inline-flex items-center gap-2 text-brand font-medium">
                  Read <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  </Section>
</Layout>
```

## Detail page

`src/pages/blog/[slug].astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Section from '@/components/layout/Section.astro';
import Container from '@/components/layout/Container.astro';
import Eyebrow from '@/components/layout/Eyebrow.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
---
<Layout
  title={`${post.data.title} | Mahade Walid`}
  description={post.data.description}
>
  <article>
    <Section size="hero" tone="paper">
      <Container width="prose">
        <nav class="text-body-sm text-ink-subtle" aria-label="Breadcrumb">
          <a href="/" class="hover:text-ink">Home</a> / <a href="/blog" class="hover:text-ink">Blog</a>
        </nav>
        <div class="mt-8">
          <Eyebrow>
            <time datetime={post.data.pubDate.toISOString()}>{fmt(post.data.pubDate)}</time>
          </Eyebrow>
          <h1 class="mt-3 text-display-lg text-ink">{post.data.title}</h1>
          <p class="mt-4 text-body-lg text-ink-muted">{post.data.description}</p>
        </div>
      </Container>
    </Section>

    <Section tone="paper" size="compact">
      <Container width="prose">
        <div class="prose-page">
          <Content />
        </div>
      </Container>
    </Section>
  </article>
</Layout>
```

## JSON-LD for posts

Inside the detail page `<head>` slot:

```astro
---
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  description: post.data.description,
  datePublished: post.data.pubDate.toISOString(),
  ...(post.data.updatedDate && { dateModified: post.data.updatedDate.toISOString() }),
  author: { '@type': 'Person', name: 'Mahade Walid', url: 'https://mahade.dev' },
  url: `https://mahade.dev/blog/${post.slug}`,
};
---
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
</Fragment>
```

## Acceptance checklist

- [ ] `/blog` lists 1 post (Hello World)
- [ ] `/blog/hello-world` renders the post body
- [ ] Breadcrumb works
- [ ] MDX renders bold, lists, links correctly via `prose-page`
- [ ] Posts with `draft: true` are excluded from listing and build
- [ ] No GSAP loaded

## Handoff

Next: `07-seo-and-deploy.md`.
