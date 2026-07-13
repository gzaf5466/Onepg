import React, { useState, useContext } from 'react';
import { Search, Plus, Info, Edit3, ChevronLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import addNewClientImg from '../../assets/add new client.avif';

export default function ClientsView({ 
  clients, 
  addClient, 
  updateClientStatus, 
  setCurrentView, 
  currentView,
  viewClientDashboard,
  getStatusBadgeClass 
}) {
  const { showToast } = useContext(AppContext);
  // Local state for Clients List
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Local state for Add Client Form
  const [newClientName, setNewClientName] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const [newClientPlan, setNewClientPlan] = useState('Basic');
  const [formError, setFormError] = useState('');

  // Local state for Update Status Form
  const [selectedClientForUpdate, setSelectedClientForUpdate] = useState(clients[0] || null);
  const [updateService, setUpdateService] = useState('Payout Process');
  const [updateStatusVal, setUpdateStatusVal] = useState('Submitted to Bank');
  const [updateNotes, setUpdateNotes] = useState('');

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

    showToast(`Service "${updateService}" updated successfully for ${selectedClientForUpdate.company}`, 'success');
    setCurrentView('all-clients');
  };



  const startUpdateStatus = (client) => {
    setSelectedClientForUpdate(client);
    const payoutSvc = client.services.find(s => s.name === 'Payout Process') || client.services[0];
    if (payoutSvc) {
      setUpdateService(payoutSvc.name);
      setUpdateStatusVal(payoutSvc.status);
    }
    setUpdateNotes(`Payout application updated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`);
    setCurrentView('update-status');
  };

  // Render sub-views conditionally
  if (currentView === 'add-client') {
    return (
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
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
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
    );
  }

  if (currentView === 'update-status' && selectedClientForUpdate) {
    return (
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
    );
  }

  // Default: Render Clients Directory
  return (
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
          {/* Custom Plan Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsPlanOpen(!isPlanOpen);
                setIsStatusOpen(false);
              }}
              className="bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-3 py-2 text-xs flex items-center justify-between gap-2 cursor-pointer font-semibold transition-all select-none min-w-[105px]"
            >
              <span>{planFilter}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isPlanOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isPlanOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPlanOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-1.5 w-32 bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-1 z-50 overflow-hidden font-semibold"
                  >
                    {['All Plans', 'Premium', 'Basic'].map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => {
                          setPlanFilter(plan);
                          setIsPlanOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition-all ${
                          planFilter === plan 
                            ? 'bg-[#00E5FF]/10 text-[#00E5FF]' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Custom Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsPlanOpen(false);
              }}
              className="bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#00E5FF]/50 text-white rounded-lg px-3 py-2 text-xs flex items-center justify-between gap-2 cursor-pointer font-semibold transition-all select-none min-w-[105px]"
            >
              <span>{statusFilter}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isStatusOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsStatusOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-1.5 w-32 bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-1 z-50 overflow-hidden font-semibold"
                  >
                    {['All Status', 'In Progress', 'Pending', 'Completed'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setStatusFilter(status);
                          setIsStatusOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition-all ${
                          statusFilter === status 
                            ? 'bg-[#00E5FF]/10 text-[#00E5FF]' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

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
          <table className="w-full min-w-[900px] text-left border-collapse whitespace-nowrap">
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
}
