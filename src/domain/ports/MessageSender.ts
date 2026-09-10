import type { ContactMessage } from '../entities/ContactMessage'

/**
 * "Bir mesajı gönderebilen bir şey" sözleşmesi. Formspree mi, e-posta mı,
 * başka bir servis mi olduğunu bu dosya bilmez — bilmemeli.
 */
export interface MessageSender {
  send(message: ContactMessage): Promise<void>
}
