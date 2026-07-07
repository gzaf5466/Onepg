import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Send, ShieldCheck, BarChart3 } from 'lucide-react';

const pillars = [
  {
    title: 'Accept Payments',
    desc: 'Accept payments via Cards, UPI, Netbanking, and Wallets. Empower your customers with international currencies, multi-token checkouts, and instant refunds.',
    features: ['Cards', 'UPI / QR', 'Netbanking', 'Wallets'],
    icon: <CreditCard className="w-7 h-7 text-[#FF5722]" />,
    color: '#FF5722',
    glow: 'from-[#3a1c0d]/30 to-[#0b1014]',
    borderColor: 'border-[#5a2a18]/40 hover:border-[#FF5722]/30',
    lineColor: 'bg-[#5a2a18]',
    textColor: 'text-[#FF5722]',
    chipBg: 'bg-[#FF5722]/10 text-[#FF5722]'
  },
  {
    title: 'Payout Solutions',
    desc: 'Disburse payments instantly via UPI, IMPS, and NEFT. Automate vendor settlements, partner revenue splits, and salary disbursements with smart routing.',
    features: ['IMPS / NEFT', 'UPI Payouts', 'Vendor Settlements', 'Salary Rails'],
    icon: <Send className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glow: 'from-[#0b2e36]/30 to-[#0b1014]',
    borderColor: 'border-[#13444f]/40 hover:border-[#00E5FF]/30',
    lineColor: 'bg-[#13444f]',
    textColor: 'text-[#00E5FF]',
    chipBg: 'bg-[#00E5FF]/10 text-[#00E5FF]'
  },
  {
    title: 'Secure & Reliable',
    desc: 'Bank-grade security with PCI-DSS compliance, AES-256 data encryption, and advanced fraud shield. Rest easy with guaranteed 99.9% server uptime.',
    features: ['PCI-DSS', 'AES-256', 'Fraud Shield', '99.9% Uptime'],
    icon: <ShieldCheck className="w-7 h-7 text-[#FF5722]" />,
    color: '#FF5722',
    glow: 'from-[#3a1c0d]/30 to-[#0b1014]',
    borderColor: 'border-[#5a2a18]/40 hover:border-[#FF5722]/30',
    lineColor: 'bg-[#5a2a18]',
    textColor: 'text-[#FF5722]',
    chipBg: 'bg-[#FF5722]/10 text-[#FF5722]'
  },
  {
    title: 'Powerful Dashboard',
    desc: 'Real-time transactional insights, custom analytical reports, and tracking tools. Monitor conversion success rates and export data instantly.',
    features: ['Real-time Logs', 'Custom Exports', 'Fee Calculator', 'Auditing'],
    icon: <BarChart3 className="w-7 h-7 text-[#00E5FF]" />,
    color: '#00E5FF',
    glow: 'from-[#0b2e36]/30 to-[#0b1014]',
    borderColor: 'border-[#13444f]/40 hover:border-[#00E5FF]/30',
    lineColor: 'bg-[#13444f]',
    textColor: 'text-[#00E5FF]',
    chipBg: 'bg-[#00E5FF]/10 text-[#00E5FF]'
  }
];

