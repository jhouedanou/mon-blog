// Source unique de vérité pour la récupération des URLs héritées de WordPress.
//
// Pour ajouter les centaines de correspondances issues d'un export WordPress :
// les coller dans EXACT_REDIRECTS. Rien d'autre à toucher — nuxt.config.js les
// transforme en routeRules, que le preset cloudflare-pages compile en
// `dist/_redirects`, appliqué au bord AVANT même l'invocation du Worker.

/**
 * Correspondances exactes ancienne URL -> nouvelle URL.
 * Les clés doivent être des chemins littéraux (aucun joker).
 *
 * Ces 9 entrées proviennent des blocs `og:url` hérités du front matter : ce sont
 * les seules anciennes URLs que le dépôt permet de reconstituer aujourd'hui.
 * Les destinations sont en ASCII pur : @nuxt/content slugifie les noms de
 * fichiers (« …-le-ménage.md » est servi sur « …-le-menage »).
 */
export const EXACT_REDIRECTS = {
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

/**
 * Surface WordPress morte : 410 Gone, jamais 301.
 * Un 301 vers l'accueil depuis /wp-login.php serait une redirection non
 * pertinente, que Google requalifie en soft-404 : on n'y gagne rien et on ajoute
 * un saut. Le 410 sort l'URL de l'index plus vite qu'un 404 et coupe le bruit de
 * bots dans Search Console.
 */
export const GONE_PATTERNS = [
  /^\/wp-content\//i,
  /^\/wp-includes\//i,
  /^\/wp-admin(\/|$)/i,
  /^\/wp-json(\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/wp-cron\.php$/i,
  /^\/wp-signup\.php$/i,
  /^\/wp-trackback\.php$/i,
  /^\/xmlrpc\.php$/i,
  /\/trackback\/?$/i,
  /\/embed\/?$/i,
]

/**
 * Sondes de scanners : 404 sans rendu, jamais 410.
 *
 * Ces chemins n'ont jamais existé sur ce site (ni WordPress, ni autre) : ce sont
 * les fichiers que les scanners de vulnérabilités testent sur tout domaine
 * (`.env`, `.git/HEAD`, `phpinfo.php`, `.aws/credentials`, `/api/v1/keys`…).
 * Sur 24 h d'analytics Cloudflare, ils formaient l'essentiel des 2 300 réponses
 * 503/522 du Worker : chaque sonde déclenchait le rendu SSR de `error.vue` et
 * dépassait les 10 ms de CPU du plan gratuit.
 *
 * Un asset qui existe dans `dist/` est servi avant l'invocation du Worker : un
 * chemin de fichier qui arrive jusqu'ici est donc forcément introuvable.
 * Les routes dynamiques légitimes sont préservées : `/api/_content/**`,
 * `/api/_sitemap-urls`, `*_payload.json`, `/feed.xml`, `/sitemap*.xml`,
 * `/robots.txt`, `/.well-known/`.
 */
export const PROBE_PATTERNS = [
  // Segment caché : /.env, /.git/HEAD, /.aws/credentials, /dashboard/.env…
  /(^|\/)\.(?!well-known(\/|$))[^/]+/i,
  // Variantes de .env sans point initial : secrets.env, env.example, env.bak.
  /(\.env(\.|$)|^\/env\.[^/]+$)/i,
  // Scripts et fichiers de configuration/sauvegarde d'un autre monde.
  /\.(php\d?|phtml|asp|aspx|jsp|cgi|pl|sh|bak|old|orig|swp|sql|key|pem|crt|p12|ini|conf|config|yml|yaml|log|zip|rar|tar|gz|7z)$/i,
  // Fichiers statiques introuvables (s'ils existaient, dist/ les aurait servis).
  // Exceptions : les routes Nitro qui produisent un fichier à la volée, et les
  // routes internes `/__*` (`/__sitemap__/`, `/__nuxt_error`) que Nuxt appelle
  // lui-même à travers ce middleware.
  /^(?!\/api\/)(?!\/__)(?!\/(feed\.xml|sitemap[^/]*\.xml|robots\.txt)$)(?!\/\.well-known\/)(?!.*_payload\.json$).*\.(js|mjs|css|map|json|txt|xml|html?|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp4|webm|pdf)$/i,
  // Arborescences d'autres CMS et frameworks, et routes internes d'outillage.
  /^\/(wordpress|wp|blog\/wp-|joomla|drupal|magento|laravel|vendor|phpmyadmin|pma|mysql|cgi-bin|_debugbar|__vite[^/]*|telescope|actuator|console|solr|jenkins)(\/|$)/i,
  // Espace /api : seuls Nuxt Content et le sitemap y vivent.
  /^\/api\/(?!_content\/|_sitemap-urls$)/i,
]

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
