// Valida o conteúdo: índices de resposta, placas existentes, ids únicos.
import { build } from 'esbuild'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const out = join(mkdtempSync(join(tmpdir(), 'dragaum-')), 'data.mjs')
await build({
  stdin: { contents: "export * from './src/data/index.ts'; export { placaCodes } from './src/components/Placa.tsx'", resolveDir: process.cwd(), loader: 'ts' },
  bundle: true, format: 'esm', platform: 'node', outfile: out, jsx: 'automatic', logLevel: 'error',
})
const { courseList, placaCodes, simuladoPool } = await import(out)
const errs = []
const ids = new Set()
let lessons = 0, exs = 0, cards = 0
for (const c of courseList) for (const u of c.units) for (const l of u.lessons) {
  lessons++
  if (ids.has(l.id)) errs.push(`id duplicado ${l.id}`)
  ids.add(l.id)
  cards += l.cards.length
  for (const cd of l.cards) if (cd.placa && !placaCodes.includes(cd.placa)) errs.push(`${l.id}: placa ${cd.placa}`)
  l.ex.forEach((e, i) => {
    exs++
    const w = `${l.id}#${i}`
    if (e.t === 'mc') {
      if (!(e.a >= 0 && e.a < e.o.length)) errs.push(`${w}: índice inválido`)
      if (new Set(e.o).size !== e.o.length) errs.push(`${w}: opções repetidas`)
    }
    if (e.placa && !placaCodes.includes(e.placa)) errs.push(`${w}: placa ${e.placa}`)
    if (e.t === 'match') {
      if (new Set(e.pairs.map((p) => p[0])).size !== e.pairs.length || new Set(e.pairs.map((p) => p[1])).size !== e.pairs.length) errs.push(`${w}: pares repetidos`)
    }
    if (e.t === 'order' && new Set(e.items).size !== e.items.length) errs.push(`${w}: itens repetidos`)
  })
}
// nada de travessões no app
for (const c of courseList) for (const u of c.units) for (const l of u.lessons) {
  const blob = JSON.stringify(l)
  if (/[\u2013\u2014]/.test(blob)) errs.push(`${l.id}: contém travessão`)
}
console.log(`${courseList.length} trilhas · ${lessons} lições · ${cards} cards · ${exs} exercícios · simulado: ${simuladoPool().length} questões`)
if (errs.length) { console.error(errs.join('\n')); process.exit(1) }
console.log('conteúdo ok')
