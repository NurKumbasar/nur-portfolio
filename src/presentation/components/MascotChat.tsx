import { useState, type FormEvent } from 'react'
import { useLocale } from '../../application/state/LocaleContext'
import { translate } from '../i18n/translations'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export function MascotChat(props: { onClose: () => void }) {
  const { locale } = useLocale()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: translate('mascotChatGreeting', locale) },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!response.ok) throw new Error('request failed')

      const data = (await response.json()) as { reply: string }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: translate('mascotChatError', locale) }])
    } finally {
      setIsLoading(false)
    }
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
