import { createContext } from 'react'
import type { Locale } from '../../domain/entities/Locale'

export interface LocaleContextValue {
  locale: Locale
  toggleLocale: () => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
