import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart, Calendar, ChevronRight, Home, Building2, MapPin } from 'lucide-react';
import { getSavedPropertyRefs } from '../services/favoritesService';
import { PROPERTIES } from '../data/properties';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [savedRefs, setSavedRefs] = useState<string[]>([]);

  const refreshSaved = () => {
    setSavedRefs(getSavedPropertyRefs());
  };

  useEffect(() => {
    refreshSaved();
    const handleStorage = () => refreshSaved();
    window.addEventListener('alderwick_favorites_changed', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('alderwick_favorites_changed', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'sell-let', label: 'Sell / Let with Us' },
    { id: 'book-viewing', label: 'Book a Viewing' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const savedProperties = PROPERTIES.filter(p => savedRefs.includes(p.property_reference.toUpperCase()));

  return (
    <>
      {/* Top Banner - Understated Premium Utility */}
      <header className="sticky top-0 z-40 bg-[#0F2A44] text-white border-b border-[#1A3F65] shadow-md">
        <div className="bg-[#0A1C2E] py-1 px-4 sm:px-6 lg:px-8 border-b border-[#152e47] text-[11px] text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Residential Sales, Lettings & Management across the UK</span>
              <span className="sm:hidden font-medium text-[#C8A45C]">Alderwick & Rowe UK</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:02079460192"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                title="Direct enquiry line"
              >
                <Phone className="w-3 h-3 text-[#C8A45C]" />
                <span className="font-mono font-medium">020 7946 0192</span>
              </a>
              <span className="text-slate-500 hidden md:inline">|</span>
              <span className="text-slate-400 hidden md:inline">London • Manchester • Edinburgh • Cardiff</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand Name */}
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer group flex flex-col justify-center"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-[#C8A45C] transition-colors uppercase">
                Alderwick &amp; Rowe
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C8A45C] uppercase font-medium">
                Estate &amp; Lettings Agents
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map(link => {
                const isActive = currentRoute === link.id || (link.id === 'properties' && currentRoute.startsWith('property/'));
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-colors rounded-md ${
                      isActive
                        ? 'text-[#C8A45C] font-semibold bg-white/5'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs (Saved + Book Viewing) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Shortlist / Favourites Button */}
              <button
                type="button"
                onClick={() => setFavoritesOpen(!favoritesOpen)}
                aria-label="View saved shortlist"
                className="relative p-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Heart className={`w-5 h-5 ${savedRefs.length > 0 ? 'fill-[#C8A45C] text-[#C8A45C]' : ''}`} />
                {savedRefs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A45C] text-[#0F2A44] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {savedRefs.length}
                  </span>
                )}
              </button>

              {/* Book a Viewing Primary CTA */}
              <button
                type="button"
                onClick={() => onNavigate('book-viewing')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C8A45C] hover:bg-[#b9944a] text-[#0F2A44] font-semibold text-xs tracking-wider uppercase rounded shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Viewing</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setFavoritesOpen(!favoritesOpen)}
                aria-label="View saved properties"
                className="relative p-2 text-slate-200 hover:text-white"
              >
                <Heart className={`w-5 h-5 ${savedRefs.length > 0 ? 'fill-[#C8A45C] text-[#C8A45C]' : ''}`} />
                {savedRefs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A45C] text-[#0F2A44] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {savedRefs.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded text-slate-200 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1C2E] border-t border-[#1A3F65] px-4 pt-3 pb-6 animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map(link => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md flex items-center justify-between ${
                      isActive
                        ? 'bg-[#0F2A44] text-[#C8A45C] font-semibold'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#1A3F65] space-y-3">
              <button
                type="button"
                onClick={() => {
                  onNavigate('book-viewing');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#C8A45C] text-[#0F2A44] font-semibold text-xs tracking-wider uppercase rounded flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Viewing</span>
              </button>
              <a
                href="tel:02079460192"
                className="w-full py-2.5 border border-[#1A3F65] text-slate-200 font-medium text-xs tracking-wider uppercase rounded flex items-center justify-center gap-2 hover:bg-white/5"
              >
                <Phone className="w-4 h-4 text-[#C8A45C]" />
                <span>Call 020 7946 0192</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Favourites / Shortlist Modal Drawer */}
      {favoritesOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
            <div className="p-5 bg-[#0F2A44] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-[#C8A45C] text-[#C8A45C]" />
                <h3 className="font-serif text-lg font-bold">Your Saved Properties</h3>
              </div>
              <button
                type="button"
                onClick={() => setFavoritesOpen(false)}
                className="p-1 rounded text-slate-300 hover:text-white"
                aria-label="Close saved properties drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedProperties.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-[#0F2A44]">No properties saved yet</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Click the heart icon on any property card to save your favourite homes for quick comparison.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFavoritesOpen(false);
                      onNavigate('properties');
                    }}
                    className="mt-4 px-4 py-2 bg-[#0F2A44] text-white text-xs font-semibold rounded hover:bg-[#1A3F65]"
                  >
                    Explore Properties
                  </button>
                </div>
              ) : (
                savedProperties.map(p => (
                  <div
                    key={p.property_reference}
                    onClick={() => {
                      setFavoritesOpen(false);
                      onNavigate('property', p.property_reference);
                    }}
                    className="p-3 border border-slate-200 rounded-lg flex items-center gap-3 hover:border-[#C8A45C] cursor-pointer transition-colors"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.property_title}
                      className="w-16 h-16 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-[#C8A45C] font-semibold">{p.property_reference}</span>
                      <h4 className="text-xs font-bold text-[#0F2A44] truncate">{p.property_title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{p.locality}, {p.city}</p>
                      <p className="text-xs font-semibold text-[#0F2A44] mt-0.5">
                        {p.asking_price ? `£${p.asking_price.toLocaleString()}` : `£${p.rental_price_pcm} pcm`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {savedProperties.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('alderwick_saved_properties');
                    refreshSaved();
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 underline"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFavoritesOpen(false);
                    onNavigate('properties');
                  }}
                  className="px-4 py-2 bg-[#0F2A44] text-white text-xs font-semibold rounded hover:bg-[#1A3F65]"
                >
                  Browse More
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
