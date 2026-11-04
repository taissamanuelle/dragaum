import { useMemo, useRef, useState } from 'react'
import type { Card, Exercise } from '../types'
import { ExerciseView } from '../components/ExerciseView'
import { Md } from '../components/Md'
import { Placa } from '../components/Placa'
import { addXp, completeLesson, recordAnswer } from '../store'
import { checkAchievements, type Achievement } from '../achievements'
import { sfx } from '../sound'
import { go } from '../router'
import { Icon } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { ask } from '../components/Confirm'

export type Item = { key: string; ex: Exercise }

type Props = {
  title: string
  color: string
  cards?: Card[]
  items: Item[]
  mode: 'lesson' | 'boss' | 'review'
  lessonId?: string
  onRestart?: () => void
  back?: string
}

export function Session({ title, color, cards = [], items, mode, lessonId, onRestart, back = '/' }: Props) {
  const [phase, setPhase] = useState<'cards' | 'ex' | 'end'>(cards.length ? 'cards' : 'ex')
  const [ci, setCi] = useState(0)
  const [queue, setQueue] = useState<Item[]>(items)
  const [qi, setQi] = useState(0)
  const firstTry = useRef(new Map<string, boolean>())
  const [doneCount, setDoneCount] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [result, setResult] = useState<{ xp: number; acc: number; stars: number; ach: Achievement[] } | null>(null)

  const total = items.length
  const progress = phase === 'cards' ? (ci / Math.max(cards.length, 1)) * 0.15 : 0.15 + (doneCount / total) * 0.85

  function onCheck(it: Item, ok: boolean) {
    if (!firstTry.current.has(it.key)) {
      firstTry.current.set(it.key, ok)
      recordAnswer(it.key, ok, mode === 'review')
    } else if (mode === 'review' && !ok) {
      /* já registrado */
    }
    if (ok) {
      const c = combo + 1
      setCombo(c)
      setMaxCombo((m) => Math.max(m, c))
    } else setCombo(0)
  }

  function onDone(it: Item, ok: boolean) {
    let q = queue
    if (ok) setDoneCount((d) => d + 1)
    else q = [...queue, it] // volta no fim
    if (qi + 1 >= q.length) finish()
    else {
      setQueue(q)
      setQi(qi + 1)
    }
  }

  function finish() {
    const vals = [...firstTry.current.values()]
    const correct = vals.filter(Boolean).length
    const acc = vals.length ? correct / vals.length : 1
    let xp = 0
    let stars = 0
    if (mode === 'lesson') {
      xp = 10 + correct + (acc >= 1 ? 5 : 0)
      stars = completeLesson(lessonId!, acc)
    } else if (mode === 'boss') {
      xp = 20 + correct * 2 + (acc >= 1 ? 10 : 0)
      stars = acc >= 1 ? 3 : acc >= 0.8 ? 2 : 1
    } else {
      xp = 5 + correct * 2
      stars = acc >= 1 ? 3 : acc >= 0.7 ? 2 : 1
    }
    addXp(xp)
    const ach = checkAchievements()
    sfx.win()
    setResult({ xp, acc, stars, ach })
    setPhase('end')
  }

  const cur = queue[qi]

  return (
    <div className="session" style={{ ['--accent' as string]: color }}>
      <header className="session-top">
        <button className="icon-btn" aria-label="Sair" onClick={async () => { if (phase === 'end' || await ask({ title: 'Vai embora agora?', text: 'Se sair, o progresso desta sessão será perdido.', ok: 'Sair', cancel: 'Continuar estudando', danger: true })) go(back) }}><Icon name="close" /></button>
        <div className="bar" aria-label="Progresso"><div className="bar-fill" style={{ width: `${progress * 100}%` }} /></div>
        {combo >= 3 && phase === 'ex' && <div className="combo"><Icon name="local_fire_department" fill />{combo}</div>}
      </header>

      {phase === 'cards' && (
        <div className="cards-wrap">
          <div className="lesson-title-small">{title}</div>
          <article className="theory-card" key={ci}>
            <div className="theory-step">Teoria {ci + 1}/{cards.length}</div>
            <h2>{cards[ci].h}</h2>
            {cards[ci].placa && <div className="ex-placa"><Placa code={cards[ci].placa!} size={110} /></div>}
            <Md text={cards[ci].b} />
          </article>
          <div className="ex-footer">
            <div className="ex-footer-inner row">
              <button className="btn ghost" disabled={ci === 0} onClick={() => setCi(ci - 1)}>Voltar</button>
              {ci + 1 < cards.length ? (
                <button className="btn primary big" onClick={() => setCi(ci + 1)} autoFocus>Próximo</button>
              ) : (
                <button className="btn primary big" onClick={() => setPhase('ex')} autoFocus>Praticar ({total})</button>
              )}
              <button className="btn ghost" onClick={() => setPhase('ex')}>Pular</button>
            </div>
          </div>
        </div>
      )}

      {phase === 'ex' && cur && (
        <ExerciseView key={`${cur.key}-${qi}`} ex={cur.ex} onCheck={(ok) => onCheck(cur, ok)} onDone={(ok) => onDone(cur, ok)} />
      )}

      {phase === 'end' && result && (
        <EndScreen
          title={mode === 'review' ? 'Revisão concluída!' : mode === 'boss' ? 'Teste da unidade concluído!' : 'Lição concluída!'}
          {...result}
          maxCombo={maxCombo}
          onContinue={() => go(back)}
          onRestart={onRestart}
        />
      )}
    </div>
  )
}

function EndScreen({ title, xp, acc, stars, ach, maxCombo, onContinue, onRestart }: { title: string; xp: number; acc: number; stars: number; ach: Achievement[]; maxCombo: number; onContinue: () => void; onRestart?: () => void }) {
  const confetti = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ i, left: Math.random() * 100, delay: Math.random() * 0.8, hue: ['#e11d2a', '#ffc23d', '#ff7a1a', '#ffe9b8', '#be123c'][i % 5] })), [])
  return (
    <div className="end">
      <div className="confetti" aria-hidden>
        {confetti.map((c) => <span key={c.i} style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, background: c.hue }} />)}
      </div>
      <Mascot mood={acc >= 0.8 ? 'happy' : 'thinking'} size={190} className="end-dragon" />
      <h1>{acc >= 0.8 ? title : 'Concluído! Bora revisar os erros?'}</h1>
      <div className="stars">{[1, 2, 3].map((n) => <Icon key={n} name="star" fill className={n <= stars ? 'on' : ''} />)}</div>
      <div className="end-stats">
        <div className="stat-box xp"><div className="stat-label"><Icon name="bolt" fill /> XP</div><div className="stat-val">+{xp}</div></div>
        <div className="stat-box acc"><div className="stat-label"><Icon name="target" /> Precisão</div><div className="stat-val">{Math.round(acc * 100)}%</div></div>
        <div className="stat-box combo-box"><div className="stat-label"><Icon name="local_fire_department" fill /> Combo</div><div className="stat-val">{maxCombo}</div></div>
      </div>
      {ach.length > 0 && (
        <div className="new-ach">
          <div className="new-ach-title">Conquista desbloqueada!</div>
          {ach.map((a) => <div key={a.id} className="ach-pill"><Icon name={a.icon} fill /> {a.title}</div>)}
        </div>
      )}
      <div className="end-actions">
        {onRestart && <button className="btn ghost" onClick={onRestart}>Refazer</button>}
        <button className="btn primary big" onClick={onContinue} autoFocus>Continuar</button>
      </div>
    </div>
  )
}
