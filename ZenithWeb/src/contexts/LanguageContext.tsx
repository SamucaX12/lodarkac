'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { pt } from '../locales/pt';
import { en } from '../locales/en';

type Language = 'PT' | 'EN';
type Translations = typeof pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('PT');

  useEffect(() => {
    const saved = localStorage.getItem('lodark_lang') as Language;
    if (saved && (saved === 'PT' || saved === 'EN')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lodark_lang', lang);
  };

  const t = (key: keyof Translations): string => {
    const dict = language === 'EN' ? en : pt;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
