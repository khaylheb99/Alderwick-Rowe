import React from 'react';
import { Mail, Phone, MapPin, Clock, Shield, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A1C2E] text-slate-300 border-t border-[#152e47]">
      {/* Trust & Accreditations Ribbon */}
      <div className="bg-[#0F2A44] py-6 border-b border-[#1A3F65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Shield className="w-6 h-6 text-[#C8A45C] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Propertymark Protected</h4>
                <p className="text-[11px] text-slate-400">Client money protection &amp; audited accounting</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Award className="w-6 h-6 text-[#C8A45C] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Property Ombudsman</h4>
                <p className="text-[11px] text-slate-400">Independent redressed consumer resolution</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#C8A45C] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tenancy Deposit Scheme</h4>
                <p className="text-[11px] text-slate-400">Custodial deposit security for all tenants</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-6 h-6 text-[#C8A45C] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Nationwide Reach</h4>
                <p className="text-[11px] text-slate-400">London, Manchester, Scotland, Wales &amp; NI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
                Alderwick &amp; Rowe
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#C8A45C] uppercase font-semibold mt-0.5">
                Estate &amp; Lettings Agents Ltd
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Property, handled properly. We provide transparent, knowledgeable, and attentive residential sales, lettings management, and viewing services across prime UK neighbourhoods.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                <span>Head Office: [14 Berkeley Square, Mayfair, London, W1J 6BQ]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A45C] shrink-0" />
                <a href="tel:02079460192" className="hover:text-white transition-colors">[020 7946 0192]</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A45C] shrink-0" />
                <a href="mailto:enquiries@alderwickandrowe.co.uk" className="hover:text-white transition-colors">[enquiries@alderwickandrowe.co.uk]</a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                <span>Mon–Fri: 08:30–18:30 | Sat: 09:00–16:00 | Sun: By appointment</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#C8A45C] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  All Properties
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('sell-let')} className="hover:text-[#C8A45C] transition-colors">
                  Sell with Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('sell-let')} className="hover:text-[#C8A45C] transition-colors">
                  Let with Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('book-viewing')} className="hover:text-[#C8A45C] transition-colors">
                  Book a Viewing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="hover:text-[#C8A45C] transition-colors">
                  About Our Firm
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contact')} className="hover:text-[#C8A45C] transition-colors">
                  Contact &amp; Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Property Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Key UK Coverage
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  London &amp; Home Counties
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Greater Manchester &amp; North West
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Birmingham &amp; West Midlands
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Yorkshire &amp; The Humber
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Edinburgh, Glasgow &amp; Aberdeen
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Cardiff, Swansea &amp; Wales
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('properties')} className="hover:text-[#C8A45C] transition-colors">
                  Belfast &amp; Northern Ireland
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Compliance &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('privacy-policy')} className="hover:text-[#C8A45C] transition-colors">
                  UK GDPR Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('cookie-notice')} className="hover:text-[#C8A45C] transition-colors">
                  Cookie Notice &amp; Preferences
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Complaints Procedure [Placeholder]
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Client Money Protection Certificate [Placeholder]
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Anti-Money Laundering (AML) Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Company Registration & Regulatory Note */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            Alderwick &amp; Rowe Ltd is a company registered in England &amp; Wales [COMPANY NUMBER: 08942184]. Registered Office: [14 Berkeley Square, Mayfair, London, W1J 6BQ]. VAT Registration Number: [GB 948 2018 42].
          </p>
          <p>
            <strong>Important notice:</strong> Property availability is strictly subject to confirmation and contract. All dimensions, specifications, floor plans, and photographic representations are published for preliminary guidance only and do not form part of any offer or binding contract.
          </p>
          <p className="text-slate-400">
            <strong>Sample Content:</strong> Listings marked as demonstration records represent sample property data for marketing layout evaluation. No client data from any internal source is stored or displayed on the public site.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Alderwick &amp; Rowe Ltd &copy; {new Date().getFullYear()}. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[11px]">
            <button type="button" onClick={() => onNavigate('privacy-policy')} className="hover:text-slate-300">Privacy</button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('cookie-notice')} className="hover:text-slate-300">Cookies</button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('contact')} className="hover:text-slate-300">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
