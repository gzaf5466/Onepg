import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function NotificationsView({ notifications, handleMarkAllRead, notificationCount }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">System Notifications</h2>
          <p className="text-xs text-gray-400">Keep track of your KYC approvals, invoices, and bank status updates.</p>
        </div>
        {notificationCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-xs text-[#00E5FF] hover:underline font-bold flex items-center gap-1 bg-transparent border-none cursor-pointer">
            <CheckCircle2 size={14} /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 ${
            n.read ? 'bg-white/[0.01] border-white/5' : 'bg-[#FF5722]/5 border-[#FF5722]/15 shadow-[0_0_15px_rgba(255,87,34,0.03)]'
          }`}>
            <div className="flex gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${n.read ? 'bg-white/5 text-gray-400' : 'bg-[#FF5722]/10 text-[#FF5722]'}`}>
                <Bell size={16} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  {n.title}
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{n.message}</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 font-bold shrink-0">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
