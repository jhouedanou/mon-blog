# Audit du positionnement, 18 octobre 2026

Audit du site en ligne (`https://houedanou.com`) et de l'historique Git, fait pour le billet
« Migration WordPress → Nuxt : j'ai perdu mon référencement, voici comment je l'ai récupéré »
(`content/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere.md`).

Il complète l'audit éditorial du 8 octobre (`docs/audit-seo-2026-10.md`), qui portait sur le
contenu des billets.

## Limites : ce qui n'a pas pu être mesuré

- **Positions dans Google.** Pas d'accès à la Search Console ni à Google Analytics depuis cet
  audit. Les positions réelles (requêtes, impressions, clics, position moyenne) n'y figurent pas.
- **Moteurs de recherche.** Bing renvoie des résultats sans rapport aux requêtes automatiques,
  DuckDuckGo demande un captcha. L'outil de recherche web disponible cherche depuis les États-Unis
  et n'est pas Google : ses résultats ne disent rien de Google France ou Côte d'Ivoire.
- **Archives du web.** Wayback Machine et Common Crawl étaient injoignables depuis l'environnement
  de l'audit. La liste des anciennes adresses WordPress n'a donc pas pu être reconstituée.
- **PageSpeed Insights.** Quota anonyme épuisé. Les mesures de performance viennent de
  Lighthouse 12.8.2 lancé en local (mobile simulé, navigateur en français) : ce sont des mesures
  de laboratoire, pas des données d'utilisateurs réels (CrUX).

## Résultats du site en ligne

| Contrôle | Résultat | État |
|---|---|---|
| Adresses du sitemap (`sitemap_index.xml`, 2 sitemaps) | 344, toutes en 200 | OK |
| Pages de tags vides et en `noindex` dans le sitemap | 53 (27 FR, 26 EN) | **Corrigé** (`components/LanguageSwitcher.vue`) |
| Pages avec plus d'un H1 | 2 (billet harcèlement, FR et EN) | **Corrigé** |
| Canonical différente de l'URL | 3 : `/en/a-propos`, `/en/cv`, `/en/confidentialite` → version FR | À trancher (voir plus bas) |
| `robots.txt` | 200, pointe vers `sitemap_index.xml` | OK |
| `http://` → `https://` | 301 | OK |
| **`https://www.houedanou.com/`** | **522** (Cloudflare ne trouve pas d'origine) | **Corrigé** : règle de redirection Cloudflare, 301 vers `houedanou.com`, chemin et paramètres conservés |
| `/page/` → `/page` | 307 (`html_handling = drop-trailing-slash`) | OK |
| `/sitemap.xml` | 307 vers `/sitemap_index.xml` | OK |
| Anciennes adresses `/fr/<slug>` (avant le 26 mars 2026) | 9 en 301, 12 en 404 | **Corrigé** : 21 en 301 |
| Anciennes adresses `/fr/AAAA/MM/<slug>`, `/AAAA/MM/<slug>`, `/en/…` | 404 | **Corrigé** : 301 |
| Surface WordPress (`/wp-login.php`) | 403 (pare-feu Cloudflare) | OK |
| Doublons du site sur `*.vercel.app`, `*.pages.dev` | aucun trouvé | OK |

### Lighthouse (mobile simulé, 18 octobre 2026)

| Page | Perf. | Access. | Bonnes pratiques | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | 59 | 100 | 57 | 92 | 3,0 s | 7,2 s | 440 ms | 0,018 |
| `/fr/20260331-migrer-prestashop-…` | 58 | 100 | 57 | 92 | 2,9 s | 5,3 s | 630 ms | 0,014 |

- **SEO 92** : seule remarque, la ligne `Content-Signal` de `robots.txt` (ajoutée par Cloudflare)
  est inconnue de Lighthouse. Google ignore les directives inconnues : sans effet.
- **Scripts tiers** : Google Tag Manager (130 à 160 ms de blocage) et Infolinks (85 à 105 ms).
  Google Fonts pèse environ 320 Ko, dont 126 Ko pour la police Material Icons.
- **Bonnes pratiques 57** : cookies tiers, API obsolètes et erreurs dans la console, venant des
  scripts tiers.
- Une première mesure avec un navigateur en anglais a été redirigée vers `/en` par le script de
  langue : performance 51 et 43, LCP 7,7 et 10,7 s.

## Ce que dit l'historique (résumé)

Le détail, avec les commits, est dans le billet. Les points qui ont pesé sur le référencement :

1. **Changements d'adresse sans redirection.** Les articles ont eu quatre formes d'adresse :
   `/AAAA/MM/<slug>` (10 → 18 octobre 2024), `/fr/AAAA/MM/<slug>` (→ 20 décembre 2024),
   `/fr/<slug>` (→ 26 mars 2026), `/fr/AAAAMMJJ-<slug>` (depuis). Les pages anglaises ont été
   supprimées le 23 mars 2025 et recréées le 11 septembre 2026. Avant cet audit, 9 anciennes
   adresses étaient redirigées sur 51 reconstituables.
2. **Réponses aux anciennes adresses.** Erreur 500 d'octobre 2024 à mars 2026 (rendu serveur
   Vercel, reproduit sur un build de décembre 2025), y compris sur `/robots.txt`. Puis page
   « Article introuvable » en 200 (soft 404) jusqu'au 1er septembre 2026. Puis erreurs du Worker
   en septembre 2026. Vrai 404 depuis le 23 septembre 2026.
