import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { playTouchFeedback } from '../utils/audio';

interface KioskHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  currentStep?: number;
  totalSteps?: number;
  stepLabel?: string;
  onBrandClick?: () => void;
  brandOnly?: boolean;
  className?: string;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  onBack,
  showBack = true,
  currentStep,
  totalSteps = 4,
  stepLabel,
  onBrandClick,
  brandOnly = false,
  className = '',
}) => {
  const handleBack = () => {
    playTouchFeedback('tap');
    if (onBack) onBack();
  };

  if (brandOnly) {
    return (
      <header className={`w-full pt-6 sm:pt-10 pb-4 sm:pb-6 flex flex-col items-center justify-center border-b border-[#EFD2A6]/15 ${className}`}>
        <BrandLogo size="md" showSubmark={true} onClick={onBrandClick} />
      </header>
    );
  }

  return (
    <header className={`w-full px-4 sm:px-8 pt-3 sm:pt-6 pb-3 sm:pb-4 flex flex-col border-b border-[#EFD2A6]/15 backdrop-blur-sm z-30 shrink-0 ${className}`}>
      {/* Top Bar: Back Action + PADAVALA Brand Mark */}
      <div className="flex items-center justify-between min-h-[44px] sm:min-h-[52px]">
        {showBack && onBack ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0C2B35]/70 border border-[#EFD2A6]/30 text-[#EFD2A6] active:scale-95 transition-all text-sm sm:text-base font-medium shadow-sm hover:bg-[#0C2B35]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFD2A6]" />
            <span className="font-ui">Back</span>
          </button>
        ) : (
          <div className="w-8" />
        )}

        {/* Brand Mark */}
        <div
          onClick={() => {
            playTouchFeedback('tap');
            if (onBrandClick) onBrandClick();
          }}
          className="cursor-pointer active:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/assets/padavala-Logo.png"
              alt="Padavala Logo"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-sm"
            />
            <span className="font-display tracking-[0.35em] text-[#EFD2A6] text-xl sm:text-2xl font-bold uppercase">
              PADAVALA
            </span>
          </div>
        </div>

        {/* Right Balancer */}
        <div className="w-12 sm:w-16 flex justify-end">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EFD2A6]/40" />
        </div>
      </div>

      {/* Step Progress Bar (if step 1 to 4) */}
      {currentStep !== undefined && (
        <div className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#EFD2A6]/80 uppercase">
            <span>{stepLabel || `STEP ${currentStep} OF ${totalSteps}`}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          {/* Visual Step Bar */}
          <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden border border-[#EFD2A6]/20">
            <div
              className="h-full bg-gradient-to-r from-[#EFD2A6] to-[#F8EAD3] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(239,210,166,0.5)]"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
