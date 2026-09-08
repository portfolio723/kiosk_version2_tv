import React, { useState } from 'react';
import { useWebApp } from '../WebAppContext';
import { Phone, User, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const W2SignUp: React.FC = () => {
  const { setCurrentScreen, signUp } = useWebApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpError('');
    setOtpSent(true);
    // Pre-fill demo OTP 723491 for instant smooth testing
    setOtp(['7', '2', '3', '4', '9', '1']);
    setOtpCountdown(30);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setOtpError('Please enter your full name.');
      return;
    }
    if (!otpSent) {
      setOtpError('Please click SEND OTP to verify your mobile number.');
      return;
    }
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setOtpError('Please enter the full 6-digit OTP.');
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifying(false);
      signUp({
        fullName: fullName.trim(),
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        email: email.trim() || undefined,
      });
    }, 600);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#07222B] text-white flex items-center justify-center py-8 sm:py-14 px-4 select-none">
      <div className="w-full max-w-[1040px] bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Fashion Image & Brand Inspiration (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-gradient-to-t from-[#07222B] via-transparent to-black/30 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
            alt="Padavala Royal Bridal Weaves"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#07222B]/75 backdrop-blur-[2px] -z-10" />

          <div className="flex items-center gap-3">
            <img
              src="/assets/padavala-Logo.png"
              alt="Padavala Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-display tracking-[0.35em] text-[#EFD2A6] text-xl font-bold uppercase">
              PADAVALA
            </span>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFD2A6]/20 border border-[#EFD2A6]/40 text-[#EFD2A6] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Patron Portal</span>
            </div>
            <h3 className="font-display text-2xl text-white font-normal leading-snug">
              "Every thread holds a story, every drape reflects royalty."
            </h3>
            <p className="font-ui text-xs text-white/70">
              Create an account to save custom virtual drapes, store body measurements, and collaborate directly with master tailors.
            </p>
          </div>

          <div className="text-[11px] text-white/50 font-ui">
            Padavala Couture · Handwoven Since 1974
          </div>
        </div>

        {/* Right Side: Account Creation Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
              Create Your Account
            </h2>
            <p className="font-ui text-xs sm:text-sm text-white/70 mt-1">
              Join Padavala for personalized AI styling and bespoke lookbooks.
            </p>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-4 sm:space-y-5 font-ui">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]/70" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone Number with Send OTP */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                Phone Number *
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
                    className="w-full h-11 sm:h-12 pl-12 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-4 h-11 sm:h-12 rounded-xl bg-[#EFD2A6] text-[#07222B] text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all shrink-0"
                >
                  {otpSent ? 'RESEND OTP' : 'SEND OTP'}
                </button>
              </div>
              {otpSent && (
                <p className="text-[11px] text-emerald-300 mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OTP sent to +91 {phone || 'XXXXX XXXXX'}</span>
                </p>
              )}
            </div>

            {/* OTP 6-Boxes Input */}
            {otpSent && (
              <div className="p-4 rounded-2xl bg-[#07222B]/80 border border-[#EFD2A6]/20 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 font-medium">Enter 6-Digit OTP</span>
                  <span className="text-[#EFD2A6]">Demo Code: 723491</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 sm:w-12 h-12 rounded-xl bg-[#0C2B35] border border-[#EFD2A6]/40 text-center text-lg font-bold text-white focus:border-[#EFD2A6] focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                Email Address <span className="text-white/40 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl bg-[#07222B] border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1.5">
                Set Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]/70" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Error Banner if any */}
            {otpError && (
              <p className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/50">
                {otpError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-[0_0_20px_rgba(239,210,166,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isVerifying ? (
                <span>VERIFYING...</span>
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Link to Login */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-white/70">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W3')}
                  className="text-[#EFD2A6] font-bold underline underline-offset-4 hover:text-white transition-colors"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
