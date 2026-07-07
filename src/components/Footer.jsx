import React from 'react';
import logo from '../assets/Logo.svg';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Desktop Grid Area (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-8 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex-shrink-0 flex items-center cursor-pointer mb-4">
              <img src={logo} alt="OnePG Logo" className="h-8 w-auto" />
            </div>
            <p className="text-[#9CA3AF] text-sm mb-6">
              Empowering modern businesses with seamless, lightning-fast payment infrastructure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-1">
            <h4 className="text-[#FFFFFF] font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Payment Gateway</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Payouts</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Subscriptions</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Smart Routing</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-1">
            <h4 className="text-[#FFFFFF] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">API Reference</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-1">
            <h4 className="text-[#FFFFFF] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Newsroom</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="lg:col-span-1">
            <h4 className="text-[#FFFFFF] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Compliance</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] text-sm transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Column 6: Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-[#FFFFFF] font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF]">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                support@onepg.in
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 1800 123 4567
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Cyber City, DLF Phase 2,<br/>Gurugram, Haryana 122002
              </li>
            </ul>
          </div>

        </div>

        {/* Mobile & Tablet Simplified Footer (below lg) */}
        <div className="lg:hidden flex flex-col items-center text-center gap-8 mb-12">
          {/* Brand Logo */}
          <div className="flex items-center justify-center cursor-pointer">
            <img src={logo} alt="OnePG Logo" className="h-8 w-auto" />
          </div>
          
          {/* Tagline */}
          <p className="text-[#9CA3AF] text-sm max-w-sm mx-auto -mt-4">
            Empowering modern businesses with seamless, lightning-fast payment infrastructure.
          </p>

          {/* Quick Links Menu */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#9CA3AF]">
            <a href="#" className="hover:text-[#00E5FF] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#00E5FF] transition-colors">Resources</a>
            <a href="#" className="hover:text-[#00E5FF] transition-colors">Company</a>
            <a href="#" className="hover:text-[#00E5FF] transition-colors">Legal</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors p-2 bg-white/5 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors p-2 bg-white/5 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors p-2 bg-white/5 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
            </a>
          </div>
        </div>

        {/* Base Divider & Copyright */}
        <div className="pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-[#9CA3AF] text-sm">
            &copy; {new Date().getFullYear()} OnePG Private Limited. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
