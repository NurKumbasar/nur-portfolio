import type { Theme } from '../../domain/entities/Theme'
import type { ThemeStore } from '../../domain/ports/ThemeStore'

const STORAGE_KEY = 'theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

export const localStorageThemeStore: ThemeStore = {
  getSavedTheme() {
    const value = localStorage.getItem(STORAGE_KEY)
    return isTheme(value) ? value : null
  },
  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme)
  },
}
