import type { ContentRepository } from '../../domain/ports/ContentRepository'
import { educations } from './educations'
import { experiences } from './experiences'
import { languages } from './languages'
import { profile } from './profile'
import { projects } from './projects'
import { services } from './services'
import { skillCategories } from './skillCategories'

/**
 * `ContentRepository` sözleşmesinin, içeriği bu klasördeki TypeScript
 * dosyalarından okuyan hâli. Yarın içerik bir CMS'ten gelecekse sadece bu
 * dosyanın yerine yenisini yazmak yeterli — görünüm katmanı değişmez.
 */
export const staticContentRepository: ContentRepository = {
  getProfile: () => profile,
  getExperiences: (locale) => experiences[locale],
  getEducations: (locale) => educations[locale],
  getSkillCategories: (locale) => skillCategories[locale],
  getProjects: (locale) => projects[locale],
  getServices: (locale) => services[locale],
  getLanguages: (locale) => languages[locale],
}
