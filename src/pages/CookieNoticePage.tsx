import React, { useState } from 'react';
import { Shield, CheckCircle, RefreshCw } from 'lucide-react';

export const CookieNoticePage: React.FC = () => {
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    localStorage.removeItem('alderwick_cookie_consent_v1');
    setResetDone(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const cookieInventory = [
    {
      name: 'alderwick_cookie_consent_v1',
      provider: 'Alderwick & Rowe Ltd',
      purpose: 'Stores your cookie preference choices (essential, analytics, marketing).',
      duration: '12 months',
      type: 'Strictly Essential',
    },
    {
      name: 'ar_submission_timestamps',
      provider: 'Alderwick & Rowe Ltd',
      purpose: 'Enforces client-side rate limiting on enquiry forms to deter spam bots.',
      duration: '60 seconds',
      type: 'Strictly Essential',
    },
    {
      name: 'alderwick_saved_properties',
      provider: 'Alderwick & Rowe Ltd',
      purpose: 'Locally remembers your shortlisted property references across browser sessions.',
      duration: 'Persistent (Local Storage)',
      type: 'Functional / Shortlist',
    },
    {
      name: '_ga, _ga_* (optional)',
      provider: 'Google Analytics (if consented)',
      purpose: 'Aggregated, anonymous statistical metrics on page views and search usage.',
      duration: 'Up to 2 years',
      type: 'Analytical',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            Transparency &amp; Cookies
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2A44]">
            Cookie Notice &amp; Consent Management
          </h1>
          <p className="text-xs text-slate-500">
            Compliant with the Privacy and Electronic Communications Regulations (PECR) and UK GDPR.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              What Are Cookies?
            </h2>
            <p>
              Cookies are compact text files placed upon your computer or mobile device when browsing websites. They are widely utilized to enable sites to operate smoothly, preserve user preferences (such as your saved property shortlist), and deliver anonymous analytical insights to site operators.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              Inventory of Cookies Used on This Website
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-[#0F2A44] border-b border-slate-200">
                    <th className="p-3 font-semibold">Cookie Identifier</th>
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Purpose</th>
                    <th className="p-3 font-semibold">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cookieInventory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-[#0F2A44] font-semibold">{item.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.type.includes('Essential')
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{item.purpose}</td>
                      <td className="p-3 text-slate-500">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              Managing Your Cookie Preferences
            </h2>
            <p>
              You maintain total control over your cookie permissions. You may reset your cookie choice at any time by clicking the button below, which clears your saved preference and re-displays the banner.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-xs font-semibold rounded shadow-sm transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resetDone ? 'animate-spin' : ''}`} />
                <span>{resetDone ? 'Resetting Preferences...' : 'Reset My Cookie Choices'}</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
