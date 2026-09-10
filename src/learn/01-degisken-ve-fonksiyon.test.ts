import { describe, expect, it } from 'vitest'
import { selamla } from './01-degisken-ve-fonksiyon'

describe('selamla', () => {
  it('ismi ve yaşı doğru cümlede birleştirir', () => {
    expect(selamla('Nur', 20)).toBe('Merhaba, ben Nur! 20 yaşındayım.')
  })

  it('farklı isim ve yaş ile de doğru çalışır', () => {
    expect(selamla('Ali', 35)).toBe('Merhaba, ben Ali! 35 yaşındayım.')
  })
})
