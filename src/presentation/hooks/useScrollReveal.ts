import { useEffect, useRef, useState } from 'react'

// Bir elemanın ekrana (viewport'a) girip girmediğini takip eder.
// IntersectionObserver = tarayıcının bize "şu eleman artık görünür oldu"
// diye haber veren yerleşik aracı — scroll pozisyonunu elle hesaplamamıza
// gerek kalmıyor.
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Bir kere göründükten sonra izlemeyi bırak — tekrar tekrar
          // tetiklenmesine gerek yok.
          observer.unobserve(element)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
