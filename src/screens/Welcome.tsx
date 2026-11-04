import { useRef, useState } from 'react'
import { allLessons, courseList } from '../data'
import { importData, setState } from '../store'
import { go } from '../router'
import { Icon } from '../components/Icon'
import { Mascot, type Mood } from '../components/Mascot'
import type { CourseId } from '../types'

const GOALS = [
  { xp: 10, title: 'Casual', time: '5 min por dia' },
  { xp: 30, title: 'Regular', time: '10 min por dia' },
  { xp: 50, title: 'Séria', time: '15 min por dia' },
  { xp: 80, title: 'Intensa', time: '20 min por dia' },
]

/** Boas-vindas + onboarding em etapas (estilo conversa com o mascote) */
export function Welcome({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [course, setCourse] = useState<CourseId | null>(null)
  const [goal, setGoal] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [importErr, setImportErr] = useState('')

  const finish = (toLesson: boolean) => {
    const c = course ?? 'ux'
    setState((s) => ({ ...s, name: name.trim() || 'Dragoa', dailyGoal: goal ?? 30, course: c }))
    onDone()
    go(toLesson ? `/licao/${allLessons(c)[0].id}` : '/')
  }

  if (step === 0) {
    return (
      <div className="welcome">
        <div className="welcome-hero">
          <div className="welcome-glow" aria-hidden />
          <Mascot mood="hello" size={230} className="welcome-mascot" />
          <h1 className="wordmark">dragaum</h1>
          <p className="welcome-tagline">O jeito divertido de aprender <b>UX Design</b> e a <b>teoria da CNH</b>, alguns minutos por dia.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn primary big" onClick={() => setStep(1)}>Começar</button>
          <button className="btn big" onClick={() => fileRef.current?.click()}>Já tenho progresso salvo</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (!f) return
              f.text().then((t) => {
                try { importData(t); onDone(); go('/') } catch { setImportErr('Esse arquivo não parece um progresso do Dragaum.') }
              })
            }}
          />
          {importErr && <p className="form-error" role="alert"><Icon name="error" fill /> {importErr}</p>}
          <p className="tiny muted center">Seu progresso fica salvo neste aparelho.</p>
        </div>
      </div>
    )
  }

  const steps = 4
  const canNext = step === 1 ? name.trim().length > 0 : step === 2 ? !!course : step === 3 ? goal !== null : true
  const next = () => canNext && setStep(step + 1)
  const say: Record<number, { mood: Mood; text: string }> = {
    1: { mood: 'hello', text: 'Oi! Eu sou o Dragaum. Como posso te chamar?' },
    2: { mood: 'thinking', text: `Prazer, ${name.trim() || 'dragoa'}! O que você quer aprender primeiro?` },
    3: { mood: 'thinking', text: 'Qual vai ser sua meta diária?' },
    4: { mood: 'happy', text: `Tudo pronto, ${name.trim() || 'dragoa'}! Bora pra primeira lição?` },
  }

  return (
    <div className="onb">
      <header className="onb-top">
        <button className="icon-btn" aria-label="Voltar" onClick={() => setStep(step - 1)}><Icon name="arrow_back" /></button>
        <div className="bar"><div className="bar-fill" style={{ width: `${(step / steps) * 100}%` }} /></div>
      </header>

      <main className="onb-body" key={step}>
        <div className={`speaker ${step === 4 ? 'big' : ''}`}>
          <Mascot mood={say[step].mood} size={step === 4 ? 160 : 104} decorative />
          <div className="speech" role="status">{say[step].text}</div>
        </div>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); next() }} className="onb-form">
            <label htmlFor="onb-name" className="sr-only">Seu nome</label>
            <input id="onb-name" className="field" autoFocus autoComplete="given-name" maxLength={30} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
          </form>
        )}

        {step === 2 && (
          <div className="choice-list" role="radiogroup" aria-label="Trilha">
            {courseList.map((c) => (
              <button key={c.id} role="radio" aria-checked={course === c.id} className={`choice ${course === c.id ? 'on' : ''}`} onClick={() => setCourse(c.id)}>
                <span className="choice-tile"><Icon name={c.icon} fill /></span>
                <span className="choice-text">
                  <b>{c.title}</b>
                  <span>{c.tagline}</span>
                </span>
                <span className="choice-meta">{allLessons(c.id).length} lições</span>
              </button>
            ))}
            <p className="tiny muted">Dá para trocar de trilha a qualquer momento.</p>
          </div>
        )}

        {step === 3 && (
          <div className="choice-list" role="radiogroup" aria-label="Meta diária">
            {GOALS.map((g) => (
              <button key={g.xp} role="radio" aria-checked={goal === g.xp} className={`choice row ${goal === g.xp ? 'on' : ''}`} onClick={() => setGoal(g.xp)}>
                <span className="choice-text"><b>{g.title}</b><span>{g.time}</span></span>
                <span className="choice-meta">{g.xp} XP</span>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="ready">
            <div className="ready-item"><Icon name={course === 'direcao' ? 'directions_car' : 'palette'} fill /><span>{courseList.find((c) => c.id === course)?.title}</span></div>
            <div className="ready-item"><Icon name="flag" fill /><span>Meta de {goal} XP por dia</span></div>
            <div className="ready-item"><Icon name="local_fire_department" fill /><span>Comece hoje sua ofensiva</span></div>
          </div>
        )}
      </main>

      <footer className="onb-footer">
        {step < 4 ? (
          <button className="btn primary big" disabled={!canNext} onClick={next}>Continuar</button>
        ) : (
          <>
            <button className="btn primary big" onClick={() => finish(true)}>Começar a primeira lição</button>
            <button className="btn ghost" onClick={() => finish(false)}>Ver a trilha primeiro</button>
          </>
        )}
      </footer>
    </div>
  )
}
