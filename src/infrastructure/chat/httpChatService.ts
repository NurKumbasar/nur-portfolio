import type { ChatMessage } from '../../domain/entities/ChatMessage'
import type { ChatService } from '../../domain/ports/ChatService'

/**
 * `ChatService` sözleşmesinin, sitenin kendi sunucu fonksiyonuna
 * (`api/chat.ts`) istek atan hâli. API anahtarı tarayıcıya hiç gelmiyor;
 * o sadece sunucu tarafında.
 */
export const httpChatService: ChatService = {
  async reply(messages: ChatMessage[]) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error(`Sohbet isteği başarısız: ${response.status}`)
    }

    const data = (await response.json()) as { reply: string }
    return data.reply
  },
}
