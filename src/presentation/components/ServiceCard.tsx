import type { Service } from '../../domain/entities/Service'

export function ServiceCard(props: { service: Service }) {
  return (
    <div className="glass-card">
      <h3>{props.service.title}</h3>
      <p>{props.service.description}</p>
      <div>
        {props.service.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
