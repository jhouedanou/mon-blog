---
title: "On fait un peu le ménage."
image: "/images/articles/menage-image.webp"
createdAt: "05-10-2024"
id: 1
description: "Comment et pourquoi j'ai migré mon blog de WordPress vers Nuxt et Nuxt Content. Découvrez les raisons de ce changement et les avantages d'une architecture basée sur des fichiers Markdown et Vercel."
keywords: "migration WordPress, Nuxt 3, Nuxt Content, blog Markdown, Vercel, sécurité WordPress, alternative WordPress, JAMstack, site statique, développement web moderne"
summary: "Cet article explique ma décision d'abandonner WordPress comme moteur de blog en raison de ses vulnérabilités et limitations, au profit d'une solution plus moderne basée sur Nuxt 3 et Nuxt Content. J'y détaille le processus de migration, la nouvelle architecture technique et les prochaines étapes d'amélioration, notamment pour le design et l'intégration d'Open Graph."

# Open Graph Meta Tags
og:
  title: "On fait un peu le ménage."
  description: "Pourquoi migrer de WordPress vers Nuxt et Nuxt Content ? Découvrez les avantages d'une architecture moderne basée sur Markdown et Vercel."
  image: "/images/articles/menage-image.webp"
  url: "/fr/on-fait-un-peu-le-ménage"
  type: "article"
  site_name: "Jean-Luc Houédanou"
  locale: "fr_FR"

# Twitter Card Meta Tags
twitter:
  card: "summary_large_image"
  title: "On fait un peu le ménage."
  description: "Migration de WordPress vers Nuxt Content : retour d'expérience, avantages techniques et perspectives d'amélioration."
  image: "/images/articles/menage-image.webp"
  creator: "@jeanluchouedanou"

# Article Meta Tags
article:
  published_time: "2024-10-05T00:00:00Z"
  modified_time: "2024-10-05T00:00:00Z"
  author: "Jean-Luc Houédanou"
  section: "Développement web"
  tag: ["migration WordPress", "Nuxt 3", "Nuxt Content", "blog Markdown", "Vercel", "sécurité WordPress", "alternative WordPress", "JAMstack", "site statique", "développement web moderne"]

# Schema.org structured data
schema:
  type: "Article"
  headline: "On fait un peu le ménage."
  description: "Comment et pourquoi j'ai migré mon blog de WordPress vers Nuxt et Nuxt Content. Découvrez les raisons de ce changement et les avantages d'une architecture basée sur des fichiers Markdown et Vercel."
  image: "/images/articles/menage-image.webp"
  datePublished: "2024-10-05"
  dateModified: "2024-10-05"
  author: "Jean-Luc Houédanou"
  publisher: "Jean-Luc Houédanou"
---

# On fait un peu le ménage.

Cela faisait longtemps que je cherchais une bonne excuse pour me débarrasser de WordPress, au moins en tant que moteur de blog. J'ai, pendant longtemps, été un fervent défenseur de ce CMS, mais je dois reconnaître que je me sens de plus en plus mal à l'aise avec lui. Sa simplicité et la facilité à le modifier m'ont offert des possibilités infinies, mais certains points sont désespérants:

- Il ya beaucoup de trop de vulnérabilités,
- l'avenir du CMS qui dépend de plus en plus du bon vouloir de ses créateurs qui retirent des autorisations de mises à jour de plugins essentiels en fonction de leur bonne relation avec leur créateur,
- Je reviens encore, sur les des failles de sécurité non patchées, et ce près d'une année après leur découverte .

Qui plus est, après un an d'utilisation de VueJS et Nuxt, ces technologies m'ont convaincu de franchir le pas. J'ai donc décidé, en début de semaine passée, de tout recommencer avec une configuration un peu exotique :

1.  \- un flux RSS sur Feedburner, provenant de mon blog backup jhouedanou.blogspot.com;
2.  \- un frontend en Nuxt 3;
3.  \- le tout hébergé sur Vercel.

Je me suis ensuite rendu compte du caractère expérimental et hétéroclite de ce projet, et je me suis dit que je pourrais faire mieux.
La nouvelle configuration est donc la suivante : Tout sur Nuxt (et Nuxt Content). Le contenu de ce blog sera généré à partir de fichiers Markdown, et le tout tournera sur hébergé sur Vercel.

Je ferais la migration de certains articles dans le futur.

Les prochaines étapes sont les suivantes :

- intégrer Open Graph ainsi qu'un moyen de partage, tel ShareIt ;
- trouver une API pour générer les images d'articles : *DALL-E* demande une carte bancaire introuvable en Côte d'Ivoire, et pour une raison inconnue, l'API de Pexels me propose des images qui n'ont rien avoir avec le contenu - par exemple, femmes à moitié nues afin d'illustrer l'article sur Djamo.  
   *Le salut viendra probablement de Unsplash*;
- m'attaquer à la question du **design** : car, oui, houedanou.com ne s'est jamais chargé aussi rapidement, mais il est franchement moche.

À très bientôt.
