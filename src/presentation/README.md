# Presentation Katmanı

Burası kullanıcının gördüğü her şey: React bileşenleri, sayfa düzenleri,
görsel stiller. "Nur hakkında bilgi *nasıl görünür*" sorusunun cevabı burada.

## Bağımlılık Kuralı

Bu katman `application` katmanındaki hook/use-case'leri ve `domain`
katmanındaki tipleri import edebilir. **`infrastructure` katmanını asla
doğrudan import etmez** — yani bir bileşen içinde `localStorage.getItem(...)`,
`fetch('...')` ya da `infrastructure/content/...` import'u görürsen bu bir
mimari ihlalidir. İçerik için `useContent()`, tema/dil için `useTheme()` /
`useLocale()`, sohbet için `useMascotChat()` gibi `application` hook'larını
kullan. Bu kural `src/test/architecture.test.ts` ile otomatik denetlenir.

Somut implementasyonlar (`infrastructure`), uygulamanın en tepesinde
("composition root" — `src/main.tsx`) `application` katmanına enjekte edilir.
Presentation bunların hangi somut sınıf olduğunu hiç bilmez.

## Alt klasörler

- `components/` — Bölümler ve yeniden kullanılabilir küçük parçalar:
  `Hero`, `ProjectsSection`, `ProjectCard`, `Navbar`, `Mascot` gibi.
- `i18n/` — Arayüz metinlerinin TR/EN karşılıkları (`translate()`).
- `styles/` — Tasarım token'ları (renk, boşluk, tipografi) ve global stiller.
