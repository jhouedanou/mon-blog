---
title: "Leaving WordPress for Nuxt: time to tidy up"
image: "/images/articles/menage-image.webp"
createdAt: "2024-10-05"
id: 1
description: "Leaving WordPress for Nuxt: too many security holes, plugin feuds and the urge to write in Markdown. My new Nuxt Content setup on Vercel, and what comes next."
searchIntent: "Why leave WordPress for Nuxt: unpatched security holes, plugin feuds and the wish to write a blog in Markdown?"
tags: ["dev", "tech"]
summary: "Why I left WordPress (security holes, plugins, bloat) for a blog built on Nuxt 3 and Nuxt Content, and what was still on my list: the design and Open Graph previews."
---

I had been looking for a good excuse to get rid of WordPress for a long time, at least as a blog engine. This time I'm doing it: I'm leaving WordPress for Nuxt. For years I was a fervent defender of this CMS, but I have to admit I feel more and more uncomfortable with it. Its simplicity and how easy it is to tweak gave me endless possibilities, but some things are just hopeless:

- there are far too many vulnerabilities;
- the future of the CMS depends more and more on the goodwill of its creators, who revoke update permissions for essential plugins depending on how well they get along with their author;
- and I'll say it again: security flaws remain unpatched, nearly a year after they were discovered.

## From WordPress to Nuxt Content: the new setup

On top of that, after a year of using VueJS and Nuxt, these technologies convinced me to take the plunge. So at the start of last week I decided to start over with a slightly exotic setup:

1. an RSS feed on Feedburner, coming from my backup blog jhouedanou.blogspot.com;
2. a Nuxt 3 frontend;
3. all of it hosted on Vercel.

I then realised how experimental and patched-together this project was, and told myself I could do better.
So the new setup is as follows: everything on Nuxt (and Nuxt Content). The content of this blog will be generated from Markdown files, and the whole thing will be hosted on Vercel.

I'll migrate some articles later on.

The next steps are:

- adding Open Graph as well as a sharing option, such as ShareIt;
- finding an API to generate article images: *DALL-E* requires a bank card you can't get in Côte d'Ivoire, and for some unknown reason the Pexels API offers me images that have nothing to do with the content, half-naked women to illustrate [the Djamo article](/en/20240905-djamo-adieu-frais-de-rejet-bonjour-transferts-faciles-et-solde-discret), for instance.  
   *Salvation will probably come from Unsplash*;
- tackling the question of **design**: because yes, houedanou.com has never loaded this fast, but it's frankly ugly.

See you very soon.

The rest of the story: [the new flat-file blog, in Markdown with no database](/en/20241021-pendaison-de-cremaillere), [the move from Vercel to Cloudflare Pages](/en/20260402-vercel-cloudflare-pages-migration), then [the SEO I lost after the migration, and how I got it back](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere).

---
*[Jean-Luc Houédanou](https://houedanou.com) — digital mover*
