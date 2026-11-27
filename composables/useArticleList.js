import { useAsyncData } from '#app'
import { useI18n } from 'vue-i18n'
import { ARTICLE_LIST_FIELDS } from '~/utils/content-fields.js'

/**
 * Liste des articles de la langue courante, du plus récent au plus ancien,
 * limitée aux champs de liste. Partagée par l'accueil, le mode VR et
 * Blogvision : même clé de cache, donc une seule requête par langue.
 */
export function useArticleList() {
  const { locale } = useI18n()
  return useAsyncData(`articles-${locale.value}`, () =>
    queryContent(locale.value)
      .only(ARTICLE_LIST_FIELDS)
      .sort({ createdAt: -1 })
      .find()
      .then((articles) =>
        articles
          .map((article) => {
            const ts = article.createdAt ? new Date(article.createdAt).getTime() : 0
            article.timestamp = Number.isNaN(ts) ? 0 : ts
            return article
          })
          .sort((a, b) => b.timestamp - a.timestamp)
      )
  )
}
