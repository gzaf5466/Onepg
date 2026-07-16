import React, { useContext } from 'react';
import { Download } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

export default function PaymentsLedger() {
  const { currentClient, makePayment, showToast } = useContext(AppContext);

  const handlePayNow = () => {
    if (currentClient.pendingAmount > 0) {
      makePayment(currentClient.id);
      showToast('Payment of ₹' + currentClient.pendingAmount.toLocaleString('en-IN') + ' completed successfully!', 'success');
    }
  };

  return (
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
            <button onClick={handlePayNow} className="mt-2 text-xs bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3 py-1.5 rounded font-bold transition-all shadow-[0_0_10px_rgba(255,87,34,0.2)] border-none cursor-pointer">
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
                        <button onClick={() => showToast(`Downloading invoice ${inv.id} PDF... (Mock File Download)`, 'info')} className="text-[#00E5FF] hover:underline font-semibold flex items-center justify-end gap-1 ml-auto bg-transparent border-none cursor-pointer">
                          <Download size={12} /> Download
                        </button>
                      ) : (
                        <button onClick={handlePayNow} className="text-[#FF5722] hover:underline font-bold bg-transparent border-none cursor-pointer">Pay Now</button>
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
}
