# Domain Katmanı

Bu katman sitenin **saf içerik ve iş kurallarını** içerir: "bir proje nedir",
"bir deneyim kaydında hangi alanlar olur" gibi tanımlar.

## Bağımlılık Kuralı

**Bu klasördeki hiçbir dosya, başka hiçbir katmanı import edemez.**
Ne React'i, ne Vite'ı, ne localStorage'ı, ne de `infrastructure`/`application`/
`presentation` klasörlerini. Sadece TypeScript'in kendisi.

Neden? Çünkü yarın React'ten Vue'ya geçsen bile "bir Proje'nin başlığı ve
açıklaması vardır" gerçeği değişmez. Bu katman en dayanıklı, en az değişen
katmandır — bu yüzden hiçbir şeye bağımlı olmamalı.

## Alt klasörler

- `entities/` — Veri şekilleri (TypeScript `interface`/`type`): `Project`,
  `Experience`, `SkillCategory` gibi.
- `ports/` — "Sözleşmeler" (interface). Örn: `ContentRepository` arayüzü
  "projeleri nasıl getireceğini" söylemez, sadece "projeleri getirebilen bir
  şey olmalı" der. Gerçek implementasyonu (JSON'dan mı, API'den mi okuyacağı)
  `infrastructure` katmanında yazılır.
