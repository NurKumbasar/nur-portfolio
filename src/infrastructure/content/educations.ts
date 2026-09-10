import type { Education } from '../../domain/entities/Education'
import type { Locale } from '../../domain/entities/Locale'

// Gerçek eğitim verisi — güncel CV'den taşındı, dile göre `educations[locale]`.
export const educations: Record<Locale, Education[]> = {
  tr: [
    {
      degree: 'Bilgisayar Mühendisliği Lisans (%50 Burslu)',
      institution: 'Kadir Has Üniversitesi',
      period: '2023 — 2027',
      location: 'İstanbul, Türkiye',
    },
    {
      degree: 'İngilizce Hazırlık Programı',
      institution: 'Kadir Has Üniversitesi',
      period: '2022 - 2023',
      location: 'İstanbul, Türkiye',
    },
    {
      degree: 'Fen Lisesi (Not Ortalaması: 93.4/100)',
      institution: 'Çiğli Fen Lisesi',
      period: '2018 — 2022',
      location: 'İzmir, Türkiye',
    },
  ],
  en: [
    {
      degree: 'B.Sc. in Computer Engineering (50% Scholarship)',
      institution: 'Kadir Has University',
      period: '2023 — 2027',
      location: 'Istanbul, Turkey',
    },
    {
      degree: 'English Preparatory Program',
      institution: 'Kadir Has University',
      period: '2022 - 2023',
      location: 'Istanbul, Turkey',
    },
    {
      degree: 'Science High School (GPA: 93.4/100)',
      institution: 'Çiğli Science High School',
      period: '2018 — 2022',
      location: 'Izmir, Turkey',
    },
  ],
}
