import { useContent } from '../../application/state/useContent'
import { useLocale } from '../../application/state/useLocale'
import { translate } from '../i18n/translations'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  const { locale } = useLocale()
  const content = useContent()
  return (
    <section className="section" id="services">
      <h2 className="section-title">{translate('servicesTitle', locale)}</h2>
      <p className="section-subtitle">{translate('servicesSubtitle', locale)}</p>
      <div className="grid">
        {content.getServices(locale).map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
}
