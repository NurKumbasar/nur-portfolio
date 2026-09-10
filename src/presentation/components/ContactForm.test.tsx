import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LocaleProvider } from '../../application/state/LocaleContext'
import type { LocaleStore } from '../../domain/ports/LocaleStore'
import type { MessageSender } from '../../domain/ports/MessageSender'
import { ContactForm } from './ContactForm'

const fakeLocaleStore: LocaleStore = {
  getSavedLocale: () => 'tr',
  saveLocale: () => {},
}

function renderWithLocale(sender: MessageSender) {
  return render(
    <LocaleProvider store={fakeLocaleStore}>
      <ContactForm sender={sender} />
    </LocaleProvider>,
  )
}

describe('ContactForm', () => {
  it('tüm alanları gösterir', () => {
    const sender: MessageSender = { send: vi.fn().mockResolvedValue(undefined) }
    renderWithLocale(sender)

    expect(screen.getByLabelText('Ad Soyad')).toBeInTheDocument()
    expect(screen.getByLabelText('E-posta')).toBeInTheDocument()
    expect(screen.getByLabelText('Konu')).toBeInTheDocument()
    expect(screen.getByLabelText('Mesaj')).toBeInTheDocument()
  })

  it('gönderince sender.send doğru veriyle çağrılır', async () => {
    const send = vi.fn().mockResolvedValue(undefined)
    const sender: MessageSender = { send }
    renderWithLocale(sender)

    fireEvent.change(screen.getByLabelText('Ad Soyad'), { target: { value: 'Nur' } })
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: 'nur@example.com' } })
    fireEvent.change(screen.getByLabelText('Konu'), { target: { value: 'Merhaba' } })
    fireEvent.change(screen.getByLabelText('Mesaj'), { target: { value: 'Test mesajı' } })
    fireEvent.click(screen.getByRole('button', { name: /gönder/i }))

    expect(send).toHaveBeenCalledWith({
      name: 'Nur',
      email: 'nur@example.com',
      topic: 'Merhaba',
      message: 'Test mesajı',
    })
  })
})
