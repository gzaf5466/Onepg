import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Repeat, Code, Link } from 'lucide-react';

const features = [
  {
    icon: <Repeat className="w-6 h-6 text-[#00E5FF]" />,
    title: 'Smart Routing',
    desc: 'Automatically route transactions to the highest-performing gateway in real-time, eliminating transaction drop-offs.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    visual: (
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_25s_linear_infinite]">
          <circle cx="50" cy="50" r="40" stroke="#00E5FF" strokeWidth="1.5" fill="none" strokeDasharray="5,5" />
          <circle cx="50" cy="50" r="30" stroke="#FF5722" strokeWidth="2.5" fill="none" strokeDasharray="10,10" />
        </svg>
      </div>
    )
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#FF5722]" />,
    title: 'Secure Verification',
    desc: 'Instantly authenticate Aadhaar, PAN, and GSTIN details programmatically.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: 'Bulk Disbursals',
    desc: 'High-volume payment payouts with zero latency and automated split balances.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Code className="w-6 h-6 text-[#00E5FF]" />,
    title: 'Dev-Friendly API',
    desc: 'Lightweight client SDKs and REST APIs engineered for developer velocity.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Link className="w-6 h-6 text-[#FF5722]" />,
    title: 'Instant Webhooks',
    desc: 'Secure transactional notification delivery with auto-retry logics.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-28 relative z-20 bg-[#050505] border-b border-white/5">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/5 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-6">
            Core Features
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight leading-tight">
            Engineered for <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Performance</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl font-light">
            We simplify global payment collection, instant merchant disbursements, and secure identity checkups inside a single high-performance engine.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] relative z-10">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.08] hover:border-white/[0.15] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300 ${f.span}`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center mb-6 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-[#88929b] text-sm font-light leading-relaxed">{f.desc}</p>
              </div>
              {f.visual && f.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
