'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getTranslation, type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = getTranslation(currentLang);
  const isRTL = currentLang === 'he';

  // Get business info from environment variables with fallbacks
  const businessInfo = {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'VaiMOS',
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'jonatana@vaimos.net',
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '[YOUR_PHONE]',
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '[YOUR_ADDRESS]',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://vaimos.net',
  };

  const navigationLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.privacy, href: '/privacy' },
    { label: t.nav.terms, href: '/terms' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <footer
      className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Business Information */}
          <div className={cn('space-y-4', isRTL && 'text-right')}>
            <h3 className="text-xl font-semibold mb-4">{businessInfo.name}</h3>
            <p className="text-sm text-gray-300">
              {currentLang === 'he' 
                ? 'VaiMOS (בכפוף לאישור רישום)'
                : 'VaiMOS (subject to registration approval)'}
            </p>
            <div className="pt-2">
              <p className="text-sm font-semibold text-accent">
                {t.footer.madeIn}
              </p>
              <p className="text-sm text-gray-300">
                {t.footer.founded}
              </p>
            </div>
          </div>

          {/* Column 2: Contact Information - Email */}
          <div className={cn('space-y-4', isRTL && 'text-right')}>
            <h3 className="text-lg font-semibold mb-4">{t.nav.contact}</h3>
            <div className="space-y-3">
              <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">{t.footer.email}</p>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-sm text-gray-300 hover:text-accent transition-colors break-all"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Information - Phone & Address */}
          <div className={cn('space-y-4', isRTL && 'text-right')}>
            <h3 className="text-lg font-semibold mb-4">{t.footer.address}</h3>
            <div className="space-y-3">
              <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">{t.footer.phone}</p>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-sm text-gray-300 hover:text-accent transition-colors"
                  >
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
              <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">{t.footer.address}</p>
                  <address className="text-sm text-gray-300 not-italic">
                    {businessInfo.address}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Navigation Links */}
          <div className={cn('space-y-4', isRTL && 'text-right')}>
            <h3 className="text-lg font-semibold mb-4">
              {currentLang === 'he' ? 'קישורים' : 'Links'}
            </h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-light my-8" />

        {/* Bottom Section: Copyright & Legal */}
        <div className={cn(
          'flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300',
          isRTL && 'md:flex-row-reverse'
        )}>
          <div className={cn(isRTL && 'text-right')}>
            <p>
              © {new Date().getFullYear()} {businessInfo.name}. 
              {currentLang === 'he' 
                ? ' כל הזכויות שמורות.'
                : ' All rights reserved.'}
            </p>
          </div>
          <div className={cn(
            'flex gap-4',
            isRTL && 'flex-row-reverse'
          )}>
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors"
            >
              {t.nav.privacy}
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/terms"
              className="hover:text-accent transition-colors"
            >
              {t.nav.terms}
            </Link>
          </div>
        </div>

        {/* Meta Business Verification - Prominent Contact Block */}
        <div className={cn(
          'mt-8 p-6 bg-primary-dark rounded-lg border border-primary-light',
          isRTL && 'text-right'
        )}>
          <h4 className="text-base font-semibold mb-3 text-accent">
            {currentLang === 'he' ? 'פרטי עסק' : 'Business Contact'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-semibold">{currentLang === 'he' ? 'שם עסק:' : 'Business Name:'}</span>
              <span className="ml-2">{businessInfo.name} ({currentLang === 'he' ? 'בכפוף לאישור רישום' : 'subject to registration approval'})</span>
            </div>
            <div>
              <span className="font-semibold">{t.footer.email}:</span>
              <a href={`mailto:${businessInfo.email}`} className="ml-2 hover:text-accent transition-colors">
                {businessInfo.email}
              </a>
            </div>
            <div>
              <span className="font-semibold">{t.footer.phone}:</span>
              <a href={`tel:${businessInfo.phone}`} className="ml-2 hover:text-accent transition-colors">
                {businessInfo.phone}
              </a>
            </div>
            <div>
              <span className="font-semibold">{t.footer.address}:</span>
              <span className="ml-2">{businessInfo.address}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

