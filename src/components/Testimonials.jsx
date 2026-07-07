import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO @ FinTech Startup",
    content: "The smart routing engine reduced our payment failures by 40%. The API was incredibly easy to integrate with our existing infrastructure.",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Priya Desai",
    role: "VP Operations @ E-Commerce",
    content: "OnePG's payout system is a game-changer. We process thousands of vendor settlements daily, and the dashboard gives us total control.",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Amit Patel",
    role: "Director @ SaaS Corp",
    content: "The instant KYC and document verification saved us hundreds of hours in manual onboarding. Reliable, fast, and compliant.",
    avatar: "https://i.pravatar.cc/150?u=amit"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative z-10 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-brand-navy">
            Trusted by the <span className="text-brand-orange">Industry Leaders</span>
          </h2>
          <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto font-light">
            Don't just take our word for it. See what top engineers and operators have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card rounded-[2rem] p-8 flex flex-col justify-between"
            >
              <p className="text-brand-dark/80 text-lg leading-relaxed mb-10 font-medium">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-teal/20" />
                <div>
                  <h4 className="font-bold text-brand-navy text-sm">{t.name}</h4>
                  <p className="text-xs font-bold text-brand-teal">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
