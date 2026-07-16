import React, { useContext } from 'react';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

export default function JourneyTimeline() {
  const { currentClient } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Detailed Onboarding Journey</h2>
        <p className="text-xs text-gray-400">Step-by-step trace of your merchant profile onboarding records.</p>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative border-l-2 border-white/5 pl-8 ml-4 space-y-8 py-2">
          {currentClient.timeline && currentClient.timeline.map((step, idx) => {
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress' || step.status === 'Under Review';
            return (
              <div key={idx} className="relative">
                <span className={`absolute left-[-42px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted ? 'bg-[#FF5722] border-[#FF5722]' :
                  isInProgress ? 'bg-amber-500 border-amber-500 animate-pulse' :
                  'bg-[#050505] border-white/10'
                }`}>
                  {isCompleted ? <Check size={12} className="text-white" /> : 
                   isInProgress ? <Clock size={12} className="text-white" /> : null}
                </span>

                <div className="space-y-2 bg-white/[0.01] border border-white/5 p-5 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-sm font-bold transition-colors ${isCompleted || isInProgress ? 'text-white' : 'text-gray-600'}`}>
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-semibold uppercase tracking-widest">Step {idx + 1} of {currentClient.timeline.length}</p>
                    </div>
                    {step.date && <span className="text-xs text-gray-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded">{step.date}</span>}
                  </div>
                  {isInProgress && (
                    <span className="inline-block text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider">
                      Under Processing
                    </span>
                  )}
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {idx === 0 ? 'KYC document packet collected, scanned and verified by security compliance algorithms.' :
                     idx === 1 ? 'Legal, pan, and identity document status evaluated against government database APIs.' :
                     idx === 2 ? 'Optimal transaction routing partner selection (HDFC/ICICI nodes) assigned based on volume.' :
                     idx === 3 ? 'Application files and custom sandbox tokens formatted and transmitted to merchant desk.' :
                     idx === 4 ? 'Partner bank checking compliance checks and transaction limits configuration.' :
                     'Production merchant portal credentials and sandbox keys switched to live status.'}
                  </p>
                  {step.notes && (
                    <div className="text-xs text-[#FF5722] bg-[#FF5722]/5 p-3 rounded border border-[#FF5722]/10 mt-2 flex gap-2 items-start">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Officer Comment:</span>
                        <p className="mt-1 leading-relaxed">{step.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
