import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

export default function Payouts() {
  return (
    <section id="payouts" className="py-20 md:py-28 relative z-10 bg-[#050505] overflow-hidden border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#FF5722]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row items-center gap-20">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/5 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-6">
            Disbursals Stack
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
            Limitless <br/>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Payouts Architecture</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed mb-10 font-light">
            Add multiple funding sources and disburse payments programmatically to vendors, partners, and customers instantly via UPI, IMPS, and NEFT with automated ledger settlements.
          </p>
          
          <button className="px-8 py-3.5 bg-transparent border border-white/10 text-white font-medium rounded-md hover:bg-white/5 transition-all flex items-center gap-2">
            Explore Payouts API <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
          </button>
        </motion.div>

        {/* Visual Graphic Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 relative flex justify-center items-center h-[350px] md:h-[500px] w-full"
        >
          <div className="absolute transform scale-[0.7] sm:scale-90 md:scale-100 flex items-center justify-center w-full h-full">
            {/* Core */}
            <div className="absolute z-20 w-32 h-32 rounded-full bg-[#0b1014] border border-white/10 flex items-center justify-center shadow-[0_10px_40px_rgba(255,87,34,0.15)]">
              <span className="font-black text-2xl tracking-tighter text-white">OnePG</span>
            </div>

            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full border border-[#00E5FF] border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute w-[450px] h-[450px] rounded-full border border-[#FF5722] border-dashed"
              />
            </div>

            {/* Orbital Nodes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="w-full h-full max-w-[450px] absolute z-10 flex items-center justify-center"
            >
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="absolute w-12 h-12 bg-[#0b1014] rounded-full border border-white/10 flex items-center justify-center shadow-lg"
                  style={{
                    transform: `rotate(${i * 120}deg) translateY(-225px) rotate(-${i * 120}deg)`
                  }}
                >
                  <div className="w-4 h-4 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
