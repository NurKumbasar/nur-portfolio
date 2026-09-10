import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '../../domain/entities/Project'
import { ProjectCard } from './ProjectCard'

const ornekProje: Project = {
  title: 'GreenGrocer',
  tags: ['Java', 'MySQL'],
  description: 'Test açıklaması.',
}

describe('ProjectCard', () => {
  it('başlığı gösterir', () => {
    render(<ProjectCard project={ornekProje} />)
    expect(screen.getByText('GreenGrocer')).toBeInTheDocument()
  })

  it('tüm etiketleri gösterir', () => {
    render(<ProjectCard project={ornekProje} />)
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('MySQL')).toBeInTheDocument()
  })

  it('açıklamayı gösterir', () => {
    render(<ProjectCard project={ornekProje} />)
    expect(screen.getByText('Test açıklaması.')).toBeInTheDocument()
  })
})
