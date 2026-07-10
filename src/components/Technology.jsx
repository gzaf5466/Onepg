import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, Lock, Webhook, Cpu, Code2 } from 'lucide-react';
import technologyImg from '../assets/technology.avif';

export default function Technology() {
  const techFeatures = [
    {
      title: 'Powerful APIs',
      desc: 'Sleek, developer-first RESTful architecture built for robust multi-tenant payment handshakes.',
      icon: Terminal,
      color: 'text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/20'
    },
    {
      title: 'Real-time Dashboard',
      desc: 'Instantly view settlement queues, pending customer KYC states, and live success logs.',
      icon: Activity,
      color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20'
    },
    {
      title: 'Smart Analytics',
      desc: 'Predict payment route failure peaks and dynamically balance traffic across core nodes.',
      icon: Cpu,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Secure Infrastructure',
      desc: 'Fully sandboxed environment backed by AES-256 state machines and end-to-end tokenization.',
      icon: Lock,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Webhook Support',
      desc: 'Receive transaction status callbacks in under 150ms with auto-retry and signature validation.',
      icon: Webhook,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Developer Friendly',
      desc: 'Quickstart SDKs for JS/TS, Python, Go, and Ruby. Build checkout workflows in minutes.',
      icon: Code2,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20'
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#050505] border-b border-white/5">
      {/* Background neon orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FF5722]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00E5FF]">
            <Cpu className="w-3 h-3 text-[#00E5FF]" /> Core Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Technology That Powers <br/>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Your Business</span>
          </h2>
          <p className="text-[#9CA3AF] text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            OnePG integrates seamlessly with your existing technical frameworks, providing developers with the tools to construct high-volume checkout platforms.
          </p>
        </div>

        {/* Dynamic Grid with Center Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column (3 items) */}
          <div className="lg:col-span-4 space-y-8">
            {techFeatures.slice(0, 3).map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div 
                  key={feat.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 transition-all group-hover:scale-110 ${feat.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column: Glowing chip image */}
          <div className="lg:col-span-4 flex justify-center items-center py-8 lg:py-0 relative">
            <div className="absolute inset-0 bg-[#00E5FF]/5 rounded-full blur-[80px] pointer-events-none scale-75 animate-pulse" />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src={technologyImg} 
              alt="OnePG Technology Core" 
              className="w-full max-w-[320px] aspect-square object-contain filter drop-shadow-[0_0_20px_rgba(255,87,34,0.15)] transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Column (3 items) */}
          <div className="lg:col-span-4 space-y-8">
            {techFeatures.slice(3, 6).map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div 
                  key={feat.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 transition-all group-hover:scale-110 ${feat.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
