import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Shield, Eye, EyeOff, Globe, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';
import loginImg from '../assets/login.avif';
import logo from '../assets/Logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, socialLogin, handleOAuthSuccess, API_BASE, showToast } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
      showToast(`Signed in via ${social === 'google' ? 'Google' : 'Apple'}! Welcome back.`, 'success');
      navigate('/dashboard', { replace: true });
    } else if (oauthError) {
      setError(decodeURIComponent(oauthError));
    }
  }, [searchParams, navigate, showToast, handleOAuthSuccess]);

  const handleSocialAuth = async (provider) => {
    setError('');
    setIsSocialLoading(provider);

    // Standard Production Passport.js OAuth Redirect
    const passportOAuthUrl = `${API_BASE}/auth/${provider}`;
    
    // Redirect browser to Passport.js backend route
    window.location.href = passportOAuthUrl;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Network connection error. Server might be offline.');
    }
  };


  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-[#FF5722]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Center Wrapper */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Brand Promo (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between h-full min-h-[640px] pr-8 py-4">
          <div>
            <Link to="/">
              <img src={logo} alt="OnePG" width="95" height="33" className="h-10 w-auto mb-3" />
            </Link>
            <p className="text-gray-400 text-sm tracking-wide font-normal">
              Simplifying Payments, Powering Growth
            </p>
          </div>

          {/* 3D Glowing Card Graphic Mockup */}
          <div className="my-auto relative flex items-center justify-center h-[340px] w-full group">
            <img 
              src={loginImg} 
              alt="Secure Payments" 
              width="1024"
              height="1024"
              className="w-full max-w-[420px] h-auto object-contain transition-transform duration-700 group-hover:scale-105 scale-110"
            />
          </div>

          <div>
            {/* Secure Badges */}
            <div className="grid grid-cols-4 gap-4 border-t border-white/5 pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2 hover:border-white/20 hover:text-white transition-all">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Secure</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2 hover:border-white/20 hover:text-white transition-all">
                  <Globe size={20} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Reliable</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2 hover:border-white/20 hover:text-white transition-all">
                  <TrendingUp size={20} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Fast</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-gray-400 mb-2 hover:border-white/20 hover:text-white transition-all">
                  <Shield size={20} />
                </div>
                <span className="text-[11px] text-gray-400 font-semibold tracking-wide">Trusted</span>
              </div>
            </div>

            {/* Footer Copyright */}
            <div className="text-[10px] text-gray-600 mt-6 tracking-wider">
              © 2025 OnePG Technologies Pvt. Ltd. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Side: Login Card Form */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-[460px] bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative">
            {/* Small glow top-right inside card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5722]/10 rounded-full blur-xl pointer-events-none" />

            <div className="mb-6 flex flex-col items-center text-center lg:items-start lg:text-left">
              <Link to="/" className="lg:hidden mb-4">
                <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto" />
              </Link>
              <h3 className="text-2xl font-bold text-white mb-1">Welcome Back</h3>
              <p className="text-gray-400 text-sm">Login to your OnePG account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}

            {/* Social OAuth Signup/Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
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
                    Google
                  </>
                )}
              </button>

              <button 
                type="button"
                onClick={() => handleSocialAuth('apple')}
                disabled={!!isSocialLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
              >
                {isSocialLoading === 'apple' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.01.12-9.93-1.92-14.77-6.12-3.37-2.83-7.25-7.53-11.64-14.1-6.32-9.47-11.27-20.08-14.86-31.84-3.59-11.75-5.38-23.01-5.38-33.77 0-14.46 3.69-26.46 11.08-36 7.39-9.54 16.55-14.39 27.48-14.56 5.13 0 10.46 1.25 15.99 3.75 5.53 2.5 9.4 3.75 11.61 3.75 1.7 0 5.48-1.2 11.35-3.6 5.86-2.4 10.9-3.55 15.12-3.45 12.09.47 21.92 4.96 29.5 13.48-10.74 6.5-16.01 15.53-15.8 27.09.21 9.17 3.77 16.89 10.68 23.16 6.91 6.27 15.15 9.87 24.71 10.8-2.61 7.73-6.04 15.46-10.29 23.18zM119.22 31.42c0-7.39 2.71-14.46 8.13-21.21 5.42-6.75 12.18-10.63 20.28-11.64.12 1.05.18 1.98.18 2.79 0 7.33-2.78 14.42-8.33 21.26-5.56 6.84-12.44 10.75-20.64 11.73-.06-.93-.09-1.9-.09-2.93z"/>
                    </svg>
                    Apple
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b0c10] px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold shrink-0">
                Or with Email
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email / User ID</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email or user ID"
                  className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder-gray-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Enter your password"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none transition-all placeholder-gray-600"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center text-gray-400 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2 rounded border-white/10 bg-white/[0.03] text-[#FF5722] focus:ring-0 focus:ring-offset-0" 
                  />
                  Remember Me
                </label>
                <Link to="/forgot-password" className="text-[#FF5722] hover:underline font-medium">Forgot Password?</Link>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-[0_4px_20px_rgba(255,87,34,0.25)] flex items-center justify-center relative"
              >
                Login
                <ChevronRight size={16} className="absolute right-4 text-white" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account? <Link to="/signup" className="text-[#FF5722] hover:underline font-semibold">Sign Up Now</Link>
              </p>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
