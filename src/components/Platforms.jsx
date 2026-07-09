import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Smartphone, Laptop, ShieldCheck, Zap } from 'lucide-react';

export default function Platforms() {
  return (
    <section id="solutions" className="py-20 md:py-28 relative z-10 bg-[#050505] border-b border-white/5 overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-6">
              Omnichannel Ready
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
              Deploy <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Everywhere</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#9CA3AF] mb-10 leading-relaxed font-light">
              A single API that adapts dynamically to the platform it's called from. Deliver unified, high-speed checkout experiences across iOS, Android, and Web with zero layout shifts.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/5 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Cross-Platform Sync</h4>
                  <p className="text-[#88929b] text-sm font-light">Instant state syncing between mobile, web, and native overlays without drop-offs.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl border border-[#FF5722]/20 bg-[#FF5722]/5 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-[#FF5722]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Frictionless Web-Overlays</h4>
                  <p className="text-[#88929b] text-sm font-light">Native SDK overlays let customers pay securely without leaving your application flow.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Placeholder */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-[540px] rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0f1b29]/50 via-[#0b1014]/80 to-[#0e1a24]/50 p-4 shadow-[0_0_50px_rgba(0,229,255,0.03)] overflow-hidden flex items-center justify-center">
              <img 
                src="/src/assets/platforms-sync.png" 
                alt="OnePG Cross-Platform Sync Checkout" 
                className="w-full h-auto object-contain rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 540 380' fill='none'><rect width='540' height='380' rx='24' fill='%2305090c'/><circle cx='270' cy='190' r='140' fill='%23FF5722' fill-opacity='0.02' filter='blur(50px)'/><rect x='80' y='60' width='240' height='170' rx='12' stroke='%23ffffff' stroke-width='1.5' stroke-opacity='0.1' fill='%230b1014'/><circle cx='100' cy='75' r='3' fill='%23ff5f56'/><circle cx='108' cy='75' r='3' fill='%23ffbd2e'/><circle cx='116' cy='75' r='3' fill='%2327c93f'/><rect x='340' y='100' width='110' height='210' rx='20' stroke='%23ffffff' stroke-width='1.5' stroke-opacity='0.1' fill='%230b1014'/><path d='M380 108 A 4 4 0 0 1 380 114' stroke='%23ffffff' stroke-width='1.5' stroke-opacity='0.2'/><path d='M150 170 C240 100 280 280 370 170' stroke='%2300e5ff' stroke-width='3' stroke-dasharray='6 4'/></svg>";
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
