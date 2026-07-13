import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { CheckCircle2, Shield, RefreshCw, ToggleLeft, ToggleRight, Database } from 'lucide-react';

export default function SystemView({ 
  clients, 
  updateClientStatus, 
  currentView 
}) {
  const { showToast } = useContext(AppContext);
  
  // Local state for settings panel
  const [hdfcGatewaySw, setHdfcGatewaySw] = useState(true);
  const [iciciGatewaySw, setIciciGatewaySw] = useState(true);
  const [sbiGatewaySw, setSbiGatewaySw] = useState(false);
  const [globalFee, setGlobalFee] = useState(1.95);
  const [sandboxState, setSandboxState] = useState(true);

  // Sub-view: Projects setup
  const renderProjectsSetup = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">System Projects Registry</h2>
        <p className="text-xs text-gray-400">Review technical stream deployments and developer assignments for each merchant.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-white/[0.01]">
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Technical Streams</th>
                <th className="px-6 py-4">Developers Assigned</th>
                <th className="px-6 py-4 text-center">Milestones</th>
                <th className="px-6 py-4 text-center">Priority</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {clients.map((client) => {
                const activeCount = client.services?.filter(s => s.status !== 'Not Started').length || 0;
                return (
                  <tr key={client.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <span className="font-bold text-white block">{client.company}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{client.id}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-300">
                      {client.services?.slice(0, 3).map(s => s.name).join(', ') || 'None active'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-[#00E5FF] font-bold">JD</div>
                        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-[#FF5722] font-bold">AS</div>
                        <span className="text-[10px] text-gray-500 font-bold ml-1">+2 Devs</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-white">
                      {activeCount} / {client.services?.length || 5}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        client.plan === 'Premium' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {client.plan === 'Premium' ? 'Critical' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => showToast(`Developer dashboard access request queued for ${client.company}`, 'info')} 
                        className="text-[#00E5FF] hover:underline font-bold text-xs"
                      >
                        Assign Dev
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Sub-view: Services activation requests
  const renderServicesQueue = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Services Activation Queue</h2>
        <p className="text-xs text-gray-400">Manage client requests for payment gateway integrations and instant settlement options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Enrolled Gateways</h4>
          <h3 className="text-2xl font-bold text-white mt-1">24</h3>
          <p className="text-[10px] text-gray-500 mt-1">Across all merchant instances</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Under Compliance Audit</h4>
          <h3 className="text-2xl font-bold text-orange-400 mt-1">3</h3>
          <p className="text-[10px] text-gray-500 mt-1">Awaiting compliance verification</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Service Uptime</h4>
          <h3 className="text-2xl font-bold text-emerald-400 mt-1">99.98%</h3>
          <p className="text-[10px] text-gray-500 mt-1">API routing nodes health</p>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Activation Request Desk</h3>
        <div className="space-y-3">
          {clients.filter(c => c.services?.some(s => s.status === 'Applied' || s.status === 'Under Review')).map((client) => {
            const reviewingSvcs = client.services?.filter(s => s.status === 'Applied' || s.status === 'Under Review') || [];
            return reviewingSvcs.map((svc) => (
              <div key={client.id + '-' + svc.name} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-all">
                <div>
                  <h4 className="text-xs font-bold text-white">{client.company} <span className="text-gray-500 font-mono">({client.id})</span></h4>
                  <p className="text-sm text-gray-300 font-semibold mt-1">Requesting activation of: <span className="text-[#00E5FF]">{svc.name}</span></p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      updateClientStatus(client.id, svc.name, 'Active', 'Approved by administrator');
                      showToast(`Service "${svc.name}" activated for ${client.company}`, 'success');
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black px-3.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 size={12} /> Activate Node
                  </button>
                  <button 
                    onClick={() => {
                      updateClientStatus(client.id, svc.name, 'Pending', 'Rejected by administrator: KYC updates needed');
                      showToast(`Service "${svc.name}" activation request rejected.`, 'warning');
                    }}
                    className="bg-white/5 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 px-3.5 py-1.5 rounded text-xs font-bold transition-all"
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            ));
          })}
          {clients.filter(c => c.services?.some(s => s.status === 'Applied' || s.status === 'Under Review')).length === 0 && (
            <p className="text-xs text-gray-500 text-center py-4">No active activation requests pending in queue.</p>
          )}
        </div>
      </div>
    </div>
  );

  // Sub-view: System configuration settings
  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Global Platform Settings</h2>
        <p className="text-xs text-gray-400">Toggle transaction switches, commission metrics, and system security thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Transaction Gateway Nodes</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">HDFC Bank Processing Node</span>
                <span className="text-[10px] text-gray-500">Route disbursals via HDFC transaction API.</span>
              </div>
              <button 
                onClick={() => {
                  setHdfcGatewaySw(!hdfcGatewaySw);
                  showToast(`HDFC Bank Processing Node is now ${!hdfcGatewaySw ? 'ENABLED' : 'DISABLED'}`, 'info');
                }} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {hdfcGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">ICICI Bank Processing Node</span>
                <span className="text-[10px] text-gray-500">Route payments via ICICI corporate gateway.</span>
              </div>
              <button 
                onClick={() => {
                  setIciciGatewaySw(!iciciGatewaySw);
                  showToast(`ICICI Bank Processing Node is now ${!iciciGatewaySw ? 'ENABLED' : 'DISABLED'}`, 'info');
                }} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {iciciGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">SBI Processing Node (Secondary)</span>
                <span className="text-[10px] text-gray-500">Fallback routing layer for peak traffic.</span>
              </div>
              <button 
                onClick={() => {
                  setSbiGatewaySw(!sbiGatewaySw);
                  showToast(`SBI Bank Processing Node is now ${!sbiGatewaySw ? 'ENABLED' : 'DISABLED'}`, 'info');
                }} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {sbiGatewaySw ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Commissions & Developer Environment</h3>
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Platform Commission Fee (%)</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="number" 
                  step="0.05"
                  value={globalFee}
                  onChange={(e) => setGlobalFee(parseFloat(e.target.value))}
                  className="flex-grow bg-white/[0.03] border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button 
                  onClick={() => showToast(`Global processing fee updated to ${globalFee}%`, 'success')} 
                  className="bg-[#00E5FF] hover:bg-[#00bacc] text-black px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  Apply Fee
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="text-xs font-bold text-white block">Global Sandbox Mode</span>
                <span className="text-[10px] text-gray-500">Enforce test keys environment globally.</span>
              </div>
              <button 
                onClick={() => {
                  setSandboxState(!sandboxState);
                  showToast(`Global Sandbox Mode ${!sandboxState ? 'ENABLED' : 'DISABLED'}`, 'warning');
                }} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                {sandboxState ? <ToggleRight size={28} className="text-[#00E5FF]" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button 
                onClick={() => showToast('Platform database backup compiled: onepg_backup_20260710.sql', 'success')} 
                className="flex-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Database size={12} /> Backup System DB
              </button>
              <button 
                onClick={() => showToast('Platform cached variables purged successfully.', 'success')} 
                className="flex-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300 hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw size={12} /> Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === 'projects' && renderProjectsSetup()}
      {currentView === 'services' && renderServicesQueue()}
      {currentView === 'settings' && renderSystemSettings()}
    </>
  );
}
