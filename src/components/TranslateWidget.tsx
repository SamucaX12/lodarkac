'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function TranslateWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('PT-BR');

  // Load the current language from the cookie
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const googtrans = cookies.find(c => c.trim().startsWith('googtrans='));
    if (googtrans) {
      const val = googtrans.split('=')[1];
      if (val.includes('/en')) setCurrentLang('EN');
      else if (val.includes('/es')) setCurrentLang('ES');
      else if (val.includes('/pt-PT')) setCurrentLang('PT-PT');
      else setCurrentLang('PT-BR');
    }
  }, []);

  const changeLanguage = (lang: string, code: string) => {
    setCurrentLang(lang);
    setIsOpen(false);

    if (code === 'pt-BR') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.' + window.location.hostname + '; path=/;';
    } else {
      document.cookie = `googtrans=/auto/${code}; path=/;`;
      document.cookie = `googtrans=/auto/${code}; path=/; domain=.${window.location.hostname};`;
    }
    
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* Script to initialize Google Translate hidden */}
      <div id="google_translate_element" className="hidden"></div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
      >
        <Globe size={16} />
        <span>{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-[#111827] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          <button onClick={() => changeLanguage('PT-BR', 'pt-BR')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            🇧🇷 Português
          </button>
          <button onClick={() => changeLanguage('PT-PT', 'pt-PT')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            🇵🇹 Português (PT)
          </button>
          <button onClick={() => changeLanguage('EN', 'en')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            🇺🇸 English
          </button>
          <button onClick={() => changeLanguage('ES', 'es')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            🇪🇸 Español
          </button>
        </div>
      )}
    </div>
  );
}
