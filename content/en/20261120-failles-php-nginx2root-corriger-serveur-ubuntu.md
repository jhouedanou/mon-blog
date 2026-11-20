---
title: "PHP flaws and nginx2root: patch your Ubuntu server"
createdAt: "2026-11-20T18:00:00Z"
image: "/images/articles/pexels-brett-sayles-2881229.webp"
description: "Two critical flaws in PHP sessions, nginx2root in nginx: the commands to paste over SSH to patch a server running Ubuntu 22.04 or newer."
searchIntent: "How do I fix the PHP session flaws (CVE-2026-115560, CVE-2026-126714) and nginx2root (CVE-2026-123007) over SSH on an Ubuntu server?"
tags: ["tutorial", "security", "php", "nginx", "linux"]
---

Two new critical flaws in PHP, one in nginx, and a Linux kernel to keep up to date: you need to move nginx to 1.31.9 (or install Ubuntu's patched package) and PHP to 8.2.36, 8.3.37, 8.4.28 or 8.5.13, turn off `session.upload_progress`, then reboot the server. Three blocks of commands to paste over SSH, ten minutes per server. And if you feel like changing careers, now is the time: after this, there will be another update.

A month ago, I spent my evening patching [PHP2Shell](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge). I thought I'd have some peace until Christmas. I lasted thirty days.

**The short version:**

- **PHP**: two flaws in sessions, rated 9.2 out of 10, fixed on November 19, 2026 in PHP 8.5.13, 8.4.28, 8.3.37 and 8.2.36.
- **nginx**: a memory corruption in HTTP/2, the first link in the nginx2root chain, fixed on November 18 in nginx 1.31.9 and 1.30.7.
- **No known attack** so far, for either one. This is the right time to patch: before.
- **The commands** in this post are for Ubuntu 22.04 or newer.

## What's broken this time

### The two PHP flaws

Both affect sessions, the mechanism that remembers a visitor is logged in. Both are rated 9.2 out of 10 and, under certain conditions, let an attacker run code on the server.

- **[CVE-2026-115560](https://github.com/php/php-src/security/advisories/GHSA-658j-r8rw-q6mx){target="_blank" rel="noopener"}**: PHP can write a session in three formats. If a session is written in one format and read back in another, an attacker can slip crafted data into it. The way in is `session.upload_progress`, the option that tracks the progress of file uploads. The faulty code dates back to PHP 5.4, released in 2012.
- **[CVE-2026-126714](https://github.com/php/php-src/security/advisories/GHSA-fm2m-fjf5-v3cp){target="_blank" rel="noopener"}**: if the writing of a session file is interrupted at the wrong moment, the file holds a mix of two sessions, and PHP reads it back as if it were valid. That code dates back to PHP 4.1, released in 2001. It is old enough to vote, drive and sign a lease.

Let's be honest: these flaws are harder to exploit than PHP2Shell. The [PHP project](https://www.php.net/archive/2026.php#2026-11-18-1){target="_blank" rel="noopener"} says the critical flaws in this release need a specific or uncommon configuration, and the application has to contain code the attacker can reuse. Nobody is reporting attacks for now.

"Two flaws" is also a polite way of counting. According to the [PHP changelog](https://www.php.net/ChangeLog-8.php){target="_blank" rel="noopener"}, the November 19 release fixes 18 flaws in total. I'm showing you the two most serious. The other sixteen come with the same update, so you won't have to get to know them.

### The nginx flaw: nginx2root

**CVE-2026-123007** is a memory corruption in nginx's HTTP/2 module. [nginx](https://nginx.org/en/security_advisories.html){target="_blank" rel="noopener"} rates it "major", and it affects every version from 1.9.5 to 1.31.8. Version 1.9.5 dates from 2015: eleven years of nginx are affected. The starting condition is that HTTP/2 is enabled, which is common on HTTPS sites.

The researchers at [Xint](https://xint.io/blog/nginx2root-remote-code-execution){target="_blank" rel="noopener"} chained five nginx flaws together, this one included, under the name nginx2root. To become root, meaning administrator of the machine, their chain ends with a flaw in the Linux kernel. Hence the third block in this post.

Here again, no known attack. According to [StepSecurity](https://www.stepsecurity.io/blog/cve-2026-123007-nginx-http2-rce){target="_blank" rel="noopener"}, the attack means sending about 119 GiB of data in under an hour to a server with little load. The first bot that comes along can't do that. The second one will.

And as with PHP, "one flaw" is a summary: nginx 1.31.9 fixes ten.

| Software | Main flaw | Fixed versions | Date |
|---|---|---|---|
| PHP | CVE-2026-115560 and CVE-2026-126714 (sessions) | 8.5.13, 8.4.28, 8.3.37, 8.2.36 | November 19, 2026 |
| nginx | CVE-2026-123007 (HTTP/2, nginx2root) | 1.31.9 (mainline), 1.30.7 (stable) | November 18, 2026 |

According to the [Netcraft survey for September 2026](https://www.netcraft.com/blog/september-2026-web-server-survey){target="_blank" rel="noopener"}, nginx runs on 44% of web-facing computers. So a lot of people are affected. Good news for those still unsure about changing careers: the competition is about to thin out.

## Before you start

The three blocks are for **Ubuntu 22.04 or newer**. Check first:

```bash
lsb_release -ds
```

Then switch to root and refresh the package list:

```bash
sudo -i
```

```bash
apt-get update
```

Last, check where your nginx comes from. The answer decides whether you run block 1 or skip it:

```bash
apt-cache policy nginx | grep -E "ondrej|nginx.org|ubuntu.com"
```

`ondrej` or `nginx.org`: run block 1. Only `ubuntu.com`: skip it.

If you manage several servers, the method from the PHP2Shell post for [running the same command across a whole fleet](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge) works here too.

## Block 1: update nginx

This block is for servers whose nginx came from Ondřej Surý's repository (`ondrej/nginx`), such as Laravel Forge servers. If your nginx comes from Ubuntu's packages, skip this block: block 3 will update it, since Ubuntu has published the fixes ([USN-9159-1](https://ubuntu.com/security/notices/USN-9159-1){target="_blank" rel="noopener"} and [USN-9182-1](https://ubuntu.com/security/notices/USN-9182-1){target="_blank" rel="noopener"}).

```bash
cp -a /etc/nginx /root/nginx-backup-$(date +%F)
rm -f /etc/apt/sources.list.d/ondrej-ubuntu-nginx-*
grep -rqs "nginx.org/packages" /etc/apt/sources.list /etc/apt/sources.list.d/ || {
  curl -fsSL https://nginx.org/keys/nginx_signing.key | gpg --dearmor > /usr/share/keyrings/nginx-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] https://nginx.org/packages/mainline/ubuntu $(lsb_release -cs) nginx" > /etc/apt/sources.list.d/nginx.list
}
printf "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" > /etc/apt/preferences.d/99nginx
apt-get update
apt-get install -y --only-upgrade -o Dpkg::Options::=--force-confold nginx
grep -qs "server_name  *localhost" /etc/nginx/conf.d/default.conf && mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
nginx -t && systemctl restart nginx
nginx -v; systemctl is-active nginx
```

Expected: `test is successful`, `nginx/1.31.9`, `active`.

Run this block at a quiet hour: switching repositories replaces the nginx package, and if the configuration test fails, your sites stay down while you fix it.

What the block does, in order:

1. **It backs up** `/etc/nginx` to `/root`. If something breaks, the previous configuration is there.
2. **It removes the `ondrej/nginx` source.** That repository no longer exists. Ondřej Surý announced in January [that he would stop providing nginx](https://codeberg.org/oerdnj/deb.sury.org/issues/67){target="_blank" rel="noopener"}, because he no longer found "joy or satisfaction" in it, and he closed the matter in April. Now there's someone who changed careers at the right time.
3. **It adds the official nginx repository**, mainline branch, with its signing key, and gives it priority over Ubuntu's packages. This is the method described in [the nginx documentation](https://nginx.org/en/linux_packages.html){target="_blank" rel="noopener"}.
4. **It updates nginx** while keeping your configuration files (`--force-confold`).
5. **It disables the example site** that the official package installs (`default.conf`, with `server_name localhost`), so it doesn't answer in place of one of your sites.
6. **It tests the configuration, then restarts nginx.** A full restart, not a plain reload: a reload keeps the old program in memory.

**If `nginx -t` fails** and points at a `load_module` line, that's normal: the modules shipped by the old repository (brotli, geoip, image-filter, xslt) don't exist in the official package. Open the file it names, comment the line out with a `#` (or delete the broken link in `/etc/nginx/modules-enabled/`), then run `nginx -t && systemctl restart nginx` again. If your configuration uses brotli, comment out the `brotli` directives too.

## Block 2: update PHP

```bash
apt-get install -y --only-upgrade -o Dpkg::Options::=--force-confold $(dpkg -l | awk '/^ii/ && $2 ~ /^php8\.[0-9]/ {print $2}')
sed -i 's/^;\?\s*session.upload_progress.enabled.*/session.upload_progress.enabled = Off/' /etc/php/*/fpm/php.ini
for s in $(systemctl list-units --type=service --no-legend 'php*-fpm*' | awk '{print $1}'); do systemctl restart $s; done
for v in /usr/bin/php8.*; do $v -v | head -1; done
grep -H "upload_progress.enabled" /etc/php/*/fpm/php.ini
```

Expected: 8.2.36, 8.3.37, 8.4.28 or 8.5.13, and `= Off` everywhere.

What the block does:

1. **It updates every installed PHP 8 package**, whatever the version, without installing new ones.
2. **It turns off `session.upload_progress`** in the `php.ini` of each PHP-FPM. It's the way in for the first flaw, and the recommended protection for the second. The PHP fix already turns it off by default, but an explicit setting already on your server still wins: you may as well write it yourself.
3. **It restarts each PHP-FPM**, then prints the versions and the setting.

Two notes.

**The 8.x.y numbers are those of the `ondrej/php` repository**, still active for Ubuntu 22.04 and 24.04. If your PHP comes from Ubuntu's packages, the number will barely change (for example `8.3.6-0ubuntu0.24.04.14` on Ubuntu 24.04): Ubuntu fixes without changing the version. As of today, [Ubuntu has fixed CVE-2026-126714](https://ubuntu.com/security/CVE-2026-126714){target="_blank" rel="noopener"} but [not yet CVE-2026-115560](https://ubuntu.com/security/CVE-2026-115560){target="_blank" rel="noopener"}. In that case, the `sed` line is what protects you. Don't skip it.

**Check that no site turns the option back on** in its own configuration:

```bash
grep -rn "upload_progress.enabled" /etc/php/*/fpm/pool.d/ /etc/php/*/fpm/conf.d/
find /home /var/www -name .user.ini -exec grep -Hn upload_progress {} + 2>/dev/null
```

No output: nothing to do. Otherwise, set the value to `Off` in the file it names and restart PHP-FPM. The block only touches PHP-FPM: with Apache and mod_php, make the same change in `/etc/php/*/apache2/php.ini`, then restart Apache. Who loses out? Only sites that show a file upload progress bar handled by PHP. Most handle it in the browser and won't see any difference.

## Block 3: update Ubuntu and the kernel

```bash
uname -r
apt-get upgrade -y --with-new-pkgs -o Dpkg::Options::=--force-confold
[ -f /var/run/reboot-required ] && echo "REDEMARRAGE NECESSAIRE"
```

If the "Newer kernel available" screen appears, confirm with Enter.

Then, at a quiet hour (1 to 2 minutes of downtime):

```bash
reboot
```

Once you're logged back in:

```bash
uname -r; nginx -v; systemctl is-active nginx
systemctl list-units --type=service 'php*-fpm*' --no-legend
```

Expected: a newer kernel, nginx at 1.31.9, `active` and `running`. If you skipped block 1, nginx keeps its usual Ubuntu number (for example `1.24.0` on Ubuntu 24.04): Ubuntu patches without changing the version.

Why the kernel? Because the nginx2root chain ends with a Linux kernel flaw to become root. One honest note: according to Xint, that kernel flaw had no fix yet when their article came out. Today's reboot installs every fix already published. You'll have to run this block again when that one is released. I know. Me too.

A "quiet hour", for a server, means the night. For you too, normally. It's the kind of detail you don't read in job ads.

## The questions I get asked

### Are these flaws already being exploited?

No, not that I know of as of November 20, 2026. Neither the PHP project's advisories, nor nginx, nor the researchers report any real attack. PHP2Shell, last month, was being exploited before the fix was even out. This time, you have a small head start. Don't keep it as a souvenir.

### I'm still on PHP 8.1 or older, what should I do?

The PHP project no longer publishes releases for those branches. Ubuntu still fixes its PHP 8.1 on Ubuntu 22.04, but the real fix is moving to a supported version. In the meantime, turn off `session.upload_progress`: the `sed` line from block 2 works on every version.

### Can I protect myself from nginx2root without updating nginx?

Partly. Disabling HTTP/2 (`http2 off;`, or removing `http2` from the `listen` lines on an nginx older than 1.25.1) cuts off access to the main flaw, but not to the nine others fixed in the same version, and your sites will be slower. It's a bandage to get through one night, not a solution.

### Do I really have to reboot the server?

Yes. A new kernel does nothing as long as the old one is running. One to two minutes of downtime, at the hour when your visitors are asleep.

## I'll leave you to it

Two flaws that had been sleeping in PHP since 2001 and 2012, one in nginx since 2015. More and more, the job is about finding out on a Friday that what you installed ten years ago was broken from the start. If baking, carpentry or goat farming appeal to you, leave now, while your servers are up to date. You'll leave a good impression.

Me, I'm staying. Someone has to paste the three blocks. And if one of your sites has already had a visitor, I explain here [how to find out where the hacker got in](/en/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre).

I'll leave you to it… see you at the next flaw. Let's say in a month.

---

*Photo: [Brett Sayles](https://www.pexels.com/photo/2881229/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — still a developer, until the next flaw*
