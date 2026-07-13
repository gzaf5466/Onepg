import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Briefcase, Layers, CreditCard, FileText, Calendar, 
  LifeBuoy, Bell, User, LogOut, Download, Crown, ChevronRight, 
  UploadCloud, CheckCircle2, Clock, AlertCircle, HelpCircle, Phone, ArrowUpRight,
  Shield, Eye, EyeOff, Globe, Server, Check, AlertTriangle, Play, RefreshCw, Send,
  Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.svg';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { currentClient, uploadDocument, makePayment, logout } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notificationCount, setNotificationCount] = useState(2);
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Support Tickets Local State
  const [tickets, setTickets] = useState([
    { id: 'TCK-2026-9281', title: 'Webhook fails to trigger on payment success', status: 'Resolved', date: '08 July 2026', desc: 'Webhook event payment.captured does not trigger after client pays using scan QR.', severity: 'High' },
    { id: 'TCK-2026-9310', title: 'Request for T+0 settlement enablement', status: 'Open', date: '10 July 2026', desc: 'Our transaction volume has crossed ₹5L/day. Requesting activation of instant settlement rails.', severity: 'Medium' }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketSeverity, setNewTicketSeverity] = useState('Medium');

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Document Verified', message: 'Your Cancelled Cheque has been approved by compliance.', date: '11 July 2026', read: false },
    { id: 2, title: 'Invoice Paid', message: 'Payment of ₹20,000 for Invoice INV-2026-001 has been confirmed.', date: '09 July 2026', read: false },
    { id: 3, title: 'Timeline Updated', message: 'Onboarding packet submitted to partner bank.', date: '13 July 2026', read: true }
  ]);

  // Profile Webhook, Secret, & Sandbox Token
  const [webhookUrl, setWebhookUrl] = useState('https://api.sharmaent.com/onepg-webhooks');
  const [showSecret, setShowSecret] = useState(false);
  const [sandboxKey, setSandboxKey] = useState('onepg_sb_live_049fkls39dkls923jndkl287');
  const [clientSecret] = useState('opg_sec_secretkey_827f837123984719230472');

  if (!currentClient) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'under review':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'pending':
      case 'applied':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'failed':
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/5 text-gray-400 border-white/5';
    }
  };

  const handleDocUpload = (docName) => {
    setUploadingDoc(docName);
    setTimeout(() => {
      uploadDocument(currentClient.id, docName, 'Uploaded');
      setUploadingDoc(null);
    }, 1200);
  };

  const handlePayNow = () => {
    if (currentClient.pendingAmount > 0) {
      makePayment(currentClient.id);
      alert('Payment of ₹' + currentClient.pendingAmount.toLocaleString('en-IN') + ' successful!');
    }
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle || !newTicketDesc) return;
    const nextId = `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTickets(prev => [
      { 
        id: nextId, 
        title: newTicketTitle, 
        status: 'Open', 
        date: 'Today', 
        desc: newTicketDesc,
        severity: newTicketSeverity 
      },
      ...prev
    ]);
    setNewTicketTitle('');
    setNewTicketDesc('');
    alert(`Support Ticket ${nextId} has been created successfully!`);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  const handleGenerateKey = () => {
    const chars = 'abcdef0123456789';
    let newKey = 'onepg_sb_live_';
    for (let i = 0; i < 24; i++) {
      newKey += chars[Math.floor(Math.random() * chars.length)];
    }
    setSandboxKey(newKey);
    alert('New Sandbox Key generated successfully!');
  };

  // Sub-view: Dashboard Overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Current Plan</p>
            <h3 className="text-2xl font-bold text-white">{currentClient.plan}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Crown size={22} />
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Amount Paid</p>
            <h3 className="text-2xl font-bold text-white">₹{currentClient.amountPaid.toLocaleString('en-IN')}</h3>
            <button onClick={() => setActiveTab('Payments & Invoices')} className="text-[10px] text-[#00E5FF] hover:underline font-semibold flex items-center mt-1">
              View History <ChevronRight size={10} />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CreditCard size={22} />
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Pending Amount</p>
            <h3 className="text-2xl font-bold text-[#FF5722]">₹{currentClient.pendingAmount.toLocaleString('en-IN')}</h3>
            {currentClient.pendingAmount > 0 ? (
              <button onClick={handlePayNow} className="text-[10px] text-[#FF5722] hover:underline font-bold flex items-center mt-1">
                Pay Now <ArrowUpRight size={10} />
              </button>
            ) : (
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center mt-1">All Paid</span>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#FF5722]">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Project Progress</p>
            <span className="text-xs font-bold text-white">{currentClient.progress}%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FF5722] to-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${currentClient.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Services Status (Col-span 7) */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Services Status</h3>
            <span className="text-xs text-gray-500">{currentClient.services?.length || 0} Total Services</span>
          </div>
          <div className="divide-y divide-white/5 overflow-y-auto max-h-[380px] pr-2">
            {currentClient.services && currentClient.services.map((svc) => (
              <div key={svc.name} className="py-3.5 flex items-center justify-between group">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{svc.name}</span>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(svc.status)}`}>
                    {svc.status}
                  </span>
                  <button onClick={() => setActiveTab('My Services')} className="text-xs text-gray-500 hover:text-white transition-colors font-medium">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Stepper (Col-span 5) */}
        <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-xl p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-6">Application Timeline</h3>
          <div className="relative border-l border-white/5 pl-6 ml-3 space-y-6 py-2 flex-grow">
            {currentClient.timeline && currentClient.timeline.map((step, idx) => {
              const isCompleted = step.status === 'Completed';
              const isInProgress = step.status === 'In Progress' || step.status === 'Under Review';
              return (
                <div key={step.label} className="relative">
                  <span className={`absolute left-[-31px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted ? 'bg-[#FF5722] border-[#FF5722]' :
                    isInProgress ? 'bg-amber-500 border-amber-500' :
                    'bg-[#050505] border-white/10'
                  }`}>
                    {isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-semibold transition-colors ${
                        isCompleted || isInProgress ? 'text-white' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </h4>
                      {step.date && <span className="text-[10px] text-gray-500 font-semibold">{step.date}</span>}
                    </div>
                    {isInProgress && (
                      <span className="inline-block mt-1 text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider">
                        In Progress
                      </span>
                    )}
                    {step.notes && (
                      <p className="text-xs text-[#FF5722] bg-[#FF5722]/5 p-2 rounded border border-[#FF5722]/10 mt-1.5">
                        {step.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lower Section Grid: Payments & Documents Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Payment Summary</h3>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Package Price</span>
                <span className="font-semibold text-white">₹30,000</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Amount Paid</span>
                <span className="font-semibold text-emerald-400">₹{currentClient.amountPaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Pending Amount</span>
                <span className="font-semibold text-[#FF5722]">₹{currentClient.pendingAmount.toLocaleString('en-IN')}</span>
              </div>
              {currentClient.pendingAmount > 0 && (
                <button 
                  onClick={handlePayNow}
                  className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.2)] mt-2"
                >
                  Make Payment
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-white">Invoices</h4>
              <button onClick={() => setActiveTab('Payments & Invoices')} className="text-xs text-[#00E5FF] hover:underline font-semibold">View All</button>
            </div>
            <div className="space-y-2">
              {currentClient.invoices && currentClient.invoices.slice(0, 2).map((inv) => (
                <div key={inv.id} className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{inv.id}</span>
                    <span className="text-[10px] text-gray-500">{inv.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white">₹{inv.amount.toLocaleString('en-IN')}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                    {inv.status === 'Paid' && (
                      <button onClick={() => alert(`Downloading Invoice ${inv.id} PDF...`)} className="text-gray-500 hover:text-white transition-colors">
                        <Download size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Documents Checklist</h3>
              <button onClick={() => setActiveTab('Documents')} className="text-xs text-[#00E5FF] hover:underline font-semibold">View All</button>
            </div>
            <div className="space-y-3">
              {currentClient.documents && currentClient.documents.slice(0, 3).map((doc) => {
                const isPending = doc.status === 'Pending';
                const isReview = doc.status === 'Under Review';
                const isUploaded = doc.status === 'Uploaded';
                return (
                  <div key={doc.name} className="bg-white/[0.02] border border-white/5 rounded-lg p-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {isUploaded ? <CheckCircle2 size={16} className="text-emerald-400" /> : 
                       isReview ? <Clock size={16} className="text-orange-400 animate-pulse" /> : 
                       <AlertCircle size={16} className="text-gray-500" />}
                      <span className="text-xs font-semibold text-gray-300">{doc.name}</span>
                    </div>
                    <div>
                      {isUploaded && <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">Uploaded</span>}
                      {isReview && <span className="text-[9px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded uppercase">Under Review</span>}
                      {isPending && (
                        <button 
                          disabled={uploadingDoc === doc.name}
                          onClick={() => handleDocUpload(doc.name)}
                          className="bg-white/[0.04] border border-white/10 hover:border-[#FF5722]/40 hover:bg-white/[0.08] text-gray-300 hover:text-white px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5"
                        >
                          <UploadCloud size={12} />
                          {uploadingDoc === doc.name ? 'Uploading...' : 'Upload'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#FF5722]/5 border border-[#FF5722]/10 rounded-xl p-4 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722]">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Need Help?</h4>
                <p className="text-[10px] text-gray-400">Our support team is here for you</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setActiveTab('Support Tickets')} className="flex-1 sm:flex-none bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all">Raise Ticket</button>
              <button onClick={() => alert('Dialing Account Manager: +91 1800 123 4567')} className="flex-1 sm:flex-none bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                <Phone size={10} />
                Contact Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sub-view: My Services
  const renderMyServices = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Merchant Services Console</h2>
          <p className="text-xs text-gray-400">Track and configure your active and subscribed corporate services.</p>
        </div>
        <button onClick={() => alert('New Service request sent to Manager')} className="bg-gradient-to-r from-[#FF5722] to-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.2)]">
          Request New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClient.services && currentClient.services.map((svc, idx) => {
          const isGateway = svc.name.includes('Gateway') || svc.name.includes('Process') || svc.name.includes('Settlement');
          return (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#FF5722]/30 transition-all flex flex-col justify-between min-h-[190px] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-[#FF5722] transition-colors">
                    {svc.name.includes('App') ? <Globe size={20} /> :
                     svc.name.includes('Web') ? <Server size={20} /> :
                     svc.name.includes('Settlement') ? <Clock size={20} /> :
                     <CreditCard size={20} />}
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getStatusColor(svc.status)}`}>
                    {svc.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#FF5722] transition-colors">{svc.name}</h4>
                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                  {isGateway ? 'Merchant Integration API rails enabled with 99.9% uptime SLA.' : 'Tailored business solutions configured for client onboarding requirements.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                <span className="text-gray-500 font-mono">ID: {currentClient.id.slice(-4)}-{idx}</span>
                {isGateway && svc.status === 'Active' ? (
                  <button onClick={() => setActiveTab('Profile')} className="text-[#00E5FF] hover:underline font-bold flex items-center gap-0.5">
                    View API Keys <ArrowUpRight size={10} />
                  </button>
                ) : (
                  <button onClick={() => alert(`Details for ${svc.name}: Under Active Review.`)} className="text-gray-400 hover:text-white transition-colors">View SLA</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Sub-view: Applications
  const renderApplications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Onboarding Applications</h2>
        <p className="text-xs text-gray-400">Review status updates for bank gateway and settlement applications.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-500 bg-white/[0.01]">
                <th className="p-4 font-bold">App ID</th>
                <th className="p-4 font-bold">Application Type</th>
                <th className="p-4 font-bold">Partner Institution</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Last Updated</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-904</td>
                <td className="p-4 font-bold text-white">Pay-In Routing Integration</td>
                <td className="p-4 text-gray-300">ICICI Bank Ltd</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase">Approved</span></td>
                <td className="p-4 text-gray-500">12 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => alert('Displaying integration logs for ICICI')} className="text-[#00E5FF] hover:underline font-semibold">Integrate</button></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-905</td>
                <td className="p-4 font-bold text-white">Payout Disbursals Gateway</td>
                <td className="p-4 text-gray-300">HDFC Bank Ltd</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-orange-500/10 text-orange-400 border-orange-500/20 uppercase">Under Review</span></td>
                <td className="p-4 text-gray-500">15 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => alert('HDFC review logs: Compliance checking signatures.')} className="text-gray-400 hover:text-white font-semibold">Check Logs</button></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-906</td>
                <td className="p-4 font-bold text-white">T+0 Same-Day Settlement</td>
                <td className="p-4 text-gray-300">OnePG Settlement Core</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-blue-500/10 text-blue-400 border-blue-500/20 uppercase">Applied</span></td>
                <td className="p-4 text-gray-500">15 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => alert('T+0 Settlement application is queued for active volume auditing.')} className="text-gray-400 hover:text-white font-semibold">Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Sub-view: Payments Ledger
  const renderPayments = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Payments & Invoices</h2>
        <p className="text-xs text-gray-400">Verify client account payments, invoices, and settlement packages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Total Package Cost</p>
          <h3 className="text-2xl font-bold text-white">₹30,000</h3>
          <p className="text-[10px] text-gray-500 mt-1">One-time registration and server setup</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Total Amount Paid</p>
          <h3 className="text-2xl font-bold text-emerald-400">₹{currentClient.amountPaid.toLocaleString('en-IN')}</h3>
          <p className="text-[10px] text-gray-500 mt-1">Settled invoices amount</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 relative overflow-hidden">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Outstanding Amount</p>
          <h3 className="text-2xl font-bold text-[#FF5722]">₹{currentClient.pendingAmount.toLocaleString('en-IN')}</h3>
          {currentClient.pendingAmount > 0 ? (
            <button onClick={handlePayNow} className="mt-2 text-xs bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3 py-1.5 rounded font-bold transition-all shadow-[0_0_10px_rgba(255,87,34,0.2)]">
              Settle Pending Balance
            </button>
          ) : (
            <p className="text-[10px] text-emerald-400 font-semibold mt-1">All invoices settled.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white mb-4">Invoice History</h3>
        <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-500 bg-white/[0.01]">
                  <th className="p-4 font-bold">Invoice ID</th>
                  <th className="p-4 font-bold">Issue Date</th>
                  <th className="p-4 font-bold">Description</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Invoice PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {currentClient.invoices && currentClient.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.01]">
                    <td className="p-4 font-mono font-bold text-white">{inv.id}</td>
                    <td className="p-4 text-gray-400">{inv.date === '--' ? 'Pending settlement' : inv.date}</td>
                    <td className="p-4 text-gray-300">{inv.id === 'INV-2026-001' ? 'First Onboarding Advance Milestone' : 'Second Project Handover Milestone'}</td>
                    <td className="p-4 font-bold text-white">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                        inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {inv.status === 'Paid' ? (
                        <button onClick={() => alert(`Downloading invoice ${inv.id}...`)} className="text-[#00E5FF] hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">
                          <Download size={12} /> Download
                        </button>
                      ) : (
                        <button onClick={handlePayNow} className="text-[#FF5722] hover:underline font-bold">Pay Now</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Sub-view: Documents Compliance
  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Merchant KYC Documents</h2>
          <p className="text-xs text-gray-400">Upload business credentials and review legal compliance audits.</p>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold">
          KYC Progress: <span className="text-emerald-400">80% Approved</span>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield size={14} className="text-[#FF5722]" /> KYC Compliance Rule
            </h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              OnePG complies with RBI guidelines and PCI-DSS rules. Incomplete or rejected documents will delay live gateway activation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/10 space-y-1">
            <h4 className="text-xs font-bold text-white">Need support?</h4>
            <p className="text-[10px] text-gray-400">If your document is rejected, raise a ticket or dial support.</p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {currentClient.documents && currentClient.documents.map((doc) => {
            const isPending = doc.status === 'Pending';
            const isReview = doc.status === 'Under Review';
            const isUploaded = doc.status === 'Uploaded';
            return (
              <div key={doc.name} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 flex justify-between items-center hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  {isUploaded ? <CheckCircle2 size={18} className="text-emerald-400" /> : 
                   isReview ? <Clock size={18} className="text-orange-400 animate-pulse" /> : 
                   <AlertCircle size={18} className="text-gray-500" />}
                  <div>
                    <span className="text-xs font-bold text-white">{doc.name}</span>
                    <p className="text-[9px] text-gray-500 mt-0.5">Required for merchant ID verification.</p>
                  </div>
                </div>
                <div>
                  {isUploaded && <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded uppercase tracking-wider">Approved</span>}
                  {isReview && <span className="text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded uppercase tracking-wider">Under Review</span>}
                  {isPending && (
                    <button 
                      disabled={uploadingDoc === doc.name}
                      onClick={() => handleDocUpload(doc.name)}
                      className="bg-white/[0.04] border border-white/10 hover:border-[#FF5722] hover:bg-white/[0.08] text-gray-300 hover:text-white px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <UploadCloud size={14} />
                      {uploadingDoc === doc.name ? 'Uploading...' : 'Upload File'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Sub-view: Detailed Onboarding Timeline
  const renderTimeline = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Detailed Onboarding Journey</h2>
        <p className="text-xs text-gray-400">Step-by-step trace of your merchant profile onboarding records.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative border-l-2 border-white/5 pl-8 ml-4 space-y-8 py-2">
          {currentClient.timeline && currentClient.timeline.map((step, idx) => {
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress' || step.status === 'Under Review';
            return (
              <div key={idx} className="relative">
                <span className={`absolute left-[-42px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted ? 'bg-[#FF5722] border-[#FF5722]' :
                  isInProgress ? 'bg-amber-500 border-amber-500 animate-pulse' :
                  'bg-[#050505] border-white/10'
                }`}>
                  {isCompleted ? <Check size={12} className="text-white" /> : 
                   isInProgress ? <Clock size={12} className="text-white" /> : null}
                </span>

                <div className="space-y-2 bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-sm font-bold transition-colors ${isCompleted || isInProgress ? 'text-white' : 'text-gray-600'}`}>
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-semibold uppercase tracking-widest">Step {idx + 1} of {currentClient.timeline.length}</p>
                    </div>
                    {step.date && <span className="text-xs text-gray-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded">{step.date}</span>}
                  </div>
                  {isInProgress && (
                    <span className="inline-block text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider">
                      Under Processing
                    </span>
                  )}
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {idx === 0 ? 'KYC document packet collected, scanned and verified by security compliance algorithms.' :
                     idx === 1 ? 'Legal, pan, and identity document status evaluated against government database APIs.' :
                     idx === 2 ? 'Optimal transaction routing partner selection (HDFC/ICICI nodes) assigned based on volume.' :
                     idx === 3 ? 'Application files and custom sandbox tokens formatted and transmitted to merchant desk.' :
                     idx === 4 ? 'Partner bank checking compliance checks and transaction limits configuration.' :
                     'Production merchant portal credentials and sandbox keys switched to live status.'}
                  </p>
                  {step.notes && (
                    <div className="text-xs text-[#FF5722] bg-[#FF5722]/5 p-3 rounded border border-[#FF5722]/10 mt-2 flex gap-2 items-start">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Officer Comment:</span>
                        <p className="mt-1 leading-relaxed">{step.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Sub-view: Support Tickets
  const renderSupportTickets = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Help & Support Desk</h2>
          <p className="text-xs text-gray-400">Open ticket requests for merchant assistance and gateway technical debugging.</p>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
          Average Response Time: <span className="text-[#00E5FF]">2 Hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Raise ticket form (Col 5) */}
        <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Raise New Ticket</h3>
          <form onSubmit={handleRaiseTicket} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject / Title</label>
              <input 
                type="text" 
                required
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
                placeholder="Enter ticket title"
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Severity Level</label>
              <select 
                value={newTicketSeverity}
                onChange={(e) => setNewTicketSeverity(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all cursor-pointer"
              >
                <option value="Low" className="bg-[#050505]">Low - Minor Query</option>
                <option value="Medium" className="bg-[#050505]">Medium - Standard Query</option>
                <option value="High" className="bg-[#050505]">High - Integration Blocked</option>
                <option value="Critical" className="bg-[#050505]">Critical - Production Failure</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <textarea 
                required
                value={newTicketDesc}
                onChange={(e) => setNewTicketDesc(e.target.value)}
                rows="4"
                placeholder="Describe your issue or custom request..."
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3 rounded-lg text-xs font-bold transition-all shadow-[0_4px_20px_rgba(255,87,34,0.25)] flex items-center justify-center gap-1.5"
            >
              Submit Ticket <Send size={12} />
            </button>
          </form>
        </div>

        {/* Tickets log (Col 7) */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Active Tickets</h3>
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2 hover:border-white/10 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 font-mono">{t.id}</span>
                    <div className="flex gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                        t.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        t.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {t.severity}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                        t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white">{t.title}</h4>
                  <p className="text-[11px] text-gray-400 font-light">{t.desc}</p>
                  <div className="text-[9px] text-gray-500 pt-1 text-right">Raised on {t.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sub-view: Notifications List
  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">System Notifications</h2>
          <p className="text-xs text-gray-400">Keep track of your KYC approvals, invoices, and bank status updates.</p>
        </div>
        {notificationCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-xs text-[#00E5FF] hover:underline font-bold flex items-center gap-1">
            <CheckCircle2 size={14} /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 ${
            n.read ? 'bg-white/[0.01] border-white/5' : 'bg-[#FF5722]/5 border-[#FF5722]/15 shadow-[0_0_15px_rgba(255,87,34,0.03)]'
          }`}>
            <div className="flex gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${n.read ? 'bg-white/5 text-gray-400' : 'bg-[#FF5722]/10 text-[#FF5722]'}`}>
                <Bell size={16} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  {n.title}
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{n.message}</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 font-bold shrink-0">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Sub-view: Profile & API Credentials
  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Merchant Account Settings</h2>
        <p className="text-xs text-gray-400">Update company credentials and configure API webhooks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Profile info (Col 6) */}
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Merchant Name</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.name}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Company Registered</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Work Email</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.email}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Contact Phone</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.phone}</p>
            </div>
          </div>
          <div className="pt-2">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Registered Billing Address</span>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed font-light">
              Sharma Solutions Corp, 4th Block, HSR Layout, Bengaluru, Karnataka, 560102
            </p>
          </div>
        </div>

        {/* API credentials & webhooks (Col 6) */}
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">API & Developer Configurations</h3>
          
          <div className="space-y-4">
            {/* Client ID */}
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Merchant Client ID</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="text" 
                  readOnly 
                  value={currentClient.id}
                  className="flex-grow bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => { navigator.clipboard.writeText(currentClient.id); alert('Client ID copied!'); }} className="p-2 rounded bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all">
                  <Download size={14} className="rotate-[-90deg]" />
                </button>
              </div>
            </div>

            {/* Client Secret */}
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Client Secret</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type={showSecret ? 'text' : 'password'}
                  readOnly 
                  value={clientSecret}
                  className="flex-grow bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => setShowSecret(!showSecret)} className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
                  {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Sandbox Key */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Sandbox API Token</span>
                <button onClick={handleGenerateKey} className="text-[10px] text-[#00E5FF] hover:underline flex items-center gap-1 font-bold">
                  <RefreshCw size={10} /> Rotate Token
                </button>
              </div>
              <input 
                type="text" 
                readOnly 
                value={sandboxKey}
                className="w-full bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            {/* Webhook Configuration */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Webhook Endpoint URL</span>
                <p className="text-[9px] text-gray-500 mb-2">We will dispatch transaction.captured payloads to this destination.</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="url" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-grow bg-white/[0.03] border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF5722]"
                  />
                  <button onClick={() => alert('Webhook URL updated successfully!')} className="bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3 py-2 rounded-lg text-xs font-bold transition-all">
                    Save
                  </button>
                </div>
              </div>
              <button onClick={() => alert('Webhook ping event sent! Response Code: 200 OK')} className="text-xs bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 w-full">
                <Play size={10} /> Test Connection (Send Ping)
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  // Tab Dispatcher
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return renderDashboard();
      case 'My Services':
        return renderMyServices();
      case 'Applications':
        return renderApplications();
      case 'Payments & Invoices':
        return renderPayments();
      case 'Documents':
        return renderDocuments();
      case 'Timeline':
        return renderTimeline();
      case 'Support Tickets':
        return renderSupportTickets();
      case 'Notifications':
        return renderNotifications();
      case 'Profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

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
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold pl-0.5">Simplifying Payments</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1 px-4">
                  {[
                    { name: 'Dashboard', icon: LayoutDashboard },
                    { name: 'Onboarding Services', icon: Briefcase },
                    { name: 'Bank Integrations', icon: Layers },
                    { name: 'Payments & Settlement', icon: CreditCard },
                    { name: 'KYC Documents', icon: FileText },
                    { name: 'Timeline', icon: Calendar },
                    { name: 'Support Tickets', icon: LifeBuoy }
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveTab(item.name);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#FF5722]/10 to-transparent text-[#FF5722] border-l-2 border-[#FF5722]' 
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        <IconComp size={18} className="mr-3" />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-4 space-y-1">
                <button 
                  onClick={() => {
                    setActiveTab('Notifications');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'Notifications' ? 'text-[#FF5722] bg-white/[0.02]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Bell size={18} className="mr-3" />
                    Notifications
                  </div>
                  {notificationCount > 0 && (
                    <span className="bg-[#FF5722] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{notificationCount}</span>
                  )}
                </button>
                
                <button 
                  onClick={() => {
                    setActiveTab('Profile');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'Profile' ? 'text-[#FF5722] bg-white/[0.02]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </button>

                <button 
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all mt-4"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar (Left Sidebar) */}
      <aside className="w-[280px] bg-white/[0.01] border-r border-white/5 flex-shrink-0 hidden xl:flex flex-col justify-between py-6">
        <div className="flex flex-col">
          <div className="px-6 mb-8">
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto mb-1" />
            </Link>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold pl-0.5">Simplifying Payments</span>
          </div>

          <nav className="space-y-1 px-4">
            {[
              { name: 'Dashboard', icon: LayoutDashboard },
              { name: 'My Services', icon: Briefcase },
              { name: 'Applications', icon: Layers },
              { name: 'Payments & Invoices', icon: CreditCard },
              { name: 'Documents', icon: FileText },
              { name: 'Timeline', icon: Calendar },
              { name: 'Support Tickets', icon: LifeBuoy }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#FF5722]/10 to-transparent text-[#FF5722] border-l-2 border-[#FF5722]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <IconComp size={18} className="mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('Notifications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'Notifications' ? 'text-[#FF5722] bg-white/[0.02]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Bell size={18} className="mr-3" />
              Notifications
            </div>
            {notificationCount > 0 && (
              <span className="bg-[#FF5722] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{notificationCount}</span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('Profile')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'Profile' ? 'text-[#FF5722] bg-white/[0.02]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <User size={18} className="mr-3" />
            Profile
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all mt-4"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen min-w-0">
        
        {/* Top Navbar */}
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
              <h1 className="text-base sm:text-xl font-bold text-white flex items-center gap-1.5 truncate">
                <span className="truncate">Welcome back, {currentClient.name}</span>
                <span className="text-sm sm:text-xl shrink-0">👋</span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block truncate">Here's the overview of your project and services. ID: {currentClient.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button 
              onClick={() => alert('Downloading Client Onboarding Summary report...')} 
              className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            >
              <Download size={14} />
              Download Report
            </button>
            <button 
              onClick={() => alert('Downloading Client Onboarding Summary report...')} 
              className="md:hidden flex items-center justify-center bg-white/[0.03] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white p-2 rounded-lg text-xs transition-all"
              title="Download Report"
            >
              <Download size={16} />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FF5722] to-amber-500 flex items-center justify-center font-bold text-xs sm:text-sm text-white shrink-0">
              {currentClient.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>

        {/* Tab-driven main container */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto max-w-[1440px] w-full mx-auto">
          {renderContent()}
        </main>
      </div>

    </div>
  );
};

export default ClientDashboard;
