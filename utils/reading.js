// Implémentation unique du temps de lecture. Elle était auparavant recopiée dans
// pages/[...slug].vue et components/ArticleList.vue, avec une troisième variante
// divergente dans ArticleCard.vue.
const WORDS_PER_MINUTE = 200

/** Aplatit l'AST de @nuxt/content en texte brut. */
export function extractText(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.value) return node.value
  if (Array.isArray(node.children)) return node.children.map(extractText).join(' ')
  return ''
}

/** Retourne { words, minutes } — jamais 0 minute pour un article non vide. */
export function getReadingStats(body) {
  const words = extractText(body).split(/\s+/).filter(Boolean).length
  return { words, minutes: words ? Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) : 0 }
}
