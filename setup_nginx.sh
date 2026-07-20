#!/bin/bash
# ============================================================
# OnePG Automated Nginx Setup & Proxy Fix Script
# ============================================================

set -e

echo "🔧 Installing & Configuring OnePG Production Nginx Rules..."

CONF_SRC="./nginx_onepg.conf"
CONF_DEST="/etc/nginx/sites-available/onepg.co.in"
LINK_DEST="/etc/nginx/sites-enabled/onepg.co.in"

if [ ! -f "$CONF_SRC" ]; then
    echo "❌ Error: $CONF_SRC not found. Make sure you are in the project root folder."
    exit 1
fi

# Copy Nginx config
cp "$CONF_SRC" "$CONF_DEST"

# Link to sites-enabled
ln -sf "$CONF_DEST" "$LINK_DEST"

# Test syntax
echo "🔍 Testing Nginx configuration..."
nginx -t

# Reload Nginx
echo "🔄 Reloading Nginx service..."
systemctl reload nginx

echo "✅ Nginx reverse proxy successfully configured! /api is live at https://onepg.co.in/api/"
