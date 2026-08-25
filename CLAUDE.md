# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Data Plan (iOS app). Deliberately minimal Astro 6 site styled with Tailwind 4: a landing page (app icon, name, tagline, download button, three screenshots) plus Privacy Policy and Terms of Service. Deployed to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

The app itself lives in the sibling `dataplan-ios` repo — check there (`CLAUDE.md`, `AppConstants.swift`, `Localizable.xcstrings`) before writing any factual claim about what the app does.

## Commands

Package manager is pnpm (10.7.1, Node ≥22.12). Astro provides `dev`, `build`, `preview`.

- `pnpm dev` — local server at `localhost:4321`
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — serve the built site locally
- `pnpm astro check` — type-check `.astro` files (via `@astrojs/check`)

There are no tests, lint config, or formatter config in this repo.

## Architecture notes

- **Four pages**: `index.astro`, `404.astro`, `privacy.md`, `terms.md`. The two markdown pages set `layout: ../layouts/MarkdownLayout.astro` in frontmatter; that layout carries all the prose styling as `[&_h2]:`-style arbitrary variants, so the markdown stays plain.
- **Layout**: `Layout.astro` wraps everything with `Footer` and imports `styles/global.css` (which is just `@import "tailwindcss"` — Tailwind v4 with no separate config file; classes are scanned from the templates). It accepts optional `title`/`description` props and defaults them for the landing page. There is no navbar by design.
- **Tailwind v4 via Vite plugin**: configured in `astro.config.mjs` (`@tailwindcss/vite`), not via `tailwind.config.js`. Use Tailwind v4 syntax (e.g. `bg-linear-to-br`, not `bg-gradient-to-br`).
- **Images**: the default Sharp service is used (`sharp` is an explicit dependency — Astro 6 does not bundle it, and the build hard-fails without it). Screenshots in `src/assets/` are ~700kB–1MB PNGs exported from the simulator; `<Image>` with `widths`/`sizes` cuts them to ~50kB WebP. Always go through `astro:assets` `<Image>` rather than a bare `<img>` for anything in `src/assets/`.
- **Partytown** is registered as an integration but no third-party scripts are wired up yet.

## Conventions

- Components are `.astro` only — no React/Vue/Svelte. Keep it that way unless asked.
- Keep the site small. New marketing sections (features, testimonials, FAQ) were deliberately cut — don't add them back without being asked.
- Don't invent app capabilities, review quotes, or metrics. The App Store ID is `6747405723` and support goes to `endore8@gmail.com`.
- Indentation is mixed (tabs in `Footer.astro`/`MarkdownLayout.astro`, 4-space elsewhere); match the surrounding file rather than reformatting.
