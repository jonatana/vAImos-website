export type Language = 'en' | 'he';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      schedule: 'Schedule Tool',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    hero: {
      tagline: 'AI tools that do the work',
      subtitle: 'Your AI receptionist for WhatsApp bookings',
      cta: 'Start Free Trial',
      ctaSecondary: 'Learn More',
    },
    footer: {
      address: 'Address',
      email: 'Email',
      phone: 'Phone',
      madeIn: 'Proudly made in Israel',
      founded: 'Founded 2025',
      tradingAs: 'VaiMOS (subject to registration approval)',
    },
  },
  he: {
    nav: {
      home: 'בית',
      about: 'אודות',
      schedule: 'כלי Schedule',
      contact: 'צור קשר',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
    },
    hero: {
      tagline: 'כלי AI שעושים את העבודה',
      subtitle: 'המזכירה האוטומטית שלך לתיאום פגישות בוואטסאפ',
      cta: 'התחל ניסיון חינם',
      ctaSecondary: 'למד עוד',
    },
    footer: {
      address: 'כתובת',
      email: 'אימייל',
      phone: 'טלפון',
      madeIn: 'מיוצר בגאווה בישראל',
      founded: 'נוסד 2025',
      tradingAs: 'VaiMOS (בכפוף לאישור רישום)',
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang];
}

