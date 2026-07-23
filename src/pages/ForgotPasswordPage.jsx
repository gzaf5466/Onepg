import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { KeyRound, Mail, ArrowLeft, CheckCircle, ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';
import logo from '../assets/Logo.svg';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { requestPasswordReset, verifyResetOtp, resetPassword } = useContext(AppContext);

  const [step, setStep] = useState(1); // 1: Request Email, 2: Enter OTP, 3: Reset Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Request Reset Link / OTP
  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid merchant email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const res = await requestPasswordReset(email);
    setIsSubmitting(false);

    if (res.success) {
      setStep(2);
    } else {
      setError(res.message || 'Failed to send verification code.');
    }
  };

  // Handle OTP Digit Input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter the full 4-digit verification code sent to your email.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const res = await verifyResetOtp(email, otpCode);
    setIsSubmitting(false);

    if (res.success) {
      setStep(3);
    } else {
      setError(res.message || 'Invalid or expired verification code.');
    }
  };

  // Handle Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const otpCode = otp.join('');
    const res = await resetPassword(email, otpCode, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setStep(4);
    } else {
      setError(res.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Decorative Glowing Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-[#FF5722]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[480px] bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Top Header Logo */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <img src={logo} alt="OnePG" width="95" height="33" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <ShieldCheck size={14} />
            Secure Recovery
          </div>
        </div>

        {/* Step 1: Request Email Form */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] mb-4">
                <KeyRound size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                Enter your registered merchant email address and we'll send you a 4-digit verification code to reset your account password.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Merchant Email Address
                </label>
                <div className="relative">
                  <input 
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="merchant@onepg.co.in"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-all placeholder-gray-600"
                  />
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,87,34,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Verification / OTP Entry */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] mb-4">
                <Mail size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Reset Code</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                We sent a 4-digit code to <span className="text-white font-medium">{email}</span>. Please enter it below.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-3">
                {otp.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`otp-input-${idx}`}
                    name={`otp-digit-${idx}`}
                    type="text"
                    aria-label={`Digit ${idx + 1} of verification code`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 bg-white/[0.03] border border-white/15 focus:border-[#00E5FF] text-center text-xl font-bold text-white rounded-xl focus:outline-none transition-all"
                  />
                ))}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00E5FF] hover:bg-[#00c4dc] text-black py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(0,229,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Verify Code'
                )}
              </button>

              <div className="text-center text-xs text-gray-500">
                Didn't receive the code?{' '}
                <button 
                  type="button" 
                  onClick={() => setError('Verification code resent successfully.')} 
                  className="text-[#00E5FF] hover:underline font-semibold"
                >
                  Resend Code
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: New Password Form */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Set New Password</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                Choose a strong new password for your OnePG merchant account.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-new-password" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">New Password</label>
                <div className="relative">
                  <input 
                    id="reset-new-password"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none transition-all placeholder-gray-600"
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

              <div>
                <label htmlFor="reset-confirm-password" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input 
                  id="reset-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                  placeholder="Re-enter password"
                  className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-gray-600"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,87,34,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success State */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-fadeIn py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Password Changed!</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xs mx-auto">
                Your merchant password has been successfully updated. You can now log into your dashboard.
              </p>
            </div>

            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-[#FF5722] hover:bg-[#e64e1e] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,87,34,0.3)]"
            >
              Proceed to Login
            </button>
          </div>
        )}

        {/* Bottom Back to Login Link */}
        {step !== 4 && (
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
