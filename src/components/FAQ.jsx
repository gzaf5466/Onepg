import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: "How does OnePG routing improve success rates?",
    a: "Our routing engine dynamically evaluates gateway performance in real time (latency, API success rate, bank uptime) and instantly transfers the transaction to the highest-performing provider."
  },
  {
    q: "What types of payouts can I process?",
    a: "You can process instant payouts to bank accounts, UPI IDs, cards, and wallets. Perfect for processing vendor payments, instant customer refunds, employee salaries, and partner splits."
  },
  {
    q: "What verification services are supported?",
    a: "We support instant Aadhaar, PAN, GSTIN, and bank account verification. All verification services are secure, instant, and fully compliant with regulatory standards."
  },
  {
    q: "Is developer integration complicated?",
    a: "Not at all. Our SDKs and APIs are built for developer speed. You can easily integrate checkout flows, custom routing, and webhook listeners in under an hour."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 relative z-10 bg-[#050505] border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row gap-16">
        
        {/* Left column */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/5 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-6">
            Common Inquiries
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight leading-tight"
          >
            Frequently <br/> Asked <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Questions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[#9CA3AF] font-light max-w-md"
          >
            Everything you need to know about our unified, high-performance payments and payouts infrastructure.
          </motion.p>
        </div>

        {/* Right column */}
        <div className="flex-[1.5] space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-b border-white/5"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-base sm:text-lg md:text-xl font-bold transition-colors ${openIndex === idx ? 'text-[#00E5FF]' : 'text-white group-hover:text-[#FF5722]'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${openIndex === idx ? 'border-[#00E5FF] bg-[#00E5FF]/10' : 'border-white/10 group-hover:border-[#FF5722]'}`}>
                  <Plus className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-[#00E5FF]' : 'text-gray-400 group-hover:text-[#FF5722]'}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[#88929b] text-sm sm:text-base leading-relaxed font-light pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
