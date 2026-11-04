import { useEffect, useState } from 'react'
import { useRoute, go } from './router'
import { dueReviews, getState, levelInfo, liveStreak, setState, today, useStore } from './store'
import { courses, courseList } from './data'
import { Path, CourseSwitch } from './screens/Path'
import { BossScreen, LessonScreen, LibraryScreen, NotFound, ProfileScreen, ReviewScreen, SimuladoScreen } from './screens/Screens'
import { ACHIEVEMENTS } from './achievements'
import type { CourseId } from './types'

const NAV = [
  { path: '/', icon: '🗺️', label: 'Trilha' },
  { path: '/revisao', icon: '🔁', label: 'Revisão' },
  { path: '/simulado', icon: '📝', label: 'Simulado' },
  { path: '/biblioteca', icon: '📖', label: 'Biblioteca' },
  { path: '/perfil', icon: '🐉', label: 'Perfil' },
]

function useTheme() {
  const theme = useStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])
}

export default function App() {
  useTheme()
  const route = useRoute()
  const name = useStore((s) => s.name)
  const [onboarded, setOnboarded] = useState(() => !!getState().name || getState().xp > 0)

  if (!onboarded && !name) return <Onboarding onDone={() => setOnboarded(true)} />

  const [, seg, arg] = route.split('/')
  if (seg === 'licao' && arg) return <LessonScreen key={arg} id={arg} />
  if (seg === 'teste' && arg) return <BossScreen key={arg} unitId={arg} />

  let page: React.ReactNode
  switch (seg) {
    case '': page = <Path />; break
    case 'revisao': page = <ReviewScreen />; break
    case 'simulado': page = <SimuladoScreen />; break
    case 'biblioteca': page = <LibraryScreen unitId={arg} />; break
    case 'perfil': page = <ProfileScreen />; break
    default: page = <NotFound />
  }
  const active = '/' + (seg ?? '')

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo" onClick={() => go('/')}>
          <img src="/icons/icon.svg" alt="" width={36} height={36} />
          <span>Dragaum</span>
        </div>
        <nav>
          {NAV.map((n) => (
            <a key={n.path} href={`#${n.path}`} className={`nav-item ${active === n.path ? 'on' : ''}`}>
              <span className="nav-icon">{n.icon}</span> {n.label}
              {n.path === '/revisao' && <DueBadge />}
            </a>
          ))}
        </nav>
      </aside>
      <div className="main-col">
        <TopBar />
        <main className="content">{page}</main>
      </div>
      <aside className="rail">
        <CourseSwitch />
        <Rail />
      </aside>
      <nav className="tabbar">
        {NAV.map((n) => (
          <a key={n.path} href={`#${n.path}`} className={`tab ${active === n.path ? 'on' : ''}`} aria-label={n.label}>
            <span className="tab-icon">{n.icon}</span>
            <span className="tab-label">{n.label}</span>
            {n.path === '/revisao' && <DueBadge />}
          </a>
        ))}
      </nav>
    </div>
  )
}

function DueBadge() {
  const n = useStore((s) => dueReviews(s).length)
  return n ? <span className="due-badge">{n > 99 ? '99+' : n}</span> : null
}

function TopBar() {
  const s = useStore((x) => x)
  const course = courses[s.course]
  return (
    <header className="topbar">
      <button className="top-course" onClick={() => setState((st) => ({ ...st, course: st.course === 'ux' ? 'direcao' : 'ux' }))} title="Trocar de trilha">
        {course.icon} <span>{course.short}</span>
      </button>
      <div className="top-stats">
        <span className={`pill streak ${liveStreak(s) ? 'on' : ''}`} title="Ofensiva">🔥 {liveStreak(s)}</span>
        <span className="pill" title="Escudos">🛡️ {s.freezes}</span>
        <span className="pill xp" title="XP">⚡ {s.xp}</span>
      </div>
    </header>
  )
}

