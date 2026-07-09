import React from 'react';
import { motion } from 'framer-motion';
import routingNodes from '../assets/routing-nodes.jpeg';

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28 relative z-10 bg-[#050505] overflow-hidden border-b border-white/5">
      {/* Background ambient blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row-reverse items-center gap-20">
        
        {/* 3D Routing Nodes Asset */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full relative"
        >
          <div className="relative w-full aspect-[4/3] rounded-[2rem] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-[#050505] flex items-center justify-center group">
            <img 
              src={routingNodes} 
              alt="OnePG Smart Routing Nodes" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 lg:pr-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-6">
            Intelligent Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
            Engineered for <br/>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Every Business</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] mb-10 font-light leading-relaxed">
            OnePG Router delivers enterprise-grade conversion enhancements, instant disbursals, and secure identity checkups inside a single high-performance package.
          </p>
          
          <ul className="space-y-10">
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FF5722] transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(255,87,34,0.3)] group-hover:-translate-y-1">
                <span className="text-[#FF5722] font-black text-2xl group-hover:text-white transition-colors">1</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF5722] transition-colors">E-Commerce Platforms</h4>
                <p className="text-[#88929b] text-sm leading-relaxed font-light">Eliminate checkout drop-offs caused by gateway downtime with smart active routing failovers. Maximize your processing success rate automatically.</p>
              </div>
            </li>
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00E5FF] transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(0,229,255,0.3)] group-hover:-translate-y-1">
                <span className="text-[#00E5FF] font-black text-2xl group-hover:text-white transition-colors">2</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">SaaS & Subscriptions</h4>
                <p className="text-[#88929b] text-sm leading-relaxed font-light">Set up automated recurring mandate checkouts via Cards and UPI Autopay with smart retry mechanics to prevent passive subscription churn.</p>
              </div>
            </li>
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] group-hover:-translate-y-1">
                <span className="text-white/80 font-black text-2xl group-hover:text-white transition-colors">3</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">Digital Marketplaces</h4>
                <p className="text-[#88929b] text-sm leading-relaxed font-light">Programmatically split checkout totals and route instant payouts directly to sub-merchant bank accounts with automated ledger audits.</p>
              </div>
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
