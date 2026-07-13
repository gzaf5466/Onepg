import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PartnerStrip from '../components/PartnerStrip';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

// New Section Components
import WhyChooseUs from '../components/WhyChooseUs';
import SecurityCompliance from '../components/SecurityCompliance';
import Technology from '../components/Technology';

const HomePage = () => (
  <div className="w-full overflow-x-hidden flex flex-col">
    <div className="min-h-screen lg:h-screen flex flex-col justify-between relative overflow-hidden border-b border-white/5 bg-[#050505]">
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
        <WhyChooseUs />
      </div>

      <div className="order-3">
        <SecurityCompliance />
      </div>

      <div className="order-4">
        <Technology />
      </div>

      <div className="order-5">
        <Testimonials />
      </div>
      
      <div className="order-6">
        <FAQ />
      </div>
      
      <div className="order-7">
        <CTA />
      </div>
    </main>
    <Footer />
  </div>
);

export default HomePage;
