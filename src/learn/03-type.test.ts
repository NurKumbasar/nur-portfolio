import { describe, expect, it } from 'vitest'
import { proje, projeyiTanit } from './03-type'

describe('proje', () => {
  it('baslik ve dil alanlarına sahip', () => {
    expect(proje.baslik).toBe('GreenGrocer')
    expect(proje.dil).toBe('Java')
  })
})

describe('projeyiTanit', () => {
  it('projeyi doğru cümlede tanıtır', () => {
    expect(projeyiTanit(proje)).toBe('GreenGrocer projesi Java ile yazıldı.')
  })
})
