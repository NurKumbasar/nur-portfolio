# Nerede Kaldık?

Kayboldukça buraya bak — o an tam olarak hangi aşamada olduğumuzu gösterir.

## Genel yol haritası

1. ✅ Değişken & fonksiyon (`01-degisken-ve-fonksiyon.ts`)
2. ✅ Obje / nesne (`02-obje.ts`)
3. ✅ `type` ile obje şekline isim vermek (`03-type.ts`)
4. ✅ Array / liste (`04-array.ts`)
5. ✅ Component nedir (`05-component.tsx`)
6. ✅ Component'e veri gönderme (props) (`06-props.tsx`)
7. ✅ Bir listeyi component listesine çevirmek (`.map()`) (`07-liste-render.tsx`)
8. ⬜ Kullanıcı etkileşimi ve değişen veri ("state", tıklama vb.) —
   gerçek projeye dönünce, ThemeToggle kodunu tekrar okurken göreceğiz
9. ✅ Gerçek projeye geçiş: Projeler bölümü (Project entity + veri +
   ProjectCard + ProjectsSection)
10. ✅ Aynı desen tekrarı: Deneyim bölümü (Experience entity + veri +
    ExperienceCard + ExperienceSection) — pekiştirme
11. ✅ Aynı desen tekrarı: Eğitim bölümü (Education entity + veri +
    EducationCard + EducationSection) — bu sefer neredeyse hiç hata yapmadan
12. ✅ Yetenekler (Skills) bölümü — SkillCategory entity + veri +
    SkillCard + SkillsSection
13. ✅ Görsel tasarım (glassmorphism): tasarım token'ları, Aurora arka plan,
    cam kart stili — son karar: siyah-beyaz minimal (renkli aksan yok)
14. ✅ CV güncellemesi: 4 deneyim (KoçSistem eklendi), 4 proje (IT Solution
    Hub eklendi), güncel yetenekler, Diller bölümü eklendi
15. ✅ İletişim formu (ContactMessage entity, MessageSender port,
    Formspree adaptörü, useContactForm hook — useState/controlled
    input/async öğrenildi) — gerçek e-postayla test edildi, çalışıyor
16. ✅ TR/EN dil desteği (altyapı + arayüz metinleri): Locale entity,
    LocaleStore/LocaleContext (ThemeContext ile aynı desen), çeviri
    sözlüğü (`presentation/i18n/translations.ts`), LanguageToggle butonu.
    İçerik metinleri (deneyim/proje/yetenek) şimdilik Türkçe.
17. ✅ Hero bölümü: Profile entity, avatar, kısa tanıtım, CV indirme
    butonu, GitHub/LinkedIn/E-posta ikonları (SVG, emoji değil)
18. ✅ Navbar: sabit (sticky) üst menü, bölümlere kaydıran linkler,
    tema/dil butonları buraya taşındı
19. ✅ Görsel cila: kart hover efektleri (yukarı kalkma + gölge), buton/
    tag/ikon hover'ları, sayfa açılışında fade-in-up animasyonu, Yetenekler/
    Projeler/Diller bölümleri 2 sütunlu grid, aurora rengi temaya göre
    (koyu: beyaz parıltı, açık: koyu gölge) + daha görünür opaklık
20. ✅ Scroll animasyonu: `useScrollReveal` hook'u (IntersectionObserver ile
    bir elemanın ekrana girdiğini anlama) + `Reveal` bileşeni — her bölüm artık
    sayfa açılışında değil, kaydırılıp ekrana girdiğinde beliriyor
21. ✅ Klasik portfolyodan ayrışma (1. deneme): Deneyim + Eğitim tek bir
    "Yolculuğum" zaman çizgisinde birleşti — sonra "çok sıradan" bulundu
22. ⚠️ Klasik portfolyodan ayrışma (2. deneme): yol ortada, kartlar sağa/
    sola dağılıyordu — SVG boyu düzgün uzamadı + uzun metinli kartlarda
    boşluk kötü durdu, "berbat" bulundu
23. ✅ Klasik portfolyodan ayrışma (3. deneme, kalıcı): tek sütun, yol
    solda dar bir şerit olarak dalgalanıyor (`<pattern>` ile tekrar eden S
    eğrisi, SVG'yi tam boyda uzatmak için aradaki sarmalayıcı <div> hilesi)
24. ⬜ **Sıradaki:** Deploy (GitHub Pages) — kullanıcıyla karar verilecek

## Şu ana kadar gerçekten bildiklerin (moralin bozulunca buraya bak)

- Fonksiyon yazmak (isim, parametre, parametre tipi, dönüş tipi)
- `const` ile değişken tanımlamak
- Template string (backtick, `${}`)
- `export` ile dışarı açmak
- Obje oluşturmak, nokta (`.`) ile içine erişmek
- `type` ile obje şekline isim vermek
- Tip çıkarımı (bazen tip yazmaya gerek kalmaması)
- Array: oluşturma, `.length`, `for...of`, `.push`
- Test çıktısını okuyup (`Expected`/`Received`) hatayı bulma

Kimse "önce tüm JavaScript'i öğreneyim sonra proje yapayım" demez —
biz de sadece bu proje için gereken parçaları, gerektikçe öğreniyoruz.
Bu normal ve doğru bir yöntem, eksiklik değil.

## Şu ana kadar NEDEN TypeScript sorusunun kısa cevabı

TypeScript = yazım/tip hatalarını kod çalışmadan önce gösteren bir
JavaScript türü. Tarayıcı sadece JavaScript anlar, biz TypeScript yazıp
otomatik JavaScript'e çeviriyoruz — aradaki fark sadece "hata daha erken
görünüyor" ekstra güvenliği.

## Diğer detaylı notlar

Kural/sözdizimi hatırlatmaları için: `OZET.md` dosyasına bak (aynı klasörde).
