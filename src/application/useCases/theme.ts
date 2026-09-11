import type { Theme } from '../../domain/entities/Theme'
import type { ThemeStore } from '../../domain/ports/ThemeStore'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Kayıtlı bir tercih varsa onu, yoksa işletim sistemi tercihini kullan. */
export function resolveInitialTheme(store: ThemeStore): Theme {
  return store.getSavedTheme() ?? getSystemTheme()
}

export function toggleTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light'
}
