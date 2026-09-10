import { useLocale } from '../../application/state/LocaleContext'
import { projects } from '../../infrastructure/content/projects'
import { translate } from '../i18n/translations'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  const { locale } = useLocale()
  return (
    <section className="section" id="projects">
      <h2 className="section-title">{translate('projectsTitle', locale)}</h2>
      <div className="grid">
        {projects[locale].map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
