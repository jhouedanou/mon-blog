---
title: "Migrer un site PrestaShop vers un nouveau nom de domaine : le guide complet"
image: "/images/articles/prestashop-migration-domaine.jpg"
createdAt: "2026-03-31"
description: "Changer de nom de domaine sur PrestaShop sans tout casser : base de données, fichiers de config, SSL, cache, redirections 301 et services tiers. Un guide étape par étape, testé en production."
keywords: "PrestaShop, migration domaine, changement nom de domaine, PrestaShop 8, PrestaShop 1.7, redirections 301, SEO, SSL, base de données, phpMyAdmin, e-commerce, htaccess, multistore, CyberPanel, Let's Encrypt"
---

# Migrer un site PrestaShop vers un nouveau nom de domaine : le guide complet

Changer de nom de domaine sur PrestaShop, c'est une opération qui fait transpirer même les développeurs expérimentés. Entre la base de données, le cache, le SSL et les redirections SEO, il y a pas mal de pièges. Voici un guide étape par étape, testé en production.

## Prérequis

Avant de toucher à quoi que ce soit :

- Un accès SSH au serveur (ou au minimum phpMyAdmin + FTP)
- Une sauvegarde complète : fichiers + base de données
- Le nouveau domaine déjà configuré côté DNS (enregistrements A et CNAME pointant vers le serveur)
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

Pensez notamment à mettre à jour :

- `PS_COOKIE_DOMAIN` et `PS_COOKIE_DOMAIN_SSL`
- Les URLs de modules tiers (paiement, analytics, etc.)

## Étape 2 — Modifier les fichiers de configuration

Selon votre version de PrestaShop :

**PrestaShop 8.x** — Vérifiez `/app/config/parameters.php` :

```php
'ps_shop_domain' => 'nouveau-domaine.com',
'ps_shop_domain_ssl' => 'nouveau-domaine.com',
```

**PrestaShop 1.7.x** — Vérifiez `/config/settings.inc.php` :

```php
define('_PS_BASE_URL_', 'https://nouveau-domaine.com');
```

**PrestaShop 1.6.x** — Même fichier, mais vérifiez aussi `/config/settings.inc.php` pour les constantes `_COOKIE_KEY_` et autres.

## Étape 3 — Certificat SSL

Si vous utilisez Let's Encrypt, générez un nouveau certificat pour le domaine :

```bash
# Avec Certbot (Apache)
sudo certbot --apache -d nouveau-domaine.com -d www.nouveau-domaine.com

# Avec Certbot (Nginx / OpenLiteSpeed)
sudo certbot certonly --webroot -w /var/www/nouveau-domaine -d nouveau-domaine.com
```

Sur CyberPanel, c'est encore plus simple : **Websites > List Websites > SSL > Issue SSL**.

Ensuite, activez le SSL dans le back-office PrestaShop :
**Paramètres de la boutique > Général > Activer SSL** et **Activer SSL sur tout le site**.

## Étape 4 — Purger le cache

PrestaShop est très agressif sur le cache. Si vous ne le videz pas, vous allez tourner en rond.

```bash
# Supprimer le cache applicatif
rm -rf var/cache/prod/* var/cache/dev/*

# Si vous êtes sur LiteSpeed / OpenLiteSpeed
# Purgez aussi le cache serveur
/usr/local/lsws/bin/lswsctrl purgeall
```

Vous pouvez aussi passer par le back-office : **Paramètres avancés > Performances > Vider le cache**.

## Étape 5 — Redirections 301 depuis l'ancien domaine

C'est l'étape la plus importante pour le SEO. Sans redirections 301, vous perdez tout votre référencement acquis.

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

> **Gardez ces redirections actives au minimum 6 à 12 mois.** Google met du temps à digérer un changement de domaine.

## Étape 6 — Mettre à jour les services tiers

C'est l'étape qu'on oublie systématiquement. Faites le tour de :

- **Google Search Console** : ajoutez le nouveau domaine comme propriété et utilisez l'outil *Changement d'adresse*
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

Bonne question. Et la réponse, c'est : **beaucoup plus de monde qu'on ne le croit**.

En Afrique francophone, PrestaShop reste une solution massivement déployée. Pas par nostalgie — par pragmatisme. C'est un CMS e-commerce open source, gratuit, qui tourne sur n'importe quel hébergement mutualisé à 35 000 FCFA par mois. Pas besoin d'un abonnement Shopify en dollars dont le paiement peut être bloqué du jour au lendemain par une décision géopolitique. Pas besoin de dépendre d'une plateforme SaaS américaine qui peut décider unilatéralement de fermer les comptes d'une région entière.

Oui, j'ai un os en travers de la gorge envers le modèle SaaS qui a envahi le web ces dernières années. Mais je digresse... PrestaShop, c'est **ton** serveur, **ta** base de données, **tes** fichiers. Personne ne peut te couper l'accès à ta propre boutique.

En France et en Europe, PrestaShop motorise encore des dizaines de milliers de boutiques. Des PME, des artisans, des marques de niche qui n'ont ni le budget ni l'envie de migrer vers une solution qui leur facture un pourcentage sur chaque vente.

Alors oui, l'interface du back-office sent bon les années 2010. Oui, la documentation est parfois un labyrinthe. Oui, on préférerait que certains modules soient gratuits plutôt qu'à 80 € sur la marketplace. Et ce système de templating est tout sauf aisé à prendre en main .

Mais en 2026, dans un monde où la souveraineté numérique n'est plus un concept abstrait mais une nécessité quotidienne, avoir un outil e-commerce que tu contrôles de bout en bout — c'est un luxe que beaucoup de solutions modernes ne peuvent tout simplement pas offrir.

PrestaShop n'est pas mort. Il est juste discret . Et parfois, c'est exactement ce dont on a besoin.

---
*[Jean Luc Houédanou](https://houedanou.com) — fier d'appartenir à la vieille garde du E-commerce*


