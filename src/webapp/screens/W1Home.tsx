import React from 'react';
import { useWebApp } from '../WebAppContext';
import { FABRIC_CATALOG } from '../../data/fabrics';
import { Fabric } from '../../types';
import { ArrowRight, CheckCircle2, Shield, Eye, Palette, Scissors, Sparkles as SparklesStub } from 'lucide-react';

export const W1Home: React.FC = () => {
  const { setCurrentScreen, startTryOnWithFabric } = useWebApp();

  const trendingFabrics = FABRIC_CATALOG.slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-[#07222B] text-white select-none">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-[#EFD2A6]/15 bg-gradient-to-b from-[#07222B] via-[#092B36] to-[#07222B] py-12 sm:py-20 lg:py-28">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_50%_20%,rgba(239,210,166,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Editorial Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C2B35] border border-[#EFD2A6]/30 text-[#EFD2A6] text-xs font-ui font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#EFD2A6]" />
                <span>Next-Gen Bespoke Handloom Styling</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
                See Yourself in <br className="hidden sm:inline" />
                <span className="italic text-[#EFD2A6] font-serif">Every Fabric</span>
              </h1>

              <p className="font-ui text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step into Padavala’s virtual atelier. Upload your posture photo, choose from authentic handloom weaves, and preview high-precision real-time drapes tailored to your exact measurements before cutting a single thread.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W6')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-bold text-base tracking-wide uppercase shadow-xl hover:shadow-[0_0_25px_rgba(239,210,166,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4 text-[#07222B]" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen('W5')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0C2B35] border-2 border-[#EFD2A6]/40 text-white font-ui font-bold text-base tracking-wide hover:border-[#EFD2A6] hover:bg-[#0E3440] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>BROWSE CATALOG</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/60 font-ui">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EFD2A6]" />
                  <span>Real Posture AI Draping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EFD2A6]" />
                  <span>Exact Meterage Calculations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EFD2A6]" />
                  <span>Master Weaver Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Fashion Visual Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#EFD2A6]/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
                  alt="Padavala Royal Handloom Drape"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07222B] via-transparent to-black/30" />

                {/* Floating Real-Drape Insignia */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0C2B35]/85 backdrop-blur-md border border-[#EFD2A6]/50 flex items-center gap-2 shadow-lg">
                  <img
                    src="/assets/padavala-Logo.png"
                    alt="Padavala"
                    className="h-5 w-auto object-contain"
                  />
                  <span className="text-xs font-ui font-bold text-[#EFD2A6]">Padavala Real-Drape™</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#0C2B35]/90 backdrop-blur-md border border-[#EFD2A6]/30 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-[#EFD2A6] uppercase tracking-wider font-semibold">Featured Masterpiece</p>
                      <h4 className="font-display text-base font-bold text-white">Kanjivaram Temple Zari Silk</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => startTryOnWithFabric(trendingFabrics[0])}
                      className="px-3.5 py-1.5 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-xs font-bold hover:bg-white active:scale-95 transition-all shadow-md"
                    >
                      Try On
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-24 border-b border-[#EFD2A6]/15 bg-[#04171D]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs font-ui uppercase tracking-[0.3em] text-[#EFD2A6] font-bold mb-2">
              Virtual Tailoring Flow
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-normal">
              How Padavala Works
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3 font-ui">
              Three effortless steps from raw fabric discovery to realistic draped perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 01 */}
            <div className="p-8 rounded-3xl bg-[#0C2B35]/60 border border-[#EFD2A6]/25 hover:border-[#EFD2A6]/60 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-[#EFD2A6]/10 border border-[#EFD2A6]/40 flex items-center justify-center text-[#EFD2A6] font-display text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="font-display text-xl text-white font-bold mb-2">Upload Photo</h3>
              <p className="font-ui text-sm text-white/70 leading-relaxed">
                Take a quick full-length posture photo or pick from our representative body models to match your frame.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-8 rounded-3xl bg-[#0C2B35]/60 border border-[#EFD2A6]/25 hover:border-[#EFD2A6]/60 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-[#EFD2A6]/10 border border-[#EFD2A6]/40 flex items-center justify-center text-[#EFD2A6] font-display text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="font-display text-xl text-white font-bold mb-2">Choose Fabric</h3>
              <p className="font-ui text-sm text-white/70 leading-relaxed">
                Filter through pure Kanjivaram, Banarasi, Georgette, and Chanderi weaves by occasion, weave weight, or price.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-8 rounded-3xl bg-[#0C2B35]/60 border border-[#EFD2A6]/25 hover:border-[#EFD2A6]/60 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-[#EFD2A6]/10 border border-[#EFD2A6]/40 flex items-center justify-center text-[#EFD2A6] font-display text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="font-display text-xl text-white font-bold mb-2">Visualise & Tailor</h3>
              <p className="font-ui text-sm text-white/70 leading-relaxed">
                See the realistic drape on your posture, view exact metre breakdowns, save to your lookbook, or reserve with our master tailor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="py-16 sm:py-24 border-b border-[#EFD2A6]/15 bg-[#07222B]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-ui uppercase tracking-[0.3em] text-[#EFD2A6] font-bold mb-1.5">
                Curated Handloom Edits
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-normal">
                Featured Collections
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('W5')}
              className="text-sm text-[#EFD2A6] hover:text-white font-ui font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Wedding Edit Card */}
            <div
              onClick={() => setCurrentScreen('W5')}
              className="group relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-[#EFD2A6]/30 cursor-pointer shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop"
                alt="The Wedding Edit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07222B] via-[#07222B]/50 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold mb-1">
                  Bridal & Royal Gala
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  THE WEDDING EDIT
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 max-w-md font-ui mb-4">
                  Temple Zari silks, Kadwa brocades, and rich velvet ensembles tailored for unforgettable celebrations.
                </p>
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-ui font-bold text-[#EFD2A6] group-hover:underline">
                    <span>EXPLORE BRIDAL WEAVES →</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Diwali Picks Card */}
            <div
              onClick={() => setCurrentScreen('W5')}
              className="group relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-[#EFD2A6]/30 cursor-pointer shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Diwali Picks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07222B] via-[#07222B]/50 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold mb-1">
                  Festive Radiance
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  DIWALI PICKS
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 max-w-md font-ui mb-4">
                  Luminous Chanderi tissue, fluid georgettes, and shimmering pastel brocades for festive evenings.
                </p>
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-ui font-bold text-[#EFD2A6] group-hover:underline">
                    <span>EXPLORE FESTIVE WEAVES →</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRENDING FABRICS */}
      <section className="py-16 sm:py-24 bg-[#04171D]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-ui uppercase tracking-[0.3em] text-[#EFD2A6] font-bold mb-1.5">
                Customer Favorites
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-normal">
                Trending Fabrics
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('W5')}
              className="text-sm text-[#EFD2A6] hover:text-white font-ui font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>See Full Catalog ({FABRIC_CATALOG.length} fabrics)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingFabrics.map((fabric) => (
              <div
                key={fabric.id}
                className="group flex flex-col rounded-2xl bg-[#0C2B35] border border-[#EFD2A6]/25 hover:border-[#EFD2A6]/60 overflow-hidden transition-all shadow-md"
              >
                {/* Fabric Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <img
                    src={fabric.imageUrl}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#07222B]/80 backdrop-blur-md border border-[#EFD2A6]/30 text-[11px] font-ui font-bold text-[#EFD2A6]">
                    ₹{fabric.pricePerMetre} / m
                  </div>
                </div>

                {/* Fabric Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[#EFD2A6] uppercase tracking-wider font-semibold">
                      {fabric.category}
                    </span>
                    <h4 className="font-display text-base font-bold text-white mt-0.5 mb-1 group-hover:text-[#EFD2A6] transition-colors">
                      {fabric.name}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-2 font-ui">
                      {fabric.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-ui font-semibold text-white/80">
                      Weight: {fabric.weight}
                    </span>
                    <button
                      type="button"
                      onClick={() => startTryOnWithFabric(fabric)}
                      className="px-4 py-2 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-xs font-bold hover:bg-white active:scale-95 transition-all shadow-sm"
                    >
                      Try On
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
