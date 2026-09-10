import type { Project } from '../../domain/entities/Project'

export function ProjectCard(props: { project: Project }) {
  return (
    <div className="glass-card">
      <h3>{props.project.title}</h3>
      <div>
        {props.project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p>{props.project.description}</p>
    </div>
  )
}
