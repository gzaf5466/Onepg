import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: "How does OnePG routing improve success rates?",
    a: "Our engine evaluates gateway performance in real time (latency, downtime, success rates) and instantly shifts transactions to the highest-performing gateway."
  },
  {
    q: "What types of payouts can I send?",
    a: "Send instant payouts to bank accounts, UPI IDs, cards, and wallets. Perfect for vendor payments, refunds, salaries, and partner commissions."
  },
  {
    q: "What documents can be verified?",
    a: "We support Aadhaar, PAN, GSTIN, and bank account verification. Everything is instant, secure, and compliant with regulatory standards."
  },
  {
    q: "Is integration complicated?",
    a: "Not at all. Our SDKs and APIs are built for developer experience first. Most integrations take less than an hour with our low-code components."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 relative z-10 bg-[#F9FAFB] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col lg:flex-row gap-16">
        
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-brand-navy"
          >
            Frequently <br/> Asked <span className="text-brand-orange">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-dark/70 font-light max-w-md"
          >
            Everything you need to know about our unified payments infrastructure.
          </motion.p>
        </div>

        <div className="flex-[1.5] space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-b border-gray-200"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === idx ? 'text-brand-teal' : 'text-brand-navy group-hover:text-brand-orange'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openIndex === idx ? 'border-brand-teal bg-brand-teal/10' : 'border-gray-200 group-hover:border-brand-orange'}`}>
                  <Plus className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-brand-teal' : 'text-gray-400 group-hover:text-brand-orange'}`} />
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
                    <p className="pb-8 text-brand-dark/70 leading-relaxed font-light pr-12">
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
