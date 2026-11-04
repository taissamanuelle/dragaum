import { createClient, type Session } from '@supabase/supabase-js'
import { useSyncExternalStore } from 'react'
import { getState, setState, subscribe, type State } from './store'

/* ------------------------------------------------------------------ cliente */
const URL = import.meta.env.VITE_SUPABASE_URL || 'https://mbhcoiohsirtmathuaao.supabase.co'
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GcfYeA8xTbObIsqCGv3hiQ_uE_sgqvG'

export const supabase = createClient(URL, KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'dragaum-auth' },
})

/* ------------------------------------------------------------------ estado da sync */
export type SyncStatus = 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error'
type SyncState = { status: SyncStatus; email: string | null; userId: string | null; lastSync: number | null; error: string | null; ready: boolean }

let sync: SyncState = { status: 'signed-out', email: null, userId: null, lastSync: null, error: null, ready: false }
const subs = new Set<() => void>()
const setSync = (p: Partial<SyncState>) => { sync = { ...sync, ...p }; subs.forEach((f) => f()) }

export function useSync() {
  return useSyncExternalStore((cb) => { subs.add(cb); return () => subs.delete(cb) }, () => sync)
}

/* ------------------------------------------------------------------ merge entre aparelhos */
const maxRec = (a: Record<string, number> = {}, b: Record<string, number> = {}) => {
  const out = { ...a }
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v)
  return out
}

/** junta dois progressos sem perder nada: maior XP, união das lições, melhor resultado de cada uma */
export function mergeStates(local: State, remote: State): State {
  const completed = { ...remote.completed }
  for (const [id, l] of Object.entries(local.completed)) {
    const r = completed[id]
    completed[id] = r ? { stars: Math.max(l.stars, r.stars), best: Math.max(l.best, r.best), times: Math.max(l.times, r.times), at: l.at > r.at ? l.at : r.at } : l
  }
  const srs = { ...remote.srs }
  for (const [k, l] of Object.entries(local.srs)) {
    const r = srs[k]
    srs[k] = !r ? l : l.wrong !== r.wrong ? (l.wrong > r.wrong ? l : r) : l.due >= r.due ? l : r
  }
  const day = { ...remote.day }
  for (const [d, l] of Object.entries(local.day ?? {})) {
    const r = day[d]
    day[d] = r ? { lessons: Math.max(l.lessons, r.lessons), combo: Math.max(l.combo, r.combo) } : l
  }
  const simKey = (x: State['simulados'][number]) => `${x.at}|${x.score}|${x.total}|${x.secs}`
  const sims = new Map([...remote.simulados, ...local.simulados].map((x) => [simKey(x), x]))
  const achievements = { ...local.achievements }
  for (const [k, v] of Object.entries(remote.achievements)) if (!achievements[k] || v < achievements[k]) achievements[k] = v
  // ofensiva: vale a do aparelho que estudou por último
  const newer = (local.lastDay ?? '') >= (remote.lastDay ?? '') ? local : remote
  return {
    ...local,
    name: local.name || remote.name,
    xp: Math.max(local.xp, remote.xp),
    xpByDay: maxRec(local.xpByDay, remote.xpByDay),
    day,
    streak: newer.streak,
    lastDay: newer.lastDay,
    freezes: newer.freezes,
    bestStreak: Math.max(local.bestStreak, remote.bestStreak),
    completed,
    srs,
    simulados: [...sims.values()].sort((a, b) => (a.at < b.at ? -1 : 1)).slice(-50),
    achievements,
    answered: Math.max(local.answered, remote.answered),
    correct: Math.max(local.correct, remote.correct),
    perfect: Math.max(local.perfect, remote.perfect),
    reviews: Math.max(local.reviews, remote.reviews),
  }
}

/* ------------------------------------------------------------------ pull / push */
let pushTimer: ReturnType<typeof setTimeout> | null = null
let applyingRemote = false

async function pull(userId: string) {
  const { data, error } = await supabase.from('progress').select('data, updated_at').eq('user_id', userId).maybeSingle()
  if (error) throw error
  if (data?.data && (data.data as State).v === 1) {
    applyingRemote = true
    setState((s) => mergeStates(s, data.data as State))
    applyingRemote = false
  }
}

async function push(userId: string) {
  const { error } = await supabase.from('progress').upsert({ user_id: userId, data: getState() }, { onConflict: 'user_id' })
  if (error) throw error
}

export async function syncNow() {
  const userId = sync.userId
  if (!userId) return
  if (!navigator.onLine) { setSync({ status: 'offline' }); return }
  setSync({ status: 'syncing', error: null })
  try {
    await pull(userId)
    await push(userId)
    setSync({ status: 'synced', lastSync: Date.now() })
  } catch (e) {
    setSync({ status: 'error', error: friendly(e) })
  }
}

function schedulePush() {
  if (!sync.userId || applyingRemote) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(async () => {
    if (!sync.userId) return
    if (!navigator.onLine) { setSync({ status: 'offline' }); return }
    setSync({ status: 'syncing' })
    try { await push(sync.userId); setSync({ status: 'synced', lastSync: Date.now(), error: null }) } catch (e) { setSync({ status: 'error', error: friendly(e) }) }
  }, 1500)
}

function onSession(session: Session | null) {
  if (session?.user) {
    const changed = sync.userId !== session.user.id
    setSync({ userId: session.user.id, email: session.user.email ?? null, ready: true })
    if (changed) void syncNow()
  } else {
    setSync({ userId: null, email: null, status: 'signed-out', ready: true })
  }
}

/* ------------------------------------------------------------------ inicialização */
let started = false
export function startSync() {
  if (started) return
  started = true
  supabase.auth.getSession().then(({ data }) => onSession(data.session))
  supabase.auth.onAuthStateChange((_ev, session) => onSession(session))
  subscribe(schedulePush)
  window.addEventListener('online', () => void syncNow())
  window.addEventListener('offline', () => sync.userId && setSync({ status: 'offline' }))
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void syncNow() })
}

/* ------------------------------------------------------------------ autenticação */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: location.origin } })
  if (error) throw new Error(friendly(error))
  return { needsConfirm: !data.session }
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(friendly(error))
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: location.origin })
  if (error) throw new Error(friendly(error))
}

export async function signOut() {
  if (pushTimer) clearTimeout(pushTimer)
  if (sync.userId && navigator.onLine) { try { await push(sync.userId) } catch { /* tenta salvar antes de sair */ } }
  await supabase.auth.signOut()
}

function friendly(e: unknown): string {
  const msg = (e as { message?: string })?.message ?? String(e)
  if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha incorretos.'
  if (/email not confirmed/i.test(msg)) return 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
  if (/already registered|already been registered/i.test(msg)) return 'Esse e-mail já tem conta. Tente entrar.'
  if (/password should be at least/i.test(msg)) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (/unable to validate email|invalid email/i.test(msg)) return 'Esse e-mail não parece válido.'
  if (/rate limit|too many/i.test(msg)) return 'Muitas tentativas. Espere um minuto e tente de novo.'
  if (/relation .*progress.* does not exist|could not find the table/i.test(msg)) return 'A tabela "progress" ainda não foi criada no Supabase.'
  if (/failed to fetch|network/i.test(msg)) return 'Sem conexão com o servidor.'
  return msg
}
