import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, CheckCircle, ArrowRight, ShieldCheck, Mail 
} from 'lucide-react';
import logo from '../assets/Logo.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const legalPolicies = {
    'Privacy Policy': {
      title: 'Privacy Policy',
      lastUpdated: 'October 12, 2025',
      content: [
        'At OnePG, we prioritize the protection of your personal and corporate financial data. This Privacy Policy details how we collect, process, and secure information when you access our merchant APIs, client dashboards, or transactional interfaces.',
        'We collect registration details (business name, PAN, GSTIN, email, and contact info), operational metadata (IP address, device identifiers, checkout telemetry), and transactional parameters necessary to execute secure settlements.',
        'All client data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards. We do not sell or lease merchant or customer data to third-party marketing brokers. Data sharing is limited to certified banking networks and regulatory compliance authorities.'
      ]
    },
    'Terms of Service': {
      title: 'Terms of Service',
      lastUpdated: 'November 01, 2025',
      content: [
        'These Terms of Service govern your use of the payment processing, payout rails, and dashboard systems provided by OnePG Technologies Pvt. Ltd.',
        'By onboarding as a merchant or configuring gateway credentials, you agree to satisfy all merchant underwriting criteria, maintain legitimate business records, and ensure your site displays correct refund and service policies to consumers.',
        'Transaction processing fees (MDR) will be deducted per the agreed schedule. Chargebacks and transaction disputes must be resolved in accordance with Visa, MasterCard, and RuPay card network regulations.'
      ]
    },
    'Refund Policy': {
      title: 'Refund & Settlement Policy',
      lastUpdated: 'August 18, 2025',
      content: [
        'This policy applies to commercial transactions and customer chargebacks processed through the OnePG rails.',
        'Refund requests must be initiated via the Client Dashboard or our automated Refund API. Funds will be returned directly to the customer’s original payment instrument (credit card, bank account, or wallet) within 5 to 7 banking business days.',
        'Standard processing fees (MDR) are non-refundable in the event of customer cancellations, except where negotiated under custom enterprise partner plans.'
      ]
    },
    'Security': {
      title: 'Security & Encryption Standards',
      lastUpdated: 'December 05, 2025',
      content: [
        'OnePG maintains state-of-the-art security measures to safeguard all transaction data.',
        'We are fully PCI-DSS Level 1 certified. Cardholder data is isolated completely from primary application servers using secure tokenization and sandboxed iframe checkouts.',
        'We conduct continuous real-time fraud monitoring, daily vulnerability scans, and bi-annual external network penetration testing by certified third-party security auditors.'
      ]
    },
    'Compliance': {
      title: 'Regulatory Compliance Mandates',
      lastUpdated: 'September 30, 2025',
      content: [
        'OnePG operates as a certified payment aggregator under licensing frameworks established by central banking authorities.',
        'All corporate clients must undergo mandatory business verification (KYC/KYB) before transaction settlements can be processed.',
        'We maintain strict Anti-Money Laundering (AML) monitoring and report suspicious transaction structures in accordance with regulatory reporting requirements.'
      ]
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 z-10 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop & Mobile Mega Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="col-span-2 flex flex-col">
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer mb-5">
              <img src={logo} alt="OnePG Logo" width="95" height="33" className="h-8 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs font-light leading-relaxed">
              Simplifying payments and powering businesses to grow faster, globally.
            </p>
            {/* Social Icons with custom SVG assets */}
            <div className="flex space-x-3.5">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs sm:text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light">Pay-In Gateway</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light">Payout Gateway</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light">T+0 Settlement</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light">International Payments</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light">All Solutions</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs sm:text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Blog</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Documentation</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">API Docs</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Guides</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs sm:text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">About Us</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Careers</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Partners</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors font-light">Newsroom</Link></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActivePolicy('Privacy Policy')} className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('Terms of Service')} className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('Refund Policy')} className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light cursor-pointer text-left">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('Security')} className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light cursor-pointer text-left">
                  Security
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('Compliance')} className="text-gray-400 hover:text-[#FF5722] text-sm transition-colors font-light cursor-pointer text-left">
                  Compliance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="border-t border-b border-white/5 py-8 my-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-base sm:text-lg">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light">Get the latest updates and insights</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-grow md:w-64">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/40 transition-colors"
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#00838F] hover:bg-[#0097A7] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Base Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs font-light">
            &copy; 2025 OnePG Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>

      {/* Subscription Toast Feedback */}
      {subscribed && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#050505] border border-[#00E5FF]/20 rounded-xl p-4 flex items-center gap-3 shadow-2xl animate-slideIn">
          <CheckCircle className="text-[#00E5FF]" size={20} />
          <div>
            <h5 className="text-white text-xs font-bold">Successfully Subscribed!</h5>
            <p className="text-gray-400 text-[10px]">Thank you for joining the OnePG newsletter.</p>
          </div>
        </div>
      )}

      {/* Legal Document Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden relative shadow-2xl">
            {/* Modal Header */}
            <div className="border-b border-white/5 p-6 flex justify-between items-center bg-white/[0.02]">
              <div className="space-y-1">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <ShieldCheck className="text-[#00E5FF]" size={20} />
                  {legalPolicies[activePolicy].title}
                </h3>
                <p className="text-gray-500 text-[11px] font-semibold">Last Updated: {legalPolicies[activePolicy].lastUpdated}</p>
              </div>
              <button 
                onClick={() => setActivePolicy(null)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[350px] overflow-y-auto text-gray-300 text-sm leading-relaxed font-light">
              {legalPolicies[activePolicy].content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/5 p-4 flex justify-end bg-white/[0.01]">
              <button 
                onClick={() => setActivePolicy(null)}
                className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
