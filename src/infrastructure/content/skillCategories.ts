import type { Locale } from '../../domain/entities/Locale'
import type { SkillCategory } from '../../domain/entities/SkillCategory'

// Gerçek yetenek verisi — güncel CV'den taşındı, dile göre `skillCategories[locale]`.
export const skillCategories: Record<Locale, SkillCategory[]> = {
  tr: [
    {
      title: 'Programlama Dilleri',
      skills: ['C++', 'Java', 'C#', '.NET'],
    },
    {
      title: 'Araçlar & Teknolojiler',
      skills: ['Git', 'GitHub', 'MySQL', 'SQL Server', 'Wireshark', 'MATLAB', 'Simulink', 'AutoCAD'],
    },
    {
      title: 'Kavramlar',
      skills: ['Nesne Yönelimli Programlama (OOP)', 'Yazılım Testi ve Kalite Güvencesi'],
    },
  ],
  en: [
    {
      title: 'Programming Languages',
      skills: ['C++', 'Java', 'C#', '.NET'],
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'MySQL', 'SQL Server', 'Wireshark', 'MATLAB', 'Simulink', 'AutoCAD'],
    },
    {
      title: 'Concepts',
      skills: ['Object-Oriented Programming (OOP)', 'Software Testing & Quality Assurance'],
    },
  ],
}
