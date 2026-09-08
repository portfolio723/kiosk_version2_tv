import React from 'react';

interface KioskBackgroundProps {
  children?: React.ReactNode;
  overlayDark?: boolean;
}

export const KioskBackground: React.FC<KioskBackgroundProps> = ({
  children,
  overlayDark = false,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#07222B]">
      {/* Deep Teal Luxury Texture & Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 35%, #0e343f 0%, #08232c 55%, #04171d 100%)
          `,
        }}
      />

      {/* Subtle Fabric Weave Micro Texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(239, 210, 166, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Warm Ambient Vignette & Gold Rim Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(239,210,166,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.5)_0%,transparent_80%)]" />

      {overlayDark && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />
      )}

      {/* Active Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
