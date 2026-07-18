import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO @ PayFlow",
    company: "PayFlow Technologies",
    rating: 5,
    content: "The smart routing engine reduced our transaction drop-offs by 40%. The API was incredibly straightforward to integrate with our multi-platform apps.",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Priya Desai",
    role: "VP Operations @ ShopStore",
    company: "ShopStore E-Commerce",
    rating: 5,
    content: "OnePG's vendor settlement system is a game-changer. We disburse thousands of partner splits daily with total accuracy and real-time dashboard control.",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Amit Patel",
    role: "Director @ SaaSFlow",
    company: "SaaSFlow Global",
    rating: 5,
    content: "Instant Aadhaar and PAN verification saved us hundreds of hours onboarding new clients. The platform is secure, reliable, and compliant.",
    avatar: "https://i.pravatar.cc/150?u=amit"
  },
  {
    name: "Ananya Iyer",
    role: "Head of Product @ FinTechX",
    company: "FinTechX Labs",
    rating: 5,
    content: "The 99.99% uptime and auto-retry failover nodes meant zero downtime during our festive sale flash events. Outstanding developer documentation too!",
    avatar: "https://i.pravatar.cc/150?u=ananya"
  },
  {
    name: "Vikram Malhotra",
    role: "Founder & CEO @ NeoBank",
    company: "NeoBank India",
    rating: 5,
    content: "Custom payout scheduling and webhook callbacks gave our micro-merchants absolute trust. OnePG is by far the most resilient payment stack we've used.",
    avatar: "https://i.pravatar.cc/150?u=vikram"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide(); // Swipe Left -> Next
    } else if (distance < -50) {
      prevSlide(); // Swipe Right -> Prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="resources" className="py-16 md:py-24 relative z-10 bg-[#050505] border-b border-white/5 overflow-hidden">
      {/* Ambient Neon Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#FF5722]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Trusted by <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#00E5FF]">Industry Leaders</span>
          </h2>
          
          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto font-light">
            Don't just take our word for it. Read what engineering and operations leaders say about OnePG.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-5xl mx-auto px-2 sm:px-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Active Testimonial Card */}
          <div className="relative overflow-hidden min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent border border-white/[0.1] hover:border-[#00E5FF]/30 rounded-3xl p-6 sm:p-10 md:p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 pointer-events-none" />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF5722] text-[#FF5722]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-base sm:text-xl md:text-2xl leading-relaxed mb-8 font-light italic">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name} 
                    width="56" 
                    height="56" 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#00E5FF]/40 object-cover shadow-[0_0_15px_rgba(0,229,255,0.2)]" 
                  />
                  <div>
                    <h4 className="font-bold text-white text-base sm:text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#00E5FF]">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons (Desktop & Mobile) */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#050505]/90 border border-white/10 text-white flex items-center justify-center hover:bg-[#FF5722] hover:border-[#FF5722] transition-all shadow-xl z-20 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#050505]/90 border border-white/10 text-white flex items-center justify-center hover:bg-[#FF5722] hover:border-[#FF5722] transition-all shadow-xl z-20 group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Pagination Indicators & Slide Counter */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 bg-gradient-to-r from-[#FF5722] to-[#00E5FF]' 
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
