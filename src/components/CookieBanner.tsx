import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Check } from 'lucide-react';

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

interface CookieBannerProps {
  onNavigateToPolicy: () => void;
}

const STORAGE_KEY = 'alderwick_cookie_consent_v1';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigateToPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Delay display slightly for smoother page load experience
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl transition-all animate-slideUp"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Information & Title */}
          <div className="flex items-start gap-3 max-w-3xl">
            <Shield className="w-5 h-5 text-[#C8A45C] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Your Privacy &amp; Cookie Preferences (UK GDPR)
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                We use strictly essential cookies to ensure our website functions correctly and securely. With your permission, we also use optional analytical cookies to understand how visitors browse our property portfolio and improve our services.
              </p>
              <div className="mt-1">
                <button
                  type="button"
                  onClick={onNavigateToPolicy}
                  className="text-xs text-[#C8A45C] hover:underline underline-offset-2"
                >
                  Read our full Cookie Notice &amp; Privacy Policy &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-600 rounded flex items-center gap-1.5 transition-colors"
            >
              <span>Customise</span>
              {showPreferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded transition-colors"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-semibold text-[#0F2A44] bg-[#C8A45C] hover:bg-[#b9944a] rounded shadow transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Detailed Preferences Accordion */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs animate-fadeIn">
            {/* Essential */}
            <div className="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white">Strictly Essential</span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-semibold">
                  Required
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Necessary for session integrity, property enquiry protection, and basic navigation. Cannot be disabled.
              </p>
            </div>

            {/* Analytics */}
            <div className="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white">Performance &amp; Analytics</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#C8A45C]"></div>
                </label>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Aggregated, anonymised traffic analytics to help us improve search filters and listing pages.
              </p>
            </div>

            {/* Marketing */}
            <div className="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white">Marketing &amp; Personalisation</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#C8A45C]"></div>
                </label>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Remembers your shortlisted properties across return visits on this device.
              </p>
            </div>

            <div className="md:col-span-3 flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F2A44] hover:bg-[#1A3F65] text-white border border-[#C8A45C] text-xs font-semibold rounded transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-[#C8A45C]" />
                <span>Save Selected Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
