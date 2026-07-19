#!/bin/bash
# ============================================================
# OnePG VPS Automated Deployment Script
# ============================================================

set -e

echo "🚀 Starting OnePG Deployment..."

# 1. Pull latest code from main branch
echo "📥 Fetching latest code from Git..."
git reset --hard origin/main || true
git pull origin main

# 2. Install dependencies & Build production frontend SPA bundle
echo "📦 Installing dependencies & building production frontend with VITE_API_URL=/api..."
npm install --silent
VITE_API_URL=/api npm run build

# 3. Clean old assets & Deploy new bundle to Nginx web roots
echo "📂 Cleaning old assets & copying new dist build..."
mkdir -p /var/www/onepg /var/www/html
rm -rf /var/www/onepg/* /var/www/html/*
cp -r dist/* /var/www/onepg/
cp -r dist/* /var/www/html/
chown -R www-data:www-data /var/www/onepg /var/www/html
chmod -R 755 /var/www/onepg /var/www/html

# 4. Reload Nginx Web Server
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ OnePG Frontend Deployment Complete! Live at https://onepg.co.in"
