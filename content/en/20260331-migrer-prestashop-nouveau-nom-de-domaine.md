---
title: "PrestaShop domain change without losing SEO"
image: "/images/articles/prestashop-migration-domaine.webp"
createdAt: "2026-03-31"
description: "PrestaShop domain change without losing SEO: database, SSL, cache, 301 redirects and Search Console, step by step, tested in production."
updatedAt: "2026-11-08T12:00:00Z"
searchIntent: "How to change the domain name of a PrestaShop store without losing SEO: SSL, 301 redirects, cache and Search Console?"
tags: ["tutorial", "dev"]
---

Changing the domain name of a PrestaShop store is an operation that makes even experienced developers sweat. Between the database, the cache, SSL and SEO redirects, there are quite a few traps. Here's a step-by-step guide to a PrestaShop domain change without losing SEO, tested in production.

## Prerequisites before changing the domain name

Before touching anything:

- SSH access to the server (or at minimum phpMyAdmin + FTP)
- A complete backup: files + database
- The new domain already configured on the DNS side (A and CNAME records pointing to the server). If it goes through Cloudflare, hand the domain over through Cloudflare's nameservers, as in option A of [my migration from Vercel to Cloudflare Pages](/en/20260402-vercel-cloudflare-pages-migration)
- An SSL certificate ready to be deployed on the new domain

> **Golden rule**: never do this during peak hours. Pick a low-traffic window.

## Step 1: Update the URLs in the database

This is the heart of the migration. PrestaShop stores the domain name in several tables. Log into phpMyAdmin or the MySQL CLI and run:

```sql
-- Main shop URL table
UPDATE ps_shop_url 
SET domain = 'nouveau-domaine.com', 
    domain_ssl = 'nouveau-domaine.com' 
WHERE id_shop = 1;

-- Global configuration
UPDATE ps_configuration 
SET value = 'nouveau-domaine.com' 
WHERE name = 'PS_SHOP_DOMAIN';

UPDATE ps_configuration 
SET value = 'nouveau-domaine.com' 
WHERE name = 'PS_SHOP_DOMAIN_SSL';
```

⚠️ Adapt the `ps_` prefix if you customised it at installation.

### Check for traces of the old domain

The old domain is sometimes referenced elsewhere in the configuration:

```sql
-- Find every occurrence
SELECT name, value FROM ps_configuration 
WHERE value LIKE '%ancien-domaine.com%';
```

Update:

- any other key this query turns up;
- third-party module URLs (payment, analytics, etc.).

## Step 2: Configuration files and `.htaccess`

