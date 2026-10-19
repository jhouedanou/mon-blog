// Source unique de vérité pour la récupération des URLs héritées de WordPress.
//
// Pour ajouter les centaines de correspondances issues d'un export WordPress :
// les coller dans EXACT_REDIRECTS. Rien d'autre à toucher — nuxt.config.js les
// transforme en routeRules, que le preset cloudflare-pages-static compile en
// `dist/_redirects`, appliqué au bord par les assets statiques Cloudflare.

/**
 * Correspondances exactes ancienne URL -> nouvelle URL.
 * Les clés doivent être des chemins littéraux (aucun joker).
 *
 * Toutes les adresses d'articles ont changé plusieurs fois depuis la sortie de
 * WordPress. Elles sont reconstituées depuis l'historique Git (emplacement des
 * fichiers dans content/ à chaque époque) :
 *   - /AAAA/MM/<slug>     du 10 au 18 octobre 2024 (content/2024/MM/)
 *   - /fr/AAAA/MM/<slug>  du 18 octobre au 20 décembre 2024
 *   - /fr/<slug>          du 20 décembre 2024 au 26 mars 2026
 *   - /en/<slug>          du 20 décembre 2024 au 23 mars 2025
 * Les URL qui n'ont vécu que quelques minutes ne sont pas reprises.
 *
 * Les destinations sont en ASCII pur et en minuscules : @nuxt/content slugifie
 * les noms de fichiers (« …-le-ménage.md » → « …-le-menage »,
 * « chersCommerciaux.md » → « cherscommerciaux »).
 *
 * Les permaliens WordPress (www.houedanou.com/AAAA/MM/<slug>/) ne sont pas
 * dans le dépôt : il faut l'export WordPress ou les 404 de la Search Console.
 */
export const EXACT_REDIRECTS = {
  // FR, URL plates (20 décembre 2024 → 26 mars 2026)
  '/fr/project-fat-loss': '/fr/20250508-project-fat-loss',
  '/fr/ipados26': '/fr/20250615-ipados26',
  '/fr/lacorruption': '/fr/20250101-lacorruption',
  '/fr/lhistoire-de-gregoire': '/fr/20250326-lhistoire-de-gregoire',
  '/fr/restons-zen': '/fr/20241022-restons-zen',
  '/fr/cloner-ubuntu': '/fr/20241029-cloner-ubuntu',
  '/fr/l-histoire-danne': '/fr/20250115-l-histoire-danne',
  '/fr/on-fait-un-peu-le-menage': '/fr/20241005-on-fait-un-peu-le-menage',
  '/fr/non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre':
    '/fr/20241021-2-non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre',
  '/fr/djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret':
    '/fr/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret',
  '/fr/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  '/fr/pendaison-de-cremaillere': '/fr/20241021-pendaison-de-cremaillere',
  '/fr/cher-gens-dadobe': '/fr/20241212-cher-gens-dadobe',
  '/fr/coca-cola-et-ia': '/fr/20241220-coca-cola-et-ia',
  '/fr/liaetmoi': '/fr/20250604-liaetmoi',
  '/fr/facebook-nest-pas-un-grin': '/fr/20250605-facebook-nest-pas-un-grin',
  '/fr/cherscommerciaux': '/fr/20250705-cherscommerciaux',
  '/fr/affinity-est-gratuit': '/fr/20251031-affinity-est-gratuit',
  '/fr/josh-vs-aircotedivoire': '/fr/20251104-josh-vs-aircotedivoire',
  '/fr/infinix-ou-oraimo': '/fr/20251225-infinix-ou-oraimo',
  '/fr/comment-allumer-lecran-pixel-watch-notifications':
    '/fr/20260311-comment-allumer-lecran-pixel-watch-notifications',

  // FR, /fr/AAAA/MM/<slug> (18 octobre → 20 décembre 2024)
  '/fr/2024/09/djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret':
    '/fr/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret',
  '/fr/2024/10/on-fait-un-peu-le-menage': '/fr/20241005-on-fait-un-peu-le-menage',
  '/fr/2024/10/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  '/fr/2024/10/non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre':
    '/fr/20241021-2-non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre',
  '/fr/2024/10/pendaison-de-cremaillere': '/fr/20241021-pendaison-de-cremaillere',
  '/fr/2024/10/restons-zen': '/fr/20241022-restons-zen',
  '/fr/2024/10/cloner-ubuntu': '/fr/20241029-cloner-ubuntu',
  '/fr/2024/12/cher-gens-dadobe': '/fr/20241212-cher-gens-dadobe',

  // Sans préfixe de langue, /AAAA/MM/<slug> (10 → 18 octobre 2024)
  '/2024/09/djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret':
    '/fr/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret',
  '/2024/10/on-fait-un-peu-le-menage': '/fr/20241005-on-fait-un-peu-le-menage',

  // EN, /en/AAAA/MM/<slug> (18 octobre → 20 décembre 2024)
  '/en/2024/09/djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret':
    '/en/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret',
  '/en/2024/10/on-fait-un-peu-le-menage': '/en/20241005-on-fait-un-peu-le-menage',
  '/en/2024/10/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/en/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  '/en/2024/10/non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre':
    '/en/20241021-2-non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre',
  '/en/2024/10/pendaison-de-cremaillere': '/en/20241021-pendaison-de-cremaillere',
  '/en/2024/10/restons-zen': '/en/20241022-restons-zen',
  '/en/2024/10/cloner-ubuntu': '/en/20241029-cloner-ubuntu',
  '/en/2024/12/cher-gens-dadobe': '/en/20241212-cher-gens-dadobe',

  // EN, URL plates (20 décembre 2024 → 23 mars 2025)
  '/en/djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret':
    '/en/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret',
  '/en/on-fait-un-peu-le-menage': '/en/20241005-on-fait-un-peu-le-menage',
  '/en/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/en/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  '/en/non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre':
    '/en/20241021-2-non-ce-cable-de-240w-ne-chargera-pas-plus-vite-votre',
  '/en/pendaison-de-cremaillere': '/en/20241021-pendaison-de-cremaillere',
  '/en/restons-zen': '/en/20241022-restons-zen',
  '/en/cloner-ubuntu': '/en/20241029-cloner-ubuntu',
  '/en/cher-gens-dadobe': '/en/20241212-cher-gens-dadobe',
  '/en/coca-cola-et-ia': '/en/20241220-coca-cola-et-ia',
  '/en/l-histoire-danne': '/en/20250115-l-histoire-danne',
  '/en/lacoorruption': '/en/20250101-lacorruption',
}

