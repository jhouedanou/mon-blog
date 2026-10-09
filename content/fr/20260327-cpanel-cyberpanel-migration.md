---
title: "Comment le blocage des cartes en zone UEMOA m'a poussé à abandonner cPanel pour CyberPanel — et pourquoi je ne regrette rien"
image: "/images/articles/cpanel-cyberpanel-migration.webp"
createdAt: "2026-03-27"
description: "Hausses de prix de cPanel, paiements bloqués en zone UEMOA : retour d'expérience sur ma migration vers CyberPanel et OpenLiteSpeed, et un TTFB divisé par cinq."
updatedAt: "2026-10-08T12:00:00Z"
searchIntent: "Comment migrer une infrastructure de cPanel vers CyberPanel et OpenLiteSpeed en Afrique de l’Ouest."
tags: ["tutoriel", "dev", "afrique"]
---

Cet article, je ne pensais pas l'écrire un jour. Pas parce que le sujet est anodin — migrer toute une infrastructure serveur, c'est tout sauf anodin — mais parce que la décision ne s'est pas prise dans un bureau, devant un benchmark bien propre. Elle s'est prise dans le stress, l'urgence, et un contexte géopolitique que personne dans le web hosting n'avait vu venir.

## Le contexte : cPanel, une relation longue et coûteuse

Ça fait plus de dix ans que je vis avec cPanel/WHM. Comme beaucoup d'administrateurs systèmes en Afrique de l'Ouest, j'ai grandi professionnellement avec cette interface. Créer un compte, configurer un domaine, gérer des bases de données — tout passait par WHM. C'était confortable, familier, et pendant longtemps, le prix restait raisonnable.

