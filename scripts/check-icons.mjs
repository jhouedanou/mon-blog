// Vérifie que chaque icône écrite dans un template figure dans le sous-ensemble
// Material Symbols chargé par nuxt.config.js (`icon_names=`). Une icône absente
// de la liste s'afficherait en toutes lettres (« call », « article »…).
// Lancé avant `nuxt generate` par `yarn build`.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const config = readFileSync('nuxt.config.js', 'utf8')
const listed = new Set((config.match(/icon_names=([a-z0-9_,]+)/)?.[1] || '').split(',').filter(Boolean))

function vueFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return vueFiles(path)
    return path.endsWith('.vue') ? [path] : []
  })
}

const files = ['app.vue', 'error.vue', ...['components', 'pages', 'layouts'].flatMap(vueFiles)]
const used = new Map()
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  // Contenu littéral d'une balise .material-icons, et noms entre quotes dans
  // une expression {{ … }} posée dans une telle balise (ex. light_mode).
  for (const [, inner] of source.matchAll(/class="material-icons[^"]*"[^>]*>([\s\S]*?)</g)) {
    const names = inner.includes('{{')
      ? [...inner.matchAll(/'([a-z0-9_]+)'/g)].map((m) => m[1])
      : [inner.trim()]
    for (const name of names) if (name) used.set(name, file)
  }
}

const missing = [...used].filter(([name]) => !listed.has(name))
if (missing.length) {
  console.error('Icônes absentes de icon_names (nuxt.config.js) :')
  for (const [name, file] of missing) console.error(`  ${name}  (${file})`)
  process.exit(1)
}

const sorted = [...listed].join(',') === [...listed].sort().join(',')
if (!sorted) {
  console.error('icon_names doit être trié par ordre alphabétique (exigé par Google Fonts).')
  process.exit(1)
}

console.log(`Icônes : ${used.size} utilisées, toutes présentes dans le sous-ensemble (${listed.size}).`)