Good news: the domain name isn't stored in PrestaShop's configuration files. In 1.7 and 8.x, `app/config/parameters.php` holds the database credentials, the security keys and a few technical settings, but not the domain (see the [official parameters template](https://github.com/PrestaShop/PrestaShop/blob/8.2.x/app/config/parameters.yml.dist)). In 1.6, `config/settings.inc.php` plays the same role. You only need to touch these files if the database is also moving to a new server or new credentials.

So the domain is set in the database (step 1), or in the back office if it's still reachable: **Shop Parameters > Traffic & SEO**, in the shop URL section, fields "Shop domain" and "SSL domain" ([PrestaShop 8 documentation](https://docs.prestashop-project.org/v.8-documentation/user-guide/configuring-shop/shop-parameters/traffic/seo-and-urls)).

The file to check is the `.htaccess` at the root of the store: look for the old domain in it and replace it if it shows up.

```bash
grep -n "ancien-domaine.com" .htaccess
```

## Step 3: SSL certificate

If you use Let's Encrypt, generate a new certificate for the domain:

```bash
# With Certbot (Apache)
sudo certbot --apache -d nouveau-domaine.com -d www.nouveau-domaine.com

# With Certbot (Nginx / OpenLiteSpeed)
sudo certbot certonly --webroot -w /var/www/nouveau-domaine -d nouveau-domaine.com
```

On CyberPanel ([why I moved from cPanel to CyberPanel](/en/20260327-cpanel-cyberpanel-migration)), it's even simpler: **Websites > List Websites > SSL > Issue SSL**.

Then enable SSL in the PrestaShop back office:
**Shop Parameters > General > Enable SSL** and **Enable SSL on all pages**.

## Step 4: Purge the cache

PrestaShop is very aggressive with caching. If you don't clear it, you'll go round in circles.

```bash
# Delete the application cache
rm -rf var/cache/prod/* var/cache/dev/*
```

On LiteSpeed or OpenLiteSpeed, don't count on `lswsctrl` to clear that cache: it only starts, stops or reloads the server ([OpenLiteSpeed source code](https://github.com/litespeedtech/openlitespeed/blob/master/dist/bin/lswsctrl){target="_blank" rel="noopener"}). If the store uses the LiteSpeed Cache module, clear its cache from the PrestaShop back office ([LiteSpeed Cache for PrestaShop documentation](https://docs.litespeedtech.com/lscache/lscps/){target="_blank" rel="noopener"}).

You can also go through the back office: **Advanced Parameters > Performance > Clear cache**.

## Step 5: 301 redirects, so you don't lose your SEO

This is the most important step for SEO. Without 301 redirects, you lose all the rankings you have built up. This blog learned that the hard way: I explain what addresses without redirects cost it in [Lost SEO after migration: how I got it back](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere).

On the old domain, place this `.htaccess` at the root:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?ancien-domaine\.com$ [NC]
RewriteRule ^(.*)$ https://nouveau-domaine.com/$1 [R=301,L]
```

If you're on Nginx:

```nginx
server {
    server_name ancien-domaine.com www.ancien-domaine.com;
    return 301 https://nouveau-domaine.com$request_uri;
}
```

If you're on OpenLiteSpeed, add a rewrite rule in the vhost or through CyberPanel.

> **Keep these redirects active for at least a year.** Google takes time to digest a domain change, and advises keeping redirects "for as long as possible, generally at least 1 year" ([Google Search Central](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes){target="_blank" rel="noopener"}).

## Step 6: Update third-party services

This is the step everyone forgets. Go through:

- **Google Search Console**: add the new domain as a property and use the *Change of Address* tool once the 301 redirect is in place; you must own both the old and the new property ([Search Console Help](https://support.google.com/webmasters/answer/9370220?hl=en){target="_blank" rel="noopener"})
- **Google Analytics / Matomo**: update the site URL
- **Google Merchant Center**: if you do Shopping
- **Payment modules**: update the callback/webhook URLs (PayPal, Stripe, CinetPay, etc.). Without this, payment confirmations will fail silently
- **Sitemap**: regenerate it from the back office or your SEO module, then submit it in Search Console
- **Social networks and directories**: update your links everywhere the old domain appears

## Step 7: Post-migration checks

Before considering the migration done, check that:

- ✅ The home page loads correctly over HTTPS
- ✅ The back office is reachable on the new domain
- ✅ The order process works end to end (add to cart → payment → confirmation)
- ✅ Transactional emails show the right domain
- ✅ The 301 redirects work from the old domain
- ✅ The sitemap.xml is reachable and contains the right URLs
- ✅ Product images display correctly (no hardcoded URLs to the old domain in CMS content)

## Bonus step: Multistore

If your PrestaShop is set up as a multistore, check **Advanced Parameters > Multistore** to make sure the old domain isn't still listed as an active shop. It's a classic trap that causes redirect loops.

## "But who still uses PrestaShop in 2026?"

Good question: **far more people than you'd think**.

In French-speaking Africa, PrestaShop remains a massively deployed solution. Not out of nostalgia, out of pragmatism. It's a free, open source e-commerce CMS that runs on any shared hosting plan at 35,000 CFA francs a month. No need for a Shopify subscription in dollars whose payment can be blocked overnight by a geopolitical decision. No need to depend on an American SaaS platform that can unilaterally decide to close the accounts of an entire region.

Yes, I have a bone to pick with the SaaS model that has invaded the web these past few years. But I digress... PrestaShop is **your** server, **your** database, **your** files. Nobody can cut off access to your own store.

In France and Europe, PrestaShop still powers tens of thousands of stores. SMEs, artisans, niche brands that have neither the budget nor the desire to migrate to a solution that charges them a percentage on every sale.

So yes, the back office interface smells of the 2010s. Yes, the documentation is sometimes a maze. Yes, we'd rather some modules were free instead of €80 on the marketplace. And that templating system is anything but easy to get to grips with.

But in 2026, when digital sovereignty has become a daily necessity, having an e-commerce tool you control from end to end is a luxury many modern solutions can't offer.

PrestaShop isn't dead, it's just quiet.

*Updated October 8, 2026: step 2 has been corrected. The domain name is not stored in `parameters.php` or `settings.inc.php`, contrary to what the first version said, and the `PS_COOKIE_DOMAIN` key mentioned in step 1 does not exist in PrestaShop ([source code](https://github.com/PrestaShop/PrestaShop)).*

*Correction, November 8, 2026: in step 4, on OpenLiteSpeed, `lswsctrl` has no `purgeall` command; the right method is given below the command. In step 5, the redirect duration now follows Google's recommendation, at least a year (instead of "at least 6 to 12 months"), and the Search Console Change of Address tool is sourced.*

---
*[Jean-Luc Houédanou](https://houedanou.com), proud member of the e-commerce old guard*
