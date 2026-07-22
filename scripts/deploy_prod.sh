#!/usr/bin/env bash
set -euo pipefail

# Usage: sudo ./scripts/deploy_prod.sh /path/to/repo BRANCH VITE_GOOGLE_CLIENT_ID
# Example: sudo ./scripts/deploy_prod.sh /var/www/onepg main "your-client-id"

REPO_PATH=${1:-.}
BRANCH=${2:-main}
VITE_GOOGLE_CLIENT_ID=${3:-}

if [[ -z "$VITE_GOOGLE_CLIENT_ID" ]]; then
  echo "ERROR: VITE_GOOGLE_CLIENT_ID must be provided as third argument"
  exit 2
fi

echo "Deploying branch '$BRANCH' from $REPO_PATH"
cd "$REPO_PATH"

echo "Fetching latest..."
git fetch --all --prune
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "Installing backend deps..."
cd server
npm ci --production

echo "Building frontend..."
cd ..
export VITE_GOOGLE_CLIENT_ID="$VITE_GOOGLE_CLIENT_ID"
npm ci
npm run build

echo "Deploying frontend to nginx root..."
NGINX_ROOT=${NGINX_ROOT:-/var/www/onepg}
if [[ ! -d "$NGINX_ROOT" ]]; then
  echo "Creating nginx root at $NGINX_ROOT"
  mkdir -p "$NGINX_ROOT"
fi

rm -rf "$NGINX_ROOT"/*
cp -r dist/* "$NGINX_ROOT/"

echo "Restarting backend service..."
# Try pm2 then systemd
if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrRestart server/ecosystem.config.js || pm2 restart onepg || pm2 start server/server.js --name onepg --update-env
else
  if systemctl list-units --full -all | grep -q "onepg"; then
    systemctl daemon-reload || true
    systemctl restart onepg || true
  else
    echo "No pm2 or systemd service named 'onepg' found. You may need to start the backend manually."
  fi
fi

echo "Reloading nginx..."
if command -v nginx >/dev/null 2>&1; then
  nginx -s reload || systemctl reload nginx || true
fi

echo "Deployment complete. Run scripts/prod_checks.sh <HOST> to run smoke checks."
