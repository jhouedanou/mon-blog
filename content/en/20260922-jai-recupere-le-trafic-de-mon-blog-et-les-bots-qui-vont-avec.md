---
title: "I got my blog's traffic back (and the bots that come with it. Thanks, WordPress)"
createdAt: "2026-09-22T19:30:00Z"
image: "/images/articles/worker-cpu-depassements-septembre-2026.webp"
description: "Cloudflare wrote to tell me my site was exceeding its CPU limit more than a hundred times a day. The culprit wasn't my code, or not only: scanners still looking for a WordPress I uninstalled long ago. Here is what I found in the analytics, and what I changed."
searchIntent: "Why does a site on Cloudflare Workers exceed the free plan's 10 ms CPU limit, how to identify the bots and scanners causing it, and how to block them with WAF rules without upgrading to a paid plan?"
tags: ["development", "tutorial", "security", "cloudflare", "nuxt"]
---

# I got my blog's traffic back (and the bots that come with it. Thanks, WordPress)

This blog ran on WordPress for a long time. It has since moved to Nuxt, then to Cloudflare, and all that time hundreds of old addresses stayed in Google's index, in links from other sites and in the bookmarks of a few loyal readers. Over the past few weeks I finally cleaned up: every old URL redirects to the right article, and everything that belonged to WordPress's machinery answers 410, the response that tells Google "this page is gone, stop asking for it".

The traffic came back. And with it, something I hadn't ordered.

## The email from Cloudflare

One morning, this in my inbox:

```
Your Workers hit the free tier CPU time limit at least 100+ times in the past 24 hours
Upgrade to increase limit
```

Some context. This site is served by a Cloudflare Worker, a small program that runs in their data centres. The free plan gives it 10 milliseconds of processor time per request. Beyond that, Cloudflare kills the running execution and sends the visitor an error. A hundred times a day, then, someone was landing on a broken page.

Almost all of my pages are generated ahead of time at deployment and served as plain files, without ever waking the Worker. So it should only run for a few rare cases: the RSS feed, the sitemap, and addresses that match no file at all.

That last point is what put me on the trail.

## What the analytics say

I queried Cloudflare's analytics API for the previous 24 hours. Here is what the Worker had been through:

| Outcome of the request | Count |
|---|---|
| Served normally | 668 |
| Killed for exceeding CPU | 1,201 |
| Visitor left before the response | 61 |

Sixty-two percent of the requests reaching the Worker ended up killed. The chart at the top of this post shows the same thing day by day since 15 September: the orange is what got cut off.

Next, I looked at which addresses were being requested. I expected typos in article URLs. Instead, here are the most frequent among those that failed:

```
/.git/HEAD
/_nuxt/../.env
/ml/.env
/api/v1/keys
/wp-login.php
/blog/wp-login.php
/.env.production.bak
/privatekey.key
/dashboard%2F.env
/public_html/.env
/joomla/.env
/mysql/.env
/postgres/.env
/express/.env
/postmark/.env
/phpinfo.php
/.aws/credentials
/google-credentials.json
```

None of these files has ever existed on this site. These aren't readers getting an address wrong, they're scanners testing, on every domain they come across, the list of files that hurried developers sometimes leave lying around: the configuration with the passwords, the Git repository, the cloud access keys. And, of course, WordPress's front door, because WordPress powers nearly one site in two and it's always worth a try.

The browsers these visitors claimed to be are worth a look:

```
(empty)                                       421 requests
nginx-ssl early hints                         408
Mozilla/5.0 (compatible; MSIE 10.0; ...)      263
More Firefox 1.0 user agents strings -->>     222
```

Internet Explorer 10 has been dead for ten years. And "More Firefox 1.0 user agents strings -->>" isn't a browser: it's the text of a link on a page that lists browser identifiers. Someone copied the whole page into their tool, heading included, and the tool scans the web introducing itself that way.

Geographically, the United States, Germany, Singapore and China came far ahead of France and Côte d'Ivoire, which are nonetheless, by a wide margin, where the people who read me live.

## Why it cost so much

