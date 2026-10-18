---
title: "Migration WordPress → Nuxt : j'ai perdu mon référencement, voici comment je l'ai récupéré"
createdAt: "2026-10-18T20:45:00Z"
image: "/images/articles/migration-wordpress-nuxt-adresses.webp"
description: "Quatre changements d'adresse, des erreurs 500, des pages « introuvables » en 200 : ce que ma migration vers Nuxt a coûté en SEO, et comment je l'ai réparé."
searchIntent: "Pourquoi perd-on son référencement après une migration de WordPress vers Nuxt, et comment le récupérer : redirections 301, soft 404, robots.txt, sitemap, www ?"
tags: ["dev", "tutoriel", "seo", "nuxt", "cloudflare"]
---

Ce blog a quitté WordPress en octobre 2024. Je l'ai raconté à l'époque dans [On fait un peu le ménage](/fr/20241005-on-fait-un-peu-le-menage). Ce que je n'avais pas raconté, c'est ce que ce déménagement a coûté en référencement. Je ne l'ai d'ailleurs compris en entier qu'aujourd'hui, en reprenant l'historique Git du site, commit par commit, et en reconstruisant le site tel qu'il était à différentes dates.

Le problème principal n'était pas Nuxt. C'étaient les adresses. Un même billet a changé quatre fois d'URL, et pendant près de deux ans, les anciennes adresses ne menaient nulle part.

## Ce que Google connaissait avant

Sous WordPress, le blog vivait sur `www.houedanou.com`, avec des adresses de la forme `/année/mois/titre/`. Par exemple :

```
https://www.houedanou.com/2022/09/cette-application-nest-pas-disponible-dans-votre-pays-la-solution/
```

Ce sont ces adresses que Google avait indexées, et vers elles que pointaient les liens d'autres sites.

Le nouveau site, lui, a toujours vécu sur `houedanou.com`, sans `www`. C'était déjà un changement d'adresse pour tout le site. Et les billets de l'époque WordPress n'ont pas été repris sur le nouveau site : le plus ancien billet en ligne aujourd'hui date du 5 septembre 2024.

## Un billet, quatre adresses

Avec Nuxt Content, l'emplacement d'un fichier dans le dossier `content/` devient l'adresse de la page. Ranger ses fichiers autrement, c'est donc changer ses adresses. Je l'ai fait trois fois :

| Période | Forme de l'adresse | Ce qui a changé |
|---|---|---|
| 10 → 18 octobre 2024 | `/2024/09/djamo-adieu-frais…` | fichiers rangés par année et par mois |
| 18 octobre → 20 décembre 2024 | `/fr/2024/09/djamo-adieu-frais…` | ajout du dossier de langue |
| 20 décembre 2024 → 26 mars 2026 | `/fr/djamo-adieu-frais…` | dossiers année et mois supprimés |
| depuis le 26 mars 2026 | `/fr/20240905-djamo-adieu-frais…` | date ajoutée en tête du nom de fichier, pour le tri |

La version anglaise a suivi le même chemin, avec un détour de plus : elle a été supprimée en mars 2025, puis recréée en septembre 2026.

Sans redirection, chaque changement crée une nouvelle page pour Google. Il découvre une adresse qu'il ne connaît pas, l'ancienne disparaît de l'index, et les liens qui pointaient vers l'ancienne ne servent plus à rien.

## Ce que trouvait un visiteur sur une ancienne adresse

La réponse a dépendu de l'époque, et aucune n'était la bonne.

**D'octobre 2024 à mars 2026 : une erreur 500.** Le site était rendu par un serveur chez Vercel. Pour une adresse inconnue, la page d'article cherchait un billet qui n'existait pas et plantait (`Cannot read properties of null (reading 'title')`). En reconstruisant le site tel qu'il était en décembre 2025, j'obtiens une erreur 500 sur n'importe quelle ancienne adresse… et sur `/robots.txt`, qui n'existait pas.

