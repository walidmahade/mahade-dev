# 02 — Design System

Build the layout primitives and wire the typography scale so every later plan has consistent building blocks.

## Files created

```
src/
├── styles/
│   ├── tokens.css         # CSS custom properties (non-Tailwind vars)
│   ├── typography.css     # heading + body classes
│   └── global.css         # already exists from plan 01, add imports
├── components/
│   ├── layout/
│   │   ├── Container.astro
│   │   ├── Section.astro
│   │   ├── Eyebrow.astro
│   │   └── DisplayHeading.astro
│   ├── ui/                # shadcn-installed, do not edit
│   └── site/
│       ├── Header.astro
│       └── Footer.astro
└── data/
    └── site.ts            # site config (name, links, etc)
```

## Steps

### 1. Tokens CSS

`src/styles/tokens.css`:

```css
:root {
  --color-focus-ring: 67 83 255;
  --shadow-xs: 0 1px 2px rgba(11, 13, 19, 0.04);
  --shadow-sm: 0 2px 8px rgba(11, 13, 19, 0.05);
  --shadow-md: 0 8px 24px rgba(11, 13, 19, 0.06);
  --shadow-lg: 0 20px 40px rgba(11, 13, 19, 0.08);
}

*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgb(var(--color-focus-ring) / 0.35);
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. Typography CSS

`src/styles/typography.css`:

```css
.text-display-xl {
  font-family: var(--font-display);
  font-size: clamp(3rem, 2rem + 4vw, 5.5rem);
  line-height: 1.02;
  font-weight: 400;
  letter-spacing: -0.02em;
}
.text-display-lg {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 1.5rem + 3vw, 4rem);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.02em;
}
.text-display-md {
  font-family: var(--font-sans);
  font-size: clamp(1.875rem, 1.5rem + 1.5vw, 2.75rem);
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -0.015em;
}
.text-heading-lg { font-size: 1.5rem; line-height: 1.25; font-weight: 600; }
.text-heading-md { font-size: 1.25rem; line-height: 1.3; font-weight: 600; }
.text-body-lg    { font-size: 1.125rem; line-height: 1.6; }
.text-body-sm    { font-size: 0.875rem; line-height: 1.55; }
.text-eyebrow {
  font-size: 0.75rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.prose-page {
  max-width: 65ch;
}
.prose-page p + p { margin-top: 1.25em; }
.prose-page h2 { @apply text-heading-lg mt-12 mb-4; }
.prose-page h3 { @apply text-heading-md mt-8 mb-3; }
.prose-page a { color: var(--color-brand); text-decoration: underline; text-underline-offset: 3px; }
```

### 3. Container

`src/components/layout/Container.astro`:

```astro
---
interface Props {
  width?: 'wide' | 'prose';
  class?: string;
}
const { width = 'wide', class: className = '' } = Astro.props;
const maxW = width === 'prose' ? 'max-w-[880px]' : 'max-w-[1200px]';
---
<div class={`mx-auto px-6 md:px-8 ${maxW} ${className}`}>
  <slot />
</div>
```

### 4. Section

`src/components/layout/Section.astro`:

```astro
---
interface Props {
  tone?: 'paper' | 'tint' | 'sunken';
  size?: 'standard' | 'compact' | 'hero';
  id?: string;
  class?: string;
}
const { tone = 'paper', size = 'standard', id, class: className = '' } = Astro.props;
const toneMap = {
  paper: 'bg-paper',
  tint: 'bg-paper-tint',
  sunken: 'bg-paper-sunken',
};
const sizeMap = {
  hero: 'py-24 md:py-32 lg:py-40',
  standard: 'py-20 md:py-28',
  compact: 'py-16 md:py-20',
};
---
<section id={id} class={`${toneMap[tone]} ${sizeMap[size]} ${className}`}>
  <slot />
</section>
```

### 5. Eyebrow

`src/components/layout/Eyebrow.astro`:

```astro
---
interface Props { class?: string; }
const { class: className = '' } = Astro.props;
---
<p class={`text-eyebrow text-ink-muted ${className}`}><slot /></p>
```

### 6. DisplayHeading

`src/components/layout/DisplayHeading.astro`:

```astro
---
interface Props {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  class?: string;
}
const { as: Tag = 'h2', size = 'lg', class: className = '' } = Astro.props;
const sizeClass = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
}[size];
---
<Tag class={`${sizeClass} text-ink ${className}`}>
  <slot />
