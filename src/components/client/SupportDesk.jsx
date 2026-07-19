import React, { useState, useContext, useEffect } from 'react';
import { Send } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import CustomSelect from '../ui/CustomSelect';

export default function SupportDesk() {
  const { tickets, fetchTickets, createTicket } = useContext(AppContext);

  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketSeverity, setNewTicketSeverity] = useState('Medium');

  const severityOptions = [
    { value: 'Low', label: 'Low - Minor Query' },
    { value: 'Medium', label: 'Medium - Standard Query' },
    { value: 'High', label: 'High - Integration Blocked' },
    { value: 'Critical', label: 'Critical - Production Failure' }
  ];

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    if (!newTicketTitle || !newTicketDesc) return;
    
    await createTicket(newTicketTitle, newTicketSeverity, newTicketDesc);
    setNewTicketTitle('');
    setNewTicketDesc('');
  };

  return (
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
            <CustomSelect 
              label="Severity Level"
              options={severityOptions}
              value={newTicketSeverity}
              onChange={(val) => setNewTicketSeverity(val)}
            />
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
              className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3 rounded-lg text-xs font-bold transition-all shadow-[0_4px_20px_rgba(255,87,34,0.25)] flex items-center justify-center gap-1.5 cursor-pointer border-none"
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
                  <p className="text-[11px] text-gray-400 font-light">{t.description || t.desc}</p>
                  <div className="text-[9px] text-gray-500 pt-1 text-right">Raised on {t.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
