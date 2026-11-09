---
title: "Blog sans base de données : ménage terminé"
image: "/images/articles/mouff.webp"
createdAt: "2024-10-21T10:00:00Z"
id: 2
description: "Le nouveau blog est en ligne : un blog sans base de données ni plugins, en Nuxt 3 et Markdown, déployé via Git. Adieu WordPress, et enfin le plaisir d’écrire."
searchIntent: "Que change un blog sans base de données ni plugins, écrit en Markdown avec Nuxt 3 et déployé via Git, par rapport à WordPress ?"
tags: ["dev"]
---

Je viens de terminer la configuration de mon tout nouveau blog, [celui pour lequel j’ai quitté WordPress](/fr/20241005-on-fait-un-peu-le-menage) : un blog sans base de données, écrit en Markdown. Et je dois dire... ça fait du bien ! Un grand merci à Matt Mullenweg, qui m’a sans le savoir donné le coup de pouce nécessaire pour me lancer.

## Ce que change un blog sans base de données

Mais plus sérieusement, j’ai choisi d’abandonner WordPress pour Nuxt 3. Voici quelques raisons qui m’ont convaincu que c’est la stack qu’il me fallait :

- Nuxt génère le site rapidement ;
- il n’y a plus de base de données ou de plugin à gérer ;
- les commentaires sont gérés depuis Disqus ;
- les correctifs sont faciles à appliquer et à déployer, via Git ;
- mais surtout, [rédiger mes articles en Markdown](/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux), c’est juste génial. Plus besoin de batailler avec Gutenberg (même si je l’aime bien…) ou l’éditeur de WordPress.

Pour la suite de l’histoire : [le SEO perdu après la migration, et comment je l’ai récupéré](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere), et [les bots qui faisaient dépasser la limite CPU de Cloudflare Workers](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).

---
*[Jean-Luc Houédanou](https://houedanou.com) — locataire du web*
