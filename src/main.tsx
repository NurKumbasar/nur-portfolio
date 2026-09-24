import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContentProvider } from './application/state/ContentProvider.tsx'
import { LocaleProvider } from './application/state/LocaleContext.tsx'
import { ThemeProvider } from './application/state/ThemeContext.tsx'
import { httpChatService } from './infrastructure/chat/httpChatService.ts'
import { staticContentRepository } from './infrastructure/content/staticContentRepository.ts'
import { formspreeMessageSender } from './infrastructure/messaging/formspreeMessageSender.ts'
import { localStorageLocaleStore } from './infrastructure/storage/localStorageLocaleStore.ts'
import { localStorageThemeStore } from './infrastructure/storage/localStorageThemeStore.ts'
import App from './presentation/App.tsx'
import './presentation/styles/global.css'

// Composition root: somut implementasyonlar (infrastructure) SADECE burada
// seçilip uygulamaya veriliyor. Geri kalan her katman yalnızca domain'deki
// arayüzleri (port) bilir.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider store={localStorageThemeStore}>
      <LocaleProvider store={localStorageLocaleStore}>
        <ContentProvider repository={staticContentRepository}>
          <App messageSender={formspreeMessageSender} chatService={httpChatService} />
        </ContentProvider>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
