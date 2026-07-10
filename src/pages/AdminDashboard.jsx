import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Users, UserPlus, FolderKanban, Briefcase, 
  CreditCard, FileText, LifeBuoy, Settings, LogOut, Search, 
  Plus, Edit3, CheckCircle, Info, ChevronLeft,
  Shield, RefreshCw, ToggleLeft, ToggleRight,
  Database, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.svg';
import addNewClientImg from '../assets/add new client.avif';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { clients, addClient, updateClientStatus, uploadDocument, makePayment, setCurrentClientId } = useContext(AppContext);
  
  // Admin navigation state: 'all-clients', 'add-client', 'update-status', 'projects', 'services', 'payments', 'invoices', 'documents', 'tickets', 'settings'
  const [currentView, setCurrentView] = useState('all-clients');
  const [selectedClientForUpdate, setSelectedClientForUpdate] = useState(clients[0] || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);

  // Add Client Form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const [newClientPlan, setNewClientPlan] = useState('Basic');
  const [formError, setFormError] = useState('');

  // Update Status Form state
  const [updateService, setUpdateService] = useState('Payout Process');
  const [updateStatusVal, setUpdateStatusVal] = useState('Submitted to Bank');
  const [updateNotes, setUpdateNotes] = useState('Payout application submitted to bank on 15 July 2026');

  // Support Tickets Admin State (Synced/Simulated)
  const [adminTickets, setAdminTickets] = useState([
    { id: 'TCK-2026-9281', client: 'Rahul Sharma', company: 'Sharma Enterprises', title: 'Webhook fails to trigger on payment success', status: 'Resolved', date: '08 July 2026', desc: 'Webhook event payment.captured does not trigger after client pays.', severity: 'High' },
    { id: 'TCK-2026-9310', client: 'Rahul Sharma', company: 'Sharma Enterprises', title: 'Request for T+0 settlement enablement', status: 'Open', date: '10 July 2026', desc: 'Our transaction volume has crossed ₹5L/day. Requesting activation of instant settlement rails.', severity: 'Medium' }
  ]);

  // System Settings State
  const [hdfcGatewaySw, setHdfcGatewaySw] = useState(true);
  const [iciciGatewaySw, setIciciGatewaySw] = useState(true);
  const [sbiGatewaySw, setSbiGatewaySw] = useState(false);
  const [globalFee, setGlobalFee] = useState(1.95);
  const [sandboxState, setSandboxState] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    if (!newClientName || !newClientCompany || !newClientEmail || !newClientPassword) {
      setFormError('Please fill in all required fields');
      return;
    }

    addClient({
      name: newClientName,
      company: newClientCompany,
      email: newClientEmail,
      phone: newClientPhone,
      password: newClientPassword,
      plan: newClientPlan
    });

    // Reset Form
    setNewClientName('');
    setNewClientCompany('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientPassword('');
    setNewClientPlan('Basic');
    setFormError('');
    
    // Switch to All Clients to see the new addition
    setCurrentView('all-clients');
  };

  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedClientForUpdate) return;

    updateClientStatus(
      selectedClientForUpdate.id,
      updateService,
      updateStatusVal,
      updateNotes
    );

    // Switch view back
    setCurrentView('all-clients');
  };

  const startUpdateStatus = (client) => {
    setSelectedClientForUpdate(client);
    // Find current service status to set initial values
    const payoutSvc = client.services.find(s => s.name === 'Payout Process') || client.services[0];
    if (payoutSvc) {
      setUpdateService(payoutSvc.name);
      setUpdateStatusVal(payoutSvc.status);
    }
    setUpdateNotes(`Payout application updated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`);
    setCurrentView('update-status');
  };

  const viewClientDashboard = (clientId) => {
    setCurrentClientId(clientId);
    navigate('/dashboard');
  };

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesPlan = planFilter === 'All Plans' || client.plan === planFilter;
    const matchesStatus = statusFilter === 'All Status' || client.status === statusFilter;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'in progress':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'under review':
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'pending':
      case 'applied':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-white/5 text-gray-400 border border-white/5';
    }
  };

  // Total collected & Outstanding calculation across clients
  const totalRevenue = clients.reduce((sum, c) => sum + (c.amountPaid || 0), 0);
  const totalOutstanding = clients.reduce((sum, c) => sum + (c.pendingAmount || 0), 0);

  // System Modules Nav definitions
  const adminNavItems = [
    { name: 'Clients List', view: 'all-clients', icon: Users },
    { name: 'Add Client', view: 'add-client', icon: UserPlus },
    { name: 'Projects Setup', view: 'projects', icon: FolderKanban },
    { name: 'Services Queue', view: 'services', icon: Briefcase },
    { name: 'Payments Ledger', view: 'payments', icon: CreditCard },
    { name: 'Invoices Desk', view: 'invoices', icon: FileText },
    { name: 'KYC Documents', view: 'documents', icon: Shield },
    { name: 'Support Tickets', view: 'tickets', icon: LifeBuoy },
    { name: 'System Settings', view: 'settings', icon: Settings }
  ];

  // Render Helpers
  const renderClientsList = () => (
    <div className="space-y-6">
      {/* Toolbar search & filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01] border border-white/5 rounded-xl p-4">
        <div className="relative w-full md:max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients by ID, name, or company..."
            className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none transition-all placeholder-gray-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
          <select 
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-white/[0.03] border border-white/10 focus:border-[#00E5FF]/50 text-white rounded-lg px-3 py-2 text-xs focus:outline-none cursor-pointer"
          >
            <option value="All Plans" className="bg-[#050505]">All Plans</option>
            <option value="Premium" className="bg-[#050505]">Premium</option>
            <option value="Basic" className="bg-[#050505]">Basic</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/[0.03] border border-white/10 focus:border-[#00E5FF]/50 text-white rounded-lg px-3 py-2 text-xs focus:outline-none cursor-pointer"
          >
            <option value="All Status" className="bg-[#050505]">All Status</option>
            <option value="In Progress" className="bg-[#050505]">In Progress</option>
            <option value="Pending" className="bg-[#050505]">Pending</option>
            <option value="Completed" className="bg-[#050505]">Completed</option>
          </select>

          <button 
            onClick={() => setCurrentView('add-client')}
            className="bg-[#FF5722] hover:bg-[#e64e1e] text-white py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,87,34,0.2)] shrink-0"
          >
            <Plus size={14} />
            Add Client
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
                <th className="px-6 py-4">Client ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Progress</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors text-sm">
                    <td className="px-6 py-4 font-bold text-gray-400">{client.id}</td>
                    <td className="px-6 py-4 font-semibold text-white">{client.name}</td>
                    <td className="px-6 py-4 text-gray-400">{client.company}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        client.plan === 'Premium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-white/5 text-gray-400 border border-white/5'
                      }`}>
                        {client.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadgeClass(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#00E5FF] h-full rounded-full" style={{ width: `${client.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{client.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => viewClientDashboard(client.id)}
                          className="text-gray-500 hover:text-[#00E5FF] transition-colors p-1"
                          title="Impersonate & View Client Dashboard"
                        >
                          <Info size={16} />
                        </button>
                        <button 
                          onClick={() => startUpdateStatus(client)}
                          className="text-gray-500 hover:text-white transition-colors p-1"
                          title="Update Services & Status"
                        >
                          <Edit3 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 text-sm">
                    No clients matching criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-white/5 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.01]">
          <span className="text-xs text-gray-500">Showing {filteredClients.length} of {clients.length} merchants</span>
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
            {[1, 2, 3, '...', 10].map((pg, idx) => (
              <button 
                key={idx}
                disabled={typeof pg !== 'number'}
                onClick={() => typeof pg === 'number' && setCurrentPage(pg)}
                className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold transition-all ${
                  pg === currentPage 
                    ? 'bg-[#00E5FF] text-black' 
                    : pg === '...' 
                      ? 'text-gray-600 cursor-default' 
                      : 'bg-white/[0.02] border border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Sub-view: Projects setup
  const renderProjectsSetup = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">System Projects Registry</h2>
        <p className="text-xs text-gray-400">Review technical stream deployments and developer assignments for each merchant.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Technical Streams</th>
              <th className="px-6 py-4">Developers Assigned</th>
              <th className="px-6 py-4 text-center">Milestones</th>
              <th className="px-6 py-4 text-center">Priority</th>
              <th className="px-6 py-4 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {clients.map((client) => {
              const activeCount = client.services?.filter(s => s.status !== 'Not Started').length || 0;
              return (
                <tr key={client.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="font-bold text-white block">{client.company}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{client.id}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-300">
                    {client.services?.slice(0, 3).map(s => s.name).join(', ') || 'None active'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-[#00E5FF] font-bold">JD</div>
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-[#FF5722] font-bold">AS</div>
                      <span className="text-[10px] text-gray-500 font-bold ml-1">+2 Devs</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-white">
                    {activeCount} / {client.services?.length || 5}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                      client.plan === 'Premium' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {client.plan === 'Premium' ? 'Critical' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Opening developer logs for ${client.company}`)} className="text-[#00E5FF] hover:underline font-bold text-xs">Assign Dev</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sub-view: Services activation requests
  const renderServicesQueue = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Services Activation Queue</h2>
        <p className="text-xs text-gray-400">Manage client requests for payment gateway integrations and instant settlement options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Enrolled Gateways</h4>
          <h3 className="text-2xl font-bold text-white mt-1">24</h3>
          <p className="text-[10px] text-gray-500 mt-1">Across all merchant instances</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Under Compliance Audit</h4>
          <h3 className="text-2xl font-bold text-orange-400 mt-1">3</h3>
          <p className="text-[10px] text-gray-500 mt-1">Awaiting compliance verification</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Service Uptime</h4>
          <h3 className="text-2xl font-bold text-emerald-400 mt-1">99.98%</h3>
          <p className="text-[10px] text-gray-500 mt-1">API routing nodes health</p>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Activation Request Desk</h3>
        <div className="space-y-3">
          {clients.filter(c => c.services?.some(s => s.status === 'Applied' || s.status === 'Under Review')).map((client) => {
            const reviewingSvcs = client.services?.filter(s => s.status === 'Applied' || s.status === 'Under Review') || [];
            return reviewingSvcs.map((svc) => (
              <div key={client.id + '-' + svc.name} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-all">
                <div>
                  <h4 className="text-xs font-bold text-white">{client.company} <span className="text-gray-500 font-mono">({client.id})</span></h4>
                  <p className="text-sm text-gray-300 font-semibold mt-1">Requesting activation of: <span className="text-[#00E5FF]">{svc.name}</span></p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      updateClientStatus(client.id, svc.name, 'Active', 'Approved by administrator');
                      alert(`Service "${svc.name}" activated for ${client.company}`);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black px-3.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <CheckCircle size={12} /> Activate Node
                  </button>
                  <button 
                    onClick={() => {
                      updateClientStatus(client.id, svc.name, 'Pending', 'Rejected by administrator: KYC updates needed');
                      alert(`Service "${svc.name}" rejected.`);
                    }}
                    className="bg-white/5 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );

  // Sub-view: Payments ledger
  const renderPaymentsLedger = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">System Payments Ledger</h2>
          <p className="text-xs text-gray-400">Overview of corporate billing accounts, revenue collections, and outstanding receivables.</p>
        </div>
        <button onClick={() => alert('Exporting payment spreadsheets...')} className="bg-[#00E5FF] hover:bg-[#00bacc] text-black px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          Export Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Platform Collections</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-gray-500 mt-1">Slipped into core bank account nodes</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Pending Accounts Receivables</p>
          <h3 className="text-3xl font-bold text-[#FF5722] mt-1">₹{totalOutstanding.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-gray-500 mt-1">Awaiting setup completion milestones</p>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4 text-center">Amount Paid</th>
              <th className="px-6 py-4 text-center">Amount Outstanding</th>
              <th className="px-6 py-4 text-center">Setup Fee Plan</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                <td className="px-6 py-4 text-gray-400">{c.company}</td>
                <td className="px-6 py-4 text-center font-bold text-emerald-400">₹{c.amountPaid.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-center font-bold text-[#FF5722]">₹{c.pendingAmount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5">{c.plan}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  {c.pendingAmount > 0 ? (
                    <button 
                      onClick={() => {
                        makePayment(c.id);
                        alert(`Recorded payment of ₹${c.pendingAmount.toLocaleString('en-IN')} from ${c.company}`);
                      }}
                      className="text-[#00E5FF] hover:underline font-bold text-xs"
                    >
                      Record Payment
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 font-bold">Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sub-view: Invoices desk
  const renderInvoicesDesk = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">System Invoices Desk</h2>
        <p className="text-xs text-gray-400">Review status logs of client service fee bills and processing statements.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Client Company</th>
              <th className="px-6 py-4">Billing Date</th>
              <th className="px-6 py-4">Amount Due</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {clients.map((c) => {
              return c.invoices && c.invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono font-bold text-white">{inv.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white block">{c.company}</span>
                    <span className="text-[10px] text-gray-500">{c.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{inv.date === '--' ? 'Awaiting Payment' : inv.date}</td>
                  <td className="px-6 py-4 font-bold text-white">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Emailing invoice ${inv.id} reminder to ${c.email}...`)} className="text-[#00E5FF] hover:underline font-bold text-xs">Email Reminder</button>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sub-view: Compliance documents reviews
  const renderDocumentsCompliance = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">KYC & Compliance Verification Desk</h2>
        <p className="text-xs text-gray-400">Verify legality status and approve documents uploaded by onboarded clients.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Compliance Queue</h3>
        <div className="space-y-3">
          {clients.filter(c => c.documents?.some(d => d.status === 'Under Review' || d.status === 'Pending')).map((client) => {
            const reviewDocs = client.documents?.filter(d => d.status === 'Under Review' || d.status === 'Pending') || [];
            return reviewDocs.map((doc) => (
              <div key={client.id + '-' + doc.name} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 text-gray-400">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{client.company} ({client.name})</h4>
                    <p className="text-sm text-[#00E5FF] font-semibold mt-0.5">Awaiting Audit: <span className="underline">{doc.name}</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      uploadDocument(client.id, doc.name, 'Uploaded');
                      alert(`Document "${doc.name}" for ${client.company} approved.`);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Approve Document
                  </button>
                  <button 
                    onClick={() => {
                      uploadDocument(client.id, doc.name, 'Pending');
                      alert(`Document "${doc.name}" marked as Rejected/Pending.`);
                    }}
                    className="bg-white/5 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );

  // Sub-view: Support tickets logs
  const renderTicketsLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Global Support Tickets Desk</h2>
          <p className="text-xs text-gray-400">Debug corporate developer queries, settlement complaints, and technical queries.</p>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold">
          Open Tickets: <span className="text-[#FF5722]">1</span>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
              <th className="px-6 py-4">Ticket ID</th>
              <th className="px-6 py-4">Client Merchant</th>
              <th className="px-6 py-4">Issue Title</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Resolve Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {adminTickets.map((t) => (
              <tr key={t.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-mono text-gray-500">{t.id}</td>
                <td className="px-6 py-4">
                  <span className="font-bold text-white block">{t.company}</span>
                  <span className="text-[10px] text-gray-500">{t.client}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-white block">{t.title}</span>
                  <span className="text-[11px] text-gray-400 font-light block mt-0.5">{t.desc}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    t.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {t.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {t.status === 'Open' ? (
                    <button 
                      onClick={() => {
                        setAdminTickets(prev => prev.map(tick => tick.id === t.id ? { ...tick, status: 'Resolved' } : tick));
                        alert('Ticket resolved successfully!');
                      }}
                      className="bg-[#00E5FF] hover:bg-[#00bacc] text-black px-3 py-1 rounded text-xs font-bold transition-all shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                    >
                      Resolve Ticket
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 font-bold">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sub-view: System configuration settings
  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Global Platform Settings</h2>
        <p className="text-xs text-gray-400">Toggle transaction switches, commission metrics, and system security thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Transaction Gateway Nodes</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">HDFC Bank Processing Node</span>
                <span className="text-[10px] text-gray-500">Route disbursals via HDFC transaction API.</span>
              </div>
              <button onClick={() => setHdfcGatewaySw(!hdfcGatewaySw)} className="text-gray-400 hover:text-white transition-colors">
                {hdfcGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">ICICI Bank Processing Node</span>
                <span className="text-[10px] text-gray-500">Route payments via ICICI corporate gateway.</span>
              </div>
              <button onClick={() => setIciciGatewaySw(!iciciGatewaySw)} className="text-gray-400 hover:text-white transition-colors">
                {iciciGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">SBI Processing Node (Secondary)</span>
                <span className="text-[10px] text-gray-500">Fallback routing layer for peak traffic.</span>
              </div>
              <button onClick={() => setSbiGatewaySw(!sbiGatewaySw)} className="text-gray-400 hover:text-white transition-colors">
                {sbiGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Commissions & Developer Environment</h3>
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Platform Commission Fee (%)</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="number" 
                  step="0.05"
                  value={globalFee}
                  onChange={(e) => setGlobalFee(parseFloat(e.target.value))}
                  className="flex-grow bg-white/[0.03] border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => alert('Global Processing Fee updated successfully!')} className="bg-[#00E5FF] hover:bg-[#00bacc] text-black px-4 py-2 rounded-lg text-xs font-bold transition-all">
                  Apply Fee
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="text-xs font-bold text-white block">Global Sandbox Mode</span>
                <span className="text-[10px] text-gray-500">Enforce test keys environment globally.</span>
              </div>
              <button onClick={() => setSandboxState(!sandboxState)} className="text-gray-400 hover:text-white transition-colors">
                {sandboxState ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button onClick={() => alert('Platform database backup compiled: onepg_backup_20260710.sql')} className="flex-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <Database size={12} /> Backup System DB
              </button>
              <button onClick={() => alert('Platform cached variables purged.')} className="flex-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans overflow-x-hidden">
      
      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 xl:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-[280px] bg-[#050505] border-r border-white/5 z-50 xl:hidden flex flex-col justify-between py-6 shadow-2xl"
            >
              <div className="flex flex-col">
                <div className="px-6 mb-8 flex items-center justify-between">
                  <div>
                    <Link to="/">
                      <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto mb-1" />
                    </Link>
                    <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest font-extrabold pl-0.5">Admin Panel</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1 px-4">
                  {adminNavItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = currentView === item.view;
                    return (
                      <button
                        key={item.view}
                        onClick={() => {
                          setCurrentView(item.view);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-xs font-semibold transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#00E5FF]/10 to-transparent text-[#00E5FF] border-l-2 border-[#00E5FF]' 
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        <IconComp size={16} className="mr-3" />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-4">
                <button 
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-[280px] bg-white/[0.01] border-r border-white/5 flex-shrink-0 hidden xl:flex flex-col justify-between py-6">
        <div className="flex flex-col">
          <div className="px-6 mb-8">
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto mb-1" />
            </Link>
            <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest font-extrabold pl-0.5">Admin Panel</span>
          </div>

          <nav className="space-y-1 px-4">
            {adminNavItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00E5FF]/10 to-transparent text-[#00E5FF] border-l-2 border-[#00E5FF]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <IconComp size={16} className="mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-grow flex flex-col min-h-screen">
        
        {/* Admin Header */}
        <header className="h-20 bg-white/[0.01] border-b border-white/5 flex items-center justify-between px-4 sm:px-6 md:px-8 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Button for mobile/tablet */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors focus:outline-none shrink-0"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-white truncate">OnePG Admin Console</h1>
              <p className="text-xs text-gray-500 hidden sm:block truncate">Global control panel for onboarding, status logs, and transaction reviews.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-[10px] sm:text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 sm:px-2.5 py-1 rounded-full border border-[#00E5FF]/20 font-bold uppercase tracking-wider">
              Super Admin
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center font-bold text-xs sm:text-sm text-[#00E5FF]">
              AD
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto max-w-[1440px] w-full mx-auto">
          
          {/* View Dispatcher */}
          {currentView === 'all-clients' && renderClientsList()}
          {currentView === 'projects' && renderProjectsSetup()}
          {currentView === 'services' && renderServicesQueue()}
          {currentView === 'payments' && renderPaymentsLedger()}
          {currentView === 'invoices' && renderInvoicesDesk()}
          {currentView === 'documents' && renderDocumentsCompliance()}
          {currentView === 'tickets' && renderTicketsLogs()}
          {currentView === 'settings' && renderSystemSettings()}

          {/* VIEW: ADD NEW CLIENT */}
          {currentView === 'add-client' && (
            <div className="w-full space-y-8">
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentView('all-clients')} className="text-gray-500 hover:text-white mr-1">
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="text-2xl font-bold text-white">Add New Client</h3>
                  <p className="text-xs text-gray-500">Create a new client merchant account to begin their onboarding pipeline.</p>
                </div>
              </div>

              {formError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <form onSubmit={handleSaveClient} className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={newClientCompany}
                        onChange={(e) => setNewClientCompany(e.target.value)}
                        placeholder="Enter company name"
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                        placeholder="merchant@company.com"
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={newClientPhone}
                        onChange={(e) => setNewClientPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                      <input 
                        type="password" 
                        required
                        value={newClientPassword}
                        onChange={(e) => setNewClientPassword(e.target.value)}
                        placeholder="Define password"
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Select Plan</label>
                      <select 
                        value={newClientPlan}
                        onChange={(e) => setNewClientPlan(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Basic" className="bg-[#050505]">Basic (₹10,000)</option>
                        <option value="Premium" className="bg-[#050505]">Premium (₹30,000)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setCurrentView('all-clients')}
                      className="bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3 px-6 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.25)]"
                    >
                      Save Client
                    </button>
                  </div>
                </form>

                <div className="lg:col-span-5 flex items-center justify-center relative group p-4">
                  <div className="absolute w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />
                  <img 
                    src={addNewClientImg} 
                    alt="Secure Merchant Profile" 
                    width="1024"
                    height="1024"
                    className="w-full max-w-[500px] h-auto object-contain relative z-10 transition-transform duration-700 group-hover:scale-105 scale-105"
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW: UPDATE CLIENT STATUS */}
          {currentView === 'update-status' && selectedClientForUpdate && (
            <div className="max-w-[700px] bg-white/[0.01] border border-white/5 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setCurrentView('all-clients')} className="text-gray-500 hover:text-white mr-1">
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">Update Client Status</h3>
                  <p className="text-xs text-gray-500">Modify service credentials and progress states for <b>{selectedClientForUpdate.name} ({selectedClientForUpdate.company})</b></p>
                </div>
              </div>

              <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Select Service to Modify</label>
                  <select 
                    value={updateService}
                    onChange={(e) => {
                      setUpdateService(e.target.value);
                      const svc = selectedClientForUpdate.services.find(s => s.name === e.target.value);
                      if (svc) setUpdateStatusVal(svc.status);
                    }}
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all cursor-pointer"
                  >
                    {selectedClientForUpdate.services && selectedClientForUpdate.services.map(s => (
                      <option key={s.name} value={s.name} className="bg-[#050505]">{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current Service Status</label>
                    <div className="w-full bg-white/[0.01] border border-white/5 text-gray-400 rounded-lg px-4 py-3 text-xs font-semibold capitalize">
                      {selectedClientForUpdate.services.find(s => s.name === updateService)?.status || 'Not Started'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Update Status To</label>
                    <select 
                      value={updateStatusVal}
                      onChange={(e) => setUpdateStatusVal(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Not Started" className="bg-[#050505]">Not Started</option>
                      <option value="In Progress" className="bg-[#050505]">In Progress</option>
                      <option value="Pending" className="bg-[#050505]">Pending</option>
                      <option value="Under Review" className="bg-[#050505]">Under Review</option>
                      <option value="Applied" className="bg-[#050505]">Applied</option>
                      <option value="Approved" className="bg-[#050505]">Approved</option>
                      <option value="Active" className="bg-[#050505]">Active</option>
                      <option value="Completed" className="bg-[#050505]">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Notes & Comments</label>
                  <textarea 
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    rows="4"
                    placeholder="Enter status update details, to be shown on the client dashboard timeline..."
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button 
                    type="submit"
                    className="bg-[#00E5FF] hover:bg-[#00bacc] text-black py-3 px-6 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  >
                    Update Status
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setCurrentView('all-clients')}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;
