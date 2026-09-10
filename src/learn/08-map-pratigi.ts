// DERS 8 — .map() pratiği (JSX YOK, sadece sade veriyle)
//
// .map() = "listedeki HER eleman için bir şey yap, yeni bir liste oluştur"
//
// Örnek:
//   const sayilar = [1, 2, 3]
//   const ikiKat = sayilar.map((sayi) => sayi * 2)
//   // ikiKat = [2, 4, 6]
//
// Parantez içindeki (sayi) => sayi * 2 kısmı: "her `sayi` için, sayi * 2'yi
// üret." `sayi` ismini biz seçtik, listedeki HER elemanı sırayla temsil
// ediyor.

// TODO 1: `sayilar` = [1, 2, 3, 4, 5]. `.map()` kullanarak `ikiKat` adında
// yeni bir liste oluştur, her sayının 2 katını içersin.
// Beklenen: ikiKat = [2, 4, 6, 8, 10]

export const sayilar = [1, 2, 3, 4, 5]
export const ikiKat = sayilar.map((sayi) => sayi * 2)

// TODO 2: Aşağıdaki `kisiler` listesinden, SADECE isimlerden oluşan yeni
// bir liste (`isimler`) oluştur. .map() kullan.
// Beklenen: isimler = ['Nur', 'Ali', 'Ayşe']

export const kisiler = [
  { isim: 'Nur', yas: 20 },
  { isim: 'Ali', yas: 25 },
  { isim: 'Ayşe', yas: 30 },
]

export const isimler = kisiler.map((isim) => isim.isim)