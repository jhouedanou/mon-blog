import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const contentList = await serverQueryContent(e)
    .where({ _partial: false, _draft: false })
    .find()

  return contentList.map((c) => {
    return asSitemapUrl({
      loc: c._path,
      lastmod: c.updatedAt || c.createdAt,
    })
  })
})
