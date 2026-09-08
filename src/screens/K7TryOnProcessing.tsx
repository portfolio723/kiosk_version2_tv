import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Fabric, GarmentStyle, Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Shirt, X } from 'lucide-react';

interface K7TryOnProcessingProps {
  fabric: Fabric | null;
  garment: GarmentStyle;
  onComplete: () => void;
  onCancel: () => void;
  language: Language;
}

export const K7TryOnProcessing: React.FC<K7TryOnProcessingProps> = ({
  fabric,
  garment,
  onComplete,
  onCancel,
  language,
}) => {
  const t = translations[language];
  const [progress, setProgress] = useState(12);

  const statusMessages = [
    t.processingMsg1, // Draping the fabric...
    t.processingMsg2, // Matching your style...
    t.processingMsg3, // Creating your look...
    t.processingMsg4, // Almost ready...
  ];

  const currentStatusIndex = Math.min(
    Math.floor((progress / 100) * statusMessages.length),
    statusMessages.length - 1
  );

  useEffect(() => {
    // Smooth, realistic 0 -> 100 progress over ~5.5s
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          playTouchFeedback('success');
          setTimeout(onComplete, 500);
          return 100;
        }
        const increment = prev < 60 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleCancel = () => {
    playTouchFeedback('tap');
    onCancel();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-10 select-none overflow-hidden">
      {/* Top Header */}
      <div className="pt-2 sm:pt-4 flex flex-col items-center shrink-0">
        <BrandLogo size="md" showSubmark={true} />
      </div>

      {/* Main Emotionally Reassuring Container */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center max-w-[500px] w-full my-auto py-4">
        {/* Subtle Animated Aura & Tailoring Emblem */}
        <div className="relative mb-5 sm:mb-8 shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#EFD2A6]/20 to-[#EFD2A6]/40 border-2 border-[#EFD2A6]/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,210,166,0.25)] animate-pulse">
            <Shirt className="w-9 h-9 sm:w-11 sm:h-11 text-[#EFD2A6]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal tracking-tight mb-2 shrink-0">
          {t.createLookTitle}
        </h2>
        <p className="font-ui text-xs sm:text-sm md:text-base text-[#EFD2A6] mb-6 sm:mb-8 font-medium px-2 shrink-0">
          Draping {fabric?.name || 'Selected Fabric'} into bespoke {garment}
        </p>

        {/* Tactile Progress Bar Container */}
        <div className="w-full max-w-[380px] flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6 shrink-0 px-4">
          <div className="w-full h-3 sm:h-3.5 rounded-full bg-[#07222B] border-2 border-[#EFD2A6]/30 overflow-hidden shadow-inner p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(239,210,166,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="font-display text-2xl sm:text-3xl text-[#EFD2A6] font-bold">
            {progress}%
          </div>
        </div>

        {/* Changing Empathetic Status Message */}
        <div className="min-h-[2rem] flex items-center justify-center mb-3 px-2 shrink-0">
          <span className="font-ui text-base sm:text-xl text-white/90 tracking-wide font-light animate-fadeIn">
            {statusMessages[currentStatusIndex]}
          </span>
        </div>

        {/* Time Reassurance */}
        <p className="font-ui text-xs sm:text-sm text-white/50 tracking-wider shrink-0">
          {t.processingNote}
        </p>
      </div>

      {/* Cancel Action */}
      <div className="pb-2 sm:pb-4 shrink-0">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#0C2B35]/70 border border-[#EFD2A6]/30 text-white/80 font-ui text-sm sm:text-base font-semibold hover:text-[#EFD2A6] active:scale-95 transition-all flex items-center gap-2"
        >
          <X className="w-4 h-4 text-white/60" />
          <span>{t.cancelBtn}</span>
        </button>
      </div>
    </div>
  );
};