export default function ProductPillars() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Swipe gesture hooks
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);
  const minSwipeDistance = 50;

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pillars.length);
    }, 4500); // 4.5 seconds rotation
    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next slide
      setActiveIndex((prev) => (prev + 1) % pillars.length);
    } else if (isRightSwipe) {
      // Previous slide
      setActiveIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
    }
    setIsPaused(false);
  };

  const activeItem = pillars[activeIndex];

  return (
    <section className="py-12 md:py-20 lg:py-24 relative z-10 bg-brand-black border-b border-white/5 overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Desktop View: Grid Layout (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              className={`relative group overflow-hidden rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.glow} p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 min-h-[440px]`}
            >
              {/* Glow backdrop on card hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at 40px 40px, ${item.color}15 0%, transparent 70%)`
                }}
              />

              {/* Inner Border Ring */}
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div>
                {/* Icon Container */}
                <div 
                  className="w-14 h-14 rounded-2xl border flex items-center justify-center bg-white/[0.02] mb-6 transition-all duration-300"
                  style={{
                    borderColor: `${item.color}33`,
                    backgroundColor: `${item.color}08`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Card Details Content */}
                <h3 className="text-white text-xl font-bold tracking-tight mb-3">
                  {item.title}
                </h3>
                
                <p className="text-[#88929b] text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.features.map((feat, fIdx) => (
                    <span 
                      key={fIdx} 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.chipBg} border border-current/10`}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom line and Link */}
              <div className="flex flex-col gap-4 mt-auto">
                <div className={`w-10 h-[2px] ${item.lineColor}`} />
                
                <a 
                  href="#" 
                  className={`text-sm font-semibold flex items-center gap-1.5 ${item.textColor} group-hover:underline`}
                >
                  Learn More 
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet View: 3D Coverflow Deck (below lg) */}
        <div 
          className="lg:hidden relative w-full flex flex-col items-center touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Coverflow Stack Wrapper */}
          <div 
            className="relative w-full h-[440px] flex items-center justify-center overflow-hidden py-4"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            {pillars.map((item, idx) => {
              // Calculate wrapped offset relative to activeIndex
              let offset = idx - activeIndex;
              if (offset < -1) offset += pillars.length;
              if (offset > 2) offset -= pillars.length;
              
              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let x = 0;
              let scale = 1;
              let rotateY = 0;
              let opacity = 1;
              let zIndex = 10;
              let pointerEvents = "auto";

              if (isActive) {
                x = 0;
                scale = 1;
                rotateY = 0;
                opacity = 1;
                zIndex = 30;
                pointerEvents = "auto";
              } else if (isLeft) {
                x = -135;
                scale = 0.82;
                rotateY = 40;
                opacity = 0.2;
                zIndex = 20;
                pointerEvents = "auto";
              } else if (isRight) {
                x = 135;
                scale = 0.82;
                rotateY = -40;
                opacity = 0.2;
                zIndex = 20;
                pointerEvents = "auto";
              } else {
                // Background card
                x = 0;
                scale = 0.65;
                rotateY = 0;
                opacity = 0;
                zIndex = 10;
                pointerEvents = "none";
              }

              return (
                <motion.div
                  key={idx}
                  animate={{
                    x: x,
                    scale: scale,
                    rotateY: rotateY,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                  }}
                  style={{
                    position: "absolute",
                    width: "82%",
                    maxWidth: "320px",
                    transformStyle: "preserve-3d",
                    pointerEvents: pointerEvents
                  }}
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(idx)}
                >
                  <div 
                    className={`relative group overflow-hidden rounded-3xl border ${item.borderColor} bg-[#080c10] bg-gradient-to-br ${item.glow} p-6 sm:p-8 flex flex-col justify-between min-h-[380px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
                  >
                    {/* Glow backdrop */}
                    <div 
                      className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                      style={{
                        background: `radial-gradient(circle at 45px 45px, ${item.color}18 0%, transparent 75%)`
                      }}
                    />

                    {/* Inner Border Ring */}
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    <div>
                      {/* Icon Container */}
                      <div 
                        className="w-14 h-14 rounded-2xl border flex items-center justify-center bg-white/[0.02] mb-5"
                        style={{
                          borderColor: `${item.color}40`,
                          backgroundColor: `${item.color}0D`,
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Card Details Content */}
                      <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Feature Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.features.map((feat, fIdx) => (
                          <span 
                            key={fIdx} 
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.chipBg} border border-current/10`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom line and Link */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <div className={`w-10 h-[2.5px] ${item.lineColor}`} />
                      
                      <a 
                        href="#" 
                        className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${item.textColor}`}
                      >
                        Learn More 
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-4">
            {pillars.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'bg-[#00E5FF] w-7' 
                    : 'bg-white/20 hover:bg-white/40 w-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
