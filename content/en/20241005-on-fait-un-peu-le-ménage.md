---
title: "Doing a bit of housekeeping."
image: "/images/articles/menage-image.webp"
createdAt: "2024-10-05"
id: 1
description: "How and why I migrated my blog from WordPress to Nuxt and Nuxt Content. Discover the reasons behind this change and the advantages of an architecture based on Markdown files and Vercel."
searchIntent: "Why migrate a WordPress blog to Nuxt Content and a Markdown architecture that is simpler to maintain."
tags: ["dev", "tech"]
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

# Doing a bit of housekeeping.

I had been looking for a good excuse to get rid of WordPress for a long time, at least as a blog engine. For years I was a fervent defender of this CMS, but I have to admit I feel more and more uncomfortable with it. Its simplicity and how easy it is to tweak gave me endless possibilities, but some things are just hopeless:

- There are far too many vulnerabilities,
- the future of the CMS depends more and more on the goodwill of its creators, who revoke update permissions for essential plugins depending on how well they get along with their author,
- and I will say it again, unpatched security flaws, nearly a year after they were discovered.

On top of that, after a year of using VueJS and Nuxt, these technologies convinced me to take the plunge. So at the start of last week I decided to start over with a slightly exotic setup:

1.  \- an RSS feed on Feedburner, coming from my backup blog jhouedanou.blogspot.com;
2.  \- a Nuxt 3 frontend;
3.  \- all of it hosted on Vercel.

I then realised how experimental and patched-together this project was, and told myself I could do better.
So the new setup is as follows: everything on Nuxt (and Nuxt Content). The content of this blog will be generated from Markdown files, and the whole thing will run hosted on Vercel.

I will migrate some articles in the future.

The next steps are:

- adding Open Graph as well as a sharing option, such as ShareIt;
- finding an API to generate article images: *DALL-E* requires a bank card that cannot be found in Côte d'Ivoire, and for some unknown reason the Pexels API offers me images that have nothing to do with the content, half-naked women to illustrate the Djamo article, for instance.  
   *Salvation will probably come from Unsplash*;
- tackling the question of **design**: because yes, houedanou.com has never loaded this fast, but it is frankly ugly.

See you very soon.
---
*[Jean Luc Houédanou](https://houedanou.com) — digital mover*
