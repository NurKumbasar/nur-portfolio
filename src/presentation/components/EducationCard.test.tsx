import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Education } from '../../domain/entities/Education'
import { EducationCard } from './EducationCard'

const ornekEgitim: Education = {
  degree: 'Bilgisayar Mühendisliği Lisans',
  institution: 'Kadir Has Üniversitesi',
  period: '2023 — 2027',
  location: 'İstanbul, Türkiye',
}

describe('EducationCard', () => {
  it('derece, okul, tarih ve şehri gösterir', () => {
    render(<EducationCard education={ornekEgitim} />)
    expect(screen.getByText('Bilgisayar Mühendisliği Lisans')).toBeInTheDocument()
    expect(screen.getByText('Kadir Has Üniversitesi')).toBeInTheDocument()
    expect(screen.getByText('2023 — 2027')).toBeInTheDocument()
    expect(screen.getByText('İstanbul, Türkiye')).toBeInTheDocument()
  })
})
