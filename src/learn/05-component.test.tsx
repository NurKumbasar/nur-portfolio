import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Baslik } from './05-component'

// `render(...)` component'i sahte (test amaçlı) bir ekrana "basar".
// `screen.getByText(...)` o sahte ekranda verdiğin yazıyı arar,
// bulamazsa test kırmızı (FAIL) olur.

describe('Baslik', () => {
  it('Nur Kumbasar yazan bir başlık gösterir', () => {
    render(<Baslik />)
    expect(screen.getByText('Nur Kumbasar')).toBeInTheDocument()
  })
})
