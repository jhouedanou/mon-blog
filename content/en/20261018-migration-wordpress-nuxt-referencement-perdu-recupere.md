---
title: "WordPress → Nuxt migration: I lost my SEO, here's how I got it back"
createdAt: "2026-10-18T20:45:00Z"
image: "/images/articles/migration-wordpress-nuxt-adresses.webp"
description: "Four address changes, 500 errors, \"not found\" pages served with a 200: what my migration to Nuxt cost in SEO, and how I fixed it."
searchIntent: "Why does a site lose its SEO after migrating from WordPress to Nuxt, and how do you get it back: 301 redirects, soft 404s, robots.txt, sitemap, www?"
tags: ["dev", "tutorial", "seo", "nuxt", "cloudflare"]
---

This blog left WordPress in October 2024. I wrote about it at the time in [Doing a bit of housekeeping](/en/20241005-on-fait-un-peu-le-menage). What I didn't write about is what the move cost in SEO. In fact, I only fully understood it today, going back through the site's Git history, commit by commit, and rebuilding the site as it was at different dates.

The main problem wasn't Nuxt. It was the addresses. A single post changed URL four times, and for nearly two years, the old addresses led nowhere.

## What Google knew before

Under WordPress, the blog lived on `www.houedanou.com`, with addresses shaped like `/year/month/title/`. For example:

```
https://www.houedanou.com/2022/09/cette-application-nest-pas-disponible-dans-votre-pays-la-solution/
```

Those are the addresses Google had indexed, and the ones that links from other sites pointed to.

The new site, on the other hand, has always lived on `houedanou.com`, without the `www`. That alone was an address change for the whole site. And the posts from the WordPress days weren't carried over to the new site: the oldest post online today is from September 5, 2024.

## One post, four addresses

With Nuxt Content, where a file sits in the `content/` folder becomes the page's address. So organizing your files differently means changing your addresses. I did it three times:

| Period | Address format | What changed |
|---|---|---|
| October 10 → 18, 2024 | `/2024/09/djamo-adieu-frais…` | files organized by year and month |
| October 18 → December 20, 2024 | `/fr/2024/09/djamo-adieu-frais…` | language folder added |
| December 20, 2024 → March 26, 2026 | `/fr/djamo-adieu-frais…` | year and month folders removed |
| since March 26, 2026 | `/fr/20240905-djamo-adieu-frais…` | date added at the start of the file name, for sorting |

The English version followed the same path, with one more detour: it was deleted in March 2025, then recreated in September 2026.

Without a redirect, every change creates a new page as far as Google is concerned. It discovers an address it doesn't know, the old one drops out of the index, and the links pointing to the old one become useless.

## What a visitor found at an old address

The answer depended on the period, and none of them was the right one.

**From October 2024 to March 2026: a 500 error.** The site was rendered by a server at Vercel. For an unknown address, the article page looked for a post that didn't exist and crashed (`Cannot read properties of null (reading 'title')`). Rebuilding the site as it was in December 2025, I get a 500 error on any old address… and on `/robots.txt`, which didn't exist.

That last point matters. When `robots.txt` answers with a server error, [Google stops crawling the site for 12 hours](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt){target="_blank" rel="noopener"}, then uses the last known version of the file for 30 days, before acting as if it didn't exist. It's not a disaster in the long run, but it's a bad start, at the exact moment Google was supposed to discover the new site.

**From late March to September 2026: an "Article not found" page, with a 200 code.** The site had moved to Cloudflare. Unknown addresses displayed an error message, but the server answered "200, all good". Google calls that a *soft 404*: a page that says it doesn't exist, served as if it did. Except that on March 26, 2026, every article address had just changed. So for five months, every address Google had in memory answered "Article not found", with no redirect.

