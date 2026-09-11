import { useLocale } from '../../application/state/LocaleContext'
import { profile } from '../../infrastructure/content/profile'
import { translate } from '../i18n/translations'
import { ParticleField } from './ParticleField'
import { TerminalIntro } from './TerminalIntro'

export function Hero() {
  const { locale } = useLocale()

  return (
    <section className="hero" id="hero">
      <ParticleField />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-status">
            <span className="hero-status-dot" />
            {translate('heroStatus', locale)}
          </p>
          <h1 className="hero-name">{profile.name}</h1>

          {/* TerminalIntro yazma animasyonu dekoratif (aria-hidden) —
              aynı içeriği ekran okuyucular için burada düz metin olarak
              tutuyoruz ki animasyon yüzünden kaybolmasın. */}
          <p className="sr-only">
            {profile.role[locale]}. {translate('heroTagline', locale)}
          </p>
          <TerminalIntro />

          <div className="hero-actions">
            <a href="#contact" className="button-like">
              {translate('heroContactCta', locale)}
            </a>
          </div>
        </div>

        {/* Maskot artık burada değil — App.tsx'te sabit (fixed) konumlu,
            tüm sayfada sürüklenebilir. Bu boş kutu sadece iki sütunlu
            grid oranını (metin/görsel) korumak için duruyor. */}
        <div className="hero-visual" aria-hidden="true" />
      </div>
    </section>
  )
}
