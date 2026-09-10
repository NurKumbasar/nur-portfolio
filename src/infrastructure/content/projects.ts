import type { Locale } from '../../domain/entities/Locale'
import type { Project } from '../../domain/entities/Project'

// Gerçek proje verisi — güncel CV'den taşındı. Başlıklar ve etiketler
// (React, MATLAB gibi) zaten İngilizce, o yüzden sadece `description`
// dile göre değişiyor — translations.ts'teki `translate()` deseniyle
// aynı fikir: `projects[locale]`. Kart bir CV maddesi listesi gibi
// durmasın diye tek, vurucu bir özet cümlesi kullanıyoruz.
export const projects: Record<Locale, Project[]> = {
  tr: [
    {
      title: 'IT Solution Hub',
      tags: ['React', 'TypeScript', 'ASP.NET Core (C#)', 'SQL Server'],
      description:
        'React, TypeScript ve ASP.NET Core ile geliştirdiğim, çalışanların şirket içi BT çözümlerini talep edip takip edebildiği tam kapsamlı bir web uygulaması — rol tabanlı yetkilendirme ve otomatik test paketiyle.',
    },
    {
      title: 'GreenGrocer E-Commerce Management System',
      tags: ['Java', 'JavaFX', 'MySQL'],
      description:
        'Java, JavaFX ve MySQL ile geliştirdiğim masaüstü market yönetim sistemi — kullanıcı yetkilendirme, sepet/sipariş akışı, MVC/DAO mimarisi ve barkod tabanlı ürün takibiyle.',
    },
    {
      title: 'Flip-Flop Based RAM Design and Simulation',
      tags: ['MATLAB', 'Simulink'],
      description:
        "MATLAB Simulink'te tasarlayıp simüle ettiğim flip-flop tabanlı bir RAM mimarisi — bellek adresleme, kod çözücü ve çoklayıcı bileşenleriyle.",
    },
    {
      title: 'Data Structures & Algorithms',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      description:
        'C++ ile yaygın veri yapılarını (diziler, bağlı listeler, ağaçlar, graf algoritmaları) uygulayıp karmaşıklık analizi ve optimizasyon üzerine çalıştığım bir problem çözme koleksiyonu.',
    },
  ],
  en: [
    {
      title: 'IT Solution Hub',
      tags: ['React', 'TypeScript', 'ASP.NET Core (C#)', 'SQL Server'],
      description:
        'A full-stack web app built with React, TypeScript, and ASP.NET Core that lets employees request and track internal IT solutions, with role-based access and a fully automated test suite.',
    },
    {
      title: 'GreenGrocer E-Commerce Management System',
      tags: ['Java', 'JavaFX', 'MySQL'],
      description:
        'A desktop grocery management system built with Java, JavaFX, and MySQL — featuring user authorization, a full cart-to-order flow, an MVC/DAO architecture, and barcode-based product tracking.',
    },
    {
      title: 'Flip-Flop Based RAM Design and Simulation',
      tags: ['MATLAB', 'Simulink'],
      description:
        'A flip-flop-based RAM architecture designed and simulated in MATLAB Simulink, complete with memory addressing, decoder, and multiplexer components.',
    },
    {
      title: 'Data Structures & Algorithms',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      description:
        'A problem-solving collection implementing common data structures (arrays, linked lists, trees, graph algorithms) in C++, with a focus on complexity analysis and optimization.',
    },
  ],
}
