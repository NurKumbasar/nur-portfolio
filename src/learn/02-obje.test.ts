import { describe, expect, it } from 'vitest'
import { proje, projeyiTanit } from './02-obje'

describe('proje objesi', () => {
  it('baslik ve dil alanlarına sahip', () => {
    expect(proje.baslik).toBe('GreenGrocer')
    expect(proje.dil).toBe('Java')
  })
})

describe('projeyiTanit', () => {
  it('projeyi doğru cümlede tanıtır', () => {
    expect(projeyiTanit(proje)).toBe('GreenGrocer projesi Java ile yazıldı.')
  })

  it('başka bir proje objesiyle de çalışır', () => {
    expect(projeyiTanit({ baslik: 'RAM Design', dil: 'MATLAB' })).toBe(
      'RAM Design projesi MATLAB ile yazıldı.',
    )
  })
})
