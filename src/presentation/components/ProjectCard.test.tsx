import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../application/state/LocaleContext'
import type { Project } from '../../domain/entities/Project'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import { ProjectCard } from './ProjectCard'

const fakeLocaleStore: LocaleStore = {
  getSavedLocale: () => 'tr',
  saveLocale: () => {},
}

const ornekProje: Project = {
  title: 'GreenGrocer',
  tags: ['Java', 'MySQL'],
  description: 'Test açıklaması.',
}

function renderProjectCard(project: Project) {
  return render(
    <LocaleProvider store={fakeLocaleStore}>
      <ProjectCard project={project} />
    </LocaleProvider>,
  )
}

describe('ProjectCard', () => {
  it('başlığı gösterir', () => {
    renderProjectCard(ornekProje)
    expect(screen.getByText('GreenGrocer')).toBeInTheDocument()
  })

  it('tüm etiketleri gösterir', () => {
    renderProjectCard(ornekProje)
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('MySQL')).toBeInTheDocument()
  })

  it('açıklamayı gösterir', () => {
    renderProjectCard(ornekProje)
    expect(screen.getByText('Test açıklaması.')).toBeInTheDocument()
  })

  it('githubUrl/demoUrl yoksa link göstermez', () => {
    renderProjectCard(ornekProje)
    expect(screen.queryByText('Kod')).not.toBeInTheDocument()
    expect(screen.queryByText('Demo')).not.toBeInTheDocument()
  })

  it('githubUrl ve demoUrl varsa ikisini de gösterir', () => {
    renderProjectCard({ ...ornekProje, githubUrl: 'https://github.com/x', demoUrl: 'https://example.com' })
    expect(screen.getByText('Kod').closest('a')).toHaveAttribute('href', 'https://github.com/x')
    expect(screen.getByText('Demo').closest('a')).toHaveAttribute('href', 'https://example.com')
  })

  it('link yoksa ve note verilmişse notu gösterir', () => {
    renderProjectCard({ ...ornekProje, note: 'Okul projesi' })
    expect(screen.getByText('Okul projesi')).toBeInTheDocument()
  })

  it('link varsa note verilmiş olsa bile notu göstermez', () => {
    renderProjectCard({ ...ornekProje, githubUrl: 'https://github.com/x', note: 'Okul projesi' })
    expect(screen.queryByText('Okul projesi')).not.toBeInTheDocument()
  })
})
