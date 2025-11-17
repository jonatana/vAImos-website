'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { type Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  currentLang: Language;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm({ currentLang }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const isRTL = currentLang === 'he';

  // Translations
  const t = {
    en: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      success: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
      errorGeneric: 'Something went wrong. Please try again later.',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'your.email@example.com',
      phonePlaceholder: '+972-XX-XXX-XXXX (optional)',
      messagePlaceholder: 'Tell us how we can help you...',
    },
    he: {
      name: 'שם מלא',
      email: 'כתובת אימייל',
      phone: 'מספר טלפון',
      message: 'הודעה',
      submit: 'שלח הודעה',
      sending: 'שולח...',
      required: 'שדה חובה',
      invalidEmail: 'נא להזין כתובת אימייל תקינה',
      success: 'תודה! ההודעה נשלחה בהצלחה. ניצור איתך קשר בהקדם.',
      errorGeneric: 'משהו השתבש. אנא נסה שוב מאוחר יותר.',
      namePlaceholder: 'הזן את שמך המלא',
      emailPlaceholder: 'your.email@example.com',
      phonePlaceholder: '052-XXX-XXXX (אופציונלי)',
      messagePlaceholder: 'ספר לנו כיצד נוכל לעזור לך...',
    },
  };

  const labels = t[currentLang];

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = labels.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = labels.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = labels.invalidEmail;
    }

    if (!formData.message.trim()) {
      newErrors.message = labels.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: currentLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Success
      setStatus('success');
      setSubmitMessage(labels.success);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setSubmitMessage(labels.errorGeneric);

      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full max-w-2xl mx-auto space-y-6', isRTL && 'text-right')}
      dir={isRTL ? 'rtl' : 'ltr'}
      noValidate
    >
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-text"
        >
          {labels.name} <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={labels.namePlaceholder}
          disabled={status === 'loading'}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            errors.name
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-gray-300'
          )}
        />
        {errors.name && (
          <p className="flex items-center gap-1 text-sm text-error">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-text"
        >
          {labels.email} <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={labels.emailPlaceholder}
          disabled={status === 'loading'}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            errors.email
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-gray-300'
          )}
        />
        {errors.email && (
          <p className="flex items-center gap-1 text-sm text-error">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-text"
        >
          {labels.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={labels.phonePlaceholder}
          disabled={status === 'loading'}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 border-gray-300 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed'
          )}
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-text"
        >
          {labels.message} <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={labels.messagePlaceholder}
          disabled={status === 'loading'}
          rows={6}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-colors resize-y',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            errors.message
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-gray-300'
          )}
        />
        {errors.message && (
          <p className="flex items-center gap-1 text-sm text-error">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full py-3 px-6 rounded-lg font-semibold',
          'flex items-center justify-center gap-2',
          'transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-accent hover:bg-accent-dark text-white'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {labels.sending}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {labels.submit}
          </>
        )}
      </button>

      {/* Success/Error Messages */}
      {submitMessage && (
        <div
          className={cn(
            'p-4 rounded-lg flex items-start gap-3',
            status === 'success' && 'bg-green-50 border-2 border-success',
            status === 'error' && 'bg-red-50 border-2 border-error'
          )}
          role="alert"
        >
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          )}
          <p
            className={cn(
              'text-sm font-medium',
              status === 'success' && 'text-green-800',
              status === 'error' && 'text-red-800'
            )}
          >
            {submitMessage}
          </p>
        </div>
      )}
    </form>
  );
}

