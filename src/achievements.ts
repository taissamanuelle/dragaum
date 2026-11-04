import { allLessons, courses } from './data'
import { getState, liveStreak, setState, today, type State } from './store'

export type Achievement = { id: string; icon: string; title: string; desc: string; test: (s: State) => boolean }

const doneIn = (s: State, c: 'ux' | 'direcao') => allLessons(c).filter((l) => s.completed[l.id]).length
const unitDone = (s: State, unitId: string) => {
  for (const c of Object.values(courses)) {
    const u = c.units.find((x) => x.id === unitId)
    if (u) return u.lessons.every((l) => s.completed[l.id])
  }
  return false
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', icon: 'egg', title: 'Chocou!', desc: 'Conclua sua primeira lição', test: (s) => Object.keys(s.completed).length >= 1 },
  { id: 'ten', icon: 'auto_stories', title: 'Estudiosa', desc: 'Conclua 10 lições', test: (s) => Object.keys(s.completed).length >= 10 },
  { id: 'thirty', icon: 'local_library', title: 'Biblioteca viva', desc: 'Conclua 30 lições', test: (s) => Object.keys(s.completed).length >= 30 },
  { id: 'perfect1', icon: 'diamond', title: 'Sem erros', desc: 'Faça uma lição perfeita', test: (s) => s.perfect >= 1 },
  { id: 'perfect10', icon: 'workspace_premium', title: 'Perfeccionista', desc: '10 lições perfeitas', test: (s) => s.perfect >= 10 },
  { id: 'streak3', icon: 'local_fire_department', title: 'Pegando fogo', desc: '3 dias seguidos', test: (s) => liveStreak(s) >= 3 || s.bestStreak >= 3 },
  { id: 'streak7', icon: 'whatshot', title: 'Semana de dragão', desc: '7 dias seguidos', test: (s) => s.bestStreak >= 7 },
  { id: 'streak30', icon: 'volcano', title: 'Vulcão', desc: '30 dias seguidos', test: (s) => s.bestStreak >= 30 },
  { id: 'xp500', icon: 'bolt', title: '500 XP', desc: 'Acumule 500 XP', test: (s) => s.xp >= 500 },
  { id: 'xp2000', icon: 'star', title: '2.000 XP', desc: 'Acumule 2.000 XP', test: (s) => s.xp >= 2000 },
  { id: 'goal', icon: 'flag', title: 'Meta batida', desc: 'Bata a meta diária', test: (s) => (s.xpByDay[today()] ?? 0) >= s.dailyGoal },
  { id: 'review10', icon: 'autorenew', title: 'Memória de elefante', desc: 'Responda 10 revisões', test: (s) => s.reviews >= 10 },
  { id: 'heur', icon: 'fact_check', title: 'Olhar de Nielsen', desc: 'Complete Heurísticas de Nielsen', test: (s) => unitDone(s, 'ux-heur') },
  { id: 'gestalt', icon: 'visibility', title: 'Gestaltiana', desc: 'Complete a unidade de Gestalt', test: (s) => unitDone(s, 'ux-gestalt') },
  { id: 'ds', icon: 'widgets', title: 'Arquiteta de sistemas', desc: 'Complete Design System', test: (s) => unitDone(s, 'ux-ds') },
  { id: 'uxall', icon: 'palette', title: 'UX Master', desc: 'Complete toda a trilha de UX', test: (s) => doneIn(s, 'ux') === allLessons('ux').length },
  { id: 'placas', icon: 'traffic', title: 'Radar de placas', desc: 'Complete Sinalização', test: (s) => unitDone(s, 'dir-sin') },
  { id: 'defensiva', icon: 'shield', title: 'Escudo na via', desc: 'Complete Direção defensiva', test: (s) => unitDone(s, 'dir-def') },
  { id: 'sim1', icon: 'quiz', title: 'Primeiro simulado', desc: 'Faça um simulado de 30 questões', test: (s) => s.simulados.some((x) => x.total >= 30) },
  { id: 'simpass', icon: 'verified', title: 'Aprovada!', desc: 'Passe num simulado (20+ acertos)', test: (s) => s.simulados.some((x) => x.total >= 30 && x.score >= 20) },
  { id: 'sim3', icon: 'sports_score', title: 'Pronta pra prova', desc: '3 simulados seguidos com 25+', test: (s) => { const l = s.simulados.filter((x) => x.total >= 30).slice(-3); return l.length === 3 && l.every((x) => x.score >= 25) } },
  { id: 'dirall', icon: 'directions_car', title: 'CNH na mão (na teoria!)', desc: 'Complete toda a trilha de Direção', test: (s) => doneIn(s, 'direcao') === allLessons('direcao').length },
]

/** confere e grava conquistas novas; retorna as recém-desbloqueadas */
export function checkAchievements(): Achievement[] {
  const s = getState()
  const fresh = ACHIEVEMENTS.filter((a) => !s.achievements[a.id] && a.test(s))
  if (fresh.length) {
    setState((st) => ({ ...st, achievements: { ...st.achievements, ...Object.fromEntries(fresh.map((a) => [a.id, today()])) } }))
  }
  return fresh
}
