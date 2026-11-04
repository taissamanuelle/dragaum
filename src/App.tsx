import { useEffect, useState } from 'react'
import { useRoute, go } from './router'
import { dueReviews, getState, levelInfo, liveStreak, setState, today, useStore } from './store'
import { courses, courseList } from './data'
import { Path, CourseSwitch } from './screens/Path'
import { BossScreen, LessonScreen, LibraryScreen, NotFound, ProfileScreen, ReviewScreen, SimuladoScreen } from './screens/Screens'
import { ACHIEVEMENTS } from './achievements'
import { Icon } from './components/Icon'
import { Mascot } from './components/Mascot'
import { ConfirmHost } from './components/Confirm'
import type { CourseId } from './types'

const NAV = [
  { path: '/', icon: 'route', label: 'Trilha' },
  { path: '/revisao', icon: 'autorenew', label: 'Revisão' },
  { path: '/simulado', icon: 'quiz', label: 'Simulado' },
  { path: '/biblioteca', icon: 'menu_book', label: 'Biblioteca' },
  { path: '/perfil', icon: 'person', label: 'Perfil' },
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
  return (
    <>
      <Router />
      <ConfirmHost />
    </>
  )
}

function Router() {
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
        <a className="logo" href="#/" aria-label="Dragaum — início">
          <img src="/mascot/icon.webp" alt="" width={48} height={48} />
          <span>Dragaum</span>
        </a>
        <nav>
          {NAV.map((n) => (
            <a key={n.path} href={`#${n.path}`} className={`nav-item ${active === n.path ? 'on' : ''}`} aria-current={active === n.path ? 'page' : undefined}>
              <Icon name={n.icon} fill={active === n.path} className="nav-icon" /> {n.label}
              {n.path === '/revisao' && <DueBadge />}
            </a>
          ))}
        </nav>
        <div className="sidebar-mascot"><Mascot mood="hello" size={150} decorative /></div>
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
          <a key={n.path} href={`#${n.path}`} className={`tab ${active === n.path ? 'on' : ''}`} aria-label={n.label} aria-current={active === n.path ? 'page' : undefined}>
            <span className="tab-icon-wrap"><Icon name={n.icon} fill={active === n.path} /></span>
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

export function StatPills({ withDays }: { withDays?: boolean }) {
  const s = useStore((x) => x)
  const st = liveStreak(s)
  return (
    <>
      <span className={`pill streak ${st ? 'on' : ''}`} title="Ofensiva (dias seguidos)">
        <Icon name="local_fire_department" fill={!!st} /> {st}{withDays ? (st === 1 ? ' dia' : ' dias') : ''}
      </span>
      <span className="pill shield" title="Escudos de ofensiva"><Icon name="shield" fill /> {s.freezes}</span>
      <span className="pill xp" title="XP"><Icon name="bolt" fill /> {s.xp}</span>
    </>
  )
}

function TopBar() {
  const courseId = useStore((s) => s.course)
  const course = courses[courseId]
  return (
    <header className="topbar">
      <button className="top-course" onClick={() => setState((st) => ({ ...st, course: st.course === 'ux' ? 'direcao' : 'ux' }))} title="Trocar de trilha">
        <img src="/mascot/icon.webp" alt="" width={30} height={30} />
        <Icon name={course.icon} fill /> <span>{course.short}</span>
        <Icon name="swap_horiz" className="swap" />
      </button>
      <div className="top-stats"><StatPills /></div>
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
      <div className="rail-stats"><StatPills withDays /></div>
      <div className="panel">
        <h3>Meta diária</h3>
        <div className="goal">
          <svg viewBox="0 0 36 36" className="ring" aria-hidden>
            <circle cx="18" cy="18" r="15.9" className="ring-bg" />
            <circle cx="18" cy="18" r="15.9" className="ring-fg" pathLength={100} strokeDasharray={`${goalPct * 100} 100`} />
          </svg>
          <div>
            <div className="goal-num">{todayXp}/{s.dailyGoal} XP</div>
            <div className="tiny muted">{goalPct >= 1 ? 'Meta batida! Arrasou.' : 'Faça uma lição para avançar'}</div>
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
            <span><Icon name={c.icon} /> {c.title}</span>
            <div className="lvl-bar thin"><div style={{ width: `${progress(c.id) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      {due > 0 && (
        <a className="panel rail-cta" href="#/revisao"><Icon name="autorenew" /> <span className="rail-cta-text"><b>{due}</b> {due === 1 ? 'questão esperando' : 'questões esperando'} revisão</span> <Icon name="arrow_forward" /></a>
      )}
      {nextAch && (
        <div className="panel">
          <h3>Próxima conquista</h3>
          <div className="next-ach"><span className="ach-badge"><Icon name={nextAch.icon} fill /></span><div><b>{nextAch.title}</b><div className="tiny muted">{nextAch.desc}</div></div></div>
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
        <Mascot mood="hello" size={170} className="ob-mascot" />
        <h1>Bem-vinda ao <span className="brand">Dragaum</span>!</h1>
        <p className="muted">Trilhas curtas e gamificadas de <b>UX Design</b> e <b>teoria de direção</b>.</p>
        <label className="ob-label">Como posso te chamar?
          <input className="name-input" autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        </label>
        <div className="ob-label">Por onde quer começar?</div>
        <div className="ob-choices">
          {courseList.map((c) => (
            <button key={c.id} className={`ob-choice ${course === c.id ? 'on' : ''}`} onClick={() => setCourse(c.id)} aria-pressed={course === c.id}>
              <span className="ob-icon"><Icon name={c.icon} fill size={30} /></span>
              <b>{c.title}</b>
              <span className="tiny muted">{c.tagline}</span>
            </button>
          ))}
        </div>
        <div className="ob-label">Meta diária</div>
        <div className="ob-goals">
          {[[10, 'Tranquila'], [30, 'Regular'], [50, 'Séria'], [80, 'Intensa']].map(([n, l]) => (
            <button key={n} className={`chip ${goal === n ? 'on' : ''}`} onClick={() => setGoal(n as number)} aria-pressed={goal === n}>{l} · {n} XP</button>
          ))}
        </div>
        <button className="btn primary big" onClick={() => { setState((s) => ({ ...s, name: name.trim() || 'Dragoa', dailyGoal: goal, course })); onDone(); go('/') }}>
          Começar a jornada <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  )
}
