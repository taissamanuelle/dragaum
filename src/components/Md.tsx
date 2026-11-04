import { Fragment } from 'react'

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

/** markdown mínimo: parágrafos, listas (- e 1.), negrito, itálico, código */
export function Md({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)
  return (
    <div className="md">
      {blocks.map((b, i) => {
        const lines = b.split('\n')
        if (lines.every((l) => /^\s*- /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*- /, ''))}</li>)}</ul>
        if (lines.every((l) => /^\s*\d+\. /.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*\d+\. /, ''))}</li>)}</ol>
        // bloco misto: texto seguido de lista
        const out: React.ReactNode[] = []
        let list: string[] = []
        let ordered = false
        const flush = () => {
          if (!list.length) return
          const items = list.map((l, j) => <li key={j}>{inline(l)}</li>)
          out.push(ordered ? <ol key={out.length}>{items}</ol> : <ul key={out.length}>{items}</ul>)
          list = []
        }
        for (const l of lines) {
          if (/^\s*- /.test(l)) { if (ordered) flush(); ordered = false; list.push(l.replace(/^\s*- /, '')) }
          else if (/^\s*\d+\. /.test(l)) { if (!ordered) flush(); ordered = true; list.push(l.replace(/^\s*\d+\. /, '')) }
          else { flush(); out.push(<p key={out.length}>{inline(l)}</p>) }
        }
        flush()
        return <Fragment key={i}>{out}</Fragment>
      })}
    </div>
  )
}
