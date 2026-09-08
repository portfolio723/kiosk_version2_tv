import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubmark?: boolean;
  inverted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubmark = true,
  className = '',
  onClick,
}) => {
  const dimensions = {
    sm: { width: 140, height: 48, brandSize: 'text-[12px] sm:text-[13px] tracking-[0.3em]', padavalaH: 'h-6 sm:h-7' },
    md: { width: 220, height: 72, brandSize: 'text-[15px] sm:text-[17px] tracking-[0.35em]', padavalaH: 'h-9 sm:h-10 md:h-11' },
    lg: { width: 320, height: 100, brandSize: 'text-[18px] sm:text-[21px] tracking-[0.4em]', padavalaH: 'h-13 sm:h-15' },
    xl: { width: 420, height: 130, brandSize: 'text-[22px] sm:text-[26px] tracking-[0.45em]', padavalaH: 'h-16 sm:h-20' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* PADAVALA Master Brand Name with Logo */}
      {showSubmark && (
        <div className={`font-display font-semibold uppercase text-[#EFD2A6] ${dimensions.brandSize} mb-2 opacity-95 transition-opacity flex items-center justify-center gap-2.5 sm:gap-3.5`}>
          <img
            src="/assets/padavala-Logo.png"
            alt="Padavala Logo"
            className={`${dimensions.padavalaH} w-auto object-contain drop-shadow-sm`}
          />
          <span>PADAVALA</span>
        </div>
      )}

      {/* Kiosk Brand Logo Image */}
      <div className="relative flex flex-col items-center justify-center">
        <img
          src="/assets/kisok.png"
          alt="Kiosk Logo"
          className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all"
          style={{ width: dimensions.width, maxHeight: dimensions.height }}
        />
      </div>
    </div>
  );
};
