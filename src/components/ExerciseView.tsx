import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../types'
import { Placa } from './Placa'
import { sfx, vibrate } from '../sound'
import { Icon } from './Icon'
import { Mascot } from './Mascot'

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const praise = ['Mandou bem!', 'Isso aí!', 'Perfeito!', 'Arrasou!', 'Dragão sabe!', 'Correto!', 'Show!']
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]

type Props = {
  ex: Exercise
  onCheck?: (ok: boolean) => void
  onDone: (ok: boolean) => void
  /** modo prova: sem feedback, avança direto */
  exam?: boolean
  label?: string
}

export function ExerciseView({ ex, onCheck, onDone, exam, label }: Props) {
  const [checked, setChecked] = useState<null | boolean>(null)
  const [msg] = useState(() => pick(praise))

  // --- MC / TF
  const opts = useMemo(() => {
    if (ex.t === 'mc') return shuffle(ex.o.map((text, i) => ({ text, ok: i === ex.a })))
    if (ex.t === 'tf') return [{ text: 'Verdadeiro', ok: ex.a === true }, { text: 'Falso', ok: ex.a === false }]
    return []
  }, [ex])
  const [sel, setSel] = useState<number | null>(null)

  // --- ORDER
  const bank0 = useMemo(() => {
    if (ex.t !== 'order') return []
    let s = shuffle(ex.items.map((text, i) => ({ text, i })))
    if (s.every((x, k) => x.i === k) && s.length > 1) s = [...s.slice(1), s[0]]
    return s
  }, [ex])
  const [picked, setPicked] = useState<number[]>([])

  // --- MATCH
  const right = useMemo(() => (ex.t === 'match' ? shuffle(ex.pairs.map((p, i) => ({ text: p[1], i }))) : []), [ex])
  const left = useMemo(() => (ex.t === 'match' ? shuffle(ex.pairs.map((p, i) => ({ text: p[0], i }))) : []), [ex])
  const [selL, setSelL] = useState<number | null>(null)
  const [selR, setSelR] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [wrongFlash, setWrongFlash] = useState<[number, number] | null>(null)
  const mistakes = useRef(0)

  const canCheck =
    checked === null &&
    ((ex.t === 'mc' || ex.t === 'tf') ? sel !== null : ex.t === 'order' ? picked.length === bank0.length : false)

  function check() {
    if (!canCheck) return
    let ok = false
    if (ex.t === 'mc' || ex.t === 'tf') ok = opts[sel!].ok
    if (ex.t === 'order') ok = picked.every((p, k) => bank0[p].i === k)
    finish(ok)
  }

  function finish(ok: boolean) {
    onCheck?.(ok)
    if (exam) {
      onDone(ok)
      return
    }
    setChecked(ok)
    if (ok) { sfx.ok(); vibrate(15) } else { sfx.bad(); vibrate([30, 40, 30]) }
  }

  // match logic
  useEffect(() => {
    if (ex.t !== 'match' || selL === null || selR === null) return
    if (selL === selR) {
      sfx.tap()
      const m = [...matched, selL]
      setMatched(m)
      setSelL(null); setSelR(null)
      if (m.length === ex.pairs.length) setTimeout(() => finish(mistakes.current === 0), 250)
    } else {
      mistakes.current++
      setWrongFlash([selL, selR])
      vibrate(30)
      const t = setTimeout(() => { setWrongFlash(null); setSelL(null); setSelR(null) }, 450)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selL, selR])

  // teclado
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (e.key === 'Enter') {
        e.preventDefault()
        if (checked !== null) onDone(checked)
        else check()
        return
      }
      if (checked === null && (ex.t === 'mc' || ex.t === 'tf')) {
        const n = Number(e.key)
        if (n >= 1 && n <= opts.length) { setSel(n - 1); sfx.tap() }
      }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  })

  const correctText =
    ex.t === 'mc' ? ex.o[ex.a] : ex.t === 'tf' ? (ex.a ? 'Verdadeiro' : 'Falso') : ex.t === 'order' ? ex.items.join(' → ') : ''

  const title =
    ex.t === 'match' ? 'Ligue os pares' : ex.t === 'order' ? 'Coloque na ordem' : ex.t === 'tf' ? 'Verdadeiro ou falso?' : label ?? 'Escolha a resposta'

  return (
    <div className="exercise">
      <div className="ex-body">
        <div className="ex-kind">{title}</div>
        <h2 className="ex-q">{ex.q}</h2>
        {'placa' in ex && ex.placa && (
          <div className="ex-placa"><Placa code={ex.placa} size={140} /></div>
        )}

        {(ex.t === 'mc' || ex.t === 'tf') && (
          <div className={`options ${ex.t === 'tf' ? 'tf' : ''}`} role="radiogroup">
            {opts.map((o, i) => {
              const state =
                checked === null ? (sel === i ? 'sel' : '') : o.ok ? 'right' : sel === i ? 'wrong' : 'dim'
              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={sel === i}
                  className={`option ${state}`}
                  data-ok={o.ok || undefined}
                  disabled={checked !== null}
                  onClick={() => { setSel(i); sfx.tap() }}
                >
                  <span className="kbd">{i + 1}</span>
                  <span>{o.text}</span>
                </button>
              )
            })}
          </div>
        )}

        {ex.t === 'order' && (
          <>
            <div className={`order-answer ${checked === true ? 'right' : checked === false ? 'wrong' : ''}`}>
              {picked.length === 0 && <span className="order-hint">Toque nos itens abaixo na ordem certa</span>}
              {picked.map((p, k) => (
                <button key={p} className="chip picked" disabled={checked !== null} onClick={() => setPicked(picked.filter((x) => x !== p))}>
                  <span className="chip-n">{k + 1}</span>{bank0[p].text}
                </button>
              ))}
            </div>
            <div className="order-bank">
              {bank0.map((b, k) => (
                <button key={k} data-i={b.i} className={`chip ${picked.includes(k) ? 'ghost' : ''}`} disabled={picked.includes(k) || checked !== null} onClick={() => { setPicked([...picked, k]); sfx.tap() }}>
                  {b.text}
                </button>
              ))}
            </div>
          </>
        )}

        {ex.t === 'match' && (
          <div className="match">
            <div className="match-col">
              {left.map((l) => (
                <button
                  key={l.i}
                  data-i={l.i}
                  className={`option small ${matched.includes(l.i) ? 'done' : selL === l.i ? 'sel' : ''} ${wrongFlash?.[0] === l.i ? 'wrong shake' : ''}`}
                  disabled={matched.includes(l.i) || checked !== null}
                  onClick={() => { setSelL(l.i); sfx.tap() }}
                >{l.text}</button>
              ))}
            </div>
            <div className="match-col">
              {right.map((r) => (
                <button
                  key={r.i}
                  data-i={r.i}
                  className={`option small ${matched.includes(r.i) ? 'done' : selR === r.i ? 'sel' : ''} ${wrongFlash?.[1] === r.i ? 'wrong shake' : ''}`}
                  disabled={matched.includes(r.i) || checked !== null}
                  onClick={() => { setSelR(r.i); sfx.tap() }}
                >{r.text}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`ex-footer ${checked === true ? 'ok' : checked === false ? 'bad' : ''}`}>
        <div className="ex-footer-inner">
          {checked !== null && (
            <div className="feedback" role="status">
              <Mascot mood={checked ? 'happy' : ex.t === 'match' ? 'thinking' : 'sad'} size={84} className="fb-mascot" decorative />
              <div className="fb-text">
              <div className="fb-title"><Icon name={checked ? 'check_circle' : 'cancel'} fill /> {checked ? msg : ex.t === 'match' ? 'Você errou alguns pares' : 'Resposta correta:'}</div>
              {!checked && correctText && <div className="fb-answer">{correctText}</div>}
              {ex.e && <div className="fb-exp">{ex.e}</div>}
              </div>
            </div>
          )}
          {checked === null ? (
            ex.t !== 'match' && (
              <button className="btn primary big" disabled={!canCheck} onClick={check}>{exam ? 'Responder' : 'Verificar'}</button>
            )
          ) : (
            <button className={`btn big ${checked ? 'success' : 'danger'}`} onClick={() => onDone(checked)} autoFocus>Continuar</button>
          )}
        </div>
      </div>
    </div>
  )
}
