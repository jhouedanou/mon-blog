// Génère les cartes sociales JPEG 1200x630 hors ligne :
//   - public/og/default.jpg          : carte par défaut (pages sans image)
//   - public/og/<base>.jpg           : une carte par image d'article
//   - data/og-cards.js               : manifeste image d'article -> carte
//
// X et LinkedIn ne rendent pas le WebP (40 des 42 images d'articles). Exécution
// locale et sortie committée : zéro coût de build ou de runtime sur Cloudflare.
//
//   yarn og:cards
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(new URL('..', import.meta.url).pathname)
const CONTENT_DIR = path.join(ROOT, 'content', 'fr')
const PUBLIC_DIR = path.join(ROOT, 'public')
const OUT_DIR = path.join(PUBLIC_DIR, 'og')
const MANIFEST = path.join(ROOT, 'data', 'og-cards.js')

const WIDTH = 1200
const HEIGHT = 630
const JPEG = { quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' }

const BG = '#f6f5f0'
const ACCENT = '#b0541f'
const INK = '#1f1d1a'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Carte par défaut : signature « Journal. », nom, accroche.
function defaultCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect x="0" y="0" width="18" height="${HEIGHT}" fill="${ACCENT}"/>
  <text x="96" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="150" font-weight="600" fill="${INK}">Journal<tspan fill="${ACCENT}">.</tspan></text>
  <text x="100" y="340" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="600" fill="${INK}">Jean-Luc Houédanou</text>
  <text x="100" y="400" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#5a5651">Tech, culture numérique et réflexions depuis Abidjan</text>
  <text x="100" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="${ACCENT}">houedanou.com</text>
</svg>`
}

// Bandeau de marque en pied de carte d'article.
function brandBandSvg() {
  const h = 84
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${h}">
  <rect width="100%" height="100%" fill="${BG}" fill-opacity="0.94"/>
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="${ACCENT}"/>
  <text x="48" y="54" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="600" fill="${INK}">Journal<tspan fill="${ACCENT}">.</tspan></text>
  <text x="${WIDTH - 48}" y="54" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="${ACCENT}">houedanou.com</text>
</svg>`
}

// Nom dérivé du chemin complet (sans /images/articles/) : `bescherelle/01.webp`
// et `dev/01.webp` ne doivent pas s'écraser.
function slugBase(imagePath) {
  const base = imagePath
    .replace(/^\/?images\/(articles\/)?/, '')
    .replace(/\.[^.]+$/, '')
  return base
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function readFrontMatterImages() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.md'))
  const images = new Set()
  for (const f of files) {
    const src = await readFile(path.join(CONTENT_DIR, f), 'utf8')
    const fm = src.match(/^---\n([\s\S]*?)\n---/)
    if (!fm) continue
    const m = fm[1].match(/^image:\s*["']?([^"'\n]+)["']?\s*$/m)
    if (m) images.add(m[1].trim())
  }
  return [...images].sort()
}

async function buildDefault() {
  const out = path.join(OUT_DIR, 'default.jpg')
  await sharp(Buffer.from(defaultCardSvg())).jpeg(JPEG).toFile(out)
  return out
}

async function buildCard(imagePath) {
  const rel = imagePath.replace(/^\//, '')
  const src = path.join(PUBLIC_DIR, rel)
  if (!existsSync(src)) {
    console.warn(`  ⚠ absent : ${imagePath}`)
    return null
  }
  const name = `${slugBase(imagePath)}.jpg`
  const out = path.join(OUT_DIR, name)
  const band = Buffer.from(brandBandSvg())
  await sharp(src)
    .rotate() // respecte l'EXIF (photos de téléphone)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .flatten({ background: BG })
    .composite([{ input: band, gravity: 'south' }])
    .jpeg(JPEG)
    .toFile(out)
  const size = (await stat(out)).size
  console.log(`  ✓ ${imagePath} → /og/${name} (${Math.round(size / 1024)} Ko)`)
  return `/og/${name}`
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  console.log('Carte par défaut…')
  await buildDefault()

  const images = await readFrontMatterImages()
  console.log(`${images.length} images d'articles…`)
  const manifest = {}
  for (const img of images) {
    const card = await buildCard(img)
    if (card) manifest[img] = card
  }

  const body = [
    '// Manifeste généré par `yarn og:cards` (scripts/build-og-cards.mjs) — ne pas éditer à la main.',
    '// Clé : chemin de l\'image d\'article tel qu\'écrit dans le front matter.',
    '// Valeur : carte JPEG 1200x630 correspondante dans /public/og/.',
    `export const OG_CARDS = ${JSON.stringify(manifest, null, 2)}`,
    '',
  ].join('\n')
  await writeFile(MANIFEST, body)
  console.log(`Manifeste : ${Object.keys(manifest).length} entrées → data/og-cards.js`)
}

main().catch((err) => { console.error(err); process.exit(1) })
