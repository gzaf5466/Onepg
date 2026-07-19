import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Minus, Plus, CreditCard, ShieldCheck } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const plans = [
  {
    name: 'Payin Solution',
    price: '₹15,000',
    numericPrice: 15000,
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
    buttonText: 'Pay via Razorpay Test',
    highlighted: false,
  },
  {
    name: 'Web Development',
    price: '₹20,000',
    numericPrice: 20000,
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
    buttonText: 'Pay via Razorpay Test',
    highlighted: true,
  },
  {
    name: 'Payout Solution',
    price: '₹50,000',
    numericPrice: 50000,
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
    buttonText: 'Pay via Razorpay Test',
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
  const navigate = useNavigate();
  const { isAuthenticated, createRazorpayOrder, verifyRazorpayPayment, currentClient, showToast } = useContext(AppContext);
  const [processingPlan, setProcessingPlan] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayTestPayment = async (plan) => {
    if (!isAuthenticated) {
      showToast('Please sign up or log in to initiate Razorpay test payments.', 'info');
      navigate('/signup');
      return;
    }

    setProcessingPlan(plan.name);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded && process.env.NODE_ENV === 'production') {
        showToast('Razorpay SDK failed to load. Please check internet connection.', 'error');
        setProcessingPlan(null);
        return;
      }

      const res = await createRazorpayOrder(plan.numericPrice, plan.name);
      setProcessingPlan(null);

      if (!res.success) {
        showToast(res.message || 'Failed to create Razorpay test order.', 'error');
        return;
      }

      // If key is dummy/simulated mode
      if (res.isSimulated || !window.Razorpay) {
        await verifyRazorpayPayment(res.order.id, 'pay_test_' + Date.now(), 'simulated_sig', plan.numericPrice);
        return;
      }

      // Trigger standard Razorpay Checkout modal
      const options = {
        key: res.key,
        amount: res.order.amount,
        currency: res.order.currency,
        name: 'OnePG Technologies',
        description: `Plan Subscription: ${plan.name}`,
        order_id: res.order.id,
        handler: async function (response) {
          await verifyRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            plan.numericPrice
          );
        },
        prefill: {
          name: currentClient?.name || 'Merchant',
          email: currentClient?.email || ''
        },
        theme: { color: '#FF5722' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setProcessingPlan(null);
      console.error('Payment error:', err);
      showToast('Error initializing Razorpay payment flow.', 'error');
    }
  };

  return (
    <div className="w-full bg-[#050505] text-white font-sans overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pb-16 relative">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-semibold text-[#00E5FF] mb-4">
            <CreditCard size={14} />
            Razorpay Test Environment Active
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-none mb-6">
            Flexible Solutions for <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Every Stage of Growth</span>
          </h2>
          
          <p className="text-[#88929b] text-base max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Every business has unique needs. Sign up or log in to test transactions directly via Razorpay Test Environment.
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

                <button 
                  onClick={() => handleRazorpayTestPayment(plan)}
                  disabled={processingPlan === plan.name}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center block transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted 
                      ? 'bg-[#FF5722] hover:bg-[#e64e1e] text-white shadow-[0_4px_15px_rgba(255,87,34,0.3)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {processingPlan === plan.name ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard size={16} />
                      {plan.buttonText}
                    </>
                  )}
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
