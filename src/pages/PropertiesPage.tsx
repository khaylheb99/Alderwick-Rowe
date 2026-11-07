import React, { useState, useMemo } from 'react';
import { PROPERTIES, Property } from '../data/properties';
import { FilterBar, FilterState } from '../components/FilterBar';
import { PropertyGrid } from '../components/PropertyGrid';
import { EnquiryForm } from '../components/EnquiryForm';
import { MapPin, X, ArrowDown } from 'lucide-react';

interface PropertiesPageProps {
  initialFilters?: Partial<FilterState>;
  onNavigate: (route: string, param?: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  transaction: 'all',
  locationQuery: '',
  propertyType: 'all',
  minBedrooms: 0,
  maxPrice: 0,
  sortBy: 'featured',
};

const PAGE_SIZE = 12;

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  initialFilters = {},
  onNavigate,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [showRequirementModal, setShowRequirementModal] = useState(false);

  // Filter and sort properties client-side
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      // 1. Transaction filter
      if (filters.transaction !== 'all' && property.transaction !== filters.transaction) {
        return false;
      }

      // 2. Location search (matches locality, city, region, postcode, street)
      if (filters.locationQuery.trim()) {
        const query = filters.locationQuery.toLowerCase().trim();
        const fullLocationText = `${property.locality} ${property.city} ${property.region} ${property.postcode} ${property.street_address}`.toLowerCase();
        if (!fullLocationText.includes(query)) {
          return false;
        }
      }

      // 3. Property Type
      if (filters.propertyType !== 'all') {
        if (property.property_type.toLowerCase() !== filters.propertyType.toLowerCase()) {
          return false;
        }
      }

      // 4. Minimum Bedrooms
      if (filters.minBedrooms > 0 && property.bedrooms < filters.minBedrooms) {
        return false;
      }

      // 5. Max Price / Rent
      if (filters.maxPrice > 0) {
        if (property.transaction === 'To rent') {
          if (!property.rental_price_pcm || property.rental_price_pcm > filters.maxPrice) {
            return false;
          }
        } else {
          if (!property.asking_price || property.asking_price > filters.maxPrice) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        const priceA = a.asking_price || a.rental_price_pcm || 0;
        const priceB = b.asking_price || b.rental_price_pcm || 0;
        return priceA - priceB;
      }
      if (filters.sortBy === 'price-desc') {
        const priceA = a.asking_price || a.rental_price_pcm || 0;
        const priceB = b.asking_price || b.rental_price_pcm || 0;
        return priceB - priceA;
      }
      if (filters.sortBy === 'beds-desc') {
        return b.bedrooms - a.bedrooms;
      }
      return 0; // Default featured order
    });
  }, [filters]);

  const displayedProperties = useMemo(() => {
    return filteredProperties.slice(0, visibleCount);
  }, [filteredProperties, visibleCount]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setVisibleCount(PAGE_SIZE);
  };

  const handleQuickRegion = (regionName: string) => {
    setFilters(prev => ({
      ...prev,
      locationQuery: regionName,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Page Header */}
      <div className="bg-[#0F2A44] text-white py-10 sm:py-14 border-b border-[#1A3F65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
              National Property Register
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Properties Across the UK
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Explore residential homes for sale and let across London, the North West, Scotland, Wales, and Northern Ireland. Accompanied viewings available 6 days a week.
            </p>

            {/* Quick region pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-2">
              <span className="text-xs text-slate-400 mr-1">Popular:</span>
              {['London', 'Manchester', 'Edinburgh', 'Bristol', 'Birmingham', 'Cardiff', 'Belfast'].map(city => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleQuickRegion(city)}
                  className="px-2.5 py-1 text-xs rounded-full bg-white/10 hover:bg-[#C8A45C] hover:text-[#0F2A44] text-slate-200 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <FilterBar
        filters={filters}
        onChange={(next) => {
          setFilters(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onReset={handleResetFilters}
        totalCount={PROPERTIES.length}
        filteredCount={filteredProperties.length}
      />

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PropertyGrid
          properties={displayedProperties}
          onSelectProperty={(ref) => onNavigate('property', ref)}
          onBookViewing={(ref) => onNavigate('book-viewing', ref)}
          onRegisterRequirements={() => setShowRequirementModal(true)}
        />

        {/* Load More Button */}
        {visibleCount < filteredProperties.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 text-[#0F2A44] border border-[#E2DFD8] hover:border-[#C8A45C] text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-all"
            >
              <span>Load More Properties ({filteredProperties.length - visibleCount} remaining)</span>
              <ArrowDown className="w-4 h-4 text-[#C8A45C]" />
            </button>
          </div>
        )}
      </div>

      {/* Register Requirements Modal */}
      {showRequirementModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
            <button
              type="button"
              onClick={() => setShowRequirementModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <EnquiryForm
              formType="enquiry"
              title="Register Your Property Requirements"
              subtitle="Tell us the areas, bedroom counts, or budget you seek. We will alert you immediately when matching properties become available."
              onSuccess={() => {
                setTimeout(() => setShowRequirementModal(false), 2000);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
