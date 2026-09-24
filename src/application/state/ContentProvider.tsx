import type { ReactNode } from 'react'
import type { ContentRepository } from '../../domain/ports/ContentRepository'
import { ContentContext } from './contentCtx'

// Somut içerik kaynağı (`infrastructure`) burada değil, uygulamanın en
// tepesinde (`main.tsx`) seçilip içeri veriliyor — bkz. Theme/LocaleProvider.
export function ContentProvider({ children, repository }: { children: ReactNode; repository: ContentRepository }) {
  return <ContentContext.Provider value={repository}>{children}</ContentContext.Provider>
}
