import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

// Katmanlı mimari kurallarını otomatik denetler: biri yanlış yönde bir
// import eklerse (örn. bir bileşenin `infrastructure`'ı import etmesi) bu
// test kırılır — kural sadece README'de yazılı kalmaz.
//
// İzin verilen bağımlılık yönü:  presentation → application → domain
//                                 infrastructure → domain
// `main.tsx` (composition root) bu kuralın dışında: somut implementasyonları
// bilerek en tepede birleştiriyor.

const SRC = resolve(__dirname, '..')
type Layer = 'domain' | 'application' | 'infrastructure' | 'presentation'

const ALLOWED: Record<Layer, Layer[]> = {
  domain: ['domain'],
  application: ['application', 'domain'],
  infrastructure: ['infrastructure', 'domain'],
  presentation: ['presentation', 'application', 'domain'],
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

function layerOf(file: string): Layer | null {
  const first = relative(SRC, file).split(sep)[0]
  return first in ALLOWED ? (first as Layer) : null
}

const isSource = (f: string) => /\.(ts|tsx)$/.test(f) && !/\.test\.(ts|tsx)$/.test(f)

function importsOf(file: string): string[] {
  const text = readFileSync(file, 'utf8')
  return [...text.matchAll(/(?:from|import)\s+['"](\.{1,2}\/[^'"]*)['"]/g)].map((m) => m[1])
}

const sourceFiles = walk(SRC).filter((f) => isSource(f) && layerOf(f) !== null)

describe('katmanlı mimari', () => {
  it('katman klasörlerinde kaynak dosya buluyor (test boş geçmesin)', () => {
    expect(sourceFiles.length).toBeGreaterThan(20)
  })

  it('her katman sadece izin verilen katmanları import eder', () => {
    const violations: string[] = []
    for (const file of sourceFiles) {
      const from = layerOf(file)!
      for (const spec of importsOf(file)) {
        const target = layerOf(resolve(dirname(file), spec))
        if (target && !ALLOWED[from].includes(target)) {
          violations.push(`${relative(SRC, file)} (${from}) → ${spec} (${target})`)
        }
      }
    }
    expect(violations).toEqual([])
  })

  it('aynı klasörde, harf büyüklüğü dışında aynı isimli iki dosya yok', () => {
    // macOS ve Windows'ta dosya sistemi harf büyüklüğünü ayırt etmez:
    // `LocaleContext.tsx` ile `localeContext.ts` orada aynı isim sayılır ve
    // `import './LocaleContext'` yanlış dosyayı bulabilir. Linux'ta (CI)
    // sorun çıkmadığı için bunu burada açıkça denetliyoruz.
    const seen = new Map<string, string>()
    const collisions: string[] = []
    for (const file of walk(SRC).filter((f) => /\.(ts|tsx)$/.test(f))) {
      const key = file.replace(/\.(ts|tsx)$/, '').toLowerCase()
      const other = seen.get(key)
      if (other) collisions.push(`${relative(SRC, other)} ↔ ${relative(SRC, file)}`)
      else seen.set(key, file)
    }
    expect(collisions).toEqual([])
  })

  it('ağ ve tarayıcı depolaması çağrıları sadece infrastructure içinde', () => {
    const offenders = sourceFiles
      .filter((f) => layerOf(f) !== 'infrastructure')
      .filter((f) => /\bfetch\(|\blocalStorage\b|\bsessionStorage\b/.test(readFileSync(f, 'utf8')))
      .map((f) => relative(SRC, f))
    expect(offenders).toEqual([])
  })

  it('domain katmanı React, tarayıcı API’leri ya da başka paketler import etmez', () => {
    const offenders = sourceFiles
      .filter((f) => layerOf(f) === 'domain')
      .filter((f) => /from\s+['"](?!\.{1,2}\/)/.test(readFileSync(f, 'utf8')))
      .map((f) => relative(SRC, f))
    expect(offenders).toEqual([])
  })
})
