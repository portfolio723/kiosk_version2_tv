import React, { useState } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { VirtualNumberKeypad } from '../components/VirtualKeypad';
import { Fabric, GarmentStyle, Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Check, Phone, User, Calendar, Clock, AlertCircle } from 'lucide-react';

interface K9InquiryFormProps {
  fabric: Fabric | null;
  garment: GarmentStyle;
  calculatedMetres: number;
  calculatedCost: number;
  customerName: string;
  customerPhone: string;
  preferredVisitTime: 'Today' | 'Tomorrow' | 'Later';
  specialRequests: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onVisitTimeChange: (time: 'Today' | 'Tomorrow' | 'Later') => void;
  onRequestChange: (req: string) => void;
  onSubmitInquiry: () => void;
  onSkip: () => void;
  onBack: () => void;
  language: Language;
}

export const K9InquiryForm: React.FC<K9InquiryFormProps> = ({
  fabric,
  garment,
  calculatedMetres,
  calculatedCost,
  customerName,
  customerPhone,
  preferredVisitTime,
  specialRequests,
  onNameChange,
  onPhoneChange,
  onVisitTimeChange,
  onRequestChange,
  onSubmitInquiry,
  onSkip,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<'name' | 'phone' | 'notes' | null>('phone');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleDigit = (digit: string) => {
    if (customerPhone.length < 10) {
      onPhoneChange(customerPhone + digit);
      setPhoneError(null);
    }
  };

  const handleBackspace = () => {
    if (customerPhone.length > 0) {
      onPhoneChange(customerPhone.slice(0, -1));
    }
  };

  const handleClear = () => {
    onPhoneChange('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playTouchFeedback('select');

    if (customerPhone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number.');
      setActiveField('phone');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      playTouchFeedback('success');
      setTimeout(() => {
        onSubmitInquiry();
      }, 900);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader onBack={onBack} showBack={true} />

      <div className="flex-1 min-h-0 flex flex-col items-center px-4 sm:px-6 py-4 max-w-[580px] mx-auto w-full overflow-y-auto">
        {/* Title */}
        <div className="text-center mb-3 sm:mb-4 shrink-0">
          <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
            {t.inquiryTitle}
          </h2>
          <p className="font-ui text-xs sm:text-sm text-[#EFD2A6]/80 mt-0.5">
            Reserve your tailored fabric cut and connect with a dedicated master stylist
          </p>
        </div>

        {/* YOUR LOOK SUMMARY CARD */}
        <div className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0C2B35]/90 border-2 border-[#EFD2A6]/30 shadow-md mb-4 shrink-0">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
            <span className="font-ui text-[10px] tracking-[0.25em] text-[#EFD2A6] uppercase font-bold">
              {t.yourLook}
            </span>
            <span className="font-ui text-[10px] text-white/50">Store Kiosk Hold</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-ui text-xs">
            <div>
              <span className="text-white/50 block text-[10px]">Fabric</span>
              <span className="font-display text-sm sm:text-base text-white font-bold truncate block">
                {fabric?.name || 'Kanjivaram Silk'}
              </span>
            </div>
            <div>
              <span className="text-white/50 block text-[10px]">Style</span>
              <span className="font-display text-sm sm:text-base text-white font-bold truncate block">
                {garment}
              </span>
            </div>
            <div>
              <span className="text-white/50 block text-[10px]">Total Metres</span>
              <span className="font-display text-sm sm:text-base text-white font-bold block">
                {calculatedMetres} m
              </span>
            </div>
            <div>
              <span className="text-white/50 block text-[10px]">Estimated Cost</span>
              <span className="font-display text-sm sm:text-base text-[#EFD2A6] font-bold block">
                ₹{calculatedCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full flex flex-col gap-3 sm:gap-4 mb-4">
          {/* 1. YOUR NAME */}
          <div>
            <label className="font-ui text-[10px] sm:text-xs tracking-[0.2em] text-[#EFD2A6] uppercase font-bold block mb-1 px-1">
              {t.yourName}
            </label>
            <div className="relative">
              <input
                type="text"
                value={customerName}
                onChange={(e) => onNameChange(e.target.value)}
                onFocus={() => setActiveField('name')}
                placeholder="Enter customer name"
                className="w-full h-11 sm:h-12 px-4 pl-10 rounded-xl bg-[#07222B] border-2 border-[#EFD2A6]/30 text-white font-ui text-sm sm:text-base focus:border-[#EFD2A6] focus:outline-none shadow-sm placeholder-white/30"
              />
              <User className="w-4 h-4 text-[#EFD2A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 2. PHONE NUMBER WITH +91 */}
          <div>
            <div className="flex items-center justify-between mb-1 px-1">
              <label className="font-ui text-[10px] sm:text-xs tracking-[0.2em] text-[#EFD2A6] uppercase font-bold">
                {t.phoneNumber} (WHATSAPP & SMS)
              </label>
              <span className="font-ui text-[10px] sm:text-xs text-white/50 font-semibold">
                {customerPhone.length}/10 digits
              </span>
            </div>

            <div
              onClick={() => setActiveField('phone')}
              className={`relative flex items-center h-11 sm:h-12 px-4 rounded-xl bg-[#07222B] border-2 cursor-pointer shadow-sm ${
                phoneError
                  ? 'border-rose-400'
                  : activeField === 'phone'
                  ? 'border-[#EFD2A6]'
                  : 'border-[#EFD2A6]/30'
              }`}
            >
              <Phone className="w-4 h-4 text-[#EFD2A6] mr-2.5" />
              <span className="font-display text-base sm:text-lg text-[#EFD2A6] font-bold mr-2.5">
                +91
              </span>
              <span className="font-display text-lg sm:text-xl text-white font-bold tracking-wider flex-1">
                {customerPhone ? (
                  customerPhone.replace(/(\d{5})(\d{1,5})/, '$1 $2')
                ) : (
                  <span className="text-white/30 text-xs sm:text-sm font-ui font-normal">
                    Tap to type 10-digit number
                  </span>
                )}
              </span>
            </div>

            {phoneError && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-1.5 px-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{phoneError}</span>
              </div>
            )}
          </div>

          {/* On-screen Numeric Keypad for Physical Touch Kiosk */}
          {activeField === 'phone' && (
            <div className="my-1">
              <VirtualNumberKeypad
                onNumberClick={handleDigit}
                onBackspace={handleBackspace}
                onClear={handleClear}
              />
            </div>
          )}

          {/* 3. PREFERRED VISIT TIME */}
          <div>
            <label className="font-ui text-[10px] sm:text-xs tracking-[0.2em] text-[#EFD2A6] uppercase font-bold block mb-1 px-1">
              {t.visitTime}
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['Today', 'Tomorrow', 'Later'] as const).map((time) => {
                const isSelected = preferredVisitTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      playTouchFeedback('select');
                      onVisitTimeChange(time);
                    }}
                    className={`h-10 sm:h-12 rounded-xl border-2 font-display text-sm sm:text-base font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                        : 'bg-[#07222B] text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
                    }`}
                  >
                    <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#07222B]' : 'text-[#EFD2A6]'}`} />
                    <span>{time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. SPECIAL REQUESTS */}
          <div>
            <label className="font-ui text-[10px] sm:text-xs tracking-[0.2em] text-[#EFD2A6] uppercase font-bold block mb-1 px-1">
              {t.specialRequests} (OPTIONAL)
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => onRequestChange(e.target.value)}
              onFocus={() => setActiveField('notes')}
              placeholder="E.g. In-store master tailoring requested, matching jewelry consultation..."
              className="w-full p-2.5 sm:p-3 rounded-xl bg-[#07222B] border-2 border-[#EFD2A6]/30 text-white font-ui text-xs sm:text-sm focus:border-[#EFD2A6] focus:outline-none shadow-sm placeholder-white/30 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="w-full px-4 sm:px-6 py-3 border-t border-[#EFD2A6]/20 bg-[#07222B]/95 backdrop-blur-md flex flex-col items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={submitting}
          className={`w-full max-w-[440px] h-12 sm:h-14 md:h-16 rounded-full font-ui font-extrabold text-base sm:text-xl tracking-widest uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${
            submitted
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] hover:shadow-lg border-2 border-white/50'
          }`}
        >
          {submitted ? (
            <>
              <Check className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t.submitted}</span>
            </>
          ) : submitting ? (
            <span>{t.submitting}</span>
          ) : (
            <span>{t.submitInquiry}</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            playTouchFeedback('tap');
            onSkip();
          }}
          className="text-white/60 hover:text-white font-ui text-xs sm:text-sm font-medium py-0.5 transition-colors"
        >
          {t.noThanks}
        </button>
      </div>
    </div>
  );
};
