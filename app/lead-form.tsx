'use client'

import { useState } from 'react'

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT
const REDIRECT = process.env.NEXT_PUBLIC_REDIRECT_URL

/* Máscara de telefone BR: (00) 00000-0000, aceitando fixo (00) 0000-0000 */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const len = digits.length
  if (len === 0) return ''
  if (len <= 2) return `(${digits}`
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (len <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const IconWhats = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
)

export default function LeadForm({
  cta = 'Quero a condição especial',
  grupo = '',
}: { cta?: string; grupo?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [whatsapp, setWhatsapp] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    setStatus('sending')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, origem: 'captura-bf-60d' }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      }
      setStatus('ok')
      if (REDIRECT) window.location.href = REDIRECT
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="form-success">
        <span className="ok">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <h4>Inscrição confirmada!</h4>
        <p>Agora entre no grupo para receber a condição em primeira mão, no dia 21/10 às 8h.</p>
        <a className="btn btn-whats" href={grupo} target="_blank" rel="noopener noreferrer">
          <IconWhats />
          Entrar no grupo do WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input id="nome" type="text" name="nome" placeholder="Seu nome completo" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="whatsapp">Número (WhatsApp)</label>
        <input
          id="whatsapp"
          type="tel"
          name="whatsapp"
          placeholder="(00) 00000-0000"
          required
          autoComplete="tel"
          inputMode="tel"
          maxLength={15}
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
        />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" name="email" placeholder="Seu melhor e-mail" required autoComplete="email" />
      </div>

      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : cta}
      </button>

      <p className="form-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        Seus dados estão seguros.
      </p>

      {status === 'error' && (
        <p className="form-error">Algo deu errado no envio. Tenta de novo em alguns segundos.</p>
      )}
    </form>
  )
}
