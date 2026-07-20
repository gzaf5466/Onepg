import React, { createContext, useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppContext = createContext();

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE = getApiBase();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('onepg_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('onepg_token'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('onepg_role') || null);
  
  const [clients, setClients] = useState([]);
  const [currentClientId, setCurrentClientId] = useState(() => localStorage.getItem('onepg_current_client_id') || '');
  const [tickets, setTickets] = useState([]);
  
  // Global Toast Notifications State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(prev => prev && prev.message === message ? null : prev);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Helper for authenticated HTTP headers
  const getAuthHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Fetch clients from the database
  const fetchClients = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/clients`, {
        headers: getAuthHeaders(),
      });
      const contentType = res.headers.get('content-type');
      if (!res.ok || !contentType || !contentType.includes('application/json')) {
        console.warn('Backend API returned non-JSON response:', res.status);
        if (res.status === 401 || res.status === 403) logout();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
        if (data.clients.length > 0) {
          // If no current client is selected, select the first one
          const currentSavedId = localStorage.getItem('onepg_current_client_id');
          const exists = data.clients.some(c => c.id === currentSavedId);
          if (!currentSavedId || !exists) {
            setCurrentClientId(data.clients[0].id);
            localStorage.setItem('onepg_current_client_id', data.clients[0].id);
          }
        }
      } else {
        if (res.status === 401 || res.status === 403) {
          logout();
        }
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  // Fetch support tickets from database
  const fetchTickets = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get('content-type');
      if (!res.ok || !contentType || !contentType.includes('application/json')) {
        console.warn('Backend API returned non-JSON response:', res.status);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    }
  };

  // Effect to load data upon login
  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
      fetchTickets();
    } else {
      setClients([]);
      setTickets([]);
    }
  }, [isAuthenticated, token]);

  // Effect to keep current client ID persisted
  useEffect(() => {
    if (currentClientId) {
      localStorage.setItem('onepg_current_client_id', currentClientId);
    } else {
      localStorage.removeItem('onepg_current_client_id');
    }
  }, [currentClientId]);

  // Authenticate user via backend credentials
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: false, message: 'Server returned unexpected response.' };
      }
      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        setUserRole(data.user.role);
        localStorage.setItem('onepg_token', data.token);
        localStorage.setItem('onepg_role', data.user.role);
        if (data.user.name) localStorage.setItem('onepg_user_name', data.user.name);
        if (data.user.email) localStorage.setItem('onepg_email', data.user.email);
        if (data.user.company) localStorage.setItem('onepg_company', data.user.company);

        if (data.user.client_id) {
          setCurrentClientId(data.user.client_id);
        }

        showToast(`Welcome back, ${data.user.name}!`, 'success');
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (err) {
      console.error('Login request error:', err);
      return { success: false, message: 'Connection to server failed.' };
    }
  };

  // Send verification OTP code for Signup
  const sendSignupOtp = async (email, name) => {
    try {
      const res = await fetch(`${API_BASE}/auth/send-signup-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned unexpected response.', 'error');
        return { success: false, message: 'Server returned unexpected response.' };
      }
      const data = await res.json();
      if (data.success) {
        showToast(data.message, 'info');
      } else {
        showToast(data.message || 'Failed to send verification code.', 'error');
      }
      return data;
    } catch (err) {
      console.error('Send signup OTP error:', err);
      showToast('Network error sending verification code.', 'error');
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Register a new merchant user (with OTP verification)
  const signup = async (name, company, email, password, phone, otp, plan = 'Basic') => {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, password, phone, otp, plan })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: false, message: 'Server returned unexpected response.' };
      }
      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        setUserRole(data.user.role);
        localStorage.setItem('onepg_token', data.token);
        localStorage.setItem('onepg_role', data.user.role);
        if (data.user.name) localStorage.setItem('onepg_user_name', data.user.name);
        if (data.user.email) localStorage.setItem('onepg_email', data.user.email);
        if (company) localStorage.setItem('onepg_company', company);

        if (data.user.client_id) {
          setCurrentClientId(data.user.client_id);
        }

        showToast(`Account created successfully! Welcome, ${data.user.name}.`, 'success');
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (err) {
      console.error('Signup error:', err);
      return { success: false, message: 'Server connection failed.' };
    }
  };

  const handleOAuthSuccess = useCallback((newToken, role = 'client') => {
    setToken(newToken);
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('onepg_token', newToken);
    localStorage.setItem('onepg_role', role);
  }, []);

  // Social Auth (Google / Microsoft / GitHub)
  const socialLogin = async (provider, email, name) => {
    const defaultEmail = email || (provider === 'google' ? 'merchant.google@onepg.co.in' : provider === 'microsoft' ? 'merchant.microsoft@onepg.co.in' : 'developer.github@onepg.co.in');
    const defaultName = name || (provider === 'google' ? 'Google Merchant' : provider === 'microsoft' ? 'Microsoft Merchant' : 'GitHub Developer');

    try {
      const res = await fetch(`${API_BASE}/auth/social`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, email: defaultEmail, name: defaultName })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: false, message: 'Server returned unexpected response.' };
      }
      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        setUserRole(data.user.role);
        localStorage.setItem('onepg_token', data.token);
        localStorage.setItem('onepg_role', data.user.role);

        if (data.user.client_id) {
          setCurrentClientId(data.user.client_id);
        }

        const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);
        showToast(`Signed in with ${providerLabel}! Welcome, ${data.user.name}.`, 'success');
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Social sign in failed.' };
      }
    } catch (err) {
      console.error('Social login error:', err);
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Create Razorpay Order
  const createRazorpayOrder = async (amount, planName) => {
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ amount, planName })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false, message: 'Failed to create payment order.' };
      }
      return await res.json();
    } catch (err) {
      console.error('Razorpay order creation error:', err);
      showToast('Network error initializing payment.', 'error');
      return { success: false, message: 'Failed to create payment order.' };
    }
  };

  // Verify Razorpay Payment Signature
  const verifyRazorpayPayment = async (orderId, paymentId, signature, amountPaid) => {
    try {
      const res = await fetch(`${API_BASE}/payments/verify-payment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
          amountPaid
        })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false, message: 'Server connection failed.' };
      }
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Payment completed successfully!', 'success');
        fetchClients();
      } else {
        showToast(data.message || 'Payment verification failed.', 'error');
      }
      return data;
    } catch (err) {
      console.error('Razorpay verification error:', err);
      showToast('Network error verifying payment.', 'error');
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Request Password Reset OTP (AWS SES / Backend Endpoint)
  const requestPasswordReset = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false, message: 'Server connection failed.' };
      }
      const data = await res.json();
      if (data.success) {
        showToast(data.message, 'info');
      } else {
        showToast(data.message || 'Failed to send OTP code.', 'error');
      }
      return data;
    } catch (err) {
      console.error('Password reset request error:', err);
      showToast('Network error processing request.', 'error');
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Verify OTP
  const verifyResetOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false, message: 'Server connection failed.' };
      }
      const data = await res.json();
      if (!data.success) {
        showToast(data.message || 'Invalid verification code.', 'error');
      }
      return data;
    } catch (err) {
      showToast('Network error verifying code.', 'error');
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Set New Password
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false, message: 'Server connection failed.' };
      }
      const data = await res.json();
      if (data.success) {
        showToast('Password reset successfully! Please login.', 'success');
      } else {
        showToast(data.message || 'Failed to reset password.', 'error');
      }
      return data;
    } catch (err) {
      showToast('Network error resetting password.', 'error');
      return { success: false, message: 'Server connection failed.' };
    }
  };

  // Revoke credentials and reset state
  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);
    setClients([]);
    setTickets([]);
    setCurrentClientId('');
    localStorage.removeItem('onepg_token');
    localStorage.removeItem('onepg_role');
    localStorage.removeItem('onepg_current_client_id');
    localStorage.removeItem('onepg_user_name');
    localStorage.removeItem('onepg_email');
    localStorage.removeItem('onepg_company');
    showToast('Logged out of system successfully.', 'info');
  };

  // Admin: Register a new merchant
  const addClient = async (clientData) => {
    try {
      const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(clientData)
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        showToast(`Merchant profile for ${clientData.company} initialized.`, 'success');
        fetchClients();
      } else {
        showToast(data.message || 'Failed to create client.', 'error');
      }
    } catch (err) {
      showToast('Network error creating client.', 'error');
    }
  };

  // Admin: Update Status / Progress
  const updateClientStatus = async (clientId, serviceName, newStatus, notes = '') => {
    try {
      const res = await fetch(`${API_BASE}/clients/${clientId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ serviceName, newStatus, notes })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        fetchClients();
      } else {
        showToast(data.message || 'Failed to update service status.', 'error');
      }
    } catch (err) {
      showToast('Network error updating status.', 'error');
    }
  };

  // Client: Upload KYC Document
  const uploadDocument = async (clientId, docName, status = 'Uploaded') => {
    try {
      const res = await fetch(`${API_BASE}/clients/${clientId}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: docName, status })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        showToast(`KYC Document "${docName}" submitted successfully.`, 'success');
        fetchClients();
      } else {
        showToast(data.message || 'Upload failed.', 'error');
      }
    } catch (err) {
      showToast('Network error during upload.', 'error');
    }
  };

  // Client: Configure callback URL & regenerate client secret keys
  const saveWebhookUrl = async (clientId, webhookUrl) => {
    try {
      const res = await fetch(`${API_BASE}/clients/${clientId}/webhook`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ webhookUrl })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return { success: false };
      }
      const data = await res.json();
      if (data.success) {
        showToast('Webhook destination endpoint updated.', 'success');
        fetchClients();
        return { success: true, clientSecret: data.clientSecret };
      } else {
        showToast(data.message || 'Failed to configure webhook.', 'error');
        return { success: false };
      }
    } catch (err) {
      showToast('Network error configuring webhook.', 'error');
      return { success: false };
    }
  };

  // Client/Admin: Settle pending payments ledger
  const makePayment = async (clientId) => {
    try {
      const res = await fetch(`${API_BASE}/clients/${clientId}/pay`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        fetchClients();
      } else {
        showToast(data.message || 'Payment processing failed.', 'error');
      }
    } catch (err) {
      showToast('Network error processing payment.', 'error');
    }
  };

  // Support tickets creation
  const createTicket = async (title, severity, desc) => {
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, severity, desc })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        showToast(`Support ticket ${data.ticketId} created successfully.`, 'success');
        fetchTickets();
      } else {
        showToast(data.message || 'Failed to submit ticket.', 'error');
      }
    } catch (err) {
      showToast('Network error raising ticket.', 'error');
    }
  };

  // Support tickets resolution
  const resolveTicket = async (ticketId) => {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/resolve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        showToast('Server returned non-JSON response.', 'error');
        return;
      }
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Support Ticket marked as Resolved successfully!', 'success');
        fetchTickets();
      } else {
        showToast(data.message || 'Failed to resolve ticket.', 'error');
      }
    } catch (err) {
      showToast('Network error resolving ticket.', 'error');
    }
  };

  // Merchant user details fallback from localStorage
  const fallbackClient = {
    id: currentClientId || 'CLI-MERCHANT-01',
    name: localStorage.getItem('onepg_user_name') || 'Merchant Partner',
    company: localStorage.getItem('onepg_company') || 'My Merchant Enterprise',
    email: localStorage.getItem('onepg_email') || 'merchant@onepg.co.in',
    status: 'Active',
    plan: 'Merchant Pro',
    created_at: new Date().toISOString(),
    services: [
      { name: 'Payment Gateway Routing', status: 'Active' },
      { name: 'Instant Settlement Payouts', status: 'Active' }
    ]
  };

  const currentClient = clients.find(c => c.id === currentClientId) || clients[0] || fallbackClient;

  return (
    <AppContext.Provider value={{
      API_BASE,
      clients,
      currentClientId,
      setCurrentClientId,
      currentClient,
      addClient,
      updateClientStatus,
      uploadDocument,
      saveWebhookUrl,
      makePayment,
      isAuthenticated,
      userRole,
      login,
      sendSignupOtp,
      signup,
      socialLogin,
      handleOAuthSuccess,
      logout,
      createRazorpayOrder,
      verifyRazorpayPayment,
      requestPasswordReset,
      verifyResetOtp,
      resetPassword,
      toast,
      showToast,
      tickets,
      fetchTickets,
      createTicket,
      resolveTicket
    }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[9999] max-w-sm w-[90%] sm:w-full bg-[#0d0d0d]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-start gap-3"
          >
            <div className={`mt-0.5 rounded-lg p-1.5 shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
              toast.type === 'error' ? 'bg-red-500/10 text-red-400' :
              toast.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
              'bg-blue-500/10 text-[#00E5FF]'
            }`}>
              {toast.type === 'success' && <CheckCircle2 size={16} />}
              {toast.type === 'error' && <AlertCircle size={16} />}
              {toast.type === 'warning' && <AlertTriangle size={16} />}
              {toast.type === 'info' && <Info size={16} />}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-0.5">
                {toast.type === 'success' ? 'Success' :
                 toast.type === 'error' ? 'Error' :
                 toast.type === 'warning' ? 'Warning' :
                 'System Alert'}
              </p>
              <p className="text-xs text-gray-300 font-light leading-relaxed">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-gray-500 hover:text-white p-0.5 rounded transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AppContext.Provider>
  );
};
