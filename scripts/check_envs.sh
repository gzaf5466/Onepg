#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/check_envs.sh [path_to_repo]
REPO_PATH=${1:-.}
cd "$REPO_PATH"

echo "Checking required environment variables for production build..."
missing=0
check_var(){
  name=$1
  if [[ -z "${!name:-}" ]]; then
    if [[ -f .env ]]; then
      grep -q "^${name}=" .env || {
        echo "MISSING: $name"
        missing=1
      }
    else
      echo "MISSING: $name"
      missing=1
    fi
  else
    echo "OK: $name present in environment"
  fi
}

# Frontend build-time envs
check_var VITE_GOOGLE_CLIENT_ID

# Placeholder for vendor keys you may require
# check_var MERCHANT_PUBLIC_KEY
# check_var MERCHANT_ID

if [[ $missing -ne 0 ]]; then
  echo "One or more required env vars are missing. Set them in CI or export before building."
  exit 2
fi

if [[ -d dist ]]; then
  echo "Scanning built files in dist for VITE_GOOGLE_CLIENT_ID..."
  if grep -R "VITE_GOOGLE_CLIENT_ID" -n dist >/dev/null 2>&1; then
    echo "Note: dist contains references to VITE_GOOGLE_CLIENT_ID (possibly not replaced)."
  fi
  # Try to find the actual client id value in built JS
  if [[ -n "${VITE_GOOGLE_CLIENT_ID:-}" ]]; then
    if grep -R "${VITE_GOOGLE_CLIENT_ID}" dist >/dev/null 2>&1; then
      echo "OK: Built bundle contains the Google client id"
    else
      echo "WARNING: built bundle does not contain the provided Google client id. Ensure build used the env var at build time."
    fi
  fi
fi

echo "Environment checks complete."
