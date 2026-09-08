import React, { useState, useEffect, useRef } from 'react';
import { KioskScreen, Language, AppExperienceMode } from '../types';
import { Maximize2, Minimize2, Volume2, VolumeX, Monitor, Smartphone, Compass, Globe, Tv } from 'lucide-react';
import { playTouchFeedback } from '../utils/audio';

interface KioskFrameProps {
  children: React.ReactNode;
  currentScreen: KioskScreen;
  onNavigateScreen: (screen: KioskScreen) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onResetSession: () => void;
  experienceMode?: AppExperienceMode;
  onSwitchExperience?: (mode: AppExperienceMode) => void;
}

export const KioskFrame: React.FC<KioskFrameProps> = ({
  children,
  currentScreen,
  onNavigateScreen,
  language,
  onLanguageChange,
  onResetSession,
  experienceMode = 'kiosk',
  onSwitchExperience,
}) => {
  const [scaleMode, setScaleMode] = useState<'responsive' | 'kiosk' | 'fill'>('responsive');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Inactivity tracking: 60s of silence resets to K1 if past K1
  useEffect(() => {
    const handleActivity = () => {
      setIdleTime(0);
    };

    window.addEventListener('pointerdown', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const interval = setInterval(() => {
      setIdleTime((prev) => {
        // If on K1 or K10, handled individually
        if (currentScreen !== 'K1' && currentScreen !== 'K10') {
          if (prev >= 60) {
            onResetSession();
            return 0;
          }
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(interval);
    };
  }, [currentScreen, onResetSession]);

  const screensList: { id: KioskScreen; label: string; phase: string }[] = [
    { id: 'K1', label: 'K1 • Attract / Idle', phase: 'A' },
    { id: 'K2', label: 'K2 • Mode Select', phase: 'A' },
    { id: 'K3', label: 'K3 • Customer Photo', phase: 'B' },
    { id: 'K4', label: 'K4 • Body Details', phase: 'B' },
    { id: 'K5', label: 'K5 • Style Questionnaire', phase: 'B' },
    { id: 'K6', label: 'K6 • Fabric Catalog', phase: 'C' },
    { id: 'K6a', label: 'K6a • Fabric Detail', phase: 'C' },
    { id: 'K7', label: 'K7 • AI Try-On Processing', phase: 'D' },
    { id: 'K8', label: 'K8 • Try-On Result', phase: 'D' },
    { id: 'K9', label: 'K9 • Store Inquiry Form', phase: 'E' },
    { id: 'K10', label: 'K10 • Thank You / QR End', phase: 'E' },
  ];

  const handleQuickNav = (s: KioskScreen) => {
    playTouchFeedback('select');
    onNavigateScreen(s);
    setShowNavDrawer(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setScaleMode('fill');
    } else {
      document.exitFullscreen().catch(() => {});
      setScaleMode('fit');
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#041217] flex flex-col items-center justify-center overflow-hidden font-ui">
      {/* Top Store Control & Screen Navigation Bar */}
      <nav className="w-full h-14 bg-[#07222B]/95 border-b border-[#EFD2A6]/20 px-6 flex items-center justify-between z-40 text-xs text-white/80">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 font-display text-sm font-bold text-[#EFD2A6]">
            <img
              src="/assets/padavala-Logo.png"
              alt="Padavala Logo"
              className="h-7 w-auto object-contain"
            />
            <span>PADAVALA</span>
            <span className="text-[10px] font-ui px-2 py-0.5 rounded-full bg-[#EFD2A6]/20 text-[#EFD2A6] font-semibold">
              1080 × 1920 Kiosk TV
            </span>
          </div>

          <div className="h-4 w-px bg-white/20" />

          {/* Quick Screen Selector Button */}
          <button
            type="button"
            onClick={() => setShowNavDrawer(!showNavDrawer)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C2B35] border border-[#EFD2A6]/30 text-[#EFD2A6] font-semibold hover:bg-[#0E3440] transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Screen: {currentScreen}</span>
            <span className="text-[10px] bg-[#EFD2A6] text-[#07222B] px-1.5 rounded font-bold">
              K1–K10
            </span>
          </button>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-3">
          {/* Experience Switcher (Web App <-> Kiosk TV) */}
          {onSwitchExperience && (
            <div className="flex items-center gap-1 bg-[#0C2B35] p-1 rounded-lg border border-[#EFD2A6]/40">
              <button
                type="button"
                onClick={() => onSwitchExperience('web')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white/80 hover:text-white font-bold text-xs hover:bg-white/10 transition-colors"
                title="Switch to Customer Responsive Web App"
              >
                <Globe className="w-3.5 h-3.5 text-[#EFD2A6]" />
                <span className="hidden sm:inline">Web App</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchExperience('kiosk')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFD2A6] text-[#07222B] font-bold text-xs shadow-sm"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kiosk TV</span>
              </button>
            </div>
          )}

          {/* Language Switch */}
          <div className="flex items-center rounded-lg bg-[#0C2B35] border border-white/10 p-0.5 text-xs">
            {(['en', 'hi', 'te'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onLanguageChange(l)}
                className={`px-2.5 py-1 rounded font-bold uppercase ${
                  language === l ? 'bg-[#EFD2A6] text-[#07222B]' : 'text-white/60 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center rounded-lg bg-[#0C2B35] border border-white/10 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setScaleMode('responsive')}
              className={`px-2 py-1 rounded font-semibold flex items-center gap-1 transition-all ${
                scaleMode === 'responsive'
                  ? 'bg-[#EFD2A6] text-[#07222B]'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Fluid responsive layout"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Adaptive</span>
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('kiosk')}
              className={`px-2 py-1 rounded font-semibold flex items-center gap-1 transition-all ${
                scaleMode === 'kiosk'
                  ? 'bg-[#EFD2A6] text-[#07222B]'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Portrait 9:16 Kiosk mode"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Kiosk 9:16</span>
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('fill')}
              className={`px-2 py-1 rounded font-semibold flex items-center gap-1 transition-all ${
                scaleMode === 'fill'
                  ? 'bg-[#EFD2A6] text-[#07222B]'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Full screen width"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Fill</span>
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-[#0C2B35] border border-white/10 hover:text-white"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#EFD2A6]" />
          </button>
        </div>
      </nav>

      {/* Screen Navigation Drawer / Modal */}
      {showNavDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-xl bg-[#0C2B35] border-2 border-[#EFD2A6] rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <h3 className="font-display text-xl font-bold text-[#EFD2A6]">
                  Padavala Kiosk TV Screen Navigator
                </h3>
                <p className="font-ui text-xs text-white/60">
                  Instant jumping across Phase 1 flow (A → B → C → D → E)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNavDrawer(false)}
                className="px-3 py-1 rounded-lg bg-[#07222B] text-white/80 text-xs font-bold"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {screensList.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleQuickNav(sc.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentScreen === sc.id
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] font-bold shadow'
                      : 'bg-[#07222B] text-white/90 border-[#EFD2A6]/20 hover:border-[#EFD2A6]/60'
                  }`}
                >
                  <span className="text-sm font-ui">{sc.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      currentScreen === sc.id
                        ? 'bg-[#07222B] text-[#EFD2A6]'
                        : 'bg-[#0C2B35] text-[#EFD2A6]'
                    }`}
                  >
                    Phase {sc.phase}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Kiosk Canvas Box */}
      <main
        ref={containerRef}
        className={`relative flex items-center justify-center transition-all duration-300 w-full h-[calc(100vh-56px)] p-0 sm:p-2 md:p-3 overflow-hidden`}
      >
        <div
          className={`w-full h-full relative overflow-hidden bg-[#07222B] flex flex-col transition-all duration-300 ${
            scaleMode === 'responsive'
              ? 'max-w-2xl sm:border sm:border-[#EFD2A6]/20 sm:rounded-3xl sm:shadow-[0_0_60px_rgba(0,0,0,0.8)]'
              : scaleMode === 'kiosk'
              ? 'h-full aspect-[9/16] max-w-full my-auto border-[4px] border-[#0C2B35] rounded-[36px] shadow-[0_0_80px_rgba(0,0,0,0.85)]'
              : 'w-full'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
