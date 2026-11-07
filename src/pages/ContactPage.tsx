import React, { useState } from 'react';
import { EnquiryForm } from '../components/EnquiryForm';
import { MapPin, Phone, Mail, Clock, MessageSquare, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const offices = [
    {
      city: 'London (Mayfair Head Office)',
      address: '[14 Berkeley Square, Mayfair, London, W1J 6BQ]',
      phone: '[020 7946 0192]',
      email: '[london@alderwickandrowe.co.uk]',
      coverage: 'Central London, Wimbledon, Canary Wharf, Battersea, Islington',
    },
    {
      city: 'Manchester & North West',
      address: '[76 King Street, Manchester, M2 4NH]',
      phone: '[0161 832 9011]',
      email: '[manchester@alderwickandrowe.co.uk]',
      coverage: 'Didsbury, Salford Quays, Altrincham, Chester, Liverpool',
    },
    {
      city: 'Edinburgh & Scotland',
      address: '[18 Charlotte Square, Edinburgh, EH2 4DF]',
      phone: '[0131 225 4400]',
      email: '[scotland@alderwickandrowe.co.uk]',
      coverage: 'Morningside, Glasgow West End, Aberdeen, Dundee',
    },
    {
      city: 'Cardiff & Wales',
      address: '[9 Windsor Place, Cardiff, CF10 3BX]',
      phone: '[029 2034 5110]',
      email: '[wales@alderwickandrowe.co.uk]',
      coverage: 'Pontcanna, Cyncoed, Swansea Uplands, Newport',
    },
  ];

  const faqs = [
    {
      q: 'How quickly can you arrange an accompanied viewing?',
      a: 'We generally confirm accompanied viewings within 4 to 12 hours. Where a property is tenanted or owner-occupied, we respect a 24-hour notice etiquette to ensure pleasant and unhurried access.',
    },
    {
      q: 'Are your market valuations genuinely free and without obligation?',
      a: 'Yes, completely. A senior consultant will visit your home, review recent comparable sales from the Land Registry, and provide a clear written market appraisal without any pressure or obligation.',
    },
    {
      q: 'How do you handle client money and rental deposits?',
      a: 'All client funds are held in ring-fenced, independently audited client accounts protected under the Propertymark Client Money Protection (CMP) Scheme. Tenancy deposits are registered with the Tenancy Deposit Scheme (TDS).',
    },
    {
      q: 'What are your fee terms for residential sales and lettings?',
      a: 'Our fee structure is transparent, competitive, and agreed in writing before marketing commences. We have zero hidden administrative fees, zero portal listing surcharges, and no abortive charges if you decide not to proceed.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            Direct Communication
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2A44]">
            Contact Alderwick &amp; Rowe
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B79] leading-relaxed">
            Reach our advisory partners, regional offices, and viewing teams across the UK. We reply promptly to all written enquiries.
          </p>
        </div>
      </div>

      {/* Main Grid: Form & Key Office Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#0F2A44]">
                Central Client Desk
              </h3>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0F2A44]">Mayfair Registered Office</strong>
                    <span>[14 Berkeley Square, Mayfair, London, W1J 6BQ]</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C8A45C] shrink-0" />
                  <div>
                    <strong className="block text-[#0F2A44]">Telephone Support</strong>
                    <a href="tel:02079460192" className="hover:text-[#0F2A44] transition-colors">[020 7946 0192]</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C8A45C] shrink-0" />
                  <div>
                    <strong className="block text-[#0F2A44]">General Enquiries</strong>
                    <a href="mailto:enquiries@alderwickandrowe.co.uk" className="hover:text-[#0F2A44] transition-colors">[enquiries@alderwickandrowe.co.uk]</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0F2A44]">Office &amp; Viewing Hours</strong>
                    <span>Monday – Friday: 08:30 – 18:30</span>
                    <span className="block">Saturday: 09:00 – 16:00</span>
                    <span className="block text-slate-400">Sunday: Closed (Pre-booked accompanied viewings only)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Member of The Property Ombudsman and Propertymark. Independent consumer redress guaranteed.
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-[#0F2A44] text-white p-6 rounded-xl space-y-3">
              <h4 className="font-serif text-lg font-bold">Need a Rapid Valuation?</h4>
              <p className="text-xs text-slate-300">
                Our directors conduct appraisals across all 50 UK coverage locations.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('sell-let')}
                className="w-full py-2.5 bg-[#C8A45C] hover:bg-[#b9944a] text-[#0F2A44] text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Request Free Valuation
              </button>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7">
            <EnquiryForm
              formType="contact"
              title="Send Us a Message"
              subtitle="Whether you have questions regarding a listing, tenancy, or our services, please complete the form below."
            />
          </div>
        </div>
      </div>

      {/* Regional Office Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
            Regional Hubs
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A44]">
            Our UK Office Network
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E2DFD8] p-5 shadow-sm space-y-3"
            >
              <h4 className="font-serif text-base font-bold text-[#0F2A44] border-b border-slate-100 pb-2">
                {office.city}
              </h4>
              <p className="text-xs text-slate-600">
                {office.address}
              </p>
              <div className="text-xs text-slate-700 space-y-1 pt-1 font-mono">
                <div>Tel: {office.phone}</div>
                <div className="text-[11px] text-slate-500 font-sans">{office.email}</div>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-normal">
                <strong>Serving:</strong> {office.coverage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
            Helpful Information
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A44]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E2DFD8] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif text-base font-bold text-[#0F2A44] hover:text-[#C8A45C] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C8A45C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
