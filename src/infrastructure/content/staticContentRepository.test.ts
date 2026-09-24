import { describe, expect, it } from 'vitest'
import type { Locale } from '../../domain/entities/Locale'
import { staticContentRepository as repo } from './staticContentRepository'

const locales: Locale[] = ['tr', 'en']

// TR ve EN içerik ayrı yazıldığı için birinin güncellenip diğerinin
// unutulması kolay — bu testler o tür kaymayı yakalıyor.
describe('staticContentRepository', () => {
  const collections = {
    deneyimler: (l: Locale) => repo.getExperiences(l),
    eğitimler: (l: Locale) => repo.getEducations(l),
    yetenek_kategorileri: (l: Locale) => repo.getSkillCategories(l),
    projeler: (l: Locale) => repo.getProjects(l),
    hizmetler: (l: Locale) => repo.getServices(l),
    diller: (l: Locale) => repo.getLanguages(l),
  }

  for (const [name, get] of Object.entries(collections)) {
    it(`${name}: TR ve EN aynı sayıda kayıt içerir ve boş değildir`, () => {
      expect(get('tr').length).toBeGreaterThan(0)
      expect(get('tr')).toHaveLength(get('en').length)
    })
  }

  it('React key olarak kullanılan alanlar her dilde benzersizdir', () => {
    for (const l of locales) {
      const unique = (values: string[]) => expect(new Set(values).size).toBe(values.length)
      unique(repo.getProjects(l).map((p) => p.title))
      unique(repo.getServices(l).map((s) => s.title))
      unique(repo.getSkillCategories(l).map((c) => c.title))
      unique(repo.getLanguages(l).map((x) => x.name))
      unique(repo.getExperiences(l).map((e) => e.company + e.period))
      unique(repo.getEducations(l).map((e) => e.institution + e.period))
    }
  })

  it('profilde ad ve iki dilde rol bulunur', () => {
    const profile = repo.getProfile()
    expect(profile.name).not.toBe('')
    expect(profile.role.tr).not.toBe('')
    expect(profile.role.en).not.toBe('')
  })
})
