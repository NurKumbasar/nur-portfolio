import { useLocale } from '../../application/state/LocaleContext'
import type { Project } from '../../domain/entities/Project'
import { translate } from '../i18n/translations'
import { ExternalLinkIcon, GithubIcon, LockIcon } from './SocialIcons'

export function ProjectCard(props: { project: Project }) {
  const { locale } = useLocale()
  const { githubUrl, demoUrl, note } = props.project

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

      {(githubUrl || demoUrl) && (
        <div className="project-links">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <GithubIcon />
              {translate('projectCode', locale)}
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLinkIcon />
              {translate('projectDemo', locale)}
            </a>
          )}
        </div>
      )}

      {/* Link yoksa, boş bırakmak yerine nedenini söylüyoruz — "unutulmuş"
          değil, bilinçli bir tercih olduğu anlaşılsın diye. */}
      {!githubUrl && !demoUrl && note && (
        <p className="project-note">
          <LockIcon />
          {note}
        </p>
      )}
    </div>
  )
}
