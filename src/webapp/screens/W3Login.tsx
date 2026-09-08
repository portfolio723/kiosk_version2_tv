import React, { useState } from 'react';
import { useWebApp } from '../WebAppContext';
import { Phone, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const W3Login: React.FC = () => {
  const { setCurrentScreen, login } = useWebApp();

  const [activeTab, setActiveTab] = useState<'otp' | 'email'>('otp');
  const [phone, setPhone] = useState('98450 12345');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['7', '2', '3', '4', '9', '1']);
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setOtpSent(true);
    setOtp(['7', '2', '3', '4', '9', '1']);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (activeTab === 'otp') {
        login({
          phone: `+91 ${phone}`,
          fullName: 'Ananya Sharma',
        });
      } else {
        login({
          email: email,
          fullName: 'Ananya Sharma',
        });
      }
    }, 500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#07222B] text-white flex items-center justify-center py-10 px-4 select-none">
      <div className="w-full max-w-[480px] bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 shadow-2xl p-6 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <img
              src="/assets/padavala-Logo.png"
              alt="Padavala"
              className="h-8 w-auto object-contain"
            />
            <span className="font-display text-xl font-bold tracking-[0.35em] text-[#EFD2A6]">
              PADAVALA
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
            Welcome Back
          </h2>
          <p className="font-ui text-xs sm:text-sm text-white/70 mt-1">
            Access your saved lookbooks, measurements, and bespoke orders.
          </p>
        </div>

        {/* Two-Tab Login Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 mb-6 font-ui">
          <button
            type="button"
            onClick={() => {
              setActiveTab('otp');
              setError('');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'otp'
                ? 'bg-[#EFD2A6] text-[#07222B] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            OTP LOGIN
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setError('');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'email'
                ? 'bg-[#EFD2A6] text-[#07222B] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            EMAIL LOGIN
          </button>
        </div>

        {/* Tab Content Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5 font-ui">
          {activeTab === 'otp' ? (
            <>
              {/* Phone Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#EFD2A6]">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-3.5 h-12 rounded-xl bg-[#EFD2A6] text-[#07222B] text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all shrink-0"
                  >
                    {otpSent ? 'RESEND' : 'SEND OTP'}
                  </button>
                </div>
                {otpSent && (
                  <p className="text-[11px] text-emerald-300 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>OTP sent to +91 {phone}</span>
                  </p>
                )}
              </div>

              {/* 6-box OTP entry */}
              <div className="p-4 rounded-2xl bg-[#07222B]/80 border border-[#EFD2A6]/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 font-medium">OTP Code</span>
                  <span className="text-[#EFD2A6]">Demo: 723491</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`login-otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 sm:w-11 h-12 rounded-xl bg-[#0C2B35] border border-[#EFD2A6]/40 text-center text-lg font-bold text-white focus:border-[#EFD2A6] focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Email Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]/70" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]/70" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {error && (
            <p className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/50">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-[0_0_20px_rgba(239,210,166,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>VERIFYING & LOGGING IN...</span>
            ) : (
              <>
                <span>LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-white/70">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentScreen('W2')}
                className="text-[#EFD2A6] font-bold underline underline-offset-4 hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
