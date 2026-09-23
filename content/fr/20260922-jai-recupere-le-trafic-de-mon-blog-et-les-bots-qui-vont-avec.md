---
title: "J'ai récupéré le trafic de mon blog (et les bots qui vont avec. Merci WordPress)"
createdAt: "2026-09-22T19:30:00Z"
image: "/images/articles/worker-cpu-depassements-septembre-2026.webp"
description: "Cloudflare m'a écrit que mon site dépassait sa limite de CPU plus de cent fois par jour. Le coupable n'était pas mon code, ou pas seulement : des scanners qui cherchent encore un WordPress que j'ai désinstallé il y a longtemps. Voici ce que j'ai trouvé dans les analytics, et ce que j'ai changé."
searchIntent: "Pourquoi un site sur Cloudflare Workers dépasse-t-il la limite de 10 ms de CPU du plan gratuit, comment identifier les bots et scanners qui le provoquent, et comment les bloquer avec des règles WAF sans passer au plan payant ?"
tags: ["dev", "tutoriel", "sécurité", "cloudflare", "nuxt"]
---

# J'ai récupéré le trafic de mon blog (et les bots qui vont avec. Merci WordPress)

> **Mise à jour du 23 septembre.** Depuis la publication de ce billet, j'ai carrément supprimé le Worker : le site est maintenant servi comme de simples fichiers, et le problème de CPU est parti avec lui. Ce qui suit raconte la première parade, telle que je l'avais mise en place le 22 septembre. La suite est en fin d'article.

Ce blog a longtemps tourné sous WordPress. Depuis, il est passé à Nuxt, puis chez Cloudflare, et pendant tout ce temps des centaines d'anciennes adresses sont restées dans l'index de Google, dans des liens d'autres sites et dans les favoris de quelques lecteurs fidèles. Ces dernières semaines, j'ai fini par faire le ménage : chaque ancienne URL redirige vers le bon article, et tout ce qui appartenait à la mécanique WordPress répondait 410, la réponse qui dit à Google « cette page n'existe plus, arrête de la demander » (c'est devenu une simple 404 depuis, j'y reviens à la fin).

Le trafic est revenu. Et avec lui, quelque chose que je n'avais pas commandé.

## Le courriel de Cloudflare

Un matin, ceci dans ma boîte :

```
Your Workers hit the free tier CPU time limit at least 100+ times in the past 24 hours
Upgrade to increase limit
```

Un peu de contexte. Ce site était alors servi par un Worker Cloudflare, un petit programme qui tourne dans leurs centres de données. Le plan gratuit lui accorde 10 millisecondes de temps processeur par requête. Au-delà, Cloudflare coupe l'exécution en cours et renvoie une erreur au visiteur. Cent fois par jour, donc, quelqu'un tombait sur une page cassée.

La quasi-totalité de mes pages est générée à l'avance au moment du déploiement, et servie comme de simples fichiers, sans jamais réveiller le Worker. Il n'aurait donc dû tourner que pour quelques cas rares : le flux RSS, le plan du site, et les adresses qui ne correspondent à aucun fichier.

C'est ce dernier point qui m'a mis sur la piste.

## Ce que disent les analytics

J'ai interrogé l'API d'analyse de Cloudflare sur les dernières 24 heures. Voici ce que le Worker avait vécu :

| Sort de la requête | Nombre |
|---|---|
| Servie normalement | 668 |
| Coupée pour dépassement de CPU | 1 201 |
| Visiteur parti avant la réponse | 61 |

Soixante-deux pour cent des requêtes qui atteignaient le Worker finissaient coupées. Le graphique en tête d'article montre la même chose jour par jour, depuis le 15 septembre : l'orange, c'est ce qui a été coupé.

Ensuite, j'ai regardé quelles adresses étaient demandées. Je m'attendais à des fautes de frappe dans des URL d'articles. Voici plutôt les plus fréquentes parmi celles qui ont échoué :

```
/.git/HEAD
/_nuxt/../.env
/ml/.env
/api/v1/keys
/wp-login.php
/blog/wp-login.php
/.env.production.bak
/privatekey.key
/dashboard%2F.env
/public_html/.env
/joomla/.env
/mysql/.env
/postgres/.env
/express/.env
/postmark/.env
/phpinfo.php
/.aws/credentials
/google-credentials.json
```

