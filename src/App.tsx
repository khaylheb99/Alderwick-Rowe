/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { SellLetPage } from './pages/SellLetPage';
import { BookViewingPage } from './pages/BookViewingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookieNoticePage } from './pages/CookieNoticePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FilterState } from './components/FilterBar';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<Partial<FilterState>>({});

  // Parse location hash on mount and when hash changes
  const parseHash = () => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    if (!raw) {
      setCurrentRoute('home');
      setRouteParam('');
      return;
    }

    const parts = raw.split('/');
    const main = parts[0].toLowerCase();
    const sub = parts.slice(1).join('/');

    if (main === 'property' && sub) {
      setCurrentRoute('property');
      setRouteParam(sub);
    } else if (main === 'book-viewing') {
      setCurrentRoute('book-viewing');
      setRouteParam(sub || '');
    } else if (
      ['home', 'properties', 'sell-let', 'book-viewing', 'about', 'contact', 'privacy-policy', 'cookie-notice'].includes(main)
    ) {
      setCurrentRoute(main);
      setRouteParam(sub || '');
    } else {
      setCurrentRoute('404');
      setRouteParam('');
    }
  };

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    let title = 'Alderwick & Rowe | Property, Handled Properly | UK Estate & Lettings Agents';
    let desc = 'Premier UK residential sales, lettings, property management, and viewing services across England, Scotland, Wales, and Northern Ireland.';

    if (currentRoute === 'properties') {
      title = 'UK Properties for Sale & Rent | Alderwick & Rowe';
      desc = 'Search 50 residential homes for sale and let across London, Manchester, Scotland, Wales, and Northern Ireland.';
    } else if (currentRoute === 'property' && routeParam) {
      title = `${routeParam} | Alderwick & Rowe Property Portfolio`;
      desc = `View comprehensive particulars, specifications, floor area, and schedule an accompanied viewing for ${routeParam}.`;
    } else if (currentRoute === 'sell-let') {
      title = 'Sell or Let with Us | Transparent Fees | Alderwick & Rowe';
      desc = 'Expert valuation, RICS compliant marketing, dedicated consultant representation, and zero hidden fees for UK vendors and landlords.';
    } else if (currentRoute === 'book-viewing') {
      title = 'Book an Accompanied Viewing | Alderwick & Rowe';
      desc = 'Schedule an accompanied viewing slot with an Alderwick & Rowe property consultant (Europe/London time).';
    } else if (currentRoute === 'about') {
      title = 'About Our Firm & Partners | Alderwick & Rowe Ltd';
      desc = 'Meet our founding partners and regional directors. Founded on integrity, local knowledge, and client money protection.';
    } else if (currentRoute === 'contact') {
      title = 'Contact & Regional Offices | Alderwick & Rowe';
      desc = 'Contact our central Mayfair office or regional desks in Manchester, Edinburgh, and Cardiff. Open 6 days a week.';
    } else if (currentRoute === 'privacy-policy') {
      title = 'UK GDPR Privacy Policy | Alderwick & Rowe Ltd';
      desc = 'How Alderwick & Rowe Ltd collects, processes, and protects personal data under the Data Protection Act 2018 and UK GDPR.';
    } else if (currentRoute === 'cookie-notice') {
      title = 'Cookie Notice & Consent | Alderwick & Rowe';
      desc = 'Information on essential and analytical cookies used by Alderwick & Rowe Ltd, and how to manage your preferences.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [currentRoute, routeParam]);

  const navigate = (route: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route === 'property' && param) {
      window.location.hash = `property/${param}`;
    } else if (route === 'book-viewing' && param) {
      window.location.hash = `book-viewing/${param}`;
    } else if (route === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = route;
    }
  };

  const handleFilterSearch = (criteria: { transaction?: string; location?: string; type?: string; bedrooms?: number }) => {
    setSearchFilters({
      transaction: (criteria.transaction as 'For sale' | 'To rent') || 'all',
      locationQuery: criteria.location || '',
      propertyType: criteria.type || 'all',
      minBedrooms: criteria.bedrooms || 0,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Navigation and Favourites */}
      <Header currentRoute={currentRoute} onNavigate={navigate} />

      {/* Main Content View Container */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage onNavigate={navigate} onFilterSearch={handleFilterSearch} />
        )}

        {currentRoute === 'properties' && (
          <PropertiesPage initialFilters={searchFilters} onNavigate={navigate} />
        )}

        {currentRoute === 'property' && (
          <PropertyDetailPage propertyReference={routeParam} onNavigate={navigate} />
        )}

        {currentRoute === 'sell-let' && (
          <SellLetPage onNavigate={navigate} />
        )}

        {currentRoute === 'book-viewing' && (
          <BookViewingPage initialPropertyReference={routeParam} onNavigate={navigate} />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={navigate} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage onNavigate={navigate} />
        )}

        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyPage />
        )}

        {currentRoute === 'cookie-notice' && (
          <CookieNoticePage />
        )}

        {currentRoute === '404' && (
          <NotFoundPage onNavigate={navigate} />
        )}
      </main>

      {/* Comprehensive UK Footer */}
      <Footer onNavigate={navigate} />

      {/* Interactive Concierge Chat connected to n8n production webhook */}
      <ChatWidget
        currentRoute={currentRoute}
        propertyReference={currentRoute === 'property' ? routeParam : undefined}
        onNavigate={navigate}
        onFilterSearch={(crit) => {
          if (crit.location) {
            handleFilterSearch({ location: crit.location });
          }
        }}
      />

      {/* UK GDPR Cookie Banner */}
      <CookieBanner onNavigateToPolicy={() => navigate('cookie-notice')} />
    </div>
  );
}
