import type { Locale } from './Locale'

export type Profile = {
  name: string
  role: Record<Locale, string>
  githubUrl: string
  linkedinUrl: string
  email: string
}
