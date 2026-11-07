/**
 * Alderwick & Rowe - Live Concierge & n8n Chat Service
 * Connects the interactive chat widget to the n8n production webhook.
 */

import { PROPERTIES } from '../data/properties';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestions?: string[];
  propertyRef?: string;
}

export interface ChatWebhookPayload {
  source: 'website';
  form_type: 'chat';
  session_id: string;
  message: string;
  timestamp: string;
  context?: {
    current_page?: string;
    property_reference?: string;
    saved_properties_count?: number;
  };
}

const SESSION_STORAGE_KEY = 'alderwick_chat_session_id';
const HISTORY_STORAGE_KEY = 'alderwick_chat_history';

export function getOrCreateSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = 'ar_chat_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return 'ar_chat_guest_' + Date.now().toString(36);
  }
}

export function loadChatHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  // Default introductory message from Alderwick & Rowe concierge
  return [
    {
      id: 'welcome-1',
      sender: 'agent',
      text: 'Good day. Welcome to Alderwick & Rowe. I am your digital concierge. How may I assist your UK property search, viewing, or valuation enquiry today?',
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Browse properties in London',
        'Book an accompanied viewing',
        'Request a free market valuation',
        'What are your fee terms?',
      ],
    },
  ];
}

export function saveChatHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  } catch {
    // ignore
  }
}

/**
 * Intelligent client-side fallback concierge when the production n8n webhook
 * is yet to be configured or during local sandbox demonstration.
 */
function generateLocalConciergeReply(userText: string, context?: ChatWebhookPayload['context']): { text: string; suggestions?: string[]; propertyRef?: string } {
  const query = userText.toLowerCase();

  // 1. Viewing query
  if (query.includes('viewing') || query.includes('visit') || query.includes('inspect') || query.includes('book')) {
    if (context?.property_reference) {
      return {
        text: `I can certainly help you arrange an accompanied viewing for ${context.property_reference}. Our consultants host visits 6 days a week. Would you like to pick a preferred morning or afternoon slot?`,
        suggestions: ['Open Viewing Booking Form', 'Speak with Mayfair office (020 7946 0192)'],
        propertyRef: context.property_reference,
      };
    }
    return {
      text: 'We would be delighted to arrange an accompanied viewing for any property across our UK portfolio. You can select your preferred date and Europe/London time window directly through our booking calendar.',
      suggestions: ['Go to Book a Viewing page', 'Browse available properties'],
    };
  }

  // 2. Valuation or selling query
  if (query.includes('valuation') || query.includes('sell') || query.includes('let') || query.includes('landlord') || query.includes('vendor')) {
    return {
      text: 'Our senior partners provide comprehensive, evidence-based market valuations backed by HM Land Registry transaction data. All appraisals are complimentary and without obligation, backed by our Fee Transparency Guarantee.',
      suggestions: ['Request a free valuation visit', 'Learn about our 4-step sales process'],
    };
  }

  // 3. Location searches (e.g. Manchester, London, Edinburgh, Wales)
  const matchedCity = ['london', 'manchester', 'edinburgh', 'bristol', 'birmingham', 'cardiff', 'belfast', 'oxford', 'bath', 'leeds'].find(city => query.includes(city));
  if (matchedCity) {
    const cityName = matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1);
    const count = PROPERTIES.filter(p => p.city.toLowerCase() === matchedCity || p.locality.toLowerCase().includes(matchedCity)).length;
    return {
      text: `We currently have ${count} distinct residential properties in and around ${cityName}, ranging from modern city apartments to detached homes. Would you like to view listings for sale or to rent?`,
      suggestions: [`View all ${cityName} properties`, `Properties for sale in ${cityName}`, `Properties to rent in ${cityName}`],
    };
  }

  // 4. Fees / commission
  if (query.includes('fee') || query.includes('cost') || query.includes('charge') || query.includes('commission')) {
    return {
      text: 'Under the Alderwick & Rowe Fee Transparency Guarantee, all sales and letting management fees are confirmed in writing prior to marketing. We never charge abortive fees, unexpected administrative mark-ups, or portal listing surcharges.',
      suggestions: ['Read fee transparency terms', 'Request a tailored fee quote'],
    };
  }

  // 5. Office hours / telephone / contact
  if (query.includes('phone') || query.includes('call') || query.includes('contact') || query.includes('office') || query.includes('hours') || query.includes('address')) {
    return {
      text: 'Our central Mayfair desk can be reached directly on 020 7946 0192 (Mon–Fri 08:30–18:30, Sat 09:00–16:00). We also maintain regional hubs in Manchester, Edinburgh, and Cardiff.',
      suggestions: ['View regional offices', 'Send an email enquiry'],
    };
  }

  // Default helpful response
  return {
    text: 'Thank you for your message. As an independent UK agency, our consultants can assist with residential sales, accompanied viewings, lettings management, and off-market searches. How may we guide you further?',
    suggestions: [
      'Search properties for sale',
      'Search properties to rent',
      'Book a viewing',
      'Request a valuation',
    ],
  };
}

export async function sendChatMessage(
  message: string,
  context?: ChatWebhookPayload['context']
): Promise<{ text: string; suggestions?: string[]; propertyRef?: string }> {
  const webhookUrl =
    (import.meta.env.VITE_CHAT_WEBHOOK as string) ||
    (import.meta.env.VITE_ENQUIRY_WEBHOOK as string) ||
    (import.meta.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK as string) ||
    '';

  const isPlaceholderHost = !webhookUrl || webhookUrl.includes('your-n8n-host') || webhookUrl.includes('<your-n8n-host>');

  const sessionId = getOrCreateSessionId();
  const payload: ChatWebhookPayload = {
    source: 'website',
    form_type: 'chat',
    session_id: sessionId,
    message: message.trim(),
    timestamp: new Date().toISOString(),
    context,
  };

  // If real webhook is configured, dispatch HTTP POST to n8n
  if (!isPlaceholderHost) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook responded with status ${response.status}`);
      }

      // Parse response from n8n
      const contentType = response.headers.get('content-type') || '';
      let replyText = '';
      let suggestions: string[] | undefined;

      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Support common n8n AI agent response keys
        replyText =
          data.output ||
          data.response ||
          data.text ||
          data.message ||
          data.reply ||
          (typeof data === 'string' ? data : JSON.stringify(data));

        if (Array.isArray(data.suggestions)) {
          suggestions = data.suggestions;
        }
      } else {
        replyText = await response.text();
      }

      if (replyText && replyText.trim().length > 0) {
        return {
          text: replyText.trim(),
          suggestions,
        };
      }
    } catch (err) {
      console.warn('n8n webhook dispatch failed or blocked by CORS. Falling back to local concierge advisor:', err);
    }
  }

  // Graceful intelligent fallback when webhook is placeholder or offline
  await new Promise(resolve => setTimeout(resolve, 650));
  return generateLocalConciergeReply(message, context);
}
