# Portföy Projesi — Yeniden Mimarileme & Tasarım Soruları

Bu doküman, projeyi sıfırdan, katmanlı/temiz mimari mantığıyla yeniden kurarken
karar vermemiz gereken noktaları içeriyor. Cevaplarını sohbette yazman yeterli,
dosyayı elle doldurmana gerek yok — burada sadece soruları netleştirmek için tutuyoruz.

---

## 1. Şu an neredeyiz?

```
nur-portfolio/
├── index.html   (777 satır — tüm bölümler tek dosyada)
├── style.css    (2789 satır — tüm stiller tek dosyada)
├── script.js    (664 satır — tema, dil, terminal, dino oyunu, form... hepsi bir arada)
```

Bunun sorunu şu: **hiçbir katman ayrımı yok.**
- "Nur hakkında hangi bilgiler var" (veri/içerik) ile
- "bu bilgi ekranda nasıl görünüyor" (görünüm) ile
- "kullanıcı tema butonuna basınca ne olur" (davranış/etkileşim)

...hepsi aynı dosyalarda iç içe. Yeni bir proje eklemek istediğinde HTML içinde
elle yeni bir `<div>` bloğu kopyalayıp yapıştırman gerekiyor; bu hem hataya açık
hem de "kod nerede, içerik nerede" ayrımını imkansız kılıyor.

## 2. "Katmanlı / Temiz Mimari" burada ne anlama gelir?

Temiz Mimari (Clean Architecture) aslında büyük backend sistemleri için ortaya
çıkmış bir fikir, ama **prensibi** her yerde işe yarar: *"değişme sebebi farklı
olan şeyleri birbirinden ayır."* Senin bu portföy sitesinde katmanlar şöyle
karşılık bulur:

| Katman | Bu projede ne demek | Örnek |
|---|---|---|
| **Domain (Veri/İçerik)** | Sitenin *içeriği* — deneyimler, projeler, yetenekler | `content/experience.json`, `content/projects.json` |
| **Application (Uygulama Mantığı)** | Bu veriyi işleyen, dil/tema durumunu yöneten kod | `TerminalController`, `ThemeService`, `I18nService` |
| **Presentation (Görünüm)** | Veriyi HTML'e dönüştüren, kullanıcıya gösteren parçalar | `ProjectCard`, `TimelineItem` bileşenleri |
| **Infrastructure (Altyapı)** | Tarayıcı API'leri, localStorage, form gönderimi gibi dış dünya bağlantıları | `LocalStorageAdapter`, `FormspreeClient` |

Kural basit: **Domain hiçbir şeye bağımlı değildir** (saf veri/mantık),
**Presentation, Domain'e bakar ama tam tersi olmaz.** Böylece örneğin yarın
"projeler" verisini bir JSON dosyasından değil bir API'den çekmek istersen,
sadece Infrastructure katmanını değiştirirsin — Presentation hiç haberdar olmaz.

Bunu öğrenmen için gerçek faydası: yeni bir proje eklemek artık *kod yazmak*
değil, `projects.json`'a bir obje eklemek olacak. Kod bunu otomatik render edecek.

---

## 3. Teknoloji Seçimi (en kritik karar)

Şu an hiç build aracı yok (`npm` yok, framework yok). Katmanlı mimariyi
*gerçekten* hissedebilmen için üç seçenek var:

**A) Modern ama sade — Vite + Vanilla JS (TypeScript opsiyonel)** *(önerim)*
İçerik JSON dosyalarında, kod ES modüllerine bölünmüş, `npm run build` ile
GitHub Pages'e statik dosya olarak çıkıyor. Framework öğrenmene gerek kalmadan
"modül", "katman", "bağımlılık yönü" kavramlarını gerçek bir proje yapısında
öğrenirsin. Build adımı var ama küçük ve anlaşılır.

**B) Framework ile — React (veya Vue) + Vite**
Bileşen (component) mantığı, state yönetimi gibi endüstri standardı kavramları
da öğrenirsin. Daha fazla yeni kavram var ama iş ilanlarında en çok aranan bu.

**C) Hiç build aracı olmadan — Sade ES Modülleri**
`<script type="module">` ile dosyaları bölüp `import/export` kullanırız,
`npm` bile gerekmez. En basit yol ama modern tooling'i (bundler, ortam
değişkenleri, optimize build) hiç görmemiş olursun.

