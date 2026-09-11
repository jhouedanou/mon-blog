import { serverQueryContent } from '#content/server'
import { defineEventHandler, setResponseHeader } from 'h3'
// @ts-expect-error — module JS sans types, partagé avec nuxt.config.js
import { SITE_URL, SITE_NAME } from '~/utils/site.js'

// Type MIME de l'enclosure dérivé de l'extension : 40 images sur 42 sont en
// WebP, l'ancien `image/jpeg` codé en dur mentait aux lecteurs RSS.
const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
}

function mimeTypeFor(path: string): string | null {
  const ext = path.split('?')[0].split('.').pop()?.toLowerCase() || ''
  return MIME_BY_EXT[ext] || null
}

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
  const siteUrl = SITE_URL
  const feedTitle = SITE_NAME
  const feedDescription = 'Chroniques sur l\'innovation numérique, la transformation digitale en Afrique et pérégrinations technologiques.'

  // Récupérer tous les articles, triés par date décroissante
  // Flux français uniquement : les traductions de content/en ont les mêmes
  // slugs et doubleraient chaque billet.
  const articles = await serverQueryContent(event, 'fr')
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

    const mimeType = article.image ? mimeTypeFor(article.image) : null
    const imageTag = article.image && mimeType
      ? `<enclosure url="${siteUrl}${escapeXml(article.image)}" type="${mimeType}" length="0" />`
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
