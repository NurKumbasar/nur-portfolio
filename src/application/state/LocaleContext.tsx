import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Locale } from '../../domain/entities/Locale'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import { resolveInitialLocale, toggleLocale as toggleLocaleValue } from '../useCases/locale'

interface LocaleContextValue {
  locale: Locale
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children, store }: { children: ReactNode; store: LocaleStore }) {
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale(store))

  useEffect(() => {
    // <html lang="..">'ı güncel tutuyoruz — bu olmadan tarayıcı örneğin
    // "experience" gibi İngilizce metni Türkçe kurallarla büyütüp
    // "EXPERİENCE" (noktalı İ) yazabiliyor.
    document.documentElement.lang = locale
    store.saveLocale(locale)
  }, [locale, store])

  function toggleLocale() {
    setLocale((current) => toggleLocaleValue(current))
  }

  return <LocaleContext.Provider value={{ locale, toggleLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale, LocaleProvider içinde kullanılmalı')
  }
  return context
}
