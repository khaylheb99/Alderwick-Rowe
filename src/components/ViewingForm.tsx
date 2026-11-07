import React, { useState } from 'react';
import { submitEnquiry, EnquiryPayload, ValidationErrors } from '../services/enquiryService';
import { Calendar, Clock, Send, CheckCircle2, AlertCircle, Loader2, Lock, Building, MapPin } from 'lucide-react';
import { PROPERTIES, getPropertyByReference } from '../data/properties';

interface ViewingFormProps {
  initialPropertyReference?: string;
  onSuccess?: () => void;
}

const TIME_WINDOWS = [
  { id: 'morning-1', label: 'Morning (09:30 – 11:30 BST)' },
  { id: 'midday-2', label: 'Midday (11:30 – 13:30 BST)' },
  { id: 'afternoon-3', label: 'Early Afternoon (13:30 – 15:30 BST)' },
  { id: 'afternoon-4', label: 'Late Afternoon (15:30 – 17:30 BST)' },
  { id: 'evening-5', label: 'Evening (17:30 – 19:00 BST)' },
];

export const ViewingForm: React.FC<ViewingFormProps> = ({
  initialPropertyReference = '',
  onSuccess,
}) => {
  // Tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [propertyRef, setPropertyRef] = useState(initialPropertyReference);
  const [preferredDate, setPreferredDate] = useState(minDateStr);
  const [timeSlot, setTimeSlot] = useState(TIME_WINDOWS[0].label);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clientType, setClientType] = useState<'Buyer' | 'Tenant'>('Buyer');
  const [notes, setNotes] = useState('');
  const [websiteTrap, setWebsiteTrap] = useState('');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);

  const matchedProperty = getPropertyByReference(propertyRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Combine date and time slot into ISO/Europe/London representation
    const requestedWindow = `${preferredDate}T${timeSlot}`;

    const payload: EnquiryPayload = {
      source: 'website',
      form_type: 'viewing',
      full_name: fullName,
      email,
      phone,
      client_type: clientType,
      transaction: matchedProperty?.transaction === 'To rent' ? 'Rental' : 'Purchase',
      property_reference: propertyRef || undefined,
      preferred_location: matchedProperty ? `${matchedProperty.locality}, ${matchedProperty.city}` : undefined,
      property_type: matchedProperty?.property_type,
      requested_window: requestedWindow,
      message: notes ? `Viewing slot: ${timeSlot}. Notes: ${notes}` : `Viewing requested for ${timeSlot}`,
      website_trap: websiteTrap,
    };

    const result = await submitEnquiry(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitResult({
        success: true,
        message: "We'll review the vendor/tenant access and confirm your slot by email.",
        refId: result.referenceId,
      });
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        setErrors(result.errors);
      }
      setSubmitResult({
        success: false,
        message: result.message || 'Unable to schedule viewing. Please check your details.',
      });
    }
  };

  if (submitResult?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-10 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#0F2A44] mb-2">
          Viewing Request Submitted
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {submitResult.message}
        </p>
        <div className="bg-white p-4 rounded-lg border border-emerald-200 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
          {matchedProperty && (
            <div className="flex items-center gap-2 font-medium text-[#0F2A44]">
              <Building className="w-4 h-4 text-[#C8A45C]" />
              <span>{matchedProperty.property_reference}: {matchedProperty.property_title}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Requested Date: {preferredDate} ({timeSlot})</span>
          </div>
          {submitResult.refId && (
            <div className="pt-2 border-t border-slate-100 font-mono text-emerald-800 font-semibold">
              Booking Ref: {submitResult.refId}
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Our local consultant will check accompanied access and send formal calendar invitations to <strong className="text-slate-700">{email || phone}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitResult(null);
            setNotes('');
          }}
          className="px-5 py-2.5 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-xs font-semibold rounded-md transition-colors"
        >
          Book Another Viewing
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-[#0F2A44]">
          Arrange an Accompanied Viewing
        </h2>
        <p className="text-xs sm:text-sm text-[#5B6B79] mt-1">
          Every inspection is hosted by an experienced local Alderwick & Rowe consultant with full floor plans and property insights.
        </p>
      </div>

      {submitResult && !submitResult.success && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{submitResult.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Anti-spam Honeypot */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor="viewing_bot_trap">Do not fill</label>
          <input
            type="text"
            id="viewing_bot_trap"
            value={websiteTrap}
            onChange={(e) => setWebsiteTrap(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Property Selector / Reference */}
        <div>
          <label htmlFor="prop_ref" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
            Property Reference / Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="prop_ref"
              value={propertyRef}
              onChange={(e) => setPropertyRef(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            >
              <option value="">Select from our UK portfolio...</option>
              {PROPERTIES.map(p => (
                <option key={p.property_reference} value={p.property_reference}>
                  {p.property_reference} — {p.property_title} ({p.locality}, {p.city}) - £{p.asking_price ? p.asking_price.toLocaleString() : `${p.rental_price_pcm} pcm`}
                </option>
              ))}
            </select>
          </div>
          {matchedProperty && (
            <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A45C]" />
                <span>{matchedProperty.street_address}, {matchedProperty.locality}, {matchedProperty.postcode}</span>
              </div>
              <span className="font-semibold text-[#0F2A44]">{matchedProperty.transaction}</span>
            </div>
          )}
        </div>

        {/* Date and Time Slot Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="viewing_date" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="viewing_date"
                min={minDateStr}
                required
                value={preferredDate}
                onChange={(e) => {
                  setPreferredDate(e.target.value);
                  if (errors.requested_window) {
                    setErrors(prev => ({ ...prev, requested_window: '' }));
                  }
                }}
                className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
              />
            </div>
            {errors.requested_window && (
              <p className="mt-1 text-xs text-rose-600">{errors.requested_window}</p>
            )}
          </div>

          <div>
            <label htmlFor="time_slot" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Preferred Time Window (Europe/London) <span className="text-rose-500">*</span>
            </label>
            <select
              id="time_slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            >
              {TIME_WINDOWS.map(w => (
                <option key={w.id} value={w.label}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <label htmlFor="viewing_name" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="viewing_name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.full_name) setErrors(prev => ({ ...prev, full_name: '' }));
            }}
            placeholder="e.g. Alistair Finch"
            className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
              errors.full_name ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
            } focus:bg-white focus:outline-none`}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-rose-600">{errors.full_name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="viewing_email" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="viewing_email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              placeholder="alistair.finch@example.co.uk"
              className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
                errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
              } focus:bg-white focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="viewing_phone" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Telephone / Mobile
            </label>
            <input
              type="tel"
              id="viewing_phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              placeholder="07700 900456"
              className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
              } focus:bg-white focus:outline-none`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Client Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="viewing_client_type" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Your Position
            </label>
            <select
              id="viewing_client_type"
              value={clientType}
              onChange={(e) => setClientType(e.target.value as 'Buyer' | 'Tenant')}
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            >
              <option value="Buyer">Buyer (Mortgage agreed in principle / Cash)</option>
              <option value="Tenant">Prospective Tenant</option>
            </select>
          </div>

          <div>
            <label htmlFor="viewing_notes" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Any specific queries or parking needs?
            </label>
            <input
              type="text"
              id="viewing_notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inquiring about garden boundaries..."
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-start gap-2 pt-1">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-normal">
            Times are subject to confirmation with the owner or current occupants. We will review availability and confirm your booking by email or SMS.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-sm font-semibold rounded-md shadow transition-colors disabled:opacity-75 gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Checking Availability & Submitting...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Request Viewing Slot</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
