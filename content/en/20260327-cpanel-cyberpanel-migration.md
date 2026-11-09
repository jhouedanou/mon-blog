---
title: "cPanel to CyberPanel, as UEMOA cards failed"
image: "/images/articles/cpanel-cyberpanel-migration.webp"
createdAt: "2026-03-27"
description: "Price hikes, UEMOA bank cards blocked: how I migrated from cPanel to CyberPanel and OpenLiteSpeed, the traps along the way, and a TTFB divided by five."
updatedAt: "2026-10-08T12:00:00Z"
searchIntent: "How to migrate an infrastructure from cPanel to CyberPanel and OpenLiteSpeed in West Africa."
tags: ["tutorial", "dev", "africa"]
---

I never thought I'd write this article. Not because the subject is trivial (migrating an entire server infrastructure from cPanel to CyberPanel is anything but trivial) but because the decision wasn't made in an office, in front of a nice clean benchmark. It was made under stress, in a hurry, and in a geopolitical context nobody in web hosting had seen coming.

## The context: cPanel, a long and expensive relationship

I've been living with cPanel/WHM for more than ten years. Like many sysadmins in West Africa, I grew up professionally with this interface. Creating an account, configuring a domain, managing databases, everything went through WHM. It was comfortable, familiar, and for a long time the price stayed reasonable.

