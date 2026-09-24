import type { ChatService } from '../domain/ports/ChatService'
import type { ContentRepository } from '../domain/ports/ContentRepository'

// Testler için sahte (fake) bağımlılıklar. Gerçek `infrastructure`
// dosyalarını import etmiyoruz — presentation/application testleri de
// mimari kurala uyuyor ve içerik değişince kırılmıyor.
export const fakeContent: ContentRepository = {
  getProfile: () => ({
    name: 'Nur Kumbasar',
    role: { tr: 'Bilgisayar Mühendisliği Öğrencisi', en: 'Computer Engineering Student' },
    githubUrl: 'https://github.com/example',
    linkedinUrl: 'https://linkedin.com/in/example',
    email: 'test@example.com',
  }),
  getExperiences: () => [{ role: 'Stajyer', company: 'Şirket', period: '2026', location: 'İstanbul', highlights: ['Bir şey yaptım'] }],
  getEducations: () => [{ degree: 'Lisans', institution: 'Üniversite', period: '2023 — 2027', location: 'İstanbul' }],
  getSkillCategories: () => [{ title: 'Diller', skills: ['C++'] }],
  getProjects: () => [{ title: 'Proje', tags: ['React'], description: 'Açıklama', note: 'Okul projesi' }],
  getServices: () => [{ title: 'Hizmet', description: 'Açıklama', tags: ['React'] }],
  getLanguages: () => [{ name: 'Türkçe', level: 'Ana Dil' }],
}

export const fakeChatService: ChatService = {
  reply: async () => 'sahte cevap',
}
