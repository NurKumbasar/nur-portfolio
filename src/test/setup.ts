import '@testing-library/jest-dom/vitest'

// jsdom (testlerin çalıştığı sahte tarayıcı ortamı) matchMedia'yı
// desteklemiyor; ParticleField "prefers-reduced-motion" tercihini bunun
// üzerinden okuduğu için burada basitçe taklit ediyoruz. Gerçek
// tarayıcıda bu dosyanın hiçbir etkisi yok.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom IntersectionObserver'ı da desteklemiyor; Reveal bileşeni bunu
// kullandığı için testte hemen "görünür" sonucu veren basit bir taklit
// koyuyoruz. Gerçek tarayıcıda bu dosyanın hiçbir etkisi yok.
if (!window.IntersectionObserver) {
  class FakeIntersectionObserver implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly scrollMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    private callback: IntersectionObserverCallback

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        this,
      )
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }

  window.IntersectionObserver = FakeIntersectionObserver
}
