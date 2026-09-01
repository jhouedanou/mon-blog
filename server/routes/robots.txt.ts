// @ts-expect-error — module JS sans types, partagé avec nuxt.config.js
import { SITE_URL } from '~/utils/site.js'

// Seule source du robots.txt (l'ancien public/robots.txt le masquait selon
// l'ordre de build). Aucun Disallow : bloquer /_nuxt/ empêcherait Google de
// rendre les pages.
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
})
