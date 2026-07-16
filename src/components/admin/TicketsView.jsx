import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

export default function TicketsView() {
  const { tickets, fetchTickets, resolveTicket } = useContext(AppContext);

  useEffect(() => {
    fetchTickets();
  }, []);

  const openTicketsCount = tickets.filter(t => t.status === 'Open').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Global Support Tickets Desk</h2>
          <p className="text-xs text-gray-400">Debug corporate developer queries, settlement complaints, and technical queries.</p>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold">
          Open Tickets: <span className="text-[#FF5722]">{openTicketsCount}</span>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
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
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-gray-500">{t.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white block">{t.company}</span>
                    <span className="text-[10px] text-gray-500">{t.client}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white block">{t.title}</span>
                    <span className="text-[11px] text-gray-400 font-light block mt-0.5">{t.description || t.desc}</span>
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
                        onClick={() => resolveTicket(t.id)}
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
    </div>
  );
}
