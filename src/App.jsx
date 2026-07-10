import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';

// Standard Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerStrip from './components/PartnerStrip';
import ProductPillars from './components/ProductPillars';
import Payouts from './components/Payouts';
import Platforms from './components/Platforms';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import FeaturesGrid from './components/FeaturesGrid';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Industries from './components/Industries';
import CTA from './components/CTA';
import Footer from './components/Footer';

// New Section Components
import WhyChooseUs from './components/WhyChooseUs';
import SecurityCompliance from './components/SecurityCompliance';
import Technology from './components/Technology';

// New Sub-pages
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

// Portal pages
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Home Page Component
const Home = () => (
  <>
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
  </>
);

// Products Page Component
const ProductsPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Platforms />
    <ProductPillars />
    <Payouts />
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

// Pricing Page Component
const PricingPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Pricing />
    <Footer />
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#050505]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
