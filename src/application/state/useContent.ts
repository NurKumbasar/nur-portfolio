import { useContext } from 'react'
import type { ContentRepository } from '../../domain/ports/ContentRepository'
import { ContentContext } from './contentCtx'

export function useContent(): ContentRepository {
  const content = useContext(ContentContext)
  if (!content) {
    throw new Error('useContent, ContentProvider içinde kullanılmalı')
  }
  return content
}
