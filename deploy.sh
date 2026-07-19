#!/bin/bash
# ============================================================
# OnePG VPS Automated Deployment Script
# ============================================================

set -e

echo "🚀 Starting OnePG Deployment..."

# 1. Pull latest code from main branch
echo "📥 Fetching latest code from Git..."
git reset --hard HEAD
git clean -fd
git pull origin main

# 2. Build production frontend SPA bundle
echo "📦 Building production frontend..."
npm run build

# 3. Deploy frontend bundle to Nginx web root
echo "📂 Deploying dist assets to /var/www/onepg..."
mkdir -p /var/www/onepg
cp -r dist/* /var/www/onepg/
chown -R www-data:www-data /var/www/onepg
chmod -R 755 /var/www/onepg

# 4. Check & Restart PM2 Backend Process
echo "⚙️ Managing PM2 Backend Service..."
if [ -d "server" ]; then
  cd server
  npm install --production
  PORT=3000 pm2 restart onepg-backend 2>/dev/null || PORT=3000 pm2 start index.js --name "onepg-backend"
  pm2 save
  cd ..
fi

# 5. Reload Nginx Web Server
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ OnePG Deployment Complete! Live at https://onepg.co.in"
