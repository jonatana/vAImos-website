'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { getTranslation, type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = getTranslation(currentLang);
  const isRTL = currentLang === 'he';

  // Handle scroll effect for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when language changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentLang]);

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.schedule, href: '/schedule' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const toggleLanguage = () => {
    onLanguageChange(currentLang === 'en' ? 'he' : 'en');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white border-b transition-shadow duration-300',
        isScrolled ? 'shadow-md' : 'shadow-sm'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-semibold text-primary hover:text-primary-light transition-colors"
          >
            VaiMOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-text font-normal hover:text-accent transition-colors relative group',
                  isRTL && 'text-right'
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side: Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-text hover:bg-background hover:text-accent transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase">
                {currentLang === 'en' ? 'EN' : 'עב'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-background transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className={cn(
              'md:hidden py-4 border-t',
              isRTL && 'text-right'
            )}
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-text hover:bg-background hover:text-accent transition-colors rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

