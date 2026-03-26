'use client';
import { useLang } from '@/contexts/LangContext';
import { Lang } from '@/i18n/translations';

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'ar', label: 'العربية',  flag: '🇲🇦' },
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();
  const current = langs.find((l) => l.code === lang)!;

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-sm gap-1 font-body font-semibold text-stone-700 hover:text-amber-700 hover:bg-amber-100 rounded-lg px-3">
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul tabIndex={0} className="dropdown-content menu bg-white border border-amber-100 rounded-2xl shadow-xl p-2 w-40 z-[100] mt-2">
        {langs.map(({ code, label, flag }) => (
          <li key={code}>
            <button
              onClick={() => setLang(code)}
              className={`flex items-center gap-3 font-body font-medium rounded-xl px-3 py-2 w-full text-left transition-colors
                ${lang === code
                  ? 'bg-amber-100 text-amber-800 font-semibold'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`}
            >
              <span className="text-lg">{flag}</span>
              <span>{label}</span>
              {lang === code && (
                <svg className="w-4 h-4 ms-auto text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
