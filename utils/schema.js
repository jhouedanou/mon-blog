// Constructeurs JSON-LD purs (aucune dépendance Vue). Consommés via
// `useSeo({ jsonLd })`, qui les enveloppe dans un unique @graph par page.
// Un constructeur par TYPE de page, jamais une copie par page.
import {
  SITE_URL, SITE_NAME, PERSON_ID, WEBSITE_ID, BLOG_ID,
  SITE_LANG, canonicalUrl, absoluteUrl,
} from './site.js'

/** trail : [{ name, path }] — le dernier élément est la page courante. */
export function breadcrumbLd(trail, pageUrl) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: trail.filter((s) => s && s.name).map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: canonicalUrl(step.path),
    })),
  }
}

export function webPageLd({ url, name, description, image, breadcrumb = true, type = 'WebPage' }) {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: SITE_LANG,
    isPartOf: { '@id': WEBSITE_ID },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(image) } } : {}),
    ...(breadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  }
}

/** items : [{ path, name }] — les 30 premiers suffisent, au-delà c'est du poids mort. */
export function collectionPageLd({ url, name, description, items = [], trail }) {
  return [
    {
      ...webPageLd({ url, name, description, type: 'CollectionPage' }),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.slice(0, 30).map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: canonicalUrl(it.path),
          name: it.name,
        })),
      },
    },
    breadcrumbLd(trail, url),
  ]
}

/**
 * Le graphe d'un billet : BlogPosting + WebPage + fil d'Ariane.
 * `isPartOf` vise le nœud Blog, pas WebSite : un billet appartient au blog, le
 * blog au site. C'est cette chaîne qui rend le graphe d'entité lisible.
 */
export function articleGraph({ article, url, image, description, tags, themes, stats }) {
  const trail = [{ name: 'Accueil', path: '/' }]
  if (themes?.[0]) trail.push({ name: themes[0].title, path: `/themes/${themes[0].slug}` })
  trail.push({ name: article?.title, path: url.replace(SITE_URL, '') })

  return [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      headline: article?.title,
      ...(description ? { description } : {}),
      ...(image ? { image: [image] } : {}),
      datePublished: article?.createdAt,
      dateModified: article?.updatedAt || article?.createdAt,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      isPartOf: { '@id': BLOG_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      inLanguage: SITE_LANG,
      ...(tags?.length ? { keywords: tags.join(', ') } : {}),
      ...(themes?.length ? { articleSection: themes.map((t) => t.title) } : {}),
      ...(stats?.words ? { wordCount: stats.words } : {}),
      ...(stats?.minutes ? { timeRequired: `PT${stats.minutes}M` } : {}),
    },
    webPageLd({ url, name: article?.title, description, image }),
    breadcrumbLd(trail, url),
  ]
}
