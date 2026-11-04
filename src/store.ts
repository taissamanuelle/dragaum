import { useSyncExternalStore } from 'react'
import type { CourseId } from './types'

export type LessonProgress = { stars: number; best: number; times: number; at: string }
export type SrsItem = { box: number; due: string; wrong: number }
export type DayStats = { lessons: number; combo: number }
export type SimuladoResult = { at: string; score: number; total: number; secs: number }

export type State = {
  v: 1
  name: string
  course: CourseId
  xp: number
  xpByDay: Record<string, number>
  day: Record<string, DayStats>
  streak: number
  bestStreak: number
  lastDay: string | null
  freezes: number
  dailyGoal: number
  completed: Record<string, LessonProgress>
  srs: Record<string, SrsItem>
  simulados: SimuladoResult[]
  achievements: Record<string, string>
  answered: number
  correct: number
  perfect: number
  reviews: number
  theme: 'auto' | 'light' | 'dark'
  sound: boolean
  unlockAll: boolean
}

const KEY = 'dragaum:v1'

const initial = (): State => ({
  v: 1,
  name: '',
  course: 'ux',
  xp: 0,
  xpByDay: {},
  day: {},
  streak: 0,
  bestStreak: 0,
  lastDay: null,
  freezes: 1,
  dailyGoal: 30,
  completed: {},
  srs: {},
  simulados: [],
  achievements: {},
  answered: 0,
  correct: 0,
  perfect: 0,
  reviews: 0,
  theme: 'auto',
  sound: true,
  unlockAll: false,
})

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initial(), ...JSON.parse(raw) }
  } catch {
    /* sem storage */
  }
  return initial()
}

let state: State = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function getState() {
  return state
}

export function setState(fn: (s: State) => State) {
  state = fn(state)
  persist()
  listeners.forEach((l) => l())
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => sel(state),
  )
}

export function resetAll() {
  state = initial()
  persist()
  listeners.forEach((l) => l())
}

export function exportData() {
  return JSON.stringify(state, null, 2)
}

export function importData(json: string) {
  const parsed = JSON.parse(json)
  if (parsed?.v !== 1) throw new Error('Arquivo inválido')
  setState(() => ({ ...initial(), ...parsed }))
}

/* ---------- datas ---------- */
export const today = (d = new Date()) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
export const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split('-').map(Number)
  return today(new Date(y, m - 1, d + n))
}
export const diffDays = (a: string, b: string) => {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

/** streak exibida (zera se perdeu e não há escudo suficiente) */
export function liveStreak(s: State) {
  if (!s.lastDay) return 0
  const gap = diffDays(s.lastDay, today())
  if (gap <= 1) return s.streak
  if (gap - 1 <= s.freezes) return s.streak
  return 0
}

/* ---------- níveis ---------- */
export const LEVELS = ['Ovo', 'Filhote', 'Faísca', 'Brasa', 'Chama', 'Labareda', 'Dragão Jovem', 'Dragão Alado', 'Dragão Ancião', 'Dragaum Lendário']
export const levelThreshold = (n: number) => 40 * n * (n + 1) // n=0 ->0, 1->80, 2->240 ...
export function levelInfo(xp: number) {
  let n = 0
  while (levelThreshold(n + 1) <= xp) n++
  const cur = levelThreshold(n)
  const next = levelThreshold(n + 1)
  const title = LEVELS[Math.min(n, LEVELS.length - 1)] + (n >= LEVELS.length ? ` ${n - LEVELS.length + 2}` : '')
  return { level: n + 1, title, cur, next, pct: (xp - cur) / (next - cur) }
}

/* ---------- ações ---------- */
export function addXp(amount: number) {
  setState((s) => {
    const d = today()
    let { streak, freezes, bestStreak } = s
    if (s.lastDay !== d) {
      const gap = s.lastDay ? diffDays(s.lastDay, d) : 1
      if (gap === 1) streak += 1
      else if (gap > 1 && gap - 1 <= freezes) {
        freezes -= gap - 1
        streak += 1
      } else streak = 1
      if (streak > 0 && streak % 7 === 0 && freezes < 3) freezes += 1
    }
    bestStreak = Math.max(bestStreak, streak)
    return {
      ...s,
      xp: s.xp + amount,
      xpByDay: { ...s.xpByDay, [d]: (s.xpByDay[d] ?? 0) + amount },
      streak,
      bestStreak,
      freezes,
      lastDay: d,
    }
  })
}

const BOX_DAYS = [0, 1, 3, 7, 14, 30]

/** registra resposta de uma questão (lição ou revisão) */
export function recordAnswer(key: string, ok: boolean, fromReview = false) {
  setState((s) => {
    const srs = { ...s.srs }
    const cur = srs[key]
    if (!ok) {
      srs[key] = { box: 0, due: fromReview ? addDays(today(), 1) : today(), wrong: (cur?.wrong ?? 0) + 1 }
    } else if (cur && fromReview) {
      const box = cur.box + 1
      if (box >= BOX_DAYS.length) delete srs[key]
      else srs[key] = { ...cur, box, due: addDays(today(), BOX_DAYS[box]) }
    }
    return { ...s, srs, answered: s.answered + 1, correct: s.correct + (ok ? 1 : 0), reviews: s.reviews + (fromReview ? 1 : 0) }
  })
}

export function completeLesson(id: string, accuracy: number) {
  const stars = accuracy >= 1 ? 3 : accuracy >= 0.8 ? 2 : 1
  setState((s) => {
    const prev = s.completed[id]
    const d = today()
    const ds = s.day[d] ?? { lessons: 0, combo: 0 }
    return {
      ...s,
      day: { ...s.day, [d]: { ...ds, lessons: ds.lessons + 1 } },
      perfect: s.perfect + (accuracy >= 1 ? 1 : 0),
      completed: {
        ...s.completed,
        [id]: { stars: Math.max(stars, prev?.stars ?? 0), best: Math.max(accuracy, prev?.best ?? 0), times: (prev?.times ?? 0) + 1, at: today() },
      },
    }
  })
  return stars
}

export function addSimulado(r: SimuladoResult) {
  setState((s) => ({ ...s, simulados: [...s.simulados, r].slice(-50) }))
}

export function dueReviews(s: State) {
  const d = today()
  return Object.entries(s.srs)
    .filter(([, v]) => v.due <= d)
    .map(([k]) => k)
}

export function recordCombo(n: number) {
  setState((s) => {
    const d = today()
    const ds = s.day[d] ?? { lessons: 0, combo: 0 }
    if (n <= ds.combo) return s
    return { ...s, day: { ...s.day, [d]: { ...ds, combo: n } } }
  })
}

/** missões do dia (renovam à meia-noite) */
export function dailyQuests(s: State) {
  const d = today()
  const ds = s.day[d] ?? { lessons: 0, combo: 0 }
  const xp = s.xpByDay[d] ?? 0
  return [
    { id: 'xp', icon: 'bolt', title: `Ganhe ${s.dailyGoal} XP`, cur: Math.min(xp, s.dailyGoal), max: s.dailyGoal },
    { id: 'lessons', icon: 'school', title: 'Complete 2 lições', cur: Math.min(ds.lessons, 2), max: 2 },
    { id: 'combo', icon: 'local_fire_department', title: 'Acerte 5 seguidas', cur: Math.min(ds.combo, 5), max: 5 },
  ]
}
