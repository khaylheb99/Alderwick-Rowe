import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  Shield,
  Trash2,
  Minimize2,
  Maximize2,
  Building,
  ArrowRight,
  Phone,
} from 'lucide-react';
import {
  ChatMessage,
  loadChatHistory,
  saveChatHistory,
  sendChatMessage,
} from '../services/chatService';

interface ChatWidgetProps {
  currentRoute: string;
  propertyReference?: string;
  onNavigate: (route: string, param?: string) => void;
  onFilterSearch?: (criteria: { location?: string; transaction?: string }) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  currentRoute,
  propertyReference,
  onNavigate,
  onFilterSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadChatHistory);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Persist history changes
  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text, {
        current_page: currentRoute,
        property_reference: propertyReference,
      });

      const agentMessage: ChatMessage = {
        id: 'msg_' + Date.now() + '_agent',
        sender: 'agent',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
        propertyRef: response.propertyRef || propertyReference,
      };

      setMessages(prev => [...prev, agentMessage]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: 'msg_' + Date.now() + '_err',
        sender: 'agent',
        text: 'I apologise; our connection experienced a brief interruption. Please contact our Mayfair desk directly on 020 7946 0192 or try again shortly.',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const sLower = suggestion.toLowerCase();

    // Check if suggestion is an action link
    if (sLower.includes('book') || sLower.includes('viewing')) {
      onNavigate('book-viewing', propertyReference);
      setIsOpen(false);
      return;
    }
    if (sLower.includes('valuation')) {
      onNavigate('sell-let');
      setIsOpen(false);
      return;
    }
    if (sLower.includes('properties in') || sLower.includes('view all')) {
      const cities = ['london', 'manchester', 'edinburgh', 'bristol', 'birmingham', 'cardiff', 'belfast'];
      const matched = cities.find(c => sLower.includes(c));
      if (matched && onFilterSearch) {
        onFilterSearch({ location: matched });
      }
      onNavigate('properties');
      setIsOpen(false);
      return;
    }
    if (sLower.includes('fee')) {
      onNavigate('sell-let');
      setIsOpen(false);
      return;
    }
    if (sLower.includes('office') || sLower.includes('contact')) {
      onNavigate('contact');
      setIsOpen(false);
      return;
    }

    // Default: send as chat prompt
    handleSendMessage(suggestion);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('alderwick_chat_history');
    setMessages(loadChatHistory());
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Alderwick & Rowe Live Property Concierge"
          className="group relative flex items-center gap-3 px-4 py-3 bg-[#0F2A44] hover:bg-[#1A3F65] text-white rounded-full shadow-2xl border-2 border-[#C8A45C] transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#C8A45C]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0F2A44] rounded-full animate-pulse" />
          </div>

          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold tracking-wide uppercase">
              Property Concierge
            </span>
            <span className="block text-[10px] text-slate-300 font-light">
              Connected to n8n workflow
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="bg-[#C8A45C] text-[#0F2A44] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Main Chat Drawer / Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Alderwick & Rowe Concierge Chat"
          className={`bg-white rounded-2xl border border-[#E2DFD8] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[94vw] sm:w-[540px] h-[85vh] max-h-[800px]'
              : 'w-[92vw] sm:w-[400px] h-[520px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0F2A44] text-white p-4 flex items-center justify-between border-b border-[#1A3F65]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A3F65] border border-[#C8A45C] flex items-center justify-center text-[#C8A45C]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-wide flex items-center gap-1.5">
                  <span>Alderwick &amp; Rowe Concierge</span>
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • n8n Webhook Live</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Clear conversation history"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore window size' : 'Expand window'}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Page Context Strip */}
          {propertyReference && (
            <div className="bg-amber-50/90 border-b border-amber-200/80 px-3.5 py-1.5 text-[11px] text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <Building className="w-3.5 h-3.5 text-[#C8A45C] shrink-0" />
                <span className="truncate">Active Property: <strong className="font-mono">{propertyReference}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('book-viewing', propertyReference)}
                className="text-[10px] font-bold text-[#0F2A44] underline shrink-0 ml-2"
              >
                Book viewing
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F7F4]/60">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0F2A44] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-[#E2DFD8] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Optional Suggestions Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(sug)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-slate-50 text-[#0F2A44] border border-[#E2DFD8] hover:border-[#C8A45C] rounded-full shadow-2xs transition-colors flex items-center gap-1 text-left"
                      >
                        <span>{sug}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-[#C8A45C] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-[#E2DFD8] rounded-2xl px-3.5 py-2 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A45C]" />
                <span className="italic font-light">Consulting n8n workflow &amp; portfolio...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Help Link Footer */}
          <div className="px-4 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#C8A45C]" />
              <span>Confidential UK lead dispatch</span>
            </span>
            <a href="tel:02079460192" className="text-[#0F2A44] hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>020 7946 0192</span>
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E2DFD8] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about properties, viewings, or valuations..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F7F4] border border-[#E2DFD8] rounded-full focus:bg-white focus:outline-none focus:border-[#C8A45C] focus:ring-1 focus:ring-[#C8A45C] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 bg-[#0F2A44] hover:bg-[#1A3F65] disabled:bg-slate-300 text-white rounded-full transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4 text-[#C8A45C]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
