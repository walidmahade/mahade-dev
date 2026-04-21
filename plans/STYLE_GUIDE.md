# Style Guide — mahade.dev

This is the single source of truth for visual design. Every plan file references tokens defined here. When a plan says "use `--color-ink`" or "use `text-display-lg`", look here for the definition.

**Aesthetic direction:** Inspired by the visual language of modern SaaS marketing sites (Webflow, Linear, Vercel): generous whitespace, large confident typography, soft gradients, rounded cards, small kinetic accents. Light mode only. Professional, trustworthy, modern.

**Guiding principles**
1. **Whitespace is a feature** — section padding is aggressive; don't fear empty space.
2. **Type does the heavy lifting** — big display text in Geist earns the visual hierarchy. Almost nothing else is needed for impact.
3. **Color is used sparingly** — one primary accent. Everything else is monochrome ink on paper.
4. **Motion is restrained** — subtle fades, small translations, slow easings. Nothing springy or playful. Homepage only.
5. **Credibility > cleverness** — we are selling above-average rates. Every choice should read as precise and premium, not experimental.
6. **No shadows, anywhere** — hierarchy comes from borders, tone contrast, and whitespace. Never `box-shadow` or Tailwind's `shadow-*` utilities. This applies to cards, buttons, floating elements, images — everything. If something needs to feel lifted, use a border, a tone shift (`bg-paper-tint` → `bg-paper`), or a ring. Shadow tokens do not exist in `tokens.css`.

---

## Colors

Light mode only. No dark-mode variants.

```css
:root {
  /* Ink (near-black, used for body + headings) */
  --color-ink:          #0B0D13;
  --color-ink-muted:    #4B5261;
  --color-ink-subtle:   #6B7280;

  /* Paper (backgrounds) */
  --color-paper:        #FFFFFF;
  --color-paper-tint:   #F7F7F8;   /* section alternation */
  --color-paper-sunken: #EEEFF2;   /* cards-on-tint */

  /* Borders / dividers */
  --color-line:         #E5E7EB;
  --color-line-strong:  #D1D5DB;

  /* Brand accent — a royal blue that evokes modern SaaS energy */
  --color-brand:        #4353FF;
  --color-brand-hover:  #3441E0;
  --color-brand-soft:   #EEF0FF;   /* tint for badges/pills */

  /* Semantic */
  --color-success:      #0E8345;
  --color-danger:       #C8322D;
  --color-focus-ring:   #4353FF;
}
```

**Usage rules**
- Body text: `--color-ink`
- Muted/secondary text (eyebrows, captions): `--color-ink-muted`
- Section backgrounds alternate: `paper` → `paper-tint` → `paper`
- Accent (`--color-brand`) is reserved for: primary CTA buttons, active nav state, 1-2 brand moments per page, link underlines on hover
- Never use gradient backgrounds on body copy. Gradients allowed only on hero accent shapes and 1 decorative element per page max.

---

## Typography

**Families**
- **Display / headings:** `"Geist Variable", ui-sans-serif, system-ui, sans-serif` — geometric, modern, used for hero H1 and large section openers
- **UI / body:** `"Inter", ui-sans-serif, system-ui, sans-serif` — default for everything else
- **Mono (rare):** `"JetBrains Mono", ui-monospace, SFMono-Regular, monospace` — only inside code blocks or metadata labels

Load via `@fontsource/inter` (400, 500, 600, 700) and `@fontsource-variable/geist`. Self-host; no Google Fonts CDN.

**Scale** (fluid via `clamp()`; mobile → desktop)

| Token | Size (clamp) | Line height | Weight | Use |
|---|---|---|---|---|
| `display-xl` | clamp(3rem, 2rem + 4vw, 5.5rem) | 1.02 | 500 (Geist) | Hero H1 |
| `display-lg` | clamp(2.25rem, 1.5rem + 3vw, 4rem) | 1.05 | 500 (Geist) | Section openers |
| `display-md` | clamp(1.875rem, 1.5rem + 1.5vw, 2.75rem) | 1.1 | 500 (sans) | Sub-section H2 |
| `heading-lg` | 1.5rem | 1.25 | 600 (sans) | Card titles |
| `heading-md` | 1.25rem | 1.3 | 600 (sans) | Small titles |
| `body-lg` | 1.125rem | 1.6 | 400 (sans) | Lead paragraphs |
| `body` | 1rem | 1.6 | 400 (sans) | Default body |
| `body-sm` | 0.875rem | 1.55 | 400 (sans) | Captions, meta |
| `eyebrow` | 0.75rem | 1.3 | 600 (sans) | Uppercase, `letter-spacing: 0.08em` |

**Rules**
- `display-xl` only appears once per page (always the H1)
- Body text never goes below 16px
- Never use weights 300 or lighter
- Line length for paragraphs: 60–75ch max (use `max-w-prose` utility)

---

## Spacing

8px base grid. Tailwind's default scale works. Section rhythm:

