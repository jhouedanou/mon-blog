import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import {
  SITE_NAME, OG_LOCALE, TWITTER, AUTHOR_NAME, DEFAULT_OG_IMAGE,
  absoluteUrl, canonicalUrl,
} from '~/utils/site.js'

/**
 * JSON.stringify n'échappe pas `<` : un `</script>` dans une description
 * fermerait la balise et casserait la page. On neutralise à la source.
 */
export function safeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/**
 * Point d'entrée unique pour les métadonnées d'une page.
 *
 * useSeo({ title, titleTemplate, description, path, canonical, image, imageAlt,
 *          imageIsCard, type, robots, publishedTime, modifiedTime, tags, jsonLd })
 *
 * Accepte aussi une fonction pour les pages dont les données arrivent en asynchrone.
 * Tout passe par UN seul `useHead(() => …)` : au changement de route côté client,
 * unhead remplace l'entrée au lieu d'empiler les balises.
 */
export function useSeo(input) {
  const route = useRoute()
  const seo = computed(() => (typeof input === 'function' ? input() : unref(input)) || {})

  useHead(() => {
    const s = seo.value
    // `canonical: false` : pages d'erreur, qui n'ont pas d'URL de référence.
    const url = s.canonical === false ? null : (s.canonical || canonicalUrl(s.path || route.path))
    const desc = s.description || ''
    const img = absoluteUrl(s.image || DEFAULT_OG_IMAGE)
    const type = s.type || 'website'
    const alt = s.imageAlt || s.title || SITE_NAME
    const isArticle = type === 'article'

    const head = {
      link: url ? [{ rel: 'canonical', href: url }] : [],
      meta: [
        desc && { name: 'description', content: desc },
        s.robots && { name: 'robots', content: s.robots },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: OG_LOCALE },
        { property: 'og:type', content: type },
        { property: 'og:title', content: s.title || SITE_NAME },
        desc && { property: 'og:description', content: desc },
        url && { property: 'og:url', content: url },
        { property: 'og:image', content: img },
        { property: 'og:image:alt', content: alt },
        // Ne déclarer les dimensions que pour les cartes générées en 1200x630 :
        // les annoncer pour une image au ratio quelconque ferait mal recadrer Facebook.
        s.imageIsCard && { property: 'og:image:width', content: '1200' },
        s.imageIsCard && { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: TWITTER },
        { name: 'twitter:creator', content: TWITTER },
        { name: 'twitter:title', content: s.title || SITE_NAME },
        desc && { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: img },
        { name: 'twitter:image:alt', content: alt },
        isArticle && s.publishedTime && { property: 'article:published_time', content: s.publishedTime },
        isArticle && { property: 'article:modified_time', content: s.modifiedTime || s.publishedTime },
        isArticle && { property: 'article:author', content: AUTHOR_NAME },
        ...(isArticle ? (s.tags || []).map((t) => ({ property: 'article:tag', content: t })) : []),
      ].filter(Boolean),
    }

    if (s.title !== undefined) head.title = s.title
    if ('titleTemplate' in s) head.titleTemplate = s.titleTemplate
    if (s.jsonLd) {
      const nodes = [].concat(s.jsonLd).filter(Boolean)
      if (nodes.length) {
        head.script = [{
          id: 'ld-page',
          type: 'application/ld+json',
          innerHTML: safeJsonLd({ '@context': 'https://schema.org', '@graph': nodes }),
        }]
      }
    }
    return head
  })
}
