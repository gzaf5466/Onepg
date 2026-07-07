import React from 'react';
import { motion } from 'framer-motion';

export default function Payouts() {
  return (
    <section className="py-32 relative z-10 bg-white overflow-hidden border-b border-gray-100">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row items-center gap-20">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-brand-navy">
            Limitless <br/>
            <span className="text-brand-orange">Payouts Architecture</span>
          </h2>
          <p className="text-xl text-brand-dark/70 leading-relaxed mb-10 font-light">
            Add multiple funding sources and disburse payments to vendors, partners, and customers instantly into their destination mode of choice.
          </p>
          <button className="px-8 py-4 bg-brand-navy text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 hover:scale-105 transition-all">
            Explore Payouts API
          </button>
        </motion.div>

        {/* 3D Orbital Graphic (Light Mode version) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 relative flex justify-center items-center h-[350px] md:h-[500px] overflow-hidden md:overflow-visible w-full"
        >
          <div className="absolute transform scale-[0.7] sm:scale-90 md:scale-100 flex items-center justify-center w-full h-full">
            {/* Core */}
            <div className="absolute z-20 w-32 h-32 rounded-full bg-white border border-brand-navy/10 flex items-center justify-center shadow-[0_10px_40px_rgba(234,96,42,0.15)]">
              <span className="font-black text-2xl tracking-tighter text-brand-navy">OnePG</span>
            </div>

            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full border border-brand-teal border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute w-[450px] h-[450px] rounded-full border border-brand-orange border-dashed"
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
                  className="absolute w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-lg"
                  style={{
                    transform: `rotate(${i * 120}deg) translateY(-225px) rotate(-${i * 120}deg)`
                  }}
                >
                  <div className="w-4 h-4 bg-brand-teal rounded-full animate-pulse shadow-[0_0_10px_rgba(76,145,150,0.5)]" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
