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
//
// Les robots d'IA sont les bienvenus. Ils sont nommés dans le groupe `*` parce
// que le « robots.txt géré » de Cloudflare, s'il est actif, ajoute en tête un
// `Disallow: /` pour chacun d'eux. Les deux groupes se cumulent (RFC 9309) et,
// à longueur égale, `Allow: /` l'emporte. Le vrai réglage reste à désactiver
// dans Cloudflare : voir docs/cloudflare-waf.md.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Google-CloudVertexBot',
  'GoogleOther',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'MistralAI-Training',
  'cohere-ai',
  'CCBot',
  'Bytespider',
  'DuckAssistBot',
  'YouBot',
  'Diffbot',
]

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
${AI_CRAWLERS.map((ua) => `User-agent: ${ua}`).join('\n')}
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
