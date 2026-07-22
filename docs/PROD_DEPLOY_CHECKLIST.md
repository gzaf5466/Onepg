# Production Deploy Checklist (OnePG)

Follow this checklist to build, verify, and deploy the application using the git-pull workflow.

1) Required secrets
 - `VITE_GOOGLE_CLIENT_ID` — must be set at frontend build time (CI or server build env).
 - Payment vendor keys (e.g., `MERCHANT_PUBLIC_KEY`, `MERCHANT_ID`) — store in secrets manager or environment.

2) Google OAuth verification
 - Open Google Cloud Console → OAuth 2.0 Credentials for your project.
 - Ensure `Authorized JavaScript origins` includes your production origin(s): `https://onepg.co.in` and `https://www.onepg.co.in`.
 - Ensure `Authorized redirect URIs` include `/` or specific redirect path used by your app (e.g., `https://onepg.co.in/`).

3) Build steps (on build server or production server)
```bash
# on build server or server via ssh
export VITE_GOOGLE_CLIENT_ID=your-google-client-id
cd /path/to/repo
git fetch --all --prune
git checkout main
git reset --hard origin/main

# backend
cd server
npm ci --production

# frontend
cd ..
npm ci
npm run build
```

4) Deploy built frontend
 - Copy contents of `dist/` to your nginx root (e.g., `/var/www/onepg`) or to your static hosting.
 - Restart or reload nginx:
```bash
sudo nginx -s reload
```

5) Start backend
 - Use `pm2` or `systemd`. Example `systemd` service name: `onepg`.
 - Restart via:
```bash
sudo systemctl restart onepg
```
or
```bash
pm2 startOrReload ecosystem.config.js
```

6) Smoke checks (run `scripts/prod_checks.sh`)
 - Verify COOP header present on the root document.
 - Verify `GET /api/health` returns healthy status.
 - In an incognito browser, attempt Google sign-in and verify popup flow closes and completes.

7) VPS / Hostinger frontend header configuration
 - If your frontend is deployed on a VPS or Hostinger-managed server, add the COOP header in your webserver configuration.
 - For Nginx:
```nginx
add_header Cross-Origin-Opener-Policy "same-origin-allow-popups" always;
```
 - For Apache:
```apache
Header always set Cross-Origin-Opener-Policy "same-origin-allow-popups"
```
 - If your hosting panel exposes custom HTTP headers, set `Cross-Origin-Opener-Policy` to `same-origin-allow-popups` for your site.
 - Ensure this header is present on the root HTML page served to users, not just in the app build.

8) Troubleshooting
 - If you see `[BHK] install: missing/invalid publicKey or merchantId` in console, open DevTools → Network → filter `script` to locate the script URL. If that script is injected by an extension, test in incognito to confirm.
 - If Google sign-in fails: check browser console for blocked popups (COOP) or CORS errors; ensure OAuth client origins/redirects are correct.

8) Post-deploy
 - Invalidate CDN cache if you use CDN.
 - Monitor logs: `sudo journalctl -u onepg -f` or `pm2 logs onepg`.
