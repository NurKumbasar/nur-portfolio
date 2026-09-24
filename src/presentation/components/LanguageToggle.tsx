import { useLocale } from '../../application/state/useLocale'
import { translate } from '../i18n/translations'

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale()

  return (
    <button onClick={toggleLocale} aria-label="Dili değiştir">
      {translate('languageToggleLabel', locale)}
    </button>
  )
}
