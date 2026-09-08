import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Fabric, GarmentStyle, Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Check, Smartphone, RotateCcw, ExternalLink } from 'lucide-react';

interface K10ThankYouProps {
  fabric: Fabric | null;
  garment: GarmentStyle;
  calculatedCost: number;
  customerName: string;
  sessionId: string;
  onStartNewSession: () => void;
  language: Language;
}

export const K10ThankYou: React.FC<K10ThankYouProps> = ({
  fabric,
  garment,
  calculatedCost,
  customerName,
  sessionId,
  onStartNewSession,
  language,
}) => {
  const t = translations[language];
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onStartNewSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onStartNewSession]);

  const handleReset = () => {
    playTouchFeedback('select');
    onStartNewSession();
  };

  // Generate web look link
  const lookWebUrl = `${window.location.origin}?session=${sessionId}&look=${fabric?.id || 'kanjivaram'}`;

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-8 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="pt-2 sm:pt-4 flex flex-col items-center shrink-0">
        <BrandLogo size="md" showSubmark={true} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center max-w-[500px] w-full my-auto py-3">
        {/* Large Gold Checkmark Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#EFD2A6] to-[#F8EAD3] text-[#07222B] flex items-center justify-center shadow-lg mb-3 sm:mb-5 shrink-0">
          <Check className="w-9 h-9 sm:w-11 sm:h-11 stroke-[3]" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-1 shrink-0">
          {t.thankYouTitle}
        </h2>
        {customerName && (
          <p className="font-display text-base sm:text-lg text-[#EFD2A6] mb-1 shrink-0">
            Dear {customerName},
          </p>
        )}
        <p className="font-ui text-xs sm:text-sm text-white/80 max-w-sm mb-4 sm:mb-6 leading-relaxed shrink-0">
          {t.thankYouDesc}
        </p>

        {/* QR Code Card Frame */}
        <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#EFD2A6] shadow-xl text-[#07222B] shrink-0">
          <span className="font-ui text-[10px] sm:text-xs tracking-[0.2em] text-[#07222B]/70 uppercase font-bold mb-2 sm:mb-3">
            {t.scanQrNotice}
          </span>

          {/* High-Resolution SVG QR Code Representation with Padavala Insignia */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-white p-1 rounded-xl flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="#07222B"
            >
              {/* Corner Position Detection Blocks */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="#07222B" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="#07222B" />

              <rect x="69" y="5" width="26" height="26" rx="4" fill="#07222B" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="#07222B" />

              <rect x="5" y="69" width="26" height="26" rx="4" fill="#07222B" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="#07222B" />

              {/* Data Matrix Dots */}
              <circle cx="42" cy="18" r="3" />
              <circle cx="54" cy="18" r="3" />
              <circle cx="42" cy="30" r="3" />
              <circle cx="58" cy="30" r="3" />

              <circle cx="18" cy="46" r="3" />
              <circle cx="30" cy="46" r="3" />
              <circle cx="42" cy="46" r="3" />
              <circle cx="58" cy="46" r="3" />
              <circle cx="70" cy="46" r="3" />
              <circle cx="82" cy="46" r="3" />

              <circle cx="46" cy="58" r="3" />
              <circle cx="62" cy="58" r="3" />
              <circle cx="74" cy="58" r="3" />
              <circle cx="86" cy="58" r="3" />

              <circle cx="38" cy="74" r="3" />
              <circle cx="50" cy="74" r="3" />
              <circle cx="66" cy="74" r="3" />
              <circle cx="82" cy="74" r="3" />

              <circle cx="42" cy="86" r="3" />
              <circle cx="58" cy="86" r="3" />
              <circle cx="70" cy="86" r="3" />
              <circle cx="86" cy="86" r="3" />
            </svg>

            {/* Centered Golden Lotus Glyph Badge */}
            <div className="absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#07222B] border-2 border-[#EFD2A6] flex items-center justify-center shadow-lg">
              <span className="font-display font-bold text-[#EFD2A6] text-xs sm:text-sm">P</span>
            </div>
          </div>

          <span className="font-ui text-[10px] sm:text-xs text-[#07222B]/80 font-bold mt-2 sm:mt-3">
            Session #{sessionId.slice(0, 8).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bottom Session Reset Section */}
      <div className="w-full flex flex-col items-center gap-3 pb-2 sm:pb-4 shrink-0 z-20">
        <button
          type="button"
          onClick={handleReset}
          className="w-full max-w-[440px] h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-extrabold text-base sm:text-xl tracking-widest uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-2 border-white/50"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#07222B]" />
          <span>{t.startNewSession}</span>
        </button>

        {/* Auto-reset Countdown Callout */}
        <div className="flex items-center gap-2 font-ui text-xs sm:text-sm text-[#EFD2A6]/90 font-medium">
          <div className="w-2 h-2 rounded-full bg-[#EFD2A6] animate-ping" />
          <span>{t.resetTimerText(countdown)}</span>
        </div>
      </div>
    </div>
  );
};
