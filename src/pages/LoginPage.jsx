import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Shield, Sparkles, Activity, Zap, CheckCircle, Eye, EyeOff } from 'lucide-react';
import loginImg from '../assets/login.png';
import logo from '../assets/Logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentClientId } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email === 'admin@onepg.in' && password === 'admin') {
      navigate('/admin');
    } else if (email === 'rahul@sharmaent.com' && password === 'password') {
      setCurrentClientId('OPG-2026-1045');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use quick login buttons below to test.');
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'client') {
      setEmail('rahul@sharmaent.com');
      setPassword('password');
      setCurrentClientId('OPG-2026-1045');
      navigate('/dashboard');
    } else if (role === 'admin') {
      setEmail('admin@onepg.in');
      setPassword('admin');
      navigate('/admin');
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
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between h-full min-h-[600px] pr-8 py-4">
          <div>
            <Link to="/">
              <img src={logo} alt="OnePG" className="h-10 w-auto mb-6" />
            </Link>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Simplifying Payments,<br />
              <span className="bg-gradient-to-r from-[#FF5722] to-[#FF8A65] bg-clip-text text-transparent">Powering Growth</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Access your merchant account, track your onboarding journey, and manage customer payouts seamlessly.
            </p>
          </div>

          {/* 3D Glowing Card Graphic Mockup */}
          <div className="my-8 relative flex items-center justify-center h-[280px] w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 group">
            <img 
              src={loginImg} 
              alt="Secure Payments" 
              className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Secure Badges */}
          <div className="grid grid-cols-4 gap-4 border-t border-white/5 pt-6 mt-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722] mb-1.5 border border-[#FF5722]/20">
                <Shield size={16} />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Secure</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-1.5 border border-[#00E5FF]/20">
                <CheckCircle size={16} />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Reliable</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-1.5 border border-orange-500/20">
                <Zap size={16} />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Fast</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 border border-emerald-500/20">
                <Sparkles size={16} />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Trusted</span>
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
                <img src={logo} alt="OnePG" className="h-8 w-auto" />
              </Link>
              <h3 className="text-2xl font-bold text-white mb-1">Welcome Back</h3>
              <p className="text-gray-400 text-sm">Login to your OnePG account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}

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
                className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-[0_4px_20px_rgba(255,87,34,0.25)] flex items-center justify-center"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Don't have an account? <Link to="/contact" className="text-[#FF5722] hover:underline font-semibold">Contact Us</Link>
              </p>
            </div>

            {/* Quick Testing Actions (highly useful) */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <p className="text-center text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-3">Quick Login (Testing Only)</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleQuickLogin('client')}
                  className="bg-white/[0.02] border border-white/5 hover:border-[#FF5722]/30 text-gray-300 hover:text-white py-2 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="text-gray-400 group-hover:text-[#FF5722] transition-colors">Client Portal</span>
                  <span className="text-[9px] text-gray-600 font-normal">Rahul Sharma</span>
                </button>
                <button 
                  onClick={() => handleQuickLogin('admin')}
                  className="bg-white/[0.02] border border-white/5 hover:border-[#00E5FF]/30 text-gray-300 hover:text-white py-2 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="text-gray-400 group-hover:text-[#00E5FF] transition-colors">Admin Portal</span>
                  <span className="text-[9px] text-gray-600 font-normal">Admin View</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