Aucun de ces fichiers n'a jamais existé sur ce site. Ce ne sont pas des lecteurs qui se trompent d'adresse, ce sont des scanners qui testent, sur tous les domaines qu'ils croisent, la liste des fichiers que des développeurs pressés laissent parfois traîner : la configuration avec les mots de passe, le dépôt Git, les clés d'accès au cloud. Et, bien sûr, la porte d'entrée de WordPress, parce que WordPress fait tourner près d'un site sur deux et que ça vaut toujours le coup d'essayer.

Les navigateurs déclarés par ces visiteurs valent le détour :

```
(vide)                                        421 requêtes
nginx-ssl early hints                         408
Mozilla/5.0 (compatible; MSIE 10.0; ...)      263
More Firefox 1.0 user agents strings -->>     222
```

Internet Explorer 10 n'existe plus depuis dix ans. Et « More Firefox 1.0 user agents strings -->> » n'est pas un navigateur : c'est le texte d'un lien sur une page qui recense des identifiants de navigateurs. Quelqu'un a copié la page entière dans son outil, ligne de titre comprise, et l'outil scanne le web en se présentant ainsi.

Côté géographie, les États-Unis, l'Allemagne, Singapour et la Chine arrivaient loin devant la France et la Côte d'Ivoire, qui sont pourtant, et de loin, là où vivent les gens qui me lisent.

## Pourquoi ça coûtait si cher

Un fichier introuvable, ça devrait coûter presque rien. Sauf que mon site est construit avec Nuxt, et que quand une adresse ne correspond à aucun article, Nuxt fait ce qu'on lui a demandé de faire : il rend la page d'erreur. Une belle page, avec la mise en page du site, les traductions, et les trois derniers articles suggérés au lecteur perdu. Pour produire ces trois suggestions, il charge la liste complète des articles.

Tout ça pour un robot qui cherchait `/postgres/.env` et qui ne lira jamais la réponse.

Le rendu de cette page pesait 741 Ko, et il dépassait à lui seul le budget de 10 millisecondes. Chaque sonde d'un scanner réveillait donc le Worker, qui commençait à rendre une page d'erreur, et se faisait couper au milieu. Plus grave : quand le Worker enchaîne les dépassements, Cloudflare finit par couper aussi des requêtes légitimes. Dans les analytics, j'ai trouvé des erreurs 522 sur la page d'accueil. Des vrais lecteurs, pénalisés parce que des robots cherchaient un WordPress qui n'est plus là.

## Ce que j'ai changé

### Premier réflexe : répondre vite dans le Worker

La première chose était de ne plus rendre une page pour quelqu'un qui ne la regardera pas. Les adresses de l'ancien WordPress ont d'abord reçu un 410 écrit à la main, 445 octets, sans passer par Nuxt. Les sondes de scanners, elles, recevaient un 404 encore plus sec. Voici ce que ça donnait le 22 septembre (aujourd'hui, c'est la page 404 du site qui s'affiche) :

```
$ curl -si https://houedanou.com/.env | head -4
HTTP/2 404
content-type: text/plain; charset=utf-8
cache-control: public, max-age=3600
x-robots-tag: noindex

404 Not Found
```

Quatorze octets, et un en-tête de cache pour que Cloudflare réponde lui-même à la prochaine sonde identique. Les motifs reconnus tenaient en quelques expressions régulières : un segment qui commence par un point (`.env`, `.git`, `.aws`), une extension de script ou de sauvegarde (`.php`, `.bak`, `.key`, `.sql`), un fichier statique qui n'existe pas (s'il existait, il aurait été servi sans réveiller le Worker), l'arborescence d'un autre CMS.

La page d'erreur de Nuxt, avec ses suggestions, restait en place pour les humains qui se trompent dans une URL d'article. J'y avais juste retiré le chargement du corps complet des articles, qui ne servait à rien pour afficher trois titres.

Au passage, la même enquête a fait tomber un autre gaspillage : les listes d'articles chargeaient le texte intégral des 48 billets pour n'afficher que des titres et des dates. Le temps de lecture, lui, était recalculé à chaque affichage en parcourant tout ce texte. Il est maintenant calculé une fois au déploiement, et rangé avec l'article.

### Au bord : bloquer avant même d'arriver au site

