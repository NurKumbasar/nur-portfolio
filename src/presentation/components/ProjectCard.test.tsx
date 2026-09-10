import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Project } from '../../domain/entities/Project'
import { ProjectCard } from './ProjectCard'

const ornekProje: Project = {
  title: 'GreenGrocer',
  tags: ['Java', 'MySQL'],
  highlights: ['Test maddesi 1', 'Test maddesi 2'],
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

  it('tüm madde başlıklarını (highlights) gösterir', () => {
    render(<ProjectCard project={ornekProje} />)
    expect(screen.getByText('Test maddesi 1')).toBeInTheDocument()
    expect(screen.getByText('Test maddesi 2')).toBeInTheDocument()
  })
})
