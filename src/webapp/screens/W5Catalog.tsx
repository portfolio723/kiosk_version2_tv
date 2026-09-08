import React, { useState, useMemo } from 'react';
import { useWebApp } from '../WebAppContext';
import { FABRIC_CATALOG } from '../../data/fabrics';
import { Fabric, GarmentStyle } from '../../types';
import { MobileFilterSheet } from '../components/MobileFilterSheet';
import { Search, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';

const CATEGORIES: (GarmentStyle | 'All')[] = [
  'All',
  'Saree',
  'Lehenga',
  'Salwar',
  'Kurti',
  'Sherwani',
  'Kurta',
  'Casual',
];

const FABRIC_TYPES = [
  'Pure Mulberry Silk',
  'Katan Silk Brocade',
  'Crepe Silk Georgette',
  'Chanderi Silk & Zari Tissue',
  'Mulberry Raw Silk',
  'Banarasi Silk',
];

const OCCASIONS = ['Wedding', 'Festival', 'Party', 'Casual', 'Office'];

export const W5Catalog: React.FC = () => {
  const { startTryOnWithFabric } = useWebApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GarmentStyle | 'All'>('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedOccasions([]);
    setMaxPrice(2000);
    setSearchQuery('');
    setActiveCategory('All');
  };

  // Filter fabrics logic
  const filteredFabrics = useMemo(() => {
    return FABRIC_CATALOG.filter((f) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.type.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (activeCategory !== 'All') {
        if (f.category !== activeCategory && !f.availableStyles.includes(activeCategory)) {
          return false;
        }
      }

      // Type
      if (selectedTypes.length > 0 && !selectedTypes.includes(f.type)) {
        return false;
      }

      // Occasion
      if (selectedOccasions.length > 0) {
        const matchesOcc = selectedOccasions.some((occ) =>
          f.occasion.toLowerCase().includes(occ.toLowerCase())
        );
        if (!matchesOcc) return false;
      }

      // Price
      if (f.pricePerMetre > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerMetre - b.pricePerMetre;
      if (sortBy === 'price-desc') return b.pricePerMetre - a.pricePerMetre;
      return 0; // featured
    });
  }, [searchQuery, activeCategory, selectedTypes, selectedOccasions, maxPrice, sortBy]);

  const activeFilterCount =
    (activeCategory !== 'All' ? 1 : 0) +
    selectedTypes.length +
    selectedOccasions.length +
    (maxPrice < 2000 ? 1 : 0);

  return (
    <div className="w-full min-h-screen bg-[#07222B] text-white select-none py-8 sm:py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
        {/* Page Title & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-white font-normal">
              Discover Fabrics
            </h1>
            <p className="font-ui text-xs sm:text-sm text-white/70 mt-1">
              Pure handloom silks, brocades, and festive textiles available for bespoke tailoring
            </p>
          </div>

          {/* Search Bar + Mobile Filter Trigger */}
          <div className="flex items-center gap-3 font-ui w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]" />
              <input
                type="text"
                placeholder="Search fabrics, weaves, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#0C2B35] border border-[#EFD2A6]/30 text-white placeholder-white/40 text-sm focus:border-[#EFD2A6] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Sheet Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden h-11 px-4 rounded-xl bg-[#0C2B35] border border-[#EFD2A6]/40 text-[#EFD2A6] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#EFD2A6] text-[#07222B] text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Category Chips Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-ui">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                  : 'bg-[#0C2B35] text-white/80 border border-white/10 hover:border-[#EFD2A6]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Curated Collections Mini Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => {
              setSelectedOccasions(['Wedding']);
              setActiveCategory('Saree');
            }}
            className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#EFD2A6]/30 cursor-pointer shadow-lg p-5 flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
              alt="The Wedding Edit"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 -z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07222B]/90 via-[#07222B]/60 to-transparent -z-10" />
            <span className="text-[10px] uppercase tracking-widest text-[#EFD2A6] font-bold">Curated Showcase</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">THE WEDDING EDIT</h3>
          </div>

          <div
            onClick={() => {
              setSelectedOccasions(['Festival']);
              setActiveCategory('Lehenga');
            }}
            className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#EFD2A6]/30 cursor-pointer shadow-lg p-5 flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
              alt="Diwali Picks"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 -z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07222B]/90 via-[#07222B]/60 to-transparent -z-10" />
            <span className="text-[10px] uppercase tracking-widest text-[#EFD2A6] font-bold">Curated Showcase</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">DIWALI FESTIVE PICKS</h3>
          </div>
        </div>

        {/* Main Grid + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar (240px-260px) */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 space-y-6 shadow-xl sticky top-24 font-ui">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#EFD2A6]" />
                <h3 className="font-display text-base text-white font-bold">Filters</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[#EFD2A6] hover:underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Fabric Type Checkboxes */}
            <div className="space-y-3">
              <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                Fabric Type
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {FABRIC_TYPES.map((type) => {
                  const isChecked = selectedTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-white/30 text-[#EFD2A6] accent-[#EFD2A6]"
                      />
                      <span className="truncate">{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Occasion Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                Occasion
              </span>
              <div className="space-y-2">
                {OCCASIONS.map((occ) => {
                  const isChecked = selectedOccasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOccasion(occ)}
                        className="w-4 h-4 rounded border-white/30 text-[#EFD2A6] accent-[#EFD2A6]"
                      />
                      <span>{occ}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider text-[#EFD2A6] font-bold">Price per Metre</span>
                <span className="font-bold text-white">Up to ₹{maxPrice}</span>
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
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>₹200</span>
                <span>₹2,000</span>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-xs"
              >
                <option value="featured">Featured Weaves</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Right Product Grid (3-4 Columns on Desktop, 2 on Mobile) */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs font-ui text-white/60">
              <p>
                Showing <span className="font-bold text-white">{filteredFabrics.length}</span> authentic weaves
              </p>
            </div>

            {filteredFabrics.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#0C2B35] border border-[#EFD2A6]/20 space-y-4">
                <p className="font-display text-xl text-white">No fabrics matched your criteria</p>
                <p className="text-sm text-white/60 font-ui">
                  Try clearing some filters or searching for another fabric category.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredFabrics.map((fabric) => (
                  <div
                    key={fabric.id}
                    className="group flex flex-col rounded-2xl bg-[#0C2B35] border border-[#EFD2A6]/20 hover:border-[#EFD2A6]/60 overflow-hidden transition-all shadow-md"
                  >
                    {/* Fabric Card Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                      <img
                        src={fabric.imageUrl}
                        alt={fabric.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#07222B]/85 backdrop-blur-md border border-[#EFD2A6]/30 text-[10px] sm:text-xs font-ui font-bold text-[#EFD2A6]">
                        ₹{fabric.pricePerMetre}/m
                      </div>
                    </div>

                    {/* Meta & Try On Action */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between font-ui">
                      <div>
                        <span className="text-[10px] sm:text-[11px] text-[#EFD2A6] uppercase tracking-wider font-semibold">
                          {fabric.category}
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-bold text-white mt-0.5 mb-1 group-hover:text-[#EFD2A6] transition-colors truncate">
                          {fabric.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-white/60 line-clamp-2">
                          {fabric.type} · {fabric.weight} weight
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          ₹{fabric.pricePerMetre}
                        </span>
                        <button
                          type="button"
                          onClick={() => startTryOnWithFabric(fabric)}
                          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#EFD2A6] text-[#07222B] text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-sm"
                        >
                          Try On
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      <MobileFilterSheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
        selectedOccasions={selectedOccasions}
        toggleOccasion={toggleOccasion}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onApply={() => {}}
        onReset={handleResetFilters}
      />
    </div>
  );
};
