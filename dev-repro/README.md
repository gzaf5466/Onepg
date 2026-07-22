BHK + OAuth popup reproduction

This small demo reproduces two issues you saw in production:

- The `[BHK] install: missing/invalid publicKey or merchantId` warning from a widget script when config is missing.
- The OAuth popup flow that posts a message back to the opener and closes (used to test COOP behavior).

How to run locally:

1. cd dev-repro
2. npm install
3. npm start
4. Open http://localhost:5174 in your browser, open DevTools and click "Open OAuth Popup".

Notes:
- By default the demo does NOT set `window.__BHK_CONFIG__` so the widget logs the missing key warning. To simulate a successful widget init, edit `public/index.html` and uncomment the `window.__BHK_CONFIG__` line.
- The Express server sets `Cross-Origin-Opener-Policy: same-origin-allow-popups` via `helmet` to mirror your production header.

Use this to reproduce and confirm whether the popup close/postMessage flow still triggers COOP warnings in your environment.
