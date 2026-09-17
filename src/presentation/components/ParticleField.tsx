import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number }

const LINK_DISTANCE = 120
// --color-accent-bold'un RGB karşılığı — <canvas> CSS değişkeni okuyamadığı
// için burada tekrar yazıyoruz, ikisini birlikte değiştirmeyi unutma.
const ACCENT_RGB = '226, 160, 174'

// Fare noktalara bu kadar (px) yaklaşınca itme etkisi başlıyor, tam
// üzerindeyken en güçlü hale geliyor.
const MOUSE_RADIUS = 140
const MOUSE_PUSH = 34

// Hero'nun arkasında yavaşça süzülen, birbirine yakın olduğunda çizgiyle
// bağlanan noktalar — <canvas> üzerine her karede (frame) elle çiziyoruz,
// CSS/SVG ile bu kadar noktayı performanslı şekilde animasyonlamak zor.
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frameId = 0
    // Ekranın çok dışında bir başlangıç değeri — fare hiç hareket
    // etmediyse noktalar hiçbir şeyden kaçmıyormuş gibi görünsün.
    const mouse = { x: -9999, y: -9999 }

    // Ebeveyn (.hero) her boyut değiştirdiğinde canvas'ı ve nokta
    // sayısını yeniden hesaplıyoruz — alan büyüdükçe nokta sayısı da artar.
    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight

      const dpr = window.devicePixelRatio || 1
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(70, Math.round((width * height) / 13000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    // Bir noktanın kendi "asıl" konumuyla fareden kaçarken göründüğü
    // konumu ayırıyoruz: p.x/p.y hep kendi sabit hızıyla ilerliyor, fareye
    // yakınsa çizim sırasında bundan uzağa kaydırılmış bir konumda
    // gösteriliyor. Böylece itme kuvveti hiç birikmiyor (üst üste
    // eklenmiyor) — fare uzaklaşınca nokta anında kendi rotasına döner.
    function displaced(p: Particle) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist === 0 || dist >= MOUSE_RADIUS) return { x: p.x, y: p.y }
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH
      return { x: p.x + (dx / dist) * force, y: p.y + (dy / dist) * force }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      const positions = particles.map(displaced)

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x
          const dy = positions[i].y - positions[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${0.16 * (1 - dist / LINK_DISTANCE)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(positions[i].x, positions[i].y)
            ctx!.lineTo(positions[j].x, positions[j].y)
            ctx!.stroke()
          }
        }
      }

      for (const pos of positions) {
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, 0.6)`
        ctx!.beginPath()
        ctx!.arc(pos.x, pos.y, 1.6, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    // window 'resize' yerine ResizeObserver kullanıyoruz — .hero'nun
    // boyutu sadece pencere değişince değil, içerik/font yüklenince de
    // değişebilir; ResizeObserver ebeveynin kendisini izlediği için
    // her durumda doğru boyutu yakalıyor.
    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)

    // Canvas'ın kendisi pointer-events:none (altındaki linkler/butonlar
    // tıklanabilsin diye) — bu yüzden fareyi window üzerinden dinleyip
    // canvas'ın sayfadaki konumuna göre göreli koordinata çeviriyoruz.
    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function handlePointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
