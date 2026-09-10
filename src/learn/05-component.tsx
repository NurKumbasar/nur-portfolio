// DERS 5 — Component (React'in temel yapı taşı)
//
// Component = ekranda bir şey gösteren fonksiyon. Normal bir fonksiyon
// gibi yazılır, ama bir değer (string, number) yerine JSX denen HTML
// benzeri bir yapı döndürür.
//
// En basit component:
//
export function Baslik() {
  return <h1>Nur Kumbasar</h1>
}
//
// `<h1>Merhaba!</h1>` bir string DEĞİL (tırnak yok) — buna JSX denir,
// HTML'e benziyor ama aslında JavaScript'in içine gömülmüş özel bir
// sözdizimi. Vite bunu arkada düz JavaScript'e çevirir, tarayıcı onu
// öyle anlar.
//
// ÖNEMLİ KURAL: Component isimleri BÜYÜK harfle başlamak ZORUNDA
// (Selam, Baslik gibi). Küçük harfle başlarsan React onu senin
// component'in değil, normal bir HTML etiketi (<div> gibi) sanır.

// TODO: `Baslik` adında bir component yaz. Tek satırda
// <h1>Nur Kumbasar</h1> döndürsün.
//
// export function Baslik() {
//   return ...
// }
