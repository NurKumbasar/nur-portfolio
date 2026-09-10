import { useLocale } from '../application/state/LocaleContext'
import type { MessageSender } from '../domain/ports/MessageSender'
import { AuroraBackground } from './components/AuroraBackground'
import { ContactForm } from './components/ContactForm'
import { Hero } from './components/Hero'
import { JourneySection } from './components/JourneySection'
import { LanguagesSection } from './components/LanguagesSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { Reveal } from './components/Reveal'
import { ServicesSection } from './components/ServicesSection'
import { SkillsSection } from './components/SkillsSection'
import { translate } from './i18n/translations'

function App(props: { messageSender: MessageSender }) {
  const { locale } = useLocale()
  return (
    <>
      <AuroraBackground />
      <Navbar />
      <main className="container">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <ServicesSection />
        </Reveal>
        <Reveal>
          <JourneySection />
        </Reveal>
        <Reveal>
          <SkillsSection />
        </Reveal>
        <Reveal>
          <ProjectsSection />
        </Reveal>
        <Reveal>
          <LanguagesSection />
        </Reveal>
        <Reveal>
          <section className="section" id="contact">
            <h2 className="section-title">{translate('contactTitle', locale)}</h2>
            <ContactForm sender={props.messageSender} />
          </section>
        </Reveal>
      </main>
    </>
  )
}

export default App
