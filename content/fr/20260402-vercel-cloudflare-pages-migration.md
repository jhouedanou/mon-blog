---
title: "De Vercel à Cloudflare Pages : comment j'ai dit au revoir aux frais d'hébergement (et pourquoi tu dois aussi)"
image: "/images/articles/dev/01a.png"
createdAt: "2026-04-02"
description: "Retour d'expérience sur la migration de Vercel vers Cloudflare Pages : bande passante illimitée, SSR gratuit, CDN ultra-rapide — et zéro facture. Guide complet pour développeurs africains."
keywords: "Vercel, Cloudflare Pages, migration, hébergement gratuit, Nuxt 3, SSR, CDN, edge functions, bande passante illimitée, développement web, Afrique"
---

# De Vercel à Cloudflare Pages : comment j'ai dit au revoir aux frais d'hébergement (et pourquoi tu dois aussi)

Vous connaissez ce sentiment ? Vous lancez votre petit projet perso sur Vercel, tout va bien… jusqu'au moment où vous recevez votre première facture.

Moi aussi, j'ai connu ça.

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

En Afrique de l'Ouest ? Il y a des data centers à Abidjan, Dakar, Lagos. Vous vous rendez compte ?

**Latence zéro pour nos utilisateurs locaux**.

### 4. **100 000 requêtes par jour (gratuites)**

Mon blog vient d'être migré. Premier jour sur Cloudflare Pages : **339 requêtes sur les 100 000 autorisées par jour**. On est large.

Pour mettre ça en perspective : Vercel limite la bande passante, Cloudflare limite les requêtes — mais à 100 000/jour, il faut vraiment que votre site devienne viral pour atteindre cette limite.

### 5. **Configuration ridicule**

- 500 builds/mois (gratuit)
- Connexion directe à GitHub
- Auto-déploiement à chaque push
- Certificats SSL auto-renouvelés

C'est presque trop simple.

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

À la racine de votre projet :

```toml
name = "mon-blog-perso"
type = "javascript"
account_id = "YOUR_ACCOUNT_ID"
workers_dev = true
route = "*"
zone_id = "YOUR_ZONE_ID"
```

(Cloudflare vous donne ces IDs automatiquement une fois connecté)

### Step 3 : Connecter votre repo GitHub

1. Allez sur [Cloudflare Pages](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Sélectionnez votre repo GitHub
4. Build command : `npm run build`
5. Build output directory : `.output/public`

C'est tout.

### Step 4 : Pointer votre domaine

Chez votre registrar DNS (Namecheap dans mon cas) :

**Option A** (recommandée) — Utiliser les nameservers Cloudflare :
- Remplacer les nameservers par ceux de Cloudflare
- Cloudflare gère le reste

**Option B** — CNAME seul :
- Ajouter un CNAME : `www` → `subredomain.pages.dev`
- Cloudflare vous donne l'URL exacte

Vous pouvez garder vos DNS chez Namecheap et juste ajouter un CNAME. Ou vous pouvez tout basculer chez Cloudflare (c'est gratuit aussi).

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

### 3. **Le `pages_build_output_dir` dans `wrangler.toml`**

Celui-là m'a coûté du temps. Si vous utilisez `npx wrangler deploy` comme commande de déploiement, Wrangler a besoin de savoir où se trouve le résultat du build.

Avec le preset `cloudflare-pages` de Nitro (Nuxt 3), la sortie du build va dans `.output/public` — **pas dans `./dist`**.

Si vous mettez `./dist` dans votre `wrangler.toml`, le déploiement échoue avec un message cryptique qui vous demande un `main = "src/index.ts"` comme si c'était un projet Workers classique :

```
If are uploading a directory of assets, you can either:
- Specify the path to the directory of assets via the command line
- Or add the following to your "wrangler.toml" file:
  [assets]
  directory = "./dist"
```

La solution ? Vérifier que votre `wrangler.toml` pointe bien vers le bon répertoire :

```toml
pages_build_output_dir = ".output/public"
```

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
| Facilité de setup | ⭐⭐⭐ | ⭐⭐ |
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

C'était 3 jours après la migration. Mon build échouait, j'ai fouillé les logs, j'ai trouvé l'erreur en 10 minutes.

Ensuite, tout a roulé.

TTFB : ~120ms
Pages rendues : instantanées
Erreurs : zéro

Depuis cPanel vers CyberPanel, j'ai compris quelque chose : **les outils gratuits et open-source ne sont pas des compromis. C'est juste qu'on n'avait pas l'habitude de penser qu'ils pouvaient être aussi bons.**

Cloudflare Pages c'est la même chose.

---

*[Jean-Luc Houédanou](https://houedanou.com) — toujours à la chasse aux outils qui ne cassent pas la tirelire*
