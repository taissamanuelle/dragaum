import { dailyQuests, useStore } from '../store'
import { Icon } from './Icon'

export function Quests({ compact }: { compact?: boolean }) {
  const s = useStore((x) => x)
  const quests = dailyQuests(s)
  return (
    <ul className={`quests ${compact ? 'compact' : ''}`}>
      {quests.map((q) => {
        const done = q.cur >= q.max
        return (
          <li key={q.id} className={`quest ${done ? 'done' : ''}`}>
            <span className="quest-icon"><Icon name={done ? 'check' : q.icon} fill /></span>
            <div className="quest-body">
              <div className="quest-title">{q.title}</div>
              <div className="quest-bar" role="progressbar" aria-valuenow={q.cur} aria-valuemax={q.max} aria-label={q.title}>
                <div style={{ width: `${(q.cur / q.max) * 100}%` }} />
                <span>{q.cur}/{q.max}</span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
