import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProjeListesi } from './07-liste-render'

describe('ProjeListesi', () => {
  it('projeler listesindeki her başlığı gösterir', () => {
    render(<ProjeListesi />)
    expect(screen.getByText('GreenGrocer')).toBeInTheDocument()
    expect(screen.getByText('RAM Design')).toBeInTheDocument()
    expect(screen.getByText('DSA')).toBeInTheDocument()
  })

  it('projeler listesindeki her dili gösterir', () => {
    render(<ProjeListesi />)
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('MATLAB')).toBeInTheDocument()
    expect(screen.getByText('C++')).toBeInTheDocument()
  })
})
