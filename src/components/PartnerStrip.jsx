import React from 'react';

const partners = [
  { name: 'HDFC BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/hdfc/symbol.svg?v=1', font: "font-serif tracking-tight text-[#e0e0e0]" },
  { name: 'ICICI Bank', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/icic/symbol.svg?v=1', font: "font-sans font-black tracking-tighter text-[#ffffff]" },
  { name: 'AXIS BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/utib/symbol.svg?v=1', font: "font-sans font-bold tracking-widest text-[#ff4081]" },
  { name: 'SBI', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/sbin/symbol.svg?v=1', font: "font-sans font-bold tracking-wider text-[#00b0ff]" },
  { name: 'YES BANK', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/yesb/symbol.svg?v=1', font: "font-sans font-black tracking-normal text-[#4fc3f7]" },
  { name: 'Kotak', src: 'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks@main/assets/logos/kkbk/symbol.svg?v=1', font: "font-sans font-bold tracking-tight text-[#ff5252]" },
];

const PartnerStrip = () => {
  return (
    <section className="pt-2 pb-6 lg:pb-12 relative z-10 bg-brand-black flex flex-col gap-4 lg:gap-6 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-4 text-center lg:text-left">
        <div className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-widest">
          Trusted by 5000+ Businesses Worldwide
        </div>
      </div>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden items-center">
        {/* Gradients */}
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-brand-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-brand-black to-transparent z-10" />

        {/* Seamless Single-Track Repeated Marquee (CSS Animation) */}
        <div className="animate-marquee flex gap-20 items-center whitespace-nowrap px-10">
          {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="flex items-center gap-3 cursor-pointer select-none opacity-85 hover:opacity-100 transition-opacity duration-300">
              <img 
                src={partner.src} 
                alt={partner.name} 
                width="32"
                height="32"
                className="h-8 w-8 object-contain" 
              />
              <span className={`text-2xl ${partner.font}`}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerStrip;
