import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Shield, Eye, EyeOff, Globe, TrendingUp, ShieldCheck, ChevronRight, User, Building, Mail, Phone, Lock } from 'lucide-react';
import loginImg from '../assets/login.avif';
import logo from '../assets/Logo.svg';

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, socialLogin, handleOAuthSuccess, API_BASE, showToast } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState('');

  const handledOAuthRef = useRef(false);

  // Handle Passport OAuth Redirect Callbacks (?token=... or ?error=...)
  useEffect(() => {
    const token = searchParams.get('token');
    const oauthError = searchParams.get('error');
    const social = searchParams.get('social');

    if (token && !handledOAuthRef.current) {
      handledOAuthRef.current = true;
      handleOAuthSuccess(token, 'client');
      showToast(`Registered & Signed in via ${social === 'google' ? 'Google' : 'GitHub'}!`, 'success');
      navigate('/dashboard', { replace: true });
    } else if (oauthError) {
      setError(decodeURIComponent(oauthError));
    }
  }, [searchParams, navigate, showToast, handleOAuthSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSocialAuth = async (provider) => {
    setError('');
    setIsSocialLoading(provider);

    try {
      const res = await socialLogin(provider);
      setIsSocialLoading('');
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || `Failed to sign up with ${provider}.`);
      }
    } catch (err) {
      setIsSocialLoading('');
      setError(`Network error authenticating with ${provider}.`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, company, email, phone, password, confirmPassword } = formData;

    if (!name || !company || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await signup(name, company, email, password, phone, 'Basic');
      setIsSubmitting(false);

      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError('Network connection error. Server might be offline.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden font-sans">
      {/* Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-[#FF5722]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Container */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Branding & Visual */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full min-h-[640px] pr-6 py-4">
          <div>
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-10 w-auto mb-3" />
            </Link>
            <p className="text-gray-400 text-sm tracking-wide font-normal">
              Simplifying Payments, Powering Growth
            </p>
          </div>

          <div className="my-auto relative flex items-center justify-center h-[320px] w-full group">
            <img 
              src={loginImg} 
              alt="Merchant Onboarding" 
              width="1024"
              height="1024"
              className="w-full max-w-[380px] h-auto object-contain transition-transform duration-700 group-hover:scale-105 scale-105"
            />
          </div>

          <div>
            <div className="grid grid-cols-4 gap-3 border-t border-white/5 pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Instant KYC</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2">
                  <Globe size={18} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Multi-Pay</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2">
                  <TrendingUp size={18} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">High Success</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2">
                  <Shield size={18} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">PCI-DSS</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-600 mt-6 tracking-wider">
              © 2025 OnePG Technologies Pvt. Ltd. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphic Signup Form */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <div className="w-full max-w-[520px] bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5722]/10 rounded-full blur-xl pointer-events-none" />

            <div className="mb-6 flex flex-col items-center text-center lg:items-start lg:text-left">
              <Link to="/" className="lg:hidden mb-4">
                <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto" />
              </Link>
              <h3 className="text-2xl font-bold text-white mb-1">Get Started with OnePG</h3>
              <p className="text-gray-400 text-sm">Create your merchant account & start accepting payments</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {/* Social OAuth Signup Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button 
                type="button"
                onClick={() => handleSocialAuth('google')}
                disabled={!!isSocialLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
              >
                {isSocialLoading === 'google' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Google Signup
                  </>
                )}
              </button>

              <button 
                type="button"
                onClick={() => handleSocialAuth('github')}
                disabled={!!isSocialLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
              >
                {isSocialLoading === 'github' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub Signup
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b0c10] px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold shrink-0">
                Or with Work Email
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Business / Company <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Tech Pvt Ltd"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="merchant@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all placeholder-gray-600"
                    />
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 pt-1 leading-relaxed">
                By creating an account, you agree to OnePG's{' '}
                <span className="text-[#FF5722] hover:underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-[#FF5722] hover:underline cursor-pointer">Privacy Policy</span>.
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,87,34,0.3)] flex items-center justify-center gap-2 relative disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Merchant Account
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center pt-4 border-t border-white/5">
              <p className="text-xs text-gray-400">
                Already registered?{' '}
                <Link to="/login" className="text-[#FF5722] hover:underline font-bold">
                  Login to your account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
