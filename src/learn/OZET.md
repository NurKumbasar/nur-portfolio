# Özet / Hatırlatma Notları

Unuttukça buraya bak. Her derste yeni kural eklenecek.

## Test nasıl çalıştırılır?

Terminalde:
```
npx vitest run src/learn
```
- **PASS / yeşil** → doğru yapmışsın
- **FAIL / kırmızı** → çıktıdaki `Expected` (olması gereken) ile `Received`
  (gerçekte çıkan) satırlarını karşılaştır, farkı bul

## Ders 1 — Değişken ve Fonksiyon

- Fonksiyon tanımı: `export function ad(parametre: tip): dönüşTipi { ... }`
  - C#: `string Ad(tip parametre) { ... }`
  - Fark: TS'te tip isimden SONRA, `:` ile yazılır (`isim: string`)
- `const` = bir kere değer verilir, bir daha **değiştirilemez**
  `let` = sonradan değiştirilebilir (bugüne kadar hiç kullanmadık)
- Template string: değişkeni metnin içine gömmek için **backtick** (`` ` ``)
  kullanılır, tek/çift tırnak (`'` `"`) İÇİNDE `${}` ÇALIŞMAZ.
  ```ts
  `Merhaba ${isim}`   // ✅ çalışır
  'Merhaba ${isim}'   // ❌ olduğu gibi yazı olarak kalır
  ```
  C#'taki karşılığı: `$"Merhaba {isim}"`
- `export` = bu fonksiyonu başka dosyalar da kullanabilsin demek
  (C#'taki `public`'e yakın ama dosya bazlı çalışır)
- Bu projede noktalı virgül (`;`) kullanmıyoruz — zorunlu değil, bir stil tercihi

## Backtick nasıl yazılır (Mac)

Klavye kombinasyonuna güvenme, gerekirse şu karakteri kopyala-yapıştır yap: `` ` ``

## Ders 2 — Obje (Nesne)

- Obje = ilişkili bilgileri tek kutuda tutmak: `const kisi = { isim: 'Nur', yas: 20 }`
- İçindeki bir alana ulaşmak için **nokta (`.`)** kullanılır: `kisi.isim`
  - Alan adını tek başına yazmak (`isim` yerine sadece `isim`) çalışmaz,
    "ReferenceError: isim is not defined" hatası alırsın — mutlaka
    `objeAdi.alanAdi` şeklinde yazılmalı.
- Bir fonksiyon parametresi obje ise, tipi de obje şeklinde tarif edilir:
  `(proje: { baslik: string; dil: string })` → "içinde baslik ve dil adında
  string alanlar olan bir obje"
  - Buradaki `;` kod satırı değil, tip tarifi içinde alan ayıracı — bizim
    ";" kullanmama kuralımızla çelişmez, farklı bağlam.
- Bu obje şeklini her seferinde elle yazmak yerine isim verip tekrar
  kullanmanın yolu: `type` (Ders 3'te göreceğiz)
- **Tip çıkarımı:** `const x = değer` yazınca TypeScript tipi değere bakıp
  kendi anlar, yazmana gerek yok. Ama fonksiyon parametresinde henüz değer
  yok (çağrılana kadar belli olmuyor) — o yüzden parametrede tipi SEN
  yazmak zorundasın. (C#'taki `var x = 5;` ile aynı fikir.)
  VS Code'da bir değişkenin üzerine gelip bekleyince tahmin edilen tipi
  gösterir — kontrol etmek için kullanışlı.

## Ders 3 — `type` ile obje şekline isim vermek

- `type Proje = { baslik: string; dil: string }` — obje şekline isim ver
- `type` isimleri BÜYÜK harfle başlar (Proje, Kisi) — parametre/değişken
  isimleri ise küçük harfle başlar (proje, kisi). İkisini birbirine
  KARIŞTIRMA — biri tip adı, biri değer adı, ayrı şeyler.
- `type` çalışma zamanında (runtime) yok olur, sadece yazarken TypeScript'e
  yardımcı olur.
- **Tehlikeli hata:** `function f(Proje)` yazarsan parametrenin ADI `Proje`
  olur (tip değil!). Fonksiyon içinde küçük harfle `proje` yazarsan, o isim
  parametreyle ilgisi olmayan, dosyanın başka bir yerindeki `proje`
  değişkenine bağlanabilir (buna "scope/kapsam" karışıklığı denir). Kontrol
  et: parametrenin adı her zaman küçük harfle, `:` ile ayrılmış tipi büyük
  harfle olmalı → `proje: Proje`.

## Ders 4 — Array (Liste)

- `const projeler: Proje[] = [ {...}, {...} ]` — `Proje[]` = "Proje tipinde
  objelerden oluşan liste" (C#'taki `List<Proje>` ile aynı fikir)
- `projeler[0]` → ilk eleman (index 0'dan başlar), `projeler.length` → eleman sayısı
- `for (const p of projeler) { ... }` → C#'taki `foreach` ile birebir aynı
- `.push(deger)` → listeye yeni eleman ekler (C#'taki `List<T>.Add()`)

## Ders 5 — Component

- Component = ekranda bir şey gösteren fonksiyon; `string`/`number` yerine
  **JSX** döndürür: `<h1>Merhaba</h1>` (tırnak YOK, bu bir string değil)
- **Component isimleri BÜYÜK harfle başlamalı** (`Baslik`, `ProjectCard`).
  Küçük harfle başlarsa React onu normal HTML etiketi sanır.
- Kullanmak (ekranda göstermek) için: `<Baslik />` gibi çağrılır.
  Tanımlamak yetmez — kullanılmayan component ekranda GÖRÜNMEZ.

## Ders 6 — Props (component'e veri gönderme)

- Component her zaman TEK parametre alır: bir obje, adı genelde `props`.
  `function Kart(props: { baslik: string }) { ... }`
- Kullanımı: `<Kart baslik="GreenGrocer" />` → component içinde `props.baslik` "GreenGrocer" olur.
- **EN SIK UNUTULAN KURAL:** JSX içinde bir değişkeni/ifadeyi yazdırmak için
  **süslü parantez `{}`** ZORUNLU:
  ```tsx
  <h3>{props.baslik}</h3>   // ✅ doğru — değeri basar
  <h3>props.baslik</h3>     // ❌ yanlış — "props.baslik" diye DÜZ YAZI basar
  ```
  Template string'deki `${}` ile aynı fikir, ama JSX'te backtick yok, direkt `{}`.
- `return`'den hemen sonra `{` YAZMA — o obje döndürmek sanılır. Çok satırlı
  JSX için `return ( ... )` kullan (normal parantez, süslü değil).

## Ders 7 — `.map()` ile liste render etme

- Ok fonksiyonu (arrow function): `(x) => x * 2` — `function` ile aynı şey,
  kısa yazım. `.map()` ile hep bu tarz kullanılır.
- `.map()` = Ders 4'teki `for...of` + `.push()`'un kısayolu:
  `projeler.map((p) => p.baslik)` → her `p` için `p.baslik`'i al, yeni liste yap
- JSX içinde component listesi üretmek:
  ```tsx
  {projeler.map((p) => (
    <Kart key={p.baslik} baslik={p.baslik} dil={p.dil} />
  ))}
  ```
- **Dikkat — isim tutarlılığı:** `.map((p) => ...)` dersen, parantez içinde
  HEP `p` kullanmalısın. `.map((p) => ...)` yazıp içeride `tag` ya da başka
  bir isim kullanırsan "is not defined" hatası alırsın — ok fonksiyonuna
  verdiğin isim ne ise, gövdede de HEP o isim kullanılır.
- `key={...}` React'in zorunlu kuralı — listedeki her elemana benzersiz bir
  değer ver (genelde elindeki benzersiz bir alanı kullan, örn. `p.baslik`).

## Büyük resim: TS/JS/C#/Tarayıcı ilişkisi

```
Sen yazıyorsun (TypeScript + React)
        ↓  Vite bunu çevirir
Tarayıcının anladığı şey (düz JavaScript)
        ↓
Kullanıcı ekranında site görünür
```
- Tarayıcı SADECE HTML/CSS/JavaScript anlar. C# ve TypeScript'i hiç tanımaz.
- TypeScript = "JavaScript + tip kontrolü". Yazarken hata yakalamamıza yarar,
  ama tarayıcıya gitmeden önce Vite onu düz JavaScript'e çevirir (tipler silinir).
- React = fonksiyonları ekran parçası ("component") olarak kullanmamızı
  sağlayan hazır bir kütüphane. (Detayına daha gelmedik.)
