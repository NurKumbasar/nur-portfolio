// DERS 4 — Array (Liste)
//
// Proje tipinde birden fazla proje bir arada tutulacaksa, Array kullanılır:
//
export const projeler: Proje[] = [
  { baslik: 'GreenGrocer', dil: 'Java' },
  { baslik: 'RAM Design', dil: 'MATLAB' },
  { baslik: `IT Solution Hub`, dil: `C#`},
]
//
// `Proje[]` = "Proje tipinde objelerden oluşan bir liste" (C#'taki
// `List<Proje>` ile aynı fikir).
//
// Tek bir elemana INDEX (sıra numarası) ile ulaşılır, 0'dan başlar:
//   projeler[0]   → ilk eleman
//   projeler[1]   → ikinci eleman
//
// Kaç eleman olduğunu `.length` ile öğrenirsin:
//   projeler.length   → 2
//
// Hepsinin üzerinden tek tek geçmek için (C#'taki foreach ile BİREBİR aynı
// mantık) `for...of` kullanılır:
//   for (const p of projeler) {
//     console.log(p.baslik)
//   }
//
// Bir listeye yeni eleman eklemek için `.push(...)` kullanılır
// (C#'taki `List<T>.Add(...)` ile aynı iş):
//   const sayilar: number[] = []
//   sayilar.push(5)   // artık sayilar = [5]

type Proje = {
  baslik: string
  dil: string
}

// TODO 1: `projeler` adında, Proje[] tipinde bir array oluştur.
// İçinde en az 3 proje olsun (baslik + dil), istediğin isimleri kullan.


// TODO 2: `projeSayisi` adında bir fonksiyon yaz. Parametre olarak
// Proje[] alsın, kaç eleman olduğunu (number) döndürsün.
// İpucu: döngüye bile gerek yok, `.length` yeterli.
export function projeSayisi(projeler: Proje[]) : number {
  return projeler.length
}


// TODO 3: `tumBasliklar` adında bir fonksiyon yaz. Parametre olarak
// Proje[] alsın, SADECE başlıklardan oluşan yeni bir liste (string[])
// döndürsün.
// Örnek girdi:  [{ baslik: 'GreenGrocer', dil: 'Java' }, { baslik: 'RAM Design', dil: 'MATLAB' }]
// Örnek çıktı:  ['GreenGrocer', 'RAM Design']
//
// İskelet (bunu kopyalayıp fonksiyonun için kullanabilirsin):

export function tumBasliklar(projeler: Proje[]) : string[] {
  const sonuc: string[] = []

  for (const p of projeler) {
    sonuc.push(p.baslik)
 }
  return sonuc
}
