import type { Language } from '../../domain/entities/Language'

export function LanguageCard(props: { language: Language }) {
  return (
    <div className="glass-card">
      <h3>{props.language.name}</h3>
      <p>{props.language.level}</p>
    </div>
  )
}
