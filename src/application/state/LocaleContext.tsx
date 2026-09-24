import { useEffect, useState, type ReactNode } from 'react'
import type { Locale } from '../../domain/entities/Locale'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import { resolveInitialLocale, toggleLocale as toggleLocaleValue } from '../useCases/locale'
import { LocaleContext } from './localeCtx'

// Bu dosya sadece bileşeni (LocaleProvider) dışa aktarıyor; context nesnesi
// `localeContext.ts`'te, hook ise `useLocale.ts`'te. Böylece React'in
// "Fast Refresh" özelliği (kod değişince sayfayı sıfırlamadan güncelleme)
// bu dosyada düzgün çalışıyor.
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
