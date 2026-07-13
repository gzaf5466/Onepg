import React, { createContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppContext = createContext();

const initialClients = [
  {
    id: 'OPG-2026-1045',
    name: 'Rahul Sharma',
    company: 'Sharma Enterprises',
    email: 'rahul@sharmaent.com',
    phone: '+91 98765 43210',
    plan: 'Premium',
    status: 'In Progress',
    progress: 65,
    amountPaid: 20000,
    pendingAmount: 10000,
    services: [
      { name: 'Payout Process', status: 'Active' },
      { name: 'Payin Settlement', status: 'In Progress' },
      { name: 'Advocate AI Integration', status: 'Applied' },
      { name: 'Custom CRM Access', status: 'Pending' }
    ],
    timeline: [
      { date: '12 July 2026', action: 'KYC Document approved by compliance officer.' },
      { date: '10 July 2026', action: 'Services setup initiated. ICICI Routing Node configured.' },
      { date: '08 July 2026', action: 'Corporate account onboarding registration completed.' }
    ],
    invoices: [
      { id: 'INV-2026-0091', date: '08 July 2026', amount: 20000, status: 'Paid' },
      { id: 'INV-2026-0092', date: '--', amount: 10000, status: 'Pending' }
    ],
    documents: [
      { name: 'Certificate of Incorporation', status: 'Uploaded' },
      { name: 'Company PAN Card', status: 'Uploaded' },
      { name: 'Corporate GST Certificate', status: 'Uploaded' },
      { name: 'Technical Compliance Signoff', status: 'Under Review' }
    ]
  },
  {
    id: 'OPG-2026-1042',
    name: 'Anjali Verma',
    company: 'Verma Tech Solutions',
    email: 'anjali@vermatech.com',
    phone: '+91 98765 43211',
    plan: 'Basic',
    status: 'In Progress',
    progress: 40,
    amountPaid: 10000,
    pendingAmount: 0,
    services: [
      { name: 'Payout Process', status: 'In Progress' },
      { name: 'Payin Settlement', status: 'Not Started' }
    ],
    timeline: [
      { date: '11 July 2026', action: 'Company GST verified.' }
    ],
    invoices: [
      { id: 'INV-2026-0095', date: '08 July 2026', amount: 10000, status: 'Paid' }
    ],
    documents: [
      { name: 'Certificate of Incorporation', status: 'Uploaded' },
      { name: 'Company PAN Card', status: 'Uploaded' },
      { name: 'Corporate GST Certificate', status: 'Uploaded' }
    ]
  },
  {
    id: 'OPG-2026-1043',
    name: 'Vikram Singh',
    company: 'Singh Logistics',
    email: 'vikram@singhlogistics.com',
    phone: '+91 98765 43212',
    plan: 'Premium',
    status: 'Completed',
    progress: 100,
    amountPaid: 30000,
    pendingAmount: 0,
    services: [
      { name: 'Payout Process', status: 'Active' },
      { name: 'Payin Settlement', status: 'Active' },
      { name: 'Advocate AI Integration', status: 'Active' }
    ],
    timeline: [
      { date: '13 July 2026', action: 'All services configured and active.' }
    ],
    invoices: [
      { id: 'INV-2026-0098', date: '09 July 2026', amount: 30000, status: 'Paid' }
    ],
    documents: [
      { name: 'Certificate of Incorporation', status: 'Uploaded' },
      { name: 'Company PAN Card', status: 'Uploaded' },
      { name: 'Corporate GST Certificate', status: 'Uploaded' }
    ]
  },
  {
    id: 'OPG-2026-1044',
    name: 'Neha Gupta',
    company: 'Gupta FinTech',
    email: 'neha@guptafintech.com',
    phone: '+91 98765 43213',
    plan: 'Premium',
    status: 'Under Review',
    progress: 20,
    amountPaid: 5000,
    pendingAmount: 25000,
    services: [
      { name: 'Payout Process', status: 'Under Review' },
      { name: 'Payin Settlement', status: 'Not Started' }
    ],
    timeline: [],
    invoices: [],
    documents: []
  }
];

export const AppContextProvider = ({ children }) => {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('onepg_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [currentClientId, setCurrentClientId] = useState(() => {
    return localStorage.getItem('onepg_current_client_id') || 'OPG-2026-1045';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('onepg_auth') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('onepg_role') || null;
  });

  // Global Toast Notifications State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Auto-clear after 4 seconds
    const timer = setTimeout(() => {
      setToast(prev => prev && prev.message === message ? null : prev);
    }, 4000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    localStorage.setItem('onepg_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('onepg_current_client_id', currentClientId);
  }, [currentClientId]);

  const login = (role, clientId = '') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('onepg_auth', 'true');
    localStorage.setItem('onepg_role', role);
    if (clientId) {
      setCurrentClientId(clientId);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('onepg_auth');
    localStorage.removeItem('onepg_role');
  };

  const addClient = (clientData) => {
    const nextIdNum = Math.max(...clients.map(c => parseInt(c.id.split('-')[2]))) + 1;
    const nextId = `OPG-2026-${nextIdNum}`;
    
    const newClient = {
      id: nextId,
      name: clientData.name,
      company: clientData.company,
      email: clientData.email,
      phone: clientData.phone || '+91 99999 99999',
      plan: clientData.plan,
      status: 'Pending',
      progress: 10,
      amountPaid: clientData.plan === 'Premium' ? 5000 : 1000,
      pendingAmount: clientData.plan === 'Premium' ? 25000 : 9000,
      services: [
        { name: 'Payout Process', status: 'Not Started' },
        { name: 'Payin Settlement', status: 'Not Started' },
        { name: 'Advocate AI Integration', status: 'Not Started' }
      ],
      timeline: [
        { date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), action: 'Account initialized by Administrator.' }
      ],
      invoices: [
        { id: `INV-2026-00${nextIdNum}`, date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), amount: clientData.plan === 'Premium' ? 5000 : 1000, status: 'Paid' },
        { id: `INV-2026-00${nextIdNum + 10}`, date: '--', amount: clientData.plan === 'Premium' ? 25000 : 9000, status: 'Pending' }
      ],
      documents: [
        { name: 'Certificate of Incorporation', status: 'Pending' },
        { name: 'Company PAN Card', status: 'Pending' },
        { name: 'Corporate GST Certificate', status: 'Pending' }
      ]
    };

    setClients(prev => [newClient, ...prev]);
  };

  const updateClientStatus = (clientId, serviceName, newStatus, notes = '') => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const updatedServices = client.services.map(s => 
          s.name === serviceName ? { ...s, status: newStatus } : s
        );

        // Recompute general progress based on service statuses
        const activeCount = updatedServices.filter(s => s.status === 'Active' || s.status === 'Completed').length;
        const inProgressCount = updatedServices.filter(s => s.status === 'In Progress' || s.status === 'Under Review' || s.status === 'Applied').length;
        
        let progress = 10;
        if (updatedServices.length > 0) {
          progress = Math.round(((activeCount * 1.0 + inProgressCount * 0.5) / updatedServices.length) * 90) + 10;
        }

        // Add to timeline
        const updatedTimeline = [
          { 
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), 
            action: notes || `Service status for "${serviceName}" modified to ${newStatus}.` 
          },
          ...client.timeline
        ];

        return {
          ...client,
          services: updatedServices,
          progress,
          timeline: updatedTimeline
        };
      }
      return client;
    }));
  };

  const uploadDocument = (clientId, docName, newStatus = 'Uploaded') => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const updatedDocs = client.documents.map(d => 
          d.name === docName ? { ...d, status: newStatus } : d
        );
        
        return {
          ...client,
          documents: updatedDocs
        };
      }
      return client;
    }));
  };

  const makePayment = (clientId) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const amountToPay = client.pendingAmount;
        if (amountToPay <= 0) return client;

        const updatedInvoices = client.invoices.map(inv => 
          inv.status === 'Pending' ? { ...inv, status: 'Paid', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) } : inv
        );

        return {
          ...client,
          amountPaid: client.amountPaid + amountToPay,
          pendingAmount: 0,
          invoices: updatedInvoices
        };
      }
      return client;
    }));
  };

  const currentClient = clients.find(c => c.id === currentClientId) || clients[0];

  return (
    <AppContext.Provider value={{
      clients,
      currentClientId,
      setCurrentClientId,
      currentClient,
      addClient,
      updateClientStatus,
      uploadDocument,
      makePayment,
      isAuthenticated,
      userRole,
      login,
      logout,
      toast,
      showToast
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
