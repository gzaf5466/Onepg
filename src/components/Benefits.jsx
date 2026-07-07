import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, CreditCard, Settings, BarChart3, ArrowUpRight, Search, Bell } from 'lucide-react';

export default function Benefits() {
  return (
    <section className="py-32 relative z-10 bg-[#F9FAFB] overflow-hidden border-b border-gray-100">
      {/* Background ambient blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row-reverse items-center gap-20">
        
        {/* Ultra-Refined CSS/React Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full relative"
        >
          <div className="relative w-full aspect-[4/3] rounded-[2rem] bg-white border border-brand-navy/10 shadow-[0_20px_60px_-15px_rgba(15,31,82,0.1)] overflow-hidden flex transform hover:scale-[1.02] transition-transform duration-700">
            
            {/* Sidebar */}
            <div className="w-16 md:w-56 bg-brand-surface/50 border-r border-gray-100 flex flex-col p-4 shrink-0">
              <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-brand-teal rounded-lg shadow-sm shrink-0" />
                <div className="hidden md:block h-4 w-24 bg-brand-navy rounded-sm" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-brand-teal bg-white shadow-sm border border-brand-teal/10 p-2.5 rounded-xl">
                  <LayoutDashboard className="w-5 h-5 shrink-0" />
                  <div className="hidden md:block h-3 w-20 bg-brand-teal/40 rounded" />
                </div>
                <div className="flex items-center gap-3 text-gray-400 p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                  <BarChart3 className="w-5 h-5 shrink-0" />
                  <div className="hidden md:block h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-3 text-gray-400 p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                  <CreditCard className="w-5 h-5 shrink-0" />
                  <div className="hidden md:block h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-3 text-gray-400 p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                  <Users className="w-5 h-5 shrink-0" />
                  <div className="hidden md:block h-3 w-14 bg-gray-200 rounded" />
                </div>
              </div>
              
              <div className="mt-auto flex items-center gap-3 text-gray-400 p-2.5">
                <Settings className="w-5 h-5 shrink-0" />
                <div className="hidden md:block h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-[#FDFDFD]">
              {/* Header */}
              <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Search className="w-4 h-4 text-gray-400" />
                  <div className="h-2 w-24 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5 text-gray-300" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-teal to-brand-orange shadow-sm" />
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="p-6 flex flex-col gap-6 h-full overflow-hidden">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 shrink-0">
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="h-3 w-20 bg-gray-300 rounded mb-3" />
                    <div className="flex items-end gap-3">
                      <div className="h-8 w-32 bg-brand-navy rounded" />
                      <div className="flex items-center text-green-500 bg-green-50 px-2 py-0.5 rounded-md gap-1 mb-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span className="text-[10px] font-bold">+12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="h-3 w-24 bg-gray-300 rounded mb-3" />
                    <div className="flex items-end gap-3">
                      <div className="h-8 w-24 bg-brand-navy rounded" />
                      <div className="flex items-center text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md gap-1 mb-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span className="text-[10px] font-bold">+4%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Chart Area */}
                <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col overflow-hidden relative">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-3 w-32 bg-gray-300 rounded" />
                    <div className="flex gap-2">
                      <div className="h-2 w-8 bg-brand-teal rounded-full" />
                      <div className="h-2 w-8 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-between gap-1.5 md:gap-3 px-2 mt-auto">
                    {[30, 45, 35, 60, 50, 75, 65, 90, 85, 100].map((height, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                        className="w-full bg-brand-teal/20 rounded-t-sm relative group cursor-pointer hover:bg-brand-teal transition-colors"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-brand-navy text-white text-[10px] py-1 px-2 rounded transition-opacity shadow-lg">
                          ₹{(height * 1.5).toFixed(1)}k
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Faux graph line overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                      d="M 0 150 Q 50 120 100 140 T 200 100 T 300 110 T 400 50" 
                      fill="none" 
                      stroke="#EA602A" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_5px_5px_rgba(234,96,42,0.3)]"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Floating Routing Node Graphic */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="hidden md:flex absolute -bottom-10 -left-10 w-56 h-56 rounded-3xl bg-brand-navy shadow-[0_20px_50px_rgba(15,31,82,0.3)] border-4 border-white items-center justify-center overflow-hidden"
          >
            {/* Background grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.05 }} />
            
            <div className="relative w-full h-full">
              {/* Nodes */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-xl shadow-[0_0_15px_white] z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-brand-navy rounded-full" />
              </div>
              <div className="absolute bottom-16 left-10 w-5 h-5 bg-brand-teal rounded-xl shadow-[0_0_15px_#4C9196] z-10" />
              <div className="absolute bottom-12 right-10 w-5 h-5 bg-brand-orange rounded-xl shadow-[0_0_15px_#EA602A] z-10" />
              
              {/* Animated Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.line x1="50%" y1="25%" x2="25%" y2="65%" stroke="#4C9196" strokeWidth="3" strokeDasharray="6 6" 
                  animate={{ strokeDashoffset: [0, 30] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                <motion.line x1="50%" y1="25%" x2="75%" y2="70%" stroke="#EA602A" strokeWidth="3" strokeDasharray="6 6" 
                  animate={{ strokeDashoffset: [0, -30] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                
                {/* Data packets traveling */}
                <motion.circle cx="50%" cy="25%" r="3" fill="#FFF"
                  animate={{ cx: ["50%", "25%"], cy: ["25%", "65%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                <motion.circle cx="50%" cy="25%" r="3" fill="#FFF"
                  animate={{ cx: ["50%", "75%"], cy: ["25%", "70%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.75, ease: "linear" }} />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 lg:pr-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-brand-teal text-sm font-bold mb-6">
            Intelligent Infrastructure
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black mb-6 tracking-tight leading-[1.1] text-brand-navy">
            Engineered for <br/>
            <span className="text-brand-teal">Every Business</span>
          </h2>
          <p className="text-xl text-brand-dark/70 mb-10 font-light leading-relaxed">
            OnePG Router gives you higher success rates, instant money movement, and secure, automated verification in one unified platform.
          </p>
          
          <ul className="space-y-10">
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(234,96,42,0.3)] group-hover:-translate-y-1">
                <span className="text-brand-orange font-black text-2xl group-hover:text-white transition-colors">1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">E-Commerce Platforms</h4>
                <p className="text-brand-dark/60 text-[15px] leading-relaxed">Eliminate cart abandonment caused by gateway downtimes with active routing failovers. Maximize your authorization rates seamlessly.</p>
              </div>
            </li>
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0 group-hover:bg-brand-teal transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(76,145,150,0.3)] group-hover:-translate-y-1">
                <span className="text-brand-teal font-black text-2xl group-hover:text-white transition-colors">2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">SaaS & Subscriptions</h4>
                <p className="text-brand-dark/60 text-[15px] leading-relaxed">Automate recurring payments with intelligent retry logic and real-time ledger updates. Keep your churn rate absolutely minimal.</p>
              </div>
            </li>
            <li className="flex gap-6 items-start group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 border border-brand-navy/10 flex items-center justify-center shrink-0 group-hover:bg-brand-navy transition-all duration-300 group-hover:shadow-[0_10px_20px_rgba(15,31,82,0.3)] group-hover:-translate-y-1">
                <span className="text-brand-navy font-black text-2xl group-hover:text-white transition-colors">3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-navy transition-colors">Marketplaces</h4>
                <p className="text-brand-dark/60 text-[15px] leading-relaxed">Handle complex multi-party settlements and execute instant vendor payouts programmatically without manual reconciliation.</p>
              </div>
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
