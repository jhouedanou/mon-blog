---
title: "Quitter WordPress pour Nuxt : le ménage"
image: "/images/articles/menage-image.webp"
createdAt: "2024-10-05"
id: 1
description: "Pourquoi quitter WordPress pour Nuxt : trop de failles, des querelles de plugins, l'envie d'écrire en Markdown. La nouvelle configuration, et la suite."
searchIntent: "Pourquoi quitter WordPress pour Nuxt : failles non corrigées, querelles autour des plugins et envie d’écrire son blog en Markdown ?"
tags: ["dev", "tech"]
summary: "Pourquoi j'ai quitté WordPress (failles, plugins, lourdeur) pour un blog en Nuxt 3 et Nuxt Content, et ce qu'il me restait à faire : le design et les aperçus Open Graph."
---

Cela faisait longtemps que je cherchais une bonne excuse pour me débarrasser de WordPress, au moins en tant que moteur de blog. Cette fois, c'est la bonne : je quitte WordPress pour Nuxt. J'ai longtemps été un fervent défenseur de ce CMS, mais je dois reconnaître que je me sens de plus en plus mal à l'aise avec lui. Sa simplicité et la facilité à le modifier m'ont offert des possibilités infinies, mais certains points sont désespérants :

- il y a beaucoup trop de vulnérabilités ;
- l'avenir du CMS dépend de plus en plus du bon vouloir de ses créateurs, qui retirent des autorisations de mises à jour de plugins essentiels en fonction de leurs relations avec leur créateur ;
- et j'y reviens encore : des failles de sécurité restent non patchées, près d'une année après leur découverte.

## De WordPress à Nuxt Content : la nouvelle configuration

Qui plus est, après un an d'utilisation de VueJS et Nuxt, ces technologies m'ont convaincu de franchir le pas. J'ai donc décidé, en début de semaine passée, de tout recommencer avec une configuration un peu exotique :

1. un flux RSS sur Feedburner, provenant de mon blog backup jhouedanou.blogspot.com ;
2. un frontend en Nuxt 3 ;
3. le tout hébergé sur Vercel.

Je me suis ensuite rendu compte du caractère expérimental et hétéroclite de ce projet, et je me suis dit que je pourrais faire mieux.
La nouvelle configuration est donc la suivante : tout sur Nuxt (et Nuxt Content). Le contenu de ce blog sera généré à partir de fichiers Markdown, et le tout sera hébergé sur Vercel.

Je migrerai certains articles plus tard.

Les prochaines étapes sont les suivantes :

- intégrer Open Graph ainsi qu'un moyen de partage, tel ShareIt ;
- trouver une API pour générer les images d'articles : *DALL-E* demande une carte bancaire introuvable en Côte d'Ivoire, et pour une raison inconnue, l'API de Pexels me propose des images qui n'ont rien à voir avec le contenu, par exemple des femmes à moitié nues pour illustrer [l'article sur Djamo](/fr/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret).  
   *Le salut viendra probablement d'Unsplash* ;
- m'attaquer à la question du **design** : car, oui, houedanou.com ne s'est jamais chargé aussi rapidement, mais il est franchement moche.

À très bientôt.

Pour la suite de l'histoire : [le nouveau blog en Markdown, sans base de données](/fr/20241021-pendaison-de-cremaillere), [la migration de Vercel vers Cloudflare Pages](/fr/20260402-vercel-cloudflare-pages-migration), puis [le SEO perdu après la migration, et comment je l'ai récupéré](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere).

---
*[Jean-Luc Houédanou](https://houedanou.com) — déménageur numérique*
