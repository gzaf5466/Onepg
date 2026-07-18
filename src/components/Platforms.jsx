import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Smartphone, Laptop, ShieldCheck, Zap } from 'lucide-react';
import paymentSolutionImg from '../assets/payment solution.avif';

export default function Platforms() {
  return (
    <section id="solutions" className="py-4 sm:py-10 md:py-16 relative z-10 bg-[#050505] border-b border-white/5 overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Visual Graphic Illustration (Top on Mobile, Right on Desktop) */}
          <div className="lg:col-span-6 relative flex justify-center items-center group order-first lg:order-last">
            <img 
              src={paymentSolutionImg} 
              alt="OnePG Payment Solution" 
              width="1024"
              height="1024"
              className="w-full max-w-[480px] lg:max-w-[540px] h-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Left Column: Text & Features (Below Image on Mobile, Left on Desktop) */}
          <div className="lg:col-span-6 relative z-10 text-center lg:text-left order-last lg:order-first">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
              Deploy <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Everywhere</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#9CA3AF] mb-8 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              A single API that adapts dynamically to the platform it's called from. Deliver unified, high-speed checkout experiences across iOS, Android, and Web with zero layout shifts.
            </p>

            <div className="space-y-6 text-left max-w-xl mx-auto lg:mx-0">
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

        </div>
      </div>
    </section>
  );
}
