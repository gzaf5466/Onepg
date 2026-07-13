import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Shield } from 'lucide-react';

export default function BillingView({ 
  clients, 
  makePayment, 
  uploadDocument, 
  currentView 
}) {
  const { showToast } = useContext(AppContext);
  const totalRevenue = clients.reduce((sum, c) => sum + (c.amountPaid || 0), 0);
  const totalOutstanding = clients.reduce((sum, c) => sum + (c.pendingAmount || 0), 0);

  // Sub-view: Payments ledger
  const renderPaymentsLedger = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">System Payments Ledger</h2>
          <p className="text-xs text-gray-400">Overview of corporate billing accounts, revenue collections, and outstanding receivables.</p>
        </div>
        <button 
          onClick={() => showToast('Exporting payment spreadsheets as CSV...', 'info')} 
          className="bg-[#00E5FF] hover:bg-[#00bacc] text-black px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
        >
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
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
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
                          showToast(`Recorded payment of ₹${c.pendingAmount.toLocaleString('en-IN')} from ${c.company}`, 'success');
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
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
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
                      <button 
                        onClick={() => showToast(`Emailing invoice ${inv.id} reminder to ${c.email}...`, 'info')} 
                        className="text-[#00E5FF] hover:underline font-bold text-xs"
                      >
                        Email Reminder
                      </button>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
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
                      showToast(`Document "${doc.name}" for ${client.company} approved.`, 'success');
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Approve Document
                  </button>
                  <button 
                    onClick={() => {
                      uploadDocument(client.id, doc.name, 'Pending');
                      showToast(`Document "${doc.name}" marked as Rejected/Pending.`, 'warning');
                    }}
                    className="bg-white/5 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ));
          })}
          {clients.filter(c => c.documents?.some(d => d.status === 'Under Review' || d.status === 'Pending')).length === 0 && (
            <p className="text-xs text-gray-500 text-center py-4">No KYC documents currently pending audit.</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === 'payments' && renderPaymentsLedger()}
      {currentView === 'invoices' && renderInvoicesDesk()}
      {currentView === 'documents' && renderDocumentsCompliance()}
    </>
  );
}
