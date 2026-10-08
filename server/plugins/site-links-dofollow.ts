// @ts-expect-error — module JS sans types, résolu par l'alias srcDir de Nitro.
import { SITE_URL } from '~/utils/site.js'

/**
 * Garde en dofollow les liens du markdown qui pointent vers houedanou.com.
 *
 * Nuxt Content passe tous les liens absolus en `rel="nofollow"`
 * (rehype-external-links). Or le blog vit sur houedanou.com : la signature
 * `[Jean-Luc Houédanou](https://houedanou.com)` en fin d'article pointe vers
 * le site lui-même et doit rester suivable. Les vrais liens sortants gardent
 * leur nofollow.
 *
 * Remplacer le plugin rehype dans `content.markdown.rehypePlugins` ne marche
 * pas : le transformeur markdown importe les plugins par leur nom, et retombe
 * sur le paquet d'origine. On retouche donc l'AST après le parse.
 */
const SITE_HOST = new URL(SITE_URL).hostname

function isSiteLink(href: string) {
  try {
    return new URL(href, SITE_URL).hostname === SITE_HOST
  } catch {
    return false
  }
}

function visit(node: any) {
  if (node?.tag === 'a' && typeof node.props?.href === 'string' && isSiteLink(node.props.href)) {
    const rel = ([] as string[]).concat(node.props.rel ?? []).filter((value) => value !== 'nofollow')
    if (rel.length) node.props.rel = rel
    else delete node.props.rel
  }
  node?.children?.forEach(visit)
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file: any) => {
    if (file._id?.endsWith('.md')) {
      visit(file.body)
    }
  })
})
