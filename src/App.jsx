import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';

// Standard Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PartnerStrip from './components/PartnerStrip';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

// New Section Components
import WhyChooseUs from './components/WhyChooseUs';
import SecurityCompliance from './components/SecurityCompliance';
import Technology from './components/Technology';

// Lazy Loaded Pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));

// Premium Loading Indicator
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#FF5722] animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#00E5FF] animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
    </div>
  </div>
);

// Home Page Component
const Home = () => (
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
        <div className="flex flex-col min-h-screen bg-[#050505] overflow-x-hidden">
          <Suspense fallback={<LoadingScreen />}>
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
          </Suspense>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