**Soru 1:** Bu üçünden hangisiyle ilerlemek istersin? Zaman ayırıp yeni bir
şey öğrenmeye açık mısın (React gibi), yoksa mevcut vanilla JS bilgini
derinleştirmeyi mi tercih edersin?

---

## 4. İçerik Yönetimi

**Soru 2:** Deneyim/eğitim/proje/yetenek verilerini JSON dosyaları halinde mi
tutalım (örn. `content/tr/projects.json`, `content/en/projects.json`), yoksa
tek dosyada TR/EN alanları birlikte mi olsun (örn. `{ "title": {"tr": "...", "en": "..."} }`)?
İkincisi çevirileri senkron tutmayı kolaylaştırır.

**Soru 3:** İleride bir proje eklerken/güncellerken kod bilmeyen biri
(örneğin sen, hızlıca) bunu yapabilmeli mi? Yoksa sorun değil, sen zaten
geliştirici olarak JSON düzenlersin?

---

## 5. Tasarım Yönü

Şu anki tasarımı beğenmediğini söyledin. Bunu netleştirelim:

**Soru 4:** Şu anki **IDE/terminal temalı** konsepti (dosya sekmeleri, terminal
penceresi, `.ts`/`.json` uzantılı nav linkleri, dino oyunu easter egg) korumak
mı istiyorsun yoksa **tamamen farklı bir görsel yön** mü istiyorsun (örn. daha
minimal/editorial, daha "sanatsal" bir portföy, glassmorphism, vs.)?

**Soru 5:** Beğenmediğin şey spesifik olarak ne? (Birden fazla seçebilirsin)
- Renk paleti / kontrast
- Layout / boşluk kullanımı (spacing)
- Hero bölümünün mevcut "yüzen daire" tasarımı
- Genel "IDE" teması fikrinin kendisi
- Tipografi
- Animasyonlar (çok fazla / çok az / tarzı)
- Mobil görünüm

**Soru 6:** Beğendiğin, ilham aldığın bir site/portföy var mı? (Bir link
verirsen incelerim.)

---

## 6. Özellik Kapsamı

**Soru 7:** Şu anki özelliklerden hangilerini **kesinlikle korumak**
istersin, hangilerini **çıkarabiliriz**?
- Dark/Light tema
- TR/EN dil değişimi
- İnteraktif terminal (komut satırı simülasyonu)
- Gizli dino oyunu (`hack` komutu)
- Aurora arka plan animasyonu
- Proje sekmeleri (tab) yapısı

**Soru 8:** İletişim formu şu an `formspree.io/f/your-form-id` gibi
**gerçek olmayan bir adrese** gidiyor — yani şu haliyle çalışmıyor. Gerçek bir
Formspree hesabın var mı, yoksa EmailJS gibi başka bir servis mi tercih edersin?

---

## 7. Test & Kalite (Temiz Mimarinin asıl faydası)

Temiz mimarinin en büyük kazancı **test edilebilirlik**. Örn. "dil değiştirince
doğru metin geliyor mu" gibi şeyleri elle tıklayıp kontrol etmek yerine otomatik
testle doğrulayabiliriz.

**Soru 9:** Bu projede otomatik testler (unit test) yazmayı da öğrenmek ister
misin, yoksa şimdilik mimari + tasarıma odaklanıp testi sonraya mı bırakalım?

---

## 8. Süreç Tercihi

**Soru 10:** Nasıl ilerleyelim?
- **A)** Küçük adımlarla: her katmanı/özelliği tek tek kurup sana gösteririm,
  her adımda "neden böyle yaptım" diye anlatırım, onaylarsan devam ederiz.
- **B)** Önce iskeleti (klasör yapısı + boş katmanlar) kurup mimariyi anlatırım,
  sonra içini birlikte dolduruz.
- **C)** Ben büyük bir taslağı tek seferde kurayım, sonra baştan sona
  birlikte gezip her parçayı açıklayayım.

---

### Nasıl cevaplayacaksın?

Hepsini tek tek yazman gerekmiyor — istersen madde numarasıyla kısa kısa
("1: A, 2: ikinci seçenek, 4: tamamen farklı yön istiyorum...") cevaplayabilirsin.
Emin olmadığın yerlerde benim önerimi sorabilirsin, birlikte karar veririz.
