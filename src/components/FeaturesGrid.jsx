import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Repeat, Code, Link } from 'lucide-react';

const features = [
  {
    icon: <Repeat className="w-6 h-6 text-brand-teal" />,
    title: 'Smart Routing',
    desc: 'Automatically route transactions to the highest-performing gateway in real-time.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    visual: (
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
          <circle cx="50" cy="50" r="40" stroke="#0F1F52" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <circle cx="50" cy="50" r="30" stroke="#EA602A" strokeWidth="3" fill="none" strokeDasharray="10,10" />
        </svg>
      </div>
    )
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />,
    title: 'Secure ID Verification',
    desc: 'Instantly authenticate PAN, Aadhaar, and GSTIN.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-gold" />,
    title: 'Bulk Payouts',
    desc: 'High-volume accuracy with zero manual effort.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Code className="w-6 h-6 text-brand-teal" />,
    title: 'Dev-Friendly API',
    desc: 'Effortless integration across all stacks.',
    span: 'col-span-1 lg:col-span-1',
  },
  {
    icon: <Link className="w-6 h-6 text-brand-orange" />,
    title: 'Webhooks',
    desc: 'Secure delivery with auto-retry logic.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1',
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 relative z-20 bg-[#F9FAFB] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-brand-navy">
            Engineered for Performance
          </h2>
          <p className="text-brand-dark/70 text-lg max-w-2xl">
            We simplify payments with advanced services for collections, payouts, and real-time verification built on a unified core.
          </p>
        </motion.div>

        {/* Bento Box Grid - Light Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between ${f.span}`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-surface border border-brand-navy/5 flex items-center justify-center mb-6 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-navy">{f.title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
              {f.visual && f.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
