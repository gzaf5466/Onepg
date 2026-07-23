#!/bin/bash
# ============================================================
# OnePG VPS Automated Clean Deployment Script - FRONTEND
# ============================================================

set -e

echo "🚀 Starting OnePG Clean Frontend Deployment..."

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
VITE_API_URL=/api VITE_GOOGLE_CLIENT_ID=820468676697-c0rgcdn6dbsjbkab1a87v4io4t7ct6ta.apps.googleusercontent.com npm run build

# 4. Deploy fresh SPA dist files to Nginx web root
echo "📂 Copying fresh dist assets to /var/www/onepg..."
cp -r dist/* /var/www/onepg/
cp -r dist/* /var/www/html/
chown -R www-data:www-data /var/www/onepg /var/www/html
chmod -R 755 /var/www/onepg /var/www/html

# 5. Reload Nginx Web Server
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ OnePG Frontend Deployment Completed Successfully! Live at https://onepg.co.in"
