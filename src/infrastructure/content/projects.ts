import type { Locale } from '../../domain/entities/Locale'
import type { Project } from '../../domain/entities/Project'

// Gerçek proje verisi — güncel CV'den taşındı. Başlıklar ve etiketler
// (React, MATLAB gibi) zaten İngilizce, o yüzden sadece `highlights`
// dile göre değişiyor — translations.ts'teki `translate()` deseniyle
// aynı fikir: `projects[locale]`.
export const projects: Record<Locale, Project[]> = {
  tr: [
    {
      title: 'IT Solution Hub',
      tags: ['React', 'TypeScript', 'ASP.NET Core (C#)', 'SQL Server'],
      highlights: [
        'Çalışanların şirket içi BT çözümlerine göz atıp talep edebildiği ve takip edebildiği tam kapsamlı bir web uygulaması geliştirdim.',
        'Microsoft Entra ID ile giriş ve rol tabanlı erişim ekledim, böylece her kullanıcı sadece yetkili olduğu şeyleri görebiliyor.',
        'Geliştirme süresince otomatik testler yazdım ve tamamen geçen bir test paketi sürdürdüm.',
      ],
    },
    {
      title: 'GreenGrocer E-Commerce Management System',
      tags: ['Java', 'JavaFX', 'MySQL'],
      highlights: [
        'Java, JavaFX ve MySQL kullanarak masaüstü tabanlı bir market yönetim sistemi geliştirdim.',
        'Kullanıcı yetkilendirme, ürün yönetimi, alışveriş sepeti ve sipariş işleme özelliklerini hayata geçirdim.',
        'Uygulamayı MVC ve DAO tasarım desenleriyle tasarladım, veritabanı işlemleri için JDBC entegre ettim.',
        'Üçüncü parti Java kütüphaneleriyle PDF fatura ve barkod tabanlı ürün takibi oluşturdum.',
      ],
    },
    {
      title: 'Flip-Flop Based RAM Design and Simulation',
      tags: ['MATLAB', 'Simulink'],
      highlights: [
        'MATLAB Simulink kullanarak flip-flop tabanlı bir RAM mimarisi tasarlayıp simüle ettim.',
        'Bellek adresleme, kod çözücü (decoder), çoklayıcı (multiplexer) ve yedi parçalı gösterge bileşenlerini uyguladım.',
        'Simülasyon senaryolarıyla bellek okuma/yazma işlemlerini ve sistem işlevselliğini doğruladım.',
      ],
    },
    {
      title: 'Data Structures & Algorithms',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      highlights: [
        'C++ kullanarak algoritmik problemler çözdüm ve yaygın veri yapılarını uyguladım.',
        'Diziler, bağlı listeler, yığınlar, kuyruklar, ağaçlar ve graf algoritmalarıyla çalıştım.',
        'Karmaşıklık analizi ve optimizasyon teknikleriyle problem çözme becerilerimi geliştirdim.',
      ],
    },
  ],
  en: [
    {
      title: 'IT Solution Hub',
      tags: ['React', 'TypeScript', 'ASP.NET Core (C#)', 'SQL Server'],
      highlights: [
        'Built a full-featured web application that lets employees browse, request, and track internal IT solutions.',
        "Added Microsoft Entra ID login and role-based access control so each user only sees what they're authorized to.",
        'Wrote automated tests throughout development and maintained a fully passing test suite.',
      ],
    },
    {
      title: 'GreenGrocer E-Commerce Management System',
      tags: ['Java', 'JavaFX', 'MySQL'],
      highlights: [
        'Built a desktop-based grocery store management system using Java, JavaFX, and MySQL.',
        'Implemented user authorization, product management, shopping cart, and order processing features.',
        'Designed the application with the MVC and DAO patterns and integrated JDBC for database operations.',
        'Built PDF invoicing and barcode-based product tracking using third-party Java libraries.',
      ],
    },
    {
      title: 'Flip-Flop Based RAM Design and Simulation',
      tags: ['MATLAB', 'Simulink'],
      highlights: [
        'Designed and simulated a flip-flop-based RAM architecture using MATLAB Simulink.',
        'Implemented memory addressing, decoder, multiplexer, and seven-segment display components.',
        'Verified memory read/write operations and overall system functionality through simulation scenarios.',
      ],
    },
    {
      title: 'Data Structures & Algorithms',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      highlights: [
        'Solved algorithmic problems and implemented common data structures using C++.',
        'Worked with arrays, linked lists, stacks, queues, trees, and graph algorithms.',
        'Strengthened my problem-solving skills through complexity analysis and optimization techniques.',
      ],
    },
  ],
}
