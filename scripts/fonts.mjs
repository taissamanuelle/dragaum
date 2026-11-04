// Baixa e empacota as fontes: Nunito e Material Symbols Rounded (subconjunto com os ícones usados).
// Uso: node scripts/fonts.mjs   (rode de novo sempre que usar um ícone novo)
// As fontes vão para src/assets/fonts e são importadas pelo src/fonts.css, então o Vite
// gera nomes com hash, então o service worker nunca serve uma fonte antiga.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
const OUT = 'src/assets/fonts'
const valid = new Set(readFileSync('scripts/material-symbols.txt', 'utf8').split('\n').filter(Boolean))
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))

// todo literal de string que seja nome de ícone válido entra no subconjunto
const names = new Set()
for (const f of walk('src')) {
  if (!/\.(tsx?)$/.test(f)) continue
  const src = readFileSync(f, 'utf8')
  for (const m of src.matchAll(/['"`]([a-z][a-z0-9_]{1,40})['"`]/g)) if (valid.has(m[1])) names.add(m[1])
}
const list = [...names].sort()
console.log(list.length, 'ícones')

async function grab(cssUrl, prefix, display) {
  const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text()
  const faces = [...css.matchAll(/@font-face\s*{([^}]+)}/g)].map((m) => m[1])
  let outCss = ''
  let i = 0
  for (const face of faces) {
    const url = face.match(/url\(([^)]+)\)/)[1]
    const range = face.match(/unicode-range:\s*([^;]+);/)?.[1]
    if (range && !/U\+0000-00FF|U\+0100-02BA/.test(range)) continue // só latin / latin-ext
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
    const file = `${prefix}-${i++}.woff2`
    writeFileSync(join(OUT, file), buf)
    outCss += `@font-face {${face.replace(/url\([^)]+\)/, `url(./assets/fonts/${file})`).replace(/font-display:[^;]+;/, '')} font-display: ${display}; }\n`
  }
  return outCss
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
const nunito = await grab('https://fonts.googleapis.com/css2?family=Nunito:wght@400..900&display=swap', 'nunito', 'swap')
const icons = await grab(`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..700,0..1,0&icon_names=${list.join(',')}`, 'symbols', 'block')
writeFileSync('src/fonts.css', `/* gerado por scripts/fonts.mjs, ${list.length} ícones */\n${nunito}${icons}`)
writeFileSync('scripts/icons-used.txt', list.join('\n') + '\n')
console.log('fonts.css ok')
