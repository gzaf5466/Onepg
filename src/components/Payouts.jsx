import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const bankNodes = [
  {
    name: "YES Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#002D62" />
        <path d="M14 12L20 28L26 12" stroke="#ED1C24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18H28" stroke="#FFFFFF" strokeWidth="2.5" />
        <text x="20" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">YES BANK</text>
      </svg>
    )
  },
  {
    name: "Union Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#FFFFFF" />
        <path d="M12 12V22C12 26 15 28 20 28C25 28 28 26 28 22V12" stroke="#DA251D" strokeWidth="4" strokeLinecap="round" />
        <path d="M17 12V20C17 22 18 23 20 23C22 23 23 22 23 20V12" stroke="#004A97" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: "South Indian Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#E31837" />
        <path d="M12 24C16 16 24 16 28 24" stroke="#FFD100" strokeWidth="4" strokeLinecap="round" />
        <circle cx="20" cy="14" r="3" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: "Federal Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#003366" />
        <circle cx="20" cy="20" r="10" fill="#FDB913" />
        <path d="M16 16L24 24M24 16L16 24" stroke="#003366" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "RBL Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#003874" />
        <path d="M12 28V12H22C25 12 27 14 27 17C27 20 25 21 22 21H17V28H12Z" fill="#E31B23" />
        <path d="M17 16H21C22 16 23 16.5 23 17.5C23 18.5 22 19 21 19H17V16Z" fill="#FFFFFF" />
        <text x="20" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="bold" fontFamily="sans-serif">RBL BANK</text>
      </svg>
    )
  },
  {
    name: "HDFC Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#004B8D" />
        <rect x="10" y="10" width="20" height="20" fill="#FFFFFF" />
        <rect x="14" y="14" width="12" height="12" fill="#ED232A" />
      </svg>
    )
  },
  {
    name: "ICICI Bank",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#F37021" />
        <path d="M12 10H19V30H12V10ZM21 10H28V30H21V10Z" fill="#052963" />
        <circle cx="15.5" cy="20" r="2" fill="#FFFFFF" />
        <circle cx="24.5" cy="20" r="2" fill="#FFFFFF" />
      </svg>
    )
  }
];

export default function Payouts() {
  return (
    <section id="payouts" className="py-12 md:py-24 relative z-10 bg-[#050505] overflow-hidden border-b border-white/5">
      
      {/* Background PAYOUT Watermark Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.02] tracking-widest pointer-events-none select-none uppercase z-0">
        PAYOUT
      </div>

      {/* Brand Ambient Background Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF5722]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
        
        {/* Left Column Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left space-y-4"
        >
          {/* Sparkle Icon */}
          <div className="flex justify-center lg:justify-start mb-1">
            <Sparkles className="w-7 h-7 text-[#FF5722] fill-[#FF5722]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF] tracking-tight">
            Payout
          </h2>

          <h3 className="text-xl sm:text-2xl font-light text-gray-200">
            Multiple Current Accounts
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light pt-1">
            Add multiple Payout Fund Sources and pay your vendors, partners, employees, or customers into the destination payment mode of their choice.
          </p>
        </motion.div>

        {/* Right Column: Compact Spinning Bank Wheel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative flex justify-center items-center min-h-[360px] sm:min-h-[420px] w-full"
        >
          <div className="relative transform scale-90 sm:scale-95 flex items-center justify-center w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]">
            
            {/* Center Core: Brand Glowing Circle with "onepg" Logo */}
            <div className="absolute z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#2a0e05] via-[#101820] to-[#041217] border-2 border-[#FF5722]/50 flex items-center justify-center shadow-[0_0_50px_rgba(255,87,34,0.35)]">
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white drop-shadow-md">
                onepg
              </span>
            </div>

            {/* Subtle Inner Guide Line */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] rounded-full border border-white/40" />
            </div>

            {/* Orbiting White Circular Bank Nodes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              className="w-full h-full absolute z-10 flex items-center justify-center"
            >
              {bankNodes.map((bank, i) => {
                const angle = (i * 360) / bankNodes.length;
                return (
                  <div 
                    key={bank.name}
                    className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center justify-center p-1.5 border border-gray-100 hover:scale-115 transition-transform cursor-pointer"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-135px) sm:translateY(-155px) rotate(-${angle}deg)`
                    }}
                    title={bank.name}
                  >
                    {bank.icon}
                  </div>
                );
              })}
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
