import React, { useState, useMemo } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { Fabric, Language } from '../types';
import { translations } from '../data/translations';
import { FABRIC_CATALOG } from '../data/fabrics';
import { playTouchFeedback } from '../utils/audio';
import { Search, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

interface K6CatalogBrowseProps {
  onSelectFabric: (fabric: Fabric) => void;
  onBack: () => void;
  language: Language;
}

export const K6CatalogBrowse: React.FC<K6CatalogBrowseProps> = ({
  onSelectFabric,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(6);

  const categories = [
    'All',
    'Saree',
    'Lehenga',
    'Salwar',
    'Kurti',
    'Sherwani',
    'Kurta',
    'Casual',
  ];

  const filteredFabrics = useMemo(() => {
    return FABRIC_CATALOG.filter((f) => {
      const matchCat =
        selectedCategory === 'All' ||
        f.category.toLowerCase() === selectedCategory.toLowerCase() ||
        f.availableStyles.some((s) => s.toLowerCase() === selectedCategory.toLowerCase());
      const matchSearch =
        searchQuery === '' ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.occasion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const visibleFabrics = filteredFabrics.slice(0, displayCount);

  const handleFabricClick = (fabric: Fabric) => {
    playTouchFeedback('select');
    onSelectFabric(fabric);
  };

  const handleCategorySelect = (cat: string) => {
    playTouchFeedback('tap');
    setSelectedCategory(cat);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader onBack={onBack} showBack={true} />

      <div className="flex-1 min-h-0 flex flex-col px-4 sm:px-6 py-4 max-w-[640px] mx-auto w-full overflow-y-auto">
        {/* Search Bar Input */}
        <div className="relative w-full mb-4 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fabrics, weaves, festive styles..."
            className="w-full h-12 sm:h-14 px-5 pl-12 sm:pl-14 rounded-full bg-[#0C2B35]/90 border-2 border-[#EFD2A6]/30 text-white font-ui text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-[#EFD2A6] shadow-md"
          />
          <Search className="w-5 h-5 text-[#EFD2A6] absolute left-4 sm:left-5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#EFD2A6] uppercase bg-[#07222B] px-2.5 py-1 rounded-full"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`h-10 sm:h-11 px-4 sm:px-5 rounded-full font-ui text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 border-2 flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-sm'
                    : 'bg-[#0C2B35]/80 text-white/85 border-[#EFD2A6]/20 hover:border-[#EFD2A6]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Collection Banner: WEDDING EDIT */}
        <div
          onClick={() => {
            playTouchFeedback('select');
            setSelectedCategory('Saree');
          }}
          className="relative w-full min-h-[100px] sm:min-h-[130px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#EFD2A6]/40 mb-5 cursor-pointer shadow-lg group active:scale-[0.99] transition-transform shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
            alt="Wedding Edit Banner"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07222B] via-[#07222B]/75 to-transparent flex items-center justify-between px-4 sm:px-8 py-3">
            <div className="flex flex-col justify-center min-w-0 pr-3">
              <div className="text-[#EFD2A6] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold mb-0.5">
                <span>Curated Store Showcase</span>
              </div>
              <div className="font-display text-xl sm:text-2xl text-white font-bold tracking-wide truncate">
                THE WEDDING EDIT
              </div>
              <div className="text-white/80 font-ui text-xs sm:text-sm mt-0.5 line-clamp-1">
                Temple Zari silks, Kadwa brocades & velvet ensembles
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EFD2A6] text-[#07222B] flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform shrink-0">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Catalog Section Header */}
        <div className="flex items-center justify-between mb-3 px-1 shrink-0">
          <span className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold">
            AVAILABLE BESPOKE FABRICS ({filteredFabrics.length})
          </span>
          <span className="font-ui text-[10px] sm:text-xs text-white/50">
            Tap fabric to inspect
          </span>
        </div>

        {/* Responsive Fabric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mb-6">
          {visibleFabrics.map((fabric) => (
            <div
              key={fabric.id}
              onClick={() => handleFabricClick(fabric)}
              className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0C2B35]/90 border-2 border-[#EFD2A6]/25 hover:border-[#EFD2A6] active:border-[#EFD2A6] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden bg-[#07222B]">
                <img
                  src={fabric.imageUrl}
                  alt={fabric.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C2B35] via-transparent to-transparent opacity-80" />

                {/* Stock Status Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-ui font-semibold flex items-center gap-1.5 text-white">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      fabric.inStock ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span>{fabric.inStock ? t.inStock : 'Low Stock'}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#0C2B35]/80 backdrop-blur-md border border-[#EFD2A6]/30 text-[10px] sm:text-xs font-ui font-bold text-[#EFD2A6] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#EFD2A6]" />
                  <span>{fabric.rating}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-base sm:text-lg text-white font-bold group-hover:text-[#EFD2A6] transition-colors line-clamp-1">
                    {fabric.name}
                  </h3>
                  <div className="text-xs font-ui text-[#EFD2A6]/80 mt-0.5 line-clamp-1">
                    {fabric.type}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg sm:text-xl text-[#EFD2A6] font-bold">
                      ₹{fabric.pricePerMetre}
                    </span>
                    <span className="text-[10px] font-ui text-white/50 block">
                      / metre
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFabricClick(fabric);
                    }}
                    className="px-4 py-1.5 sm:py-2 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center"
                  >
                    <span>{t.tryOn}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleFabrics.length < filteredFabrics.length && (
          <div className="w-full flex justify-center pb-8">
            <button
              type="button"
              onClick={() => {
                playTouchFeedback('tap');
                setDisplayCount((c) => c + 4);
              }}
              className="px-10 py-4 rounded-full bg-[#0C2B35] border-2 border-[#EFD2A6]/40 text-[#EFD2A6] font-ui font-bold text-base uppercase tracking-widest active:scale-95 transition-all shadow-md"
            >
              LOAD MORE FABRICS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
