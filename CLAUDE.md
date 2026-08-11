# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Local dev server (HTTPS on localhost:8080)
npm run dev

# Production build (outputs to dist/)
npm run build

# Lint
npm run lint
```

The dev server requires `localhost-key.pem` and `localhost.pem` (already present in repo root) and sets COOP/COEP headers needed by features like `SharedArrayBuffer`.

## Deployment

The live site (https://bobagi.space) is served **directly** from `/var/www/Bobagi-Website/dist/` on the VPS (IP `45.179.91.168`). Running `npm run build` in that directory updates the live site immediately — there is no separate copy step.

Two GitHub Actions workflows are *meant* to deploy automatically:

- `deploy.yml` — push/merge to `main` → deploys to `/var/www/Bobagi-Website`
- `deploy-develop.yml` — push/merge to `develop` → deploys to `/var/www/develop/Bobagi-Website`

Each builds in CI, then SSHes into the VPS to `git reset --hard && git pull && npm install --legacy-peer-deps && npm run build`.

**⚠️ The automated deploy is currently broken at the SSH step** (`dial tcp: lookup *** : no such host`) — the repo secrets `VPS_HOST` / `VPS_USERNAME` / `VPS_PASSWORD` are unset or unresolvable. Until they are set in the repo settings, deploys must be done by building locally on the VPS (which is why the site is up to date despite red CI). The CI *build* step itself is fixed (see the npm note below).

## Architecture

Static Vue 3 SPA — **Vuetify was fully removed 2026-07-19** (vendor CSS 612KB→0, vendor JS 458KB→188KB). No backend.

**Entry point:** `src/main.js` — Vue app with vue-router and vue-i18n (EN + PT). `App.vue` is just `<router-view/>`.

**Routing:** `src/router.js` — home (eager) + lazy sub-pages: `/p/:slug` case studies (`CaseStudy.vue` + content structure in `src/case-studies.js`, text in the locale files), `/Snowflake`, `/MouseJiggler`, `/HeroWars`. Retired routes (CoinAlert, GoldRush, Avarice, OneWayFly, GodotGame, ProjectZomboid) redirect to `/`. Catch-all renders `NotFound.vue`.

**Components:** every page shares the `.bp` design system. `HomePage.vue` holds the (global, unscoped) `.bp` CSS; sub-pages wrap content in `PageShell.vue` (bp nav + footer + lang toggle, plus the `.pg-*`/`.cs-*` helper styles) and import `FLAGS`/`ICONS` from `bp-shared.js`. To add a case study: entry in `src/case-studies.js` + `cs_*` keys in both locales + link it (card `study:` field or a button) + sitemap.

**Home page (`HomePage.vue`):** a self-contained, full-bleed long-scroll portfolio (Home → About → Projects → Games → Tools → Contact → Footer) that renders **without** the Vuetify chrome — `App.vue` short-circuits to a bare `<router-view>` when `$route.name === 'HomePage'`. It implements its own sticky nav, dot-grid background, footer, language toggle (wired to vue-i18n, persisted in `localStorage['bobagi-lang']`), and an accessibility toggle (`html[data-contrast="high"]`, persisted in `localStorage['bobagi-contrast']`) that switches to a **light** ground (white bg, near-black ink, AAA everywhere). It used to go darker, which bought nothing since the default theme is already 17:1; fixed 2026-08-11. The toggle also lives in `PageShell.vue`, so the preference survives navigation. Two accent tokens matter here: `--yellow` is the FILL (safe on any ground, with `--on-yellow` text over it) and `--accent-ink` is the accent when it is READ (text/border/focus ring). `--accent-ink` is `var(--yellow)` in dark and `#6b4a00` in light, so new CSS only needs to pick the right one. Same split for `--ok-ink` and `--warn-ink`. All of its CSS is namespaced under the `.bp` root class so it never leaks into the Vuetify-styled project pages. The design source of truth lives in `/root/prints/design_handoff_bobagi_portfolio/` and uses Google Fonts (Archivo / Space Grotesk / JetBrains Mono) loaded from `public/index.html`. The other project pages (`/HeroWars`, `/CoinAlert`, …) still exist as standalone routes with the classic chrome; the home page links to a couple of them from its Tools section.

**Theme:** `src/plugins/vuetify.js` — three themes defined (`dark`, `darkGreen`, `light`). Default is `dark` (dark background `#1A1A1A`, accent `#FFD421`). Theme toggle is emitted from `AppBar` and handled in `App.vue`.

