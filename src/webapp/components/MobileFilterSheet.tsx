import React from 'react';
import { X } from 'lucide-react';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTypes: string[];
  toggleType: (type: string) => void;
  selectedOccasions: string[];
  toggleOccasion: (occ: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onApply: () => void;
  onReset: () => void;
}

const FABRIC_TYPES = ['Pure Mulberry Silk', 'Katan Silk Brocade', 'Crepe Silk Georgette', 'Chanderi Silk & Zari Tissue', 'Mulberry Raw Silk', 'Banarasi Silk'];
const OCCASIONS = ['Wedding', 'Festival', 'Party', 'Casual', 'Office'];

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  selectedTypes,
  toggleType,
  selectedOccasions,
  toggleOccasion,
  maxPrice,
  setMaxPrice,
  onApply,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Modal */}
      <div className="w-full bg-[#0C2B35] rounded-t-3xl border-t border-[#EFD2A6]/40 p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl font-ui">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="font-display text-xl text-white font-normal">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fabric Type */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold mb-3">
            Fabric Type
          </label>
          <div className="flex flex-wrap gap-2">
            {FABRIC_TYPES.map((type) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                      : 'bg-[#07222B] text-white/80 border border-white/15'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold mb-3">
            Occasion
          </label>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => {
              const isSelected = selectedOccasions.includes(occ);
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => toggleOccasion(occ)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                      : 'bg-[#07222B] text-white/80 border border-white/15'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="uppercase tracking-wider text-[#EFD2A6] font-bold">Max Price per Metre</span>
            <span className="text-white font-bold">₹{maxPrice.toLocaleString()} / m</span>
          </div>
          <input
            type="range"
            min={200}
            max={2000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#EFD2A6] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-white/50 mt-1 font-mono">
            <span>₹200</span>
            <span>₹2,000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="w-1/3 py-3 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              onApply();
              onClose();
            }}
            className="w-2/3 py-3 rounded-full bg-[#EFD2A6] text-[#07222B] text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-white active:scale-95 transition-all"
          >
            APPLY FILTERS
          </button>
        </div>
      </div>
    </div>
  );
};
