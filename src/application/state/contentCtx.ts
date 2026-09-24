import { createContext } from 'react'
import type { ContentRepository } from '../../domain/ports/ContentRepository'

export const ContentContext = createContext<ContentRepository | null>(null)
