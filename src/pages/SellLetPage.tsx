import React, { useState } from 'react';
import { EnquiryForm } from '../components/EnquiryForm';
import { ShieldCheck, ArrowRight, CheckCircle2, FileText, Camera, Key, TrendingUp, Users, Award, Clock } from 'lucide-react';

interface SellLetPageProps {
  onNavigate: (route: string) => void;
}

export const SellLetPage: React.FC<SellLetPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'sell' | 'let'>('sell');

  const sellingSteps = [
    {
      num: '01',
      title: 'Accurate Market Valuation & Strategy',
      desc: 'We analyse recent Land Registry completions, local buyer demand, and unique property attributes to agree a realistic guide price that generates competitive momentum.',
      icon: TrendingUp,
    },
    {
      num: '02',
      title: 'Editorial Photography & Floor Plans',
      desc: 'Every home receives professional architectural photography, accurate laser-measured RICS floor plans, and engaging editorial particulars presented across prime channels.',
      icon: Camera,
    },
    {
      num: '03',
      title: 'Accompanied Viewings & Direct Feedback',
      desc: 'All viewings are hosted by an experienced consultant who knows your home inside out. You receive clear, prompt written feedback within 24 hours of each appointment.',
      icon: Users,
    },
    {
      num: '04',
      title: 'Offer Negotiation & Chain Progression',
      desc: 'We rigorously qualify buyer finances (proof of funds and chain validation), negotiate to secure optimal terms, and liaise weekly with solicitors until completion.',
      icon: Key,
    },
  ];

  const lettingSteps = [
    {
      num: '01',
      title: 'Rental Appraisal & Statutory Compliance',
      desc: 'We provide an objective assessment of achievable rental yield and conduct an initial statutory audit covering EPC, EICR, Gas Safety, and smoke/CO alarms.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Rigorous Tenant Referencing',
      desc: 'Thorough screening through independent referencing agencies: employment income verification, previous landlord references, and UK Right to Rent checks.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Tenancy Agreement & Inventory Schedule',
      desc: 'We prepare compliant Assured Shorthold Tenancies (ASTs), lodge deposits in the government-backed Tenancy Deposit Scheme (TDS), and commission independent photo inventories.',
      icon: Key,
    },
    {
      num: '04',
      title: 'Proactive Management & Rent Remittance',
      desc: 'Our managed service includes automated rent collection, quarterly visual inspections with photographic reports, and 24/7 emergency contractor coordination.',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            Vendor &amp; Landlord Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2A44]">
            Sell or Let with Alderwick &amp; Rowe
          </h1>
          <p className="text-sm sm:text-base text-[#5B6B79] leading-relaxed">
            Personalised representation, transparent terms, and diligent marketing designed to achieve the maximum value for your UK property.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-xl mt-4 border border-[#E2DFD8]">
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'sell'
                  ? 'bg-[#0F2A44] text-white shadow'
                  : 'text-slate-700 hover:text-[#0F2A44]'
              }`}
            >
              Selling Your Home
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('let')}
              className={`px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'let'
                  ? 'bg-[#0F2A44] text-white shadow'
                  : 'text-slate-700 hover:text-[#0F2A44]'
              }`}
            >
              Letting Your Property
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <section className="bg-white rounded-2xl border border-[#E2DFD8] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2A44]">
              {activeTab === 'sell' ? 'Our 4-Step Sale Process' : 'Our 4-Step Lettings & Management Process'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B79] mt-1">
              Every instruction is managed with meticulous attention to detail and unwavering integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'sell' ? sellingSteps : lettingSteps).map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E2DFD8] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-[#C8A45C]">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#0F2A44] text-[#C8A45C] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#0F2A44] mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fee Transparency Guarantee Ribbon */}
          <div className="mt-8 p-5 bg-[#0F2A44] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#C8A45C] shrink-0" />
              <div>
                <h4 className="font-serif text-base font-bold">
                  The Alderwick &amp; Rowe Fee Transparency Guarantee
                </h4>
                <p className="text-xs text-slate-300">
                  All fees are confirmed in writing prior to marketing; no hidden administrative charges, abortive penalties, or unexpected mark-ups.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white/10 rounded text-[11px] font-mono text-[#C8A45C] font-semibold shrink-0">
              Clear &amp; Upfront
            </span>
          </div>
        </section>

        {/* Valuation Form & Consultation Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm space-y-4">
              <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
                Complimentary Service
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F2A44]">
                Request a Market Valuation
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6B79] leading-relaxed">
                Whether you are exploring the sale of your residence or calculating current rental yields across your portfolio, our directors provide confidential, evidence-based market appraisals.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Comprehensive comparative market analysis with recent street transactions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Guidance on value-add styling and pre-marketing preparations.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No obligation and no pressure to instruct.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Prefer to speak immediately? Call our advisory desk on <strong className="text-[#0F2A44]">020 7946 0192</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm
              formType="valuation"
              defaultClientType={activeTab === 'sell' ? 'Vendor' : 'Landlord'}
              title="Book a Valuation Visit"
              subtitle="Submit your property details and our local consultant will arrange a convenient time to meet."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
