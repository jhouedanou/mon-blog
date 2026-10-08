---
title: "Doing a bit of housekeeping."
image: "/images/articles/menage-image.webp"
createdAt: "2024-10-05"
id: 1
description: "Why I left WordPress, its security holes and its plugin feuds, for a blog built with Nuxt 3 and Markdown, hosted on Vercel. And what is next on the to-do list."
searchIntent: "Why migrate a WordPress blog to Nuxt Content and a Markdown architecture that is simpler to maintain."
tags: ["dev", "tech"]
summary: "This article explains my decision to drop WordPress as a blog engine because of its vulnerabilities and limitations, in favour of a more modern solution based on Nuxt 3 and Nuxt Content. I go over the migration process, the new technical architecture and the next improvements, especially the design and the Open Graph integration."
---

I had been looking for a good excuse to get rid of WordPress for a long time, at least as a blog engine. For years I was a fervent defender of this CMS, but I have to admit I feel more and more uncomfortable with it. Its simplicity and how easy it is to tweak gave me endless possibilities, but some things are just hopeless:

- there are far too many vulnerabilities;
- the future of the CMS depends more and more on the goodwill of its creators, who revoke update permissions for essential plugins depending on how well they get along with their author;
- and I will say it again: security flaws remain unpatched, nearly a year after they were discovered.

On top of that, after a year of using VueJS and Nuxt, these technologies convinced me to take the plunge. So at the start of last week I decided to start over with a slightly exotic setup:

1. an RSS feed on Feedburner, coming from my backup blog jhouedanou.blogspot.com;
2. a Nuxt 3 frontend;
3. all of it hosted on Vercel.

I then realised how experimental and patched-together this project was, and told myself I could do better.
So the new setup is as follows: everything on Nuxt (and Nuxt Content). The content of this blog will be generated from Markdown files, and the whole thing will be hosted on Vercel.

I will migrate some articles in the future.

The next steps are:

- adding Open Graph as well as a sharing option, such as ShareIt;
- finding an API to generate article images: *DALL-E* requires a bank card that cannot be found in Côte d'Ivoire, and for some unknown reason the Pexels API offers me images that have nothing to do with the content, half-naked women to illustrate [the Djamo article](/en/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret), for instance.  
   *Salvation will probably come from Unsplash*;
- tackling the question of **design**: because yes, houedanou.com has never loaded this fast, but it is frankly ugly.

See you very soon.

---
*[Jean-Luc Houédanou](https://houedanou.com) — digital mover*
