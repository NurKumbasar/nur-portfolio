import type { Education } from '../../domain/entities/Education'

export function EducationCard(props: {education : Education}) {
    return (
        <div className="glass-card">
            <h3>{props.education.degree}</h3>
            <p>{props.education.institution}</p>
            <p>{props.education.location}</p>
            <p>{props.education.period}</p>
        </div>
    )
}