/**
 * Motifs structurels WordPress.
 *
 * Les destinations sont VOLONTAIREMENT statiques : `writeCFPagesRedirects()` de
 * Nitro ne traduit pas `/**` en `:splat` et écrirait littéralement
 * « /tag/*  /tags/**  301 » dans dist/_redirects, envoyant les visiteurs sur un
 * chemin contenant des astérisques. Une cible statique est aussi meilleure qu'un
 * splat aveugle vers une page inexistante, qui recréerait un soft-404 en bout de
 * chaîne.
 */
export const PATTERN_REDIRECTS = {
  '/tag/**': '/tags',
  '/category/**': '/themes',
  '/author/**': '/a-propos',
  '/page/**': '/',
  '/feed': '/feed.xml',
  '/feed/**': '/feed.xml',
  '/rss': '/feed.xml',
  '/rss/**': '/feed.xml',
  '/comments/feed': '/feed.xml',
  '/index.php': '/',
}

// Cloudflare plafonne `_redirects` à 2000 lignes statiques et 100 lignes avec
// joker. Mieux vaut casser le build que la production le jour où l'export
// WordPress fera déborder la carte.
const MAX_STATIC = 1900
const MAX_DYNAMIC = 95

/**
 * Construit les routeRules Nitro.
 *
 * `statusCode: 301` est explicite : le défaut de Nitro est 307, ce qui laisserait
 * Google conserver l'ancienne URL dans son index.
 *
 * `prerender: false` neutralise l'héritage de `'/fr/**': { prerender: true }` :
 * si un lien pointait vers une URL héritée, le crawler du prerender figerait la
 * redirection dans un fichier HTML au lieu de la sauter.
 */
export function buildRedirectRouteRules(statusCode = 301) {
  const exact = Object.keys(EXACT_REDIRECTS).length
  const dynamic = Object.keys(PATTERN_REDIRECTS).filter((k) => k.includes('*')).length
  if (exact > MAX_STATIC) {
    throw new Error(`redirects.js : ${exact} redirections exactes, maximum ${MAX_STATIC} (limite Cloudflare _redirects).`)
  }
  if (dynamic > MAX_DYNAMIC) {
    throw new Error(`redirects.js : ${dynamic} motifs avec joker, maximum ${MAX_DYNAMIC} (limite Cloudflare _redirects).`)
  }

  const rules = {}
  for (const [from, to] of Object.entries({ ...EXACT_REDIRECTS, ...PATTERN_REDIRECTS })) {
    if (to.includes('*')) {
      throw new Error(`redirects.js : la destination « ${to} » contient un joker, ce que Nitro n'interprète pas.`)
    }
    rules[from] = { redirect: { to, statusCode }, prerender: false }
  }
  return rules
}
