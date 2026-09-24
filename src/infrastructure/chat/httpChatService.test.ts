import { afterEach, describe, expect, it, vi } from 'vitest'
import { httpChatService } from './httpChatService'

describe('httpChatService', () => {
  afterEach(() => vi.unstubAllGlobals())

  it("mesajları /api/chat'e POST eder ve cevabı döner", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ reply: 'Selam' }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const messages = [{ role: 'user' as const, content: 'Merhaba' }]
    await expect(httpChatService.reply(messages)).resolves.toBe('Selam')

    expect(fetchMock).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })
  })

  it('başarısız yanıtta hata fırlatır', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('x', { status: 429 })))
    await expect(httpChatService.reply([{ role: 'user', content: 'a' }])).rejects.toThrow('429')
  })
})
