import { useMemo, useState } from 'react'
import { allLessons, courses, courseList, exKey, getExercise, getLesson, simuladoPool } from '../data'
import { Session, type Item } from './Session'
import { ExerciseView, shuffle } from '../components/ExerciseView'
import { Md } from '../components/Md'
import { Placa, placaCodes } from '../components/Placa'
import { addSimulado, addXp, dueReviews, exportData, getState, importData, levelInfo, liveStreak, recordAnswer, resetAll, setState, today, addDays, useStore } from '../store'
import { ACHIEVEMENTS, checkAchievements } from '../achievements'
import { go } from '../router'
import { CourseSwitch } from './Path'
import type { MC } from '../types'

/* ---------------- Lição ---------------- */
export function LessonScreen({ id }: { id: string }) {
  const ref = getLesson(id)
  const [run, setRun] = useState(0)
  const items = useMemo(() => (ref ? ref.lesson.ex.map((ex, i) => ({ key: exKey(id, i), ex })) : []), [id, run])
  if (!ref) return <NotFound />
  const replay = !!getState().completed[id]
  return (
    <Session
      key={run}
      title={ref.lesson.title}
      color={ref.unit.color}
      cards={replay && run > 0 ? [] : ref.lesson.cards}
      items={replay ? shuffle(items) : items}
      mode="lesson"
      lessonId={id}
      onRestart={() => setRun(run + 1)}
    />
  )
}

/* ---------------- Teste da unidade ---------------- */
export function BossScreen({ unitId }: { unitId: string }) {
  const [run, setRun] = useState(0)
  const found = useMemo(() => {
    for (const c of courseList) { const u = c.units.find((x) => x.id === unitId); if (u) return u }
  }, [unitId])
  const items = useMemo(() => {
    if (!found) return []
    const all: Item[] = found.lessons.flatMap((l) => l.ex.map((ex, i) => ({ key: exKey(l.id, i), ex })))
    return shuffle(all).slice(0, 12)
  }, [found, run])
  if (!found) return <NotFound />
  return <Session key={run} title={`Teste: ${found.title}`} color={found.color} items={items} mode="boss" onRestart={() => setRun(run + 1)} />
}

/* ---------------- Revisão ---------------- */
export function ReviewScreen() {
  const srs = useStore((s) => s.srs)
  const course = useStore((s) => s.course)
  const completed = useStore((s) => s.completed)
  const [items, setItems] = useState<Item[] | null>(null)
  const due = dueReviews(getState())
  const dueByCourse = due.filter((k) => getExercise(k)?.ref.course.id === course)
  const doneLessons = allLessons(course).filter((l) => completed[l.id])
  const hardest = Object.entries(srs)
    .filter(([k]) => getExercise(k)?.ref.course.id === course)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 8)

  if (items) return <Session title="Revisão" color="#8b5cf6" items={items} mode="review" back="/revisao" />

  const startDue = () => {
    const list = shuffle(dueByCourse).slice(0, 15).map((k) => ({ key: k, ex: getExercise(k)!.ex }))
    setItems(list)
  }
  const startFree = () => {
    const pool: Item[] = doneLessons.flatMap((l) => l.ex.map((ex, i) => ({ key: exKey(l.id, i), ex })))
    setItems(shuffle(pool).slice(0, 10))
  }
  const upcoming = Object.values(srs).filter((v) => v.due > today() && v.due <= addDays(today(), 7)).length

  return (
    <div className="page">
      <CourseSwitch />
      <h1 className="page-title">🔁 Revisão inteligente</h1>
      <p className="muted">Questões que você errou voltam em intervalos crescentes (1, 3, 7, 14 e 30 dias — caixas de Leitner). Acertou 5 vezes seguidas na revisão? Dominou!</p>
      <div className="grid2">
        <div className="panel center">
          <div className="big-num">{dueByCourse.length}</div>
          <div className="muted">para revisar hoje em {courses[course].title}</div>
          <button className="btn primary big" disabled={!dueByCourse.length} onClick={startDue}>Revisar agora</button>
          <div className="tiny muted">{upcoming} programadas para os próximos 7 dias</div>
        </div>
        <div className="panel center">
          <div className="big-num">🎲</div>
          <div className="muted">Treino livre com questões das lições já feitas</div>
          <button className="btn big" disabled={!doneLessons.length} onClick={startFree}>Treino rápido (10)</button>
          {!doneLessons.length && <div className="tiny muted">Conclua uma lição para liberar.</div>}
        </div>
      </div>
      {hardest.length > 0 && (
        <div className="panel">
          <h3>Mais difíceis pra você</h3>
          <ul className="hard-list">
            {hardest.map(([k, v]) => {
              const e = getExercise(k)!
              return <li key={k}><span className="badge">{v.wrong}× erro</span> <span>{e.ex.q}</span> <span className="tiny muted">— {e.ref.lesson.title}</span></li>
            })}
          </ul>
        </div>
      )}
      {!due.length && !hardest.length && <div className="empty">Você ainda não errou nada! 🎉 Os erros das lições aparecem aqui para revisar no momento certo.</div>}
    </div>
  )
}

