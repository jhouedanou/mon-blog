// Le preset cloudflare-pages-static termine dist/_redirects par
// « /* /404.html 404 », une règle de Pages que les assets statiques des Workers
// n'acceptent pas (statut 404 non supporté). La 404 est gérée par
// `not_found_handling = "404-page"` dans wrangler.toml.
import { readFileSync, writeFileSync } from 'node:fs'

const file = 'dist/_redirects'
const lines = readFileSync(file, 'utf8').split('\n')
const kept = lines.filter((line) => !/^\/\*\s+\/404\.html\s+404\s*$/.test(line))
writeFileSync(file, kept.join('\n'))
console.log(`_redirects : ${lines.length - kept.length} règle(s) 404 retirée(s)`)
