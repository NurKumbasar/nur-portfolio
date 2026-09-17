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
            <a href="#projects" className="button-like">
              {translate('heroProjectsCta', locale)}
            </a>
            <a href="#contact" className="button-like button-like-outline">
              {translate('heroContactCta', locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Hero'nun altındaki büyük boş alanı doldurmak ve bir sonraki
          bölüme göz teması kurmak için — sahte istatistik satırı yerine
          (öğrenci profiline abartılı gelir) sade bir "aşağı kaydır"
          ipucu. Hero'nun kendisine göre en altta sabit, içerik
          yüksekliğinden bağımsız. */}
      <a href="#services" className="hero-scroll-cue" aria-label={translate('heroScrollCue', locale)}>
        <span className="hero-scroll-cue-text">{translate('heroScrollCue', locale)}</span>
        <span className="hero-scroll-cue-chevron" aria-hidden="true" />
      </a>
    </section>
  )
}
