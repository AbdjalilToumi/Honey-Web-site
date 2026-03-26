'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Lang, Translations } from '@/i18n/translations';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: translations.fr,
  dir: 'ltr',
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir  = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
