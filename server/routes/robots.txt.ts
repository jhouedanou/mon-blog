// @ts-expect-error — module JS sans types, partagé avec nuxt.config.js
import { SITE_URL } from '~/utils/site.js'

// Seule source du robots.txt (l'ancien public/robots.txt le masquait selon
// l'ordre de build). Rien n'est bloqué côté site : interdire /_nuxt/
// empêcherait Google de rendre les pages.
//
// Rendu au build (nuxt generate) : le site n'a pas de Worker au runtime.
//
// Le sitemap est annoncé sur /sitemap_index.xml, le fichier réellement généré.
// /sitemap.xml n'existe pas dans dist : il ne vaut qu'un 307 de _redirects.
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

# Surface WordPress morte. Le dire ici évite qu'un crawler respectueux
# redemande ces chemins.
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-json/
Disallow: /xmlrpc.php
Disallow: /wp-login.php

Sitemap: ${SITE_URL}/sitemap_index.xml
`
})
