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
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 w-full relative">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-[30vw] h-[30vw] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Complete Solutions to Accelerate <br />
            Your <span className="bg-gradient-to-r from-[#FF5722] to-[#00E5FF] bg-clip-text text-transparent">Business Growth</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            From checkout portals to dynamic native mobile applications, select from our tailored services to deploy a state-of-the-art payment setup.
          </p>
        </div>

        {/* 10 Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 relative z-10">
          {servicesList.map((svc) => {
            const IconComp = svc.icon;
            return (
              <div 
                key={svc.title}
                className="bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col justify-between hover:bg-white/[0.02] transition-all group min-h-[220px]"
              >
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${svc.color}`}>
                    <IconComp size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FF5722] transition-colors">{svc.title}</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{svc.desc}</p>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-start text-[10px] font-bold text-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  Learn More <ArrowRight size={10} className="ml-1" />
                </div>
              </div>
            );
          })}
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
