# Alderwick & Rowe Ltd — UK Real Estate Agency Platform

Production-ready marketing and lead-generation website for **Alderwick & Rowe Ltd**, an independent UK residential sales, lettings, and property management agency with portfolio coverage across England, Scotland, Wales, and Northern Ireland.

---

## 1. Brand & Architectural Identity

- **Brand Name:** Alderwick & Rowe Ltd
- **Tone & Voice:** Professional, warm, trustworthy, understated premium. British English spelling utilized throughout (*enquiry, organise, favourite, centre, colour, programme*).
- **Colour Palette:**
  - Deep Navy (`#0F2A44`) — Primary branding & headers
  - Warm Gold (`#C8A45C`) — Refined accents & badges
  - Off-White (`#F8F7F4`) — Calm editorial canvas
  - Charcoal (`#1F2933`) — Primary typography
  - Soft Card Border (`#E2DFD8`) — Delicate container framing
- **Typography:** Refined serif for headings (*Fraunces* / *Playfair Display*) and clean geometric sans for UI and body (*Plus Jakarta Sans*).

---

## 2. Site Structure & Routes

1. **Home (`/` or `/#home`)**:
   - Editorial hero with headline *"Property, handled properly."*
   - Interactive quick search bar (Buy/Rent, location/postcode, property type, bedrooms)
   - Featured properties grid curated from the master property document
   - Value propositions (*Local Expertise, Transparent Fees, Dedicated Consultant, Accompanied Viewings*)
   - Services strip (*Residential Sales, Prime Lettings, Management, Buyer Concierge, Accompanied Viewings, Progression*)
   - Sample client testimonials
   - Direct lead-capture band
2. **Properties (`/#properties`)**:
   - Sticky filter bar: Transaction (All / For Sale / To Rent), location/postcode query, property type dropdown, bedroom selector (1–5+), maximum price/rent slider, and sorting
   - Responsive property grid (4:3 photography, reference badges, specs, price formatting)
   - Empty state with register requirements link
   - Client-side pagination / "Load More"
3. **Property Detail (`/#property/AR-PROP-001`)**:
   - 16:9 hero image + interactive thumbnail selector
   - Title, reference badge, locality, city, region, postcode
   - Key facts row (bedrooms, bathrooms, internal size in m², EPC rating band)
   - Price block (GBP formatting with commas; £pcm + weekly equivalent for rentals)
   - Overview text and key specifications split into chips
   - Postcode-centered location map preview and local amenities guide
   - Two CTAs: *Book a Viewing* & *Enquire about this property* (both carrying the reference)
   - Similar properties recommendation carousel
   - Sample listing badge indicator (`Sample listing for demonstration purposes`)
   - Schema.org JSON-LD `RealEstateListing` structured data
4. **Sell / Let with Us (`/#sell-let`)**:
   - Dual tabs: *Selling Your Home* and *Letting Your Property*
   - 4-step process breakdowns for each transaction type
   - The Alderwick & Rowe Fee Transparency Guarantee note (*"fees confirmed in writing; no hidden charges"*)
   - Market valuation request form
5. **Book a Viewing (`/#book-viewing`)**:
   - Accompanied inspection booking form with property reference prefill
   - Calendar date picker and Europe/London time window selection
   - Punctuality and written confirmation protocols
6. **About Us (`/#about`)**:
   - Firm history and partnership ethos
   - Senior partners and regional directors profiles (London, Scotland, Wales & West)
   - Industry accreditations (*RICS, Propertymark, The Property Ombudsman, TDS*)
7. **Contact (`/#contact`)**:
   - Central Mayfair head office details, opening hours, phone (`020 7946 0192`)
   - Regional hub addresses across Manchester, Edinburgh, and Cardiff
   - Interactive FAQ accordion
   - Direct message enquiry form
8. **UK GDPR Privacy Policy (`/#privacy-policy`)**:
   - Data Controller identity, ICO registration note
   - Categories of personal data collected
   - Article 6 lawful bases (Contractual necessity, Legal obligation, Legitimate interest, Consent)
   - Data retention periods and subject rights (SAR, rectification, erasure)
9. **Cookie Notice (`/#cookie-notice`)**:
   - PECR & UK GDPR compliance schedule
   - Detailed audit table of essential and analytical cookies
   - Interactive reset button to adjust preferences
10. **404 Page (`/#404`)**:
    - Understated error page with search redirect and phone line assistance.

