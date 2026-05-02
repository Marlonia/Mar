'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useState, useTransition } from 'react';

const localeFlags: Record<string, { flag: string; label: string; short: string }> = {
  es: { flag: '🇨🇴', label: 'Español', short: 'ES' },
  en: { flag: '🇺🇸', label: 'English', short: 'EN' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function switchLocale(newLocale: string) {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as 'es' | 'en' });
      setIsOpen(false);
    });
  }

  const current = localeFlags[locale] || localeFlags.es;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 glass-effect rounded-full text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
        aria-label="Switch language"
      >
        <span className="text-base">{current.flag}</span>
        <span className="font-accent font-bold text-xs uppercase tracking-wider">{current.short}</span>
        <span
          className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[180px] glass-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-fade-in">
            {routing.locales.map((loc) => {
              const data = localeFlags[loc] || localeFlags.es;
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-carnival-yellow/20 text-carnival-yellow'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{data.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="font-accent font-bold text-sm">{data.label}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">
                      {data.short}
                    </span>
                  </div>
                  {isActive && <span className="ml-auto text-carnival-yellow">✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
