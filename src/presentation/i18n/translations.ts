import type { Locale } from '../../domain/entities/Locale'

// Her arayüz metni için TR ve EN karşılığı bir arada.
// Kullanımı: translations.experienceTitle[locale]
// `[locale]` kısmı YENİ bir şey: obje.sabitIsim yerine obje[degisken]
// kullanıyoruz — `locale` değişkeninin DEĞERİNE göre ('tr' ya da 'en')
// hangi alana erişileceği ÇALIŞMA ZAMANINDA belirleniyor.
export const translations = {
  heroStatus: { tr: 'Yeni fırsatlara açığım', en: 'Open to new opportunities' },
  heroContactCta: { tr: 'İletişime Geç', en: 'Get in Touch' },
  servicesTitle: { tr: 'Hizmetler', en: 'Services' },
  servicesSubtitle: {
    tr: 'Stajın yanında freelance olarak da bu alanlarda proje alıyorum.',
    en: 'Alongside my internship, I also take on freelance projects in these areas.',
  },
  journeyTitle: { tr: 'Yolculuğum', en: 'My Journey' },
  experienceTitle: { tr: 'Deneyim', en: 'Experience' },
  educationTitle: { tr: 'Eğitim', en: 'Education' },
  skillsTitle: { tr: 'Yetenekler', en: 'Skills' },
  projectsTitle: { tr: 'Projeler', en: 'Projects' },
  languagesTitle: { tr: 'Diller', en: 'Languages' },
  contactTitle: { tr: 'İletişim', en: 'Contact' },
  formName: { tr: 'Ad Soyad', en: 'Full Name' },
  formEmail: { tr: 'E-posta', en: 'Email' },
  formTopic: { tr: 'Konu', en: 'Subject' },
  formMessage: { tr: 'Mesaj', en: 'Message' },
  formSubmit: { tr: 'Gönder', en: 'Send' },
  formSending: { tr: 'Gönderiliyor...', en: 'Sending...' },
  formSuccess: { tr: 'Mesajın gönderildi, teşekkürler!', en: 'Your message has been sent, thank you!' },
  formError: { tr: 'Bir şeyler ters gitti, tekrar dener misin?', en: 'Something went wrong, please try again.' },
  languageToggleLabel: { tr: 'EN', en: 'TR' },
}

export type TranslationKey = keyof typeof translations

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[key][locale]
}
