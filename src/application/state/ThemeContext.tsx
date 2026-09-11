import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Theme } from '../../domain/entities/Theme'
import type { ThemeStore } from '../../domain/ports/ThemeStore'
import { resolveInitialTheme, toggleTheme as toggleThemeValue } from '../useCases/theme'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children, store }: { children: ReactNode; store: ThemeStore }) {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme(store))

  useEffect(() => {
    // CSS'teki :root[data-theme="..."] kuralları bunu okuyor — bkz.
    // global.css'in en üstündeki tema açıklaması.
    document.documentElement.dataset.theme = theme
    store.saveTheme(theme)
  }, [theme, store])

  function toggleTheme() {
    setTheme((current) => toggleThemeValue(current))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme, ThemeProvider içinde kullanılmalı')
  }
  return context
}
