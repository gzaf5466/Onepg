import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gauge, Shield, Code2, Headphones, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Gauge className="w-5 h-5 text-[#FF5722]" />,
    title: 'Lightning Fast',
    desc: 'Experience superfast payment processing with industry-leading success rates.',
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)'
  },
  {
    icon: <Shield className="w-5 h-5 text-[#00E5FF]" />,
    title: 'Bank-Grade Security',
    desc: 'PCI DSS compliant with end-to-end encryption to keep your data and transactions safe.',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)'
  },
  {
    icon: <Code2 className="w-5 h-5 text-[#FF5722]" />,
    title: 'Developer Friendly',
    desc: 'Easy integration with robust APIs, detailed documentation and developer support.',
    color: '#FF5722',
    glowColor: 'rgba(255, 87, 34, 0.15)'
  },
  {
    icon: <Headphones className="w-5 h-5 text-[#00E5FF]" />,
    title: '24/7 Support',
    desc: 'Our dedicated support team is available round the clock to assist you.',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.15)'
  }
];

export default function CTA() {
  return (
    <section className="py-12 md:py-20 lg:py-24 relative z-10 bg-brand-black border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-brand-orange/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Why Choose OnePG Header */}
        <div className="mb-12 text-left">
          <div className="text-[#00E5FF] text-xs font-bold uppercase tracking-[0.25em] mb-4 opacity-80">
            Why Choose OnePG?
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-white tracking-[-0.03em] leading-tight">
            Built for Performance. <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#88929b]">Backed by Trust.</span>
          </h2>
        </div>

        {/* 4 Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-16 lg:mb-20">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="flex items-start gap-4 p-2 rounded-xl group transition-all duration-300"
            >
              {/* Icon container with theme colors */}
              <div 
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{
                  borderColor: `${feat.color}25`,
                  backgroundColor: `${feat.color}08`,
                  boxShadow: `0 0 15px ${feat.glowColor}`,
                }}
              >
                <div className="scale-95 transition-transform duration-300 group-hover:rotate-[-5deg]">
                  {feat.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold tracking-tight mb-1.5 transition-colors duration-300 group-hover:text-[#00E5FF]">
                  {feat.title}
                </span>
                <p className="text-[#9CA3AF] text-xs font-normal leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl border border-white/5 bg-[#0b0f13]/25 backdrop-blur-md p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden group"
        >
          {/* Wave visual overlay */}
          <svg className="absolute bottom-0 right-0 w-full lg:w-2/3 h-full opacity-35 pointer-events-none z-0" viewBox="0 0 600 200" fill="none" preserveAspectRatio="none">
            <path d="M0,150 C150,180 250,50 400,100 C500,140 550,80 600,120 L600,200 L0,200 Z" fill="url(#waveGradOrange)" opacity="0.12" />
            <path d="M0,160 C120,120 220,180 350,110 C480,40 520,140 600,90 L600,200 L0,200 Z" fill="url(#waveGradCyan)" opacity="0.08" />
            <path d="M0,160 C120,120 220,180 350,110 C480,40 520,140 600,90" stroke="url(#lineGradCyan)" strokeWidth="1" />
            <path d="M0,150 C150,180 250,50 400,100 C500,140 550,80 600,120" stroke="url(#lineGradOrange)" strokeWidth="1" />
            <defs>
              <linearGradient id="waveGradOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5722" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FF5722" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="waveGradCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="lineGradOrange" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#FF5722" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="lineGradCyan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Left part: Dotted Animated Wireframe Globe */}
          <div className="relative z-10 flex items-center justify-center shrink-0 w-24 h-24 md:w-32 md:h-32">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_80s_linear_infinite]">
              <defs>
                <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF5722" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              <circle cx="100" cy="100" r="80" fill="url(#globeGlow)" />
              <circle cx="100" cy="100" r="75" stroke="url(#globeGrad)" strokeWidth="0.8" fill="none" strokeDasharray="3,3" />
              <ellipse cx="100" cy="100" rx="75" ry="25" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" />
              <ellipse cx="100" cy="100" rx="75" ry="50" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" />
              <ellipse cx="100" cy="100" rx="25" ry="75" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" />
              <ellipse cx="100" cy="100" rx="50" ry="75" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" />
              <line x1="25" y1="100" x2="175" y2="100" stroke="url(#globeGrad)" strokeWidth="0.8" />
              <line x1="100" y1="25" x2="100" y2="175" stroke="url(#globeGrad)" strokeWidth="0.8" />

              <circle cx="100" cy="50" r="2" fill="#00E5FF" />
              <circle cx="100" cy="150" r="2" fill="#FF5722" />
              <circle cx="50" cy="100" r="2" fill="#00E5FF" />
              <circle cx="150" cy="100" r="2" fill="#FF5722" />
              <circle cx="135" cy="65" r="2" fill="#00E5FF">
                <animate attributeName="r" values="1.5;3;1.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="65" cy="135" r="2.5" fill="#FF5722">
                <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="135" cy="135" r="2" fill="#00E5FF" />
              <circle cx="65" cy="65" r="2" fill="#FF5722" />
            </svg>
          </div>

          {/* Center part: Text details */}
          <div className="relative z-10 flex-grow text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-light text-white tracking-[-0.02em] leading-tight mb-2">
              Ready to <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Simplify Your Payments?</span>
            </h3>
            <p className="text-[#9CA3AF] text-sm font-normal max-w-xl">
              Join thousands of businesses using OnePG to power their growth.
            </p>
          </div>

          {/* Right part: Orange CTA button */}
          <div className="relative z-10 shrink-0 w-full lg:w-auto">
            <Link to="/login" className="w-full lg:w-auto block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full lg:w-auto px-8 py-3.5 bg-[#FF5722] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#e44d1c] transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,87,34,0.25)] hover:shadow-[0_8px_30px_rgba(255,87,34,0.4)] select-none text-sm"
              >
                Get Started Now <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
