import { useLocale } from '../../application/state/LocaleContext'
import { profile } from '../../infrastructure/content/profile'
import { translate } from '../i18n/translations'
import { TerminalIntro } from './TerminalIntro'

export function Hero() {
  const { locale } = useLocale()

  return (
    <section className="hero" id="hero">
      <div className="hero-grid">
        <p className="hero-status">
          <span className="hero-status-dot" />
          {translate('heroStatus', locale)}
        </p>

        {/* hero-copy'nin (aşağıda) 640px sınırının DIŞINDA — isim geniş
            bir tek satır olarak yayılabilsin diye, sadece hero-grid'in
            (yani .hero'nun) genişliğiyle sınırlı. */}
        <h1 className="hero-name">{profile.name}</h1>

        <div className="hero-copy">
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
    </section>
  )
}
