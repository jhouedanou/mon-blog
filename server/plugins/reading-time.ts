// @ts-expect-error — module JS sans types, résolu par l'alias srcDir de Nitro.
import { getReadingStats } from '~/utils/reading.js'

/**
 * Fige le temps de lecture dans le document, au parse.
 *
 * Il se calculait auparavant au rendu, dans ArticleList et dans la page article,
 * en aplatissant l'AST du markdown. Afficher « 4 min » sur une liste de 48
 * billets obligeait donc à charger les 48 corps complets : c'est ce qui faisait
 * dépasser au Worker sa limite de 10 ms de CPU. Calculé ici, le champ voyage
 * avec le document et `only(ARTICLE_LIST_FIELDS)` peut laisser `body` de côté.
 *
 * Le hook appartient à Nitro (`nitroApp.hooks`) et non à Nuxt : le déclarer dans
 * `nuxt.config.js > hooks` ne le déclenche jamais.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file: any) => {
    if (file._id?.endsWith('.md')) {
      file.readingTime = getReadingStats(file.body).minutes
    }
  })
})
