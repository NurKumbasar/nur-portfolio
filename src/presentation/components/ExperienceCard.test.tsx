import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../application/state/LocaleContext'
import type { Experience } from '../../domain/entities/Experience'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import { ExperienceCard } from './ExperienceCard'

const fakeLocaleStore: LocaleStore = {
  getSavedLocale: () => 'tr',
  saveLocale: () => {},
}

const ornekDeneyim: Experience = {
  role: 'QA Stajyeri',
  company: 'Extra360 Technology Solutions',
  period: 'Şub 2026 — Haz 2026',
  location: 'İstanbul, Türkiye',
  highlights: ['Test maddesi 1', 'Test maddesi 2'],
}

function renderExperienceCard(experience: Experience, isCurrent?: boolean) {
  return render(
    <LocaleProvider store={fakeLocaleStore}>
      <ExperienceCard experience={experience} isCurrent={isCurrent} />
    </LocaleProvider>,
  )
}

describe('ExperienceCard', () => {
  it('rol, şirket, konum ve tarihi gösterir', () => {
    renderExperienceCard(ornekDeneyim)
    expect(screen.getByText('QA Stajyeri')).toBeInTheDocument()
    expect(screen.getByText('Extra360 Technology Solutions — İstanbul, Türkiye')).toBeInTheDocument()
    expect(screen.getByText('Şub 2026 — Haz 2026')).toBeInTheDocument()
  })

  it('tüm madde başlıklarını (highlights) gösterir', () => {
    renderExperienceCard(ornekDeneyim)
    expect(screen.getByText('Test maddesi 1')).toBeInTheDocument()
    expect(screen.getByText('Test maddesi 2')).toBeInTheDocument()
  })

  it('isCurrent false/verilmemişse rozet göstermez', () => {
    renderExperienceCard(ornekDeneyim)
    expect(screen.queryByText('Şu an')).not.toBeInTheDocument()
  })

  it('isCurrent true ise "Şu an" rozetini gösterir', () => {
    renderExperienceCard(ornekDeneyim, true)
    expect(screen.getByText('Şu an')).toBeInTheDocument()
  })
})
