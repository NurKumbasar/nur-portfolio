import type { Locale } from '../../domain/entities/Locale'

// Her arayüz metni için TR ve EN karşılığı bir arada.
// Kullanımı: translations.experienceTitle[locale]
// `[locale]` kısmı YENİ bir şey: obje.sabitIsim yerine obje[degisken]
// kullanıyoruz — `locale` değişkeninin DEĞERİNE göre ('tr' ya da 'en')
// hangi alana erişileceği ÇALIŞMA ZAMANINDA belirleniyor.
export const translations = {
  heroStatus: { tr: 'Yeni fırsatlara açığım', en: 'Open to new opportunities' },
  heroTagline: {
    tr: 'Merhaba dünya! Kod yazan, kahve içen, öğrenmeyi hiç bırakmayan bir mühendislik öğrencisiyim.',
    en: "Hello world! I'm an engineering student who codes, drinks too much coffee, and never stops learning.",
  },
  heroContactCta: { tr: 'İletişime Geç', en: 'Get in Touch' },
  servicesTitle: { tr: 'Hizmetler', en: 'Services' },
  servicesSubtitle: {
    tr: 'Stajımın yanı sıra, freelance olarak da aşağıdaki alanlarda proje üstleniyorum.',
    en: 'Beyond my internship, I take on freelance projects in the following areas.',
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
  mascotChatTitle: { tr: 'Nuriş ile Sohbet', en: 'Chat with Nuriş' },
  mascotChatGreeting: {
    tr: 'Merhaba! Ben Nuriş, Nur\'un dijital maskotuyum. Bir şey sorabilirsin.',
    en: "Hi! I'm Nuriş, Nur's digital mascot. Feel free to ask me something.",
  },
  mascotChatPlaceholder: { tr: 'Bir şey sor...', en: 'Ask something...' },
  mascotChatSend: { tr: 'Gönder', en: 'Send' },
  mascotChatError: {
    tr: 'Şu an cevap veremiyorum, biraz sonra tekrar dener misin?',
    en: "I can't reply right now — could you try again in a bit?",
  },
}

export type TranslationKey = keyof typeof translations

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[key][locale]
}
