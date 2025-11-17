'use client';

import { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

// Storage key for localStorage
const LANGUAGE_STORAGE_KEY = 'vaimos-language-preference';

/**
 * Get browser's default language preference
 * Returns 'he' if browser language is Hebrew (he-IL, he, etc.), otherwise 'en'
 */
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];

  return langCode === 'he' ? 'he' : 'en';
}

/**
 * Get stored language preference from localStorage
 * Falls back to browser language if no preference is stored
 */
export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'he') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language preference from localStorage:', error);
  }

  return getBrowserLanguage();
}

/**
 * Store language preference in localStorage
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to save language preference to localStorage:', error);
  }
}

export default function LanguageSwitcher({
  currentLang,
  onLanguageChange,
}: LanguageSwitcherProps) {
  // Store language preference whenever it changes
  useEffect(() => {
    setStoredLanguage(currentLang);
  }, [currentLang]);

  const handleLanguageToggle = () => {
    const newLang: Language = currentLang === 'en' ? 'he' : 'en';
    onLanguageChange(newLang);
  };

  const languages = [
    { code: 'en' as Language, label: 'EN', fullName: 'English' },
    { code: 'he' as Language, label: 'עב', fullName: 'עברית' },
  ];

  return (
    <button
      onClick={handleLanguageToggle}
      className={cn(
        'group relative inline-flex items-center gap-2 px-4 py-2',
        'rounded-lg border-2 border-primary',
        'bg-white hover:bg-background',
        'transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
      )}
      aria-label={`Switch language to ${currentLang === 'en' ? 'Hebrew' : 'English'}`}
      title={`Switch to ${currentLang === 'en' ? 'Hebrew' : 'English'}`}
    >
      {/* Globe Icon */}
      <Globe
        className={cn(
          'w-5 h-5 transition-colors duration-300',
          'text-primary group-hover:text-accent'
        )}
      />

      {/* Language Display */}
      <div className="flex items-center gap-1.5">
        {languages.map((lang) => (
          <span
            key={lang.code}
            className={cn(
              'text-sm font-semibold transition-all duration-300',
              currentLang === lang.code
                ? 'text-accent scale-110'
                : 'text-text-light scale-100 group-hover:text-text'
            )}
          >
            {lang.label}
          </span>
        ))}
      </div>

      {/* Visual separator between languages */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-px h-4 bg-primary opacity-30'
        )}
      />
    </button>
  );
}

