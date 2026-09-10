import type { Locale } from '../../domain/entities/Locale'
import type { LocaleStore } from '../../domain/ports/LocaleStore'

/** theme.ts'teki resolveInitialTheme ile aynı fikir — kayıt yoksa varsayılan 'tr'. */
export function resolveInitialLocale(store: LocaleStore): Locale {
  return store.getSavedLocale() ?? 'tr'
}

export function toggleLocale(current: Locale): Locale {
  return current === 'tr' ? 'en' : 'tr'
}
