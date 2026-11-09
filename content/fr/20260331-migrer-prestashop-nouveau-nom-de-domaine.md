---
title: "Changer de domaine PrestaShop, garder le SEO"
image: "/images/articles/prestashop-migration-domaine.webp"
createdAt: "2026-03-31"
description: "Changer de domaine PrestaShop sans perdre son référencement : base de données, SSL, cache, redirections 301 et Search Console, étape par étape."
updatedAt: "2026-11-08T12:00:00Z"
searchIntent: "Comment changer le nom de domaine d’une boutique PrestaShop sans perdre son référencement : SSL, redirections 301, cache et Search Console ?"
tags: ["tutoriel", "dev"]
---

Changer de nom de domaine sur PrestaShop, c'est une opération qui fait transpirer même les développeurs expérimentés. Entre la base de données, le cache, le SSL et les redirections SEO, il y a pas mal de pièges. Voici un guide étape par étape, testé en production, pour changer de domaine PrestaShop sans perdre son référencement.

## Prérequis avant de changer de nom de domaine

Avant de toucher à quoi que ce soit :

- Un accès SSH au serveur (ou au minimum phpMyAdmin + FTP)
- Une sauvegarde complète : fichiers + base de données
- Le nouveau domaine déjà configuré côté DNS (enregistrements A et CNAME pointant vers le serveur). S'il passe par Cloudflare, confiez-lui le domaine par ses nameservers, comme dans l'option A de [ma migration de Vercel vers Cloudflare Pages](/fr/20260402-vercel-cloudflare-pages-migration)
- Un certificat SSL prêt à être déployé sur le nouveau domaine

> **Règle d'or** : ne faites jamais cette manipulation en pleine heure de pointe. Privilégiez un créneau de faible trafic.

## Étape 1 — Mettre à jour les URLs en base de données

C'est le cœur de la migration. PrestaShop stocke le nom de domaine dans plusieurs tables. Connectez-vous à phpMyAdmin ou en CLI MySQL et exécutez :

```sql
-- Table principale des URLs de boutique
UPDATE ps_shop_url 
SET domain = 'nouveau-domaine.com', 
    domain_ssl = 'nouveau-domaine.com' 
WHERE id_shop = 1;

-- Configuration globale
UPDATE ps_configuration 
SET value = 'nouveau-domaine.com' 
WHERE name = 'PS_SHOP_DOMAIN';

UPDATE ps_configuration 
SET value = 'nouveau-domaine.com' 
WHERE name = 'PS_SHOP_DOMAIN_SSL';
```

⚠️ Adaptez le préfixe `ps_` si vous l'avez personnalisé à l'installation.

### Vérifier les traces de l'ancien domaine

Il arrive que l'ancien domaine soit référencé ailleurs dans la configuration :

```sql
-- Rechercher toutes les occurrences
SELECT name, value FROM ps_configuration 
WHERE value LIKE '%ancien-domaine.com%';
```

Mettez à jour :

- toute autre clé que cette requête fait remonter ;
- les URLs de modules tiers (paiement, analytics, etc.).

## Étape 2 — Fichiers de configuration et `.htaccess`

