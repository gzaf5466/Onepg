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

# 4. Manage Backend Server Process (onepg-backend on Port 5000)
echo "⚙️ Managing PM2 Backend Service..."
if [ ! -d "server" ]; then
  echo "📥 Fetching server backend code..."
  git clone -b server https://github.com/gzaf5466/Onepg.git server
else
  echo "📥 Updating server backend code..."
  cd server && git pull origin server && cd ..
fi

if [ -d "server" ]; then
  cd server
  npm install --silent
  PORT=5000 pm2 restart onepg-backend 2>/dev/null || PORT=5000 pm2 start index.js --name "onepg-backend"
  pm2 save
  cd ..
fi

# 5. Ensure Nginx /api proxy configuration points to port 5000 & Reload Nginx
echo "🔄 Checking Nginx configs for /api proxy rule..."
for conf in /etc/nginx/sites-available/* /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf; do
  if [ -f "$conf" ]; then
    # Replace any old 3000 port references with 5000
    sed -i 's/proxy_pass http:\/\/localhost:3000;/proxy_pass http:\/\/localhost:5000;/g' "$conf" 2>/dev/null || true
    if ! grep -q "location /api" "$conf"; then
      echo "⚙️ Adding /api proxy block to $conf..."
      sed -i '/location \/ {/i \    location /api {\n        proxy_pass http://localhost:5000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n' "$conf" 2>/dev/null || true
    fi
  fi
done

sudo nginx -t && sudo systemctl reload nginx

echo "✅ OnePG Deployment Complete! Live at https://onepg.co.in"
