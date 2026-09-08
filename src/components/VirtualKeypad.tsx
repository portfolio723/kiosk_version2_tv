import React from 'react';
import { Delete, Check } from 'lucide-react';
import { playTouchFeedback } from '../utils/audio';

interface VirtualNumberKeypadProps {
  onNumberClick: (digit: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onDone?: () => void;
  className?: string;
}

export const VirtualNumberKeypad: React.FC<VirtualNumberKeypadProps> = ({
  onNumberClick,
  onBackspace,
  onClear,
  onDone,
  className = '',
}) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleDigit = (digit: string) => {
    playTouchFeedback('tap');
    onNumberClick(digit);
  };

  const handleDelete = () => {
    playTouchFeedback('delete');
    onBackspace();
  };

  return (
    <div className={`w-full max-w-[360px] mx-auto grid grid-cols-3 gap-1.5 sm:gap-2 p-2 sm:p-3 bg-[#0C2B35]/90 rounded-2xl border border-[#EFD2A6]/25 backdrop-blur-md shadow-lg ${className}`}>
      {digits.map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => handleDigit(digit)}
          className="h-11 sm:h-13 rounded-xl bg-[#07222B] border border-[#EFD2A6]/20 text-[#EFD2A6] font-display text-xl sm:text-2xl font-medium active:scale-95 active:bg-[#EFD2A6] active:text-[#07222B] transition-all flex items-center justify-center shadow-sm select-none"
        >
          {digit}
        </button>
      ))}

      {/* Bottom Row */}
      {onClear ? (
        <button
          type="button"
          onClick={() => {
            playTouchFeedback('delete');
            onClear();
          }}
          className="h-11 sm:h-13 rounded-xl bg-[#07222B]/60 border border-[#EFD2A6]/15 text-[#EFD2A6]/70 font-ui text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center select-none"
        >
          Clear
        </button>
      ) : (
        <div className="h-11 sm:h-13" />
      )}

      <button
        type="button"
        onClick={() => handleDigit('0')}
        className="h-11 sm:h-13 rounded-xl bg-[#07222B] border border-[#EFD2A6]/20 text-[#EFD2A6] font-display text-xl sm:text-2xl font-medium active:scale-95 active:bg-[#EFD2A6] active:text-[#07222B] transition-all flex items-center justify-center shadow-sm select-none"
      >
        0
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="h-11 sm:h-13 rounded-xl bg-[#07222B] border border-[#EFD2A6]/20 text-[#EFD2A6] active:scale-95 active:bg-rose-900/40 transition-all flex items-center justify-center shadow-sm select-none"
        aria-label="Backspace"
      >
        <Delete className="w-5 h-5 sm:w-6 sm:h-6 text-[#EFD2A6]" />
      </button>

      {onDone && (
        <div className="col-span-3 mt-1">
          <button
            type="button"
            onClick={() => {
              playTouchFeedback('select');
              onDone();
            }}
            className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#EFD2A6] to-[#F8EAD3] text-[#07222B] font-ui font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-98 shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Number</span>
          </button>
        </div>
      )}
    </div>
  );
};
