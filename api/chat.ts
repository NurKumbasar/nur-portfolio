import type { VercelRequest, VercelResponse } from '@vercel/node'

// Bu dosya tarayıcıda ÇALIŞMAZ — Vercel bunu bir sunucu fonksiyonu olarak
// deploy ediyor. GROQ_API_KEY sadece burada, sunucu tarafında okunuyor;
// tarayıcıya giden kodda hiç görünmüyor.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'openai/gpt-oss-20b'

// Bakiyeyi korumak için sıkı sınırlar: kısa cevap, kısa geçmiş, kısa mesaj.
const MAX_TOKENS = 180
const MAX_HISTORY = 6
const MAX_MESSAGE_LENGTH = 500

// Sadece kendi sitenden gelen isteklere izin ver — rastgele bir bot bu
// adrese direkt istek atarsa Origin header'ı eşleşmeyeceği için reddedilir.
const ALLOWED_ORIGINS = new Set([
  'https://nurkumbasar.com',
  'https://www.nurkumbasar.com',
  'https://nur-portfolio-mu.vercel.app',
  'http://localhost:5173',
])

// Dakikada IP başına kaç istek. Fonksiyon "soğuk" başladığında bu liste
// sıfırlanır, yani mükemmel bir koruma değil — ama ucuz bir ilk savunma
// hattı. Asıl garanti Groq'un kendi ücretsiz plan limitleri (console.groq.com).
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  requestLog.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

type IncomingMessage = { role: 'user' | 'assistant'; content: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const origin = req.headers.origin ?? ''
  if (!ALLOWED_ORIGINS.has(origin)) {
    res.status(403).json({ error: 'forbidden origin' })
    return
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'rate limited' })
    return
  }

  const body = req.body as { messages?: IncomingMessage[] }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    res.status(400).json({ error: 'invalid body' })
    return
  }

  const messages = body.messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
  }))

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'server misconfigured' })
    return
  }

  const groqRes = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: MODEL, messages, max_tokens: MAX_TOKENS }),
  })

  if (!groqRes.ok) {
    res.status(502).json({ error: 'groq request failed' })
    return
  }

  const data = (await groqRes.json()) as { choices: { message: { content: string } }[] }
  res.status(200).json({ reply: data.choices[0].message.content })
}
