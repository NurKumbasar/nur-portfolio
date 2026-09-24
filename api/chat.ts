import type { VercelRequest, VercelResponse } from '@vercel/node'

// Bu dosya tarayıcıda ÇALIŞMAZ — Vercel bunu bir sunucu fonksiyonu olarak
// deploy ediyor. GROQ_API_KEY sadece burada, sunucu tarafında okunuyor;
// tarayıcıya giden kodda hiç görünmüyor.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'openai/gpt-oss-20b'

// Maskotun kimliği ve Nur hakkındaki gerçek bilgiler — kullanıcı bunu
// hiç görmüyor, her istekte mesajların başına ekleniyor. Kaynak:
// src/infrastructure/content/ altındaki profile/education/experience/
// skill/project dosyaları.
const SYSTEM_PROMPT = `Sen "Nuriş" adında, Nur Kumbasar'ın kişisel portföy sitesinde yaşayan sevimli ve esprili bir dijital maskotsun.

Nur hakkında bildiklerin:
- Kadir Has Üniversitesi'nde Bilgisayar Mühendisliği okuyor (2023-2027, %50 burslu), İzmir Çiğli Fen Lisesi mezunu (93.4/100 ortalama).
- Programlama dilleri: C++, Java, C#, .NET. Araçlar: Git, GitHub, MySQL, SQL Server, Wireshark, MATLAB, Simulink, AutoCAD.
- Stajlar: KoçSistem'de Ürün ve Yazılım Geliştirme Stajyeri (React, TypeScript, ASP.NET Core, Entity Framework Core, TDD, Microsoft Entra ID); Extra360'ta QA Stajyeri; Social Office'te BT Stajyeri; SCA Social'da Proje Yönetimi Stajyeri.
- Projeler: IT Solution Hub (React/TypeScript/ASP.NET Core), GreenGrocer market yönetim sistemi (Java/JavaFX/MySQL), flip-flop tabanlı RAM tasarımı (MATLAB Simulink), C++ ile veri yapıları & algoritmalar.
- İletişim: github.com/NurKumbasar, linkedin.com/in/nur-kumbasar, nurkumbsr@gmail.com.

Kurallar:
- Kısa cevap ver (1-4 cümle).
- Kullanıcının yazdığı dilde cevap ver (Türkçe sorulursa Türkçe, İngilizce sorulursa İngilizce).
- Sadece Nur, portföy veya genel/samimi sohbetle ilgili konuş; bilmediğin bir şey sorulursa uydurma, bilmediğini söyle.
- Kendini asla bir yapay zeka veya dil modeli olarak tanıtma — sen Nuriş'sin.`

// Bakiyeyi korumak için sıkı sınırlar: kısa cevap, kısa geçmiş, kısa mesaj.
const MAX_TOKENS = 180
const MAX_HISTORY = 6
const MAX_MESSAGE_LENGTH = 500
const GROQ_TIMEOUT_MS = 15_000

// Başka bir sitenin (tarayıcıda) bu adresi kendi sayfasından çağırmasını
// engeller. DİKKAT: Origin header'ını tarayıcı dışındaki bir program (curl,
// script) istediği gibi yazabilir, yani bu kontrol tek başına bir bot
// koruması DEĞİL. Asıl koruma katmanları aşağıdaki hız sınırı, kısa
// cevap/mesaj limitleri ve Groq'un kendi ücretsiz plan limitleridir.
const ALLOWED_ORIGINS = new Set([
  'https://nurkumbasar.com',
  'https://www.nurkumbasar.com',
  'https://nur-portfolio-mu.vercel.app',
  'http://localhost:5173',
])

// Vercel her deploy'da farklı bir önizleme adresi üretiyor
// (nur-portfolio-<rastgele>-nur-05d1.vercel.app gibi) — hepsini tek tek
// listeye eklemek yerine, kendi takım alanının altındaki her adrese izin
// veriyoruz. Başka biri bu adı taklit edemez, çünkü *.vercel.app'in bu
// alt kısmı Vercel tarafından sadece bu takıma ayrılmış.
const OWN_TEAM_SUFFIX = '-nur-05d1.vercel.app'

function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.has(origin) || origin.endsWith(OWN_TEAM_SUFFIX)
}

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

type ChatRole = 'user' | 'assistant'
type ChatMessage = { role: ChatRole; content: string }

// Tarayıcıdan gelen mesajlara GÜVENMİYORUZ: biri `role: 'system'` yollayıp
// maskotun talimatlarını değiştirmeye çalışabilir. Sadece 'user' ve
// 'assistant' rollerini, metin içeren mesajları alıyoruz; gerisini atıyoruz.
function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return []
  return input
    .filter(
      (m): m is { role: ChatRole; content: string } =>
        typeof m === 'object' &&
        m !== null &&
        ((m as { role?: unknown }).role === 'user' || (m as { role?: unknown }).role === 'assistant') &&
        typeof (m as { content?: unknown }).content === 'string',
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const origin = req.headers.origin ?? ''
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ error: 'forbidden origin' })
    return
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'rate limited' })
    return
  }

  const history = sanitizeMessages((req.body as { messages?: unknown } | undefined)?.messages)
  if (history.length === 0) {
    res.status(400).json({ error: 'invalid body' })
    return
  }

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }, ...history]

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'server misconfigured' })
    return
  }

  // Groq yanıt vermezse fonksiyon sonsuza kadar asılı kalmasın, ağ hatası
  // da yakalanmamış bir çökme yerine düzgün bir 502'ye dönüşsün.
  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: MAX_TOKENS }),
      signal: AbortSignal.timeout(GROQ_TIMEOUT_MS),
    })

    if (!groqRes.ok) {
      res.status(502).json({ error: 'groq request failed' })
      return
    }

    const data = (await groqRes.json()) as { choices?: { message?: { content?: string } }[] }
    const reply = data.choices?.[0]?.message?.content
    if (!reply) {
      res.status(502).json({ error: 'empty reply' })
      return
    }
    res.status(200).json({ reply })
  } catch {
    res.status(502).json({ error: 'groq request failed' })
  }
}
