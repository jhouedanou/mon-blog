import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

const THEME_SLUGS = [
  'tutoriels',
  'apple',
  'developpement',
  'afrique-numerique',
  'opinions',
]

export default defineSitemapEventHandler(async (e) => {
  const contentList = await serverQueryContent(e)
    .where({ _partial: false, _draft: false })
    .find()

  const staticPaths = [
    '/',
    '/tags',
    '/themes',
    '/a-propos',
    '/cv',
    '/confidentialite',
    ...THEME_SLUGS.map((slug) => `/themes/${slug}`),
  ]

  const staticUrls = staticPaths.map((loc) => asSitemapUrl({ loc }))
  const articleUrls = contentList
    .filter((content) => content._extension === 'md')
    .map((c) => {
      return asSitemapUrl({
        loc: c._path,
        lastmod: c.updatedAt || c.createdAt,
      })
    })

  return [...staticUrls, ...articleUrls]
})