Then 2019 came along. cPanel dropped its fixed licence model for a per-account system. And since then, every year, like a morbid ritual, prices go up. At partner rates (what cPanel charges hosting companies and licence resellers), the Solo licence was **$16/month** in 2025. In 2026? **$18**. The Pro licence (up to 30 accounts) jumped from **$27.25** to **$32**, a **17%** increase in one year ([2025-2026 partner price list, detailed by VPSBG](https://www.vpsbg.eu/blog/cpanel-price-increase-2026){target="_blank" rel="noopener"}). And list prices are worse: Solo at **$29.99**, Pro at **$53.99** ([official cPanel pricing](https://cpanel.net/pricing/){target="_blank" rel="noopener"}), up from $26.99 and $46.99 in 2025. When you manage several dozen sites, that bill gets hard to justify.

But honestly, cPanel's price hikes alone probably wouldn't have made me move. You adapt, you adjust your quotes, you grumble a bit and you carry on. What changed everything is what happened in early 2026.

## When the taps were turned off: UEMOA bank cards blocked

In early January 2026, online payments with bank cards issued in the UEMOA zone (the West African Economic and Monetary Union) started failing. From January 2, Air Côte d'Ivoire and other airlines in the region were telling customers that online card sales were "temporarily suspended" ([Barid TV, January 16, 2026](https://barid.tv/2026/01/16/uemoa-le-bras-de-fer-des-paiements-en-ligne-gim-switch-defie-visa-et-mastercard/){target="_blank" rel="noopener"}). The cause: not a Trump administration measure, as I first wrote, but Decision No. 31 of GIM-UEMOA, the regional interbank group, approved by the BCEAO (the regional central bank). It requires every transaction made with a card issued in the zone, even when it goes through Visa or Mastercard, to also be routed and cleared through the regional GIM-Switch platform. Visa and Mastercard didn't comply in time. On January 29, they were given an ultimatum: comply by March 31, 2026 ([Financial Afrik, January 29, 2026](https://www.financialafrik.com/2026/01/29/uemoa-les-cartes-visa-et-mastercard-ont-90-jours-pour-se-conformer/){target="_blank" rel="noopener"}). A tug of war over payment sovereignty, with our bank cards stuck in the middle.

**Concrete result for me**: for almost a month, it was impossible to pay for the cPanel licence. Not a cash flow problem, a payment infrastructure problem: cards just stopped going through. The alternatives (PayPal, Stripe) were unstable or unavailable from the UEMOA zone. And when your cPanel licence expires, WHM lets you know, politely at first, then less and less so.

The stress this generates when you manage the sites of several important clients... I'll let you imagine. Every morning, you check that the sites are still online. Every night, you wonder whether the licence will be deactivated tomorrow and whether the sites will start throwing errors.

That's the context in which the decision was made: **in a hurry**.

## The migration: from WHM/cPanel to CyberPanel + OpenLiteSpeed

The VPS was already on Hostinger, a beefy server: **8 vCPU, 32 GB of RAM, 400 GB NVMe** on AlmaLinux 9. The question wasn't the hardware, it was the control panel.

**CyberPanel won out for three reasons:**

**First, it's free.** Open source, community-driven, zero licence. When paying an American vendor has become an obstacle course, that's a huge argument. No more licence renewal stress, ever.

**Second, it ships with OpenLiteSpeed natively.** No need to stack Apache + Nginx + Engintron like on cPanel. OpenLiteSpeed is built in from installation, and it's what makes the difference on performance.

**Third, the interface is modern and lightweight.** After 10 years of cPanel, you expect a shock. In reality, CyberPanel is more intuitive than you'd think. Managing sites, databases, SSL certificates, it's all there. (Issuing a certificate takes a few clicks; I give the path in [my guide to changing a PrestaShop store's domain name](/en/20260331-migrer-prestashop-nouveau-nom-de-domaine).)

## The speed gain: the numbers speak

On a WordPress site running the Newspaper theme (tagDiv), here's what we measured:

### Before (cPanel + Apache + Engintron/Nginx)

| Metric | Value |
|---|---|
| TTFB (Time To First Byte) | ~820 ms |
| Total load time | 2-3 seconds |
| WordPress admin | Extremely slow, sometimes 15 seconds per page |

### After (CyberPanel + OpenLiteSpeed + optimisations)

| Metric | Value |
|---|---|
| TTFB | ~170 ms |
| Total load time | < 1 second |
| WordPress admin | Smooth, ~600 ms |

That's a **TTFB reduction of almost 80%**. And it isn't just OpenLiteSpeed: it's the combination of several factors:

- **OpenLiteSpeed** handles PHP through LSAPI, far more efficient than PHP-FPM behind Apache
- **LiteSpeed Cache** (the WordPress plugin) natively exploits the server's capabilities, unlike generic cache plugins
- **OPcache** properly configured (512 MB of memory, 20,000 accelerated files)
- **Redis** for the WordPress object cache, eliminating hundreds of MySQL queries on every load (as long as you cap it, otherwise [Redis ends up filling the WordPress VPS's RAM](/en/20261031-redis-plein-vps-wordpress-vider-limiter))
- **DNS**: we discovered that Hostinger's primary nameserver was dead and was causing 15-second delays on every resolution. Replaced with Cloudflare/Google, locked down with `chattr +i`

### The final stack

```
Client → Cloudflare CDN → OpenLiteSpeed → PHP 8.2 + OPcache → WordPress + Redis + LiteSpeed Cache → tuned MariaDB
```

Compared with the old one:

```
Client → Cloudflare CDN → Nginx (Engintron) → Apache → PHP-FPM + OPcache → WordPress + W3 Total Cache → MariaDB
```

**Fewer layers, so less latency.**

## The difficulties: don't kid yourself, it stings

I'd be lying if I told you everything went smoothly. Here's what made me sweat:

### 1. The 503 errors at startup

First contact with CyberPanel: the site shows a 503 error. The diagnosis revealed a corrupted LSAPI socket path in the vhost configuration. Instead of pointing to `/tmp/lshttpd/testa2500.sock`, the config contained a truncated character (`'d`). I had to open the OpenLiteSpeed configuration files and fix it by hand.

### 2. The ionCube + PHP 8.4 trap

CyberPanel happily installs `lsphp84` (PHP 8.4), but ionCube Loader isn't compatible with that version. Result: a complete PHP deadlock, no page loads, and the logs show a cryptic *"No request delivery notification has been received from LSAPI application, possible dead lock"*. The fix: go back to `lsphp82`. (To update these `lsphp` packages on CyberPanel, the steps are in [my post on updating PHP against PHP2Shell](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge).)

### 3. No WHM equivalent for multi-account management

If cPanel/WHM excels anywhere, it's in managing reseller accounts and separating privileges. CyberPanel offers a system of packages and users, but it's less granular. For someone managing dozens of client sites, you have to rethink the organisation.

### 4. Email migration

This is the most painful point. cPanel ships with a complete mail ecosystem (Dovecot, Exim, SpamAssassin, the webmails). CyberPanel uses Postfix + Dovecot, but migrating accounts, filters and rules isn't automatic. **Set aside time for it.**

### 5. The lack of French-language documentation

The CyberPanel community is English-speaking. When you're in Abidjan past 9 pm debugging a socket that refuses to start, you dream of documentation in French. It doesn't exist. That's also part of why I'm writing this post.

### 6. One-Click backups

CyberPanel's automatic backup feature greeted me with a lovely error message: *"Invalid SSH key: SSH public key must start with a valid key type"*. The generated SSH key wasn't in the right format. A detail, but the kind of detail that costs you an hour when you're already under pressure.

## What I learned

This forced migration taught me something important about our trade in West Africa: **our dependence on proprietary American tools is a systemic risk.**

When a tug of war between a regional regulator and two American card networks can prevent you from paying your server licence for a month, when the suspension of Visa/Mastercard payments in the UEMOA zone can block your business overnight, you need a plan B. And that plan B is **open source**.

CyberPanel isn't perfect. OpenLiteSpeed isn't perfect. But they are free, fast, and **nobody can cut off your access because your bank card no longer goes through.**

## Recommendations for those still hesitating

If you manage servers in French-speaking Africa and you're considering the migration, here's my advice:

**Do it on a test server first.** Spin up a $10/month VPS, install CyberPanel, migrate a non-critical site. Learn the differences before touching production.

**Master the command line.** CyberPanel has a web interface, but when things go wrong (and they will go wrong), SSH is where it gets fixed. If you're not comfortable with `systemctl`, `vim` and logs, train yourself first. And the logs are no longer where cPanel kept them: I give both locations in [my post on a hacked WordPress site](/en/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre).

**Keep Cloudflare in front.** The free Cloudflare CDN in front of OpenLiteSpeed is the right combination: cache, SSL and DDoS protection, all for free. (And for a static site or a Nuxt project, Cloudflare can even replace the host: that's what I did when [migrating this blog from Vercel to Cloudflare Pages](/en/20260402-vercel-cloudflare-pages-migration).)

**Plan for two weeks minimum.** Not two days, two weeks. Between migrating the sites, DNS configuration, testing, email migration and the inevitable bugs, that's the realistic minimum.

**Document everything.** Every command, every config file change, every fix. You'll thank me the next time a socket refuses to start at 9 pm on a Thursday night.

## Conclusion

Migrating from cPanel to CyberPanel wasn't in my plans. It was cPanel's continual price increases, combined with the impossibility of paying for a month because of the geopolitical context and payment blockages in the UEMOA zone, that pushed me to take the plunge. The stress was real. So were the sleepless nights.

But today, with a **TTFB divided by five**, **zero licence fees**, and **regained independence** from international payment systems, I regret nothing.

"Uncle Donald" turned out to have nothing to do with it. But if this crisis taught me anything, it's that **digital sovereignty, in Africa, starts with the choice of your tools.**

*Updated October 8, 2026: ionCube now publishes loaders for PHP 8.4 and 8.5 ([official loaders page](https://www.ioncube.com/loaders.php)). Before downgrading to `lsphp82`, check that the installed loader version matches your PHP version. Another reason not to linger on PHP 8.2: it stops receiving security fixes after December 31, 2026 ([official PHP schedule](https://www.php.net/supported-versions.php)). Correction, same day: the first version of this post blamed the payment blockage on a January 2026 Trump administration measure. It actually came from GIM-UEMOA's Decision No. 31 (see above). The 2025 and 2026 prices are now labelled as cPanel partner rates, with list prices alongside; the $15.99 figure given for 2024 matched no cPanel price list and has been removed.*

---
*[Jean-Luc Houédanou](https://houedanou.com), converted to open source once again*
