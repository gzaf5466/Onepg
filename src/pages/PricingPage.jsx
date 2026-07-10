import React from 'react';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const PricingPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Pricing />
    <Footer />
  </div>
);

export default PricingPage;
