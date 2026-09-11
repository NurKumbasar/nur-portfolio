import { useEffect, useMemo, useState } from 'react'
import { useLocale } from '../../application/state/LocaleContext'
import { profile } from '../../infrastructure/content/profile'
import { translate } from '../i18n/translations'

type Segment = { kind: 'prompt' | 'output'; text: string }

const TYPE_SPEED_MS = 26
const SEGMENT_PAUSE_MS = 350

// Hero'daki metni düz paragraflar yerine, karakter karakter "yazılan"
// bir terminal penceresi gibi gösteriyor — sitenin zaten var olan
// terminal kimliğini (navbar'daki ~/nur-kumbasar, #hashtag linkler,
// bölüm başlıklarındaki $ işareti) hero'ya kadar taşıyor.
export function TerminalIntro() {
  const { locale } = useLocale()

  const segments: Segment[] = useMemo(
    () => [
      { kind: 'prompt', text: 'whoami' },
      { kind: 'output', text: profile.role[locale] },
      { kind: 'prompt', text: 'cat intro.txt' },
      { kind: 'output', text: translate('heroTagline', locale) },
    ],
    [locale],
  )

  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // `doneCount` kaç segmentin tamamen yazıldığını, `charCount` o an
  // yazılmakta olan segmentin kaç karakterinin göründüğünü tutuyor.
  // Dil değişince (locale) efekt baştan başlıyor.
  const [doneCount, setDoneCount] = useState(prefersReducedMotion ? segments.length : 0)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDoneCount(segments.length)
      return
    }
    setDoneCount(0)
    setCharCount(0)
  }, [locale, prefersReducedMotion, segments.length])

  useEffect(() => {
    if (prefersReducedMotion || doneCount >= segments.length) return

    const target = segments[doneCount].text
    if (charCount < target.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED_MS)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setDoneCount((d) => d + 1)
      setCharCount(0)
    }, SEGMENT_PAUSE_MS)
    return () => clearTimeout(timer)
  }, [charCount, doneCount, prefersReducedMotion, segments])

  const isTyping = doneCount < segments.length

  return (
    <div className="terminal glass-card" aria-hidden="true">
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
      </div>
      <div className="terminal-body">
        {segments.slice(0, doneCount + (isTyping ? 1 : 0)).map((segment, index) => {
          const isCurrent = index === doneCount
          const text = isCurrent ? segment.text.slice(0, charCount) : segment.text
          return (
            <p key={index} className={`terminal-line terminal-line-${segment.kind}`}>
              {segment.kind === 'prompt' && <span className="terminal-prompt-sign">$</span>}
              {text}
              {isCurrent && <span className="terminal-cursor" />}
            </p>
          )
        })}
      </div>
    </div>
  )
}
