import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Reveal } from './Reveal'

describe('Reveal', () => {
  it('içine konan içeriği gösterir', () => {
    render(
      <Reveal>
        <p>Merhaba</p>
      </Reveal>,
    )

    expect(screen.getByText('Merhaba')).toBeInTheDocument()
  })

  it('ekrana girince "reveal-visible" class\'ını ekler', () => {
    render(
      <Reveal>
        <p>Merhaba</p>
      </Reveal>,
    )

    expect(screen.getByText('Merhaba').parentElement).toHaveClass('reveal-visible')
  })
})
