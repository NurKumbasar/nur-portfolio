import { useLocale } from '../../application/state/LocaleContext'
import { useContactForm } from '../../application/state/useContactForm'
import type { MessageSender } from '../../domain/ports/MessageSender'
import { translate } from '../i18n/translations'

export function ContactForm(props: { sender: MessageSender }) {
  const form = useContactForm(props.sender)
  const { locale } = useLocale()

  return (
    <form
      className="glass-card"
      onSubmit={(e) => {
        e.preventDefault()
        form.submit()
      }}
    >
      <label>
        {translate('formName', locale)}
        <input
          type="text"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          required
        />
      </label>

      <label>
        {translate('formEmail', locale)}
        <input
          type="email"
          value={form.email}
          onChange={(e) => form.setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        {translate('formTopic', locale)}
        <input
          type="text"
          value={form.topic}
          onChange={(e) => form.setTopic(e.target.value)}
          required
        />
      </label>

      <label>
        {translate('formMessage', locale)}
        <textarea
          value={form.message}
          onChange={(e) => form.setMessage(e.target.value)}
          rows={4}
          required
        />
      </label>

      <button type="submit" disabled={form.status === 'sending'}>
        {form.status === 'sending' ? translate('formSending', locale) : translate('formSubmit', locale)}
      </button>

      {/* aria-live="polite": bu div hep DOM'da duruyor, içine mesaj
          eklendiğinde ekran okuyucu bunu otomatik okuyor — div'in kendisi
          sonradan eklenseydi bu bildirim çalışmazdı. */}
      <div aria-live="polite">
        {form.status === 'success' && <p>{translate('formSuccess', locale)}</p>}
        {form.status === 'error' && <p>{translate('formError', locale)}</p>}
      </div>
    </form>
  )
}
