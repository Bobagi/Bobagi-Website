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

Two GitHub Actions workflows handle deployment automatically:

- `deploy.yml` — triggers on push/merge to `main`, deploys to `/var/www/Bobagi-Website` on the VPS
- `deploy-develop.yml` — triggers on push/merge to `develop`, deploys to `/var/www/develop/Bobagi-Website`

Both workflows run `npm install && npm run build` in CI, then SSH into the VPS and run the same commands there. The VPS serves the built `dist/` directory directly via a static file server.

## Architecture

Static Vue 3 + Vuetify 3 SPA. No backend — all backend/auth/database layers have been removed.

**Entry point:** `src/main.js` — sets up Vue app with vue-router, vue-i18n (EN + PT), and Vuetify.

**Routing:** `src/router.js` — each project page is a top-level route (e.g. `/CoinAlert`, `/GoldRush`). The catch-all `/:pathMatch(.*)*` renders `NotFound.vue`.

**Components:** `src/components/` — one `.vue` file per page/feature plus shared layout components (`AppBar.vue`, `FooterBar.vue`). `App.vue` is the shell: for every route **except** the home page it renders `AppBar`, a `<router-view>` inside a `v-card`, `FooterBar`, a particles.js animated background, a global loading overlay, and a global snackbar.

**Home page (`HomePage.vue`):** a self-contained, full-bleed long-scroll portfolio (Home → About → Projects → Games → Tools → Contact → Footer) that renders **without** the Vuetify chrome — `App.vue` short-circuits to a bare `<router-view>` when `$route.name === 'HomePage'`. It implements its own sticky nav, dot-grid background, footer, language toggle (wired to vue-i18n, persisted in `localStorage['bobagi-lang']`), and an accessibility **high-contrast** toggle (`html[data-contrast="high"]`, persisted in `localStorage['bobagi-contrast']`). All of its CSS is namespaced under the `.bp` root class so it never leaks into the Vuetify-styled project pages. The design source of truth lives in `/root/prints/design_handoff_bobagi_portfolio/` and uses Google Fonts (Archivo / Space Grotesk / JetBrains Mono) loaded from `public/index.html`. The other project pages (`/HeroWars`, `/CoinAlert`, …) still exist as standalone routes with the classic chrome; the home page links to a couple of them from its Tools section.

**Theme:** `src/plugins/vuetify.js` — three themes defined (`dark`, `darkGreen`, `light`). Default is `dark` (dark background `#1A1A1A`, accent `#FFD421`). Theme toggle is emitted from `AppBar` and handled in `App.vue`.

**i18n:** `src/locales/en.json` and `src/locales/pt.json`. Use the Composition API `useI18n()` or Options API `$t()` for translated strings.

**Path alias:** `@` maps to `src/` (configured in `jsconfig.json` and webpack via `@vue/cli-service`).

**Static assets:** `public/` is copied verbatim to `dist/` at build time. Game assets, downloadable files, and images live there.

This is a **portfolio site only** — it just showcases projects and links out to them. There is no login/registration, no online tic-tac-toe, and no backend. (Those once existed to power an online tic-tac-toe game; that lives in a separate mobile app now.) If you find a leftover `server/` directory (old auth/socket backend) or a `website/` directory (an old duplicate build) on disk, they are untracked legacy cruft, not used by the build or the deployed site.

## Key conventions

- Components use Vue 2-style Options API (`export default { name, components, data(), methods, ... }`), not `<script setup>`.
- Vuetify components (`v-card`, `v-btn`, etc.) are used throughout the project pages — avoid raw HTML equivalents there. The lone exception is `HomePage.vue`, which is a bespoke custom-CSS design (no Vuetify) recreated from the design handoff.
- The particles.js library is loaded dynamically via a CDN `<script>` tag in `App.vue`'s `mounted()` hook, not as an npm dependency.
- `/* global particlesJS */` comment suppresses ESLint errors for the CDN global.
