import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Language } from '../../domain/entities/Language'
import { LanguageCard } from './LanguageCard'

const ornekDil: Language = { name: 'Türkçe', level: 'Ana Dil' }

describe('LanguageCard', () => {
  it('dil adını ve seviyesini gösterir', () => {
    render(<LanguageCard language={ornekDil} />)
    expect(screen.getByText('Türkçe')).toBeInTheDocument()
    expect(screen.getByText('Ana Dil')).toBeInTheDocument()
  })
})
