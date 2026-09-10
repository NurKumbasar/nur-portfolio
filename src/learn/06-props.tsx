// DERS 6 — Component'e veri gönderme (Props)
//
// Şu ana kadarki component'lerimiz hep aynı şeyi gösteriyordu. Ama
// normalde bir component'i FARKLI verilerle birden fazla yerde
// kullanmak isteriz — mesela her proje için ayrı bir kart, ama hepsi
// aynı component.
//
// Bunun için component'e PARAMETRE geçeriz — buna React'te "props" denir.
// Mantık, Ders 1'deki fonksiyon parametresiyle AYNI, sadece 2 yeni kural:
//
// 1) Bir component her zaman TEK bir parametre alır: bir obje (adı
//    genelde `props`), içinde tüm veriler bir arada durur.
// 2) JSX içinde bir değişkeni yazdırmak için SÜSLÜ PARANTEZ {} kullanılır
//    (template string'deki ${} ile aynı fikir, ama JSX'te backtick yok,
//    direkt {} kullanılır).
//
// Örnek:
//
//   function Selamla(props: { isim: string }) {
//     return <p>Merhaba, {props.isim}!</p>
//   }
//
// Kullanımı (component'i çağırırken, HTML etiketi gibi "attribute" verilir):
//
//   <Selamla isim="Nur" />
//
// `isim="Nur"` yazınca, component'in içinde `props.isim` "Nur" olur.

// TODO: `Kart` adında bir component yaz. `{ baslik: string; dil: string }`
// tipinde bir props alsın, şunu döndürsün:
//
//   <div>
//     <h3>{props.baslik}</h3>
//     <p>{props.dil}</p>
//   </div>
//
export function Kart(props: { baslik: string; dil: string }) {
  return (
    <div>
      <h3>{props.baslik}</h3>
      <p>{props.dil}</p>
    </div>
  )
}
