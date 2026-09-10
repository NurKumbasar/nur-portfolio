import type { ContactMessage } from '../../domain/entities/ContactMessage'
import type { MessageSender } from '../../domain/ports/MessageSender'

const FORMSPREE_URL = 'https://formspree.io/f/myeyowjn'

/**
 * `MessageSender` sözleşmesinin Formspree'yi kullanan gerçek hâli.
 * `fetch` = tarayıcının "başka bir sunucuya istek gönder" komutu.
 * `async`/`await` = "bu işlem zaman alabilir, sonucunu bekle" demek.
 */
export const formspreeMessageSender: MessageSender = {
  async send(message: ContactMessage) {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error('Mesaj gönderilemedi')
    }
  },
}
