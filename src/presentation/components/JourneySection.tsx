import { useLocale } from '../../application/state/LocaleContext'
import { educations } from '../../infrastructure/content/educations'
import { experiences } from '../../infrastructure/content/experiences'
import { translate } from '../i18n/translations'
import { EducationCard } from './EducationCard'
import { ExperienceCard } from './ExperienceCard'

// Deneyim ve Eğitim, düz bir çizgi yerine solda kıvrılan bir "yol"
// eşliğinde tek sütunda akıyor. Yol, tekrar eden bir S eğrisinin
// (<pattern>) alt alta dizilmesiyle çiziliyor.
export function JourneySection() {
  const { locale } = useLocale()

  return (
    <section className="section" id="journey">
      <h2 className="section-title">{translate('journeyTitle', locale)}</h2>

      <div className="road">
        <div className="road-line" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="road-wave" width="40" height="160" patternUnits="userSpaceOnUse">
                <path
                  className="road-path"
                  d="M20 0 C 4 25, 4 55, 20 80 C 36 105, 36 135, 20 160"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray="1 14"
                  strokeLinecap="round"
                />
              </pattern>
            </defs>
            <rect width="40" height="100%" fill="url(#road-wave)" />
          </svg>
        </div>

        <p className="road-label">{translate('experienceTitle', locale)}</p>
        {experiences[locale].map((experience) => (
          <div className="road-item" key={experience.company + experience.period}>
            <span className="road-dot" />
            <div className="road-card">
              <ExperienceCard experience={experience} />
            </div>
          </div>
        ))}

        <p className="road-label">{translate('educationTitle', locale)}</p>
        {educations[locale].map((education) => (
          <div className="road-item" key={education.institution + education.period}>
            <span className="road-dot" />
            <div className="road-card">
              <EducationCard education={education} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
