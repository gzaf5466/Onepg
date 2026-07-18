import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const PricingPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
    <Navbar />

    <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-16 pb-12 md:pb-20 relative w-full">
      {/* Decorative Ambient Orb */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Title & Breadcrumb Header */}
      <div className="space-y-2 border-b border-white/10 pb-4 text-center lg:text-left mb-6 sm:mb-8">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Link to="/" className="hover:text-[#FF5722] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#FF5722]">Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF] tracking-tight">
          Pricing & Plans
        </h1>
      </div>

      <Pricing />
    </main>

    <Footer />
  </div>
);

export default PricingPage;
