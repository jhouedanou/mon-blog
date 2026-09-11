import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
// @ts-expect-error — modules JS sans types
import { THEME_DEFINITIONS } from '~/data/editorial.js'
// @ts-expect-error — modules JS sans types
import { getArticleTags, slugifyTag } from '~/utils/tags.js'

export default defineSitemapEventHandler(async (e) => {
  const contentList = await serverQueryContent(e)
    .where({ _partial: false, _draft: false })
    .find()

  const articles = contentList.filter((content) => content._extension === 'md')

  // Une URL par slug de tag : « Claude Code » et « claude-code » donnent la
  // même page, on ne l'annonce qu'une fois.
  const tagSlugs = new Set<string>()
  const tagSlugsEn = new Set<string>()
  for (const article of articles) {
    const target = String(article._path || '').startsWith('/en/') ? tagSlugsEn : tagSlugs
    for (const tag of getArticleTags(article)) target.add(slugifyTag(tag))
  }

  const staticPaths = [
    '/',
    '/tags',
    '/themes',
    '/a-propos',
    '/cv',
    '/confidentialite',
    ...THEME_DEFINITIONS.map((theme: { slug: string }) => `/themes/${theme.slug}`),
    ...[...tagSlugs].sort().map((slug) => `/tags/${slug}`),
    // Version anglaise : mêmes pages sous /en (les articles /en/<slug> viennent
    // déjà de contentList, comme les français).
    '/en',
    '/en/tags',
    '/en/themes',
    ...THEME_DEFINITIONS.map((theme: { slug: string }) => `/en/themes/${theme.slug}`),
    ...[...tagSlugsEn].sort().map((slug) => `/en/tags/${slug}`),
  ]

  const staticUrls = staticPaths.map((loc) => asSitemapUrl({ loc }))
  // Pas d'updatedAt dans le front matter : lastmod = date de publication.
  // On ne fabrique pas de date de mise à jour.
  const articleUrls = articles.map((c) =>
    asSitemapUrl({
      loc: c._path,
      lastmod: c.updatedAt || c.createdAt,
    }),
  )

  return [...staticUrls, ...articleUrls]
})
