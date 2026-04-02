---
title: "De Vercel à Cloudflare Pages : comment j'ai dit au revoir aux frais d'hébergement (et pourquoi tu dois aussi)"
image: "/images/articles/cloudflarevercel.jpg"
createdAt: "2026-04-02"
description: "Retour d'expérience sur la migration de Vercel vers Cloudflare Pages : bande passante illimitée, SSR gratuit, CDN ultra-rapide — et zéro facture. Guide complet pour développeurs africains."
keywords: "Vercel, Cloudflare Pages, migration, hébergement gratuit, Nuxt 3, SSR, CDN, edge functions, bande passante illimitée, développement web, Afrique"
tags: ["tutoriel", "dev", "afrique"]
---

# De Vercel à Cloudflare Pages : comment j'ai dit au revoir aux frais d'hébergement (et pourquoi tu dois aussi)

Vous connaissez ce sentiment ? Vous lancez votre petit projet perso sur Vercel, tout va bien… jusqu'au moment où vous recevez votre première facture.

Moi aussi, j'ai connu ça.

> **Avertissement** : cet article contient des quantités déraisonnables de messages d'erreur, de frustration, et au moins un formulaire web qui refuse de fonctionner. Âmes sensibles, s'abstenir.

Sauf qu'après les péripéties avec cPanel et l'impossible paiement des licences (merci Tonton Donald 🫡 ... ), je me suis dit : **si je dois choisir mes outils, autant que ce soit gratuit, et autant que ce soit bon.**

C'est comme ça que j'ai découvert qu'on n'avait pas vraiment besoin de payer pour avoir du hosting qui déménage les montagnes.

---

## Le problème avec Vercel (et pourquoi je dois bouger)

Vercel, c'est confortable. Très confortable.

- Déploiement depuis GitHub en trois clicks
- HTTPS gratuit
- CDN monde
- Edge Functions gratuites

Mais voilà : le tier gratuit, c'est **100 Go de bande passante par mois**. Et une fois que vous dépassez (ou que vous approchez), les prix montent vite. Très vite.

