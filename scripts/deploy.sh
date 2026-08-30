#!/usr/bin/env bash
# Manual Pages deploy: build and push dist/ to the gh-pages branch.
# Used while account Actions are unavailable (billing lock); the
# committed Actions workflow (deploy.yml) is the long-term path.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

DEPLOY_DIR=$(mktemp -d)
git init -q -b gh-pages "$DEPLOY_DIR"
git -C "$DEPLOY_DIR" remote add origin "$(git remote get-url origin)"
touch "$DEPLOY_DIR/.nojekyll"
cp -r dist/. "$DEPLOY_DIR/"

git -C "$DEPLOY_DIR" add -A
git -C "$DEPLOY_DIR" -c user.name="${GIT_AUTHOR_NAME:-Sam Matuba}" -c user.email="${GIT_AUTHOR_EMAIL:-sammatuba@users.noreply.github.com}" \
  commit -q -m "deploy: $(git rev-parse --short HEAD) — $(date -u '+%Y-%m-%d %H:%M UTC')"
git -C "$DEPLOY_DIR" push -q --force origin gh-pages
rm -rf "$DEPLOY_DIR"
echo "✓ pushed dist → gh-pages"
