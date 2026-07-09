import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Minus, Plus } from 'lucide-react';

const plans = [
  {
    name: 'Starter Tier',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      'Basic Features',
      'Standard Payout Speeds',
      'Simple Conversion Routing',
      'Basic Channels Support',
      'Up to ₹50k monthly volume'
    ],
    buttonText: 'Start Now',
    highlighted: false,
  },
  {
    name: 'Growth Tier',
    priceMonthly: 49,
    priceYearly: 39,
    popular: true,
    features: [
      'Advanced Features',
      'Instant Payout Speeds',
      'Dynamic Conversion Routing',
      'Priority Support Channels',
      'Up to ₹10L monthly volume',
      'Advanced API access'
    ],
    buttonText: 'Sign Now',
    highlighted: true,
  },
  {
    name: 'Enterprise Tier',
    priceMonthly: 'Custom',
    priceYearly: 'Custom',
    features: [
      'Custom Enterprise Integrations',
      'Dedicated Account Rails',
      'Fail-safe Routing Engine',
      '24/7 Dedicated Account Manager',
      'Unlimited transaction volume',
      'Custom SLA uptime guarantee'
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  }
];

const compareFeatures = [
  { category: 'Platform & API', starter: true, growth: true, enterprise: true },
  { category: 'Payout Speeds', starter: '3 Days', growth: 'Instant', enterprise: 'Custom / Realtime' },
  { category: 'Conversion Routing', starter: 'Basic Failover', growth: 'Dynamic Smart Engine', enterprise: 'Fail-safe custom rules' },
  { category: 'Support Channels', starter: 'Email', growth: 'Email & Chat', enterprise: '24/7 Phone & Slack' },
  { category: 'API Uptime SLA', starter: '99.5%', growth: '99.9%', enterprise: '99.99%' },
  { category: 'Idempotency Keys', starter: true, growth: true, enterprise: true }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full bg-[#050505] text-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 py-20 md:py-28 relative">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/5 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-6">
            Pricing Plans
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none mb-6">
            Simple, Transparent <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Pricing Built for Scale</span>
          </h1>
          
          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-white/10 p-1 flex items-center transition-colors relative"
            >
              <div 
                className={`w-4 h-4 rounded-full bg-[#00E5FF] transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} 
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${isYearly ? 'text-[#00E5FF]' : 'text-gray-500'}`}>
              Yearly 
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          {plans.map((plan, idx) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
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
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white">
                      {typeof price === 'number' ? `$${price}` : price}
                    </span>
                    {typeof price === 'number' && (
                      <span className="text-sm text-gray-500">/month</span>
                    )}
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

                <button 
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                    plan.highlighted 
                      ? 'bg-[#FF5722] hover:bg-[#e64e1e] text-white shadow-[0_4px_15px_rgba(255,87,34,0.3)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
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

          <div className="overflow-x-auto border border-white/[0.08] rounded-2xl bg-white/[0.01]">
            <table className="w-full text-sm font-sans text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 font-bold text-[#88929b] uppercase tracking-wider text-xs">Feature Details</th>
                  <th className="px-6 py-4 font-bold text-white tracking-wider">Starter</th>
                  <th className="px-6 py-4 font-bold text-[#FF5722] tracking-wider">Growth</th>
                  <th className="px-6 py-4 font-bold text-white tracking-wider">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#88929b] font-light">
                {compareFeatures.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{row.category}</td>
                    <td className="px-6 py-4">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="w-4 h-4 text-[#00E5FF]" /> : '—'
                      ) : row.starter}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? <Check className="w-4 h-4 text-[#00E5FF]" /> : '—'
                      ) : row.growth}
                    </td>
                    <td className="px-6 py-4">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="w-4 h-4 text-[#00E5FF]" /> : '—'
                      ) : row.enterprise}
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
            <button className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5722] hover:bg-[#e64e1e] text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(255,87,34,0.3)] transition-all">
              Get Started Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
