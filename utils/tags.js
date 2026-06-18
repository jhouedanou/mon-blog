// Tag utilities — single source of truth for slug/normalise/extract.

const STOPWORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'au', 'aux',
  'et', 'ou', 'a', 'en', 'sur', 'pour', 'par', 'avec', 'sans',
  'the', 'of', 'and', 'or', 'to', 'in', 'on', 'for', 'with', 'an',
])

export function slugifyTag(input) {
  if (!input) return ''
  return String(input)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function unslugifyTag(slug) {
  if (!slug) return ''
  return String(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Extract canonical tag list from a Nuxt Content article.
// Priority: explicit `tags` frontmatter (array). Fallback: parse `keywords` string.
export function getArticleTags(article) {
  if (!article) return []

  if (Array.isArray(article.tags)) {
    return article.tags
      .map((t) => String(t).toLowerCase().trim())
      .filter((t) => t.length > 0 && !STOPWORDS.has(t))
  }

  if (typeof article.keywords === 'string' && article.keywords.length) {
    return article.keywords
      .toLowerCase()
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 1 && !STOPWORDS.has(t))
  }

  return []
}

// Stable hash → pick a color from a palette (used by TagFilter).
const TAG_PALETTE = [
  '#00ffd1', // accent teal
  '#ff2e93', // accent magenta
  '#b026ff', // accent violet
  '#ffb627', // accent amber
  '#00bbf9', // bleu
  '#55d6be', // mint
  '#ff85a1', // rose
  '#9b5de5', // soft purple
]

const tagColorCache = {}
export function getTagColor(tag) {
  if (tagColorCache[tag]) return tagColorCache[tag]
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length]
  tagColorCache[tag] = color
  return color
}

export const TAG_PALETTE_LIST = TAG_PALETTE