Sachant que je dois héberger plusieurs projets perso (incluant ce blog, et d'autres expériences numériques), l'addition s'accumule.

Vercel n'est pas mauvais. Il faut juste être honnête : c'est fait pour les startups financées, pas pour les développeurs africains qui veulent garder leur indépendance.

---

## Pourquoi Cloudflare Pages ? (Le vrai game-changer)

Bon, d'abord je dois clarifier un truc : **Cloudflare n'est pas parfait**. Mais pour ce que je fais, c'est le meilleur rapport qualité/prix gratuit que j'ai trouvé.

Voici pourquoi :

### 1. **Bande passante illimitée** 🚀

Avec Vercel : 100 Go/mois (gratuit), puis ça coûte cher.
Avec Cloudflare Pages : **illimité**.

Je répète : **illimité**.

Si votre blog explose en visibilité (hypothèse optimiste), vous ne paierez rien de plus.

### 2. **SSR complet** (Edge Functions gratuites)

Contrairement à GitHub Pages (qui ne fait que du statique), Cloudflare Pages supporte les **edge functions** gratuitement.

Ça veut dire quoi ? Que je peux servir du contenu dynamique, des API calls, du rendu côté serveur — tout ça sans coûts supplémentaires.

Mon Nuxt 3 avec SSR ? Ça marche parfaitement.

### 3. **CDN ultra-rapide (mais vraiment très rapide)**

Cloudflare gère le plus grand réseau de data centers du monde. Votre site est servi depuis le serveur Cloudflare le plus proche de l'utilisateur.

**Latence zéro pour nos utilisateurs locaux**.

### 4. **100 000 requêtes par jour (gratuites)**

Mon blog vient d'être migré. Premier jour sur Cloudflare Pages : **339 requêtes sur les 100 000 autorisées par jour**. On est large.

Pour mettre ça en perspective : Vercel limite la bande passante, Cloudflare limite les requêtes — mais à 100 000/jour, il faut vraiment que votre site devienne viral pour atteindre cette limite.

### 5. **Configuration ridicule**

- 500 builds/mois (gratuit . Et surtout, 1 build = 1 article en ce qui ME concerne. )
- Connexion directe à GitHub
- Auto-déploiement à chaque push
- Certificats SSL auto-renouvelés

C'est presque trop simple. 

Enfin, en théorie. 

En pratique, lisez la section "Les pièges" plus bas avant de vous réjouir. 😬

### 6. **Le prix du domaine personnalisé**

Cloudflare ne facture rien pour pointer un domaine personnalisé. Vous gardez votre registrar (Namecheap, GoDaddy, peu importe), et Cloudflare vous fournit les DNS.

C'est gratos.

---

## Comment j'ai basculé (et comment vous pouvez le faire)

### Step 1 : Modifier le preset Nitro

Dans `nuxt.config.js` (ou `nuxt.config.ts`) :

```js
export default defineNuxtConfig({
  nitro: {
    presets: ['cloudflare-pages']
  }
})
```

C'est littéralement tout ce que vous devez changer dans votre config Nuxt.

### Step 2 : Créer le fichier `wrangler.toml`

À la racine de votre projet. **Attention** : la config dépend de comment votre projet a été créé chez Cloudflare.

**Si votre projet est de type Pages** (créé via Cloudflare Pages) :

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
pages_build_output_dir = "./dist"
```

**Si votre projet est de type Workers** (ou si le dashboard vous force à utiliser `npx wrangler deploy`) :

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
main = "dist/_worker.js/index.js"

[assets]
directory = "./dist"
```

Comment savoir ? Essayez de modifier la commande de déploiement dans le dashboard. Si vous ne pouvez pas la changer, c'est un projet Workers — utilisez la deuxième config.

### Step 3 : Connecter votre repo GitHub

1. Allez sur [Cloudflare Pages](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Sélectionnez votre repo GitHub
4. Build command : `yarn run build` (ou `npm run build`)
5. Deploy command : `npx wrangler deploy` (imposé par Cloudflare si projet Workers)
6. Build output directory : vérifié automatiquement via `wrangler.toml`

**Attention** : le formulaire "Build configuration" dans le dashboard Cloudflare peut être capricieux. J'ai personnellement eu des erreurs `An internal error prevented the form from submitting` en essayant de changer la commande de déploiement. Si ça vous arrive, ne forcez pas — adaptez votre `wrangler.toml` à la place.

### Step 4 : Pointer votre domaine

Chez votre registrar DNS (GoDaddy dans mon cas) :

**Option A** (recommandée) — Utiliser les nameservers Cloudflare :
- Remplacer les nameservers par ceux de Cloudflare
- Cloudflare gère le reste

**Option B** — CNAME seul :
- Ajouter un CNAME : `www` → `subredomain.pages.dev`
- Cloudflare vous donne l'URL exacte

Vous pouvez garder vos DNS chez GoDaddy et juste ajouter un CNAME. Ou vous pouvez tout basculer chez Cloudflare (c'est gratuit aussi).

---

## Les pièges (parce qu'il y en a toujours)

### 1. **Les environnements variables**

Assurez-vous que toutes vos envvars sont configurées dans le dashboard Cloudflare Pages. J'ai faillit laisser mon API key en clair… 😅

### 2. **Les redirects et rewrites**

Cloudflare utilise `_redirects` ou `_headers` au lieu de `vercel.json`. C'est simple à adapter, mais faut le savoir.

Exemple `_redirects` :

```
/old-page /new-page 301
/api/* https://api.example.com/:splat 200
```

### 3. **Le `wrangler.toml` : un vrai champ de mines**

Celui-là m'a coûté des **heures**. Et je ne parle pas d'heures productives — je parle d'heures à tourner en rond entre des messages d'erreur cryptiques et un dashboard Cloudflare buggé.

**Première erreur** : j'avais dans mon `wrangler.toml` une config `[site]` avec `bucket = "./dist"` — un vestige de l'ancienne méthode Workers Sites. Résultat ? Wrangler cherchait un fichier `workers-site/index.js` qui n'existait pas :

```
✘ [ERROR] The entry-point file at "workers-site/index.js" was not found.
```

**Deuxième erreur** : j'ai remplacé par `pages_build_output_dir = "./dist"` — c'est la bonne config pour Cloudflare **Pages**. Sauf que ma commande de déploiement dans le dashboard était `npx wrangler deploy` — qui est une commande pour **Workers**, pas pour Pages. Résultat :

```
▲ [WARNING] It seems that you have run `wrangler deploy` on a Pages project,
  `wrangler pages deploy` should be used instead.

✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

**Troisième erreur** : j'ai voulu changer la commande de déploiement dans le dashboard Cloudflare pour `npx wrangler pages deploy dist/`. Mais le formulaire me renvoyait systématiquement :

```
An internal error prevented the form from submitting. Please try again.
Invalid request body
```

Même `npx wrangler pages deploy` sans argument : pareil. Le formulaire refusait tout sauf `npx wrangler deploy`. Frustrant.

**La solution finale** : puisque le dashboard m'imposait `npx wrangler deploy`, j'ai adapté le `wrangler.toml` pour que **cette commande** fonctionne. C'est-à-dire le configurer comme un projet Workers qui sert des assets :

```toml
name = "mon-blog"
compatibility_date = "2026-04-01"
main = "dist/_worker.js/index.js"

[assets]
directory = "./dist"
```

- `main` pointe vers le worker SSR que Nuxt génère automatiquement dans `dist/_worker.js/index.js`
- `[assets]` indique à Wrangler de servir les fichiers statiques depuis `./dist`

Vous pensez que c'est fini ? Moi aussi je pensais.

**Quatrième erreur** : le build passe, Wrangler lit la config, commence à scanner les 515 fichiers du dossier `dist/`… et panique parce qu'il trouve le dossier `_worker.js/` dedans. Il refuse de l'uploader comme un asset public (logique : c'est du code serveur privé) :

```
✘ [ERROR] Uploading a Pages _worker.js directory as an asset.
  This could expose your private server-side code to the public Internet.
```

La solution ? Créer un fichier `.assetsignore` dans `dist/` qui contient `_worker.js`. Sauf que `dist/` est régénéré à chaque build, donc il faut le créer automatiquement. J'ai modifié mon script de build dans `package.json` :

```json
"build": "nuxt build && echo _worker.js > dist/.assetsignore"
```

Un `echo`. Quatre erreurs de déploiement pour en arriver à un `echo`.

Je vous laisse méditer.

**Morale** : il y a un vrai flou entre les projets "Pages" et "Workers" chez Cloudflare. Si votre projet a été créé côté Workers, le dashboard vous force à utiliser `wrangler deploy`. Adaptez votre `wrangler.toml` en conséquence, n'oubliez pas le `.assetsignore`, et surtout : **ne vous battez pas avec le formulaire du dashboard**. Il va gagner.

### 4. **Les erreurs 404 pendant le prerendering**

Pendant le build, vous allez voir des `[404] Document not found!` dans les logs. Ne paniquez pas.

C'est normal si vous utilisez `documentDriven: true` dans Nuxt Content. Le crawler essaie de trouver un document markdown pour chaque route — y compris `/manifest.json` ou `/robots.txt`, qui ne sont évidemment pas des articles.

Ajoutez `failOnError: false` dans votre config Nitro pour que ces erreurs ne bloquent pas le build :

```js
nitro: {
  preset: 'cloudflare-pages',
  prerender: {
    crawlLinks: true,
    failOnError: false,
    routes: ['/sitemap.xml', '/feed.xml', '/robots.txt', '/'],
  },
},
```

### 5. **Les builds qui échouent silencieusement**

Parfois, Cloudflare construit votre site sans erreur… mais le résultat est cassé. Lisez les logs de build. Toujours.

### 6. **L'authentification GitHub**

Assurez-vous que Cloudflare a les bonnes permissions sur votre repo. Si votre build rate-limite, c'est souvent là le problème.

---

## Ce que j'ai gagné (honnêtement)

| Métrique | Vercel | Cloudflare |
|----------|--------|-----------|
| Coût | $0 (100 Go/mois) | $0 (illimité) |
| SSR | ✅ | ✅ |
| Vitesse | ⚡⚡⚡ | ⚡⚡⚡⚡ |
| Bande passante | 100 Go/mois | Illimitée |
| Requêtes/jour | Non communiqué | 100 000 |
| Edge functions | Quelques gratuites | Illimitées |
| Facilité de setup | ⭐⭐⭐ | ⭐ (4 erreurs et un `echo` plus tard) |
| Support | Bon | Excellent |

Le vrai gain ? **Zéro stress financier** + **performance identique ou meilleure**.

Et pour un développeur africain qui doit chaque mois jongler avec les conversions de devises, les frais bancaires, et les ruptures de paiement aléatoires : c'est **inestimable**.

---

## Et les autres alternatives ?

Juste pour être exhaustif :

- **GitHub Pages** : Gratuit, mais statique uniquement (pas de SSR). Bon pour un portfolio ou un blog simple.
- **Netlify** : Solide, SSR complet, gratuit jusqu'à 100 Go bande passante/mois. Bonne alternative à Cloudflare.
- **Render** : Gratuit mais le service « dort » après inactivité. Pas idéal pour un blog.

Mais entre ces trois ? **Cloudflare Pages gagne à chaque fois**.

---

## Le moment où j'ai réalisé que c'était bon

Récapitulons mon après-midi du 2 avril 2026 :

1. ❌ `workers-site/index.js` introuvable (config Workers Sites obsolète)
2. ❌ `Missing entry-point` (conflit Pages vs Workers)
3. ❌ Dashboard Cloudflare qui refuse de sauvegarder (`An internal error prevented the form from submitting`)
4. ❌ `_worker.js` uploadé comme asset public (code serveur exposé sur Internet)
5. ✅ Un `echo _worker.js > dist/.assetsignore` et tout marche

Cinq erreurs. Un après-midi. Et la solution finale tient en une ligne de shell.

Si quelqu'un de Cloudflare lit ceci : **votre formulaire de configuration de build est cassé**. Et la distinction entre Pages et Workers est aussi claire qu'un rond-point à Abidjan à 18h.

Mais une fois que c'est configuré ? Franchement ?

TTFB : ~120ms
Pages rendues : instantanées
Facture : 0 FCFA

Depuis cPanel vers CyberPanel, j'ai compris quelque chose : **les outils gratuits et open-source ne sont pas des compromis. C'est juste que le chemin pour les configurer ressemble parfois à un parcours du combattant.**

Cloudflare Pages, c'est le restaurant où la cuisine est incroyable mais où il faut traverser un labyrinthe pour trouver la porte d'entrée. Une fois dedans, vous ne regrettez rien.

Et pour un développeur africain qui doit jongler avec les conversions de devises, les frais bancaires, et les ruptures de paiement aléatoires : **un outil gratuit qui marche vraiment, ça n'a pas de prix** — même si la mise en route vous coûte quelques cheveux (pas grave en ce qui me concerne, vu le peu qu'il me reste).

---

*[Jean-Luc Houédanou](https://houedanou.com) — toujours à la chasse aux outils qui ne cassent pas la tirelire*
