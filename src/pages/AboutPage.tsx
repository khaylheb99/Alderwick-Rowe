import React from 'react';
import { Award, Compass, Shield, Users, Building2, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const consultants = [
    {
      name: 'Arthur Alderwick MRICS',
      role: 'Co-Founder & Senior Partner',
      bio: 'Over 28 years of prime residential experience across Central London, Surrey, and the Home Counties. Chartered Surveyor specialising in residential valuations and heritage estates.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Victoria Rowe FARLA',
      role: 'Co-Founder & Head of Lettings',
      bio: 'Fellow of the Association of Residential Letting Agents (ARLA). Oversees statutory compliance, tenant referencing standards, and property management across our national portfolio.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Hamish Campbell MNAEA',
      role: 'Regional Director (Scotland & Northern England)',
      bio: 'Based in Edinburgh with over 15 years advising on historic Georgian flats in the New Town, suburban family homes in Morningside, and Scottish country residences.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Gareth Llewellyn',
      role: 'Regional Director (Wales & South West)',
      bio: 'Expert advisor for Cardiff, the Vale of Glamorgan, Bristol, and Bath. Focused on period restoration homes, modern coastal developments, and accompanied viewings.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16 space-y-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            Our Heritage &amp; Ethos
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2A44] leading-tight">
            Independent British Estate Agency, Built on Integrity
          </h1>
          <p className="text-base sm:text-lg text-[#5B6B79] font-light leading-relaxed">
            Alderwick &amp; Rowe was established with a singular conviction: that buying, selling, or letting a home should be an articulate, transparent, and genuinely supportive experience.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E2DFD8] p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A44]">
              Property, Handled Properly
            </h2>
            <p>
              In an industry frequently dominated by high-volume corporate chains and automated call centres, Alderwick &amp; Rowe remains resolutely partner-led. We restrict the number of instructions each consultant takes on at any one time, ensuring every client receives proactive counsel and direct partner accountability.
            </p>
            <p>
              Whether marketing a period townhouse in Edinburgh, an executive detached residence in Altrincham, or managing modern apartments in London&apos;s financial district, our approach combines traditional British standards of courtesy with contemporary marketing precision.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#0F2A44]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Zero hidden administration fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Accompanied viewings as standard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>RICS and ARLA qualified partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
                <span>Rigorous UK GDPR compliance</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0F2A44] text-white p-6 sm:p-8 rounded-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#C8A45C]">
              Our Operating Principles
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-1">1. Objective Appraisals</h4>
                <p>We do not inflate valuations simply to win instructions. We present verified Land Registry evidence.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">2. Complete Transparency</h4>
                <p>Our fees are written plainly with no abortive clauses or surprise marketing costs.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">3. Dedicated Representation</h4>
                <p>The consultant who values your home personally hosts your viewings and negotiates your offers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block mb-1">
            Our People
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2A44]">
            Senior Partners &amp; Regional Directors
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B79] mt-1">
            Experienced professionals with comprehensive knowledge of their local UK property markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultants.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E2DFD8] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold text-[#0F2A44]">
                    {c.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#C8A45C] block mb-2">
                    {c.role}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {c.bio}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Accompanied Viewings</span>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="font-semibold text-[#0F2A44] hover:text-[#C8A45C]"
                >
                  Contact &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2A44] rounded-2xl p-8 sm:p-12 text-center text-white space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Ready to discuss your UK property requirements?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Speak directly with Arthur Alderwick, Victoria Rowe, or a regional director regarding selling, letting, or searching for your next home.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('sell-let')}
              className="px-6 py-3 bg-[#C8A45C] hover:bg-[#b9944a] text-[#0F2A44] text-xs font-semibold uppercase tracking-wider rounded"
            >
              Request a Valuation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded border border-white/20"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
