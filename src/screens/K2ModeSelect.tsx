import React from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { KioskMode, Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Scissors, Camera, Shirt, Palette, ChevronRight } from 'lucide-react';

interface K2ModeSelectProps {
  onSelectMode: (mode: KioskMode) => void;
  onBack: () => void;
  language: Language;
}

export const K2ModeSelect: React.FC<K2ModeSelectProps> = ({
  onSelectMode,
  onBack,
  language,
}) => {
  const t = translations[language];

  const modes: {
    id: KioskMode;
    icon: React.ReactNode;
    title: string;
    description: string;
    tag: string;
  }[] = [
    {
      id: 'try_on',
      icon: <Shirt className="w-12 h-12 text-[#EFD2A6]" />,
      title: t.modes.tryOnTitle,
      description: t.modes.tryOnDesc,
      tag: 'Most Popular',
    },
    {
      id: 'recreate',
      icon: <Camera className="w-12 h-12 text-[#EFD2A6]" />,
      title: t.modes.recreateTitle,
      description: t.modes.recreateDesc,
      tag: 'Inspiration Match',
    },
    {
      id: 'design',
      icon: <Scissors className="w-12 h-12 text-[#EFD2A6]" />,
      title: t.modes.designTitle,
      description: t.modes.designDesc,
      tag: 'AI Bespoke Studio',
    },
    {
      id: 'upload_cloth',
      icon: <Palette className="w-12 h-12 text-[#EFD2A6]" />,
      title: t.modes.uploadTitle,
      description: t.modes.uploadDesc,
      tag: 'Custom Fabric Try-On',
    },
  ];

  const handleChoose = (mode: KioskMode) => {
    playTouchFeedback('select');
    onSelectMode(mode);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader onBack={onBack} showBack={true} />

      {/* Main Container */}
      <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[640px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
        {/* Screen Title */}
        <div className="text-center mb-4 sm:mb-6 shrink-0">
          <span className="font-ui text-[10px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-semibold block mb-1">
            KIOSK TOUCH EXPERIENCE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
            {t.modes.title}
          </h2>
        </div>

        {/* Four Touch Choice Cards */}
        <div className="w-full flex flex-col gap-3 sm:gap-4 pb-4">
          {modes.map((item) => (
            <button
              key={item.id}
              onClick={() => handleChoose(item.id)}
              className="group relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-left transition-all duration-200 bg-[#0C2B35]/80 hover:bg-[#0E3440] border-2 border-[#EFD2A6]/25 hover:border-[#EFD2A6] active:border-[#EFD2A6] active:scale-[0.98] shadow-md flex items-center justify-between gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                {/* Distinct Touch Icon Container */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#07222B] border border-[#EFD2A6]/40 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-[#EFD2A6] transition-transform shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: 'w-6 h-6 sm:w-8 sm:h-8 text-[#EFD2A6]',
                  })}
                </div>

                {/* Text Hierarchy */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-display text-lg sm:text-xl md:text-2xl text-[#EFD2A6] font-bold tracking-wide truncate">
                      {item.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-ui tracking-wider uppercase font-semibold bg-[#EFD2A6]/15 text-[#EFD2A6] border border-[#EFD2A6]/30 shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-ui text-xs sm:text-sm text-white/80 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Chevron Pill */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#07222B] border border-[#EFD2A6]/30 flex items-center justify-center group-hover:bg-[#EFD2A6] group-hover:text-[#07222B] transition-colors shrink-0">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#EFD2A6] group-hover:text-[#07222B] transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Instruction */}
      <div className="py-2.5 sm:py-3 text-center text-[#EFD2A6]/60 font-ui text-xs tracking-wider uppercase shrink-0 border-t border-[#EFD2A6]/10">
        Tap any mode to start your personalized session
      </div>
    </div>
  );
};
