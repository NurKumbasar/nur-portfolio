// DERS 3 — `type` ile obje şekline isim vermek
//
// Ders 2'de şunu yazmıştık:
//   function projeyiTanit(proje: { baslik: string; dil: string }): string
//
// Bu şekli (baslik + dil) tekrar tekrar yazmak yerine bir isim veriyoruz:
//
type Proje = {
  baslik: string
  dil: string
}
//
// Sonra nerede `{ baslik: string; dil: string }` yazacaksan, onun yerine
// sadece `Proje` yazarsın.
//
// `type` isimleri BÜYÜK harfle başlar (Proje, Kisi gibi) — C#'taki class
// isimlendirme kuralıyla (PascalCase) aynı.
//
// ÖNEMLİ: `type` çalışma zamanında (runtime) hiçbir karşılığı yoktur —
// Vite, kodu JavaScript'e çevirirken `type` satırlarını tamamen siler.
// Yani bu tamamen ücretsiz bir güvenlik katmanı.

// TODO 1: Aşağıya `Proje` adında bir type tanımla. baslik ve dil
// alanları olsun (ikisi de string).


// TODO 2: `proje` objesini oluştur, tipini açıkça `Proje` olarak belirt:
export const proje: Proje = { 
  baslik: 'GreenGrocer', 
  dil: 'Java' 
}


// TODO 3: `projeyiTanit` fonksiyonunu yaz — parametre tipi olarak
// `{ baslik: string; dil: string }` yerine artık sadece `Proje` kullan.
export function projeyiTanit(proje: Proje): string {
  return `${proje.baslik} projesi ${proje.dil} ile yazıldı.`
}
