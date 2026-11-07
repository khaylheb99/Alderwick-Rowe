import React from 'react';
import { Property } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { SearchX, ArrowRight, ShieldCheck } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  onSelectProperty: (ref: string) => void;
  onBookViewing?: (ref: string) => void;
  onRegisterRequirements?: () => void;
  isLoading?: boolean;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onSelectProperty,
  onBookViewing,
  onRegisterRequirements,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 overflow-hidden h-[420px]">
            <div className="bg-slate-200 aspect-[4/3] w-full" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded mt-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white border border-[#E2DFD8] rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm my-8">
        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-[#C8A45C] mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#0F2A44] mb-2">
          No properties match your exact filters
        </h3>
        <p className="text-[#5B6B79] text-sm leading-relaxed mb-6">
          We frequently acquire off-market homes and upcoming listings across the UK. Register your requirements, and a dedicated Alderwick & Rowe consultant will match you with suitable properties before public release.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRegisterRequirements && (
            <button
              type="button"
              onClick={onRegisterRequirements}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-sm font-semibold rounded-md shadow transition-colors gap-2"
            >
              <span>Register Your Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero obligation • Confidential bespoke property search</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard
          key={property.property_reference}
          property={property}
          onSelect={onSelectProperty}
          onBookViewing={onBookViewing}
        />
      ))}
    </div>
  );
};
