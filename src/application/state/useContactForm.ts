import { useState } from 'react'
import type { MessageSender } from '../../domain/ports/MessageSender'

// `useState('')` = "bu değeri hatırla, değiştiğinde ekranı yeniden çiz."
// Normal bir `const` yeterli olmazdı çünkü input'a her harf yazışında
// component'in bunu FARK EDİP ekranı güncellemesi gerekiyor — `useState`
// tam olarak bunu sağlıyor. `[name, setName]`: `name` = şu anki değer,
// `setName` = değeri değiştirmek için kullandığın fonksiyon.
type Status = 'idle' | 'sending' | 'success' | 'error'

export function useContactForm(sender: MessageSender) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function submit() {
    setStatus('sending')
    try {
      await sender.send({ name, email, topic, message })
      setStatus('success')
      // Başarılı gönderimden sonra formu temizle — kullanıcı yazdıklarının
      // gittiğini görsün, ekranda eski metin kalmasın.
      setName('')
      setEmail('')
      setTopic('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    topic,
    setTopic,
    message,
    setMessage,
    status,
    submit,
  }
}
