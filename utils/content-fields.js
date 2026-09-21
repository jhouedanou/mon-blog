// Champs chargés par les listes d'articles.
//
// Sans `only()`, chaque rendu SSR récupérait les 48 documents AVEC leur `body` :
// l'AST de ~390 Ko de markdown, soit plusieurs Mo de JSON à désérialiser pour
// n'afficher qu'un titre et une date. C'est ce qui faisait dépasser la limite de
// 10 ms de CPU du Worker — Cloudflare coupait le rendu en cours et servait une
// page cassée.
//
// `readingTime` remplace le calcul de getReadingStats(article.body) : il est figé
// au build par le hook `content:file:afterParse` de nuxt.config.js, ce qui permet
// justement d'exclure `body`. La liste reste unique et volontairement large : ces
// champs sont tous courts, et une liste par page finirait par en oublier un.
export const ARTICLE_LIST_FIELDS = [
  '_path',
  'title',
  'description',
  'summary',
  'searchIntent',
  'image',
  'createdAt',
  'updatedAt',
  'tags',
  'readingTime',
]
