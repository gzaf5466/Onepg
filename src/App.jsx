import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerStrip from './components/PartnerStrip';
import ProductPillars from './components/ProductPillars';
import Payouts from './components/Payouts';
import Platforms from './components/Platforms';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import FeaturesGrid from './components/FeaturesGrid';
import CodePreview from './components/CodePreview';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Industries from './components/Industries';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Home Page Component
const Home = () => (
  <>
    <div className="h-screen flex flex-col justify-between relative overflow-hidden border-b border-white/5 bg-[#050505]">
      <Navbar />
      <Hero />
      <div className="hidden sm:block">
        <PartnerStrip />
      </div>
    </div>
    
    <main className="flex-grow flex flex-col">
      <div className="sm:hidden order-none">
        <PartnerStrip />
      </div>
      
      <div className="order-1">
        <HowItWorks />
      </div>
      
      <div className="order-2">
        <Testimonials />
      </div>
      
      <div className="order-3">
        <FAQ />
      </div>
      
      <div className="order-4">
        <CTA />
      </div>
    </main>
    <Footer />
  </>
);

// Products Page Component
const ProductsPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <ProductPillars />
    <Payouts />
    <Platforms />
    <FeaturesGrid />
    <Footer />
  </div>
);

// Solutions Page Component
const SolutionsPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Benefits />
    <Industries />
    <Footer />
  </div>
);

// Developers Page Component
const DevelopersPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <CodePreview />
    <Footer />
  </div>
);

// Pricing Page Component
const PricingPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Pricing />
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#050505]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