Répondre vite, c'est bien. Toutefois, le plus efficace reste de ne pas laisser ces requêtes arriver jusqu'au site. Cloudflare permet, même sur le plan gratuit, de créer cinq règles de pare-feu qui s'appliquent en amont. Une requête bloquée là ne réveillait pas le Worker, et ne coûtait donc rien. Ces règles sont d'ailleurs toujours en place.

J'en ai créé trois :

1. **Les chemins de scanners** : tout segment commençant par un point (sauf `/.well-known/`), les extensions `.php`, `.env`, `.bak`, `.key`, `.sql` et compagnie, tout ce qui contient `wp-`, `xmlrpc`, `phpinfo`, `phpmyadmin`. Avec une exception pour les robots vérifiés par Cloudflare, Googlebot en tête, pour qu'ils continuent de recevoir une réponse d'erreur sur les anciennes adresses et finissent par les oublier.
2. **Les faux navigateurs** : identifiant vide, « nginx-ssl early hints », « MSIE », et notre ami « More Firefox 1.0 user agents strings ».
3. **Les aspirateurs** : les robots des outils SEO (Ahrefs, DotBot, Semrush), qui explorent le site pour vendre des rapports à d'autres, et les collecteurs des entreprises d'IA (CCBot, GPTBot, ClaudeBot, Bytespider, Amazonbot). Cloudflare propose d'ailleurs un simple interrupteur « Bloquer les bots IA » qui couvre ces derniers, et qui est tenu à jour à ma place.

Le langage de ces règles n'a pas d'expressions régulières sur le plan gratuit, il faut donc empiler des `contains` et des `ends_with`. Les trois règles complètes sont dans le dépôt du site, prêtes à coller : [docs/cloudflare-waf.md](https://github.com/jhouedanou/mon-blog/blob/master/docs/cloudflare-waf.md).

### Dans robots.txt : pour les polis

Enfin, `robots.txt` interdit désormais explicitement `/wp-admin/`, `/wp-login.php` et les autres. Ça ne change rien pour les scanners, qui ne le lisent pas, mais ça évite aux robots respectueux de revenir vérifier tous les mois si WordPress est réapparu.

## Et maintenant ?

Sur un plan gratuit, le budget se compte en millisecondes plutôt qu'en euros, et avant d'accuser son propre code, mieux vaut regarder qui consomme ce budget. Chez moi, ce n'étaient pas les lecteurs.

Les redirections ont bien ramené les visiteurs qui arrivaient par les anciennes adresses. Elles ont aussi montré aux scanners que le domaine répondait, ce qui les a encouragés à insister. Avec le recul, la vraie solution était plus simple que tout ce qui précède : un blog dont toutes les pages sont générées à l'avance n'a pas besoin d'un programme pour les servir. C'est l'objet de la mise à jour ci-dessous.

Je referai le point sur les compteurs dans quelques jours. Si l'orange du graphique n'est pas retombé à zéro, vous en entendrez parler 🙂

## Mise à jour du 23 septembre : plus de Worker du tout

Le lendemain, Cloudflare m'a renvoyé le même courriel. Certes, il porte sur les dernières 24 heures, donc une partie des dépassements datait d'avant les changements. Mais en refaisant quelques tests, j'ai trouvé deux trous que je n'avais pas bouchés. Une adresse de la forme `/api/_content/query/abc.json`, avec n'importe quoi à la place de `abc`, réveillait encore le Worker, qui répondait en envoyant tout le contenu du blog : 1,2 Mo de JSON, bien au-delà de 10 millisecondes de travail. Et une simple faute de frappe dans une URL d'article déclenchait toujours le rendu complet de la page d'erreur.

Plutôt que d'ajouter une exception de plus, je me suis posé une question plus simple : à quoi sert ce Worker, si toutes les pages sont déjà générées à l'avance ? Pas à grand-chose, en fait. Le site est donc maintenant publié comme un ensemble de fichiers statiques, sans programme derrière. Cloudflare sert les pages, applique les redirections des anciennes adresses et renvoie la page 404 tout seul, et ce travail-là n'a pas de limite de CPU sur le plan gratuit.

Il y a une contrepartie : les anciennes adresses WordPress répondent désormais 404 au lieu de 410. Pour Google, la différence est mince, il les oubliera quand même, juste un peu moins vite. Les règles de pare-feu restent en place, elles évitent toujours de servir des pages à des robots qui n'en feront rien.

---

*Graphique : invocations du Worker mon-blog du 15 au 22 septembre 2026, d'après l'API d'analyse de Cloudflare.*