A file not found should cost almost nothing. Except my site is built with Nuxt, and when an address matches no article, Nuxt does what it was told to do: it renders the error page. A nice page, with the site's layout, the translations, and the three latest articles suggested to the lost reader. To produce those three suggestions, it loads the complete list of articles.

All that for a robot looking for `/postgres/.env` that will never read the answer.

Rendering that page weighed 741 KB, and on its own it blew past the 10-millisecond budget. So every scanner probe woke the Worker, which started rendering an error page, and got killed halfway through. Worse: when the Worker keeps overrunning, Cloudflare ends up killing legitimate requests too. In the analytics I found 522 errors on the home page. Real readers, penalised because robots were looking for a WordPress that isn't there any more.

## What I changed

### In the Worker: answer dumb and fast

The first thing is to stop rendering a page for someone who won't look at it. The old WordPress addresses now get a hand-written 410, 445 bytes, without going through Nuxt. Scanner probes get an even drier 404:

```
$ curl -si https://houedanou.com/.env | head -4
HTTP/2 404
content-type: text/plain; charset=utf-8
cache-control: public, max-age=3600
x-robots-tag: noindex

404 Not Found
```

Fourteen bytes, and a cache header so that Cloudflare answers the next identical probe itself. The recognised patterns fit in a few regular expressions: a segment starting with a dot (`.env`, `.git`, `.aws`), a script or backup extension (`.php`, `.bak`, `.key`, `.sql`), a static file that doesn't exist (if it did, it would have been served without waking the Worker), another CMS's directory tree.

Nuxt's error page, with its suggestions, stays in place for humans who mistype an article URL. I just removed the loading of the articles' full bodies, which was useless for displaying three titles.

Along the way, the same investigation brought down another waste: the article lists were loading the full text of all 48 posts just to display titles and dates. The reading time, meanwhile, was recomputed on every display by walking through all that text. It's now computed once at deployment and stored with the article.

### At the edge: don't wake the Worker at all

Answering fast is good, not answering is better. Cloudflare lets you, even on the free plan, create five firewall rules that apply before the request reaches the Worker. A request blocked there doesn't count towards its quota, and costs nothing.

I created three:

1. **Scanner paths**: any segment starting with a dot (except `/.well-known/`), the `.php`, `.env`, `.bak`, `.key`, `.sql` extensions and friends, anything containing `wp-`, `xmlrpc`, `phpinfo`, `phpmyadmin`. With an exception for bots verified by Cloudflare, Googlebot first among them, so they keep receiving the 410 for the old addresses and eventually forget them.
2. **Fake browsers**: empty identifier, "nginx-ssl early hints", "MSIE", and our friend "More Firefox 1.0 user agents strings".
3. **The vacuum cleaners**: the bots of SEO tools (Ahrefs, DotBot, Semrush), which crawl the site to sell reports to others, and the collectors of AI companies (CCBot, GPTBot, ClaudeBot, Bytespider, Amazonbot). Cloudflare also offers a simple "Block AI bots" switch that covers the latter, and is kept up to date on my behalf.

The rules language has no regular expressions on the free plan, so you have to stack `contains` and `ends_with` clauses. The three complete rules are in the site's repository, ready to paste: [docs/cloudflare-waf.md](https://github.com/jhouedanou/mon-blog/blob/master/docs/cloudflare-waf.md).

### In robots.txt: for the polite ones

Finally, `robots.txt` now explicitly disallows `/wp-admin/`, `/wp-login.php` and the others. It changes nothing for scanners, which don't read it, but it saves well-behaved bots from coming back every month to check whether WordPress has reappeared.

## What I take away

On a free plan, the budget isn't in euros, it's in milliseconds. And the first thing to check when you exceed it isn't your code's performance, it's who is consuming the budget. In my case, it wasn't the readers.

The redirects I set up brought back the visitors arriving through the old addresses. They also showed the scanners that the domain was answering, and that it was worth insisting. The internet has a memory, and that memory is mostly consulted by machines.

The Worker is the last line of defence, not the first. Anything that can be refused at the edge should be refused at the edge.

I'll check the counters again in a few days. If the orange in the chart hasn't dropped to zero, you'll hear about it.

---

*Chart: invocations of the mon-blog Worker from 15 to 22 September 2026, from Cloudflare's analytics API.*
