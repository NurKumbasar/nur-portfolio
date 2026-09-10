import type { Locale } from '../../domain/entities/Locale'
import type { Service } from '../../domain/entities/Service'

// Staj dışında freelance olarak aldığım iş türleri — deneyim bölümündeki
// gerçek projelere dayanıyor (KoçSistem, Extra360, Social Office).
// Dile göre `services[locale]`.
export const services: Record<Locale, Service[]> = {
  tr: [
    {
      title: 'Web ve Full Stack Geliştirme',
      description:
        'Fikirden yayına kadar React, TypeScript ve ASP.NET Core ile uçtan uca web uygulamaları geliştiriyorum.',
      tags: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server'],
    },
    {
      title: 'Yazılım Test ve Kalite Güvencesi',
      description:
        'Manuel ve otomasyon testleriyle uygulamanızın kırılma noktalarını, kullanıcıya ulaşmadan önce buluyorum.',
      tags: ['Test Otomasyonu', 'QA', 'Regresyon Testi'],
    },
    {
      title: 'Otomasyon ve Script Çözümleri',
      description: "Tekrar eden işleri Python script'leriyle ortadan kaldırıyorum.",
      tags: ['Python', 'Otomasyon'],
    },
  ],
  en: [
    {
      title: 'Web & Full Stack Development',
      description: 'I build end-to-end web applications with React, TypeScript, and ASP.NET Core, from idea to launch.',
      tags: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server'],
    },
    {
      title: 'Software Testing & QA',
      description: "I find your application's breaking points with manual and automated testing before your users do.",
      tags: ['Test Automation', 'QA', 'Regression Testing'],
    },
    {
      title: 'Automation & Scripting',
      description: 'I eliminate repetitive work with Python scripts.',
      tags: ['Python', 'Automation'],
    },
  ],
}
