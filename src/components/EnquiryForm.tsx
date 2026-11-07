import React, { useState } from 'react';
import { submitEnquiry, EnquiryPayload, ValidationErrors } from '../services/enquiryService';
import { Send, CheckCircle2, AlertCircle, Loader2, Lock, Home } from 'lucide-react';

interface EnquiryFormProps {
  formType?: 'enquiry' | 'valuation' | 'contact';
  propertyReference?: string;
  propertyTitle?: string;
  defaultClientType?: 'Buyer' | 'Tenant' | 'Landlord' | 'Vendor';
  title?: string;
  subtitle?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  formType = 'enquiry',
  propertyReference = '',
  propertyTitle = '',
  defaultClientType,
  title,
  subtitle,
  compact = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<EnquiryPayload>>({
    source: 'website',
    form_type: formType,
    full_name: '',
    email: '',
    phone: '',
    client_type: defaultClientType || (propertyReference ? 'Buyer' : 'Buyer'),
    transaction: 'Purchase',
    preferred_location: '',
    property_type: '',
    bedrooms: null,
    budget_min: null,
    budget_max: null,
    budget_currency: 'GBP',
    budget_frequency: 'one-off',
    timeline: 'Within 3 months',
    preferred_contact: 'Email',
    service_required: '',
    property_reference: propertyReference,
    message: '',
    website_trap: '', // Honeypot
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear inline error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const payload: EnquiryPayload = {
      source: 'website',
      form_type: formType,
      full_name: formData.full_name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      client_type: formData.client_type,
      transaction: formData.transaction,
      preferred_location: formData.preferred_location,
      property_type: formData.property_type,
      bedrooms: formData.bedrooms,
      budget_min: formData.budget_min,
      budget_max: formData.budget_max,
      budget_currency: 'GBP',
      budget_frequency: formData.budget_frequency,
      timeline: formData.timeline,
      preferred_contact: formData.preferred_contact as 'Email' | 'Telephone',
      service_required: formData.service_required,
      property_reference: propertyReference || formData.property_reference,
      requested_window: formData.requested_window,
      message: formData.message,
      website_trap: formData.website_trap,
    };

    const result = await submitEnquiry(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitResult({
        success: true,
        message: result.message,
        refId: result.referenceId,
      });
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        setErrors(result.errors);
      }
      setSubmitResult({
        success: false,
        message: result.message,
      });
    }
  };

  const headingText =
    title ||
    (propertyReference
      ? `Enquire about ${propertyReference}`
      : formType === 'valuation'
      ? 'Request a Free Property Valuation'
      : 'Register Your Interest & Requirements');

  const subText =
    subtitle ||
    (propertyReference
      ? 'Speak directly with our senior consultant handling this listing.'
      : 'Tell us what you are looking for. Our consultants provide tailored market guidance.');

  if (submitResult?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center animate-fadeIn">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-serif text-xl font-bold text-[#0F2A44] mb-2">
          Enquiry Received
        </h4>
        <p className="text-sm text-slate-700 max-w-md mx-auto mb-4 leading-relaxed">
          {submitResult.message}
        </p>
        {submitResult.refId && (
          <div className="inline-block bg-white px-3 py-1.5 rounded border border-emerald-200 text-xs font-mono text-emerald-800 font-semibold mb-6">
            Reference: {submitResult.refId}
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              setSubmitResult(null);
              setFormData(prev => ({ ...prev, message: '' }));
            }}
            className="text-xs text-[#0F2A44] hover:text-[#C8A45C] font-semibold underline underline-offset-4"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-[#E2DFD8] ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'} shadow-sm`}>
      <div className="mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2A44]">
          {headingText}
        </h3>
        <p className="text-xs sm:text-sm text-[#5B6B79] mt-1">
          {subText}
        </p>
        {propertyReference && propertyTitle && (
          <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs flex items-center gap-2 text-slate-700">
            <Home className="w-4 h-4 text-[#C8A45C] shrink-0" />
            <span className="font-semibold text-[#0F2A44]">{propertyReference}:</span>
            <span className="truncate">{propertyTitle}</span>
          </div>
        )}
      </div>

      {submitResult && !submitResult.success && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{submitResult.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-spam honeypot (hidden from human visitors) */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor="website_trap">Leave this field blank</label>
          <input
            type="text"
            id="website_trap"
            name="website_trap"
            value={formData.website_trap || ''}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            required
            value={formData.full_name || ''}
            onChange={handleChange}
            placeholder="e.g. Eleanor Vance"
            className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
              errors.full_name ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
            } focus:bg-white focus:outline-none`}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-rose-600">{errors.full_name}</p>
          )}
        </div>

        {/* Contact details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="eleanor.vance@example.co.uk"
              className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
                errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
              } focus:bg-white focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
            )}
          </div>

          {/* Telephone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Telephone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="07700 900123 or +44..."
              className={`w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border transition-colors ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2DFD8] focus:border-[#C8A45C]'
              } focus:bg-white focus:outline-none`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Client Type & Preferred Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="client_type" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              I am a...
            </label>
            <select
              id="client_type"
              name="client_type"
              value={formData.client_type || 'Buyer'}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            >
              <option value="Buyer">Buyer looking for a home</option>
              <option value="Tenant">Tenant looking to rent</option>
              <option value="Vendor">Vendor planning to sell</option>
              <option value="Landlord">Landlord with property to let</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferred_contact" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
              Preferred Contact Method
            </label>
            <select
              id="preferred_contact"
              name="preferred_contact"
              value={formData.preferred_contact || 'Email'}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
            >
              <option value="Email">Email</option>
              <option value="Telephone">Telephone</option>
            </select>
          </div>
        </div>

        {/* Optional budget range if general registration */}
        {!propertyReference && !compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label htmlFor="budget_max" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
                Max Budget (GBP)
              </label>
              <input
                type="number"
                id="budget_max"
                name="budget_max"
                value={formData.budget_max || ''}
                onChange={handleChange}
                placeholder="e.g. 450000"
                className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="preferred_location" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
                Preferred Area / City
              </label>
              <input
                type="text"
                id="preferred_location"
                name="preferred_location"
                value={formData.preferred_location || ''}
                onChange={handleChange}
                placeholder="e.g. Manchester, Oxford, Edinburgh"
                className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Message / Notes */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#1F2933] uppercase tracking-wider mb-1">
            Enquiry Details & Special Requests
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 2 : 3}
            value={formData.message || ''}
            onChange={handleChange}
            placeholder={
              propertyReference
                ? 'Please arrange a viewing or advise on recent offers...'
                : 'Share any specifics: garden size, schools, chain status, or move timeline...'
            }
            className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#F8F7F4] border border-[#E2DFD8] focus:border-[#C8A45C] focus:bg-white focus:outline-none"
          />
        </div>

        {/* GDPR Notice */}
        <div className="flex items-start gap-2 pt-1">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-normal">
            By submitting, you agree that Alderwick & Rowe Ltd may process your details in accordance with our UK GDPR Privacy Policy to assist with your property enquiry. We never sell your data.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#0F2A44] hover:bg-[#1A3F65] text-white text-sm font-semibold rounded-md shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
