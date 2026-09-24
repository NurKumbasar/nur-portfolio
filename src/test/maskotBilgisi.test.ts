import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { staticContentRepository as content } from '../infrastructure/content/staticContentRepository'

// Maskotun (Nuriş) Nur hakkındaki bilgisi `api/chat.ts` içindeki bir metinde
// duruyor; sitenin içeriğiyle aynı dosyadan gelmiyor (sunucu fonksiyonu
// `src/`'yi import etmiyor). İçerik güncellenip o metin unutulursa maskot
// eski bilgiyi söylemeye devam eder — bu test o kaymayı yakalıyor.
// Dosyayı import etmek yerine METİN olarak okuyoruz: fonksiyonun kendisine
// dokunmuyoruz.
const source = readFileSync(resolve(__dirname, '../../api/chat.ts'), 'utf8')
const prompt = source.slice(source.indexOf('const SYSTEM_PROMPT'), source.indexOf('// Bakiyeyi korumak'))
const norm = (s: string) => s.toLowerCase()
const has = (fact: string) => norm(prompt).includes(norm(fact))

// "KoçSistem: Digital & Technology Solutions" -> "KoçSistem"
const shortCompany = (company: string) => company.split(':')[0].replace(/ Technology Solutions$/, '').trim()

describe('maskot bilgi metni ↔ site içeriği', () => {
  it('bulunduğu metni buluyor (test boş geçmesin)', () => {
    expect(prompt.length).toBeGreaterThan(200)
  })

  it('içerikteki her şirket maskotun metninde geçiyor', () => {
    const missing = content
      .getExperiences('tr')
      .map((e) => shortCompany(e.company))
      .filter((name) => !has(name))
    expect(missing, `api/chat.ts SYSTEM_PROMPT'a eklenmeli: ${missing.join(', ')}`).toEqual([])
  })

  it('içerikteki her eğitim kurumu maskotun metninde geçiyor', () => {
    const missing = content
      .getEducations('tr')
      .map((e) => e.institution.replace(/ Üniversitesi$/, '').replace(/ Lisesi$/, ''))
      .filter((name) => !has(name))
    expect(missing, `api/chat.ts SYSTEM_PROMPT'a eklenmeli: ${missing.join(', ')}`).toEqual([])
  })

  it('iletişim bilgileri (e-posta, GitHub, LinkedIn) güncel', () => {
    const { email, githubUrl, linkedinUrl } = content.getProfile()
    const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')
    expect([email, strip(githubUrl), strip(linkedinUrl)].filter((f) => !has(f))).toEqual([])
  })
})
