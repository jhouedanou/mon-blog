---
title: "On fait un peu le ménage."
image: "/images/articles/menage-image.webp"
createdAt: "2024-10-05"
id: 1
description: "Pourquoi j'ai quitté WordPress, ses failles et ses querelles de plugins, pour un blog en Nuxt 3 et Markdown hébergé sur Vercel. Et la suite du chantier."
searchIntent: "Pourquoi migrer un blog WordPress vers Nuxt Content et une architecture Markdown plus simple à maintenir."
tags: ["dev", "tech"]
summary: "Cet article explique ma décision d'abandonner WordPress comme moteur de blog en raison de ses vulnérabilités et limitations, au profit d'une solution plus moderne basée sur Nuxt 3 et Nuxt Content. J'y détaille le processus de migration, la nouvelle architecture technique et les prochaines étapes d'amélioration, notamment pour le design et l'intégration d'Open Graph."
---

Cela faisait longtemps que je cherchais une bonne excuse pour me débarrasser de WordPress, au moins en tant que moteur de blog. J'ai, pendant longtemps, été un fervent défenseur de ce CMS, mais je dois reconnaître que je me sens de plus en plus mal à l'aise avec lui. Sa simplicité et la facilité à le modifier m'ont offert des possibilités infinies, mais certains points sont désespérants :

- il y a beaucoup trop de vulnérabilités ;
- l'avenir du CMS dépend de plus en plus du bon vouloir de ses créateurs, qui retirent des autorisations de mises à jour de plugins essentiels en fonction de leurs relations avec leur créateur ;
- et j'y reviens encore : des failles de sécurité restent non patchées, près d'une année après leur découverte.

Qui plus est, après un an d'utilisation de VueJS et Nuxt, ces technologies m'ont convaincu de franchir le pas. J'ai donc décidé, en début de semaine passée, de tout recommencer avec une configuration un peu exotique :

1. un flux RSS sur Feedburner, provenant de mon blog backup jhouedanou.blogspot.com ;
2. un frontend en Nuxt 3 ;
3. le tout hébergé sur Vercel.

Je me suis ensuite rendu compte du caractère expérimental et hétéroclite de ce projet, et je me suis dit que je pourrais faire mieux.
La nouvelle configuration est donc la suivante : tout sur Nuxt (et Nuxt Content). Le contenu de ce blog sera généré à partir de fichiers Markdown, et le tout sera hébergé sur Vercel.

Je ferai la migration de certains articles dans le futur.

Les prochaines étapes sont les suivantes :

- intégrer Open Graph ainsi qu'un moyen de partage, tel ShareIt ;
- trouver une API pour générer les images d'articles : *DALL-E* demande une carte bancaire introuvable en Côte d'Ivoire, et pour une raison inconnue, l'API de Pexels me propose des images qui n'ont rien à voir avec le contenu, par exemple des femmes à moitié nues pour illustrer [l'article sur Djamo](/fr/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret).  
   *Le salut viendra probablement d'Unsplash* ;
- m'attaquer à la question du **design** : car, oui, houedanou.com ne s'est jamais chargé aussi rapidement, mais il est franchement moche.

À très bientôt.

---
*[Jean-Luc Houédanou](https://houedanou.com) — déménageur numérique*
