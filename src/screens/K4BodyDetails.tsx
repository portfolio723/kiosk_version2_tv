import React from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { BodyType, ClothingSize, Gender, Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { User } from 'lucide-react';

interface K4BodyDetailsProps {
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  heightUnit: 'ft' | 'cm';
  onHeightChange: (feet: number, inches: number, cm: number) => void;
  onUnitChange: (unit: 'ft' | 'cm') => void;
  bodyType: BodyType;
  onBodyTypeChange: (bt: BodyType) => void;
  size: ClothingSize;
  onSizeChange: (s: ClothingSize) => void;
  gender: Gender;
  onGenderChange: (g: Gender) => void;
  onContinue: () => void;
  onBack: () => void;
  language: Language;
}

export const K4BodyDetails: React.FC<K4BodyDetailsProps> = ({
  heightFeet,
  heightInches,
  heightCm,
  heightUnit,
  onHeightChange,
  onUnitChange,
  bodyType,
  onBodyTypeChange,
  size,
  onSizeChange,
  gender,
  onGenderChange,
  onContinue,
  onBack,
  language,
}) => {
  const t = translations[language];

  // Convert total inches to slider value (48 inches = 4'0", 78 inches = 6'6")
  const totalInches = heightFeet * 12 + heightInches;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const feet = Math.floor(val / 12);
    const inches = val % 12;
    const cm = Math.round(val * 2.54);
    onHeightChange(feet, inches, cm);
  };

  const handleCmSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cm = parseInt(e.target.value, 10);
    const totalIn = Math.round(cm / 2.54);
    const feet = Math.floor(totalIn / 12);
    const inches = totalIn % 12;
    onHeightChange(feet, inches, cm);
  };

  const selectBodyType = (type: BodyType) => {
    playTouchFeedback('select');
    onBodyTypeChange(type);
  };

  const selectGender = (g: Gender) => {
    playTouchFeedback('select');
    onGenderChange(g);
  };

  const selectSize = (s: ClothingSize) => {
    playTouchFeedback('select');
    onSizeChange(s);
  };

  const SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader
        onBack={onBack}
        showBack={true}
        currentStep={2}
        totalSteps={4}
        stepLabel={t.stepOf(2, 4)}
      />

      <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[580px] mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-3 sm:mb-5 shrink-0">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Tell us a bit about yourself
          </h2>
          <p className="font-ui text-xs sm:text-sm md:text-base text-[#EFD2A6]/80 mt-1">
            Ensures precise drape proportions and automatic fabric meterage estimation
          </p>
        </div>

        {/* Section 1: HEIGHT CONTROL */}
        <div className="w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0C2B35]/80 border-2 border-[#EFD2A6]/25 shadow-md mb-4 sm:mb-6 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold">
              HEIGHT
            </span>

            {/* Segmented Unit Selector [ ft ] [ cm ] */}
            <div className="flex items-center p-0.5 rounded-full bg-[#07222B] border border-[#EFD2A6]/30">
              <button
                type="button"
                onClick={() => {
                  playTouchFeedback('tap');
                  onUnitChange('ft');
                }}
                className={`px-3 sm:px-4 py-1 rounded-full font-ui text-xs font-bold transition-all ${
                  heightUnit === 'ft'
                    ? 'bg-[#EFD2A6] text-[#07222B] shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                ft / in
              </button>
              <button
                type="button"
                onClick={() => {
                  playTouchFeedback('tap');
                  onUnitChange('cm');
                }}
                className={`px-3 sm:px-4 py-1 rounded-full font-ui text-xs font-bold transition-all ${
                  heightUnit === 'cm'
                    ? 'bg-[#EFD2A6] text-[#07222B] shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                cm
              </button>
            </div>
          </div>

          {/* Big Prominent Height Display */}
          <div className="text-center my-2 sm:my-3">
            <span className="font-display text-4xl sm:text-5xl text-[#EFD2A6] font-bold tracking-tight">
              {heightUnit === 'ft' ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}
            </span>
            <span className="block font-ui text-xs text-white/50 mt-0.5">
              {heightUnit === 'ft' ? `≈ ${heightCm} cm` : `≈ ${heightFeet}'${heightInches}"`}
            </span>
          </div>

          {/* Interactive Touch Slider */}
          <div className="px-2 py-2">
            {heightUnit === 'ft' ? (
              <input
                type="range"
                min={48}
                max={78}
                step={1}
                value={totalInches}
                onChange={handleSliderChange}
                className="w-full h-3 bg-[#07222B] rounded-lg appearance-none cursor-pointer accent-[#EFD2A6]"
              />
            ) : (
              <input
                type="range"
                min={120}
                max={200}
                step={1}
                value={heightCm}
                onChange={handleCmSliderChange}
                className="w-full h-3 bg-[#07222B] rounded-lg appearance-none cursor-pointer accent-[#EFD2A6]"
              />
            )}
            <div className="flex justify-between font-ui text-[10px] sm:text-xs text-[#EFD2A6]/60 mt-2 font-semibold">
              <span>{heightUnit === 'ft' ? `4'0"` : '120 cm'}</span>
              <span>{heightUnit === 'ft' ? `5'4" (Standard)` : '163 cm'}</span>
              <span>{heightUnit === 'ft' ? `6'6"` : '200 cm'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: BODY TYPE WITH SILHOUETTES */}
        <div className="w-full mb-4 sm:mb-6 shrink-0">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2.5 px-1">
            BODY TYPE
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {(
              [
                { id: 'slim', label: 'Slim', desc: 'Slender frame' },
                { id: 'regular', label: 'Regular', desc: 'Standard proportions' },
                { id: 'plus', label: 'Plus', desc: 'Generous drapes' },
              ] as const
            ).map((item) => {
              const isSelected = bodyType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectBodyType(item.id)}
                  className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center group active:scale-98 ${
                    isSelected
                      ? 'bg-[#0E3440] border-[#EFD2A6] shadow-md'
                      : 'bg-[#0C2B35]/70 border-[#EFD2A6]/20 hover:border-[#EFD2A6]/50'
                  }`}
                >
                  {/* Silhouette Graphic */}
                  <div
                    className={`w-12 h-14 sm:w-16 sm:h-18 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isSelected ? 'bg-[#EFD2A6] text-[#07222B]' : 'bg-[#07222B] text-[#EFD2A6]'
                    }`}
                  >
                    <User
                      className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform ${
                        item.id === 'slim' ? 'scale-x-85' : item.id === 'plus' ? 'scale-x-125' : 'scale-100'
                      }`}
                    />
                  </div>

                  <span
                    className={`font-display text-base sm:text-xl font-bold mb-0.5 ${
                      isSelected ? 'text-[#EFD2A6]' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="font-ui text-[10px] sm:text-xs text-white/60 leading-tight">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: GENDER */}
        <div className="w-full mb-4 sm:mb-6 shrink-0">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2.5 px-1">
            COLLECTION FOCUS
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['women', 'men'] as const).map((g) => {
              const isSelected = gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => selectGender(g)}
                  className={`h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 font-display text-base sm:text-lg font-bold capitalize transition-all active:scale-98 flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                      : 'bg-[#0C2B35]/70 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
                  }`}
                >
                  <span>{g === 'women' ? 'Women Fashion' : 'Men Fashion'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: SIZE (OPTIONAL) */}
        <div className="w-full shrink-0 pb-2">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2 px-1">
            SIZE (OPTIONAL APPAREL REFERENCE)
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {SIZES.map((s) => {
              const isSelected = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => selectSize(s)}
                  className={`h-11 sm:h-12 rounded-xl border-2 font-ui font-bold text-sm sm:text-base transition-all active:scale-95 flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-sm'
                      : 'bg-[#0C2B35]/70 text-white border-[#EFD2A6]/20 hover:border-[#EFD2A6]/40'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-[#EFD2A6]/20 bg-[#07222B]/90 backdrop-blur-md flex justify-center shrink-0">
        <button
          type="button"
          onClick={() => {
            playTouchFeedback('select');
            onContinue();
          }}
          className="w-full max-w-[480px] h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-bold text-base sm:text-xl tracking-widest uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>{t.continueBtn}</span>
        </button>
      </div>
    </div>
  );
};
