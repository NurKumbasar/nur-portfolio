import { describe, expect, it } from 'vitest'
import type { ThemeStore } from '../../domain/ports/ThemeStore'
import { resolveInitialTheme, toggleTheme } from './theme'

function fakeStore(saved: 'light' | 'dark' | null): ThemeStore {
  return {
    getSavedTheme: () => saved,
    saveTheme: () => {},
  }
}

describe('resolveInitialTheme', () => {
  it('kaydedilmiş bir tema varsa onu döner', () => {
    expect(resolveInitialTheme(fakeStore('dark'))).toBe('dark')
  })

  it('kayıt yoksa sistem tercihine düşer (test ortamında matchMedia sahte, hep false yani light)', () => {
    expect(resolveInitialTheme(fakeStore(null))).toBe('light')
  })
})

describe('toggleTheme', () => {
  it('light ise dark, dark ise light döner', () => {
    expect(toggleTheme('light')).toBe('dark')
    expect(toggleTheme('dark')).toBe('light')
  })
})
