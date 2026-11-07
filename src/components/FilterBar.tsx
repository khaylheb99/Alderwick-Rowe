import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PROPERTY_TYPES } from '../data/properties';

export interface FilterState {
  transaction: 'all' | 'For sale' | 'To rent';
  locationQuery: string;
  propertyType: string;
  minBedrooms: number; // 0 = any
  maxPrice: number; // 0 = any
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'beds-desc';
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  const isRent = filters.transaction === 'To rent';

  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filters, ...patch });
  };

  const hasActiveFilters =
    filters.transaction !== 'all' ||
    filters.locationQuery !== '' ||
    filters.propertyType !== 'all' ||
    filters.minBedrooms > 0 ||
    filters.maxPrice > 0;

  return (
    <div className="bg-white border-y border-[#E2DFD8] shadow-sm sticky top-16 z-20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Transaction segmented toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg w-full lg:w-auto shrink-0 border border-slate-200">
            <button
              type="button"
              onClick={() => update({ transaction: 'all', maxPrice: 0 })}
              className={`flex-1 lg:flex-initial px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.transaction === 'all'
                  ? 'bg-[#0F2A44] text-white shadow'
                  : 'text-slate-600 hover:text-[#0F2A44]'
              }`}
            >
              All Listings
            </button>
            <button
              type="button"
              onClick={() => update({ transaction: 'For sale', maxPrice: 0 })}
              className={`flex-1 lg:flex-initial px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.transaction === 'For sale'
                  ? 'bg-[#0F2A44] text-white shadow'
                  : 'text-slate-600 hover:text-[#0F2A44]'
              }`}
            >
              For Sale
            </button>
            <button
              type="button"
              onClick={() => update({ transaction: 'To rent', maxPrice: 0 })}
              className={`flex-1 lg:flex-initial px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.transaction === 'To rent'
                  ? 'bg-[#0F2A44] text-white shadow'
                  : 'text-slate-600 hover:text-[#0F2A44]'
              }`}
            >
              To Rent
            </button>
          </div>

          {/* Search by location/postcode */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.locationQuery}
              onChange={(e) => update({ locationQuery: e.target.value })}
              placeholder="Search city, town, locality or postcode..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F8F7F4] border border-[#E2DFD8] rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:border-[#C8A45C] transition-colors"
            />
          </div>

          {/* Dropdown Filters Group */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:flex items-center">
            {/* Property Type */}
            <div className="relative">
              <select
                value={filters.propertyType}
                onChange={(e) => update({ propertyType: e.target.value })}
                aria-label="Filter by property type"
                className="w-full lg:w-40 appearance-none bg-[#F8F7F4] border border-[#E2DFD8] text-xs sm:text-sm text-slate-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:border-[#C8A45C] cursor-pointer"
              >
                <option value="all">Property Type: All</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Bedrooms */}
            <div className="relative">
              <select
                value={filters.minBedrooms}
                onChange={(e) => update({ minBedrooms: Number(e.target.value) })}
                aria-label="Filter by minimum bedrooms"
                className="w-full lg:w-32 appearance-none bg-[#F8F7F4] border border-[#E2DFD8] text-xs sm:text-sm text-slate-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:border-[#C8A45C] cursor-pointer"
              >
                <option value="0">Bedrooms: Any</option>
                <option value="1">1+ Bedroom</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Max Budget */}
            <div className="relative">
              <select
                value={filters.maxPrice}
                onChange={(e) => update({ maxPrice: Number(e.target.value) })}
                aria-label="Filter by maximum price"
                className="w-full lg:w-36 appearance-none bg-[#F8F7F4] border border-[#E2DFD8] text-xs sm:text-sm text-slate-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:border-[#C8A45C] cursor-pointer"
              >
                <option value="0">Max Price: Any</option>
                {isRent ? (
                  <>
                    <option value="1000">Up to £1,000 pcm</option>
                    <option value="1500">Up to £1,500 pcm</option>
                    <option value="2000">Up to £2,000 pcm</option>
                    <option value="2500">Up to £2,500 pcm</option>
                    <option value="3000">Up to £3,000 pcm</option>
                  </>
                ) : (
                  <>
                    <option value="300000">Up to £300,000</option>
                    <option value="400000">Up to £400,000</option>
                    <option value="500000">Up to £500,000</option>
                    <option value="750000">Up to £750,000</option>
                    <option value="1000000">Up to £1,000,000</option>
                  </>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Order */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => update({ sortBy: e.target.value as FilterState['sortBy'] })}
                aria-label="Sort properties"
                className="w-full lg:w-36 appearance-none bg-[#F8F7F4] border border-[#E2DFD8] text-xs sm:text-sm text-slate-700 py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:border-[#C8A45C] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds-desc">Most Bedrooms</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Status Strip & Reset */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-[#0F2A44]">{filteredCount}</span>
            <span>of {totalCount} properties available</span>
            {hasActiveFilters && (
              <span className="text-slate-400">• Filtering active</span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-[#0F2A44] hover:text-[#C8A45C] font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
