# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build (runs partytown copylib first)
pnpm start            # Run production server
pnpm test             # Run tests with Vitest
pnpm lint             # Lint with Biome
pnpm format           # Format with Biome
pnpm check            # Run Biome check (lint + format)
```

## Architecture Overview

This is a portfolio website built with TanStack Start (React SSR framework) deployed to Cloudflare Workers.

### Tech Stack
- **Framework**: TanStack Start with file-based routing
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome (tabs, double quotes)
- **Testing**: Vitest
- **Deployment**: Cloudflare Workers (see `wrangler.toml`)
- **Analytics**: Google Analytics via Partytown (web worker offloading)

### Project Structure
- `src/routes/` - File-based routes (TanStack Router auto-generates `routeTree.gen.ts`)
- `src/routes/__root.tsx` - Root layout with SEO meta tags, fonts, and Partytown setup
- `src/components/sections/` - Page sections (Hero, Header, Experience, Projects, Contact)
- `src/data/portfolio.ts` - Static data for experiences, projects, and skills
- `src/lib/` - Utilities (`cn()` for class merging, analytics, status)

### Key Patterns
- **Lazy loading**: Below-fold sections use React.lazy() for code splitting
- **Path aliases**: `@/*` maps to `./src/*`
- **Chunk splitting**: Vite config separates vendor, router, icons, and analytics bundles
- **Devtools exclusion**: TanStack devtools are externalized in production builds

## Adding UI Components

Use Shadcn with pnpm:
```bash
pnpx shadcn@latest add button
```
