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
// Tags are the editorial taxonomy. The old `keywords` field is intentionally
// ignored so search intent can be written as natural language instead.
export function getArticleTags(article) {
  if (!article) return []

  if (Array.isArray(article.tags)) {
    return article.tags
      .map((t) => String(t).toLowerCase().trim())
      .filter((t) => t.length > 0 && !STOPWORDS.has(t))
  }

  return []
}

// Stable hash → pick a color from a palette (used by TagFilter).
const TAG_PALETTE = [
  '#2f6b5f',
  '#5f6d76',
  '#6b655d',
  '#716b55',
  '#4f7268',
  '#667466',
  '#7a6f66',
  '#586d77',
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
