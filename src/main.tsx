import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocaleProvider } from './application/state/LocaleContext.tsx'
import { formspreeMessageSender } from './infrastructure/messaging/formspreeMessageSender.ts'
import { localStorageLocaleStore } from './infrastructure/storage/localStorageLocaleStore.ts'
import App from './presentation/App.tsx'
import './presentation/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider store={localStorageLocaleStore}>
      <App messageSender={formspreeMessageSender} />
    </LocaleProvider>
  </StrictMode>,
)
