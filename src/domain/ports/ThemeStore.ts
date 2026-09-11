import type { Theme } from '../entities/Theme'

/** "Tema tercihini bir yere kaydedebilen ve okuyabilen bir şey" sözleşmesi. */
export interface ThemeStore {
  getSavedTheme(): Theme | null
  saveTheme(theme: Theme): void
}
