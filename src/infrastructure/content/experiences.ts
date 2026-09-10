import type { Experience } from '../../domain/entities/Experience'
import type { Locale } from '../../domain/entities/Locale'

// Gerçek deneyim verisi — güncel CV'den taşındı, dile göre `experiences[locale]`.
export const experiences: Record<Locale, Experience[]> = {
  tr: [
    {
      role: 'Ürün ve Yazılım Geliştirme Stajyeri',
      company: 'KoçSistem: Dijital ve Teknoloji Çözümleri',
      period: 'Tem 2026 — Eyl 2026',
      location: 'İstanbul, Türkiye',
      highlights: [
        'React, TypeScript ve ASP.NET Core (C#) kullanarak, çalışanların şirket içi BT çözümlerini keşfetmesini, talep etmesini ve yönetmesini sağlayan tam kapsamlı (full-stack) bir web uygulaması geliştirdim.',
        'Güvenli giriş için Microsoft Entra ID entegre ettim ve farklı kullanıcıların (Çalışan, Çözüm Sahibi, Admin) sadece kendi rolleriyle ilgili özelliklere erişebilmesi için rol tabanlı yetkilendirme uyguladım.',
        'SQL Server ve Entity Framework Core ile ilişkisel bir veritabanı tasarlayıp yönettim, 22 tabloyu modelleyerek veritabanı yapısının uygulamayla her zaman senkron kalmasını sağladım.',
        "Geliştirme sürecinde Test Güdümlü Geliştirme (TDD) uyguladım, 204/204 testin geçtiği bir test paketi oluşturdum ve her kod push'undan önce çalışan otomatik kalite kontrolleri kurdum.",
      ],
    },
    {
      role: 'QA Stajyeri',
      company: 'Extra360 Technology Solutions',
      period: 'Şub 2026 — Haz 2026',
      location: 'İstanbul, Türkiye',
      highlights: [
        'Web ve mobil uygulamalar için manuel test senaryoları yürüttüm, yapılandırılmış hata raporlarıyla yazılım kusurlarını tespit edip belgeledim.',
        'Hata düzeltmelerini doğrulamak ve test yaşam döngüsü boyunca yazılım kalitesini sağlamak için geliştirme ekipleriyle iş birliği yaptım.',
        'Uygulama güvenilirliğini, performansını ve kullanıcı deneyimini geliştirmek için fonksiyonel, regresyon ve kullanılabilirlik testleri gerçekleştirdim.',
      ],
    },
    {
      role: 'Bilgi Teknolojileri Stajyeri',
      company: 'Social Office',
      period: 'Haz 2025 — Tem 2025',
      location: 'İstanbul, Türkiye',
      highlights: [
        'Yazılım geliştirme becerilerimi güçlendirmek için temel Python uygulamaları geliştirdim ve teknik görevlerde destek verdim.',
        'Operasyonel ve idari projelerde Microsoft Excel, AutoCAD ve Adobe Photoshop kullandım.',
      ],
    },
    {
      role: 'Proje Yönetimi Stajyeri',
      company: 'SCA Social',
      period: 'Haz 2025 — Tem 2025',
      location: 'İstanbul, Türkiye',
      highlights: [
        'Birden fazla iş ve teknoloji projesinde proje planlama, dokümantasyon ve koordinasyon faaliyetlerinde yer aldım.',
        'Proje yürütme ve ilerleme takibini desteklemek için proje tüzükleri, Gantt şemaları ve organizasyonel dokümanlar hazırladım.',
        'Yapay zeka, BT hukuku ve iş süreci analizi ile ilgili projelere araştırma ve dokümantasyon faaliyetleriyle katkıda bulundum.',
      ],
    },
  ],
  en: [
    {
      role: 'Product & Software Development Intern',
      company: 'KoçSistem: Digital & Technology Solutions',
      period: 'Jul 2026 – Sep 2026',
      location: 'Istanbul, Turkey',
      highlights: [
        'Developed a full-stack web application using React, TypeScript, and ASP.NET Core (C#) that lets employees explore, request, and manage internal IT solutions.',
        'Integrated Microsoft Entra ID for secure sign-in and implemented role-based authorization so each user type (Employee, Solution Owner, Admin) could only access features relevant to their role.',
        'Designed and managed a relational database with SQL Server and Entity Framework Core, modeling 22 tables to keep the schema always in sync with the application.',
        'Practiced Test-Driven Development (TDD) throughout, built a test suite with 204/204 passing tests, and set up automated quality checks that ran before every code push.',
      ],
    },
    {
      role: 'QA Intern',
      company: 'Extra360 Technology Solutions',
      period: 'Feb 2026 – Jun 2026',
      location: 'Istanbul, Turkey',
      highlights: [
        'Executed manual test cases for web and mobile applications, identifying and documenting software defects with structured bug reports.',
        'Collaborated with development teams to verify bug fixes and maintain software quality throughout the test lifecycle.',
        'Performed functional, regression, and usability testing to improve application reliability, performance, and user experience.',
      ],
    },
    {
      role: 'IT Intern',
      company: 'Social Office',
      period: 'Jun 2025 – Jul 2025',
      location: 'Istanbul, Turkey',
      highlights: [
        'Built basic Python applications to strengthen my software development skills and supported various technical tasks.',
        'Used Microsoft Excel, AutoCAD, and Adobe Photoshop on operational and administrative projects.',
      ],
    },
    {
      role: 'Project Management Intern',
      company: 'SCA Social',
      period: 'Jun 2025 – Jul 2025',
      location: 'Istanbul, Turkey',
      highlights: [
        'Took part in project planning, documentation, and coordination across multiple business and technology projects.',
        'Prepared project charters, Gantt charts, and organizational documents to support project execution and progress tracking.',
        'Contributed research and documentation to projects related to artificial intelligence, IT law, and business process analysis.',
      ],
    },
  ],
}
