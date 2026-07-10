import React from 'react';
import { motion } from 'framer-motion';
const partners = [
  { name: 'HDFC BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/hdfc/symbol.svg?v=1', font: "font-serif tracking-tight text-[#004c8f]" },
  { name: 'ICICI Bank', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/icic/symbol.svg?v=1', font: "font-sans font-black tracking-tighter text-[#000000]" },
  { name: 'AXIS BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/utib/symbol.svg?v=1', font: "font-sans font-bold tracking-widest text-[#97144D]" },
  { name: 'SBI', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/sbin/symbol.svg?v=1', font: "font-sans font-bold tracking-wider text-[#006699]" },
  { name: 'YES BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/yesb/symbol.svg?v=1', font: "font-sans font-black tracking-normal text-[#003874]" },
  { name: 'Kotak', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/kkbk/symbol.svg?v=1', font: "font-sans font-bold tracking-tight text-[#ED1C24]" },
];

export default function TrustMarquee() {
  return (
    <section className="py-12 border-y border-brand-navy/5 relative z-10 bg-white flex flex-col items-center gap-8">
      <div className="px-5 py-1.5 bg-brand-light text-[10px] uppercase tracking-[0.2em] text-brand-navy/60 font-bold border border-brand-navy/10 rounded-full shadow-sm z-20">
        Trusted Partners
      </div>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden items-center">
        {/* Gradients */}
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee */}
        <motion.div
          animate={{ x: [0, -800] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer select-none">
              <img src={partner.src} alt={partner.name} width="32" height="32" className="h-8 w-8 object-contain" />
              <span className={`text-2xl ${partner.font}`}>{partner.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
