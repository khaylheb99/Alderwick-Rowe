import React, { useState, useEffect } from 'react';
import {
  getPropertyByReference,
  getSimilarProperties,
  Property,
} from '../data/properties';
import { PriceTag } from '../components/PriceTag';
import { StatusPill } from '../components/StatusPill';
import { PropertyCard } from '../components/PropertyCard';
import { EnquiryForm } from '../components/EnquiryForm';
import { isPropertySaved, toggleSavedProperty } from '../services/favoritesService';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Heart,
  Share2,
  FileText,
  ShieldAlert,
  ArrowLeft,
  Check,
  Building,
  Sparkles,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';

interface PropertyDetailPageProps {
  propertyReference: string;
  onNavigate: (route: string, param?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyReference,
  onNavigate,
}) => {
  const property = getPropertyByReference(propertyReference);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'location'>('overview');

  useEffect(() => {
    if (property) {
      setSaved(isPropertySaved(property.property_reference));
      setActiveImageIndex(0);
      window.scrollTo(0, 0);

      // Inject Schema.org JSON-LD structured data for RealEstateListing
      const scriptId = 'real-estate-jsonld';
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: property.property_title,
        description: property.description,
        url: window.location.href,
        identifier: property.property_reference,
        category: property.property_type,
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.street_address,
          addressLocality: property.locality,
          addressRegion: property.region,
          postalCode: property.postcode,
          addressCountry: 'GB',
        },
        offers: {
          '@type': 'Offer',
          price: property.asking_price || property.rental_price_pcm,
          priceCurrency: 'GBP',
          businessFunction: property.transaction === 'For sale' ? 'http://purl.org/goodrelations/v1#Sell' : 'http://purl.org/goodrelations/v1#LeaseOut',
          availability: property.availability_status.includes('Under offer') ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
        },
      });
      document.head.appendChild(script);

      return () => {
        const cleanup = document.getElementById(scriptId);
        if (cleanup) cleanup.remove();
      };
    }
  }, [property]);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0F2A44] mb-3">
          Property Listing Not Found
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          The property reference &quot;{propertyReference}&quot; could not be located in our UK portfolio.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('properties')}
          className="px-6 py-3 bg-[#0F2A44] text-white text-xs font-semibold uppercase tracking-wider rounded"
        >
          Return to Properties
        </button>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    const next = toggleSavedProperty(property.property_reference);
    setSaved(next);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const featuresList = property.features
    .split(';')
    .map(f => f.trim())
    .filter(Boolean);

  const similarProperties = getSimilarProperties(property, 3);

  return (
    <div className="bg-[#F8F7F4] min-h-screen pb-24">
      {/* Breadcrumb & Navigation Header */}
      <div className="bg-white border-b border-[#E2DFD8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 overflow-hidden">
            <button
              type="button"
              onClick={() => onNavigate('properties')}
              className="inline-flex items-center gap-1 hover:text-[#0F2A44] font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to search</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 truncate">{property.region}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 truncate">{property.city}</span>
            <span className="text-slate-300">/</span>
            <span className="font-mono text-[#0F2A44] font-semibold">{property.property_reference}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                saved
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sample Demo Record Notice */}
        {property.is_fictional_demo_record && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Sample listing for demonstration purposes.</strong> This record illustrates our UK marketing and specification presentation format.
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              Demonstration
            </span>
          </div>
        )}

        {/* Gallery Section */}
        <section aria-label="Property gallery" className="space-y-3">
          {/* 16:9 Hero Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-[#E2DFD8]">
            <img
              src={property.images[activeImageIndex]}
              alt={`${property.property_title} - Photo ${activeImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#0F2A44] text-white text-xs font-bold uppercase tracking-wider shadow">
                {property.transaction}
              </span>
              <span className="px-2.5 py-1 rounded bg-white/95 text-[#0F2A44] font-mono text-xs font-semibold shadow">
                {property.property_reference}
              </span>
            </div>
            <div className="absolute bottom-4 left-4">
              <StatusPill status={property.availability_status} isFictionalDemo={property.is_fictional_demo_record} />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded font-medium">
              Photo {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-3">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#C8A45C] ring-2 ring-[#C8A45C]/30 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Property Facts, Description, Features, Map */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Price Header */}
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-wider">
                      {property.property_type}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {property.tenure}
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2A44] leading-tight">
                    {property.property_title}
                  </h1>
                  <p className="flex items-center gap-1.5 text-sm sm:text-base text-slate-600 pt-1">
                    <MapPin className="w-4 h-4 text-[#C8A45C] shrink-0" />
                    <span>
                      {property.street_address}, {property.locality}, {property.city}, {property.region}{' '}
                      <strong className="font-mono text-[#0F2A44]">{property.postcode}</strong>
                    </span>
                  </p>
                </div>

                <div className="bg-[#F8F7F4] p-4 rounded-lg border border-[#E2DFD8] md:text-right shrink-0">
                  <PriceTag
                    transaction={property.transaction}
                    askingPrice={property.asking_price}
                    rentalPricePcm={property.rental_price_pcm}
                    size="lg"
                    showWeeklyEquivalent={true}
                  />
                </div>
              </div>

              {/* Key Facts Metric Row */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-[#F8F7F4] rounded-lg border border-slate-100">
                  <Bed className="w-5 h-5 text-[#0F2A44] mx-auto mb-1" />
                  <span className="block text-base font-bold text-[#0F2A44]">{property.bedrooms}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Bedrooms</span>
                </div>
                <div className="p-3 bg-[#F8F7F4] rounded-lg border border-slate-100">
                  <Bath className="w-5 h-5 text-[#0F2A44] mx-auto mb-1" />
                  <span className="block text-base font-bold text-[#0F2A44]">{property.bathrooms}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Bathrooms</span>
                </div>
                <div className="p-3 bg-[#F8F7F4] rounded-lg border border-slate-100">
                  <Maximize2 className="w-5 h-5 text-[#0F2A44] mx-auto mb-1" />
                  <span className="block text-base font-bold text-[#0F2A44]">{property.size_sqm} m²</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Internal Area</span>
                </div>
                <div className="p-3 bg-[#F8F7F4] rounded-lg border border-slate-100">
                  <Zap className="w-5 h-5 text-[#0F2A44] mx-auto mb-1" />
                  <span className="block text-base font-bold text-[#0F2A44]">Band {property.epc_rating}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">EPC Rating</span>
                </div>
              </div>
            </div>

            {/* Description & Key Features */}
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0F2A44] mb-3">
                  Property Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features split by semicolon */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-3">
                  Key Specifications &amp; Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {featuresList.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8F7F4] border border-[#E2DFD8] text-xs font-medium text-slate-700"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A45C]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Regulatory Particulars */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <span className="font-bold text-[#0F2A44] block">Tenure</span>
                  <span>{property.tenure}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0F2A44] block">Council Tax Band</span>
                  <span>Band {property.council_tax_band}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0F2A44] block">Local Authority</span>
                  <span>{property.city} Council</span>
                </div>
              </div>
            </div>

            {/* Map / Location Guide Placeholder */}
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F2A44]">
                    Location &amp; Neighbourhood
                  </h3>
                  <p className="text-xs text-slate-500">
                    {property.locality}, {property.city} ({property.postcode})
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#0F2A44] bg-slate-100 px-2.5 py-1 rounded">
                  Postcode: {property.postcode}
                </span>
              </div>

              {/* Stylised Map Placeholder Container */}
              <div className="relative h-64 sm:h-80 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                {/* Visual grid representing UK street map */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(#0F2A44 1px, transparent 1px), linear-gradient(90deg, #0F2A44 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                  }}
                />

                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-12 h-12 bg-[#0F2A44] text-[#C8A45C] rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-white animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#0F2A44]">
                    {property.street_address}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm">
                    {property.locality}, {property.city}, {property.postcode}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Map preview centered on {property.postcode}. Exact street orientation provided at viewing.
                  </p>
                </div>
              </div>

              {/* Nearby Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-[#F8F7F4] rounded-lg">
                  <span className="font-bold text-[#0F2A44] block mb-1">Public Transport</span>
                  <span className="text-slate-600">Local rail and bus connections within 0.3 miles</span>
                </div>
                <div className="p-3 bg-[#F8F7F4] rounded-lg">
                  <span className="font-bold text-[#0F2A44] block mb-1">Education</span>
                  <span className="text-slate-600">High-performing primary and secondary catchments nearby</span>
                </div>
                <div className="p-3 bg-[#F8F7F4] rounded-lg">
                  <span className="font-bold text-[#0F2A44] block mb-1">Amenities</span>
                  <span className="text-slate-600">High street boutiques, groceries, and green parks accessible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Form & Direct Contact */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Action Box with 2 Primary CTAs */}
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 shadow-md space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0F2A44]">
                Next Steps
              </h3>
              <p className="text-xs text-slate-600">
                To inspect this property in person or request formal particulars, please select an option below:
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate('book-viewing', property.property_reference)}
                  className="w-full py-3.5 px-4 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C8A45C]" />
                  <span>Book an Accompanied Viewing</span>
                </button>

                <a
                  href="tel:02079460192"
                  className="w-full py-3 px-4 bg-white border border-[#0F2A44] text-[#0F2A44] hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C8A45C]" />
                  <span>Call 020 7946 0192</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-500">
                  Quote Reference: <strong className="font-mono text-[#0F2A44]">{property.property_reference}</strong>
                </span>
              </div>
            </div>

            {/* Direct Enquiry Form */}
            <EnquiryForm
              formType="enquiry"
              propertyReference={property.property_reference}
              propertyTitle={property.property_title}
              compact={true}
              title="Enquire About This Property"
              subtitle="Send a direct enquiry to the consultant handling this instruction."
            />
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="pt-12 border-t border-[#E2DFD8] space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
                More in this area
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F2A44]">
                Similar Properties You May Like
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map(sim => (
                <PropertyCard
                  key={sim.property_reference}
                  property={sim}
                  onSelect={(ref) => onNavigate('property', ref)}
                  onBookViewing={(ref) => onNavigate('book-viewing', ref)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3 lg:hidden">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Price</span>
          <span className="font-bold text-[#0F2A44] text-sm">
            {property.asking_price ? `£${property.asking_price.toLocaleString()}` : `£${property.rental_price_pcm} pcm`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:02079460192"
            className="p-2.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            aria-label="Call agency"
          >
            <Phone className="w-4 h-4 text-[#0F2A44]" />
          </a>
          <button
            type="button"
            onClick={() => onNavigate('book-viewing', property.property_reference)}
            className="px-4 py-2.5 bg-[#0F2A44] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C8A45C]" />
            <span>Book Viewing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
