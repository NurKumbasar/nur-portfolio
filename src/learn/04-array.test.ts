import { describe, expect, it } from 'vitest'
import { projeler, projeSayisi, tumBasliklar } from './04-array'

describe('projeler', () => {
  it('en az 3 eleman içeren bir liste', () => {
    expect(Array.isArray(projeler)).toBe(true)
    expect(projeler.length).toBeGreaterThanOrEqual(3)
  })

  it('her eleman baslik ve dil alanına sahip', () => {
    for (const p of projeler) {
      expect(typeof p.baslik).toBe('string')
      expect(typeof p.dil).toBe('string')
    }
  })
})

describe('projeSayisi', () => {
  it('eleman sayısını doğru döndürür', () => {
    expect(
      projeSayisi([
        { baslik: 'A', dil: 'X' },
        { baslik: 'B', dil: 'Y' },
      ]),
    ).toBe(2)
    expect(projeSayisi([])).toBe(0)
  })
})

describe('tumBasliklar', () => {
  it('sadece başlıklardan oluşan yeni bir liste döndürür', () => {
    const girdi = [
      { baslik: 'GreenGrocer', dil: 'Java' },
      { baslik: 'RAM Design', dil: 'MATLAB' },
    ]
    expect(tumBasliklar(girdi)).toEqual(['GreenGrocer', 'RAM Design'])
  })
})
