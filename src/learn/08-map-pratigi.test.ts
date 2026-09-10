import { describe, expect, it } from 'vitest'
import { ikiKat, isimler } from './08-map-pratigi'

describe('ikiKat', () => {
  it('her sayının 2 katını içerir', () => {
    expect(ikiKat).toEqual([2, 4, 6, 8, 10])
  })
})

describe('isimler', () => {
  it('sadece isimlerden oluşan bir liste', () => {
    expect(isimler).toEqual(['Nur', 'Ali', 'Ayşe'])
  })
})
