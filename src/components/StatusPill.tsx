import React from 'react';

interface StatusPillProps {
  status: string;
  isFictionalDemo?: boolean;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, isFictionalDemo }) => {
  const isUnderOffer = status.toLowerCase().includes('under offer');

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase ${
          isUnderOffer
            ? 'bg-amber-100 text-amber-900 border border-amber-300'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            isUnderOffer ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
        />
        {isUnderOffer ? 'Under Offer' : 'Available'}
      </span>
      {isFictionalDemo && (
        <span className="text-[10px] text-slate-500 font-normal italic" title="Sample property listing for demonstration">
          (Sample status)
        </span>
      )}
    </div>
  );
};
