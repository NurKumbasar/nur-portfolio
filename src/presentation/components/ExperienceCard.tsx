import { useLocale } from '../../application/state/LocaleContext'
import type { Experience } from '../../domain/entities/Experience'
import { translate } from '../i18n/translations'

export function ExperienceCard(props: { experience: Experience; isCurrent?: boolean }) {
    const { locale } = useLocale()
    return (
        <div className={`glass-card${props.isCurrent ? ' glass-card-current' : ''}`}>
            <h3>
                {props.experience.role}
                {props.isCurrent && <span className="current-badge">{translate('journeyCurrentBadge', locale)}</span>}
            </h3>
            <p>{props.experience.company} — {props.experience.location}</p>
            <p>{props.experience.period}</p>
            <ul>
                {props.experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                ))}
            </ul>
        </div>
    )
}
