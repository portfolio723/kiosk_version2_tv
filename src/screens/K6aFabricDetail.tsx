import React, { useState } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { Fabric, GarmentStyle, Language } from '../types';
import { translations } from '../data/translations';
import { calculateFabricRequirement } from '../data/fabrics';
import { playTouchFeedback } from '../utils/audio';
import { Star, Heart, CheckCircle2, ShieldCheck, Ruler } from 'lucide-react';

interface K6aFabricDetailProps {
  fabric: Fabric;
  selectedGarment: GarmentStyle;
  onGarmentChange: (g: GarmentStyle) => void;
  heightFeet: number;
  bodyType: string;
  onStartTryOn: (fabric: Fabric, garment: GarmentStyle, totalMetres: number, totalCost: number) => void;
  onBack: () => void;
  language: Language;
}

export const K6aFabricDetail: React.FC<K6aFabricDetailProps> = ({
  fabric,
  selectedGarment,
  onGarmentChange,
  heightFeet,
  bodyType,
  onStartTryOn,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [savedToLookbook, setSavedToLookbook] = useState(false);

  // Dynamic fabric calculation based on chosen garment, customer height and body
  const calculation = calculateFabricRequirement(fabric, selectedGarment, heightFeet, bodyType);

  const handleGarmentClick = (g: GarmentStyle) => {
    playTouchFeedback('select');
    onGarmentChange(g);
  };

  const handleTryOn = () => {
    playTouchFeedback('success');
    onStartTryOn(fabric, selectedGarment, calculation.totalMetres, calculation.totalCost);
  };

  const toggleSaveLookbook = () => {
    playTouchFeedback('tap');
    setSavedToLookbook((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader onBack={onBack} showBack={true} />

      <div className="flex-1 min-h-0 flex flex-col items-center px-4 sm:px-6 py-4 max-w-[580px] mx-auto w-full overflow-y-auto">
        {/* Fabric Image Showcase */}
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#EFD2A6]/40 shadow-lg mb-4 shrink-0">
          <img
            src={fabric.imageUrl}
            alt={fabric.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07222B] via-transparent to-transparent opacity-75" />

          {/* Floating Stock & Quality Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-ui text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{fabric.inStock ? t.inStock : 'Limited Stock'}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#0C2B35]/80 backdrop-blur-md border border-[#EFD2A6]/30 text-[#EFD2A6] font-ui text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Certified Handloom</span>
            </span>
          </div>
        </div>

        {/* Title, Rating & Price Header */}
        <div className="w-full flex items-start justify-between mb-4 pb-3 border-b border-white/10 shrink-0">
          <div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight">
              {fabric.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5 text-[#EFD2A6]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(fabric.rating)
                        ? 'fill-[#EFD2A6]'
                        : 'fill-transparent stroke-[#EFD2A6]'
                    }`}
                  />
                ))}
                <span className="font-ui font-bold text-xs sm:text-sm text-white ml-1">
                  {fabric.rating}
                </span>
              </div>
              <span className="text-white/40">•</span>
              <span className="font-ui text-xs text-[#EFD2A6]">
                {fabric.occasion}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-display text-xl sm:text-2xl md:text-3xl text-[#EFD2A6] font-bold">
              ₹{fabric.pricePerMetre}
            </div>
            <span className="font-ui text-[10px] sm:text-xs text-white/50 block">
              per metre
            </span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0C2B35]/70 border border-[#EFD2A6]/20 mb-4 shrink-0">
          <div>
            <span className="font-ui text-[10px] tracking-wider uppercase text-white/50 block mb-0.5">
              Fabric Weave
            </span>
            <span className="font-ui text-xs sm:text-sm font-bold text-white truncate block">
              {fabric.type}
            </span>
          </div>
          <div>
            <span className="font-ui text-[10px] tracking-wider uppercase text-white/50 block mb-0.5">
              Drape Weight
            </span>
            <span className="font-ui text-xs sm:text-sm font-bold text-white truncate block">
              {fabric.weight}
            </span>
          </div>
          <div>
            <span className="font-ui text-[10px] tracking-wider uppercase text-white/50 block mb-0.5">
              Occasion
            </span>
            <span className="font-ui text-xs sm:text-sm font-bold text-white truncate block">
              {fabric.occasion}
            </span>
          </div>
          <div>
            <span className="font-ui text-[10px] tracking-wider uppercase text-white/50 block mb-0.5">
              Color Palette
            </span>
            <span className="font-ui text-xs sm:text-sm font-bold text-white truncate block">
              {fabric.colors}
            </span>
          </div>
        </div>

        {/* GARMENT STYLE SELECTOR */}
        <div className="w-full mb-4 shrink-0">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold">
              CHOOSE GARMENT STYLE TO TRY ON
            </span>
            <span className="font-ui text-[10px] text-white/50">
              Updates meterage & drape
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {fabric.availableStyles.map((style) => {
              const isSelected = selectedGarment === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleGarmentClick(style)}
                  className={`h-11 sm:h-12 rounded-xl sm:rounded-2xl border-2 font-display text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center px-2 ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                      : 'bg-[#0C2B35]/80 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
                  }`}
                >
                  <span className="truncate">{style}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ESTIMATED FABRIC METERAGE & COST BOX */}
        <div className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07222B] border-2 border-[#EFD2A6]/30 shadow-md mb-4 shrink-0">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[#EFD2A6] font-ui text-xs font-bold uppercase tracking-wider">
              <Ruler className="w-4 h-4" />
              <span>Tailoring Requirement ({selectedGarment})</span>
            </div>
            <span className="font-ui text-[10px] text-white/60">
              Calibrated: {heightFeet}'5" • {bodyType}
            </span>
          </div>

          <div className="space-y-1.5 font-ui text-xs sm:text-sm">
            {calculation.components.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-white/90">
                <span>{c.name}</span>
                <span className="font-bold text-[#EFD2A6]">{c.metres} m</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="text-white">Total Required Fabric:</span>
              <span className="text-white">{calculation.totalMetres} metres</span>
            </div>
            <div className="pt-1 flex items-center justify-between text-base sm:text-lg font-bold">
              <span className="text-[#EFD2A6]">Estimated Fabric Cost:</span>
              <span className="text-[#EFD2A6] font-display">
                ₹{calculation.totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Bar */}
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-[#EFD2A6]/20 bg-[#07222B]/90 backdrop-blur-md flex flex-col items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleTryOn}
          className="w-full max-w-[480px] h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-extrabold text-base sm:text-xl tracking-widest uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center border-2 border-white/40 hover:shadow-lg"
        >
          <span>{t.tryThisOn}</span>
        </button>

        <button
          type="button"
          onClick={toggleSaveLookbook}
          className="flex items-center gap-1.5 text-white/80 hover:text-[#EFD2A6] font-ui text-xs sm:text-sm font-semibold transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              savedToLookbook ? 'fill-rose-500 text-rose-500' : 'text-[#EFD2A6]'
            }`}
          />
          <span>{savedToLookbook ? 'Saved to Store Lookbook ✓' : t.saveLookbook}</span>
        </button>
      </div>
    </div>
  );
};
