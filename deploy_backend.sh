#!/bin/bash
# ============================================================
# OnePG VPS Automated Clean Deployment Script - BACKEND
# ============================================================

set -e

echo "🚀 Starting OnePG Clean Backend Deployment..."

# 1. Pull latest code cleanly from Git
echo "📥 Fetching latest code from Git..."
git reset --hard || true
git pull || true

# 2. Install backend dependencies in server/
echo "⚙️ Setting up backend server dependencies in server/..."
if [ -d "server" ]; then
  cd server
  npm install --silent
  cd ..
else
  echo "❌ Error: server/ directory not found!"
  exit 1
fi

# 3. Stop old PM2 processes & Start/Restart fresh PM2 backend
echo "🔄 Starting/Restarting PM2 backend server process..."
if command -v pm2 &> /dev/null; then
  # Try to delete existing process to ensure clean restart with new config
  pm2 delete onepg-backend 2>/dev/null || true
  
  if [ -f "server/server.js" ]; then
    pm2 start server/server.js --name "onepg-backend"
  elif [ -f "server/index.js" ]; then
    pm2 start server/index.js --name "onepg-backend"
  else
    echo "⚠️ Warning: Could not find server/server.js or server/index.js"
    pm2 restart all || true
  fi
  pm2 save || true
else
  echo "❌ Error: pm2 is not installed! Run 'npm install -g pm2' first."
fi

echo "✅ OnePG Backend Deployment Completed Successfully!"
