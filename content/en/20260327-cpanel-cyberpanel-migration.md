---
title: "How Donald Trump pushed me to ditch cPanel for CyberPanel, and why I regret nothing"
image: "/images/articles/cpanel-cyberpanel-migration.webp"
createdAt: "2026-03-27"
description: "Migrating an entire server infrastructure from cPanel to CyberPanel: a sysadmin's field report from West Africa, between price hikes, blocked payments in the UEMOA zone and the quest for digital sovereignty."
searchIntent: "How to migrate an infrastructure from cPanel to CyberPanel and OpenLiteSpeed in West Africa."
tags: ["tutorial", "dev", "africa"]
---

# How Donald Trump pushed me to ditch cPanel for CyberPanel, and why I regret nothing

I never thought I would write this article one day. Not because the subject is trivial (migrating an entire server infrastructure is anything but trivial) but because the decision was not made in an office, in front of a nice clean benchmark. It was made under stress, in a hurry, and in a geopolitical context nobody in web hosting had seen coming.

## The context: cPanel, a long and expensive relationship

I have been living with cPanel/WHM for more than ten years. Like many sysadmins in West Africa, I grew up professionally with this interface. Creating an account, configuring a domain, managing databases, everything went through WHM. It was comfortable, familiar, and for a long time the price stayed reasonable.

Then 2019 came along. cPanel dropped its fixed licence model for a per-account system. And since then, every year, like a morbid ritual, prices go up. In 2024, the Solo licence cost **$15.99/month**. In 2025, it went to **$16**. In 2026? **$18**. The Pro licence (up to 30 accounts) jumped from **$27.25** to **$32**, a **17%** increase in one year. When you manage several dozen sites, the bill was getting hard to justify.

But honestly, cPanel's price hikes alone would probably not have made me move. You adapt, you adjust your quotes, you grumble a bit and you carry on. What changed everything is what happened in early 2026.

## When Donald Trump turned off the taps
In January 2026, the Trump administration announced a series of drastic measures aimed at restricting financial flows between the United States and West Africa. Under the pretext of fighting money laundering and terrorism financing, the American authorities imposed severe restrictions on cross-border transactions, particularly affecting the countries of the UEMOA zone (the West African Economic and Monetary Union).

**Concrete result for me**: for almost a month, it was impossible to pay for the cPanel licence. Not a cash flow problem. A payment infrastructure problem. Cards no longer went through. The alternatives (PayPal, Stripe) were unstable or unavailable from the UEMOA zone. And when your cPanel licence expires, WHM lets you know, politely at first, then less and less so.

The stress this generates when you manage the sites of several important clients... I will let you imagine. Every morning, you check that the sites are still online. Every night, you wonder whether the licence will be deactivated tomorrow and whether the sites will start throwing errors.

That is the context in which the decision was made. Not calmly. **In a hurry.**

## The migration: from WHM/cPanel to CyberPanel + OpenLiteSpeed

The VPS was already on Hostinger, a beefy server: **8 vCPU, 32 GB of RAM, 400 GB NVMe** on AlmaLinux 9. The question was not the hardware, but the control panel.

**CyberPanel won out for three reasons:**

**First, it is free.** Open source, community-driven, zero licence. In a context where paying an American vendor has become an obstacle course, that is a massive argument. No more licence renewal stress, ever.

**Second, it ships with OpenLiteSpeed natively.** No need to stack Apache + Nginx + Engintron like on cPanel. OpenLiteSpeed is built in from installation, and it is what makes all the difference in terms of performance.

**Third, the interface is modern and lightweight.** After 10 years of cPanel, you expect a shock. In reality, CyberPanel is more intuitive than you would think. Managing sites, databases, SSL certificates, it is all there.

## The speed gain: the numbers speak

This is where it gets interesting. On a WordPress site running the Newspaper theme (tagDiv), here is what we measured:

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

We are talking about a **TTFB reduction of almost 80%**. And it is not just OpenLiteSpeed on its own, it is the combination of several factors:

- **OpenLiteSpeed** handles PHP through LSAPI, far more efficient than PHP-FPM behind Apache
- **LiteSpeed Cache** (the WordPress plugin) natively exploits the server's capabilities, unlike generic cache plugins
- **OPcache** properly configured (512 MB of memory, 20,000 accelerated files)
- **Redis** for the WordPress object cache, eliminating hundreds of MySQL queries on every load
- **DNS**: we discovered that Hostinger's primary nameserver was dead and was causing 15-second delays on every resolution. Replaced with Cloudflare/Google, locked down with `chattr +i`

