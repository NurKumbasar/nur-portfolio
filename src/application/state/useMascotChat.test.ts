import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ChatService } from '../../domain/ports/ChatService'
import { useMascotChat } from './useMascotChat'

const texts = { greeting: 'Merhaba!', error: 'Hata oldu' }

describe('useMascotChat', () => {
  it('karşılama mesajıyla başlar', () => {
    const service: ChatService = { reply: vi.fn() }
    const { result } = renderHook(() => useMascotChat(service, texts))
    expect(result.current.messages).toEqual([{ role: 'assistant', content: 'Merhaba!' }])
    expect(result.current.isLoading).toBe(false)
  })

  it('kullanıcı mesajını ve servisin cevabını ekler, servise tüm geçmişi verir', async () => {
    const reply = vi.fn().mockResolvedValue('Selam!')
    const { result } = renderHook(() => useMascotChat({ reply }, texts))

    await act(async () => {
      await result.current.sendMessage('  Nasılsın?  ')
    })

    expect(reply).toHaveBeenCalledWith([
      { role: 'assistant', content: 'Merhaba!' },
      { role: 'user', content: 'Nasılsın?' },
    ])
    expect(result.current.messages.at(-1)).toEqual({ role: 'assistant', content: 'Selam!' })
    expect(result.current.isLoading).toBe(false)
  })

  it('boş mesajı göndermez', async () => {
    const reply = vi.fn()
    const { result } = renderHook(() => useMascotChat({ reply }, texts))
    await act(async () => {
      await result.current.sendMessage('   ')
    })
    expect(reply).not.toHaveBeenCalled()
    expect(result.current.messages).toHaveLength(1)
  })

  it('servis hata verirse hata metnini gösterir ve yüklenmeyi bitirir', async () => {
    const reply = vi.fn().mockRejectedValue(new Error('ağ yok'))
    const { result } = renderHook(() => useMascotChat({ reply }, texts))

    await act(async () => {
      await result.current.sendMessage('Selam')
    })

    expect(result.current.messages.at(-1)).toEqual({ role: 'assistant', content: 'Hata oldu' })
    expect(result.current.isLoading).toBe(false)
  })

  it('cevap beklerken ikinci bir mesaj göndermeyi engeller', async () => {
    let resolveReply: (value: string) => void = () => {}
    const reply = vi.fn().mockReturnValue(new Promise<string>((r) => (resolveReply = r)))
    const { result } = renderHook(() => useMascotChat({ reply }, texts))

    act(() => {
      void result.current.sendMessage('ilk')
    })
    await waitFor(() => expect(result.current.isLoading).toBe(true))

    await act(async () => {
      await result.current.sendMessage('ikinci')
    })
    expect(reply).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveReply('tamam')
    })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })
})
