import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocaleProvider } from './application/state/LocaleContext.tsx'
import { ThemeProvider } from './application/state/ThemeContext.tsx'
import { formspreeMessageSender } from './infrastructure/messaging/formspreeMessageSender.ts'
import { localStorageLocaleStore } from './infrastructure/storage/localStorageLocaleStore.ts'
import { localStorageThemeStore } from './infrastructure/storage/localStorageThemeStore.ts'
import App from './presentation/App.tsx'
import './presentation/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider store={localStorageThemeStore}>
      <LocaleProvider store={localStorageLocaleStore}>
        <App messageSender={formspreeMessageSender} />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
