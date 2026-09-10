import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number }

const LINK_DISTANCE = 120
// --color-accent-bold'un RGB karşılığı — <canvas> CSS değişkeni okuyamadığı
// için burada tekrar yazıyoruz, ikisini birlikte değiştirmeyi unutma.
const ACCENT_RGB = '226, 160, 174'

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

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${0.16 * (1 - dist / LINK_DISTANCE)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, 0.6)`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
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

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
