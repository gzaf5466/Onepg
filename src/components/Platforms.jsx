import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Wifi, Battery, Signal, CreditCard } from 'lucide-react';

export default function Platforms() {
  return (
    <section className="py-32 relative z-10 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-sm font-bold mb-6">
            Omnichannel Ready
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black mb-6 tracking-tight text-brand-navy">
            Deploy <span className="text-brand-teal">Everywhere</span>
          </h2>
          <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto font-light leading-relaxed">
            Works natively across iOS, Android, and Web. Supports PHP, Java, React Native, C++, and Python for seamless integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Card 1 - Advanced CSS Cross-Platform Sync Representation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] p-2 flex flex-col overflow-hidden bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(15,31,82,0.05)]"
          >
            <div className="bg-brand-surface rounded-[2rem] h-full overflow-hidden flex flex-col relative">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-teal/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="p-10 pb-0 z-10">
                <h3 className="text-3xl font-bold mb-4 text-brand-navy">Cross-Platform Sync</h3>
                <p className="text-brand-dark/60 text-base leading-relaxed max-w-sm">
                  A single API that adapts to the platform it's called from. Unified checkout experiences with zero layout shifts and instant state syncing.
                </p>
              </div>
              
              <div className="w-full flex-grow relative min-h-[350px] flex items-center justify-center p-6 mt-4 perspective-[1000px]">
                
                {/* CSS Web Browser Mockup */}
                <motion.div 
                  initial={{ rotateY: -10, x: -30, opacity: 0 }}
                  whileInView={{ rotateY: 0, x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-[75%] h-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden relative z-10 transform-style-3d"
                >
                  <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    <div className="ml-4 h-4 w-48 bg-white border border-gray-200 rounded-md shadow-inner" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 bg-gray-200 rounded" />
                        <div className="h-3 w-1/2 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="h-20 w-full bg-brand-teal/5 border border-brand-teal/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiM0QzkxOTYiIGZpbGwtb3BhY2l0eT0iLjIiLz48L3N2Zz4=')] opacity-50" />
                      <div className="h-8 w-40 bg-brand-teal rounded-md shadow-[0_4px_10px_rgba(76,145,150,0.3)] flex items-center justify-center">
                        <div className="h-2 w-16 bg-white/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CSS Mobile Phone Mockup */}
                <motion.div 
                  initial={{ rotateY: 10, x: 30, opacity: 0 }}
                  whileInView={{ rotateY: 0, x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="absolute right-[5%] bottom-6 w-32 h-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] border-brand-navy overflow-hidden z-20 flex flex-col"
                >
                  {/* iPhone Notch Area */}
                  <div className="absolute top-0 w-full h-6 flex justify-center z-30">
                    <div className="w-14 h-4 bg-brand-navy rounded-b-xl" />
                  </div>
                  
                  {/* Status Bar */}
                  <div className="h-6 w-full flex justify-between items-center px-3 pt-1">
                    <div className="text-[7px] font-bold text-gray-800">9:41</div>
                    <div className="flex gap-1 items-center text-gray-800">
                      <Signal className="w-2 h-2" />
                      <Wifi className="w-2 h-2" />
                      <Battery className="w-2 h-2" />
                    </div>
                  </div>

                  {/* Phone Content */}
                  <div className="flex-1 bg-gray-50 px-3 pb-3 pt-2 flex flex-col gap-3">
                    <div className="h-8 w-full bg-brand-navy rounded-lg shadow-sm flex items-center justify-center">
                      <div className="h-2 w-12 bg-white/30 rounded-full" />
                    </div>
                    <div className="h-16 w-full bg-white border border-gray-200 rounded-lg shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1 h-full bg-brand-orange" />
                    </div>
                    <div className="mt-auto h-10 w-full bg-brand-orange rounded-lg shadow-[0_4px_10px_rgba(234,96,42,0.3)] flex items-center justify-center">
                       <div className="h-2 w-16 bg-white/50 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 w-full flex justify-center">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                  </div>
                </motion.div>

                {/* Syncing Element */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-[0_0_20px_rgba(234,96,42,0.2)] border border-brand-orange/20 flex items-center justify-center z-30 text-brand-orange backdrop-blur-sm"
                >
                  <RefreshCcw className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - 30% Dark element to balance the 60% white section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_20px_60px_-15px_rgba(15,31,82,0.3)] transform hover:-translate-y-2 transition-transform duration-500"
          >
             <div className="bg-brand-navy h-full p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/20 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-xs font-bold mb-6 backdrop-blur-md">
                    Native Overlays
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Frictionless Flow</h3>
                  <p className="text-white/70 text-base leading-relaxed max-w-sm">
                    Native UI overlays mean customers never leave your application. Higher trust equals higher conversions and zero drop-offs.
                  </p>
                </div>
                
                {/* Refined Mock UI Checkout Card */}
                <div className="relative z-10 w-full rounded-2xl bg-white p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-brand-navy">Total to Pay</span>
                        <span className="text-xs text-gray-400">Transaction ID: #10092</span>
                      </div>
                      <span className="text-3xl font-black text-brand-orange">₹5,000</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="h-14 w-full border border-gray-200 rounded-xl flex items-center px-4 gap-4 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                           <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-brand-navy text-sm">UPI / QR Code</span>
                          <span className="text-[11px] text-gray-400">GPay, PhonePe, Paytm</span>
                        </div>
                      </div>
                      
                      <div className="h-14 w-full border-2 border-brand-teal rounded-xl flex items-center px-4 gap-4 bg-brand-teal/5 cursor-pointer relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-teal" />
                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-brand-teal/20">
                          <CreditCard className="w-4 h-4 text-brand-teal" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-navy text-sm">Cards (Credit/Debit)</span>
                          <span className="text-[11px] text-brand-teal font-medium">Visa, Mastercard, RuPay</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-4 bg-brand-teal text-white font-bold rounded-xl hover:bg-[#3d7a7e] transition-colors shadow-[0_8px_20px_rgba(76,145,150,0.3)] flex justify-center items-center gap-2">
                      Pay Securely <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </button>
                </div>
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
