// Groq'a (ücretsiz, çok hızlı bir LLM servisi) tek bir istek atıp cevabı
// ekrana basan en küçük örnek. Amaç: "API'ye istek atmak" ne demekmiş,
// onu görmek — henüz siteyle bir ilgisi yok.
//
// Çalıştırmadan önce terminalde (kendi API key'inle):
//   GROQ_API_KEY=senin_key_in npx tsx src/learn/09-groq-api-pratigi.ts
//
// `GROQ_API_KEY=...` kısmı sadece bu komutun çalıştığı anda geçerli bir
// ortam değişkeni tanımlıyor — dosyanın içine yazmadığımız için kod
// yanlışlıkla GitHub'a gitse bile key sızmıyor.

const apiKey = process.env.GROQ_API_KEY

if (!apiKey) {
  console.error('GROQ_API_KEY bulunamadı. Komutu şöyle çalıştır:')
  console.error('GROQ_API_KEY=senin_key_in npx tsx src/learn/09-groq-api-pratigi.ts')
  process.exit(1)
}

// fetch = tarayıcıda da, Node'da da olan, "başka bir sunucuya istek at"
// fonksiyonu. Groq'un API'si OpenAI ile aynı şekilde çalışıyor: bir
// `messages` listesi gönderiyoruz, model de bir cevap üretiyor.
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-oss-20b',
    messages: [{ role: 'user', content: 'Merhaba! Sen kimsin, tek cümlede tanıt.' }],
  }),
})

if (!response.ok) {
  console.error('İstek başarısız:', response.status, await response.text())
  process.exit(1)
}

const data = await response.json()
console.log('Modelin cevabı:', data.choices[0].message.content)
