import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// İçine ne konursa (Hero, bir bölüm, ...) onu sarmalar; kaydırıp
// ekrana girince "reveal-visible" class'ı eklenir, CSS geri kalanını yapar.
export function Reveal(props: { children: ReactNode }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'reveal-visible' : ''}`}>
      {props.children}
    </div>
  )
}
