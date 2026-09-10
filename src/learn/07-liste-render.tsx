// DERS 7 — Bir listeyi component listesine çevirmek (.map())
//
// Ok fonksiyonu (arrow function) — aynı fonksiyon, farklı yazım:
//
//   function ikiyleCarp(x: number): number { return x * 2 }
//   const ikiyleCarp = (x: number): number => x * 2   // AYNI ŞEY
//
// .map() — Ders 4'teki for...of + push yönteminin kısayolu:
//
//   for...of ile:  const sonuc: string[] = []
//                  for (const p of projeler) { sonuc.push(p.baslik) }
//
//   .map() ile:    const sonuc = projeler.map((p) => p.baslik)
//
// JSX ile: bir veri listesini component listesine çevirebiliriz.
// React her elemana benzersiz bir `key` istiyor (zorunlu kural):
//
//   projeler.map((p) => <Kart key={p.baslik} baslik={p.baslik} dil={p.dil} />)

type Proje = {
  baslik: string
  dil: string
}

function Kart(props: { baslik: string; dil: string }) {
  return (
    <div>
      <h3>{props.baslik}</h3>
      <p>{props.dil}</p>
    </div>
  )
}

const projeler: Proje[] = [
  { baslik: 'GreenGrocer', dil: 'Java' },
  { baslik: 'RAM Design', dil: 'MATLAB' },
  { baslik: 'DSA', dil: 'C++' },
]

// TODO: `ProjeListesi` adında bir component yaz (parametresi yok).
// `projeler` listesindeki her eleman için bir `<Kart />` üretsin,
// hepsini bir <div> içinde döndürsün. `.map()` kullan, her Kart'a
// `key` vermeyi unutma.
//
export function ProjeListesi() {
   return (
     <div>
       {projeler.map((p) => (
         <Kart key={p.baslik} baslik={p.baslik} dil={p.dil} />
       ))}
     </div>
   )
}
