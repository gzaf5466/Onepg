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

const DEFAULT_GOOGLE_CLIENT_ID = "820468676697-c0rgcdn6dbsjbkab1a87v4io4t7ct6ta.apps.googleusercontent.com";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;

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
    if (err && err.name !== 'BrowserAuthError') {
      window.sessionStorage.setItem('msal_redirect_error', err.message || 'Microsoft authentication failed.');
    }
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </GoogleOAuthProvider>
    </StrictMode>,
  );
};

initAndRender();