function Rail() {
  const s = useStore((x) => x)
  const lv = levelInfo(s.xp)
  const todayXp = s.xpByDay[today()] ?? 0
  const goalPct = Math.min(1, todayXp / s.dailyGoal)
  const due = dueReviews(s).length
  const nextAch = ACHIEVEMENTS.find((a) => !s.achievements[a.id])
  const progress = (id: CourseId) => {
    const ls = courses[id].units.flatMap((u) => u.lessons)
    return ls.filter((l) => s.completed[l.id]).length / ls.length
  }
  return (
    <div className="rail-inner">
      <div className="rail-stats">
        <span className={`pill streak ${liveStreak(s) ? 'on' : ''}`}>🔥 {liveStreak(s)} {liveStreak(s) === 1 ? "dia" : "dias"}</span>
        <span className="pill">🛡️ {s.freezes}</span>
        <span className="pill xp">⚡ {s.xp}</span>
      </div>
      <div className="panel">
        <h3>Meta diária</h3>
        <div className="goal">
          <svg viewBox="0 0 36 36" className="ring">
            <circle cx="18" cy="18" r="15.9" className="ring-bg" />
            <circle cx="18" cy="18" r="15.9" className="ring-fg" pathLength={100} strokeDasharray={`${goalPct * 100} 100`} />
          </svg>
          <div>
            <div className="goal-num">{todayXp}/{s.dailyGoal} XP</div>
            <div className="tiny muted">{goalPct >= 1 ? 'Meta batida! 🎉' : 'Faça uma lição para avançar'}</div>
          </div>
        </div>
      </div>
      <div className="panel">
        <h3>Nível {lv.level} · {lv.title}</h3>
        <div className="lvl-bar"><div style={{ width: `${lv.pct * 100}%` }} /></div>
        <div className="tiny muted">{lv.next - s.xp} XP para o próximo</div>
      </div>
      <div className="panel">
        <h3>Trilhas</h3>
        {courseList.map((c) => (
          <div key={c.id} className="rail-course">
            <span>{c.icon} {c.title}</span>
            <div className="lvl-bar thin"><div style={{ width: `${progress(c.id) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      {due > 0 && (
        <a className="panel rail-cta" href="#/revisao">🔁 <b>{due}</b> questões esperando revisão →</a>
      )}
      {nextAch && (
        <div className="panel">
          <h3>Próxima conquista</h3>
          <div className="next-ach"><span className="ach-icon">{nextAch.icon}</span><div><b>{nextAch.title}</b><div className="tiny muted">{nextAch.desc}</div></div></div>
        </div>
      )}
    </div>
  )
}

function Onboarding({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState(30)
  const [course, setCourse] = useState<CourseId>('ux')
  return (
    <div className="onboarding">
      <div className="ob-card">
        <img src="/icons/icon.svg" alt="" width={84} height={84} />
        <h1>Bem-vinda ao Dragaum!</h1>
        <p className="muted">Trilhas curtas e gamificadas de <b>UX Design</b> e <b>teoria de direção</b>.</p>
        <label className="ob-label">Como posso te chamar?
          <input className="name-input" autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        </label>
        <div className="ob-label">Por onde quer começar?</div>
        <div className="ob-choices">
          {courseList.map((c) => (
            <button key={c.id} className={`ob-choice ${course === c.id ? 'on' : ''}`} onClick={() => setCourse(c.id)}>
              <span className="ob-emoji">{c.icon}</span>
              <b>{c.title}</b>
              <span className="tiny muted">{c.tagline}</span>
            </button>
          ))}
        </div>
        <div className="ob-label">Meta diária</div>
        <div className="ob-goals">
          {[[10, 'Tranquila'], [30, 'Regular'], [50, 'Séria'], [80, 'Intensa']].map(([n, l]) => (
            <button key={n} className={`chip ${goal === n ? 'on' : ''}`} onClick={() => setGoal(n as number)}>{l} · {n} XP</button>
          ))}
        </div>
        <button className="btn primary big" onClick={() => { setState((s) => ({ ...s, name: name.trim() || 'Dragoa', dailyGoal: goal, course })); onDone() }}>Começar a jornada 🐉</button>
      </div>
    </div>
  )
}
