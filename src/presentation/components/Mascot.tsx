// Avatar fotoğrafı yerine küçük, canlı bir maskot — tamamen SVG ile
// çizilmiş, dışarıdan görsel yok. Yüzen (float) ve arada göz kırpan
// (blink) hareketleri CSS animasyonlarıyla yapılıyor, aşağıdaki
// global.css'teki `.mascot` / `.mascot-eyes` kurallarına bak.
export function Mascot() {
  return (
    <svg viewBox="0 0 200 200" className="mascot" aria-hidden="true">
      <path
        className="mascot-body"
        d="M100,22 C144,22 178,50 178,92 C178,136 148,178 100,178 C52,178 22,138 22,94 C22,48 56,22 100,22 Z"
      />
      <g className="mascot-eyes">
        <circle className="mascot-eye" cx="78" cy="92" r="9" />
        <circle className="mascot-eye" cx="124" cy="92" r="9" />
      </g>
      <path className="mascot-mouth" d="M84,118 Q101,130 118,118" />
      <circle className="mascot-cheek" cx="60" cy="110" r="9" />
      <circle className="mascot-cheek" cx="142" cy="110" r="9" />
    </svg>
  )
}