3. **WordPress sur `www`.** Permaliens `/AAAA/MM/<slug>/` sur `www.houedanou.com`, qui répond
   522 aujourd'hui. Les billets WordPress n'ont pas été repris sur le site Nuxt.
4. **Balises.** Pas de canonical sur les articles avant le 18 juillet 2026. Trois H1 par article
   à l'origine. Image de partage relative et en WebP jusqu'au 1er septembre 2026. Meta
   description remplacée par `searchIntent` du 18 juillet au 8 octobre 2026.

## Corrections faites le 18 octobre 2026

- `redirects.js` : 42 redirections 301 ajoutées (51 au total), reconstituées depuis
  l'emplacement des fichiers dans `content/` à chaque époque. Toutes les cibles existent.
- `components/LanguageSwitcher.vue` : depuis une page de tag, le lien vers l'autre langue mène à
  l'index des tags. Les 53 pages vides ne sont plus générées ni annoncées dans le sitemap.
- `content/*/20260911-manager-accuse-harcelement-moral.md` : `# Titre` retiré (H1 en double).
- `utils/i18n.js` : le script de redirection de langue ignore aussi les agents dont le nom
  contient « google ». Google-InspectionTool (test en direct de la Search Console) n'a pas « bot »
  dans son nom et était redirigé vers `/en`.
- Billet du 22 septembre : note de correction. Il affirmait que chaque ancienne URL était
  redirigée, alors que 9 seulement l'étaient.
- Cloudflare (hors dépôt) : règle de redirection `https://www.houedanou.com/*` →
  `https://houedanou.com/${1}`, 301, « Preserve query string ». Vérifié : `www` répond 301 et
  `www.houedanou.com/fr/2024/10/restons-zen` arrive sur le billet en deux sauts.

## À faire, par ordre de priorité

1. ~~Rediriger `www` vers le domaine racine~~ : fait le 18 octobre 2026 (voir plus haut).
2. **Search Console**, propriété de domaine `houedanou.com` (elle couvre `www`) :
   - Indexation → Pages : exporter « Introuvable (404) », « Soft 404 » et « Page avec
     redirection ». Les adresses `/AAAA/MM/<slug>/` sont les permaliens WordPress : décider pour
     chacune entre republier le billet (puis rediriger) et laisser le 404.
   - Sitemaps : n'avoir que `https://houedanou.com/sitemap_index.xml`.
   - Performances : comparer les trois mois avant et après le 18 octobre, page par page, pour les
     billets dont l'ancienne adresse est maintenant redirigée. Le skill `/blog decay` lit ces
     exports.
   - Paramètres → Exploration : vérifier qu'aucune erreur `robots.txt` récente n'est signalée.
3. **Redirection automatique de langue** (ajoutée le 13 octobre). Google la déconseille :
   « Avoid automatically redirecting users from one language version of a site to a different
   language version » ([Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)).
   Les robots ne sont pas redirigés, l'indexation n'est donc pas en cause. Mais un lecteur
   anglophone qui clique sur un résultat français atterrit sur une autre page que celle choisie.
   Option : remplacer la redirection par un bandeau qui propose l'autre langue.
4. **Pages `/en/a-propos`, `/en/cv`, `/en/confidentialite`** : leur canonical pointe vers la
   version française, mais elles sont dans le sitemap anglais avec des hreflang. Soit elles sont de
   vraies traductions (canonical vers elles-mêmes), soit elles sortent du sitemap.
5. **Cohérence hreflang** : le sitemap annonce `x-default` vers le français pour toutes les pages,
   le HTML des articles l'annonce vers l'anglais (depuis le 13 octobre). Il mélange aussi
   `fr-FR`/`en-US` et `fr`/`en`. Choisir une seule règle.
6. **Performance** : charger Google Tag Manager et Infolinks après l'affichage, ne charger que les
   icônes Material utilisées, réduire les grosses images (jusqu'à 389 Ko).
7. **Divers** : 4 descriptions EN de plus de 160 caractères (`20260326-lareunionpourenparler`,
   `20260822-oui-a-lexcision…`, `20260908-cest-integre-dans-la-maquette`,
   `20260911-manager-accuse-harcelement-moral`) ; 114 balises `<title>` de plus de 65 caractères,
   coupées dans les résultats ; fil d'Ariane des pages EN qui pointe vers `/themes/<slug>` (FR).
8. **À vérifier** : `wrangler.toml` n'a pas `workers_dev = false`. Si le sous-domaine
   `mon-blog.<compte>.workers.dev` est actif, il sert une copie du site (les canonicals pointent
   vers houedanou.com, le risque est faible).

## Indice faible sur la visibilité

Recherche web (index américain, pas Google) sur cinq requêtes proches des billets tutoriels, le
18 octobre 2026 : houedanou.com n'apparaît dans aucun des dix premiers résultats. Requêtes :
« migrer PrestaShop vers un nouveau nom de domaine sans perdre son référencement », « changer mot
de passe wifi CanalBox Canal+ Afrique », « Pixel Watch allumer l'écran à chaque notification »,
« migrer Nuxt de Vercel vers Cloudflare Pages », « PureMac nettoyeur Mac gratuit open source ».
À confirmer ou infirmer avec la Search Console avant d'en tirer une conclusion.
