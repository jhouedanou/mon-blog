import { serverQueryContent } from '#content/server'
import { defineEventHandler, setResponseHeader } from 'h3'

function escapeXml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://houedanou.com'
  const feedTitle = 'Le Blog de Jean-Luc Houédanou'
  const feedDescription = 'Chroniques sur l\'innovation numérique, la transformation digitale en Afrique et pérégrinations technologiques.'

  // Récupérer tous les articles, triés par date décroissante
  const articles = await serverQueryContent(event)
    .where({ _partial: false, _draft: false })
    .sort({ createdAt: -1 })
    .find()

  // Date de dernière mise à jour du flux
  const lastBuildDate = articles.length > 0
    ? new Date(articles[0].createdAt || Date.now()).toUTCString()
    : new Date().toUTCString()

  // Construire les items RSS
  const items = articles.map((article) => {
    const articleUrl = `${siteUrl}${article._path}`
    const pubDate = article.createdAt
      ? new Date(article.createdAt).toUTCString()
      : new Date().toUTCString()

    const imageTag = article.image
      ? `<enclosure url="${siteUrl}${escapeXml(article.image)}" type="image/jpeg" length="0" />`
      : ''

    return `    <item>
      <title>${escapeXml(article.title || '')}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(article.description || '')}</description>
      <pubDate>${pubDate}</pubDate>
      ${imageTag}
    </item>`
  }).join('\n')

  // Générer le XML RSS 2.0
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>fr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  // Définir le Content-Type XML
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return rss
})
