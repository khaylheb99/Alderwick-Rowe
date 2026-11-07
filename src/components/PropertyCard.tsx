import React, { useState, useEffect } from 'react';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { Property } from '../data/properties';
import { PriceTag } from './PriceTag';
import { StatusPill } from './StatusPill';
import { isPropertySaved, toggleSavedProperty } from '../services/favoritesService';

interface PropertyCardProps {
  property: Property;
  onSelect: (ref: string) => void;
  onBookViewing?: (ref: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, onBookViewing }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPropertySaved(property.property_reference));
  }, [property.property_reference]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSavedProperty(property.property_reference);
    setSaved(next);
  };

  const isSale = property.transaction === 'For sale';

  return (
    <div
      onClick={() => onSelect(property.property_reference)}
      className="group bg-white rounded-lg overflow-hidden border border-[#E2DFD8] hover:border-[#C8A45C] hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'}
          alt={`${property.property_title} on ${property.street_address}, ${property.locality}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1.5 items-start pointer-events-auto">
            <span
              className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded shadow-sm text-white ${
                isSale ? 'bg-[#0F2A44]' : 'bg-[#1A3F65]'
              }`}
            >
              {property.transaction}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-white/95 text-[#0F2A44] font-semibold rounded shadow-sm border border-slate-200">
              {property.property_reference}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={saved ? 'Remove from saved' : 'Save to favourites'}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md transition-colors"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Status Pill on Image */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <StatusPill status={property.availability_status} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="mb-2">
            <PriceTag
              transaction={property.transaction}
              askingPrice={property.asking_price}
              rentalPricePcm={property.rental_price_pcm}
              size="md"
            />
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#0F2A44] leading-snug group-hover:text-[#C8A45C] transition-colors line-clamp-1">
            {property.property_title}
          </h3>

          {/* Location */}
          <p className="mt-1 flex items-center text-sm text-[#5B6B79] gap-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-[#C8A45C] shrink-0" />
            <span>
              {property.locality}, {property.city} <span className="text-slate-400 font-mono text-xs">({property.postcode})</span>
            </span>
          </p>

          {/* Key specs */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-[#0F2A44]" />
              <span className="font-medium">{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-[#0F2A44]" />
              <span className="font-medium">{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
            </div>
            <div className="flex items-center gap-1.5" title={`Floor area: ${property.size_sqm} sq m`}>
              <Maximize2 className="w-4 h-4 text-[#0F2A44]" />
              <span className="font-medium">{property.size_sqm} m²</span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-[#5B6B79] font-medium">
            {property.property_type}
          </span>
          <div className="flex items-center gap-2">
            {onBookViewing && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookViewing(property.property_reference);
                }}
                className="text-xs text-[#0F2A44] hover:text-[#C8A45C] font-semibold underline underline-offset-2 py-1 px-2"
              >
                Book Viewing
              </button>
            )}
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0F2A44] group-hover:text-[#C8A45C] group-hover:translate-x-0.5 transition-all">
              Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
