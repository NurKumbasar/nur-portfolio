import { useLocale } from '../../application/state/LocaleContext'
import { skillCategories } from '../../infrastructure/content/skillCategories'
import { translate } from '../i18n/translations'
import { SkillCard } from './SkillCard'

export function SkillsSection() {
  const { locale } = useLocale()
  return (
    <section className="section" id="skills">
      <h2 className="section-title">{translate('skillsTitle', locale)}</h2>
      <div className="grid">
        {skillCategories[locale].map((category) => (
          <SkillCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  )
}
