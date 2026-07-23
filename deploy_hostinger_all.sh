#!/bin/bash
# ============================================================
# OnePG Hostinger VPS All-In-One Unified Deployment Script
# ============================================================

set -e

echo "🚀 Starting OnePG Complete Single-Machine Deployment on Hostinger VPS..."

# 1. Ensure we are in project root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# 2. Pull latest code from GitHub
echo "📥 Pulling latest code from GitHub main branch..."
git reset --hard || true
git pull origin main

# 3. Setup Nginx Configuration
echo "🔧 Configuring Nginx Reverse Proxy..."
CONF_SRC="$ROOT_DIR/nginx_onepg.conf"
CONF_DEST="/etc/nginx/sites-available/onepg.co.in"
LINK_DEST="/etc/nginx/sites-enabled/onepg.co.in"

if [ -f "$CONF_SRC" ]; then
    sudo cp "$CONF_SRC" "$CONF_DEST"
    sudo cp "$CONF_SRC" /etc/nginx/sites-available/default
    sudo ln -sf "$CONF_DEST" "$LINK_DEST"
    sudo rm -f /etc/nginx/sites-enabled/default || true
    echo "🔍 Testing Nginx syntax..."
    sudo nginx -t
    echo "🔄 Reloading Nginx service..."
    sudo systemctl reload nginx
else
    echo "⚠️ Warning: $CONF_SRC not found, skipping Nginx copy."
fi

# 4. Install & Start Backend (Express on port 5000)
echo "⚙️ Setting up Express Backend on Port 5000..."
if [ -d "$ROOT_DIR/server" ]; then
    cd "$ROOT_DIR/server"
    npm install --silent
    
    if command -v pm2 &> /dev/null; then
        echo "🔄 Starting/Restarting PM2 backend server process..."
        pm2 delete onepg-backend 2>/dev/null || true
        pm2 start server.js --name "onepg-backend"
        pm2 save || true
    else
        echo "⚠️ PM2 not found. Installing PM2 globally..."
        sudo npm install -g pm2
        pm2 start server.js --name "onepg-backend"
        pm2 save || true
    fi
    cd "$ROOT_DIR"
fi

# 5. Build & Deploy Frontend (SPA in /var/www/onepg)
echo "📦 Building & Deploying Frontend SPA to /var/www/onepg..."
npm install --silent
VITE_API_URL=/api npm run build

sudo mkdir -p /var/www/onepg /var/www/html
sudo rm -rf /var/www/onepg/* /var/www/html/*
sudo cp -r dist/* /var/www/onepg/
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/onepg /var/www/html
sudo chmod -R 755 /var/www/onepg /var/www/html

# 6. Final Nginx Reload
sudo systemctl reload nginx

echo ""
echo "=========================================================="
echo "✅ OnePG Single-Machine Deployment Completed Successfully!"
echo "🌐 Frontend: https://onepg.co.in"
echo "⚙️ Backend API: https://onepg.co.in/api"
echo "=========================================================="
