import React, { useContext } from 'react';
import { Globe, Server, Clock, CreditCard, ArrowUpRight } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { getStatusColor } from './clientUtils';

export default function ServicesConsole({ setActiveTab }) {
  const { currentClient, showToast } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Merchant Services Console</h2>
          <p className="text-xs text-gray-400">Track and configure your active and subscribed corporate services.</p>
        </div>
        <button onClick={() => showToast('New Service activation request sent to Account Manager.', 'success')} className="bg-gradient-to-r from-[#FF5722] to-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.2)] border-none cursor-pointer">
          Request New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClient.services && currentClient.services.map((svc, idx) => {
          const isGateway = svc.name.includes('Gateway') || svc.name.includes('Process') || svc.name.includes('Settlement');
          return (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-[#FF5722]/30 transition-all flex flex-col justify-between min-h-[190px] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                  <button onClick={() => setActiveTab('Profile')} className="text-[#00E5FF] hover:underline font-bold flex items-center gap-0.5 bg-transparent border-none cursor-pointer">
                    View API Keys <ArrowUpRight size={10} />
                  </button>
                ) : (
                  <button onClick={() => showToast(`Details for ${svc.name}: Under Active Review.`, 'info')} className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">View SLA</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
