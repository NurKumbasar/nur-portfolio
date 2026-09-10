import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { SkillCategory } from '../../domain/entities/SkillCategory'
import { SkillCard } from './SkillCard'

const ornekKategori: SkillCategory = {
  title: 'Programlama Dilleri',
  skills: ['C++', 'Java', 'Python'],
}

describe('SkillCard', () => {
  it('başlığı ve tüm yetenekleri gösterir', () => {
    render(<SkillCard category={ornekKategori} />)
    expect(screen.getByText('Programlama Dilleri')).toBeInTheDocument()
    expect(screen.getByText('C++')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })
})
