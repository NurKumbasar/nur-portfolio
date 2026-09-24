import type { ChatMessage } from '../entities/ChatMessage'

/**
 * "Bir konuşma geçmişi verilince bir cevap üretebilen bir şey" sözleşmesi.
 * Cevabın Groq'tan mı, başka bir modelden mi, sahte bir servisten mi
 * geldiğini bu dosya bilmez. Başarısız olursa hata fırlatır.
 */
export interface ChatService {
  reply(messages: ChatMessage[]): Promise<string>
}