| Context | Vertical padding (py) |
|---|---|
| Hero | `py-24 md:py-32 lg:py-40` |
| Standard section | `py-20 md:py-28` |
| Compact section | `py-16 md:py-20` |
| Section inner block gap | `gap-12 md:gap-16` |
| Card internal padding | `p-6 md:p-8` |

Horizontal gutters: `px-6 md:px-8` — all content sits inside a `Container` component with `max-w-[1200px]` (wide) or `max-w-[880px]` (prose).

---

## Radius

```css
--radius-sm: 6px;    /* inputs, small badges */
--radius-md: 10px;   /* buttons */
--radius-lg: 16px;   /* cards */
--radius-xl: 24px;   /* hero panels, large feature blocks */
--radius-full: 9999px;
```

---

## Shadows

**None.** No `box-shadow` or Tailwind `shadow-*` utilities anywhere. Elevation cues come from:

- **Borders** — default `border-line` → emphasis `border-line-strong` on hover
- **Tone contrast** — a card on `bg-paper-tint` reads as a surface sitting on `bg-paper-sunken` without any shadow
- **Ring** — `ring-1 ring-ink` on the featured pricing tier to set it apart

Shadow tokens do not exist in `tokens.css`. If a design mock calls for a shadow, use one of the patterns above instead.

---

## Borders

- Default: `1px solid var(--color-line)`
- Emphasis: `1px solid var(--color-line-strong)`
- Focus ring: `0 0 0 3px rgba(67, 83, 255, 0.35)` — never remove outline without replacement

---

## Components (token mapping)

These are the only primitives. Everything else composes from them.

### Button
- Variants: `primary` (brand bg, white text), `secondary` (ink border, ink text, transparent bg), `ghost` (no border, ink text, hover paper-tint bg)
- Sizes: `sm` (h-9 px-3 text-sm), `md` (h-11 px-5 text-base, default), `lg` (h-12 px-6 text-base)
- Radius: `--radius-md`
- Transition: `transform 150ms, background-color 150ms`
- Hover: `translate-y-[-1px]` (primary only) — no shadow

### Card
- Background: `--color-paper`
- Border: `1px solid --color-line` → `--color-line-strong` on hover
- Radius: `--radius-lg`
- No shadow. Ever.
- Padding: `p-6 md:p-8`

### Input / Textarea
- Background: `--color-paper`
- Border: `1px solid --color-line-strong`
- Radius: `--radius-sm`
- Focus: focus-ring token
- Height: `h-11` (input), min-height `h-32` (textarea)

### Badge / Pill
- Background: `--color-brand-soft`
- Text: `--color-brand`
- Radius: `--radius-full`
- Padding: `px-3 py-1 text-xs font-medium`
- Use for tags, statuses, eyebrow labels

### Eyebrow (text element, not a component)
- Token: `eyebrow`
- Color: `--color-ink-muted`
- Form: uppercase, `0.08em` tracking
- Sits above section openers

---

## Motion

**Homepage only.** Other pages get instant state changes.

**Library:** GSAP + ScrollTrigger. Lazy-imported in a single client-side Astro island (`<HomeMotion client:load />`). Do not load GSAP on non-home pages.

**Principles**
- Max duration: 0.8s
- Default ease: `power2.out` (fades) or `power3.out` (moves)
- Always honor `prefers-reduced-motion: reduce` — in that case, set all animated elements to final state with 0 duration

**Allowed patterns**
1. **Hero entrance on load** — H1 fades + translates up 12px (0.6s, stagger 0.05s across words/lines). Subhead + CTAs follow at +0.15s.
2. **Scroll reveal** — section openers (display headings) fade + translate up 16px when entering viewport, triggered at 80% from top.
3. **Project card on scroll** — subtle 8px rise + opacity 0→1 on enter (0.5s).
4. **Underline on link hover** — `width: 0% → 100%` from left, 200ms, CSS only (not GSAP).

**Forbidden**
- Parallax backgrounds
- Auto-rotating carousels
- Springy/bouncy easings
- Any animation triggered by mouse position (cursor effects)
- Text scramble effects
- Any animation on pages other than `/`

---

## Imagery

- Headshot: existing `assets/images/mahade-headshot.webp` → move to `public/images/`. Use at max 480px wide.
- Project screenshots: WebP, max 1600px wide, served via Astro's `<Image />` for automatic responsive srcsets.
- No stock photography. If a section needs visual, use a custom SVG illustration or a screenshot of real work.

---

## Accessibility baseline

- All interactive elements reachable via keyboard
- Focus ring always visible (token above)
- Color contrast: body text ≥ 7:1 against background; large text ≥ 4.5:1
- All images have `alt` text (decorative images use `alt=""`)
- Forms have associated `<label>` elements
- `html[lang="en"]` always set
- Heading hierarchy never skips (H1 → H2 → H3)

---

## File locations

When implementing, these tokens live at:
- Colors/radius CSS vars: `src/styles/tokens.css` (imported in root layout)
- Tailwind theme extension: `tailwind.config.ts` (maps vars to utilities like `bg-paper`, `text-ink`, `rounded-lg`)
- Typography styles: `src/styles/typography.css`
- Font imports: `src/styles/global.css`
