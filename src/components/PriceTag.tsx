import React from 'react';

interface PriceTagProps {
  transaction: 'For sale' | 'To rent';
  askingPrice?: number | null;
  rentalPricePcm?: number | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWeeklyEquivalent?: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  transaction,
  askingPrice,
  rentalPricePcm,
  size = 'md',
  showWeeklyEquivalent = false,
}) => {
  const formatGBP = (val?: number | null) => {
    if (val === null || val === undefined) return 'Price on Application';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const textClasses = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-2xl lg:text-3xl font-bold',
    xl: 'text-3xl lg:text-4xl font-bold',
  }[size];

  if (transaction === 'To rent') {
    const weekly = rentalPricePcm ? Math.round((rentalPricePcm * 12) / 52) : null;
    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`text-[#0F2A44] ${textClasses}`}>
            {formatGBP(rentalPricePcm)}
          </span>
          <span className="text-xs uppercase font-medium text-slate-500 tracking-wider">pcm</span>
        </div>
        {showWeeklyEquivalent && weekly && (
          <span className="text-xs text-slate-500">approx. {formatGBP(weekly)} pw</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span className={`text-[#0F2A44] ${textClasses}`}>
        {formatGBP(askingPrice)}
      </span>
      <span className="text-[11px] text-slate-500 tracking-wide">Guide Price</span>
    </div>
  );
};
