import { useContent } from '../../application/state/useContent'
import { useLocale } from '../../application/state/useLocale'
import { translate } from '../i18n/translations'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  const { locale } = useLocale()
  const content = useContent()
  return (
    <section className="section" id="projects">
      <h2 className="section-title">{translate('projectsTitle', locale)}</h2>
      <div className="grid">
        {content.getProjects(locale).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