**Footer "last update":** not hardcoded. `vue.config.js` injects `__BUILD_DATE__` (the build machine's local date) via `DefinePlugin`; `formatBuildDate(locale)` in `bp-shared.js` renders it per locale (pt `11/08/2026`, en `Aug 11, 2026`) into the `foot_update` i18n key, used by both `HomePage.vue` and `PageShell.vue`. It therefore advances on every `npm run build`.

**i18n:** `src/locales/en.json` and `src/locales/pt.json`. Use the Composition API `useI18n()` or Options API `$t()` for translated strings.

**Path alias:** `@` maps to `src/` (configured in `jsconfig.json` and webpack via `@vue/cli-service`).

**Static assets:** `public/` is copied verbatim to `dist/` at build time. Game assets, downloadable files, and images live there.

This is a **portfolio site only** — it just showcases projects and links out to them. There is no login/registration, no online tic-tac-toe, and no backend. (Those once existed to power an online tic-tac-toe game; that lives in a separate mobile app now.) The old untracked `server/` (auth/socket backend) and `website/` (duplicate build) directories were deleted from the VPS on 2026-06-13; their `.env` files are backed up at `/root/legacy-bobagi-env-backup/`.

## npm / dependencies

Vuetify and its plugins are **gone** (2026-07-19), so the old `ERESOLVE` conflict is too — but the CI workflows still pass `--legacy-peer-deps`, which remains harmless. If `npm install` throws `Cannot read properties of null (reading 'matches')`, the `node_modules` is a stale pnpm-created tree: `rm -rf node_modules && npm install` fixes it. Runtime deps are now just vue, vue-router, vue-i18n, core-js.

## Key conventions

- Components use Vue 2-style Options API (`export default { name, components, data(), methods, ... }`), not `<script setup>`.
- Vuetify components (`v-card`, `v-btn`, etc.) are used throughout the project pages — avoid raw HTML equivalents there. The lone exception is `HomePage.vue`, which is a bespoke custom-CSS design (no Vuetify) recreated from the design handoff.
- The particles.js library is loaded dynamically via a CDN `<script>` tag in `App.vue`'s `mounted()` hook, not as an npm dependency.
- `/* global particlesJS */` comment suppresses ESLint errors for the CDN global.

## Current status (as of 2026-07-19)

**Done 2026-07-19 — portfolio expanded to all live projects (commit `d182c78`):** the Projects
grid in `HomePage.vue` is now **data-driven** (`v-for` over the `projects[]` / `gameCards[]`
arrays in `data()`) — to add a project, append one entry there + two i18n keys (`proj_*` in
`en.json`/`pt.json`) and drop a 1200×800 screenshot in `public/screenshots/` (generated with
headless chrome-headless-shell against the live site). Projects: Cartomania, Porkfolio (private
repo → no GitHub link), Warframe Farm Helper, RetroASM, Rhyme, Chéri Doces + VS.Dragon (client
work tag, no repo links). Games: **Tic Tac Verse featured first** (Google Play + GitHub buttons;
the art is the ads-campaign banner and **switches PT/EN with the site locale** —
`tictacverse-{pt,en}.png`), Hero Wars bot second, then a card grid with Terraria server (status
page) and Primordium. Tools: 4th card = Clonador (`/clonador` APK + GitHub), tool-grid 3→4 cols.
SEO/AI: `noscript` lists every live project, JSON-LD has an `ItemList` of 9 projects, `llms.txt`
rewritten (correct name Gustavo Antonio Perin + all live projects). `.claude/` gitignored
(frontend-review reports live there). Site registered in Google Search Console 2026-07-19
(`sc-domain:bobagi.space`, sitemap accepted — query data takes days to appear).

**Done earlier (2026-06-17):** home page fully redesigned from the handoff and live on bobagi.space; real content/links/screenshots wired in (Cartomania, Porkfolio, Hero Wars bot, Snowflake/Mouse Jiggler/IP Converter); EN/PT + high-contrast toggles working; tic-tac-toe/login remnants and dead files removed; CI build fixed with `--legacy-peer-deps`; SEO files (`llms.txt`, `sitemap.xml`) cleaned.

## Outstanding work / TODO

- **Fix automated deploy (highest priority):** set the `VPS_HOST` / `VPS_USERNAME` / `VPS_PASSWORD` GitHub repo secrets so the SSH deploy step works. Until then every `Deploy to VPS` run shows red even though the build passes.
- ~~Mobile nav menu~~ — DONE 2026-07-19 (hamburger in `HomePage.vue`, `.toggle.burger` + `.mobile-menu`).
- **CV PDFs** (`public/cv/*.pdf`) are **supplied by the operator** since 2026-08-11 (pulled from Google Drive: EN `1f4AYeeIt_TiKCuEvunVXjmIVkiT-0jSh`, PT `1B29u-hQQuNYaQjp7CeZdIam14ePijuh9`) - they are NO LONGER generated from `cv-src/*.html`, which is now stale (see the warning in `cv-src/README.md`; do not run the regen or you overwrite the current PDFs). The new CV resolves the old open questions: Unifique Telecomunicações mar/2024 to present, Triplos dez/2021-nov/2023, NetDente fev/2020-dez/2021, USP concluded 2018-2023. The download link in `HomePage.vue` carries a `?v=<date>` cache-buster - **bump it whenever the PDFs change**, because Cloudflare caches `/cv/*.pdf` for 4h and the API token in `/root/.config/cloudflare/` has no cache-purge permission. Privacy: no phone/street address (the PDF is public).
- ~~Legacy pages / Vuetify debt~~ — DONE 2026-07-19: all remaining pages restyled in `.bp`, dead pages redirect home, Vuetify removed entirely. Sitemap = `/`, the 2 case studies, `/MouseJiggler`, `/Snowflake`, `/HeroWars`.
- **Better Cartomania thumbnail:** `public/screenshots/cartomania.png` uses the project's card/og-image art because the SPA renders blank to screenshot bots. Swap for a real screenshot when one is available. `coinhub.png` and `profile.jpg` are real.
- **GitHub Actions Node version:** `actions/checkout` and `actions/setup-node` run on the deprecated Node 20 (forced to Node 24 by GitHub mid-2026). Bump the action versions.
- **Repo size:** `downloads/dist.7z` (~72 MB) is committed but the Hero Wars page downloads from `bobagi.net`, not from this repo — consider removing it from git to shrink the repo. (Left in place intentionally for now.)
- **Minor copy inconsistencies:** `public/llms.txt` still calls the author "Gustavo Aperin" while the rest of the site standardizes on "Gustavo Antonio Perin"; the home About "facts" numbers (5+, 6, ∞) are illustrative/hardcoded in `HomePage.vue`.
- **Dependency conflict:** the underlying `vuetify` vs `webpack-plugin-vuetify` peer mismatch is only worked around with `--legacy-peer-deps`; a real fix is to align those versions.
