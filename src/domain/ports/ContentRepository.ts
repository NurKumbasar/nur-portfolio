import type { Education } from '../entities/Education'
import type { Experience } from '../entities/Experience'
import type { Language } from '../entities/Language'
import type { Locale } from '../entities/Locale'
import type { Profile } from '../entities/Profile'
import type { Project } from '../entities/Project'
import type { Service } from '../entities/Service'
import type { SkillCategory } from '../entities/SkillCategory'

/**
 * "Sitenin içeriğini getirebilen bir şey" sözleşmesi. İçeriğin kod içindeki
 * bir dosyadan mı, JSON'dan mı, bir CMS'ten mi geldiğini bu dosya bilmez —
 * bilmemeli. Görünüm katmanı sadece bu arayüzle konuşur.
 */
export interface ContentRepository {
  getProfile(): Profile
  getExperiences(locale: Locale): Experience[]
  getEducations(locale: Locale): Education[]
  getSkillCategories(locale: Locale): SkillCategory[]
  getProjects(locale: Locale): Project[]
  getServices(locale: Locale): Service[]
  getLanguages(locale: Locale): Language[]
}
