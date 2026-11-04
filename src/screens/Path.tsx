import { useEffect, useState } from 'react'
import { courses, courseList } from '../data'
import { setState, useStore } from '../store'
import { go } from '../router'
import type { Lesson, Unit } from '../types'

export function CourseSwitch() {
  const course = useStore((s) => s.course)
  return (
    <div className="course-switch" role="tablist">
      {courseList.map((c) => (
        <button key={c.id} role="tab" aria-selected={course === c.id} className={course === c.id ? 'on' : ''} onClick={() => setState((s) => ({ ...s, course: c.id }))}>
          <span>{c.icon}</span> {c.title}
        </button>
      ))}
    </div>
  )
}

const OFFSETS = [0, 46, 70, 46, 0, -46, -70, -46]

export function Path() {
  const courseId = useStore((s) => s.course)
  const completed = useStore((s) => s.completed)
  const unlockAll = useStore((s) => s.unlockAll)
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
      <div className="mobile-only"><CourseSwitch /></div>
      {course.units.map((u, ui) => {
        const doneN = u.lessons.filter((l) => completed[l.id]).length
        const allDone = doneN === u.lessons.length
        return (
          <section key={u.id} className="unit" style={{ ['--uc' as string]: u.color }}>
            <div className="unit-banner">
              <div>
                <div className="unit-kicker">Unidade {ui + 1}</div>
                <h2>{u.icon} {u.title}</h2>
                <p>{u.desc}</p>
              </div>
              <button className="btn banner-btn" onClick={() => go(`/biblioteca/${u.id}`)} title="Ler a teoria da unidade">📖 Guia</button>
            </div>
            <div className="unit-progress"><div style={{ width: `${(doneN / u.lessons.length) * 100}%` }} /></div>
            <div className="nodes">
              {u.lessons.map((l) => {
                const off = OFFSETS[k++ % OFFSETS.length]
                return (
                  <Node key={l.id} lesson={l} unit={u} off={off} done={!!completed[l.id]} stars={completed[l.id]?.stars ?? 0} current={l.id === firstOpen} locked={!unlocked(l.id)} open={open === l.id} onToggle={() => setOpen(open === l.id ? null : l.id)} />
                )
              })}
              <BossNode unit={u} off={OFFSETS[k++ % OFFSETS.length]} locked={!allDone && !unlockAll} open={open === `boss-${u.id}`} onToggle={() => setOpen(open === `boss-${u.id}` ? null : `boss-${u.id}`)} />
            </div>
          </section>
        )
      })}
      <div className="path-end">🏆 Fim da trilha — continue revisando para não esquecer!</div>
    </div>
  )
}

function Node({ lesson, unit, off, done, stars, current, locked, open, onToggle }: { lesson: Lesson; unit: Unit; off: number; done: boolean; stars: number; current: boolean; locked: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className="node-wrap" id={`node-${lesson.id}`} style={{ transform: `translateX(${off}px)` }}>
      {current && !open && <div className="start-bubble">COMEÇAR</div>}
      <button className={`node ${done ? 'done' : ''} ${current ? 'current' : ''} ${locked ? 'locked' : ''}`} onClick={onToggle} aria-label={`${lesson.title}${locked ? ' (bloqueada)' : ''}`} aria-expanded={open}>
        <span className="node-icon">{locked ? '🔒' : done ? '✓' : '★'}</span>
      </button>
      {done && <div className="node-stars">{[1, 2, 3].map((n) => <span key={n} className={n <= stars ? 'on' : ''}>★</span>)}</div>}
      {open && (
        <div className="pop" style={{ ['--uc' as string]: unit.color, ['--off' as string]: `${off}px` }}>
          <div className="pop-title">{lesson.title}</div>
          <div className="pop-meta">{lesson.cards.length} cards de teoria · {lesson.ex.length} exercícios</div>
          {locked ? (
            <div className="pop-locked">Complete as lições anteriores para desbloquear (ou ative "Desbloquear tudo" no Perfil).</div>
          ) : (
            <button className="btn primary" onClick={() => go(`/licao/${lesson.id}`)}>{done ? 'Praticar de novo (+XP)' : 'Começar +10 XP'}</button>
          )}
        </div>
      )}
    </div>
  )
}

function BossNode({ unit, off, locked, open, onToggle }: { unit: Unit; off: number; locked: boolean; open: boolean; onToggle: () => void }) {
  return (
    <div className="node-wrap" style={{ transform: `translateX(${off}px)` }}>
      <button className={`node boss ${locked ? 'locked' : ''}`} onClick={onToggle} aria-label={`Teste da unidade ${unit.title}`}>
        <span className="node-icon">{locked ? '🔒' : '🏆'}</span>
      </button>
      {open && (
        <div className="pop" style={{ ['--uc' as string]: unit.color, ['--off' as string]: `${off}px` }}>
          <div className="pop-title">Teste da unidade</div>
          <div className="pop-meta">12 questões misturadas de “{unit.title}”</div>
          {locked ? <div className="pop-locked">Conclua todas as lições da unidade.</div> : <button className="btn primary" onClick={() => go(`/teste/${unit.id}`)}>Enfrentar o chefão +20 XP</button>}
        </div>
      )}
    </div>
  )
}
