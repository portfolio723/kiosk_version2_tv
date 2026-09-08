import React from 'react';
import { useWebApp } from '../WebAppContext';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const WebFooter: React.FC = () => {
  const { setCurrentScreen } = useWebApp();

  return (
    <footer className="w-full bg-[#04171D] border-t border-[#EFD2A6]/20 text-white/75 font-ui select-none">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/padavala-Logo.png"
                alt="Padavala Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-display tracking-[0.35em] text-[#EFD2A6] text-2xl font-bold uppercase">
                PADAVALA
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Generations of authentic handloom heritage paired with intelligent AI virtual styling. Explore authentic Kanchipuram silks, Banarasi brocades, and bespoke couture made precisely to your posture and measurements.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#EFD2A6]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% Certified Silk Mark
              </span>
              <span>·</span>
              <span>Handcrafted Handlooms</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-[#EFD2A6] font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  Fabric Catalog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W6')}
                  className="hover:text-[#EFD2A6] transition-colors flex items-center gap-1"
                >
                  <span>AI Virtual Try-On</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EFD2A6]" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W7')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  My Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W4')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  Measurements & Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Master Weaves */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-[#EFD2A6] font-bold mb-4">
              Curations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  The Wedding Edit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  Diwali Festive Picks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  Kadwa Banarasi Brocades
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="hover:text-[#EFD2A6] transition-colors"
                >
                  Temple Zari Kanjivaram
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Locations */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-[#EFD2A6] font-bold mb-4">
              Showrooms
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EFD2A6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Hyderabad Flagship</p>
                  <p className="text-white/60">Road No. 36, Jubilee Hills</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EFD2A6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Vijayawada Experience Center</p>
                  <p className="text-white/60">MG Road, Governorpet</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#EFD2A6] shrink-0 mt-0.5" />
                <p className="text-white">+91 40 6828 9900</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#EFD2A6] shrink-0 mt-0.5" />
                <p className="text-white">concierge@padavala.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Padavala Silks & Handlooms Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Master Tailor Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
