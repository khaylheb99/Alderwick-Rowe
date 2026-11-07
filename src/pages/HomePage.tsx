import React, { useState } from 'react';
import { Search, Calendar, ArrowRight, Shield, Award, Users, Compass, CheckCircle2, ChevronRight, Sparkles, Building2, MapPin } from 'lucide-react';
import { getFeaturedProperties, PROPERTY_TYPES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { EnquiryForm } from '../components/EnquiryForm';

interface HomePageProps {
  onNavigate: (route: string, param?: string) => void;
  onFilterSearch?: (criteria: { transaction?: string; location?: string; type?: string; bedrooms?: number }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onFilterSearch }) => {
  const featured = getFeaturedProperties(6);

  // Quick search state
  const [transaction, setTransaction] = useState<'For sale' | 'To rent'>('For sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [bedrooms, setBedrooms] = useState('0');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterSearch) {
      onFilterSearch({
        transaction,
        location: location.trim(),
        type: propertyType,
        bedrooms: Number(bedrooms),
      });
    }
    onNavigate('properties');
  };

  const services = [
    {
      title: 'Residential Sales',
      desc: 'Bespoke marketing, premium photography, accompanied viewings, and diligent sales progression from offer to completion.',
      tag: 'For Vendors',
      action: () => onNavigate('sell-let'),
    },
    {
      title: 'Prime Lettings',
      desc: 'Rigorous referencing, optimal market rent attainment, and seamless tenancy agreements designed for peace of mind.',
      tag: 'For Landlords',
      action: () => onNavigate('sell-let'),
    },
    {
      title: 'Lettings Management',
      desc: 'Comprehensive 24/7 property care, periodic inspections, statutory compliance, and vetted contractor maintenance.',
      tag: 'Full Management',
      action: () => onNavigate('sell-let'),
    },
    {
      title: 'Buyer Concierge',
      desc: 'Dedicated search representation, off-market property access, and objective valuation counsel for home movers.',
      tag: 'For Buyers',
      action: () => onNavigate('properties'),
    },
    {
      title: 'Accompanied Viewings',
      desc: 'In-depth, hosted property tours with architectural insights, floor plans, and neighbourhood orientation.',
      tag: 'Experience',
      action: () => onNavigate('book-viewing'),
    },
    {
      title: 'Sales Progression',
      desc: 'Active solicitor liaison and chain management ensuring transactions move forward without delays.',
      tag: 'Client Care',
      action: () => onNavigate('about'),
    },
  ];

  const testimonials = [
    {
      quote:
        '“The Alderwick & Rowe team handled the sale of our Didsbury family home with extraordinary professionalism. From the initial valuation to exchange, communication was faultless and calm.”',
      author: 'Dr Julian & Sarah Hargreaves',
      location: 'Didsbury, Manchester',
      type: 'Vendor — Sold above guide price',
    },
    {
      quote:
        '“As an overseas landlord with prime flats in Canary Wharf, having a managing agent who delivers transparent accounting and prompt tenant management is invaluable. Truly first-rate.”',
      author: 'Marcus Sterling',
      location: 'Canary Wharf, London',
      type: 'Landlord — Fully Managed Portfolio',
    },
    {
      quote:
        '“Finding a family home in Edinburgh when relocating from Bristol seemed daunting until we engaged Alderwick & Rowe. Their accompanied viewings were punctual and remarkably informative.”',
      author: 'Fiona MacIntyre',
      location: 'Morningside, Edinburgh',
      type: 'Buyer — Three-bedroom purchase',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section with Architectural Elegance */}
      <section className="relative bg-[#0F2A44] text-white overflow-hidden py-16 sm:py-24 lg:py-28">
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C8A45C 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs font-semibold tracking-wider uppercase text-[#C8A45C]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A45C]" />
              <span>Independent UK Estate &amp; Lettings Agency</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Property, handled <span className="italic text-[#C8A45C] font-normal">properly.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
              From historic townhouses in Bath to modern apartments in Canary Wharf and country residences in the Highlands, we provide attentive residential sales, lettings, and viewings across the United Kingdom.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="px-6 py-3.5 bg-[#C8A45C] hover:bg-[#b9944a] text-[#0F2A44] font-semibold text-xs tracking-wider uppercase rounded shadow-md transition-all flex items-center gap-2"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('book-viewing')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase rounded border border-white/20 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C8A45C]" />
                <span>Book a Viewing</span>
              </button>
            </div>
          </div>

          {/* Quick Search Card Bar */}
          <div className="mt-12 bg-white rounded-xl shadow-2xl p-4 sm:p-6 text-[#1F2933] border border-[#E2DFD8]">
            <form onSubmit={handleQuickSearch} className="space-y-4">
              {/* Buy / Rent tab toggle */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setTransaction('For sale')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    transaction === 'For sale'
                      ? 'bg-[#0F2A44] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0F2A44] hover:bg-slate-100'
                  }`}
                >
                  Buy a Property
                </button>
                <button
                  type="button"
                  onClick={() => setTransaction('To rent')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    transaction === 'To rent'
                      ? 'bg-[#0F2A44] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0F2A44] hover:bg-slate-100'
                  }`}
                >
                  Rent a Home
                </button>
                <span className="ml-auto text-xs text-slate-400 hidden sm:inline">
                  50 active UK properties
                </span>
              </div>

              {/* Input fields row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Location */}
                <div>
                  <label htmlFor="quick_location" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Location / Postcode
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="quick_location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. London, Manchester, EH10..."
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F8F7F4] border border-[#E2DFD8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="quick_type" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select
                    id="quick_type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#F8F7F4] border border-[#E2DFD8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:bg-white"
                  >
                    <option value="all">All Property Types</option>
                    {PROPERTY_TYPES.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="quick_bedrooms" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Minimum Bedrooms
                  </label>
                  <select
                    id="quick_bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#F8F7F4] border border-[#E2DFD8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C8A45C] focus:bg-white"
                  >
                    <option value="0">Any number of beds</option>
                    <option value="1">1+ Bedroom</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>

                {/* Submit Search */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 h-[42px]"
                  >
                    <Search className="w-4 h-4 text-[#C8A45C]" />
                    <span>Search Properties</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E2DFD8] gap-4">
          <div>
            <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2A44]">
              Featured UK Properties
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B79] mt-1">
              A handpicked selection of exceptional homes currently available for sale and rent.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2A44] hover:text-[#C8A45C] uppercase tracking-wider transition-colors shrink-0"
          >
            <span>View All 50 Properties</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(property => (
            <PropertyCard
              key={property.property_reference}
              property={property}
              onSelect={(ref) => onNavigate('property', ref)}
              onBookViewing={(ref) => onNavigate('book-viewing', ref)}
            />
          ))}
        </div>
      </section>

      {/* Why Alderwick & Rowe - Value Propositions */}
      <section className="bg-white py-16 border-y border-[#E2DFD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
              The Alderwick &amp; Rowe Difference
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2A44]">
              Why Choose Alderwick &amp; Rowe
            </h2>
            <p className="text-sm text-[#5B6B79] mt-2 leading-relaxed">
              We reject the volume-driven conveyor belt of conventional agency. Our practice is built on discretion, diligence, and genuine local knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]/80 hover:border-[#C8A45C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#C8A45C] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-2">
                Local Expertise Across the UK
              </h3>
              <p className="text-xs text-[#5B6B79] leading-relaxed">
                From London postcodes to Greater Manchester, Edinburgh, and Cardiff, our local consultants know street boundaries, school catchments, and real transaction values.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]/80 hover:border-[#C8A45C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#C8A45C] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-2">
                Transparent Fees
              </h3>
              <p className="text-xs text-[#5B6B79] leading-relaxed">
                Clear, itemised fee agreements confirmed in writing before commencement. No hidden administrative charges, renewal mark-ups, or unapproved contractor costs.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]/80 hover:border-[#C8A45C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#C8A45C] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-2">
                Dedicated Consultant
              </h3>
              <p className="text-xs text-[#5B6B79] leading-relaxed">
                You work with one experienced advisor who personally inspects your property, negotiates offers, and manages viewings from start to finish.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8]/80 hover:border-[#C8A45C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#C8A45C] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-2">
                Accompanied Viewings
              </h3>
              <p className="text-xs text-[#5B6B79] leading-relaxed">
                We never leave applicants to wander alone. Every viewing is hosted with detailed particulars, respectful security, and immediate written feedback to vendors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
            End-to-End Capabilities
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2A44]">
            Our Professional Services
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B79] mt-2">
            Tailored advisory services for home movers, buy-to-let landlords, and institutional property owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              onClick={svc.action}
              className="bg-white border border-[#E2DFD8] rounded-xl p-6 hover:border-[#C8A45C] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-1 rounded">
                  {svc.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0F2A44] mt-3 group-hover:text-[#C8A45C] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-[#5B6B79] mt-2 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F2A44]">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 text-[#C8A45C] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Band (Clearly marked sample content) */}
      <section className="bg-slate-100/70 py-16 border-y border-[#E2DFD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
              Client Experiences
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2A44]">
              What Our Clients Say
            </h2>
            <p className="text-xs text-slate-500 mt-1 italic">
              (Sample client reviews provided for demonstration of marketing layout)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#E2DFD8] shadow-sm flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  {t.quote}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-serif text-sm font-bold text-[#0F2A44]">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-[#C8A45C] font-medium">{t.location}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0F2A44] rounded-2xl p-6 sm:p-10 lg:p-12 text-white shadow-xl overflow-hidden relative">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
              Bespoke Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Register your requirements with our UK consultants
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are planning to sell a family home, acquire an investment apartment, or seek an experienced letting agent, tell us your timeline and criteria.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Immediate notification of new listings before portal release</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Transparent valuation reports backed by Land Registry data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Strict confidentiality and zero spam guaranteed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm
              formType="enquiry"
              compact={false}
              title="Speak with a Consultant"
              subtitle="Submit your details below and our team will get in touch with you."
            />
          </div>
        </div>
      </section>
    </div>
  );
};
