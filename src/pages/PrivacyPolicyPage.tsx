import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#C8A45C] uppercase tracking-widest block">
            UK Data Protection Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2A44]">
            Privacy Policy &amp; Fair Processing Notice
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: November 2026 • Compliant with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E2DFD8] p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              1. Data Controller Information
            </h2>
            <p>
              Alderwick &amp; Rowe Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is registered as a data controller with the UK Information Commissioner&apos;s Office (ICO).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Company Name:</strong> Alderwick &amp; Rowe Ltd</li>
              <li><strong>Company Number:</strong> [08942184]</li>
              <li><strong>Registered Office:</strong> [14 Berkeley Square, Mayfair, London, W1J 6BQ]</li>
              <li><strong>Data Protection Officer / Lead:</strong> Arthur Alderwick MRICS</li>
              <li><strong>Email:</strong> [privacy@alderwickandrowe.co.uk]</li>
              <li><strong>Telephone:</strong> [020 7946 0192]</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              2. What Personal Data We Collect
            </h2>
            <p>
              Depending on whether you are an applicant, buyer, vendor, landlord, or tenant, we may collect and process:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Contact Details:</strong> Full name, telephone number, residential address, and email address.</li>
              <li><strong>Property Requirements:</strong> Preferred locations, budget parameters, property types, and search criteria.</li>
              <li><strong>Viewing &amp; Instruction Data:</strong> Accompanied viewing dates, time preferences, and feedback notes.</li>
              <li><strong>Identity Verification &amp; AML:</strong> Photographic proof of identity (passport/driving licence) and proof of address for anti-money laundering statutory requirements prior to property transaction exchange.</li>
              <li><strong>Financial Evidence:</strong> Proof of funds, mortgage agreements in principle, or tenant income verification.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              3. Lawful Basis for Processing (UK GDPR Article 6)
            </h2>
            <p>We process your personal information under the following lawful bases:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <strong className="block text-[#0F2A44] mb-1">Contractual Necessity</strong>
                <span>Arranging accompanied viewings, conducting property valuations, and executing tenancy or sales agency agreements at your request.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <strong className="block text-[#0F2A44] mb-1">Legal Obligation</strong>
                <span>Complying with UK Money Laundering Regulations 2017, Estate Agents Act 1979, and Right to Rent tenancy legislation.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <strong className="block text-[#0F2A44] mb-1">Legitimate Interests</strong>
                <span>Responding to property enquiries, managing our client register, and delivering security during accompanied inspections.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <strong className="block text-[#0F2A44] mb-1">Consent</strong>
                <span>Where you elect to receive voluntary off-market property alerts or non-essential analytical cookies. You may revoke consent at any time.</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              4. Data Retention &amp; Security
            </h2>
            <p>
              We adhere strictly to statutory retention schedules. Sales transaction records and AML documentation are retained for a minimum of 5 years following completion in accordance with HMRC guidance. General viewing inquiries are retained for up to 12 months unless actively renewed.
            </p>
            <p>
              All data transmitted through our website forms is secured using Transport Layer Security (TLS 1.3) encryption. Data submitted to our workflow webhooks is processed within secure UK/EEA cloud environments.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              5. Your Rights as a Data Subject
            </h2>
            <p>Under UK GDPR, you hold significant statutory rights, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Right of Access (Subject Access Request):</strong> Request a copy of all personal records we hold regarding you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate contact or property details.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your data where no statutory retention requirement applies.</li>
              <li><strong>Right to Restrict Processing &amp; Object:</strong> Object to processing for direct marketing or search profiling.</li>
            </ul>
            <p className="pt-2">
              To exercise any of these rights, contact our Data Protection Team at <a href="mailto:privacy@alderwickandrowe.co.uk" className="text-[#0F2A44] font-semibold underline">[privacy@alderwickandrowe.co.uk]</a>. We respond within 30 calendar days without charge.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-xl font-bold text-[#0F2A44]">
              6. Supervisory Authority (ICO)
            </h2>
            <p>
              You maintain the right to lodge a complaint with the UK supervisory authority: Information Commissioner&apos;s Office (ICO), Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF. Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#C8A45C] underline">ico.org.uk</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
