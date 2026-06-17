#!/usr/bin/env bash
# Deploy helper for Bobagi-Website — static site; `npm run build` IS the deploy (nginx serves dist/).
# Usage: ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
source ~/.nvm/nvm.sh 2>/dev/null || true

step() { printf '\n\033[1;33m▶ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }

step "npm install + build (Bobagi-Website)"
npm install --no-audit --no-fund --silent
npm run build
ok "built → dist/ (live via nginx)"
printf "\033[1;33mℹ Pushing to main also triggers the GitHub Actions deploy.\033[0m\n"
printf '\n\033[1;32m✓ Deploy done.\033[0m\n'