</Tag>
```

### 7. site.ts

`src/data/site.ts`:

```ts
export const site = {
  name: 'Mahade Walid',
  title: 'Webflow Developer',
  tagline: 'Launch faster with professional Webflow development',
  email: 'walidmahade@gmail.com',
  location: 'Bangladesh (remote, works worldwide)',
  url: 'https://mahade.dev',
  ogImage: '/images/og-default.png',
  gaId: 'G-00ZDLV4JQ0',
  links: {
    cal: 'https://cal.com/mahade/30min',
    upwork: 'https://www.upwork.com/freelancers/~01ed6a4d8e51dc09fc?mp_source=share',
    github: 'https://github.com/walidmahade',
    linkedin: '', // TODO: add
    twitter: '@mahadewalid',
  },
} as const;
```

### 8. Header

`src/components/site/Header.astro`:

```astro
---
import Container from '../layout/Container.astro';
import { site } from '@/data/site';

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
---
<header class="sticky top-0 z-40 bg-paper/80 backdrop-blur border-b border-line">
  <Container>
    <div class="flex h-16 items-center justify-between">
      <a href="/" class="font-semibold tracking-tight text-ink">{site.name}</a>
      <nav class="flex items-center gap-8">
        {nav.map((item) => (
          <a href={item.href} class="text-sm text-ink-muted hover:text-ink transition-colors">
            {item.label}
          </a>
        ))}
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

### 9. Footer

`src/components/site/Footer.astro`:

```astro
---
import Container from '../layout/Container.astro';
import { site } from '@/data/site';
const year = new Date().getFullYear();
---
<footer class="border-t border-line bg-paper-tint py-12">
  <Container>
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="font-semibold text-ink">{site.name}</p>
        <p class="text-body-sm text-ink-muted">{site.title} · {site.location}</p>
      </div>
      <div class="flex flex-wrap gap-6 text-body-sm">
        <a href={`mailto:${site.email}`} class="text-ink-muted hover:text-ink">{site.email}</a>
        <a href={site.links.cal} target="_blank" rel="noopener" class="text-ink-muted hover:text-ink">Book a call</a>
        <a href={site.links.upwork} target="_blank" rel="noopener" class="text-ink-muted hover:text-ink">Upwork</a>
        <a href={site.links.github} target="_blank" rel="noopener" class="text-ink-muted hover:text-ink">GitHub</a>
      </div>
    </div>
    <p class="mt-8 text-body-sm text-ink-subtle">© {year} {site.name}. All rights reserved.</p>
  </Container>
</footer>
```

### 10. Wire Layout

Update `src/layouts/Layout.astro` (from plan 01) to render Header and Footer via named slots, and apply the slot by default:

```astro
<slot name="header"><Header /></slot>
<main><slot /></main>
<slot name="footer"><Footer /></slot>
```

Import at top:
```astro
import Header from '@/components/site/Header.astro';
import Footer from '@/components/site/Footer.astro';
```

## Acceptance checklist

- [ ] All 4 layout primitives render without errors
- [ ] Typography utility classes apply correctly (inspect in DevTools — computed font-family shows Instrument Serif for display, Inter for body)
- [ ] Header shows with sticky behavior; nav links visible; primary CTA visible
- [ ] Footer renders at bottom
- [ ] Focus ring appears on Tab through any interactive element
- [ ] `prefers-reduced-motion` media query registers (test by toggling in DevTools → Rendering → Emulate CSS media feature)
- [ ] shadcn `Button` component renders with tokens (drop a `<Button>Test</Button>` test on a blank page)

## Handoff

Next plan: `03-home.md` — build homepage sections using these primitives.