### The final stack

```
Client → Cloudflare CDN → OpenLiteSpeed → PHP 8.2 + OPcache → WordPress + Redis + LiteSpeed Cache → MariaDB tuné
```

Compared with the old one:

```
Client → Cloudflare CDN → Nginx (Engintron) → Apache → PHP-FPM + OPcache → WordPress + W3 Total Cache → MariaDB
```

**Fewer layers, less latency, more performance.**

## The difficulties: don't kid yourself, it stings

I would be dishonest if I told you everything went smoothly. Here is what made me sweat:

### 1. The 503 errors at startup

First contact with CyberPanel: the site shows a 503 error. The diagnosis revealed a corrupted LSAPI socket path in the vhost configuration. Instead of pointing to `/tmp/lshttpd/testa2500.sock`, the config contained a truncated character (`'d`). I had to dive into the OpenLiteSpeed configuration files to fix it by hand.

### 2. The ionCube + PHP 8.4 trap

CyberPanel happily installs `lsphp84` (PHP 8.4), but ionCube Loader is not compatible with that version. Result: a complete PHP deadlock, no page loads, and the logs show a cryptic *"No request delivery notification has been received from LSAPI application, possible dead lock"*. The fix: go back to `lsphp82`.

### 3. No WHM equivalent for multi-account management

If cPanel/WHM excels anywhere, it is in managing reseller accounts and separating privileges. CyberPanel offers a system of packages and users, but it is less granular. For someone managing dozens of client sites, you have to rethink the organisation.

### 4. Email migration

This is the most painful point. cPanel ships with a complete mail ecosystem (Dovecot, Exim, SpamAssassin, the webmails). CyberPanel uses Postfix + Dovecot, but migrating accounts, filters and rules is not automatic. **Set aside time for it.**

### 5. The lack of French-language documentation

The CyberPanel community is English-speaking. When you are in Abidjan past 9 pm debugging a socket that refuses to start, you dream of documentation in French. It does not exist. That is also part of why I am writing this post.

### 6. One-Click backups

CyberPanel's automatic backup feature greeted me with a lovely error message: *"Invalid SSH key: SSH public key must start with a valid key type"*. The generated SSH key was not in the right format. A detail, but the kind of detail that costs you an hour when you are already under pressure.

## What I learned

This forced migration taught me something important about our trade in West Africa: **our dependence on proprietary American tools is a systemic risk.**

When a policy change in Washington can prevent you from paying your server licence for a month, when the suspension of Visa/Mastercard payments in the UEMOA zone can block your business overnight, you need a plan B. And that plan B is **open source**.

CyberPanel is not perfect. OpenLiteSpeed is not perfect. But they are free, fast, and **nobody can cut off your access because your bank card no longer goes through.**

## Recommendations for those still hesitating

If you manage servers in French-speaking Africa and you are considering the migration, here is my advice:

**Do it on a test server first.** Spin up a $10/month VPS, install CyberPanel, migrate a non-critical site. Learn the differences before touching production.

**Master the command line.** CyberPanel has a web interface, but when things go wrong (and they will go wrong), SSH is where it gets fixed. If you are not comfortable with `systemctl`, `vim` and logs, train yourself first.

**Keep Cloudflare in front.** The free Cloudflare CDN in front of OpenLiteSpeed is the magic combination. Cache, SSL, DDoS protection, all free.

**Plan for two weeks minimum.** Not two days, two weeks. Between migrating the sites, DNS configuration, testing, email migration and the inevitable bugs, that is the realistic minimum.

**Document everything.** Every command, every config file change, every fix. You will thank me the next time a socket refuses to start at 9 pm on a Thursday night.

## Conclusion

Migrating from cPanel to CyberPanel was not in my plans. It was cPanel's continual price increases, combined with the impossibility of paying for a month because of the geopolitical context and payment disruptions in the UEMOA zone, that pushed me to take the plunge. The stress was real. So were the sleepless nights.

But today, with a **TTFB divided by five**, **zero licence fees**, and **regained independence** from international payment systems, I regret nothing.

If "Uncle Donald" taught me anything, it is that **digital sovereignty, in Africa, starts with the choice of your tools.**

---
*[Jean Luc Houédanou](https://houedanou.com), converted to open source once again*
