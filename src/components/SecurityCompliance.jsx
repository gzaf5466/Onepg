import React from 'react';
import { ShieldAlert, KeyRound, Radio, DatabaseZap, SearchCode, Server } from 'lucide-react';
import securityImg from '../assets/security and compliance.png';

const SecurityCompliance = () => {
  const securityItems = [
    {
      title: 'PCI DSS Compliant',
      desc: 'Adhering strictly to Level 1 Payment Card Industry Data Security Standards to ensure cards data safety.',
      icon: ShieldAlert,
      color: 'text-sky-400 bg-sky-500/10'
    },
    {
      title: 'AES-256 Encryption',
      desc: 'All payload tokens and customer credentials are encrypted in-transit and at-rest using 256-bit AES algorithms.',
      icon: KeyRound,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      title: 'Tokenization',
      desc: 'Sensitive card credentials are exchanged for secure cryptographic tokens, eliminating database storage risk.',
      icon: Radio,
      color: 'text-[#FF5722] bg-[#FF5722]/10'
    },
    {
      title: 'Fraud Detection',
      desc: 'AI-led check loops review incoming routing requests to intercept chargeback attempts and spoofing triggers.',
      icon: DatabaseZap,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'KYC & AML',
      desc: 'Onboarding checks integrate with AML databases to flag high-risk entities and maintain regulatory compliance.',
      icon: SearchCode,
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      title: '99.99% Uptime SLA',
      desc: 'Redundant hosting across multiple cloud zones guarantees transaction availability during peak volume spikes.',
      icon: Server,
      color: 'text-rose-500 bg-rose-500/10'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#FF5722]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Security & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Security You Can Trust</h2>
          <p className="text-gray-400 text-sm">Your transaction payload, client credentials, and business assets are always protected.</p>
        </div>

        {/* Center Illustration + Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Cards (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            {securityItems.slice(0, 3).map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="bg-white/[0.01] border border-white/5 p-5 rounded-xl space-y-2 hover:bg-white/[0.02] transition-colors hover:border-[#00E5FF]/20 text-left">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <IconComp size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Center Graphic Shield Lock (Col 4) */}
          <div className="lg:col-span-4 flex items-center justify-center py-6 lg:py-0">
            <div className="relative w-[240px] h-[240px] flex items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl p-4 group">
              <img 
                src={securityImg} 
                alt="Security Compliance" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Cards (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            {securityItems.slice(3, 6).map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="bg-white/[0.01] border border-white/5 p-5 rounded-xl space-y-2 hover:bg-white/[0.02] transition-colors hover:border-[#FF5722]/20 text-left">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <IconComp size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Security is not a feature. It's our foundation.</p>
        </div>

      </div>
    </section>
  );
};

export default SecurityCompliance;
