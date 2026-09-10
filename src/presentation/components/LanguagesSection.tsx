import { useLocale } from '../../application/state/LocaleContext'
import { languages } from '../../infrastructure/content/languages'
import { translate } from '../i18n/translations'
import { LanguageCard } from './LanguageCard'

export function LanguagesSection() {
  const { locale } = useLocale()
  return (
    <section className="section" id="languages">
      <h2 className="section-title">{translate('languagesTitle', locale)}</h2>
      <div className="grid">
        {languages[locale].map((language) => (
          <LanguageCard key={language.name} language={language} />
        ))}
      </div>
    </section>
  )
}
