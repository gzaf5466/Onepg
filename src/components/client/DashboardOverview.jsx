import React, { useState, useContext } from 'react';
import { 
  Crown, CreditCard, Clock, ChevronRight, ArrowUpRight, 
  CheckCircle2, AlertCircle, UploadCloud, HelpCircle, Phone 
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { getStatusColor } from './clientUtils';

export default function DashboardOverview({ setActiveTab }) {
  const { currentClient, uploadDocument, makePayment, showToast } = useContext(AppContext);
  const [uploadingDoc, setUploadingDoc] = useState(null);

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
      showToast('Payment of ₹' + (currentClient.pendingAmount ?? 0).toLocaleString('en-IN') + ' completed successfully!', 'success');
    }
  };

  return (
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
            <h3 className="text-2xl font-bold text-white">₹{(currentClient?.amountPaid ?? 0).toLocaleString('en-IN')}</h3>
            <button onClick={() => setActiveTab('Payments & Invoices')} className="text-[10px] text-[#00E5FF] hover:underline font-semibold flex items-center mt-1 bg-transparent border-none cursor-pointer">
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
            <h3 className="text-2xl font-bold text-[#FF5722]">₹{(currentClient?.pendingAmount ?? 0).toLocaleString('en-IN')}</h3>
            {currentClient.pendingAmount > 0 ? (
              <button onClick={handlePayNow} className="text-[10px] text-[#FF5722] hover:underline font-bold flex items-center mt-1 bg-transparent border-none cursor-pointer">
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
                  <button onClick={() => setActiveTab('My Services')} className="text-xs text-gray-500 hover:text-white transition-colors font-medium bg-transparent border-none cursor-pointer">View Details</button>
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
                <span className="font-semibold text-emerald-400">₹{(currentClient?.amountPaid ?? 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Pending Amount</span>
                <span className="font-semibold text-[#FF5722]">₹{(currentClient?.pendingAmount ?? 0).toLocaleString('en-IN')}</span>
              </div>
              {currentClient.pendingAmount > 0 && (
                <button 
                  onClick={handlePayNow}
                  className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.2)] mt-2 cursor-pointer border-none"
                >
                  Make Payment
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-white">Invoices</h4>
              <button onClick={() => setActiveTab('Payments & Invoices')} className="text-xs text-[#00E5FF] hover:underline font-semibold bg-transparent border-none cursor-pointer">View All</button>
            </div>
            <div className="space-y-2">
              {currentClient.invoices && currentClient.invoices.slice(0, 2).map((inv) => (
                <div key={inv.id} className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{inv.id}</span>
                    <span className="text-[10px] text-gray-500">{inv.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white">₹{(inv?.amount ?? 0).toLocaleString('en-IN')}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                    {inv.status === 'Paid' && (
                      <button onClick={() => showToast(`Downloading Invoice ${inv.id} PDF... (Mock File Download)`, 'info')} className="text-gray-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                        <UploadCloud size={14} className="rotate-180" />
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
              <button onClick={() => setActiveTab('Documents')} className="text-xs text-[#00E5FF] hover:underline font-semibold bg-transparent border-none cursor-pointer">View All</button>
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
                          className="bg-white/[0.04] border border-white/10 hover:border-[#FF5722]/40 hover:bg-white/[0.08] text-gray-300 hover:text-white px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
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
              <button onClick={() => setActiveTab('Support Tickets')} className="flex-1 sm:flex-none bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border-none cursor-pointer">Raise Ticket</button>
              <button onClick={() => showToast('Dialing Account Manager: +91 1800 123 4567...', 'info')} className="flex-1 sm:flex-none bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer">
                <Phone size={10} />
                Contact Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
