# Infrastructure Katmanı

Bu katman **dış dünyayla** konuşan koddur: tarayıcı API'leri (`localStorage`),
dosya/JSON okuma, form gönderim servisleri (Formspree) gibi somut, "kirli"
detaylar burada yaşar.

Buradaki her dosya, `domain/ports` içinde tanımlanmış bir arayüzü
**gerçeklemek (implement)** için vardır. Örneğin `domain/ports/ContentRepository.ts`
bir arayüz tanımlar, `infrastructure/content/staticContentRepository.ts` ise
bu arayüzü bu klasördeki TypeScript içerik dosyalarını okuyarak gerçekler.

## Bağımlılık Kuralı

Bu katman `domain` katmanındaki arayüzleri import edebilir (onları
gerçeklemek için). `application` veya `presentation` katmanlarını import
**etmez** — çünkü bu katmanın işi "nasıl yapılır"ı bilmek, "ne zaman
çağrılır"ı bilmek değil.

## Alt klasörler

- `content/` — Site içeriği (projeler, deneyimler, yetenekler; TR/EN) ve
  bunu `ContentRepository` arayüzü olarak sunan `staticContentRepository`.
- `chat/` — Maskot sohbeti için `ChatService`'i gerçekleyen, sitenin
  `/api/chat` sunucu fonksiyonuna istek atan adaptör.
- `storage/` — `localStorage` ile tema/dil tercihini saklayan adaptörler.
- `messaging/` — İletişim formunu Formspree'ye (veya seçtiğimiz servise)
  gönderen adaptör.

## Neden bu ayrım işe yarar?

Yarın "JSON yerine bir CMS'ten içerik çekelim" dersen, sadece `content/`
klasöründeki dosyayı değiştirirsin. `domain` ve `presentation` katmanları
tek satır bile değişmez — çünkü onlar hep aynı arayüzle (port) konuştu.
