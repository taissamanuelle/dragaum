import { useEffect, useState } from 'react'
import { courses, courseList } from '../data'
import { setState, useStore } from '../store'
import { go } from '../router'
import type { Lesson, Unit } from '../types'
import { Icon } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { today } from '../store'
import { Quests } from '../components/Quests'
import type { Mood } from '../components/Mascot'

export function CourseSwitch() {
  const course = useStore((s) => s.course)
  return (
    <div className="course-switch" role="tablist">
      {courseList.map((c) => (
        <button key={c.id} role="tab" aria-selected={course === c.id} className={course === c.id ? 'on' : ''} onClick={() => setState((s) => ({ ...s, course: c.id }))}>
          <Icon name={c.icon} fill={course === c.id} /> {c.title}
        </button>
      ))}
    </div>
  )
}

const OFFSETS = [0, 44, 68, 44, 0, -44, -68, -44]
const DECOR: Mood[] = ['hello', 'thinking', 'happy']

export function Path() {
  const courseId = useStore((s) => s.course)
  const completed = useStore((s) => s.completed)
  const unlockAll = useStore((s) => s.unlockAll)
  const name = useStore((s) => s.name)
  const todayXp = useStore((s) => s.xpByDay[today()] ?? 0)
  const goal = useStore((s) => s.dailyGoal)
  const course = courses[courseId]
  const [open, setOpen] = useState<string | null>(null)

  const flat = course.units.flatMap((u) => u.lessons.map((l) => l.id))
  const firstOpen = flat.find((id) => !completed[id])
  const unlocked = (id: string) => unlockAll || !!completed[id] || id === firstOpen

  useEffect(() => {
    if (!firstOpen) return
    const el = document.getElementById(`node-${firstOpen}`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [courseId, firstOpen])

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.node-wrap')) setOpen(null) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  let k = 0
  return (
    <div className="path-screen">
      <div className="mobile-only tablet-show"><CourseSwitch /></div>
      <div className="greet">
        <Mascot mood={todayXp >= goal ? 'happy' : 'hello'} size={88} decorative />
        <div className="greet-bubble">
          <b>{todayXp >= goal ? `Meta batida, ${name || 'dragoa'}!` : `Oi, ${name || 'dragoa'}!`}</b>
          <span>{todayXp >= goal ? 'Quer revisar algo ou seguir na trilha?' : firstOpen ? `Faltam ${Math.max(goal - todayXp, 0)} XP para a meta de hoje.` : 'Você completou a trilha toda!'}</span>
        </div>
      </div>
      <details className="quests-card mobile-only tablet-show">
        <summary><Icon name="flag" fill /> <b>Missões do dia</b> <Icon name="expand_more" className="chev" /></summary>
        <Quests compact />
      </details>
      {course.units.map((u, ui) => {
        const doneN = u.lessons.filter((l) => completed[l.id]).length
        const allDone = doneN === u.lessons.length
        return (
          <section key={u.id} className="unit" style={{ ['--uc' as string]: u.color }}>
            <div className="unit-banner">
              <div className="unit-banner-text">
                <div className="unit-kicker">Unidade {ui + 1} · {doneN}/{u.lessons.length} lições</div>
                <h2>{u.title}</h2>
              </div>
              <button className="banner-btn" onClick={() => go(`/biblioteca/${u.id}`)} aria-label={`Guia da unidade ${u.title}`} title="Guia da unidade"><Icon name="menu_book" fill /></button>
            </div>
            <p className="unit-desc"><Icon name={u.icon} fill /> {u.desc}</p>
            <div className="nodes">
              {u.lessons.map((l, li) => {
                const off = OFFSETS[k++ % OFFSETS.length]
                const decor = li === Math.floor((u.lessons.length - 1) / 2) ? DECOR[ui % DECOR.length] : undefined
                return (
                  <Node key={l.id} decor={decor} lesson={l} unit={u} off={off} done={!!completed[l.id]} stars={completed[l.id]?.stars ?? 0} current={l.id === firstOpen} locked={!unlocked(l.id)} open={open === l.id} onToggle={() => setOpen(open === l.id ? null : l.id)} />
                )
              })}
              <BossNode unit={u} off={OFFSETS[k++ % OFFSETS.length]} locked={!allDone && !unlockAll} open={open === `boss-${u.id}`} onToggle={() => setOpen(open === `boss-${u.id}` ? null : `boss-${u.id}`)} />
            </div>
          </section>
        )
      })}
      <div className="path-end"><Mascot mood="happy" size={120} decorative /><span>Fim da trilha — continue revisando para não esquecer!</span></div>
    </div>
  )
}

function Node({ lesson, unit, off, done, stars, current, locked, open, onToggle, decor }: { decor?: Mood; lesson: Lesson; unit: Unit; off: number; done: boolean; stars: number; current: boolean; locked: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className={`node-wrap ${open ? 'open' : ''} ${current ? 'is-current' : ''}`} id={`node-${lesson.id}`} style={{ transform: `translateX(${off}px)` }}>
      {decor && <Mascot mood={decor} size={104} className={`path-decor ${off >= 0 ? 'left' : 'right'}`} decorative />}
      {current && !open && <div className="start-bubble">Começar</div>}
      {current && <svg className="node-ring" viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="46" /></svg>}
      <button className={`node ${done ? 'done' : ''} ${current ? 'current' : ''} ${locked ? 'locked' : ''}`} onClick={onToggle} aria-label={`${lesson.title}${locked ? ' (bloqueada)' : ''}`} aria-expanded={open}>
        <Icon name={locked ? 'lock' : done ? 'check' : 'star'} fill className="node-icon" />
      </button>
      {done && <div className="node-stars">{[1, 2, 3].map((n) => <Icon key={n} name="star" fill className={n <= stars ? 'on' : ''} />)}</div>}
      {open && (
        <div className="pop" style={{ ['--uc' as string]: unit.color, ['--off' as string]: `${off}px` }}>
          <div className="pop-kicker">{unit.title}</div>
          <div className="pop-title">{lesson.title}</div>
          <div className="pop-meta"><span><Icon name="auto_stories" /> {lesson.cards.length} cards</span><span><Icon name="edit_note" /> {lesson.ex.length} exercícios</span></div>
          {locked ? (
            <div className="pop-locked">Complete as lições anteriores para desbloquear (ou ative "Desbloquear tudo" no Perfil).</div>
          ) : (
            <button className="btn primary" onClick={() => go(`/licao/${lesson.id}`)}>{done ? 'Praticar de novo' : 'Começar +10 XP'}</button>
          )}
        </div>
      )}
    </div>
  )
}

function BossNode({ unit, off, locked, open, onToggle }: { unit: Unit; off: number; locked: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className={`node-wrap ${open ? 'open' : ''}`} style={{ transform: `translateX(${off}px)` }}>
      <button className={`node boss ${locked ? 'locked' : ''}`} onClick={onToggle} aria-label={`Teste da unidade ${unit.title}`}>
        <Icon name={locked ? 'lock' : 'trophy'} fill className="node-icon" />
      </button>
      {open && (
        <div className="pop" style={{ ['--uc' as string]: unit.color, ['--off' as string]: `${off}px` }}>
          <div className="pop-kicker">{unit.title}</div>
          <div className="pop-title">Teste da unidade</div>
          <div className="pop-meta">12 questões misturadas de “{unit.title}”</div>
          {locked ? <div className="pop-locked">Conclua todas as lições da unidade.</div> : <button className="btn primary" onClick={() => go(`/teste/${unit.id}`)}>Enfrentar o teste +20 XP</button>}
        </div>
      )}
    </div>
  )
}
