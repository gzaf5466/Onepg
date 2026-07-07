import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerStrip from './components/PartnerStrip';
import ProductPillars from './components/ProductPillars';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* Above-the-fold viewport container */}
      <div className="h-screen flex flex-col justify-between relative overflow-hidden border-b border-white/5 bg-[#050505]">
        <Navbar />
        <Hero />
        {/* Render in the first fold on tablet/desktop */}
        <div className="hidden sm:block">
          <PartnerStrip />
        </div>
      </div>
      
      <main className="flex-grow flex flex-col">
        {/* Render below the fold on mobile */}
        <div className="sm:hidden order-none">
          <PartnerStrip />
        </div>
        
        {/* Swapped order on mobile: HowItWorks (order-1) -> Industries (order-2) -> ProductPillars (order-3) */}
        {/* Desktop order is preserved: ProductPillars (sm:order-1) -> HowItWorks (sm:order-2) -> Industries (sm:order-3) */}
        <div className="order-3 sm:order-1">
          <ProductPillars />
        </div>
        
        <div className="order-1 sm:order-2">
          <HowItWorks />
        </div>
        
        <div className="order-2 sm:order-3">
          <Industries />
        </div>
        
        <div className="order-4 sm:order-4">
          <CTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
