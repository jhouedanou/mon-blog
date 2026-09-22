// @ts-expect-error — module JS sans types, partagé avec nuxt.config.js
import { SITE_URL } from '~/utils/site.js'

// Seule source du robots.txt (l'ancien public/robots.txt le masquait selon
// l'ordre de build). Rien n'est bloqué côté site : interdire /_nuxt/
// empêcherait Google de rendre les pages.
//
// Le sitemap est annoncé sur /sitemap_index.xml, le fichier réellement généré.
// /sitemap.xml n'existe pas dans dist : il ne vaut qu'un 307 servi par le
// Worker, une invocation par passage de crawler pour rien.
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

# Surface WordPress morte. Ces chemins répondent 410 et sont traités par le
# Worker : le dire ici évite qu'un crawler respectueux les redemande.
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-json/
Disallow: /xmlrpc.php
Disallow: /wp-login.php

Sitemap: ${SITE_URL}/sitemap_index.xml
`
})
