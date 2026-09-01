import { defineEventHandler, createError } from 'h3'
// @ts-expect-error — module JS sans types, résolu par l'alias srcDir de Nitro.
import { GONE_PATTERNS } from '~/redirects.js'

/**
 * Le seul middleware du parcours de redirection : `dist/_redirects` gère les
 * 301 au bord, mais ne sait pas exprimer un 410 Gone.
 *
 * Aucune de ces URLs n'étant un asset statique, le Worker est bien atteint
 * (sur cette cible, les assets sont servis avant l'invocation du Worker).
 */
export default defineEventHandler((event) => {
  const path = event.path.split('?')[0]
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    // Chemin mal encodé : on teste la forme brute plutôt que d'échouer.
  }
  if (GONE_PATTERNS.some((re: RegExp) => re.test(decoded))) {
    throw createError({ statusCode: 410, statusMessage: 'Gone' })
  }
})
