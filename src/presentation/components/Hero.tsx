import { useLocale } from '../../application/state/LocaleContext'
import { profile } from '../../infrastructure/content/profile'
import { translate } from '../i18n/translations'
import { ParticleField } from './ParticleField'

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
          <p className="hero-role">{profile.role[locale]}</p>
          <p className="hero-bio">{translate('heroTagline', locale)}</p>

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
