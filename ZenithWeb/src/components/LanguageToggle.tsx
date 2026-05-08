'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full p-1 backdrop-blur-md">
      <button
        onClick={() => setLanguage('PT')}
        className={`px-3 py-1.5 text-[10px] font-black tracking-widest rounded-full transition-all ${language === 'PT' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white'}`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('EN')}
        className={`px-3 py-1.5 text-[10px] font-black tracking-widest rounded-full transition-all ${language === 'EN' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}
