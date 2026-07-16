import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Users, UserPlus, FolderKanban, Briefcase, 
  CreditCard, FileText, LifeBuoy, Settings, LogOut,
  Menu, X, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.svg';

// Modular Sub-components
import ClientsView from '../components/admin/ClientsView';
import SystemView from '../components/admin/SystemView';
import BillingView from '../components/admin/BillingView';
import TicketsView from '../components/admin/TicketsView';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { clients, addClient, updateClientStatus, uploadDocument, makePayment, setCurrentClientId, logout, showToast, API_BASE } = useContext(AppContext);
  
  // Admin navigation state: 'all-clients', 'add-client', 'projects', 'services', 'payments', 'invoices', 'documents', 'tickets', 'settings'
  const [currentView, setCurrentView] = useState('all-clients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const viewClientDashboard = (clientId) => {
    setCurrentClientId(clientId);
    navigate('/dashboard');
  };

  const handleCheckHealth = async () => {
    try {
      const token = localStorage.getItem('onepg_token');
      const res = await fetch(`${API_BASE}/system/metrics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        const { cpuLoad, ramUsage, dbLatency } = data.metrics;
        showToast(`System Health: CPU ${cpuLoad} | RAM ${ramUsage} | DB Latency ${dbLatency}`, "info");
      } else {
        showToast("Failed to fetch system metrics: " + (data.message || 'Unknown error'), "error");
      }
    } catch (err) {
      showToast("Host system diagnostics offline.", "error");
    }
  };

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
                    const isActive = currentView === item.view || 
                      (item.view === 'all-clients' && ['add-client', 'update-status'].includes(currentView));
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
      <aside className="w-[280px] bg-[#050505] border-r border-white/5 hidden xl:flex flex-col justify-between py-6 fixed top-0 bottom-0 left-0 z-30">
        <div className="flex flex-col min-h-0">
          <div className="px-6 mb-8 flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto mb-1" />
            </Link>
            <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest font-extrabold pl-0.5">Admin Panel</span>
          </div>

          <nav className="space-y-1 px-4 overflow-y-auto min-h-0 flex-grow">
            {adminNavItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentView === item.view ||
                (item.view === 'all-clients' && ['add-client', 'update-status'].includes(currentView));
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

        <div className="px-4 flex-shrink-0 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all cursor-pointer border-none bg-transparent"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-grow flex flex-col min-h-screen min-w-0 xl:pl-[280px]">
        
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              {/* Clients View (Directory, Add Client form, Update Status form) */}
              {['all-clients', 'add-client', 'update-status'].includes(currentView) && (
                <ClientsView
                  clients={clients}
                  addClient={addClient}
                  updateClientStatus={updateClientStatus}
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                  viewClientDashboard={viewClientDashboard}
                  getStatusBadgeClass={getStatusBadgeClass}
                />
              )}

              {/* System View (Projects setup, Services activation, system settings) */}
              {['projects', 'services', 'settings'].includes(currentView) && (
                <SystemView
                  clients={clients}
                  updateClientStatus={updateClientStatus}
                  currentView={currentView}
                />
              )}

              {/* Billing View (Payments ledger, Invoices, Compliance docs review) */}
              {['payments', 'invoices', 'documents'].includes(currentView) && (
                <BillingView
                  clients={clients}
                  makePayment={makePayment}
                  uploadDocument={uploadDocument}
                  currentView={currentView}
                />
              )}

              {/* Support Tickets View */}
              {currentView === 'tickets' && (
                <TicketsView />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Animated Mobile Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="xl:hidden bg-[#0d0d0d]/80 backdrop-blur-md border-t border-white/5 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-gray-500 font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All gateway nodes operational</span>
          </div>
          <div className="flex items-center gap-4">
            <span>OnePG v2.4 • Admin Console</span>
            <button 
              onClick={handleCheckHealth}
              className="text-[#00E5FF] hover:underline transition-all bg-transparent border-none p-0 cursor-pointer"
            >
              System Health
            </button>
          </div>
        </motion.footer>
      </div>

    </div>
  );
};

export default AdminDashboard;
