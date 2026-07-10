import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Award, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import aboutUsImg from '../assets/aboutus.png';

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
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 relative w-full">
        {/* Decorative Grid and Orb */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#FF5722]/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header Block with Visual Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              About OnePG
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Building the Future of <span className="bg-gradient-to-r from-[#FF5722] to-amber-500 bg-clip-text text-transparent">Digital Payments</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              OnePG was founded with a single mission: to deliver innovative, reliable, and secure payment solutions that help businesses thrive globally. We bridge the gap between traditional banking infrastructure and modern developer needs.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                <ShieldCheck className="text-[#FF5722] w-5 h-5" />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Secure Pipeline</h4>
                  <p className="text-[10px] text-gray-500">PCI DSS Compliant stack</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                <Users className="text-[#00E5FF] w-5 h-5" />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Merchant First</h4>
                  <p className="text-[10px] text-gray-500">24/7 dedicated support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual 3D network graphic/illustration */}
          <div className="relative h-[300px] sm:h-[400px] flex items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden group p-4">
            <img 
              src={aboutUsImg} 
              alt="About OnePG" 
              className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st) => (
            <div key={st.label} className="bg-white/[0.01] border border-white/5 rounded-xl p-6 text-center space-y-1 relative group hover:border-[#FF5722]/30 transition-all">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FF5722]">{st.value}</h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{st.label}</p>
            </div>
          ))}
        </section>

        {/* Journey Timeline */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-white">Our Journey</h2>
            <p className="text-gray-400 text-sm">How we evolved from a small integration plugin to an enterprise scale payments core.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {milestones.map((ms, idx) => (
              <div key={ms.year} className="bg-white/[0.01] border border-white/5 rounded-xl p-6 relative space-y-3 group hover:bg-white/[0.02] transition-colors">
                <span className="absolute top-4 right-4 text-xs font-extrabold text-[#FF5722] bg-[#FF5722]/10 border border-[#FF5722]/20 px-2 py-0.5 rounded">
                  {ms.year}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#FF5722] transition-colors">{ms.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{ms.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <section className="bg-gradient-to-tr from-[#FF5722]/10 to-transparent border border-[#FF5722]/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-left">
            <h3 className="text-2xl font-bold text-white">Ready to streamline your transaction flow?</h3>
            <p className="text-sm text-gray-400 max-w-xl">Create your merchant sandbox account in under two minutes or contact our support team.</p>
          </div>
          <div className="flex gap-4 shrink-0 w-full md:w-auto">
            <Link to="/login" className="flex-1 md:flex-none text-center bg-[#FF5722] hover:bg-[#e64e1e] text-white px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,87,34,0.3)]">
              Get Started
            </Link>
            <Link to="/contact" className="flex-1 md:flex-none text-center bg-transparent border border-white/10 hover:bg-white/5 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all">
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
