import { useState } from 'react'
import type { ChatMessage } from '../../domain/entities/ChatMessage'
import type { ChatService } from '../../domain/ports/ChatService'

/**
 * Maskot sohbetinin durumu ve akışı: mesaj listesi, "cevap bekleniyor"
 * bilgisi ve gönderme. Cevabın nereden geldiğini bilmez — `ChatService`
 * arayüzü üzerinden ister; bu yüzden testte sahte bir servisle denenebilir.
 * Karşılama ve hata metinleri dile bağlı olduğu için görünüm katmanından
 * (translate ile) parametre olarak geliyor.
 */
export function useMascotChat(service: ChatService, texts: { greeting: string; error: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: texts.greeting }])
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(content: string) {
    const trimmed = content.trim()
    if (!trimmed || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const reply = await service.reply(nextMessages)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: texts.error }])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, isLoading, sendMessage }
}
