import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Minus, Plus } from 'lucide-react';

const plans = [
  {
    name: 'Payin Solution',
    price: '₹15,000',
    period: 'Starting from',
    popular: false,
    features: [
      'Standard Pay-In Gateway',
      'All Major Payment Methods (UPI, Cards, QR)',
      'High Success Rates & Failover Routing',
      'Merchant Settlement Dashboard',
      'Standard API & Webhook Integration',
      '24/7 Email & Chat Support'
    ],
    buttonText: 'Inquire Now',
    highlighted: false,
  },
  {
    name: 'Web Development',
    price: '₹20,000',
    period: 'Starting from',
    popular: true,
    features: [
      'Custom Web Application Design',
      'Responsive UI for Mobile & Desktop',
      'Seamless Payment Gateway Integration',
      'Secure User Authentication & Database',
      'Admin Control Panel & Dashboard',
      'SEO Optimized & High Performance'
    ],
    buttonText: 'Build with Us',
    highlighted: true,
  },
  {
    name: 'Payout Solution',
    price: '₹50,000',
    period: 'Starting from',
    popular: false,
    features: [
      'Automated Bulk Disbursements',
      'Instant Account & VPA Verification',
      'Multi-Bank Smart Fail-Safe Routing',
      'Dedicated Sandbox & Production Keys',
      'Custom SLA & 99.99% Uptime Guarantee',
      'Dedicated Account Manager'
    ],
    buttonText: 'Setup Payouts',
    highlighted: false,
  }
];

const compareFeatures = [
  { category: 'Starting Rate', payin: '₹15,000', web: '₹20,000', payout: '₹50,000' },
  { category: 'Integration Type', payin: 'API / SDK / Webhook', web: 'Custom Built Frontend/Backend', payout: 'API / Batch File Upload' },
  { category: 'Settlement Time', payin: 'T+1 or T+2 days', web: 'N/A', payout: 'Instant / Real-time' },
  { category: 'Uptime SLA', payin: '99.9%', web: '99.9% Hosting', payout: '99.99%' },
  { category: 'Support Level', payin: '24/7 Chat & Email', web: '1 Month Post-Launch support', payout: 'Dedicated Account Manager' },
  { category: 'Customizations', payin: 'Standard Theme', web: 'Fully Tailored UI/UX', payout: 'Custom Routing & Flow' }
];

export default function Pricing() {
  return (
    <div className="w-full bg-[#050505] text-white font-sans overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pb-16 relative">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-none mb-6">
            Flexible Solutions for <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Every Stage of Growth</span>
          </h2>
          
          <p className="text-[#88929b] text-base max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Every business has unique needs. Choose the tier that matches your integration timeline and disbursal requirements.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          {plans.map((plan, idx) => {
            return (
              <div 
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl p-8 bg-gradient-to-b from-white/[0.02] to-transparent transition-all duration-500 hover:-translate-y-1 ${
                  plan.highlighted 
                    ? 'border-2 border-[#FF5722] shadow-[0_0_40px_rgba(255,87,34,0.15)] bg-[#070e14]' 
                    : 'border border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_4px_10px_rgba(255,87,34,0.3)]">
                    Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-gray-400 mb-2">{plan.name}</h3>
                  <div className="flex flex-col gap-0.5 mb-8">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{plan.period}</span>
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-1" />
                        <span className="text-sm text-[#88929b] font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to="/login"
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center block transition-all ${
                    plan.highlighted 
                      ? 'bg-[#FF5722] hover:bg-[#e64e1e] text-white shadow-[0_4px_15px_rgba(255,87,34,0.3)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            );
          })}
        </div>


        {/* Feature Comparison Table */}
        <div className="mb-24 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold mb-3 text-white">Compare Plans</h3>
            <p className="text-[#88929b] text-sm font-light font-sans">Detailed capabilities and services available for each billing tier.</p>
          </div>

          <div className="overflow-x-auto border border-white/[0.08] rounded-2xl bg-white/[0.01] scrollbar-thin">
            <table className="w-full text-sm font-sans text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 font-bold text-[#88929b] uppercase tracking-wider text-xs">Feature Details</th>
                  <th className="px-6 py-4 font-bold text-white tracking-wider">Payin Solution</th>
                  <th className="px-6 py-4 font-bold text-[#FF5722] tracking-wider">Web Development</th>
                  <th className="px-6 py-4 font-bold text-white tracking-wider">Payout Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#88929b] font-light">
                {compareFeatures.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{row.category}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {typeof row.payin === 'boolean' ? (
                        row.payin ? <Check className="w-4 h-4 text-[#00E5FF]" /> : '—'
                      ) : row.payin}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {typeof row.web === 'boolean' ? (
                        row.web ? <Check className="w-4 h-4 text-[#FF5722]" /> : '—'
                      ) : row.web}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {typeof row.payout === 'boolean' ? (
                        row.payout ? <Check className="w-4 h-4 text-[#00E5FF]" /> : '—'
                      ) : row.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA and FAQ Link Block */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#FF5722]/5 to-[#00E5FF]/5 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,229,255,0.05)_0%,transparent_50%)]" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">Ready to simplify your payments?</h3>
            <p className="text-[#88929b] text-sm font-light">Get started now to spin up sandbox environments, access production API keys, and route transactions securely.</p>
          </div>

          <div className="relative z-10 flex gap-4 shrink-0 flex-col sm:flex-row w-full sm:w-auto">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5722] hover:bg-[#e64e1e] text-[#FFFFFF] font-bold rounded-xl shadow-[0_4px_15px_rgba(255,87,34,0.3)] transition-all text-center block"
            >
              Get Started Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
