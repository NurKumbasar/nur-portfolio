# Kullandığımız Teknolojiler — Kim Ne İş Yapıyor?

Her birinin TEK cümlelik görevi:

| Teknoloji | Görevi |
|---|---|
| **HTML** | Sayfanın iskeleti — başlık, buton, resim nerede duruyor |
| **CSS** | Görünüm — renk, boşluk, yazı tipi, hizalama |
| **JavaScript (JS)** | Davranış/etkileşim. Tarayıcının anladığı TEK programlama dili |
| **TypeScript (TS)** | JS + hata/tip denetimi. Yazarken kontrol eder, sonra düz JS'e çevrilir |
| **React** | Arayüzü küçük, tekrar kullanılabilir parçalara ("component") bölen hazır kütüphane |
| **Node.js** | JS/TS'i tarayıcı DIŞINDA, bilgisayarında çalıştırabilmeni sağlar |
| **npm** | Başkalarının yazdığı hazır kodu projene indiren paket yöneticisi |
| **Vite** | Geliştirirken önizleme sunucusu + TS/React'i düz JS'e çeviren araç |
| **Vitest** | `.test.ts` dosyalarını çalıştırıp PASS/FAIL gösteren test aracı |

Her biri tek bir işten sorumlu, birbirinin işine karışmıyor — bir ekip gibi.

## Bizim akışımız

```
Sen yazıyorsun (TypeScript + React)
        ↓  Vite çevirir
Düz JavaScript
        ↓
Tarayıcı çalıştırır → ekranda site görünür
```

Vitest bunun tamamen dışında, ayrı bir kanalda — sadece yazdığın
fonksiyonların doğru çalışıp çalışmadığını kontrol ediyor, siteyle
doğrudan ilgisi yok.

## Peki C# / .NET nerede?

**Bu projede hiçbir yerde yok.** Tarayıcı sadece HTML/CSS/JS anlıyor,
C# web sitesi için kullanılamaz — C# masaüstü programı, oyun (Unity) ya
da sunucu tarafı (backend) yazmak için kullanılır.

Okulda C# öğrenmen ile burada TypeScript öğrenmen **iki ayrı amaç**:
okul genel programlama mantığını öğretiyor, biz web sitesi zorunluluğu
yüzünden TS/JS kullanıyoruz. Öğrendiğin mantık (değişken, fonksiyon,
obje/class) ikisinde de aynı, sadece "lehçe" farklı.

İleride bu siteye gerçek bir backend (kendi sunucun, yönetim paneli vb.)
eklemek istersen, orada C#/.NET kullanılabilir — React (ön yüz) + .NET
(arka yüz) endüstride çok yaygın bir ikili. Şimdilik böyle bir ihtiyaç yok.

## Bu projenin backend'i var mı?

**Hayır.** Bu bir "statik site" — sadece düz HTML/CSS/JS dosyaları GitHub
Pages'te duruyor, arkada sürekli çalışan bir sunucu programı yok.

**Tek istisna: iletişim formu.** Form verisi, bizim yazdığımız bir
backend'e değil, hazır bir üçüncü parti servise (**Formspree**) gidiyor.
Kendi sunucumuzu kurmadan hazır bir backend'i "kiralamış" oluyoruz — kişisel
portföy siteleri için tamamen normal bir yöntem. Bu bağlantıyı kuran kod,
mimarideki `infrastructure/messaging/` klasörüne gidecek.
