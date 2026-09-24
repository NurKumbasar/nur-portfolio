import { useContent } from '../../application/state/useContent'
import { useLocale } from '../../application/state/useLocale'
import { translate } from '../i18n/translations'
import { SkillCard } from './SkillCard'

export function SkillsSection() {
  const { locale } = useLocale()
  const content = useContent()
  return (
    <section className="section" id="skills">
      <h2 className="section-title">{translate('skillsTitle', locale)}</h2>
      <div className="grid">
        {content.getSkillCategories(locale).map((category) => (
          <SkillCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  )
}
