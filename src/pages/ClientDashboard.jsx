import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Briefcase, Layers, CreditCard, FileText, Calendar, 
  LifeBuoy, Bell, User, LogOut, Download, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.svg';

// Decomposed Client Sub-views
import DashboardOverview from '../components/client/DashboardOverview';
import ServicesConsole from '../components/client/ServicesConsole';
import ApplicationsTable from '../components/client/ApplicationsTable';
import PaymentsLedger from '../components/client/PaymentsLedger';
import KYCDocuments from '../components/client/KYCDocuments';
import JourneyTimeline from '../components/client/JourneyTimeline';
import SupportDesk from '../components/client/SupportDesk';
import NotificationsView from '../components/client/NotificationsView';
import ProfileSettings from '../components/client/ProfileSettings';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { currentClient, logout, showToast } = useContext(AppContext);
  
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notificationCount, setNotificationCount] = useState(2);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // System Notifications State (Passed to NotificationsView)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Document Verified', message: 'Your Cancelled Cheque has been approved by compliance.', date: '11 July 2026', read: false },
    { id: 2, title: 'Invoice Paid', message: 'Payment of ₹20,000 for Invoice INV-2026-001 has been confirmed.', date: '09 July 2026', read: false },
    { id: 3, title: 'Timeline Updated', message: 'Onboarding packet submitted to partner bank.', date: '13 July 2026', read: true }
  ]);

  const [showOnboardingModal, setShowOnboardingModal] = useState(() => {
    // Automatically prompt onboarding modal if user's company or phone is not set
    const savedOnboarding = localStorage.getItem('onepg_onboarding_completed');
    return !savedOnboarding && (!currentClient?.company || !currentClient?.phone);
  });

  const [onboardingForm, setOnboardingForm] = useState({
    company: currentClient?.company || '',
    phone: currentClient?.phone || '',
    businessType: 'E-commerce & Digital Goods',
    monthlyVolume: '₹5L - ₹25L',
    gstin: '',
    address: ''
  });

  if (!currentClient) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const handleSaveOnboarding = (e) => {
    e.preventDefault();
    localStorage.setItem('onepg_onboarding_completed', 'true');
    if (currentClient) {
      currentClient.company = onboardingForm.company || currentClient.company;
      currentClient.phone = onboardingForm.phone || currentClient.phone;
      currentClient.businessType = onboardingForm.businessType;
    }
    setShowOnboardingModal(false);
    showToast('Merchant onboarding form submitted! Account verification in progress.', 'success');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  // Shared Sidebar Configuration Array
  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Services', icon: Briefcase },
    { name: 'Applications', icon: Layers },
    { name: 'Payments & Invoices', icon: CreditCard },
    { name: 'Documents', icon: FileText },
    { name: 'Timeline', icon: Calendar },
    { name: 'Support Tickets', icon: LifeBuoy }
  ];

  // Tab Content Dispatcher
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'My Services':
        return <ServicesConsole setActiveTab={setActiveTab} />;
      case 'Applications':
        return <ApplicationsTable />;
      case 'Payments & Invoices':
        return <PaymentsLedger />;
      case 'Documents':
        return <KYCDocuments />;
      case 'Timeline':
        return <JourneyTimeline />;
      case 'Support Tickets':
        return <SupportDesk />;
      case 'Notifications':
        return (
          <NotificationsView 
            notifications={notifications} 
            handleMarkAllRead={handleMarkAllRead} 
            notificationCount={notificationCount} 
          />
        );
      case 'Profile':
        return <ProfileSettings />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
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
                    className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors focus:outline-none cursor-pointer border-none bg-transparent"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1 px-4">
                  {sidebarItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveTab(item.name);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
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
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
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
                  className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all mt-4 border-none bg-transparent cursor-pointer"
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
      <aside className="w-[280px] bg-[#050505] border-r border-white/5 hidden xl:flex flex-col justify-between py-6 fixed top-0 bottom-0 left-0 z-30">
        <div className="flex flex-col min-h-0">
          <div className="px-6 mb-8 flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto mb-1" />
            </Link>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold pl-0.5">Simplifying Payments</span>
          </div>

          <nav className="space-y-1 px-4 overflow-y-auto min-h-0 flex-grow">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
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

        <div className="px-4 space-y-1 flex-shrink-0 mt-auto">
          <button 
            onClick={() => setActiveTab('Notifications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
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
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all border-none bg-transparent cursor-pointer ${
              activeTab === 'Profile' ? 'text-[#FF5722] bg-white/[0.02]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <User size={18} className="mr-3" />
            Profile
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all mt-4 border-none bg-transparent cursor-pointer"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen min-w-0 xl:pl-[280px]">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white/[0.01] border-b border-white/5 flex items-center justify-between px-4 sm:px-6 md:px-8 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Button for mobile/tablet */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors focus:outline-none shrink-0 border-none bg-transparent cursor-pointer"
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
            <div 
              onClick={() => setActiveTab('Profile')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FF5722] to-amber-500 flex items-center justify-center font-bold text-xs sm:text-sm text-white shrink-0 cursor-pointer hover:opacity-95 transition-all"
              title="View Profile Settings"
            >
              {currentClient.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>

        {/* Tab-driven main container */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto max-w-[1440px] w-full mx-auto">
          {renderContent()}
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
            <span>Secure connection active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>OnePG v2.4 • Client Portal</span>
            <button 
              onClick={() => {
                showToast("Sandbox API gateway ping: 22ms latency", "info");
              }}
              className="text-[#FF5722] hover:underline transition-all bg-transparent border-none p-0 cursor-pointer"
            >
              Ping Node
            </button>
          </div>
        </motion.footer>
      </div>

      {/* Post-Authentication Merchant Onboarding Modal */}
      <AnimatePresence>
        {showOnboardingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0c0d12] border border-white/10 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-1 rounded-full border border-[#FF5722]/20 mb-2 inline-block">
                    Step 2 of 2 • Account Verification
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Complete Merchant Profile</h3>
                  <p className="text-xs text-gray-400 font-light mt-1">Please provide your merchant details to complete onboarding & activate payment processing.</p>
                </div>
              </div>

              <form onSubmit={handleSaveOnboarding} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="onboarding-company" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Business / Company Name <span className="text-[#FF5722]">*</span>
                    </label>
                    <input 
                      id="onboarding-company"
                      type="text"
                      name="company"
                      required
                      autoComplete="organization"
                      value={onboardingForm.company}
                      onChange={(e) => setOnboardingForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g. Acme Tech Pvt Ltd"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="onboarding-phone" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Contact Phone <span className="text-[#FF5722]">*</span>
                    </label>
                    <input 
                      id="onboarding-phone"
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      value={onboardingForm.phone}
                      onChange={(e) => setOnboardingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="onboarding-business-type" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Business Category
                    </label>
                    <select
                      id="onboarding-business-type"
                      name="businessType"
                      value={onboardingForm.businessType}
                      onChange={(e) => setOnboardingForm(prev => ({ ...prev, businessType: e.target.value }))}
                      className="w-full bg-[#121319] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF5722]/50 transition-all"
                    >
                      <option value="E-commerce & Digital Goods">E-commerce & Digital Goods</option>
                      <option value="SaaS & Software">SaaS & Software</option>
                      <option value="Fintech & Financial Services">Fintech & Financial Services</option>
                      <option value="Education & EdTech">Education & EdTech</option>
                      <option value="Gaming & Entertainment">Gaming & Entertainment</option>
                      <option value="Retail & Services">Retail & Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="onboarding-volume" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Monthly Expected Volume
                    </label>
                    <select
                      id="onboarding-volume"
                      name="monthlyVolume"
                      value={onboardingForm.monthlyVolume}
                      onChange={(e) => setOnboardingForm(prev => ({ ...prev, monthlyVolume: e.target.value }))}
                      className="w-full bg-[#121319] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF5722]/50 transition-all"
                    >
                      <option value="₹0 - ₹5L">₹0 - ₹5 Lakhs</option>
                      <option value="₹5L - ₹25L">₹5 Lakhs - ₹25 Lakhs</option>
                      <option value="₹25L - ₹1Cr">₹25 Lakhs - ₹1 Crore</option>
                      <option value="₹1Cr+">₹1 Crore +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="onboarding-gstin" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    GSTIN / Business Tax ID (Optional)
                  </label>
                  <input 
                    id="onboarding-gstin"
                    type="text"
                    name="gstin"
                    value={onboardingForm.gstin}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, gstin: e.target.value }))}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="onboarding-address" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Registered Operating Address
                  </label>
                  <textarea 
                    id="onboarding-address"
                    name="address"
                    rows={2}
                    value={onboardingForm.address}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter registered address and PIN code"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600 resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowOnboardingModal(false)}
                    className="px-5 py-2.5 text-xs text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Complete Later
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FF5722] hover:bg-[#e64e1e] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,87,34,0.3)] cursor-pointer"
                  >
                    Submit & Start Processing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientDashboard;
