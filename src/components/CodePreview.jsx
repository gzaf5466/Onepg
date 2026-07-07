import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

export default function CodePreview() {
  return (
    <section className="py-32 relative overflow-hidden z-10 bg-[#F9FAFB] border-b border-gray-100">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col xl:flex-row items-center gap-16 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-navy/10 text-xs font-mono text-brand-navy mb-6 shadow-sm">
            <Terminal className="w-3 h-3 text-brand-orange" /> API Reference v2.0
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy leading-[1.1] mb-6">
            Light SDKs, <br/>
            <span className="text-brand-teal">Flexible APIs</span>
          </h2>
          <p className="text-xl text-brand-dark/70 mb-10 leading-relaxed font-light">
            Integrate payments effortlessly with our lightweight SDKs and simple, flexible APIs. Empowering developers to build scalable systems.
          </p>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-brand-navy font-medium">
              <CheckCircle2 className="w-5 h-5 text-brand-teal" />
              Typed SDKs for TS, Python, Go, and Java
            </div>
            <div className="flex items-center gap-4 text-brand-navy font-medium">
              <CheckCircle2 className="w-5 h-5 text-brand-teal" />
              Idempotency keys out-of-the-box
            </div>
            <div className="flex items-center gap-4 text-brand-navy font-medium">
              <CheckCircle2 className="w-5 h-5 text-brand-teal" />
              Zero-downtime migrations
            </div>
          </div>
          
          <button className="px-8 py-4 bg-brand-navy text-white font-semibold rounded-full hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg">
            View Documentation
          </button>
        </motion.div>

        {/* Code Editor Window (Stays dark as IDEs are generally dark, but wrapped in a light container) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-[600px] rounded-2xl overflow-hidden bg-white p-2 shadow-2xl border border-brand-navy/10"
        >
          <div className="bg-[#1E1E1E] rounded-[1.2rem] overflow-hidden shadow-inner">
            {/* Editor Header */}
            <div className="px-4 py-3 flex items-center gap-2 bg-[#2D2D2D] border-b border-[#3D3D3D]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-4 text-[11px] font-mono text-gray-400 tracking-wider">create_payment.ts</span>
            </div>
            
            {/* Code Area */}
            <div className="p-8 overflow-x-auto text-sm font-mono leading-[1.7]">
              <pre>
                <code>
                  <span className="text-[#C586C0]">import</span> {'{'} <span className="text-[#4EC9B0]">OnePG</span> {'}'} <span className="text-[#C586C0]">from</span> <span className="text-[#CE9178]">'@onepg/sdk'</span>;<br/><br/>
                  <span className="text-[#569CD6]">const</span> <span className="text-[#9CDCFE]">onepg</span> = <span className="text-[#569CD6]">new</span> <span className="text-[#4EC9B0]">OnePG</span>(<span className="text-[#CE9178]">'sk_live_12345'</span>);<br/><br/>
                  <span className="text-[#569CD6]">const</span> <span className="text-[#9CDCFE]">payment</span> = <span className="text-[#C586C0]">await</span> <span className="text-[#9CDCFE]">onepg</span>.<span className="text-[#9CDCFE]">payments</span>.<span className="text-[#DCDCAA]">create</span>({'{'}<br/>
                  {'  '}<span className="text-[#9CDCFE]">amount</span>: <span className="text-[#B5CEA8]">5000</span>,<br/>
                  {'  '}<span className="text-[#9CDCFE]">currency</span>: <span className="text-[#CE9178]">'INR'</span>,<br/>
                  {'  '}<span className="text-[#9CDCFE]">routing</span>: {'{'}<br/>
                  {'    '}<span className="text-[#9CDCFE]">strategy</span>: <span className="text-[#CE9178]">'cost_optimized'</span>,<br/>
                  {'    '}<span className="text-[#9CDCFE]">fallback</span>: <span className="text-[#569CD6]">true</span><br/>
                  {'  }'},<br/>
                  {'  '}<span className="text-[#9CDCFE]">customer</span>: {'{'}<br/>
                  {'    '}<span className="text-[#9CDCFE]">email</span>: <span className="text-[#CE9178]">'user@example.com'</span>,<br/>
                  {'    '}<span className="text-[#9CDCFE]">contact</span>: <span className="text-[#CE9178]">'+919876543210'</span><br/>
                  {'  }'}<br/>
                  {'}'});<br/><br/>
                  <span className="text-[#4FC1FF]">console</span>.<span className="text-[#DCDCAA]">log</span>(<span className="text-[#CE9178]">'Payment initialized:'</span>, <span className="text-[#9CDCFE]">payment.id</span>);
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
