import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Payment Gateway',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Payment Gateway',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative w-full">
        {/* Decorative background orbs */}
        <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] bg-[#FF5722]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="inline-block bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Contact Us
          </span>
          <h1 className="text-4xl font-extrabold text-white">Let's Connect</h1>
          <p className="text-gray-400 text-sm sm:text-base">We're here to help you grow your business. Reach out to our teams for onboarding or customized configurations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Details (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">Get in Touch</h3>
              
              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</h4>
                    <p className="text-sm font-semibold text-white mt-1">+91 74283 14487</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</h4>
                    <p className="text-sm font-semibold text-white mt-1">help@onepg.in</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp</h4>
                    <p className="text-sm font-semibold text-white mt-1">+91 74283 14487</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Address</h4>
                    <p className="text-xs font-semibold text-white mt-1 leading-relaxed">
                      OnePG Technologies Pvt. Ltd.,<br />
                      AltF Orchid Business Park, 1st Floor,<br />
                      Badshahpur Sohna Road Highway, Central Park II,<br />
                      Sector 48, Gurugram, Haryana 122004
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours info */}
            <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <Clock className="text-amber-500 w-5 h-5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Working Hours</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Mon - Sat: 10:00 AM - 7:00 PM (IST)</p>
              </div>
            </div>

          </div>

          {/* Right Column: Form (Col 7) */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <h3 className="text-lg font-bold text-white mb-6">Let's grow your business</h3>
            
            {submitted ? (
              <div className="h-[350px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                  <p className="text-xs text-gray-400 max-w-sm">Thank you for reaching out. A merchant relation officer will review your request and contact you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Work Email</label>
                    <input 
                      type="email" 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter work email"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Service Interested In</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Payment Gateway" className="bg-[#050505]">Payment Gateway Integration</option>
                    <option value="T+0 Settlement" className="bg-[#050505]">T+0 Immediate Settlement</option>
                    <option value="Payout Gateway" className="bg-[#050505]">Payouts API Disbursals</option>
                    <option value="International Gateway" className="bg-[#050505]">International Currencies Processing</option>
                    <option value="Custom Development" className="bg-[#050505]">Website / Mobile Application Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can we help your business transactions scale?"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-xs focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3.5 rounded-lg text-xs font-bold transition-all shadow-[0_4px_20px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
