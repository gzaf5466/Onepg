import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || "7b52ce07-8da8-41d9-ae78-27bafb5f6406",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/redirect.html` : '/',
  }
};
const msalInstance = new PublicClientApplication(msalConfig);

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const initAndRender = async () => {
  try {
    await msalInstance.initialize();
    const response = await msalInstance.handleRedirectPromise();
    if (response && response.account) {
      window.sessionStorage.setItem('msal_redirect_account', JSON.stringify({
        username: response.account.username,
        name: response.account.name
      }));
    }
  } catch (err) {
    console.error('MSAL initialization error:', err);
  }

  if (import.meta.env.PROD && !googleClientId) {
    // Fail fast in production to avoid running with an incorrect fallback client id
    // This surfaces configuration errors during deploy so they can be fixed immediately.
    // In development we keep the existing fallback for convenience.
    console.error('Missing required environment variable: VITE_GOOGLE_CLIENT_ID (production)');
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = '<div style="padding:24px;font-family:Inter,system-ui,Arial,sans-serif;">Application misconfigured: missing <strong>VITE_GOOGLE_CLIENT_ID</strong>. Set it in your environment before deploying.</div>';
    }
  } else {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <GoogleOAuthProvider clientId={googleClientId || "820468676697-c0rgcdn6dbsjbkab1a87v4io4t7ct6ta.apps.googleusercontent.com"}>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </GoogleOAuthProvider>
      </StrictMode>,
    )
  }
};

initAndRender();
