import React from 'react';
import { Home, Search, Phone, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] bg-[#F8F7F4] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-[#E2DFD8] p-8 sm:p-12 text-center shadow-sm space-y-6">
        <span className="font-mono text-xs font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-3 py-1 rounded-full uppercase tracking-widest">
          Error 404 • Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2A44]">
          Property or Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#5B6B79] leading-relaxed max-w-md mx-auto">
          The page you requested may have been moved, renamed, or the property listing may have completed its sale and been archived from our register.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('properties')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white border border-[#0F2A44] text-[#0F2A44] hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded transition-colors gap-2"
          >
            <Search className="w-4 h-4 text-[#C8A45C]" />
            <span>Browse UK Properties</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
          Need immediate assistance? Contact our central Mayfair desk on{' '}
          <a href="tel:02079460192" className="font-semibold text-[#0F2A44] underline">
            020 7946 0192
          </a>
        </div>
      </div>
    </div>
  );
};
