import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Award, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import aboutUsImg from '../assets/aboutus.avif';

const AboutPage = () => {
  const stats = [
    { label: 'Founded', value: '2019' },
    { label: 'Happy Merchants', value: '5000+' },
    { label: 'Payment Partners', value: '20+' },
    { label: 'Uptime SLA', value: '99.9%' }
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', desc: 'Started with a vision to simplify local payment handshakes.' },
    { year: '2020', title: 'First Gateway Live', desc: 'Successfully integrated our core Pay-In API stack.' },
    { year: '2021', title: 'Expanded Services', desc: 'Launched instant payouts and custom corporate onboarding.' },
    { year: '2022', title: '1000+ Merchants Onboarded', desc: 'Earned the trust of leading digital enterprises.' },
    { year: '2023', title: 'Global Expansion', desc: 'Introduced cross-border international remittances.' },
    { year: '2024', title: 'Web3 & Node Integrations', desc: 'Achieved 99.9% SLA and next-generation smart routing.' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-16 pb-12 md:pb-20 space-y-12 sm:space-y-16 lg:space-y-20 relative w-full">
        {/* Decorative Grid and Orb */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#FF5722]/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header Block with Visual Layout */}
        <section className="space-y-4 sm:space-y-6 relative z-10">
          {/* Page Title & Breadcrumb Header (Appears above image on mobile and desktop) */}
          <div className="space-y-2 border-b border-white/10 pb-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Link to="/" className="hover:text-[#FF5722] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#FF5722]">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF] tracking-tight">
              About Us
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Visual Graphic Illustration (Directly below 'About Us' on Mobile) */}
            <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] w-full flex items-center justify-center group order-first lg:order-last">
              <img 
                src={aboutUsImg} 
                alt="About OnePG" 
                width="1024"
                height="1024"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] scale-105 sm:scale-100"
              />
            </div>

            {/* Text Content Block */}
            <div className="space-y-6 text-center lg:text-left order-last lg:order-first">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Building the Future of <span className="bg-gradient-to-r from-[#FF5722] to-amber-500 bg-clip-text text-transparent">Digital Payments</span>
              </h2>
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              OnePG was founded with a single mission: to deliver innovative, reliable, and secure payment solutions that help businesses thrive globally. We bridge the gap between traditional banking infrastructure and modern developer needs.
            </p>

            {/* Security & Support Feature Pills */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 p-3.5 rounded-xl flex-1 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#FF5722] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Secure Pipeline</h4>
                  <p className="text-xs text-gray-400 font-light">PCI DSS Compliant stack</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 p-3.5 rounded-xl flex-1 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0">
                  <Users className="text-[#00E5FF] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Merchant First</h4>
                  <p className="text-xs text-gray-400 font-light">24/7 dedicated support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((st) => (
            <div key={st.label} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 text-center space-y-1 relative group hover:border-[#FF5722]/40 transition-all shadow-lg">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FF5722]">{st.value}</h3>
              <p className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">{st.label}</p>
            </div>
          ))}
        </section>

        {/* Journey Timeline */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Our Journey</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light">How we evolved from a small integration plugin to an enterprise scale payments core.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
            {milestones.map((ms, idx) => (
              <div key={ms.year} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 relative space-y-3 group hover:bg-white/[0.04] hover:border-[#FF5722]/30 transition-all shadow-md">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xs">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-extrabold text-[#FF5722] bg-[#FF5722]/10 border border-[#FF5722]/20 px-2.5 py-1 rounded-full">
                    {ms.year}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#FF5722] transition-colors">{ms.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">{ms.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <section className="bg-gradient-to-tr from-[#FF5722]/15 via-white/[0.02] to-transparent border border-[#FF5722]/20 rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Ready to streamline your transaction flow?</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl font-light">Create your merchant sandbox account in under two minutes or contact our support team.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link to="/login" className="w-full sm:w-auto text-center bg-[#FF5722] hover:bg-[#e64e1e] text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              Get Started
            </Link>
            <Link to="/contact" className="w-full sm:w-auto text-center bg-transparent border border-white/10 hover:bg-white/5 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
