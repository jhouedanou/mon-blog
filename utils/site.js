// L'origine canonique du site. C'est la SEULE littérale `houedanou.com` du dépôt :
// nuxt.config.js, les routes serveur et les pages importent toutes d'ici.
//
// On n'utilise volontairement pas `useSiteConfig()` (présent en transitive via
// @nuxtjs/sitemap) : son implémentation retourne `{}` si le plugin d'init n'a pas
// tourné, ce qui ferait émettre des canonicals relatifs.
export const SITE_URL = 'https://houedanou.com'
export const SITE_NAME = 'Le Blog de Jean-Luc Houédanou'
export const SITE_LANG = 'fr'
export const OG_LOCALE = 'fr_FR'
export const TWITTER = '@afrowebdesigner'
export const AUTHOR_NAME = 'Jean-Luc Houédanou'

// Les cartes sociales doivent être en JPEG : X et LinkedIn ne rendent pas le WebP.
export const DEFAULT_OG_IMAGE = '/og/default.jpg'

// Identifiants du graphe d'entité. Un `@id` qui diffère d'un slash suffit à créer
// deux entités distinctes aux yeux de Google : ils vivent ici, pas en dur.
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const BLOG_ID = `${SITE_URL}/#blog`

/** Absolutise un chemin ; laisse passer une URL déjà absolue. */
export function absoluteUrl(path) {
  if (!path) return SITE_URL
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path, SITE_URL).href
}

/**
 * Une seule forme canonique : origine + chemin sans slash final, sauf l'accueil.
 * Query et fragment sont retirés — `/?q=nuxt` se consolide donc sur `/`.
 */
export function canonicalUrl(path = '/') {
  const clean = String(path || '/').split('?')[0].split('#')[0]
  if (clean === '/' || clean === '') return `${SITE_URL}/`
  return SITE_URL + clean.replace(/\/+$/, '')
}
