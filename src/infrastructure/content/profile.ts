import type { Profile } from '../../domain/entities/Profile'

export const profile: Profile = {
  name: 'Nur Kumbasar',
  role: {
    tr: 'Bilgisayar Mühendisliği Öğrencisi',
    en: 'Computer Engineering Student',
  },
  bio: {
    tr: 'Teknolojiye ilgi duyan, kendini sürekli geliştirmeye odaklanan biriyim. Yazılım geliştirme ve problem çözme süreçlerinde analitik düşünmeye ve detaylara dikkat etmeye önem veririm. Takım çalışmasına yatkın, sorumluluk almaktan çekinmeyen ve proje süreçlerinde aktif rol alan bir yapıya sahibim.',
    en: "I'm someone with a strong interest in technology, focused on continuously improving myself. In software development and problem-solving, I value analytical thinking and attention to detail. I work well in teams, take on responsibility readily, and play an active role throughout a project.",
  },
  githubUrl: 'https://github.com/NurKumbasar',
  linkedinUrl: 'https://www.linkedin.com/in/nur-kumbasar',
  email: 'nurkumbsr@gmail.com',
}
