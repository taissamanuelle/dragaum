import { useEffect, useState } from 'react'
import { Mascot, type Mood } from './Mascot'

type Req = { title: string; text?: string; ok: string; cancel: string; mood: Mood; danger?: boolean; resolve: (v: boolean) => void }
let push: ((r: Req) => void) | null = null

/** confirmação com o mascote, no lugar do window.confirm */
export function ask(opts: Omit<Req, 'resolve' | 'ok' | 'cancel' | 'mood'> & Partial<Pick<Req, 'ok' | 'cancel' | 'mood'>>): Promise<boolean> {
  return new Promise((resolve) => {
    const r: Req = { ok: 'Confirmar', cancel: 'Cancelar', mood: 'sad', ...opts, resolve }
    if (push) push(r)
    else resolve(window.confirm(opts.title))
  })
}

export function ConfirmHost() {
  const [req, setReq] = useState<Req | null>(null)
  useEffect(() => {
    push = setReq
    return () => { push = null }
  }, [])
  useEffect(() => {
    if (!req) return
    const on = (e: KeyboardEvent) => { if (e.key === 'Escape') close(false) }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  })
  if (!req) return null
  const close = (v: boolean) => { req.resolve(v); setReq(null) }
  return (
    <div className="modal-bg" onClick={() => close(false)}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <Mascot mood={req.mood} size={130} decorative />
        <h2 id="modal-title">{req.title}</h2>
        {req.text && <p className="muted">{req.text}</p>}
        <div className="modal-actions">
          <button className="btn primary big" autoFocus onClick={() => close(false)}>{req.cancel}</button>
          <button className={`btn big ${req.danger ? 'danger-outline' : 'ghost'}`} onClick={() => close(true)}>{req.ok}</button>
        </div>
      </div>
    </div>
  )
}
