# Infrastructure Katmanı

Bu katman **dış dünyayla** konuşan koddur: tarayıcı API'leri (`localStorage`),
dosya/JSON okuma, form gönderim servisleri (Formspree) gibi somut, "kirli"
detaylar burada yaşar.

Buradaki her dosya, `domain/ports` içinde tanımlanmış bir arayüzü
**gerçeklemek (implement)** için vardır. Örneğin `domain/ports/ContentRepository.ts`
bir arayüz tanımlar, `infrastructure/content/JsonContentRepository.ts` ise
bu arayüzü JSON dosyalarını okuyarak gerçekler.

## Bağımlılık Kuralı

Bu katman `domain` katmanındaki arayüzleri import edebilir (onları
gerçeklemek için). `application` veya `presentation` katmanlarını import
**etmez** — çünkü bu katmanın işi "nasıl yapılır"ı bilmek, "ne zaman
çağrılır"ı bilmek değil.

## Alt klasörler

- `content/` — Site içeriğini (projeler, deneyimler, yetenekler) JSON'dan
  okuyup `domain/entities` şekline dönüştüren kod.
- `storage/` — `localStorage` ile tema/dil tercihini saklayan adaptörler.
- `messaging/` — İletişim formunu Formspree'ye (veya seçtiğimiz servise)
  gönderen adaptör.

## Neden bu ayrım işe yarar?

Yarın "JSON yerine bir CMS'ten içerik çekelim" dersen, sadece `content/`
klasöründeki dosyayı değiştirirsin. `domain` ve `presentation` katmanları
tek satır bile değişmez — çünkü onlar hep aynı arayüzle (port) konuştu.
