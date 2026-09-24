import { useContent } from '../../application/state/useContent'
import { useLocale } from '../../application/state/useLocale'
import { translate } from '../i18n/translations'
import { LanguageCard } from './LanguageCard'

export function LanguagesSection() {
  const { locale } = useLocale()
  const content = useContent()
  return (
    <section className="section" id="languages">
      <h2 className="section-title">{translate('languagesTitle', locale)}</h2>
      <div className="grid">
        {content.getLanguages(locale).map((language) => (
          <LanguageCard key={language.name} language={language} />
        ))}
      </div>
    </section>
  )
}
