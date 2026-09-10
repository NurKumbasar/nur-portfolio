import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Kart } from './06-props'

describe('Kart', () => {
  it('verilen baslik ve dili gösterir', () => {
    render(<Kart baslik="GreenGrocer" dil="Java" />)
    expect(screen.getByText('GreenGrocer')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('farklı props ile farklı içerik gösterir', () => {
    render(<Kart baslik="RAM Design" dil="MATLAB" />)
    expect(screen.getByText('RAM Design')).toBeInTheDocument()
    expect(screen.getByText('MATLAB')).toBeInTheDocument()
  })
})
