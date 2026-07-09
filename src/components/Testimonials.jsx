import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO @ PayFlow",
    content: "The smart routing engine reduced our transaction drop-offs by 40%. The API was incredibly straightforward to integrate with our multi-platform apps.",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Priya Desai",
    role: "VP Operations @ ShopStore",
    content: "OnePG's vendor settlement system is a game-changer. We disburse thousands of partner splits daily with total accuracy and real-time dashboard control.",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Amit Patel",
    role: "Director @ SaaSFlow",
    content: "Instant Aadhaar and PAN verification saved us hundreds of hours onboarding new clients. The platform is secure, reliable, and compliant.",
    avatar: "https://i.pravatar.cc/150?u=amit"
  }
];

export default function Testimonials() {
  return (
    <section id="resources" className="py-20 md:py-28 relative z-10 bg-[#050505] border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-6">
            Social Proof
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Trusted by <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Industry Leaders</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto font-light">
            Don't just take our word for it. Read what engineering and operations leaders have to say.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.08] hover:border-white/[0.15] rounded-[2rem] p-8 flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-[#88929b] text-base sm:text-lg leading-relaxed mb-8 font-light italic">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#00E5FF]/20" />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs font-bold text-[#00E5FF]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