Ce dernier point compte. Quand `robots.txt` répond par une erreur serveur, [Google arrête d'explorer le site pendant 12 heures](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt){target="_blank" rel="noopener"}, puis utilise la dernière version connue du fichier pendant 30 jours, avant de faire comme s'il n'existait pas. Ce n'est pas une catastrophe sur la durée, mais c'est un mauvais départ, au moment précis où Google devait découvrir le nouveau site.

**De fin mars à septembre 2026 : une page « Article introuvable », avec un code 200.** Le site était passé chez Cloudflare. Les adresses inconnues affichaient un message d'erreur, mais le serveur répondait « 200, tout va bien ». Google appelle ça un *soft 404* : une page qui dit qu'elle n'existe pas, servie comme si elle existait. Or le 26 mars 2026, toutes les adresses d'articles venaient de changer. Pendant cinq mois, chaque adresse que Google avait en mémoire répondait donc « Article introuvable », sans redirection.

**En septembre 2026 : des erreurs de serveur.** Le Worker de Cloudflare qui servait le site dépassait sa limite de temps de calcul, surtout à cause de robots qui cherchaient des fichiers sensibles. Par ricochet, de vrais lecteurs ont reçu des erreurs 522, jusque sur la page d'accueil. J'ai raconté cet épisode dans [J'ai récupéré le trafic de mon blog (et les bots qui vont avec)](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).

**Et pour l'ancien WordPress, sur `www` : une erreur 522, jusqu'au 18 octobre 2026.** `www.houedanou.com` ne redirigeait pas vers `houedanou.com`. Cloudflare recevait la requête et ne trouvait aucun serveur derrière. Tous les vieux liens vers le WordPress tombaient sur cette erreur.

## Les autres signaux qui manquaient

Les adresses étaient le gros du problème. Mais en relisant l'historique, j'ai trouvé une série de petits défauts qui n'aidaient pas :

- **Pas de balise `canonical` sur les articles avant juillet 2026.** C'est la balise qui dit à Google quelle est l'adresse de référence d'une page.
- **Trois titres principaux (H1) par article** à l'origine : le logo, le titre du modèle de page et le titre écrit dans le fichier Markdown. Les derniers doublons ont disparu en octobre 2026.
- **Des aperçus de partage cassés.** Jusqu'en septembre 2026, l'image de partage était un chemin relatif vers un fichier WebP, un format que X et LinkedIn n'affichent pas.
- **Une meta description qui posait une question.** De juillet à octobre 2026, le site affichait dans les résultats de recherche le champ `searchIntent` (la question à laquelle répond le billet) au lieu du résumé.
- **Une redirection temporaire sur chaque page.** D'avril à septembre 2026, Cloudflare répondait par une redirection 307 de `/a-propos` vers `/a-propos/`, alors que la balise canonique déclarait la version sans barre oblique.

## Ce que j'ai corrigé

### Rediriger chaque ancienne adresse, en 301

C'est la correction qui compte le plus. Les neuf premières redirections datent du 1er septembre 2026. Dans [mon billet du 22 septembre](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec), j'écrivais que chaque ancienne URL redirigeait vers le bon article. C'était faux : il en manquait 42.

L'historique Git permet de toutes les retrouver. Pour chaque époque, on sait où se trouvait chaque fichier dans `content/`, donc quelle était son adresse. Aujourd'hui, 51 anciennes adresses redirigent vers le bon billet :

```js
export const EXACT_REDIRECTS = {
  // FR, URL plates (20 décembre 2024 → 26 mars 2026)
  '/fr/restons-zen': '/fr/20241022-restons-zen',
  '/fr/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  // FR, /fr/AAAA/MM/<slug> (18 octobre → 20 décembre 2024)
  '/fr/2024/10/restons-zen': '/fr/20241022-restons-zen',
  // …
}
```

La liste complète est dans le dépôt du site : [redirects.js](https://github.com/jhouedanou/mon-blog/blob/master/redirects.js){target="_blank" rel="noopener"}.

Deux pièges :

- **Le code 301 doit être écrit en toutes lettres.** Par défaut, Nuxt (via Nitro) redirige avec un code 307, qui veut dire « temporaire ». Avec une redirection temporaire, [Google garde l'ancienne adresse dans ses résultats](https://developers.google.com/search/docs/crawling-indexing/301-redirects){target="_blank" rel="noopener"}. Avec une 301, il affiche la nouvelle.
- **Le nom de l'URL n'est pas toujours le nom du fichier.** Nuxt Content retire les accents et met tout en minuscules : `chersCommerciaux.md` est servi sur `/fr/cherscommerciaux`, `on-fait-un-peu-le-ménage.md` sur `/fr/on-fait-un-peu-le-menage`. Une redirection vers le nom du fichier mène à une 404.

### Rediriger `www` vers le domaine sans `www`

Depuis le 18 octobre 2026, `www.houedanou.com/<chemin>` redirige en 301 vers `houedanou.com/<chemin>`, en gardant le chemin et les paramètres. Ça ne se règle pas dans le code du site, mais dans le tableau de bord de Cloudflare (Rules, puis Redirect Rules) :

- adresse d'origine : `https://www.houedanou.com/*`
- adresse cible : `https://houedanou.com/${1}`
- code : 301, avec « Preserve query string » coché

Un vieux lien vers le WordPress arrive maintenant sur le domaine principal. Si le billet a un équivalent, il est redirigé. Sinon, il reçoit un 404 propre au lieu d'une erreur 522.

### Un vrai 404 pour tout le reste

Une adresse qui n'a pas d'équivalent ne doit pas être redirigée vers l'accueil : Google traite ça comme un *soft 404*. Elle doit répondre 404, tout simplement. Depuis le 23 septembre 2026, le site est entièrement généré à l'avance et servi comme de simples fichiers. Une adresse inconnue reçoit la page 404 du site, avec un vrai code 404.

### Un sitemap qui dit la vérité

Le plan du site annonce maintenant chaque billet une seule fois, avec sa vraie date de publication ou de mise à jour. Aujourd'hui, j'en ai aussi retiré 53 pages de tags vides : le sélecteur de langue menait de `/en/tags/africa` vers `/tags/africa`, une page sans aucun article, que le site générait quand même et annonçait à Google.

### Les balises, une par une

Balise canonique sur chaque page, langue déclarée correctement sur les pages anglaises, un seul H1, une description de 120 à 160 caractères pour chaque billet, des images de partage en JPEG de 1200 × 630 pixels. Rien de spectaculaire, mais tout ça manquait.

## Ce que je n'ai pas récupéré

- **Les billets de l'époque WordPress.** Ils ne sont pas sur le nouveau site, donc leurs adresses n'ont nulle part où rediriger. Pour les retrouver, il me faudrait la liste exacte de leurs adresses : un export WordPress, ou les pages en erreur 404 dans la Search Console.
- **Trois billets supprimés en route** : « Un scam pour voler votre mot de passe », « Les trolls sont des clowns » et « Comment j'ai construit mon site avec Nuxt 3 ». Leurs adresses répondent 404, et c'est la bonne réponse.

## Où en est le site aujourd'hui

J'ai fait un audit du site en ligne le 18 octobre 2026. Le détail est dans le dépôt : [audit du positionnement](https://github.com/jhouedanou/mon-blog/blob/master/docs/audit-positionnement-2026-10-18.md){target="_blank" rel="noopener"}. En résumé :

- **Ce qui va bien.** Les 344 adresses que le sitemap annonçait avant cette mise à jour répondaient toutes en 200. Il en annonce maintenant 293 : les 53 pages de tags vides en moins, ce billet et sa version anglaise en plus. Chaque page a sa balise canonique, un seul H1 (à une exception près, corrigée aujourd'hui) et une description. `robots.txt` existe et pointe vers le sitemap.
- **Ce qui pèse.** Lighthouse, en mobile simulé, donne 92/100 en SEO et 100/100 en accessibilité, mais seulement 59/100 en performance sur l'accueil et 58/100 sur un article. Le plus gros élément visible met 5 à 7 secondes à s'afficher. Une part du retard vient de scripts tiers : Google Tag Manager et la publicité Infolinks bloquent le navigateur pendant 230 à 330 millisecondes.
- **Ce que je dois surveiller.** Depuis le 13 octobre, le site envoie automatiquement vers la version anglaise les visiteurs dont le navigateur n'est pas en français. Les robots de Google ne sont pas redirigés, l'indexation n'est donc pas touchée. Mais Google [déconseille ce type de redirection](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites){target="_blank" rel="noopener"}, et préfère un simple bouton de choix de langue.
- **Ce que je n'ai pas encore.** Les vraies positions, requête par requête, ne se lisent que dans la Search Console. Les moteurs de recherche bloquent les requêtes automatiques, et un outil qui cherche depuis les États-Unis ne dit rien des résultats de Google en France ou en Côte d'Ivoire. Le prochain point se fera avec les chiffres de la Search Console : pages en 404, pages exclues, et évolution des clics sur les billets redirigés.

## Ce que j'en retiens

Avec Nuxt Content, renommer un fichier, c'est déplacer une page. Avant de ranger, de renommer ou de supprimer, il faut écrire la redirection. Et si on a oublié de le faire, l'historique Git garde la trace de chaque ancienne adresse : on peut encore écrire les redirections des mois plus tard.

Je referai le point dans quelques semaines, avec les chiffres de la Search Console. Si la courbe ne remonte pas, vous en entendrez parler.

---

*Image : les adresses successives du billet sur Djamo, d'après l'historique Git du site.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — déménageur numérique, redirections comprises*
