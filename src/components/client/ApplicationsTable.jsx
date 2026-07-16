import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ApplicationsTable() {
  const { showToast } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Onboarding Applications</h2>
        <p className="text-xs text-gray-400">Review status updates for bank gateway and settlement applications.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-500 bg-white/[0.01]">
                <th className="p-4 font-bold">App ID</th>
                <th className="p-4 font-bold">Application Type</th>
                <th className="p-4 font-bold">Partner Institution</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Last Updated</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-904</td>
                <td className="p-4 font-bold text-white">Pay-In Routing Integration</td>
                <td className="p-4 text-gray-300">ICICI Bank Ltd</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase">Approved</span></td>
                <td className="p-4 text-gray-500">12 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => showToast('Displaying integration logs for ICICI bank routing...', 'info')} className="text-[#00E5FF] hover:underline font-semibold bg-transparent border-none cursor-pointer">Integrate</button></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-905</td>
                <td className="p-4 font-bold text-white">Payout Disbursals Gateway</td>
                <td className="p-4 text-gray-300">HDFC Bank Ltd</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-orange-500/10 text-orange-400 border-orange-500/20 uppercase">Under Review</span></td>
                <td className="p-4 text-gray-500">15 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => showToast('HDFC review logs: Compliance checking signatures.', 'info')} className="text-gray-400 hover:text-white font-semibold bg-transparent border-none cursor-pointer">Check Logs</button></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="p-4 font-mono text-gray-400">APP-2026-906</td>
                <td className="p-4 font-bold text-white">T+0 Same-Day Settlement</td>
                <td className="p-4 text-gray-300">OnePG Settlement Core</td>
                <td className="p-4"><span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-blue-500/10 text-blue-400 border-blue-500/20 uppercase">Applied</span></td>
                <td className="p-4 text-gray-500">15 July 2026</td>
                <td className="p-4 text-right"><button onClick={() => showToast('T+0 Settlement application is queued for active volume auditing.', 'info')} className="text-gray-400 hover:text-white font-semibold bg-transparent border-none cursor-pointer">Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
