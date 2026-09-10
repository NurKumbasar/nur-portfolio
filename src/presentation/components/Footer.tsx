import { profile } from '../../infrastructure/content/profile'
import { GithubIcon, LinkedinIcon, MailIcon } from './SocialIcons'

// Hero'daki sosyal linklerin bir kopyası — sayfayı sonuna kadar okuyan
// birinin tekrar en yukarı çıkmadan da GitHub/LinkedIn/e-postaya
// ulaşabilmesi için.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-social">
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-link">
          <GithubIcon />
        </a>
        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-link">
          <LinkedinIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="E-posta" className="icon-link">
          <MailIcon />
        </a>
      </div>
      <p className="footer-signature">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}
