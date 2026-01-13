# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
php -S localhost:3000 router.php    # Start dev server on port 3000
```

## Architecture Overview

This is a portfolio website built with vanilla PHP deployed to Railway.

### Tech Stack
- **Framework**: Vanilla PHP (no framework)
- **Styling**: Tailwind CSS v4 (via CDN)
- **Deployment**: Railway (see `nixpacks.toml` and `Procfile`)
- **Analytics**: Google Analytics

### Project Structure
- `index.php` - Homepage (main entry point)
- `uses.php` - Tools & technologies page
- `404.php` - Custom 404 page
- `router.php` - URL routing for PHP built-in server
- `includes/` - Reusable PHP components
  - `data.php` - Portfolio data (experiences, projects, skills)
  - `head.php` - HTML head with meta tags, fonts, styles
  - `header.php` - Navigation component
  - `footer.php` - Footer component
- `sections/` - Page sections
  - `hero.php` - Hero/intro section
  - `experience.php` - Work experience section
  - `projects.php` - Projects section with GitHub activity
  - `contact.php` - Contact CTA section
- `assets/` - Static assets
  - `css/styles.css` - Custom animations and styles
  - `images/` - Images (headshot, favicon)
- `archive-tanstack-start/` - Previous TanStack Start implementation

### Key Patterns
- **Includes**: PHP `include` statements for component reuse
- **Data separation**: All content in `includes/data.php` as PHP arrays
- **Tailwind CDN**: No build step required, configured inline
- **Railway deployment**: Uses PHP built-in server with router.php

### Deployment to Railway
1. Push to GitHub
2. Connect repo to Railway
3. Railway auto-detects PHP via `nixpacks.toml`
4. Deploy with `Procfile` command