---

## 3. Master Property Data Architecture

All 50 properties from the official property document (`Aldershot___Rowe_-_Property_Listings_1ee3267b.pdf`) are centralised in **one single source of truth**:
- **Primary Data Module:** `/src/data/properties.ts` (and raw `/src/data/properties.json`)

### How to Update or Refresh Property Listings
When a new property document or CSV is provided:
1. Update the dataset in `/src/data/properties.json` or adjust `scripts/parse_properties.js`.
2. Re-run `node scripts/parse_properties.js`.
3. The TypeScript module `/src/data/properties.ts` updates automatically, supplying all components with refreshed prices, availability, and attributes without code changes.

---

## 4. Forms & Webhook Payload Specification

All forms (general enquiries, property enquiries, valuations, viewing bookings) post JSON to the n8n automation workflow:

### Webhook Endpoint Configuration
- Set the environment variable in `.env`:
  ```bash
  VITE_ENQUIRY_WEBHOOK="https://your-n8n-host/webhook/Alderwick%26Rowe"
  VITE_CHAT_WEBHOOK="https://your-n8n-host/webhook/Alderwick%26Rowe"
  ```
- *Note:* The ampersand is URL-encoded as `%26` to match the workflow path `Alderwick&Rowe`.

### Interactive Chat Payload Shape (`form_type: "chat"`)
When a user sends a message through the floating Concierge Chat widget, the following JSON is dispatched to the production webhook:
```json
{
  "source": "website",
  "form_type": "chat",
  "session_id": "ar_chat_8f2a9c1e_lh3d7z",
  "message": "Do you have any 3-bedroom detached houses in Didsbury?",
  "timestamp": "2026-11-07T12:45:00.000Z",
  "context": {
    "current_page": "property/AR-PROP-001",
    "property_reference": "AR-PROP-001"
  }
}
```

The widget automatically handles n8n workflow responses structured as `{ "output": "..." }`, `{ "response": "..." }`, `{ "text": "..." }`, or `{ "message": "..." }`, and includes an intelligent British concierge fallback when running in sandbox demonstration mode.

### Standard Lead & Viewing Form Payload Shape (`form_type: "enquiry" | "valuation" | "viewing" | "contact"`)
```json
{
  "source": "website",
  "form_type": "enquiry" | "valuation" | "viewing" | "contact",
  "full_name": "Eleanor Vance",
  "email": "eleanor.vance@example.co.uk",
  "phone": "07700 900123",
  "client_type": "Buyer" | "Tenant" | "Landlord" | "Vendor",
  "transaction": "Purchase" | "Rental" | "Letting management" | "Sales management",
  "preferred_location": "Didsbury, Manchester",
  "property_type": "Semi-detached house",
  "bedrooms": 3,
  "budget_min": 350000,
  "budget_max": 425000,
  "budget_currency": "GBP",
  "budget_frequency": "one-off" | "monthly",
  "timeline": "Within 3 months",
  "preferred_contact": "Email" | "Telephone",
  "service_required": "",
  "property_reference": "AR-PROP-001",
  "requested_window": "2026-11-12T14:00:00Z",
  "message": "Interested in viewing the rear garden and boundary."
}
```

### Lead Safety & Spam Deterrence
- **Client-Side Validation:** Required full name + (valid email OR UK phone number), budget logic checks, future date enforcement.
- **Honeypot Trap:** Hidden `website_trap` input field deters automated crawlers.
- **Rate Limiting:** Enforces maximum submission thresholds per device to prevent flooding.
- **Fail-Safe Offline Storage:** All submissions are backed up locally in `localStorage['alderwick_enquiries']` so leads are never lost if network issues or CORS restrictions occur.

---

## 5. Setup & Development Instructions

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The application will serve on `http://localhost:3000`.

### Production Build
```bash
npm run build
```

---

## 6. UK Compliance & Legal Disclaimers

- **Company Registration:** Alderwick & Rowe Ltd is registered in England & Wales [COMPANY NUMBER: 08942184]. Registered office: [14 Berkeley Square, Mayfair, London, W1J 6BQ].
- **Client Money Protection:** Propertymark Protected.
- **Redress Scheme:** The Property Ombudsman.
- **Deposit Custody:** Tenancy Deposit Scheme (TDS).
- **Sample Records:** All 50 listings with `is_fictional_demo_record = TRUE` are designated with clear sample tags for demonstration purposes.
