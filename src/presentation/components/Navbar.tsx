import { useLocale } from '../../application/state/LocaleContext'
import { translate } from '../i18n/translations'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { locale } = useLocale()

  return (
    <nav className="navbar">
      <a href="#hero" className="navbar-logo">
        ~/nur-kumbasar
      </a>

      <div className="navbar-links">
        <a href="#services">{translate('servicesTitle', locale)}</a>
        <a href="#journey">{translate('journeyTitle', locale)}</a>
        <a href="#skills">{translate('skillsTitle', locale)}</a>
        <a href="#projects">{translate('projectsTitle', locale)}</a>
        <a href="#languages">{translate('languagesTitle', locale)}</a>
        <a href="#contact">{translate('contactTitle', locale)}</a>
      </div>

      <div className="navbar-controls">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </nav>
  )
}
