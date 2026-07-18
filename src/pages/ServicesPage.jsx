import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Zap, ArrowRightLeft, ArrowUpRight, Globe, Building2, 
  Code, Cpu, Smartphone, Tablets, MessageSquare, ArrowRight 
} from 'lucide-react';

const ServicesPage = () => {
  const servicesList = [
    {
      title: 'T+0 Settlement',
      desc: 'Receive your merchant payouts instantly on the same business day for maximum liquidity and cash flow management.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Pay-In Gateway',
      desc: 'Accept local and global payment methods like Cards, UPI, QR, Netbanking, and Mobile Wallets with high conversion rates.',
      icon: ArrowRightLeft,
      color: 'text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/20'
    },
    {
      title: 'Payout Gateway',
      desc: 'Automate bulk disbursements, supplier payouts, and commission transfers to banks instantly via API integrations.',
      icon: ArrowUpRight,
      color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20'
    },
    {
      title: 'International Gateway',
      desc: 'Process payments in 130+ currencies with real-time multi-currency conversion and localized compliance checks.',
      icon: Globe,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Business Registration',
      desc: 'Fast-track corporate registration, GST, and MSME certification with our fully guided documentation pipeline.',
      icon: Building2,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Website Development',
      desc: 'Beautiful, high-performance responsive web assets integrated with payment modules out of the box.',
      icon: Code,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Software Development',
      desc: 'Custom-built accounting integrations, inventory checkers, and middleware to automate your operations.',
      icon: Cpu,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20'
    },
    {
      title: 'Android App',
      desc: 'Premium Android applications for mobile point-of-sale systems, checkouts, and custom customer loyalty tracking.',
      icon: Smartphone,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'iOS App',
      desc: 'Enterprise iOS apps featuring optimized Apple Pay steps, biometrics, and secure offline storage architectures.',
      icon: Tablets,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20'
    },
    {
      title: 'Business Consultation',
      desc: 'Expert strategic evaluation to structure transaction loops, limit chargebacks, and select partner banks.',
      icon: MessageSquare,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-16 pb-12 md:pb-20 space-y-12 sm:space-y-16 w-full relative">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-[30vw] h-[30vw] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Page Title & Breadcrumb Header */}
        <div className="space-y-2 border-b border-white/10 pb-4 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#FF5722] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FF5722]">Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF] tracking-tight">
            Our Services & Offerings
          </h1>
        </div>

        {/* 10 Services Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Card 1: T+0 Settlement (Featured Large Hero Bento Box) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#2c1408] via-[#0f1015] to-[#050505] border border-[#FF5722]/30 hover:border-[#FF5722]/60 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden shadow-[0_0_30px_rgba(255,87,34,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722]">
                  <Zap size={24} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Instant Disbursal
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FF5722] transition-colors">
                  T+0 Settlement Engine
                </h3>
                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
                  Receive your merchant payouts instantly on the same business day. Unlock maximum liquidity, eliminate credit reliance, and power immediate vendor operations.
                </p>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-white/5 relative z-10">
              <span className="text-xs font-semibold text-gray-400">Same-Day Corporate Clearing</span>
              <Link to="/contact" className="text-xs font-bold text-[#FF5722] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore Settlement Specs <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Pay-In Gateway */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#1c0e08]/40 to-[#0b0f14]/50 border border-[#FF5722]/20 hover:border-[#FF5722]/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722]">
                <ArrowRightLeft size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors mb-1.5">Pay-In Gateway</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Accept local and global payment methods like Cards, UPI, QR, Netbanking, and Mobile Wallets with industry-leading success rates.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 3: Payout Gateway */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#061820]/40 to-[#0b0f14]/50 border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-1.5">Payout Gateway</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Automate bulk disbursements, supplier payouts, and commission transfers directly to recipient bank accounts via REST APIs.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-[#00E5FF] group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 4: International Gateway */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#051c14]/40 to-[#0b0f14]/50 border border-emerald-500/20 hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Globe size={20} />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase">
                  130+ Currencies
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">International Gateway</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Process global transactions with real-time currency conversion, localized compliance checks, and cross-border routing.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 5: Business Registration */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0a1424]/40 to-[#0b0f14]/50 border border-blue-500/20 hover:border-blue-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">Business Registration</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Fast-track corporate incorporation, GST filing, and MSME certification with guided documentation and legal support.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 6: Website Development */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#120f28]/40 to-[#0b0f14]/50 border border-indigo-500/20 hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Code size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1.5">Website Development</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Bespoke, high-performance responsive web applications integrated with checkout gateways, authentication, and admin portals.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 7: Software Development */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1b0d26]/40 to-[#0b0f14]/50 border border-violet-500/20 hover:border-violet-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors mb-1.5">Software Development</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Custom-built accounting integrations, inventory trackers, and enterprise middleware to automate merchant operations.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-violet-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 8: Android App */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#240a16]/40 to-[#0b0f14]/50 border border-rose-500/20 hover:border-rose-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors mb-1.5">Android Application</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Native Android apps for mobile POS systems, checkouts, and custom customer loyalty tracking.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 9: iOS App */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#081b18]/40 to-[#0b0f14]/50 border border-teal-500/20 hover:border-teal-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Tablets size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors mb-1.5">iOS Application</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Enterprise iOS apps featuring optimized Apple Pay steps, biometrics, and secure offline storage architectures.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Card 10: Business Consultation */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#1a0a24]/40 to-[#0b0f14]/50 border border-purple-500/20 hover:border-purple-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1.5">Business Consultation</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Strategic evaluation to structure transaction loops, limit chargebacks, and select partner banks.
                </p>
              </div>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
              Schedule Consultation <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

        </section>

        {/* Bottom Callout */}
        <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 text-center sm:text-left relative z-10">
            <h4 className="text-base font-bold text-white">Need a Custom Solution?</h4>
            <p className="text-xs text-gray-400">Let's build something great together. Our engineers can structure a customized pipeline.</p>
          </div>
          <Link 
            to="/contact" 
            className="bg-[#FF5722] hover:bg-[#e64e1e] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 shadow-[0_0_15px_rgba(255,87,34,0.3)] relative z-10"
          >
            Contact Us
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
