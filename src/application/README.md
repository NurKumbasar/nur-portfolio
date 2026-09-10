# Application Katmanı

Bu katman "kullanım senaryolarını" (use case) içerir — yani **kullanıcı bir
şey yaptığında ne olması gerektiğini** tarif eder, ama bunu *nasıl* yapacağını
bilmez.

Örnek: "Temayı değiştir" bir use case'dir. Bu use case şunu bilir: "mevcut
tema koyu ise açığa çevir, sonucu bir yere kaydet." Ama "bir yere kaydet"
derken localStorage mı, cookie mi, bir API mi kullanılacağını **bilmez** —
bunu `domain/ports` içindeki bir arayüz üzerinden `infrastructure` katmanına
devreder.

## Bağımlılık Kuralı

Bu katman sadece `domain` katmanını import edebilir (entity'ler ve port
arayüzleri için). `infrastructure` veya `presentation` katmanlarını
**asla import etmez.** React'e bağımlılık burada minimum tutulur (sadece
state paylaşımı için context/hook yazarken kullanılır).

## Alt klasörler

- `useCases/` — Saf fonksiyonlar/sınıflar: `getFeaturedProjects()`,
  `sendContactMessage()`, `toggleTheme()` gibi. Bağımlılıkları (port'ları)
  parametre olarak alırlar — bu sayede test yazarken sahte (mock) bir
  implementasyon verip gerçek localStorage/API'ye dokunmadan test edebiliriz.
- `state/` — Bu use case'leri React dünyasına bağlayan Context/hook'lar
  (`ThemeProvider`, `useLanguage()` gibi).
