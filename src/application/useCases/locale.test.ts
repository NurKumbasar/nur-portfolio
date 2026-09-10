import { describe, expect, it } from 'vitest'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import { resolveInitialLocale, toggleLocale } from './locale'

function fakeStore(saved: 'tr' | 'en' | null): LocaleStore {
  return {
    getSavedLocale: () => saved,
    saveLocale: () => {},
  }
}

describe('resolveInitialLocale', () => {
  it('kaydedilmiş bir dil varsa onu döner', () => {
    expect(resolveInitialLocale(fakeStore('en'))).toBe('en')
  })

  it('kayıt yoksa varsayılan olarak tr döner', () => {
    expect(resolveInitialLocale(fakeStore(null))).toBe('tr')
  })
})

describe('toggleLocale', () => {
  it('tr ise en, en ise tr döner', () => {
    expect(toggleLocale('tr')).toBe('en')
    expect(toggleLocale('en')).toBe('tr')
  })
})
