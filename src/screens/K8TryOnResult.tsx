import React, { useState } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { Fabric, GarmentStyle, Language, KioskMode } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Heart, Smartphone, ShoppingBag, RotateCcw, Check, Share2, Layers } from 'lucide-react';

interface K8TryOnResultProps {
  customerPhotoUrl: string | null;
  fabric: Fabric | null;
  garment: GarmentStyle;
  calculatedMetres: number;
  calculatedCost: number;
  mode: KioskMode;
  onBuyThis: () => void;
  onTryAnother: () => void;
  onBack: () => void;
  language: Language;
}

export const K8TryOnResult: React.FC<K8TryOnResultProps> = ({
  customerPhotoUrl,
  fabric,
  garment,
  calculatedMetres,
  calculatedCost,
  mode,
  onBuyThis,
  onTryAnother,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSaved, setIsSaved] = useState(false);
  const [sendPhoneSuccess, setSendPhoneSuccess] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');

  // The high quality try on result visual
  const tryOnResultImage =
    fabric?.tryOnPreviewUrl ||
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop';

  const beforeImage = customerPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';

  const handleBuy = () => {
    playTouchFeedback('success');
    onBuyThis();
  };

  const handleSave = () => {
    playTouchFeedback('select');
    setIsSaved(!isSaved);
  };

  const handleSendPhone = () => {
    playTouchFeedback('tap');
    setShowPhoneModal(true);
  };

  const submitQuickPhone = () => {
    if (quickPhone.length >= 10) {
      playTouchFeedback('success');
      setSendPhoneSuccess(true);
      setTimeout(() => {
        setShowPhoneModal(false);
        setSendPhoneSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader onBack={onBack} showBack={true} />

      <div className="flex-1 min-h-0 flex flex-col items-center px-4 sm:px-6 py-3 max-w-[580px] mx-auto w-full overflow-y-auto">
        {/* Title Header */}
        <div className="text-center mb-3 shrink-0">
          <span className="font-ui text-[10px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold block mb-0.5">
            BESPOKE VIRTUAL TRY-ON
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
            {t.resultTitle}
          </h2>
        </div>

        {/* Visual Priority AI Try-On Result */}
        <div className="relative w-full max-w-[440px] aspect-[3/4] max-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#EFD2A6] shadow-xl bg-[#07222B] mb-4 shrink-0">
          {!showBeforeAfter ? (
            /* Standard Full AI Result View */
            <div className="relative w-full h-full">
              <img
                src={tryOnResultImage}
                alt="AI Virtual Try-On Result"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07222B]/90 via-transparent to-transparent" />

              {/* Floating Quality Insignia */}
              <div className="absolute top-3 left-3 px-3.5 py-2 rounded-full bg-[#0C2B35]/85 backdrop-blur-md border border-[#EFD2A6]/40 text-[#EFD2A6] font-ui text-xs font-semibold flex items-center gap-2 shadow-md">
                <img
                  src="/assets/padavala-Logo.png"
                  alt="Padavala"
                  className="h-6 w-auto object-contain drop-shadow-sm"
                />
                <span>Padavala AI Real-Drape™</span>
              </div>
            </div>
          ) : (
            /* Interactive Before | After Comparison */
            <div className="relative w-full h-full select-none">
              {/* After (Full) */}
              <img
                src={tryOnResultImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Before (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-[#EFD2A6]"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeImage}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                />
              </div>

              {/* Comparison Drag Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#EFD2A6] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#EFD2A6] text-[#07222B] font-bold text-xs flex items-center justify-center shadow-lg">
                  ⇄
                </div>
              </div>

              {/* Slider Input overlay */}
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-ui text-[10px] uppercase font-bold">
                Before
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-[10px] uppercase font-bold">
                After
              </div>
            </div>
          )}

          {/* Toggle Before/After pill on bottom-right of image */}
          <div className="absolute bottom-3 right-3">
            <button
              type="button"
              onClick={() => {
                playTouchFeedback('tap');
                setShowBeforeAfter(!showBeforeAfter);
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#0C2B35]/90 border border-[#EFD2A6]/40 text-[#EFD2A6] font-ui text-xs font-semibold flex items-center gap-1.5 shadow-md backdrop-blur-md active:scale-95 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showBeforeAfter ? 'Single View' : 'Before | After'}</span>
            </button>
          </div>
        </div>

        {/* Look Summary & Pricing Details */}
        <div className="w-full max-w-[440px] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0C2B35]/80 border-2 border-[#EFD2A6]/30 flex items-center justify-between shadow-md mb-3 shrink-0">
          <div className="min-w-0 pr-2">
            <div className="font-display text-base sm:text-lg text-white font-bold truncate">
              {fabric?.name || 'Kanjivaram Silk'} — {garment}
            </div>
            <div className="font-ui text-xs sm:text-sm text-[#EFD2A6] mt-0.5 truncate">
              {calculatedMetres} metres total fabric ({fabric?.type})
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-ui text-[10px] text-white/50 block uppercase tracking-wider">
              Estimated Total
            </span>
            <div className="font-display text-xl sm:text-2xl text-[#EFD2A6] font-bold">
              ₹{calculatedCost.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Tertiary Actions: Try Another & Save Look */}
        <div className="w-full max-w-[440px] grid grid-cols-2 gap-2 sm:gap-3 mb-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              playTouchFeedback('tap');
              onTryAnother();
            }}
            className="h-11 sm:h-12 rounded-xl bg-[#07222B] border-2 border-[#EFD2A6]/30 text-white/90 font-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:border-[#EFD2A6] active:scale-98 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-[#EFD2A6]" />
            <span>{t.tryAnother}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`h-11 sm:h-12 rounded-xl border-2 font-ui text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-all ${
              isSaved
                ? 'bg-rose-950/40 border-rose-400 text-rose-300'
                : 'bg-[#07222B] border-[#EFD2A6]/30 text-white/90 hover:border-[#EFD2A6]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400 text-rose-400' : 'text-[#EFD2A6]'}`} />
            <span>{isSaved ? 'Look Saved ✓' : t.saveLook}</span>
          </button>
        </div>
      </div>

      {/* Primary & Secondary CTAs Bar */}
      <div className="w-full px-4 sm:px-6 py-3 border-t border-[#EFD2A6]/20 bg-[#07222B]/95 backdrop-blur-md flex flex-col items-center gap-2 shrink-0">
        {/* Secondary: SEND TO MY PHONE */}
        <button
          type="button"
          onClick={handleSendPhone}
          className="w-full max-w-[440px] h-11 sm:h-12 rounded-full bg-[#0C2B35] border-2 border-[#EFD2A6]/40 hover:border-[#EFD2A6] text-[#EFD2A6] font-ui font-bold text-xs sm:text-sm tracking-wider uppercase active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Smartphone className="w-4 h-4 text-[#EFD2A6]" />
          <span>{t.sendToPhone}</span>
        </button>

        {/* Primary (Strongest): I WANT TO BUY THIS */}
        <button
          type="button"
          onClick={handleBuy}
          className="w-full max-w-[440px] h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-extrabold text-base sm:text-xl tracking-widest uppercase shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border-2 border-white/50"
        >
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#07222B]" />
          <span>{t.buyThisCta}</span>
        </button>
      </div>

      {/* Quick Phone Send Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="w-full max-w-[620px] p-8 rounded-[36px] bg-[#0C2B35] border-2 border-[#EFD2A6] shadow-2xl flex flex-col items-center text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#EFD2A6]/20 border border-[#EFD2A6] flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-[#EFD2A6]" />
            </div>
            <h3 className="font-display text-3xl text-white font-bold mb-2">
              Send Look to Your Mobile
            </h3>
            <p className="font-ui text-base text-white/70 mb-6">
              Enter your WhatsApp / SMS number to receive your high-res virtual try-on render & fabric quote.
            </p>

            {sendPhoneSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-400 text-emerald-300 flex items-center gap-3 font-ui font-bold text-lg">
                <Check className="w-6 h-6" />
                <span>Link sent to +91 {quickPhone}!</span>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center h-[76px] px-6 rounded-2xl bg-[#07222B] border-2 border-[#EFD2A6]/40 focus-within:border-[#EFD2A6]">
                  <span className="font-ui text-2xl text-[#EFD2A6] font-bold mr-4">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile"
                    className="w-full bg-transparent text-white font-display text-2xl placeholder-white/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowPhoneModal(false)}
                    className="h-[68px] rounded-2xl bg-[#07222B] border border-white/20 text-white font-ui text-base font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitQuickPhone}
                    className="h-[68px] rounded-2xl bg-[#EFD2A6] text-[#07222B] font-ui text-base font-bold uppercase tracking-wider"
                  >
                    Send Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
