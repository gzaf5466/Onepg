import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full glass-container border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <img src={logo} alt="OnePG Logo" width="95" height="33" className="h-8 sm:h-9 w-auto" />
          </Link>

          {/* Center: Navigation Links (Desktop only) */}
          <div className="hidden lg:flex space-x-6">
            {[
              { label: 'Products', path: '/products' },
              { label: 'Solutions', path: '/solutions' },
              { label: 'Services', path: '/services' },
              { label: 'Pricing', path: '/pricing' },
              { label: 'About', path: '/about' },
              { label: 'Blog', path: '/blog' }
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`px-2 py-2 text-xs font-semibold tracking-wide transition-all relative ${
                    isActive ? 'text-white font-bold' : 'text-[#9CA3AF] hover:text-[#FFFFFF]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF5722] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Actions (Login & Contact Us buttons always in topbar) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              to="/login"
              className="hidden lg:inline-flex text-[#FFFFFF] bg-transparent border border-transparent hover:border-white/10 px-4 py-2 rounded-md text-sm font-medium transition-all"
            >
              Login
            </Link>
            <Link 
              to="/contact"
              className="hidden lg:inline-flex bg-[#FF5722] text-[#FFFFFF] hover:bg-[#e64e1e] px-6 py-2 rounded-md text-sm font-medium transition-colors shadow-[0_0_15px_rgba(255,87,34,0.3)]"
            >
              Contact Us
            </Link>
            
            {/* Mobile/Tablet menu button */}
            <div className="lg:hidden flex items-center pl-1">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#9CA3AF] hover:text-[#FFFFFF] focus:outline-none p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Animated Dropdown Menu for Mobile/Tablet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-lg border-b border-white/5 overflow-hidden z-40"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {[
                { label: 'Products', path: '/products' },
                { label: 'Solutions', path: '/solutions' },
                { label: 'Services', path: '/services' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'About', path: '/about' },
                { label: 'Blog', path: '/blog' }
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.label} 
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 text-sm font-medium transition-colors border-b border-white/[0.02] flex items-center justify-between ${
                      isActive ? 'text-white font-bold' : 'text-[#9CA3AF] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile Actions inside Drawer */}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-[#FFFFFF] bg-white/[0.03] hover:bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-sm font-semibold transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-[#FF5722] text-[#FFFFFF] hover:bg-[#e64e1e] px-4 py-3 rounded-lg text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(255,87,34,0.3)]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
