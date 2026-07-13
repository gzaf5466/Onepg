import React, { createContext, useState, useEffect } from 'react';

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
      { name: 'Website Development', status: 'In Progress' },
      { name: 'Payment Gateway', status: 'Approved' },
      { name: 'Pay-In Process', status: 'Active' },
      { name: 'Payout Process', status: 'Under Review' },
      { name: 'T+0 Settlement', status: 'Applied' },
      { name: 'International Payment Gateway', status: 'Pending' },
      { name: 'Business Registration', status: 'Completed' },
      { name: 'Android App Development', status: 'Not Started' },
      { name: 'iOS App Development', status: 'Not Started' },
      { name: 'Software Development', status: 'In Progress' }
    ],
    timeline: [
      { label: 'Documents Received', status: 'Completed', date: '10 July 2026' },
      { label: 'Verification', status: 'Completed', date: '11 July 2026' },
      { label: 'Partner Selection', status: 'Completed', date: '12 July 2026' },
      { label: 'Submitted to Bank', status: 'Completed', date: '13 July 2026' },
      { label: 'Bank Review', status: 'In Progress', date: '15 July 2026' },
      { label: 'Live Activation', status: 'Pending', date: '' }
    ],
    invoices: [
      { id: 'INV-2026-001', date: '09 July 2026', amount: 20000, status: 'Paid' },
      { id: 'INV-2026-002', date: '--', amount: 10000, status: 'Pending' }
    ],
    documents: [
      { name: 'GST Certificate', status: 'Uploaded' },
      { name: 'PAN Card', status: 'Uploaded' },
      { name: 'Aadhaar Card', status: 'Uploaded' },
      { name: 'Bank Statement', status: 'Under Review' },
      { name: 'Cancelled Cheque', status: 'Uploaded' }
    ]
  },
  {
    id: 'OPG-2026-1044',
    name: 'Amit Verma',
    company: 'Verma Solutions',
    email: 'amit@vermasol.com',
    phone: '+91 98765 43211',
    plan: 'Premium',
    status: 'In Progress',
    progress: 40,
    amountPaid: 15000,
    pendingAmount: 15000,
    services: [
      { name: 'Website Development', status: 'In Progress' },
      { name: 'Payment Gateway', status: 'Pending' }
    ],
    timeline: [],
    invoices: [],
    documents: []
  },
  {
    id: 'OPG-2026-1043',
    name: 'Neha Singh',
    company: 'Singh Traders',
    email: 'neha@singhtraders.com',
    phone: '+91 98765 43212',
    plan: 'Basic',
    status: 'Pending',
    progress: 20,
    amountPaid: 5000,
    pendingAmount: 5000,
    services: [
      { name: 'Website Development', status: 'Pending' }
    ],
    timeline: [],
    invoices: [],
    documents: []
  },
  {
    id: 'OPG-2026-1042',
    name: 'Vikram Mehta',
    company: 'Mehta Corp',
    email: 'vikram@mehtacorp.com',
    phone: '+91 98765 43213',
    plan: 'Premium',
    status: 'In Progress',
    progress: 70,
    amountPaid: 25000,
    pendingAmount: 5000,
    services: [
      { name: 'Website Development', status: 'Completed' },
      { name: 'Payment Gateway', status: 'Approved' }
    ],
    timeline: [],
    invoices: [],
    documents: []
  },
  {
    id: 'OPG-2026-1041',
    name: 'Pooja Patel',
    company: 'Patel Industries',
    email: 'pooja@patelind.com',
    phone: '+91 98765 43214',
    plan: 'Basic',
    status: 'Pending',
    progress: 10,
    amountPaid: 1000,
    pendingAmount: 9000,
    services: [
      { name: 'Website Development', status: 'Not Started' }
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

  useEffect(() => {
    localStorage.setItem('onepg_clients', JSON.stringify(clients));
  }, [clients]);

  const login = (role, clientId = null) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('onepg_auth', 'true');
    localStorage.setItem('onepg_role', role);
    if (clientId) {
      setCurrentClientId(clientId);
      localStorage.setItem('onepg_current_client_id', clientId);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('onepg_auth');
    localStorage.removeItem('onepg_role');
    localStorage.removeItem('onepg_current_client_id');
  };

  const addClient = (clientData) => {
    const nextIdNum = Math.max(...clients.map(c => parseInt(c.id.split('-')[2]))) + 1;
    const newId = `OPG-2026-${nextIdNum}`;

    const newClient = {
      id: newId,
      name: clientData.name,
      company: clientData.company,
      email: clientData.email,
      phone: clientData.phone || '+91 98765 00000',
      plan: clientData.plan || 'Basic',
      status: 'Pending',
      progress: 10,
      amountPaid: 0,
      pendingAmount: clientData.plan === 'Premium' ? 30000 : 10000,
      services: [
        { name: 'Website Development', status: 'Not Started' },
        { name: 'Payment Gateway', status: 'Not Started' },
        { name: 'Pay-In Process', status: 'Not Started' },
        { name: 'Payout Process', status: 'Not Started' },
        { name: 'T+0 Settlement', status: 'Not Started' }
      ],
      timeline: [
        { label: 'Documents Received', status: 'In Progress', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
        { label: 'Verification', status: 'Pending', date: '' },
        { label: 'Partner Selection', status: 'Pending', date: '' },
        { label: 'Submitted to Bank', status: 'Pending', date: '' },
        { label: 'Bank Review', status: 'Pending', date: '' },
        { label: 'Live Activation', status: 'Pending', date: '' }
      ],
      invoices: [
        { id: `INV-2026-${String(nextIdNum).slice(-3)}`, date: '--', amount: clientData.plan === 'Premium' ? 30000 : 10000, status: 'Pending' }
      ],
      documents: [
        { name: 'GST Certificate', status: 'Pending' },
        { name: 'PAN Card', status: 'Pending' },
        { name: 'Aadhaar Card', status: 'Pending' },
        { name: 'Bank Statement', status: 'Pending' },
        { name: 'Cancelled Cheque', status: 'Pending' }
      ]
    };

    setClients(prev => [newClient, ...prev]);
    return newClient;
  };

  const updateClientStatus = (clientId, serviceName, newStatus, notes) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        // Update service status
        const updatedServices = client.services.map(s => 
          s.name === serviceName ? { ...s, status: newStatus } : s
        );

        // Update overall client status & timeline based on service status changes
        let overallStatus = client.status;
        let progress = client.progress;
        const updatedTimeline = [...client.timeline];

        if (newStatus === 'Approved' || newStatus === 'Active' || newStatus === 'Completed') {
          // Boost progress slightly
          progress = Math.min(progress + 10, 100);
        }

        // If service is "Payout Process" and status updated, add comment/notes in timeline if appropriate
        if (notes && updatedTimeline.length > 0) {
          // Add a custom note to the active timeline node
          const inProgressIdx = updatedTimeline.findIndex(t => t.status === 'In Progress');
          if (inProgressIdx !== -1) {
            updatedTimeline[inProgressIdx] = {
              ...updatedTimeline[inProgressIdx],
              status: 'Completed',
              date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
            };
            if (inProgressIdx + 1 < updatedTimeline.length) {
              updatedTimeline[inProgressIdx + 1] = {
                ...updatedTimeline[inProgressIdx + 1],
                status: 'In Progress',
                notes: notes
              };
            }
          }
        }

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
        
        // Boost progress if a doc is uploaded
        const progress = Math.min(client.progress + 5, 100);

        return {
          ...client,
          documents: updatedDocs,
          progress
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
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};
