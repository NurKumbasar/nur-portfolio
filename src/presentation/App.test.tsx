import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../application/state/LocaleContext'
import { ThemeProvider } from '../application/state/ThemeContext'
import type { LocaleStore } from '../domain/ports/LocaleStore'
import type { MessageSender } from '../domain/ports/MessageSender'
import type { ThemeStore } from '../domain/ports/ThemeStore'
import App from './App'

// Gerçek localStorage/Formspree yerine sahte bağımlılıklar veriyoruz —
// component testi tarayıcı depolamasına ya da ağa hiç dokunmadan çalışır.
const fakeLocaleStore: LocaleStore = {
  getSavedLocale: () => 'tr',
  saveLocale: () => {},
}

const fakeThemeStore: ThemeStore = {
  getSavedTheme: () => 'light',
  saveTheme: () => {},
}

const fakeMessageSender: MessageSender = {
  send: async () => {},
}

describe('App', () => {
  it('başlığı gösterir', () => {
    render(
      <ThemeProvider store={fakeThemeStore}>
        <LocaleProvider store={fakeLocaleStore}>
          <App messageSender={fakeMessageSender} />
        </LocaleProvider>
      </ThemeProvider>,
    )
    expect(screen.getByRole('heading', { name: 'Nur Kumbasar' })).toBeInTheDocument()
  })
})
