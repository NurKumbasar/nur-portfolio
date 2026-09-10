import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Experience } from '../../domain/entities/Experience'
import { ExperienceCard } from './ExperienceCard'

const ornekDeneyim: Experience = {
  role: 'QA Stajyeri',
  company: 'Extra360 Technology Solutions',
  period: 'Şub 2026 — Haz 2026',
  location: 'İstanbul, Türkiye',
  highlights: ['Test maddesi 1', 'Test maddesi 2'],
}

describe('ExperienceCard', () => {
  it('rol, şirket, konum ve tarihi gösterir', () => {
    render(<ExperienceCard experience={ornekDeneyim} />)
    expect(screen.getByText('QA Stajyeri')).toBeInTheDocument()
    expect(screen.getByText('Extra360 Technology Solutions — İstanbul, Türkiye')).toBeInTheDocument()
    expect(screen.getByText('Şub 2026 — Haz 2026')).toBeInTheDocument()
  })

  it('tüm madde başlıklarını (highlights) gösterir', () => {
    render(<ExperienceCard experience={ornekDeneyim} />)
    expect(screen.getByText('Test maddesi 1')).toBeInTheDocument()
    expect(screen.getByText('Test maddesi 2')).toBeInTheDocument()
  })
})
