import { useContext } from 'react'
import { LocaleContext, type LocaleContextValue } from './localeCtx'

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale, LocaleProvider içinde kullanılmalı')
  }
  return context
}
