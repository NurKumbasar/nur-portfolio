import type { Locale } from '../entities/Locale'

/** "Dil tercihini bir yere kaydedebilen ve okuyabilen bir şey" sözleşmesi. */
export interface LocaleStore {
  getSavedLocale(): Locale | null
  saveLocale(locale: Locale): void
}
