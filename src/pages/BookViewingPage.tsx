import React from 'react';
import { ViewingForm } from '../components/ViewingForm';
import { CalendarCheck, ShieldCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface BookViewingPageProps {
  initialPropertyReference?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const BookViewingPage: React.FC<BookViewingPageProps> = ({
  initialPropertyReference,
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            Accompanied Property Inspection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2A44]">
            Book a Property Viewing
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B79] leading-relaxed">
            Select your preferred listing, date, and London time window. Our local consultant will confirm access arrangements with the owner and email your formal viewing confirmation.
          </p>
        </div>

        {/* Viewing Form Box */}
        <ViewingForm
          initialPropertyReference={initialPropertyReference}
          onSuccess={() => {
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
        />

        {/* Viewing Guidance Strip */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#0F2A44] mb-4">
            Viewing Guidance &amp; Protocols
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#0F2A44]">
                <ShieldCheck className="w-4 h-4 text-[#C8A45C]" />
                <span>Accompanied at All Times</span>
              </div>
              <p className="leading-relaxed">
                All inspections are accompanied by an Alderwick &amp; Rowe advisor equipped with floor plans, boundary registers, and property disclosures.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#0F2A44]">
                <Clock className="w-4 h-4 text-[#C8A45C]" />
                <span>Punctuality &amp; Access</span>
              </div>
              <p className="leading-relaxed">
                Slots are scheduled in 30-minute intervals to allow calm inspection. Please notify us if you anticipate running early or late.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#0F2A44]">
                <CalendarCheck className="w-4 h-4 text-[#C8A45C]" />
                <span>Written Confirmation</span>
              </div>
              <p className="leading-relaxed">
                You will receive a calendar invite and exact meeting point instructions once vendor or tenant consent is finalized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
