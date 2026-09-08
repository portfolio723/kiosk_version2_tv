import React, { useState } from 'react';
import { useWebApp } from '../WebAppContext';
import { AppExperienceMode, WebAppScreen } from '../../types';
import { Heart, Menu, X, User, ChevronDown, LogOut, Sparkles as SparklesStub, Shirt, Layers, Tv, Globe } from 'lucide-react';

interface WebHeaderProps {
  experienceMode: AppExperienceMode;
  onSwitchExperience: (mode: AppExperienceMode) => void;
}

export const WebHeader: React.FC<WebHeaderProps> = ({ experienceMode, onSwitchExperience }) => {
  const { currentScreen, setCurrentScreen, user, isAuthenticated, savedLooks, logout } = useWebApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigateTo = (screen: WebAppScreen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07222B]/95 backdrop-blur-md border-b border-[#EFD2A6]/20 transition-all">
      {/* Top Notification / Experience Switch Bar */}
      <div className="w-full bg-[#04171D] border-b border-[#EFD2A6]/10 px-4 sm:px-8 py-1.5 flex items-center justify-end text-[11px] sm:text-xs">
        {/* Experience Switcher (Web App <-> Kiosk TV) */}
        <div className="flex items-center gap-1.5 bg-[#0C2B35] px-2 py-0.5 rounded-full border border-[#EFD2A6]/30">
          <button
            type="button"
            onClick={() => onSwitchExperience('web')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-ui text-[10px] sm:text-[11px] font-bold transition-colors ${
              experienceMode === 'web'
                ? 'bg-[#EFD2A6] text-[#07222B]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Web App</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchExperience('kiosk')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-ui text-[10px] sm:text-[11px] font-bold transition-colors ${
              experienceMode === 'kiosk'
                ? 'bg-[#EFD2A6] text-[#07222B]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Tv className="w-3 h-3" />
            <span>Kiosk TV</span>
          </button>
        </div>
      </div>

      {/* Main Global Navigation */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left / Logo */}
        <div className="flex items-center gap-6 sm:gap-10">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#EFD2A6] hover:bg-[#0C2B35] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Master Brand Logo */}
          <div
            onClick={() => navigateTo('W1')}
            className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group select-none"
          >
            <img
              src="/assets/padavala-Logo.png"
              alt="Padavala Logo"
              className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display tracking-[0.3em] sm:tracking-[0.35em] text-[#EFD2A6] text-lg sm:text-2xl font-bold uppercase transition-colors group-hover:text-white">
              PADAVALA
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-ui font-medium">
            <button
              type="button"
              onClick={() => navigateTo('W5')}
              className={`transition-colors hover:text-[#EFD2A6] ${
                currentScreen === 'W5' ? 'text-[#EFD2A6] font-semibold border-b-2 border-[#EFD2A6] pb-1' : 'text-white/80'
              }`}
            >
              Discover
            </button>
            <button
              type="button"
              onClick={() => navigateTo('W6')}
              className={`transition-colors hover:text-[#EFD2A6] flex items-center gap-1.5 ${
                currentScreen === 'W6' ? 'text-[#EFD2A6] font-semibold border-b-2 border-[#EFD2A6] pb-1' : 'text-white/80'
              }`}
            >
              <span>Try On</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EFD2A6]/20 text-[#EFD2A6] font-bold uppercase tracking-wider">
                AI
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('W5')}
              className="text-white/80 hover:text-[#EFD2A6] transition-colors"
            >
              Collections
            </button>
            <button
              type="button"
              onClick={() => navigateTo('W7')}
              className={`transition-colors hover:text-[#EFD2A6] ${
                currentScreen === 'W7' ? 'text-[#EFD2A6] font-semibold border-b-2 border-[#EFD2A6] pb-1' : 'text-white/80'
              }`}
            >
              Lookbook
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Lookbook Heart Icon */}
          <button
            type="button"
            onClick={() => navigateTo('W7')}
            className="relative p-2 text-white/80 hover:text-[#EFD2A6] transition-colors rounded-full hover:bg-[#0C2B35]"
            title="Saved Looks"
          >
            <Heart className="w-5 h-5" />
            {savedLooks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EFD2A6] text-[#07222B] text-[10px] font-bold flex items-center justify-center">
                {savedLooks.length}
              </span>
            )}
          </button>

          {/* Authentication State */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 sm:gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full bg-[#0C2B35] border border-[#EFD2A6]/30 hover:border-[#EFD2A6] transition-all"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'}
                  alt={user.fullName}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#EFD2A6]/50"
                />
                <span className="hidden sm:inline font-ui text-xs sm:text-sm font-semibold text-white truncate max-w-[120px]">
                  {user.fullName.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#EFD2A6]" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#0C2B35] border border-[#EFD2A6]/30 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs text-white/60">Signed in as</p>
                    <p className="font-ui text-sm font-bold text-white truncate">{user.fullName}</p>
                    <p className="text-[11px] text-[#EFD2A6] truncate">{user.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('W4')}
                    className="w-full px-4 py-2.5 text-left text-xs sm:text-sm text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#EFD2A6]" />
                    <span>My Profile & Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('W7')}
                    className="w-full px-4 py-2.5 text-left text-xs sm:text-sm text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-[#EFD2A6]" />
                    <span>My Lookbook ({savedLooks.length})</span>
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-rose-300 hover:bg-white/10 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => navigateTo('W3')}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-white/90 hover:text-[#EFD2A6] font-ui text-xs sm:text-sm font-semibold transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigateTo('W2')}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-xs sm:text-sm font-bold hover:bg-[#F8EAD3] active:scale-95 transition-all shadow-md"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[96px] bg-[#07222B]/98 z-40 px-6 py-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <img
                src="/assets/padavala-Logo.png"
                alt="Padavala"
                className="h-8 w-auto object-contain"
              />
              <div>
                <h4 className="font-display text-lg text-[#EFD2A6] tracking-widest font-bold">PADAVALA</h4>
                <p className="text-xs text-white/60">Bespoke Handlooms & AI Drape</p>
              </div>
            </div>

            <nav className="flex flex-col gap-4 text-base font-ui">
              <button
                type="button"
                onClick={() => navigateTo('W1')}
                className={`text-left py-2 border-b border-white/5 ${currentScreen === 'W1' ? 'text-[#EFD2A6] font-bold' : 'text-white'}`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigateTo('W5')}
                className={`text-left py-2 border-b border-white/5 ${currentScreen === 'W5' ? 'text-[#EFD2A6] font-bold' : 'text-white'}`}
              >
                Discover Fabrics
              </button>
              <button
                type="button"
                onClick={() => navigateTo('W6')}
                className={`text-left py-2 border-b border-white/5 flex items-center justify-between ${currentScreen === 'W6' ? 'text-[#EFD2A6] font-bold' : 'text-white'}`}
              >
                <span>Virtual Try-On</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#EFD2A6] text-[#07222B] font-extrabold uppercase">
                  AI Drape
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('W7')}
                className={`text-left py-2 border-b border-white/5 flex items-center justify-between ${currentScreen === 'W7' ? 'text-[#EFD2A6] font-bold' : 'text-white'}`}
              >
                <span>My Lookbook</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#0C2B35] text-[#EFD2A6]">
                  {savedLooks.length}
                </span>
              </button>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => navigateTo('W4')}
                  className={`text-left py-2 border-b border-white/5 ${currentScreen === 'W4' ? 'text-[#EFD2A6] font-bold' : 'text-white'}`}
                >
                  My Profile & Measurements
                </button>
              )}
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full border border-rose-400/40 text-rose-300 font-ui text-sm font-semibold text-center"
              >
                Sign Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo('W3')}
                  className="w-full py-3 rounded-full border border-[#EFD2A6]/40 text-white font-ui text-sm font-semibold text-center"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('W2')}
                  className="w-full py-3 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-sm font-bold text-center shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
