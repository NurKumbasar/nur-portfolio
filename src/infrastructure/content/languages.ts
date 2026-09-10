import type { Language } from '../../domain/entities/Language'
import type { Locale } from '../../domain/entities/Locale'

// Gerçek dil verisi — güncel CV'den taşındı, dile göre `languages[locale]`.
export const languages: Record<Locale, Language[]> = {
  tr: [
    { name: 'Türkçe', level: 'Ana Dil' },
    { name: 'İngilizce', level: 'Orta-İleri Seviye (B2)' },
  ],
  en: [
    { name: 'Turkish', level: 'Native' },
    { name: 'English', level: 'Upper-Intermediate (B2)' },
  ],
}
