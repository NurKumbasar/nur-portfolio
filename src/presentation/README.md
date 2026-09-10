# Presentation Katmanı

Burası kullanıcının gördüğü her şey: React bileşenleri, sayfa düzenleri,
görsel stiller. "Nur hakkında bilgi *nasıl görünür*" sorusunun cevabı burada.

## Bağımlılık Kuralı

Bu katman `application` katmanındaki hook/use-case'leri ve `domain`
katmanındaki tipleri import edebilir. **`infrastructure` katmanını asla
doğrudan import etmez** — yani bir bileşen içinde `localStorage.getItem(...)`
veya `fetch('...')` görürsen bu bir mimari ihlalidir; onun yerine
`application` katmanındaki bir hook'u çağırmalıdır.

Somut implementasyonlar (`infrastructure`), uygulamanın en tepesinde
("composition root" — bizim projede `src/main.tsx`) `application` katmanına
enjekte edilir. Presentation bunların hangi somut sınıf olduğunu hiç bilmez.

## Alt klasörler

- `components/` — Yeniden kullanılabilir küçük parçalar: `ProjectCard`,
  `ThemeToggle`, `TimelineItem` gibi.
- `layouts/` — Sayfa iskeletleri: `Navbar`, `Footer`, bölüm sarmalayıcılar.
- `styles/` — Tasarım token'ları (renk, boşluk, tipografi) ve global stiller.
