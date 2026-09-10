import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ContactMessage } from '../../domain/entities/ContactMessage'
import type { MessageSender } from '../../domain/ports/MessageSender'
import { useContactForm } from './useContactForm'

function fakeSender(shouldFail = false): MessageSender & { received: ContactMessage[] } {
  return {
    received: [] as ContactMessage[],
    async send(message) {
      if (shouldFail) throw new Error('gönderim hatası')
      this.received.push(message)
    },
  }
}

describe('useContactForm', () => {
  it('alan güncellemeleri state\'e yansır', () => {
    const { result } = renderHook(() => useContactForm(fakeSender()))

    act(() => {
      result.current.setName('Nur')
      result.current.setEmail('nur@example.com')
    })

    expect(result.current.name).toBe('Nur')
    expect(result.current.email).toBe('nur@example.com')
  })

  it('başarılı gönderimde status success olur ve sender çağrılır', async () => {
    const sender = fakeSender()
    const { result } = renderHook(() => useContactForm(sender))

    act(() => {
      result.current.setName('Nur')
      result.current.setEmail('nur@example.com')
      result.current.setTopic('Merhaba')
      result.current.setMessage('Test mesajı')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.status).toBe('success')
    expect(sender.received).toEqual([
      { name: 'Nur', email: 'nur@example.com', topic: 'Merhaba', message: 'Test mesajı' },
    ])
    // Form gönderildikten sonra alanlar temizlenmeli
    expect(result.current.name).toBe('')
    expect(result.current.email).toBe('')
    expect(result.current.topic).toBe('')
    expect(result.current.message).toBe('')
  })

  it('gönderim başarısız olursa status error olur', async () => {
    const { result } = renderHook(() => useContactForm(fakeSender(true)))

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.status).toBe('error')
  })
})
