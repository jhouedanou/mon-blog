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
import { existsSync, writeFileSync, mkdtempSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(new URL('..', import.meta.url).pathname)

// Polices du site (Caprasimo pour le nom, Figtree pour le reste), livrées dans
// scripts/fonts sous licence OFL. sharp rend le SVG avec fontconfig : on lui
// donne une configuration qui pointe vers ce dossier AVANT de le charger, pour
// que les cartes aient la même typographie partout, quelle que soit la machine.
const FONTS_DIR = path.join(ROOT, 'scripts', 'fonts')
const fcDir = mkdtempSync(path.join(os.tmpdir(), 'og-fonts-'))
const fcFile = path.join(fcDir, 'fonts.conf')
writeFileSync(fcFile, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig><dir>${FONTS_DIR}</dir><include ignore_missing="yes">/etc/fonts/fonts.conf</include><cachedir>${fcDir}</cachedir></fontconfig>`)
process.env.FONTCONFIG_FILE = fcFile
const { default: sharp } = await import('sharp')

const CONTENT_DIR = path.join(ROOT, 'content', 'fr')
const PUBLIC_DIR = path.join(ROOT, 'public')
const OUT_DIR = path.join(PUBLIC_DIR, 'og')
const MANIFEST = path.join(ROOT, 'data', 'og-cards.js')

const WIDTH = 1200
const HEIGHT = 630
const JPEG = { quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' }

// Couleurs du site (DESIGN.md) : bleu nuit, cuivre, lavande.
const BG = '#111522'
const INK = '#f3eee5'
const MUTED = '#a8adbb'
const COPPER = '#c27a5b'
const COPPER_TEXT = '#e0a083'
const LAVENDER = '#b8beff'
const GRID = 'rgba(137,148,228,0.07)'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Grille de 72 px du site, en fond de la carte par défaut.
function gridPattern() {
  return `<defs><pattern id="g" width="72" height="72" patternUnits="userSpaceOnUse">
    <path d="M72 0H0V72" fill="none" stroke="${GRID}" stroke-width="1"/></pattern></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>`
}

// Carte par défaut : « Le blog de » en label, le nom en Caprasimo, l'accroche.
function defaultCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="100%" height="100%" fill="${BG}"/>
  ${gridPattern()}
  <circle cx="1080" cy="40" r="300" fill="none" stroke="rgba(137,148,228,0.22)" stroke-width="2"/>
  <text x="96" y="190" font-family="Figtree" font-size="30" font-weight="700" letter-spacing="4" fill="${LAVENDER}">LE BLOG DE</text>
  <text x="92" y="300" font-family="Caprasimo" font-size="96" fill="${INK}">Jean-Luc Houédanou</text>
  <text x="96" y="380" font-family="Figtree" font-size="34" fill="${MUTED}">Tech, culture numérique et réflexions depuis Abidjan</text>
  <rect x="96" y="470" width="300" height="72" rx="6" fill="${COPPER}"/>
  <text x="246" y="517" text-anchor="middle" font-family="Figtree" font-size="30" font-weight="700" fill="#1b1420">houedanou.com</text>
</svg>`
}

// Bandeau de marque en pied de carte d'article : bleu nuit, nom en Caprasimo,
// filet cuivre, adresse en lavande.
function brandBandSvg() {
  const h = 88
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${h}">
  <rect width="100%" height="100%" fill="${BG}" fill-opacity="0.95"/>
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="${COPPER}"/>
  <text x="48" y="36" font-family="Figtree" font-size="17" font-weight="700" letter-spacing="3" fill="${LAVENDER}">LE BLOG DE</text>
  <text x="46" y="72" font-family="Caprasimo" font-size="32" fill="${INK}">Jean-Luc Houédanou</text>
  <text x="${WIDTH - 48}" y="60" text-anchor="end" font-family="Figtree" font-size="28" font-weight="700" fill="${COPPER_TEXT}">houedanou.com</text>
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