/* ---------------- Simulado ---------------- */
type SimState = { keys: string[]; i: number; answers: boolean[]; start: number }

export function SimuladoScreen() {
  const history = useStore((s) => s.simulados)
  const [sim, setSim] = useState<SimState | null>(null)
  const [finished, setFinished] = useState<null | { score: number; total: number; secs: number; wrong: string[] }>(null)
  const pool = useMemo(() => simuladoPool(), [])

  const start = (n: number) => { setFinished(null); setSim({ keys: shuffle(pool).slice(0, n), i: 0, answers: [], start: Date.now() }) }

  if (sim) {
    const k = sim.keys[sim.i]
    const ex = getExercise(k)!.ex as MC
    return (
      <div className="session">
        <header className="session-top">
          <button className="icon-btn" aria-label="Sair" onClick={() => { if (confirm('Abandonar o simulado?')) setSim(null) }}>✕</button>
          <div className="bar"><div className="bar-fill" style={{ width: `${(sim.i / sim.keys.length) * 100}%` }} /></div>
          <div className="sim-count">{sim.i + 1}/{sim.keys.length}</div>
        </header>
        <ExerciseView
          key={k}
          ex={ex}
          exam
          label={`Questão ${sim.i + 1}`}
          onDone={(ok) => {
            const answers = [...sim.answers, ok]
            if (sim.i + 1 >= sim.keys.length) {
              const secs = Math.round((Date.now() - sim.start) / 1000)
              const score = answers.filter(Boolean).length
              const wrong = sim.keys.filter((_, j) => !answers[j])
              wrong.forEach((w) => recordAnswer(w, false))
              addSimulado({ at: today(), score, total: sim.keys.length, secs })
              addXp(score + (score / sim.keys.length >= 2 / 3 ? 15 : 0))
              checkAchievements()
              setFinished({ score, total: sim.keys.length, secs, wrong })
              setSim(null)
            } else setSim({ ...sim, i: sim.i + 1, answers })
          }}
        />
      </div>
    )
  }

  const last = history.slice(-12)
  return (
    <div className="page">
      <h1 className="page-title">📝 Simulado da prova teórica</h1>
      <p className="muted">Formato da prova oficial do DETRAN: <b>30 questões</b> de múltipla escolha com 4 alternativas; aprovação com <b>20 acertos</b> (2/3). Sem feedback durante a prova — a correção vem no final, e os erros vão para a Revisão.</p>

      {finished && (
        <div className={`panel result ${finished.score / finished.total >= 2 / 3 ? 'pass' : 'fail'}`}>
          <div className="big-num">{finished.score}/{finished.total}</div>
          <div className="result-label">{finished.score / finished.total >= 2 / 3 ? '✅ Aprovada!' : '❌ Ainda não — bora revisar'}</div>
          <div className="muted">Tempo: {Math.floor(finished.secs / 60)} min {finished.secs % 60} s</div>
          {finished.wrong.length > 0 && (
            <details className="wrong-list" open>
              <summary>Correção das {finished.wrong.length} que você errou</summary>
              {finished.wrong.map((w) => {
                const e = getExercise(w)!.ex as MC
                return (
                  <div key={w} className="wrong-item">
                    {e.placa && <Placa code={e.placa} size={56} />}
                    <div>
                      <div className="wq">{e.q}</div>
                      <div className="wa">✓ {e.o[e.a]}</div>
                      {e.e && <div className="tiny muted">{e.e}</div>}
                    </div>
                  </div>
                )
              })}
            </details>
          )}
        </div>
      )}

      <div className="grid2">
        <div className="panel center">
          <div className="big-num">30</div>
          <div className="muted">Simulado completo (modo prova)</div>
          <button className="btn primary big" onClick={() => start(30)}>Começar simulado</button>
        </div>
        <div className="panel center">
          <div className="big-num">10</div>
          <div className="muted">Mini simulado rápido</div>
          <button className="btn big" onClick={() => start(10)}>Mini simulado</button>
        </div>
      </div>
      <div className="tiny muted">Banco atual: {pool.length} questões de múltipla escolha da trilha de Direção.</div>

      {last.length > 0 && (
        <div className="panel">
          <h3>Histórico</h3>
          <div className="sim-chart">
            {last.map((r, i) => (
              <div key={i} className="sim-col" title={`${r.score}/${r.total} em ${r.at}`}>
                <div className={`sim-bar ${r.score / r.total >= 2 / 3 ? 'pass' : 'fail'}`} style={{ height: `${(r.score / r.total) * 100}%` }} />
                <span>{Math.round((r.score / r.total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------------- Biblioteca ---------------- */
export function LibraryScreen({ unitId }: { unitId?: string }) {
  const course = useStore((s) => s.course)
  const [q, setQ] = useState('')
  const c = courses[course]
  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
  const nq = norm(q.trim())
  return (
    <div className="page">
      <CourseSwitch />
      <h1 className="page-title">📖 Biblioteca</h1>
      <p className="muted">Toda a teoria das lições em formato de guia de consulta.</p>
      <input className="search" placeholder="Buscar (ex.: Fitts, contraste, rotatória, PPD…)" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar na biblioteca" />
      {course === 'direcao' && !nq && (
        <details className="panel">
          <summary><b>🛑 Galeria de placas</b></summary>
          <div className="placa-grid">{placaCodes.map((p) => <div key={p} className="placa-cell"><Placa code={p} size={72} /><span>{p}</span></div>)}</div>
        </details>
      )}
      {c.units.map((u) => {
        const cards = u.lessons.flatMap((l) => l.cards.map((cd) => ({ ...cd, lesson: l.title })))
        const shown = nq ? cards.filter((cd) => norm(cd.h + ' ' + cd.b).includes(nq)) : cards
        if (!shown.length) return null
        return (
          <details key={u.id} className="panel lib-unit" open={!!nq || unitId === u.id} id={`lib-${u.id}`} style={{ ['--uc' as string]: u.color }}>
            <summary><span className="lib-icon">{u.icon}</span> <b>{u.title}</b> <span className="tiny muted">· {shown.length} tópicos</span></summary>
            {shown.map((cd, i) => (
              <article key={i} className="lib-card">
                <div className="tiny muted">{cd.lesson}</div>
                <h3>{cd.h}</h3>
                {cd.placa && <Placa code={cd.placa} size={72} />}
                <Md text={cd.b} />
              </article>
            ))}
          </details>
        )
      })}
      <Sources course={course} />
    </div>
  )
}

function Sources({ course }: { course: 'ux' | 'direcao' }) {
  const ux = [
    ['Nielsen Norman Group — 10 Usability Heuristics', 'https://www.nngroup.com/articles/ten-usability-heuristics/'],
    ['Design Council — The Double Diamond', 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/'],
    ['W3C — WCAG 2.2', 'https://www.w3.org/TR/WCAG22/'],
    ['Laws of UX (Jon Yablonski)', 'https://lawsofux.com/'],
    ['Atomic Design — Brad Frost', 'https://atomicdesign.bradfrost.com/'],
    ['Design Tokens Community Group (W3C)', 'https://www.designtokens.org/'],
    ['Google HEART framework (Rodden et al., 2010)', 'https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/'],
  ]
  const dir = [
    ['CTB — Lei 9.503/1997 (Planalto)', 'https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm'],
    ['Resolução CONTRAN 1.020/2025', 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10202025.pdf'],
    ['Lei 14.071/2020 (mudanças no CTB)', 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14071.htm'],
    ['Portal do Trânsito — novo exame prático', 'https://www.portaldotransito.com.br/noticias/fiscalizacao-e-legislacao/carteira-de-habilitacao-cnh/primeira-habilitacao/exame-da-cnh-muda-regra-historica-e-acaba-com-a-falta-eliminatoria-no-teste-pratico/'],
    ['Resoluções do CONTRAN (gov.br)', 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran'],
  ]
  const list = course === 'ux' ? ux : dir
  return (
    <div className="panel">
      <h3>Fontes para aprofundar</h3>
      <ul className="sources">{list.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noreferrer">{t}</a></li>)}</ul>
      {course === 'direcao' && <p className="tiny muted">Conteúdo revisado em novembro/2026. Regras do exame e do processo podem variar na implantação de cada DETRAN.</p>}
    </div>
  )
}

/* ---------------- Perfil ---------------- */
export function ProfileScreen() {
  const s = useStore((x) => x)
  const lv = levelInfo(s.xp)
  const days = Array.from({ length: 14 }, (_, i) => addDays(today(), i - 13))
  const maxXp = Math.max(s.dailyGoal, ...days.map((d) => s.xpByDay[d] ?? 0))
  const lessonsDone = Object.keys(s.completed).length
  const totalLessons = courseList.reduce((n, c) => n + allLessons(c.id).length, 0)

  const doExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `dragaum-progresso-${today()}.json`
    a.click()
  }
  const doImport = (f: File) => {
    f.text().then((t) => { try { importData(t); alert('Progresso importado!') } catch { alert('Arquivo inválido.') } })
  }

  return (
    <div className="page">
      <div className="profile-head">
        <div className="avatar">🐉</div>
        <div>
          <input className="name-input" value={s.name} placeholder="Seu nome" onChange={(e) => setState((st) => ({ ...st, name: e.target.value }))} aria-label="Seu nome" />
          <div className="muted">Nível {lv.level} · {lv.title}</div>
          <div className="lvl-bar"><div style={{ width: `${lv.pct * 100}%` }} /></div>
          <div className="tiny muted">{s.xp - lv.cur}/{lv.next - lv.cur} XP para o próximo nível</div>
        </div>
      </div>

      <div className="stats-grid">
        <Stat icon="⚡" v={s.xp} l="XP total" />
        <Stat icon="🔥" v={liveStreak(s)} l="Ofensiva atual" />
        <Stat icon="🏅" v={s.bestStreak} l="Melhor ofensiva" />
        <Stat icon="🛡️" v={s.freezes} l="Escudos de ofensiva" />
        <Stat icon="📘" v={`${lessonsDone}/${totalLessons}`} l="Lições" />
        <Stat icon="🎯" v={s.answered ? `${Math.round((s.correct / s.answered) * 100)}%` : '—'} l="Precisão" />
        <Stat icon="💎" v={s.perfect} l="Lições perfeitas" />
        <Stat icon="📝" v={s.simulados.length} l="Simulados" />
      </div>

      <div className="panel">
        <h3>Últimos 14 dias</h3>
        <div className="xp-chart">
          {days.map((d) => {
            const v = s.xpByDay[d] ?? 0
            return (
              <div key={d} className="xp-col" title={`${d}: ${v} XP`}>
                <div className={`xp-bar ${v >= s.dailyGoal ? 'hit' : ''}`} style={{ height: `${(v / maxXp) * 100}%` }} />
                <span>{d.slice(8)}</span>
              </div>
            )
          })}
        </div>
        <div className="tiny muted">Escudo: ganha 1 a cada 7 dias de ofensiva (máx. 3). Ele protege a ofensiva automaticamente se você faltar um dia.</div>
      </div>

      <div className="panel">
        <h3>Conquistas ({Object.keys(s.achievements).length}/{ACHIEVEMENTS.length})</h3>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.id} className={`ach ${s.achievements[a.id] ? 'on' : ''}`} title={a.desc}>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-title">{a.title}</div>
              <div className="tiny muted">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel settings">
        <h3>Configurações</h3>
        <label className="set-row">Meta diária
          <select value={s.dailyGoal} onChange={(e) => setState((st) => ({ ...st, dailyGoal: Number(e.target.value) }))}>
            {[10, 20, 30, 50, 80, 120].map((n) => <option key={n} value={n}>{n} XP {n <= 10 ? '(tranquila)' : n <= 30 ? '(regular)' : n <= 50 ? '(séria)' : '(intensa)'}</option>)}
          </select>
        </label>
        <label className="set-row">Tema
          <select value={s.theme} onChange={(e) => setState((st) => ({ ...st, theme: e.target.value as 'auto' }))}>
            <option value="auto">Automático</option>
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </label>
        <label className="set-row">Sons<input type="checkbox" checked={s.sound} onChange={(e) => setState((st) => ({ ...st, sound: e.target.checked }))} /></label>
        <label className="set-row">Desbloquear todas as lições<input type="checkbox" checked={s.unlockAll} onChange={(e) => setState((st) => ({ ...st, unlockAll: e.target.checked }))} /></label>
        <div className="set-actions">
          <button className="btn" onClick={doExport}>⬇️ Exportar progresso</button>
          <label className="btn">⬆️ Importar<input type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} /></label>
          <button className="btn danger-outline" onClick={() => { if (confirm('Apagar todo o progresso? Isso não pode ser desfeito.')) resetAll() }}>Apagar progresso</button>
        </div>
        <p className="tiny muted">Seu progresso fica salvo neste aparelho. Use exportar/importar para levar do celular para o computador.</p>
      </div>
    </div>
  )
}

function Stat({ icon, v, l }: { icon: string; v: React.ReactNode; l: string }) {
  return <div className="stat"><div className="stat-icon">{icon}</div><div className="stat-v">{v}</div><div className="tiny muted">{l}</div></div>
}

export function NotFound() {
  return <div className="page center"><h1>🐉 Ops, caminho errado</h1><button className="btn primary" onClick={() => go('/')}>Voltar para a trilha</button></div>
}
