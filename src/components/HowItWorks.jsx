import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, CreditCard, BarChart3 } from 'lucide-react';

import howItWorksDesktop from '../assets/how-it-works-desktop.avif';
import howItWorksTablet from '../assets/how-it-works-tablet.avif';
import howItWorksMobile from '../assets/how-it-works-mobile.avif';

const steps = [
  {
    num: '1',
    title: 'Sign Up',
    desc: 'Create your account in minutes.',
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)',
    icon: <User className="w-4 h-4 text-[#FF5722]" />,
  },
  {
    num: '2',
    title: 'Integrate',
    desc: 'Integrate our APIs or use no-code solutions.',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)',
    icon: <Code className="w-4 h-4 text-[#00E5FF]" />,
  },
  {
    num: '3',
    title: 'Start Accepting',
    desc: 'Start accepting payments instantly.',
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)',
    icon: <CreditCard className="w-4 h-4 text-[#FF5722]" />,
  },
  {
    num: '4',
    title: 'Grow & Manage',
    desc: 'Track, manage & grow your business with OnePG.',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)',
    icon: <BarChart3 className="w-4 h-4 text-[#00E5FF]" />,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Background Scroll Lock
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section 
      className="py-12 md:py-20 lg:py-24 relative bg-brand-black border-b border-white/5"
      style={{ zIndex: isModalOpen ? 100 : 10 }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Large Rounded Container Card with gradient blending */}
        <div className="bg-gradient-to-b lg:bg-gradient-to-r from-[#0f1b29] via-[#0b1014] to-[#0e1a24] border border-white/[0.08] shadow-[0_0_40px_rgba(0,229,255,0.05)] rounded-[2.5rem] p-8 lg:py-16 lg:pl-16 lg:pr-0 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          
          {/* Subtle Background Radial Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none z-0" />
          
          {/* Left Side: Timeline Steps */}
          <div className="flex-1 w-full relative z-10 pr-0 lg:pr-16">
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-6 md:mb-20 tracking-[-0.03em] leading-tight">
              Get Started in <br className="hidden lg:block" />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">
                4 Simple Steps
              </span>
            </h2>
            
            {/* Desktop View: Grid Layout (md and up) */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 relative w-full">
              {/* Animated Connecting Line */}
              <div className="absolute top-6 left-12 right-12 h-[1px] bg-gradient-to-r from-[#FF5722]/20 via-[#FF5722]/10 to-[#00E5FF]/20 -z-10" />

              {steps.map((s, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover="hover"
                  className="flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer"
                >
                  {/* Top Step Number Circle with Spring Hover */}
                  <motion.div 
                    variants={{
                      hover: { y: -6, scale: 1.05 }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-12 h-12 rounded-full border flex items-center justify-center text-white text-lg font-bold relative mb-8"
                    style={{
                      borderColor: `${s.color}33`,
                      backgroundColor: `${s.color}08`,
                      boxShadow: `0 0 20px ${s.glowColor}`,
                    }}
                  >
                    {s.num}
                    
                    {/* Ring highlight inside circle */}
                    <div className="absolute inset-[2px] rounded-full border border-white/5 pointer-events-none" />
                  </motion.div>

                  {/* Icon Circle */}
                  <div 
                    className="w-9 h-9 rounded-xl border flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-white/[0.02]"
                    style={{
                      borderColor: `${s.color}26`,
                      backgroundColor: `${s.color}05`,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-white font-bold text-base mb-3 group-hover:text-[#00E5FF] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[#88929b] text-xs leading-relaxed max-w-[160px] mx-auto md:mx-0 font-light">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile View: Sleek Overlay Trigger Button (below md) */}
            <div className="md:hidden w-full mt-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-[#FF5722]/10 to-[#00E5FF]/10 hover:from-[#FF5722]/20 hover:to-[#00E5FF]/20 text-white font-bold py-3.5 sm:py-4.5 px-4 sm:px-6 rounded-2xl transition-all duration-300 border border-white/10 group shadow-[0_0_20px_rgba(0,229,255,0.05)]"
              >
                <span className="flex items-center gap-2.5 shrink-0 whitespace-nowrap text-sm sm:text-base">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] animate-pulse" />
                  Get Started Flow
                </span>
                <span className="text-[#00E5FF] group-hover:translate-x-1 transition-transform flex items-center gap-1.5 text-xs sm:text-sm font-semibold shrink-0 whitespace-nowrap">
                  View Steps 
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Right Side: Responsive Image Placeholder */}
          <div className="flex-grow-0 shrink-0 w-full lg:w-[48%] flex items-center justify-center lg:justify-end relative z-10">
            <picture className="relative w-full max-w-[500px] flex items-center justify-center lg:justify-end">
              <source media="(min-width: 1024px)" srcSet={howItWorksDesktop} width="600" height="600" />
              <source media="(min-width: 768px)" srcSet={howItWorksTablet} width="450" height="450" />
              <img 
                src={howItWorksMobile} 
                alt="How it works mockups" 
                width="350"
                height="350"
                className="w-full h-auto object-contain rounded-r-2xl lg:rounded-r-[2.5rem] lg:ml-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 400' width='100%' height='100%' fill='none'><rect width='500' height='400' rx='24' fill='%2305090c'/><circle cx='250' cy='200' r='120' fill='%2300E5FF' fill-opacity='0.02' filter='blur(40px)'/><rect x='160' y='60' width='180' height='300' rx='28' stroke='%23ffffff' stroke-width='2' stroke-opacity='0.1'/><rect x='170' y='70' width='160' height='280' rx='20' fill='%230b1014'/><path d='M250 82 A 6 6 0 0 1 250 94' stroke='%23ffffff' stroke-width='2' stroke-opacity='0.2' stroke-linecap='round'/><path d='M234 180 C234 140 266 140 266 180' stroke='%2300e5ff' stroke-width='4' stroke-linecap='round'/><circle cx='250' cy='220' r='30' stroke='%23ff5722' stroke-width='3' fill='none'/></svg>";
                }}
              />
            </picture>
          </div>

        </div>

      </div>

      {/* Mobile Drawer/Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-[#05090c] border-t border-white/10 rounded-t-[2.5rem] z-50 md:hidden overflow-y-auto flex flex-col shadow-[0_-10px_45px_rgba(0,0,0,0.8)]"
            >
              {/* Drawer Header (Tapping above sheet, close button, or Got It closes) */}
              <div className="px-6 py-6 flex items-center justify-between border-b border-white/5 select-none shrink-0">
                <div>
                  <div className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Process flow</div>
                  <h3 className="text-white text-xl font-bold">Get Started in 4 Steps</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Accordion Body */}
              <div className="p-6 flex flex-col gap-3.5 overflow-y-auto">
                {steps.map((s, idx) => {
                  const isOpen = activeStep === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-white/5 rounded-2xl overflow-hidden bg-[#070e14]"
                    >
                      {/* Header */}
                      <button
                        onClick={() => setActiveStep(isOpen ? -1 : idx)}
                        className="w-full flex items-center justify-between p-4.5 text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-8 h-8 rounded-full border flex items-center justify-center text-white text-sm font-bold relative"
                            style={{
                              borderColor: `${s.color}33`,
                              backgroundColor: `${s.color}08`,
                            }}
                          >
                            {s.num}
                            <div className="absolute inset-[1px] rounded-full border border-white/5 pointer-events-none" />
                          </div>
                          <span className="text-white font-bold text-base">
                            {s.title}
                          </span>
                        </div>
                        
                        <svg 
                          className={`w-5 h-5 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-white/5 flex gap-4 items-start bg-white/[0.01]">
                              <div 
                                className="w-8.5 h-8.5 rounded-xl border flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  borderColor: `${s.color}26`,
                                  backgroundColor: `${s.color}05`,
                                }}
                              >
                                {s.icon}
                              </div>
                              <p className="text-[#88929b] text-sm leading-relaxed pt-1.5 font-light">
                                {s.desc}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 pt-2 pb-8 border-t border-white/5 bg-brand-black/40 mt-auto shrink-0 select-none">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all duration-300"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