**In September 2026: server errors.** The Cloudflare Worker serving the site kept going over its CPU time limit, mostly because of bots looking for sensitive files. As a knock-on effect, real readers got 522 errors, even on the home page. I told that story in [I got my blog's traffic back (and the bots that come with it)](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).

**And for the old WordPress, on `www`: a 522 error, to this day.** `www.houedanou.com` doesn't redirect to `houedanou.com`. Cloudflare receives the request and finds no server behind it. Every old link to the WordPress site lands on that error.

## The other missing signals

The addresses were the bulk of the problem. But going back through the history, I found a series of small flaws that didn't help:

- **No `canonical` tag on articles before July 2026.** That's the tag that tells Google which address is the reference one for a page.
- **Three main headings (H1) per article** at first: the logo, the page template's title and the title written in the Markdown file. The last duplicates went away in October 2026.
- **Broken share previews.** Until September 2026, the share image was a relative path to a WebP file, a format X and LinkedIn don't display.
- **A meta description that asked a question.** From July to October 2026, the site showed the `searchIntent` field (the question the post answers) in search results instead of the summary.
- **A temporary redirect on every page.** From April to September 2026, Cloudflare answered with a 307 redirect from `/a-propos` to `/a-propos/`, while the canonical tag declared the version without the trailing slash.

## What I fixed

### Redirect every old address, with a 301

This is the fix that matters most. The first nine redirects date from September 1, 2026. In [my September 22 post](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec), I wrote that every old URL redirected to the right article. That was wrong: 42 were missing.

Git history lets you find them all. For each period, you know where each file sat in `content/`, and therefore what its address was. Today, 51 old addresses redirect to the right post:

```js
export const EXACT_REDIRECTS = {
  // FR, flat URLs (December 20, 2024 → March 26, 2026)
  '/fr/restons-zen': '/fr/20241022-restons-zen',
  '/fr/ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux':
    '/fr/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux',
  // FR, /fr/YYYY/MM/<slug> (October 18 → December 20, 2024)
  '/fr/2024/10/restons-zen': '/fr/20241022-restons-zen',
  // …
}
```

The full list is in the site's repository: [redirects.js](https://github.com/jhouedanou/mon-blog/blob/master/redirects.js){target="_blank" rel="noopener"}.

Two traps:

- **The 301 code has to be spelled out.** By default, Nuxt (via Nitro) redirects with a 307 code, which means "temporary". With a temporary redirect, [Google keeps the old address in its results](https://developers.google.com/search/docs/crawling-indexing/301-redirects){target="_blank" rel="noopener"}. With a 301, it shows the new one.
- **The URL isn't always the file name.** Nuxt Content strips accents and lowercases everything: `chersCommerciaux.md` is served at `/fr/cherscommerciaux`, `on-fait-un-peu-le-ménage.md` at `/fr/on-fait-un-peu-le-menage`. A redirect to the file name leads to a 404.

### A real 404 for everything else

An address with no equivalent shouldn't be redirected to the home page: Google treats that as a *soft 404*. It should just answer 404. Since September 23, 2026, the site has been fully generated ahead of time and served as plain files. An unknown address gets the site's 404 page, with a real 404 code.

### A sitemap that tells the truth

The sitemap now lists each post only once, with its real publication or update date. Today I also removed 53 empty tag pages from it: the language switcher led from `/en/tags/africa` to `/tags/africa`, a page with no articles at all, which the site generated anyway and announced to Google.

### The HTML tags, one by one

A canonical tag on every page, the language declared correctly on the English pages, a single H1, a 120 to 160 character description for every post, 1200 × 630 pixel JPEG share images. Nothing spectacular, but all of it was missing.

## What I didn't get back

- **The posts from the WordPress days.** They aren't on the new site, so their addresses have nowhere to redirect to. To recover them, I'd need the exact list of their addresses: a WordPress export, or the 404 pages in Search Console.
- **Three posts deleted along the way**: "A scam to steal your password", "Trolls are clowns" and "How I built my site with Nuxt 3". Their addresses answer 404, and that's the right answer.
- **The `www`.** Redirecting `www.houedanou.com` to `houedanou.com` isn't set up in the site's code, but in the Cloudflare dashboard (Rules, then Redirect Rules). That's the next thing I'm doing.

## Where the site stands today

I audited the live site on October 18, 2026. The details are in the repository: [ranking audit](https://github.com/jhouedanou/mon-blog/blob/master/docs/audit-positionnement-2026-10-18.md){target="_blank" rel="noopener"}. In short:

- **What's going well.** The 344 addresses the sitemap listed before this update all answered 200. It now lists 293: minus the 53 empty tag pages, plus this post in French and in English. Every page has its canonical tag, a single H1 (with one exception, fixed today) and a description. `robots.txt` exists and points to the sitemap.
- **What's holding it back.** Lighthouse, in simulated mobile, gives 92/100 for SEO and 100/100 for accessibility, but only 59/100 for performance on the home page and 58/100 on an article. The largest visible element takes 5 to 7 seconds to show up. Part of the delay comes from third-party scripts: Google Tag Manager and the Infolinks ads block the browser for 230 to 330 milliseconds.
- **What I need to keep an eye on.** Since October 13, the site automatically sends visitors whose browser isn't set to French to the English version. Google's bots aren't redirected, so indexing isn't affected. But Google [advises against this kind of redirect](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites){target="_blank" rel="noopener"}, and prefers a simple language switcher button.
- **What I don't have yet.** The real rankings, query by query, can only be read in Search Console. Search engines block automated queries, and a tool searching from the United States says nothing about Google's results in France or Côte d'Ivoire. The next check-in will use the Search Console numbers: 404 pages, excluded pages, and how clicks evolve on the redirected posts.

## What I take away from it

With Nuxt Content, renaming a file means moving a page. Before you reorganize, rename or delete, write the redirect. And if you forgot, Git history keeps a record of every old address: you can still write the redirects months later.

I'll check in again in a few weeks, with the Search Console numbers. If the curve doesn't climb back up, you'll hear about it.

---

*Image: the successive addresses of the Djamo post, from the site's Git history.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — digital mover, redirects included*
