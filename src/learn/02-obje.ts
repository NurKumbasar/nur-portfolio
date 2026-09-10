// DERS 2 — Obje (Nesne)
//
// Obje = ilişkili bilgileri tek bir kutuda tutmak.
//
//   const kisi = {
//     isim: 'Nur',
//     yas: 20,
//   }
//
// İçindeki bir bilgiye ulaşmak için nokta (.) kullanılır: kisi.isim

// TODO 1: Aşağıya `proje` adında bir obje oluştur. İçinde şu 2 alan olsun:
// - baslik: 'GreenGrocer' (string)
// - dil: 'Java' (string)
//
export const proje = {
  baslik: 'GreenGrocer',
  dil: 'Java',
}


// TODO 2: `projeyiTanit` adında bir fonksiyon yaz. Parametre olarak
// yukarıdaki gibi bir obje alsın ({ baslik: string; dil: string })
// ve şu formatta bir cümle döndürsün:
// "GreenGrocer projesi Java ile yazıldı."
//
export function projeyiTanit(proje: { baslik: string; dil: string }): string {
  return `${proje.baslik} projesi ${proje.dil} ile yazıldı.`
}