Puis 2019 est arrivé. cPanel a abandonné son modèle de licence fixe pour un système par compte. Et depuis, chaque année, comme un rituel morbide, les prix augmentent. Au tarif partenaire (celui que cPanel facture aux hébergeurs et aux revendeurs de licences), la licence Solo valait **16 $/mois** en 2025. En 2026 ? **18 $**. La licence Pro (jusqu'à 30 comptes) a bondi de **27,25 $** à **32 $** — une hausse de **17 %** en un an ([grille partenaire 2025-2026 détaillée par VPSBG](https://www.vpsbg.eu/blog/cpanel-price-increase-2026){target="_blank" rel="noopener"}). Et au prix public, c'est pire : Solo à **29,99 $**, Pro à **53,99 $** ([tarifs officiels cPanel](https://cpanel.net/pricing/){target="_blank" rel="noopener"}), contre 26,99 $ et 46,99 $ en 2025. Quand tu gères plusieurs dizaines de sites, la facture devenait difficile à justifier.

Mais honnêtement, les augmentations de cPanel seules ne m'auraient probablement pas fait bouger. On s'adapte, on ajuste les devis, on grogne un peu et on continue. Ce qui a tout changé, c'est ce qui s'est passé début 2026.

## Quand les robinets se sont fermés

Début janvier 2026, les paiements en ligne par carte bancaire émise dans la zone UEMOA (Union économique et monétaire ouest-africaine) ont commencé à tomber. Dès le 2 janvier, Air Côte d'Ivoire et d'autres compagnies de la région affichaient que la vente en ligne par carte était « momentanément suspendue » ([Barid TV, 16 janvier 2026](https://barid.tv/2026/01/16/uemoa-le-bras-de-fer-des-paiements-en-ligne-gim-switch-defie-visa-et-mastercard/){target="_blank" rel="noopener"}). En cause : pas une mesure de l'administration Trump, comme je l'ai d'abord écrit, mais la décision n° 31 du GIM-UEMOA, le groupement interbancaire régional, validée par la BCEAO. Elle exige que toute transaction faite avec une carte émise dans la zone, même quand elle passe par Visa ou Mastercard, soit aussi routée et compensée par la plateforme régionale GIM-Switch. Visa et Mastercard n'ont pas suivi à temps. Le 29 janvier, un ultimatum leur a été fixé au 31 mars 2026 ([Financial Afrik, 29 janvier 2026](https://www.financialafrik.com/2026/01/29/uemoa-les-cartes-visa-et-mastercard-ont-90-jours-pour-se-conformer/){target="_blank" rel="noopener"}). Un bras de fer de souveraineté monétique, avec nos cartes bancaires au milieu.

**Résultat concret pour moi** : pendant presque un mois, impossible de payer la licence cPanel. Pas un problème de trésorerie. Un problème d'infrastructure de paiement. Les cartes ne passaient plus. Les alternatives (PayPal, Stripe) étaient instables ou indisponibles depuis la zone UEMOA. Et quand ta licence cPanel expire, WHM te le fait savoir — poliment d'abord, puis de moins en moins.

Le stress que ça génère quand tu gères les sites de plusieurs clients importants... je vous laisse imaginer. Chaque matin, tu vérifies que les sites sont encore en ligne. Chaque nuit, tu te demandes si demain la licence sera désactivée et si les sites vont basculer en erreur.

C'est dans ce contexte-là que la décision a été prise. Pas dans le calme. **Dans l'urgence.**

## La migration : de WHM/cPanel vers CyberPanel + OpenLiteSpeed

Le VPS était déjà sur Hostinger — un serveur costaud : **8 vCPU, 32 Go de RAM, 400 Go NVMe** sur AlmaLinux 9. La question n'était pas le matériel, mais le panneau de contrôle.

**CyberPanel s'est imposé pour trois raisons :**

**Premièrement, c'est gratuit.** Open source, communautaire, zéro licence. Dans un contexte où payer un fournisseur américain est devenu un parcours du combattant, c'est un argument massif. Plus jamais de stress de renouvellement de licence.

**Deuxièmement, il embarque OpenLiteSpeed nativement.** Pas besoin d'empiler Apache + Nginx + Engintron comme sur cPanel. OpenLiteSpeed est intégré dès l'installation, et c'est lui qui fait toute la différence en termes de performance.

**Troisièmement, l'interface est moderne et légère.** Après 10 ans de cPanel, on s'attend à un choc. En réalité, CyberPanel est plus intuitif qu'on ne le pense. La gestion des sites, des bases de données, des certificats SSL — tout est là.

## Le gain de vitesse : les chiffres parlent

C'est là que ça devient intéressant. Sur un site WordPress avec le thème Newspaper (tagDiv), voici ce qu'on a mesuré :

### Avant (cPanel + Apache + Engintron/Nginx)

| Métrique | Valeur |
|---|---|
| TTFB (Time To First Byte) | ~820 ms |
| Temps total de chargement | 2-3 secondes |
| Admin WordPress | Extrêmement lent, parfois 15 secondes par page |

### Après (CyberPanel + OpenLiteSpeed + optimisations)

| Métrique | Valeur |
|---|---|
| TTFB | ~170 ms |
| Temps total de chargement | < 1 seconde |
| Admin WordPress | Fluide, ~600 ms |

On parle d'une **réduction du TTFB de presque 80 %**. Et ce n'est pas qu'OpenLiteSpeed tout seul — c'est la combinaison de plusieurs facteurs :

- **OpenLiteSpeed** gère PHP via LSAPI, bien plus efficace que PHP-FPM derrière Apache
- **LiteSpeed Cache** (le plugin WordPress) exploite nativement les capacités du serveur, contrairement aux plugins de cache génériques
- **OPcache** correctement configuré (512 Mo de mémoire, 20 000 fichiers accélérés)
- **Redis** pour l'object cache WordPress, éliminant des centaines de requêtes MySQL à chaque chargement
- **Le DNS** — on a découvert que le nameserver primaire de Hostinger était mort et causait des délais de 15 secondes sur chaque résolution. Remplacé par Cloudflare/Google, verrouillé avec `chattr +i`

### La stack finale

```
Client → Cloudflare CDN → OpenLiteSpeed → PHP 8.2 + OPcache → WordPress + Redis + LiteSpeed Cache → MariaDB tuné
```

Comparée à l'ancienne :

```
Client → Cloudflare CDN → Nginx (Engintron) → Apache → PHP-FPM + OPcache → WordPress + W3 Total Cache → MariaDB
```

**Moins de couches, moins de latence, plus de performance.**

## Les difficultés : ne vous mentez pas, ça pique

Je serais malhonnête de vous dire que tout s'est passé en douceur. Voici ce qui m'a fait transpirer :

### 1. Les erreurs 503 au démarrage

Premier contact avec CyberPanel : le site affiche une erreur 503. Le diagnostic a révélé un chemin de socket LSAPI corrompu dans la configuration du vhost. Au lieu de pointer vers `/tmp/lshttpd/testa2500.sock`, la config contenait un caractère tronqué (`'d`). Il a fallu plonger dans les fichiers de configuration d'OpenLiteSpeed pour corriger manuellement.

### 2. Le piège ionCube + PHP 8.4

CyberPanel installe volontiers `lsphp84` (PHP 8.4), mais ionCube Loader n'est pas compatible avec cette version. Résultat : un deadlock complet de PHP, aucune page ne se charge, et les logs affichent un cryptique *« No request delivery notification has been received from LSAPI application, possible dead lock »*. La solution : revenir à `lsphp82`.

### 3. L'absence d'équivalent WHM pour la gestion multi-comptes

Si cPanel/WHM excelle quelque part, c'est dans la gestion de comptes revendeurs et la séparation des privilèges. CyberPanel propose un système de packages et d'utilisateurs, mais c'est moins granulaire. Pour quelqu'un qui gère des dizaines de sites clients, il faut repenser l'organisation.

### 4. La migration des emails

C'est le point le plus douloureux. cPanel embarque un écosystème mail complet (Dovecot, Exim, SpamAssassin, les webmails). CyberPanel utilise Postfix + Dovecot, mais la migration des comptes, des filtres et des règles n'est pas automatique. **Prévoyez du temps.**

### 5. Le manque de documentation francophone

La communauté CyberPanel est anglophone. Quand tu es à Abidjan à 21h passées en train de debugger un socket qui refuse de démarrer, tu rêves d'une doc en français. Elle n'existe pas. C'est aussi pour ça que j'écris ce billet.

### 6. Les sauvegardes One-Click

La fonctionnalité de sauvegarde automatique de CyberPanel m'a accueilli avec un joli message d'erreur : *« Invalid SSH key: SSH public key must start with a valid key type »*. La clé SSH générée n'était pas au bon format. Un détail, mais le genre de détail qui te fait perdre une heure quand tu es déjà sous pression.

## Ce que j'ai appris

Cette migration forcée m'a enseigné quelque chose d'important sur notre métier en Afrique de l'Ouest : **notre dépendance aux outils propriétaires américains est un risque systémique.**

Quand un bras de fer entre un régulateur régional et deux réseaux de cartes américains peut t'empêcher de payer ta licence serveur pendant un mois, quand la suspension des paiements Visa/Mastercard en zone UEMOA peut bloquer ton activité du jour au lendemain — il faut avoir un plan B. Et ce plan B, c'est **l'open source**.

CyberPanel n'est pas parfait. OpenLiteSpeed n'est pas parfait. Mais ils sont gratuits, performants, et **personne ne peut te couper l'accès parce que ta carte bancaire ne passe plus.**

## Recommandations pour ceux qui hésitent

Si vous gérez des serveurs en Afrique francophone et que vous envisagez la migration, voici mes conseils :

**Faites-le sur un serveur de test d'abord.** Montez un VPS à 10 $/mois, installez CyberPanel, migrez un site non critique. Apprenez les différences avant de toucher à la production.

**Maîtrisez la ligne de commande.** CyberPanel a une interface web, mais quand les choses tournent mal (et elles tourneront mal), c'est en SSH que ça se résout. Si vous n'êtes pas à l'aise avec `systemctl`, `vim` et les logs, formez-vous d'abord.

**Gardez Cloudflare devant.** Le CDN Cloudflare en version gratuite devant OpenLiteSpeed, c'est la combinaison magique. Cache, SSL, protection DDoS — gratuit. (Et pour un site statique ou un projet Nuxt, Cloudflare peut même remplacer l'hébergeur : [c'est ce que j'ai fait pour ce blog](/fr/20260402-vercel-cloudflare-pages-migration).)

**Prévoyez deux semaines minimum.** Pas deux jours, deux semaines. Entre la migration des sites, la configuration DNS, les tests, la migration des emails et les inévitables bugs, c'est le minimum réaliste.

**Documentez tout.** Chaque commande, chaque modification de fichier de config, chaque fix. Vous me remercierez la prochaine fois qu'un socket refusera de démarrer à 21h un jeudi soir.

## Conclusion

La migration de cPanel vers CyberPanel n'était pas dans mes plans. C'est l'augmentation continue des prix de cPanel, combinée à l'impossibilité de payer pendant un mois à cause du contexte géopolitique et des disruptions de paiement en zone UEMOA, qui m'a poussé à sauter le pas. Le stress a été réel. Les nuits blanches aussi.

Mais aujourd'hui, avec un **TTFB divisé par cinq**, **zéro frais de licence**, et une **indépendance retrouvée** vis-à-vis des systèmes de paiement internationaux, je ne regrette rien.

« Tonton Donald » n'y était finalement pour rien. Mais si cette crise m'a appris quelque chose, c'est que **la souveraineté numérique, en Afrique, ça commence par le choix de ses outils.**

*Mise à jour du 8 octobre 2026 : ionCube publie aujourd'hui des loaders pour PHP 8.4 et 8.5 ([page officielle des loaders](https://www.ioncube.com/loaders.php)). Avant de rétrograder vers `lsphp82`, vérifiez donc que la version du loader installé correspond à votre version de PHP. Autre raison de ne pas s'éterniser sur PHP 8.2 : il ne reçoit plus de correctifs de sécurité après le 31 décembre 2026 ([calendrier officiel de PHP](https://www.php.net/supported-versions.php)). Correction du même jour : la première version de ce billet attribuait le blocage des paiements à une mesure de l'administration Trump de janvier 2026. Il venait en réalité de la décision n° 31 du GIM-UEMOA (voir plus haut). Les prix de 2025 et 2026 sont précisés comme tarifs partenaires, avec les prix publics en regard ; le chiffre de 15,99 $ donné pour 2024 ne correspondait à aucune grille cPanel et a été retiré.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — de nouveau converti à l'open source*
