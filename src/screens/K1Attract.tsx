import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Globe } from 'lucide-react';

interface K1AttractProps {
  onStart: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const HERO_LOOKS = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    title: 'Heritage Kanjivaram',
    sub: 'Woven in pure gold zari',
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop',
    title: 'Banarasi Kadwa Brocade',
    sub: 'Royal Mughal floral motifs',
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
    title: 'Crimson Velvet Bridal',
    sub: 'Bespoke hand-embroidered drape',
  },
  {
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    title: 'Raw Dupioni Silk Achkan',
    sub: 'Artisanal tailoring for grand gala',
  },
];

export const K1Attract: React.FC<K1AttractProps> = ({
  onStart,
  language,
  onLanguageChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_LOOKS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    playTouchFeedback('select');
    onStart();
  };

  const handleLang = (lang: Language, e: React.MouseEvent) => {
    e.stopPropagation();
    playTouchFeedback('tap');
    onLanguageChange(lang);
  };

  return (
    <div
      onClick={handleStart}
      className="relative w-full h-full flex flex-col justify-between items-center px-4 sm:px-8 py-4 sm:py-6 cursor-pointer select-none overflow-y-auto"
    >
      {/* Top Header: Brand Logo */}
      <div className="pt-2 sm:pt-4 flex flex-col items-center z-20 shrink-0">
        <BrandLogo size="md" showSubmark={true} />
      </div>

      {/* Hero Visual Composition Frame */}
      <div className="relative w-full max-w-[440px] aspect-square max-h-[36vh] sm:max-h-[42vh] my-2 rounded-2xl sm:rounded-[36px] overflow-hidden border-2 border-[#EFD2A6]/40 shadow-[0_16px_40px_rgba(0,0,0,0.65)] z-20 group shrink-0">
        {HERO_LOOKS.map((look, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-105 transition-transform duration-[6000ms]' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07222B] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-50" />

            {/* Look Caption Pill */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between backdrop-blur-md bg-[#0C2B35]/80 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-[#EFD2A6]/30">
              <div className="min-w-0 flex-1 mr-2">
                <div className="text-white font-display text-base sm:text-xl font-bold tracking-wide truncate">
                  {look.title}
                </div>
                <div className="text-[#EFD2A6]/80 font-ui text-xs sm:text-sm truncate">
                  {look.sub}
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#EFD2A6]/20 border border-[#EFD2A6]/40 text-[#EFD2A6] text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center shrink-0">
                <span>AI Ready</span>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
          {HERO_LOOKS.map((_, i) => (
            <div
              key={i}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-6 bg-[#EFD2A6]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition & Typography Section */}
      <div className="flex flex-col items-center text-center max-w-xl z-20 my-2 px-2 shrink-0">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#EFD2A6] font-normal tracking-tight leading-tight">
          {t.tagline}
        </h1>
        <p className="font-ui text-xs sm:text-sm md:text-base text-white/80 tracking-[0.2em] uppercase font-light mt-1 sm:mt-2">
          {t.subTagline}
        </p>
      </div>

      {/* Primary CTA: "TAP TO START" */}
      <div className="w-full flex flex-col items-center gap-3 sm:gap-4 z-20 mb-2 shrink-0">
        <button
          onClick={handleStart}
          className="w-full max-w-[480px] h-14 sm:h-18 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-extrabold text-lg sm:text-xl md:text-2xl tracking-[0.1em] uppercase shadow-[0_12px_36px_rgba(239,210,166,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-2 border-white/40"
        >
          <span>{t.tapToStart}</span>
        </button>

        {/* Language Selector: English | हिंदी | తెలుగు */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-[#0C2B35]/80 border border-[#EFD2A6]/30 backdrop-blur-md text-xs sm:text-sm"
        >
          <Globe className="w-4 h-4 text-[#EFD2A6]" />
          <button
            onClick={(e) => handleLang('en', e)}
            className={`font-ui px-2.5 py-1 rounded-full transition-all ${
              language === 'en'
                ? 'bg-[#EFD2A6] text-[#07222B] font-bold shadow'
                : 'text-white/80 hover:text-[#EFD2A6]'
            }`}
          >
            English
          </button>
          <span className="text-[#EFD2A6]/30">|</span>
          <button
            onClick={(e) => handleLang('hi', e)}
            className={`font-ui px-2.5 py-1 rounded-full transition-all ${
              language === 'hi'
                ? 'bg-[#EFD2A6] text-[#07222B] font-bold shadow'
                : 'text-white/80 hover:text-[#EFD2A6]'
            }`}
          >
            हिंदी
          </button>
          <span className="text-[#EFD2A6]/30">|</span>
          <button
            onClick={(e) => handleLang('te', e)}
            className={`font-ui px-2.5 py-1 rounded-full transition-all ${
              language === 'te'
                ? 'bg-[#EFD2A6] text-[#07222B] font-bold shadow'
                : 'text-white/80 hover:text-[#EFD2A6]'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>
    </div>
  );
};
