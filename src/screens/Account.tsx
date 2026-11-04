import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { resetPassword, signIn, signOut, signUp, syncNow, useSync } from '../sync'

/** formulário de entrar / criar conta */
export function AuthForm({ initial = 'signin', onDone }: { initial?: 'signin' | 'signup'; onDone?: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initial)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(''); setInfo(''); setBusy(true)
    try {
      if (mode === 'signup') {
        const { needsConfirm } = await signUp(email.trim(), pass)
        if (needsConfirm) setInfo('Conta criada! Enviamos um link de confirmação para o seu e-mail. Depois de confirmar, é só entrar aqui.')
        else onDone?.()
      } else {
        await signIn(email.trim(), pass)
        onDone?.()
      }
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const forgot = async () => {
    setErr(''); setInfo('')
    if (!email.trim()) { setErr('Digite seu e-mail acima para receber o link.'); return }
    try { await resetPassword(email.trim()); setInfo('Se houver uma conta com esse e-mail, enviamos um link para redefinir a senha.') } catch (e) { setErr((e as Error).message) }
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="seg" role="tablist" aria-label="Tipo de acesso">
        <button type="button" role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'on' : ''} onClick={() => { setMode('signin'); setErr(''); setInfo('') }}>Entrar</button>
        <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'on' : ''} onClick={() => { setMode('signup'); setErr(''); setInfo('') }}>Criar conta</button>
      </div>
      <label className="field-label">E-mail
        <input className="field" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
      </label>
      <label className="field-label">Senha
        <span className="field-wrap">
          <input className="field" type={show ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={6} value={pass} onChange={(e) => setPass(e.target.value)} placeholder={mode === 'signup' ? 'Mínimo de 6 caracteres' : 'Sua senha'} />
          <button type="button" className="field-eye" onClick={() => setShow(!show)} aria-label={show ? 'Esconder senha' : 'Mostrar senha'}><Icon name={show ? 'visibility_off' : 'visibility'} /></button>
        </span>
      </label>
      {err && <p className="form-error" role="alert"><Icon name="error" fill /> {err}</p>}
      {info && <p className="form-info" role="status"><Icon name="mark_email_read" fill /> {info}</p>}
      <button className="btn primary big" disabled={busy || !email || pass.length < 6}>{busy ? 'Aguarde…' : mode === 'signup' ? 'Criar conta' : 'Entrar'}</button>
      {mode === 'signin' && <button type="button" className="btn ghost" onClick={forgot}>Esqueci minha senha</button>}
    </form>
  )
}

/** tela cheia de login (a partir das boas-vindas) */
export function LoginScreen({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <div className="onb">
      <header className="onb-top">
        <button className="icon-btn" aria-label="Voltar" onClick={onBack}><Icon name="arrow_back" /></button>
      </header>
      <main className="onb-body">
        <div className="speaker">
          <Mascot mood="hello" size={104} decorative />
          <div className="speech">Que bom te ver de novo! Entre para trazer seu progresso.</div>
        </div>
        <AuthForm initial="signin" onDone={onDone} />
      </main>
    </div>
  )
}

const STATUS: Record<string, { icon: string; text: string; cls: string }> = {
  syncing: { icon: 'cloud_sync', text: 'Sincronizando…', cls: 'info' },
  synced: { icon: 'cloud_done', text: 'Progresso salvo na nuvem', cls: 'ok' },
  offline: { icon: 'cloud_off', text: 'Sem internet. Salva quando voltar', cls: 'warn' },
  error: { icon: 'error', text: 'Não foi possível sincronizar', cls: 'bad' },
  'signed-out': { icon: 'cloud_off', text: 'Só neste aparelho', cls: 'warn' },
}

/** card de conta no Perfil */
export function AccountCard() {
  const s = useSync()
  const st = STATUS[s.status]
  if (!s.userId) {
    return (
      <div className="panel account-card">
        <div className="account-promo">
          <Mascot mood="thinking" size={84} decorative />
          <div>
            <h3>Salve seu progresso na nuvem</h3>
            <p className="muted">Crie uma conta para não perder nada e continuar do celular no computador.</p>
          </div>
        </div>
        <AuthForm initial="signup" />
      </div>
    )
  }
  return (
    <div className="panel account-card">
      <div className="panel-head"><h3>Conta</h3></div>
      <div className="account-row">
        <span className="account-avatar"><Icon name="person" fill /></span>
        <div className="account-info">
          <b>{s.email}</b>
          <span className={`sync-status ${st.cls}`}><Icon name={st.icon} fill /> {st.text}{s.lastSync && s.status === 'synced' ? ` · ${new Date(s.lastSync).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : ''}</span>
          {s.error && <span className="tiny muted">{s.error}</span>}
        </div>
      </div>
      <div className="set-actions">
        <button className="btn" onClick={() => void syncNow()} disabled={s.status === 'syncing'}><Icon name="sync" /> Sincronizar agora</button>
        <button className="btn danger-outline" onClick={() => void signOut()}><Icon name="logout" /> Sair da conta</button>
      </div>
      <p className="tiny muted">Ao sair, o progresso continua neste aparelho e segue salvo na sua conta.</p>
    </div>
  )
}

/** indicador pequeno de sync (topo/painel) */
export function SyncBadge() {
  const s = useSync()
  if (!s.userId) return null
  const st = STATUS[s.status]
  return <span className={`sync-badge ${st.cls}`} title={st.text} aria-label={st.text}><Icon name={st.icon} fill /></span>
}