Bonne nouvelle : le nom de domaine ne se trouve pas dans les fichiers de configuration de PrestaShop. En 1.7 et 8.x, `app/config/parameters.php` contient les accès à la base de données, les clés de sécurité et quelques réglages techniques, mais pas le domaine (voir le [modèle de paramètres officiel](https://github.com/PrestaShop/PrestaShop/blob/8.2.x/app/config/parameters.yml.dist)). En 1.6, `config/settings.inc.php` joue le même rôle. Vous n'avez à toucher à ces fichiers que si la base de données change elle aussi de serveur ou d'identifiants.

Le domaine se règle donc en base de données (étape 1), ou dans le back-office s'il est encore accessible : **Paramètres de la boutique > Trafic et SEO**, section de l'URL de la boutique, champs « Domaine de la boutique » et « Domaine SSL » ([documentation PrestaShop 8](https://docs.prestashop-project.org/v.8-documentation/user-guide/configuring-shop/shop-parameters/traffic/seo-and-urls)).

Le fichier à vérifier, c'est le `.htaccess` à la racine de la boutique : cherchez-y l'ancien domaine et remplacez-le s'il apparaît.

```bash
grep -n "ancien-domaine.com" .htaccess
```

## Étape 3 — Certificat SSL

Si vous utilisez Let's Encrypt, générez un nouveau certificat pour le domaine :

```bash
# Avec Certbot (Apache)
sudo certbot --apache -d nouveau-domaine.com -d www.nouveau-domaine.com

# Avec Certbot (Nginx / OpenLiteSpeed)
sudo certbot certonly --webroot -w /var/www/nouveau-domaine -d nouveau-domaine.com
```

Sur CyberPanel ([pourquoi je suis passé de cPanel à CyberPanel](/fr/20260327-cpanel-cyberpanel-migration)), c'est encore plus simple : **Websites > List Websites > SSL > Issue SSL**.

Ensuite, activez le SSL dans le back-office PrestaShop :
**Paramètres de la boutique > Général > Activer SSL** et **Activer SSL sur tout le site**.

## Étape 4 — Purger le cache

PrestaShop est très agressif sur le cache. Si vous ne le videz pas, vous allez tourner en rond.

```bash
# Supprimer le cache applicatif
rm -rf var/cache/prod/* var/cache/dev/*
```

Sur LiteSpeed ou OpenLiteSpeed, ne comptez pas sur `lswsctrl` pour vider ce cache : il sert seulement à démarrer, arrêter ou recharger le serveur ([code source d'OpenLiteSpeed](https://github.com/litespeedtech/openlitespeed/blob/master/dist/bin/lswsctrl){target="_blank" rel="noopener"}). Si la boutique utilise le module LiteSpeed Cache, videz son cache depuis le back-office PrestaShop ([documentation LiteSpeed Cache pour PrestaShop](https://docs.litespeedtech.com/lscache/lscps/){target="_blank" rel="noopener"}).

Vous pouvez aussi passer par le back-office : **Paramètres avancés > Performances > Vider le cache**.

## Étape 5 — Redirections 301 : ne pas perdre son référencement

C'est l'étape la plus importante pour le SEO. Sans redirections 301, vous perdez tout votre référencement acquis. Ce blog en a fait l'expérience : ce que des adresses sans redirection lui ont coûté, je le raconte dans [SEO perdu après migration : je l'ai récupéré](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere).

Sur l'ancien domaine, placez ce `.htaccess` à la racine :

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?ancien-domaine\.com$ [NC]
RewriteRule ^(.*)$ https://nouveau-domaine.com/$1 [R=301,L]
```

Si vous êtes sur Nginx :

```nginx
server {
    server_name ancien-domaine.com www.ancien-domaine.com;
    return 301 https://nouveau-domaine.com$request_uri;
}
```

Si vous êtes sur OpenLiteSpeed, ajoutez une règle de réécriture dans le vhost ou via CyberPanel.

> **Gardez ces redirections actives au moins un an.** Google met du temps à digérer un changement de domaine, et conseille de garder les redirections le plus longtemps possible, en général au moins un an ([Google Search Central](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr){target="_blank" rel="noopener"}).

## Étape 6 — Mettre à jour les services tiers

C'est l'étape qu'on oublie systématiquement. Faites le tour de :

- **Google Search Console** : ajoutez le nouveau domaine comme propriété et utilisez l'outil *Changement d'adresse*, une fois la redirection 301 en place ; il faut être propriétaire de l'ancienne et de la nouvelle propriété ([aide Search Console](https://support.google.com/webmasters/answer/9370220?hl=fr){target="_blank" rel="noopener"})
- **Google Analytics / Matomo** : mettez à jour l'URL du site
- **Google Merchant Center** : si vous faites du Shopping
- **Modules de paiement** : mettez à jour les URLs de callback/webhook (PayPal, Stripe, CinetPay, etc.). Sans ça, les confirmations de paiement vont échouer silencieusement
- **Sitemap** : régénérez-le depuis le back-office ou votre module SEO, puis soumettez-le dans Search Console
- **Réseaux sociaux et annuaires** : mettez à jour vos liens partout où l'ancien domaine apparaît

## Étape 7 — Vérification post-migration

Avant de considérer la migration comme terminée, vérifiez :

- ✅ La page d'accueil charge correctement en HTTPS
- ✅ Le back-office est accessible sur le nouveau domaine
- ✅ Le processus de commande fonctionne de bout en bout (ajout au panier → paiement → confirmation)
- ✅ Les emails transactionnels affichent le bon domaine
- ✅ Les redirections 301 fonctionnent depuis l'ancien domaine
- ✅ Le sitemap.xml est accessible et contient les bonnes URLs
- ✅ Les images produit s'affichent correctement (pas d'URLs en dur vers l'ancien domaine dans le contenu CMS)

## Étape bonus — Le multistore

Si votre PrestaShop est configuré en multistore, vérifiez **Paramètres avancés > Multistore** pour vous assurer que l'ancien domaine n'est pas encore listé comme boutique active. C'est un piège classique qui provoque des boucles de redirection.

## « Mais qui utilise encore PrestaShop en 2026 ? »

Bonne question : **beaucoup plus de monde qu'on ne le croit**.

En Afrique francophone, PrestaShop reste une solution massivement déployée. Pas par nostalgie, par pragmatisme. C'est un CMS e-commerce open source, gratuit, qui tourne sur n'importe quel hébergement mutualisé à 35 000 FCFA par mois. Pas besoin d'un abonnement Shopify en dollars dont le paiement peut être bloqué du jour au lendemain par une décision géopolitique. Pas besoin de dépendre d'une plateforme SaaS américaine qui peut décider unilatéralement de fermer les comptes d'une région entière.

Oui, j'ai un os en travers de la gorge envers le modèle SaaS qui a envahi le web ces dernières années. Mais je digresse... PrestaShop, c'est **ton** serveur, **ta** base de données, **tes** fichiers. Personne ne peut te couper l'accès à ta propre boutique.

En France et en Europe, PrestaShop motorise encore des dizaines de milliers de boutiques. Des PME, des artisans, des marques de niche qui n'ont ni le budget ni l'envie de migrer vers une solution qui leur facture un pourcentage sur chaque vente.

Alors oui, l'interface du back-office sent bon les années 2010. Oui, la documentation est parfois un labyrinthe. Oui, on préférerait que certains modules soient gratuits plutôt qu'à 80 € sur la marketplace. Et ce système de templating est tout sauf aisé à prendre en main.

Mais en 2026, alors que la souveraineté numérique est devenue une nécessité quotidienne, avoir un outil e-commerce que tu contrôles de bout en bout, c'est un luxe que beaucoup de solutions modernes ne peuvent pas offrir.

PrestaShop n'est pas mort, il est juste discret.

*Mise à jour du 8 octobre 2026 : l'étape 2 a été corrigée. Le nom de domaine n'est pas stocké dans `parameters.php` ni dans `settings.inc.php`, contrairement à ce qu'indiquait la première version, et la clé `PS_COOKIE_DOMAIN` citée à l'étape 1 n'existe pas dans PrestaShop ([code source](https://github.com/PrestaShop/PrestaShop)).*

*Correction du 8 novembre 2026 : à l'étape 4, sur OpenLiteSpeed, `lswsctrl` n'a pas de commande `purgeall` ; la bonne méthode est indiquée sous la commande. À l'étape 5, la durée des redirections suit maintenant la recommandation de Google, au moins un an (au lieu de « au minimum 6 à 12 mois »), et l'outil de changement d'adresse de la Search Console est sourcé.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — fier d'appartenir à la vieille garde du E-commerce*
