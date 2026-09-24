import { useTheme } from '../../application/state/useTheme'

// Şu an hangi temadaysak, geçilecek diğer temanın ikonunu gösteriyoruz
// (karanlık moddayken güneş = "aydınlığa geç" gibi).
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} aria-label="Temayı değiştir">
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path
            strokeLinecap="round"
            d="M12 2.5v2M12 19.5v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2.5 12h2M19.5 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 1 0 20.354 15.354Z" />
        </svg>
      )}
    </button>
  )
}
