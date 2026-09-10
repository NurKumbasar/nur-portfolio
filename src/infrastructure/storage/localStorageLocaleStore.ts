import type { Locale } from '../../domain/entities/Locale'
import type { LocaleStore } from '../../domain/ports/LocaleStore'

const STORAGE_KEY = 'locale'

function isLocale(value: string | null): value is Locale {
  return value === 'tr' || value === 'en'
}

export const localStorageLocaleStore: LocaleStore = {
  getSavedLocale() {
    const value = localStorage.getItem(STORAGE_KEY)
    return isLocale(value) ? value : null
  },
  saveLocale(locale) {
    localStorage.setItem(STORAGE_KEY, locale)
  },
}
