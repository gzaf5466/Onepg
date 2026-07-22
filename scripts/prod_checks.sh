#!/usr/bin/env bash
set -euo pipefail

HOST=${1:-http://localhost}

echo "Checking frontend headers for COOP..."
curl -sI "$HOST" | grep -i "Cross-Origin-Opener-Policy" || echo "COOP header not found"

echo "Checking backend health endpoint..."
curl -s "$HOST/api/health" || echo "Health check failed"

echo "Checking frontend served files (index.html)..."
curl -s "$HOST" | head -n 20

echo "Searching built dist for '[BHK]' occurrences (if dist available)..."
if [[ -d dist ]]; then
  grep -R "\[BHK\]" -n dist || echo "No [BHK] string found in dist"
else
  echo "dist directory not found locally — run this from the repo after build or run on server where dist exists."
fi

echo "Smoke checks complete. For Google sign-in, test manually in an incognito browser session and inspect network console for popups and scripts."
