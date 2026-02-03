# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for a psychiatrist/psychotherapist built with Astro, React, and Tailwind CSS. Static site deployed to Vercel.

## Commands

```bash
# Development
pnpm run dev              # Start dev server (port 4321)
pnpm run build            # Production build
pnpm run preview          # Preview production build locally

# Linting
pnpm run lint             # Run all linting (astro check, eslint, prettier, tsc)
pnpm run lint:fix         # Auto-fix eslint and prettier issues

# Individual lint commands
pnpm run lint:astro       # Astro type checking
pnpm run lint:js+ts       # ESLint only
pnpm run lint:format      # Prettier check
pnpm run lint:types       # TypeScript type checking
```

## Architecture

### Component Hybrid Pattern
- **Astro components** (`.astro`) - Used for layout, sections, and static content
- **React components** (`.tsx`) - Used for interactive elements (header navigation)
- React components use `client:load` directive for hydration

### Key Directories
- `src/pages/` - Single page app (`index.astro` only)
- `src/components/` - Mix of Astro and React components
- `src/layouts/` - `BaseLayout.astro` wraps all pages
- `src/assets/` - Images and static assets
- `src/utils.ts` - Utility functions (includes `cn` for Tailwind class merging)

### Path Alias
Use `@/*` to import from `src/` directory (e.g., `@/components/header`)

### Styling
- Tailwind CSS with custom theme colors defined in `tailwind.config.ts`
- Custom colors: `bg`, `bgDark`, `red`, `accent`, `text`
- NextUI component library integrated
- Custom breakpoint: `xs: 450px`

### External Services
- **Brevo API** - Contact form email submission (requires `BREVO_API_KEY` and `EMAIL_CONTACT` env vars)
- **Google Analytics** - Tracking via gtag

## Code Quality

- ESLint with airbnb-typescript, tailwindcss, and accessibility plugins
- Prettier with Astro and Tailwind plugins
- Strict TypeScript configuration
- Pre-commit hooks via Husky + nano-staged auto-format and lint staged files
