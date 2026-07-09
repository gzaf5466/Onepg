import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

export default function CodePreview() {
  return (
    <section id="developers" className="py-20 md:py-28 relative overflow-hidden z-10 bg-[#050505] border-b border-white/5">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex flex-col xl:flex-row items-center gap-16 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white mb-6 shadow-sm">
            <Terminal className="w-3 h-3 text-[#FF5722]" /> API Reference v2.0
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            Light SDKs, <br/>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Flexible APIs</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#9CA3AF] mb-10 leading-relaxed font-light">
            Integrate payments effortlessly with our lightweight SDKs and simple, flexible APIs. Engineered for reliability and built for scaling transaction volumes.
          </p>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <span className="text-sm sm:text-base font-light text-[#88929b]">Typed SDKs for TS, Python, Go, and Java</span>
            </div>
            <div className="flex items-center gap-4 text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <span className="text-sm sm:text-base font-light text-[#88929b]">Idempotency keys out-of-the-box</span>
            </div>
            <div className="flex items-center gap-4 text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <span className="text-sm sm:text-base font-light text-[#88929b]">Zero-downtime migrations</span>
            </div>
          </div>
          
          <button className="px-8 py-3.5 bg-transparent border border-white/10 text-white font-medium rounded-md hover:bg-white/5 transition-all flex items-center gap-2">
            View Documentation
          </button>
        </motion.div>

        {/* Code Editor Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f1b29]/50 via-[#0b1014]/80 to-[#0e1a24]/50 p-2 border border-white/[0.08] shadow-[0_0_50px_rgba(0,229,255,0.03)]"
        >
          <div className="bg-[#0b1014] rounded-2xl overflow-hidden shadow-inner border border-white/5">
            {/* Editor Header */}
            <div className="px-4 py-3.5 flex items-center gap-2 bg-[#0d151c] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-4 text-[11px] font-mono text-gray-400 tracking-wider">create_payment.ts</span>
            </div>
            
            {/* Code Area */}
            <div className="p-6 md:p-8 overflow-x-auto text-xs sm:text-sm font-mono leading-[1.7]">
              <pre className="text-[#88929b]">
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
