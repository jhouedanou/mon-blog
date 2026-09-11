// Aides de routage bilingue.
//
// Les articles sont rangés par langue dans content/<locale>/<slug>.md et leur
// `_path` Nuxt Content (/fr/<slug>, /en/<slug>) est aussi leur URL publique.
// Le même slug désigne le même billet dans les deux langues.

export const LOCALE_CODES = ['fr', 'en']

const ARTICLE_PATH = /^\/(fr|en)\/([^/]+)\/?$/

/** Locale portée par un chemin d'article, ou null si ce n'est pas un article. */
export function articleLocaleFromPath(path) {
  const match = ARTICLE_PATH.exec(path || '')
  return match ? match[1] : null
}

/** Chemin du même article dans une autre langue, ou null si `path` n'est pas un article. */
export function translatedArticlePath(path, targetLocale) {
  const match = ARTICLE_PATH.exec(path || '')
  if (!match || !LOCALE_CODES.includes(targetLocale)) return null
  return `/${targetLocale}/${match[2]}`
}

/** Étiquette Intl pour formater les dates dans la langue courante. */
export function dateLocale(locale) {
  return locale === 'en' ? 'en-GB' : 'fr-FR'
}
