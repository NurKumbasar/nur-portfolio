import type { Experience } from '../../domain/entities/Experience'

export function ExperienceCard(props: { experience: Experience }) {
    return (
        <div className="glass-card">
            <h3>{props.experience.role}</h3>
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
