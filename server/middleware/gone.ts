import { defineEventHandler, send, setResponseHeader, setResponseStatus } from 'h3'
// @ts-expect-error — module JS sans types, résolu par l'alias srcDir de Nitro.
import { GONE_PATTERNS } from '~/redirects.js'

/**
 * Le seul middleware du parcours de redirection : `dist/_redirects` gère les
 * 301 au bord, mais ne sait pas exprimer un 410 Gone.
 *
 * Aucune de ces URLs n'étant un asset statique, le Worker est bien atteint
 * (sur cette cible, les assets sont servis avant l'invocation du Worker).
 *
 * La réponse est écrite ici, à la main, au lieu de lever une `createError`.
 * Une erreur h3 fait rendre `error.vue` par Vue côté serveur — layout, i18n et
 * requête Nuxt Content comprises — pour un scanner qui teste `/wp-login.php` et
 * ne lira jamais la page. Ces scans tournent en continu : ils suffisaient à
 * épuiser les 10 ms de CPU accordées au Worker. Ici le coût est celui d'une
 * chaîne de caractères.
 */
const GONE_BODY = `<!doctype html>
<html lang="fr">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page supprimée</title>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1.5rem;line-height:1.6">
<h1>410 — Page supprimée</h1>
<p>Cette adresse date de l'ancien site et n'existe plus.</p>
<p><a href="/">Retour à l'accueil</a></p>
`

export default defineEventHandler((event) => {
  const path = event.path.split('?')[0]
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    // Chemin mal encodé : on teste la forme brute plutôt que d'échouer.
  }
  if (GONE_PATTERNS.some((re: RegExp) => re.test(decoded))) {
    setResponseStatus(event, 410)
    setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    setResponseHeader(event, 'X-Robots-Tag', 'noindex')
    // Ces URLs sont mortes définitivement : laisser le cache de Cloudflare
    // répondre à leur place évite de réveiller le Worker au scan suivant.
    setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')
    return send(event, GONE_BODY)
  }
})
