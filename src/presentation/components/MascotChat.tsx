import { useState, type FormEvent } from 'react'
import { useLocale } from '../../application/state/useLocale'
import { useMascotChat } from '../../application/state/useMascotChat'
import type { ChatService } from '../../domain/ports/ChatService'
import { translate } from '../i18n/translations'

// Sohbet daha hiç kullanılmamışsa (sadece karşılama mesajı varken)
// gösterilen, tek tıkla soru soran öneri butonları — boş bir kutuya
// bakıp ne yazacağını bilemeyenler için.
const SUGGESTION_KEYS = ['mascotChatSuggestion1', 'mascotChatSuggestion2', 'mascotChatSuggestion3'] as const

// Bu bileşen sadece "gösterir": mesajları tutma, cevap isteme ve hata
// yönetimi `useMascotChat` hook'unda; cevabın nereden geldiği ise
// `ChatService` arkasında (bkz. main.tsx'teki composition root).
export function MascotChat(props: { chatService: ChatService; onClose: () => void }) {
  const { locale } = useLocale()
  const { messages, isLoading, sendMessage } = useMascotChat(props.chatService, {
    greeting: translate('mascotChatGreeting', locale),
    error: translate('mascotChatError', locale),
  })
  const [input, setInput] = useState('')

  function send(content: string) {
    if (!content.trim() || isLoading) return
    void sendMessage(content)
    setInput('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="mascot-chat" onPointerDown={(e) => e.stopPropagation()}>
      <div className="mascot-chat-header">
        <span>{translate('mascotChatTitle', locale)}</span>
        <button type="button" onClick={props.onClose} aria-label="Kapat">
          ×
        </button>
      </div>

      <div className="mascot-chat-messages">
        {messages.map((message, index) => (
          <p key={index} className={`mascot-chat-message mascot-chat-message-${message.role}`}>
            {message.content}
          </p>
        ))}
        {isLoading && <p className="mascot-chat-message mascot-chat-message-assistant mascot-chat-loading">...</p>}
      </div>

      {messages.length === 1 && !isLoading && (
        <div className="mascot-chat-suggestions">
          {SUGGESTION_KEYS.map((key) => (
            <button key={key} type="button" onClick={() => send(translate(key, locale))}>
              {translate(key, locale)}
            </button>
          ))}
        </div>
      )}

      <form className="mascot-chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={translate('mascotChatPlaceholder', locale)}
        />
        <button type="submit" disabled={isLoading}>
          {translate('mascotChatSend', locale)}
        </button>
      </form>
    </div>
  )
}
