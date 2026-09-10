// DERS 1 — Değişken ve Fonksiyon
//
// C#'ta muhtemelen şöyle bir şey yazacaksın:
//
//   string Selamla(string isim, int yas)
//   {
//       string cumle = $"Merhaba, ben {isim}! {yas} yaşındayım.";
//       return cumle;
//   }
//
// TypeScript'te aynı fikir, sadece yazım şekli farklı:
// - `string isim` yerine `isim: string` (isim önce, tip sonra)
// - C#'taki `$"...{isim}..."` yerine TypeScript'te backtick (`) ile
//   `` `...${isim}...` `` yazılır — MANTIK BİREBİR AYNI, sadece
//   $"" yerine `` kullanılıyor, {} yerine de ${} kullanılıyor.
// - `string cumle = ...;` yerine `const cumle = ...`
//   (const = "bu değişken bir daha değişmeyecek" demek, C#'taki normal
//   değişken tanımlamaya çok yakın ama sonradan değiştirilemez)

export function selamla(isim: string, yas: number): string {
  const cumle = `Merhaba, ben ${isim}! ${yas} yaşındayım.`
  return cumle
}
