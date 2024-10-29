---
title: "Doing some cleanup"
image: "/images/articles/menage-image.webp"
createdAt: "2024-05-10"
---

# Doing some cleanup

I had been looking for a good excuse to get rid of WordPress, at least as a blog engine, for a long time. For a long time, I was a fervent defender of this CMS, but I must admit that I feel increasingly uncomfortable with it. Its simplicity and ease of modification offered me infinite possibilities, but some points are disheartening:

There are far too many vulnerabilities,
The future of the CMS depends more and more on the goodwill of its creators who withdraw update permissions for essential plugins based on their good relationship with their creator,
I come back again to the unpatched security flaws, nearly a year after their discovery.

Moreover, after a year of using VueJS and Nuxt, these technologies convinced me to take the plunge. So I decided, at the beginning of last week, to start all over again with a somewhat exotic configuration:

- an RSS feed on Feedburner, coming from my backup blog jhouedanou.blogspot.com;
- a frontend in Nuxt 3;
- all hosted on Vercel.

I then realized the experimental and heterogeneous nature of this project, and I thought I could do better.
The new configuration is therefore as follows: Everything on Nuxt (and Nuxt Content). The content of this blog will be generated from Markdown files, and everything will run hosted on Vercel.
I will migrate some articles in the future.
The next steps are as follows:

1. integrate Open Graph as well as a means of sharing, such as ShareIt;
2. find an API to generate article images: DALL-E requires a credit card unavailable in Ivory Coast, and for an unknown reason, the Pexels API offers me images that have nothing to do with the content - for example, half-naked women to illustrate the article on Djamo.
3. Salvation will probably come from Unsplash;
4. tackle the question of design: because, yes, houedanou.com has never loaded so quickly, but it's frankly ugly.

See you soon.
