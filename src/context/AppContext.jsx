import React, { createContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('onepg_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('onepg_token'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('onepg_role') || null);
  
  const [clients, setClients] = useState([]);
  const [currentClientId, setCurrentClientId] = useState(() => localStorage.getItem('onepg_current_client_id') || '');
  const [tickets, setTickets] = useState([]);
  
  // Global Toast Notifications State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(prev => prev && prev.message === message ? null : prev);
    }, 4000);
    return () => clearTimeout(timer);
  };

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

  // Request Password Reset OTP (AWS SES / Backend Endpoint)
  const requestPasswordReset = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
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

  const currentClient = clients.find(c => c.id === currentClientId) || clients[0] || null;

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
      logout,
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
