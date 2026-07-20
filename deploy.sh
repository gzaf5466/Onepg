#!/bin/bash
# ============================================================
# OnePG VPS Automated Full-Stack Clean Deployment Script
# ============================================================

set -e

echo "🚀 Starting OnePG Clean Full-Stack Deployment..."

# 1. Pull latest code cleanly from Git
echo "📥 Fetching latest code from Git..."
git reset --hard || true
git pull || true

# 2. Clean old frontend build files completely
echo "🧹 Cleaning old frontend static build files..."
mkdir -p /var/www/onepg /var/www/html
rm -rf /var/www/onepg/* /var/www/html/*

# 3. Install frontend dependencies & Build clean SPA bundle
echo "📦 Installing frontend dependencies & building production SPA..."
npm install --silent
VITE_API_URL=/api npm run build

# 4. Deploy fresh SPA dist files to Nginx web root
echo "📂 Copying fresh dist assets to /var/www/onepg..."
cp -r dist/* /var/www/onepg/
cp -r dist/* /var/www/html/
chown -R www-data:www-data /var/www/onepg /var/www/html
chmod -R 755 /var/www/onepg /var/www/html

# 5. Install backend dependencies in server/
echo "⚙️ Setting up backend server in server/..."
if [ -d "server" ]; then
  cd server
  npm install --silent
  cd ..
fi

# 6. Stop old PM2 processes & Start/Restart fresh PM2 backend
echo "🔄 Starting/Restarting PM2 backend server process..."
if command -v pm2 &> /dev/null; then
  pm2 delete onepg-backend 2>/dev/null || true
  if [ -f "server/server.js" ]; then
    pm2 start server/server.js --name "onepg-backend"
  elif [ -f "server/index.js" ]; then
    pm2 start server/index.js --name "onepg-backend"
  else
    pm2 restart all || true
  fi
  pm2 save || true
fi

# 7. Reload Nginx Web Server
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ OnePG Clean Deployment Completed Successfully! Live at https://onepg.co.in"
