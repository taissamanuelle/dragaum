// Baixa e auto-hospeda as fontes: Nunito e Material Symbols Rounded (só os ícones usados).
// Uso: node scripts/fonts.mjs   (rode de novo sempre que usar um ícone novo)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
const names = new Set()
for (const f of walk('src')) {
  if (!/\.(tsx?|css)$/.test(f)) continue
  const src = readFileSync(f, 'utf8')
  for (const re of [/name="([a-z0-9_]+)"/g, /icon: '([a-z0-9_]+)'/g, /name=\{[^}]*?'([a-z0-9_]+)'[^}]*\}/g, /icon="([a-z0-9_]+)"/g]) for (const m of src.matchAll(re)) names.add(m[1])
  // ternários: name={x ? 'a' : 'b'}
  for (const m of src.matchAll(/name=\{([^}]+)\}/g)) for (const q of m[1].matchAll(/'([a-z0-9_]+)'/g)) names.add(q[1])
  for (const m of src.matchAll(/mood=|ICONS?:\s*\[([^\]]+)\]/g)) if (m[1]) for (const q of m[1].matchAll(/'([a-z0-9_]+)'/g)) names.add(q[1])
}
const list = [...names].sort()
console.log(list.length, 'ícones:', list.join(', '))

async function grab(cssUrl, out, family) {
  const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text()
  const faces = [...css.matchAll(/@font-face\s*{([^}]+)}/g)].map((m) => m[1])
  let outCss = ''
  let i = 0
  for (const face of faces) {
    const url = face.match(/url\(([^)]+)\)/)[1]
    const range = face.match(/unicode-range:\s*([^;]+);/)?.[1]
    if (range && !/U\+0000-00FF|U\+0100-02BA/.test(range)) continue // só latin / latin-ext
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
    const file = `${out}-${i++}.woff2`
    writeFileSync(join('public/fonts', file), buf)
    outCss += `@font-face {${face.replace(/url\([^)]+\)/, `url(/fonts/${file})`).replace(/font-display:[^;]+;/, '')} font-display: ${family === 'icons' ? 'block' : 'swap'}; }\n`
  }
  return outCss
}

const nunito = await grab('https://fonts.googleapis.com/css2?family=Nunito:wght@400..900&display=swap', 'nunito', 'text')
const icons = await grab(`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..700,0..1,0&icon_names=${list.join(',')}`, 'symbols', 'icons')
writeFileSync('src/fonts.css', `/* gerado por scripts/fonts.mjs */\n${nunito}${icons}`)
console.log('fonts.css ok')
