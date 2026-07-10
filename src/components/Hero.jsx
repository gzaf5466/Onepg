import React from 'react';
import desktopImage from '../assets/DESKTOP.avif';
import tabletImage from '../assets/tablet.avif';
import mobileImage from '../assets/mobile.avif';

const Hero = () => {
  return (
    <section className="flex-1 flex flex-col justify-center overflow-hidden py-4 lg:py-8 relative w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="relative z-10 flex flex-col justify-center text-center lg:text-left order-last lg:order-first px-4 sm:px-8 lg:px-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 text-[#FFFFFF] leading-tight">
              The Smarter Way <br className="hidden sm:inline" /> to Accept & Send <span className="text-[#FF5722]">Payments</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#9CA3AF] mb-6 max-w-2xl mx-auto lg:mx-0">
              Empower your business with a unified platform for fast, secure, and scalable financial operations. Global coverage tailored for local needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-md mx-auto lg:mx-0">
              <button className="w-full sm:w-auto flex items-center justify-center bg-[#FF5722] text-[#FFFFFF] hover:bg-[#e64e1e] px-8 py-3.5 rounded-md text-base font-medium transition-colors shadow-[0_0_20px_rgba(255,87,34,0.4)]">
                Start for free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center bg-transparent border border-white/10 text-[#FFFFFF] hover:bg-white/5 px-8 py-3.5 rounded-md text-base font-medium transition-colors">
                Contact sales
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center h-auto max-h-[35vh] lg:max-h-none lg:h-[500px] z-0 pointer-events-none lg:pointer-events-auto order-first lg:order-last mb-4 lg:mb-0">
            {/* Radial Gradient Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-[#FF5722]/20 to-[#00E5FF]/20 rounded-full blur-3xl"></div>
            </div>
            
            {/* Responsive Orbital Graphic Image */}
            <div className="relative z-10 w-full max-w-[320px] md:max-w-[420px] lg:max-w-none mx-auto flex items-center justify-center scale-[1.05] lg:scale-[1.15] animate-pulse-glow lg:animate-none">
              <picture className="w-full h-auto flex items-center justify-center">
                <source media="(min-width: 1024px)" srcSet={desktopImage} width="1184" height="750" />
                <source media="(min-width: 768px)" srcSet={tabletImage} width="928" height="500" />
                <img 
                  src={mobileImage} 
                  alt="OnePG Hero Graphic" 
                  width="800"
                  height="506"
                  fetchPriority="high"
                  className="w-full h-auto max-h-[28vh] md:max-h-[35vh] lg:max-h-none object-contain mx-auto"
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
