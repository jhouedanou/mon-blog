---
title: "PHP2Shell: updating PHP on Debian and Ubuntu when Forge goes quiet"
createdAt: "2026-10-21T21:30:00Z"
image: "/images/articles/pexels-panumas-nikhomkhai-1148820.webp"
description: "PHP2Shell: two critical PHP flaws, already exploited. Forge not answering? Here is the command to update PHP over SSH on Debian and Ubuntu servers."
searchIntent: "How do I fix PHP2Shell (CVE-2026-109618, CVE-2026-109619) and update PHP-FPM over SSH on a Debian or Ubuntu server, including Laravel Forge servers?"
tags: ["tutorial", "security", "php", "linux", "development"]
---

**Short answer.** Two PHP flaws, nicknamed PHP2Shell, let an attacker take over a web server with a single request and no password. They were fixed on Wednesday, October 21, in PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and they are already being exploited. On a Laravel Forge server, automatic updates don't touch PHP: you have to do it yourself. With Forge gone quiet, here is the way through, over SSH, with the command I'm running on my servers.

## What PHP2Shell is

Two vulnerabilities, both rated 9.2 out of 10 (CVSS 4.0):

- **CVE-2026-109618**: when PHP runs out of memory at the wrong moment, it can leave a request half initialized, then clean it up as if it were valid.
- **CVE-2026-109619**: data from one request survives after being freed, and the next request handled by the same process reuses it.

In plain terms: an attacker sends a crafted request and runs their own code on the server, before your application even starts. No account needed, no vulnerable plugin needed. According to [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}, every PHP installation serving web pages is affected: PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, LiteSpeed. [watchTowr](https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/){target="_blank" rel="noopener"} reports exploitation in the wild, Cloudflare saw attempts before the fix was even out, and the US agency [CISA](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching){target="_blank" rel="noopener"} is asking everyone to patch immediately.

The fixed versions, according to [the PHP project's announcement](https://www.php.net/archive/2026.php){target="_blank" rel="noopener"}:

| Branch | Fixed version |
|---|---|
| PHP 8.5 | 8.5.12 |
| PHP 8.4 | 8.4.27 |
| PHP 8.3 | 8.3.36 |
| PHP 8.2 | 8.2.35 |
| PHP 8.1 and older | No official release: end of life |

For PHP 8.1 and older, the PHP project published source patches to build yourself, and some distributions ship them. The real fix is still moving to a supported version. And PHP 8.2 loses security support on December 31, 2026.

## Why your Forge server isn't up to date

You might think a server with Ubuntu's automatic updates is covered. It isn't. Forge installs PHP from Ondřej Surý's packages, not from Ubuntu, and `unattended-upgrades` only applies Ubuntu's own security updates. [Forge's advisory](https://laravel.com/forge/docs/knowledge-base/php-security-release-october-2026){target="_blank" rel="noopener"} says so plainly: you have to update PHP yourself, server by server, version by version.

Forge recommends its dashboard: PHP tab, "Update PHP" button. The upside is that it also repairs the package source along the way. Except tonight, Forge has gone quiet. That leaves SSH.

## The command, over SSH

Log in as root (`sudo -i`) and paste this block. It runs on Ubuntu and Debian with Nginx and PHP-FPM, which is how Forge sets servers up. The messages it prints are in French; the table below explains each message.

```bash
FIXED="8.5.12 8.4.27 8.3.36 8.2.35"
export DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a LC_ALL=C
echo "=== $(hostname) – $(lsb_release -ds 2>/dev/null)"
for f in $(grep -l 'launchpad.*ondrej/php' /etc/apt/sources.list.d/* 2>/dev/null); do cp "$f" /root/$(basename "$f").bak; sed -i 's#https\?://ppa\.launchpad\(content\)\?\.net/ondrej/php/ubuntu#https://ppa.setup-php.com/ondrej/php/ubuntu#' "$f"; echo "source modifiée : $f"; done
apt-get update 2>&1 | grep -iE 'err.*php|gpg|no_pubkey'
for v in $(ls /etc/php); do
  C=$(apt-cache policy php$v-common | awk '/Candidate/ {print $2}' | cut -d- -f1)
  if [ -n "$C" ] && echo "$FIXED" | grep -qwF "$C"; then
    echo "PHP $v : installation de $C..."
    apt-get install -qq --only-upgrade -y -o Dpkg::Options::="--force-confold" $(dpkg -l "php$v*" | awk '/^ii/ {print $2}') >/dev/null
  else
    echo "PHP $v : ⚠️ PAS DE CORRECTIF DISPONIBLE (candidat : $C) – protection temporaire seulement"
  fi
done
sed -i 's/^;\?session.upload_progress.enabled.*/session.upload_progress.enabled = 0/' /etc/php/*/fpm/php.ini
for s in $(systemctl list-units --type=service --no-legend --plain 'php*-fpm*' | awk '{print $1}'); do systemctl restart "$s"; done
for a in $(ls /home/*/*/artisan /home/*/*/current/artisan 2>/dev/null); do sudo -u $(stat -c %U $a) php $a queue:restart >/dev/null 2>&1; done
echo "=== RÉSULTAT"
for v in $(grep -rhoE 'php[0-9.]+-fpm' /etc/nginx/ 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | sort -u); do R=$(/usr/sbin/php-fpm$v -v 2>/dev/null | head -1 | awk '{print $2}'); if [ -n "$R" ] && echo "$FIXED" | grep -qwF "$R"; then echo "PHP $v : $R ✅ corrigée"; else echo "PHP $v : $R ❌ NON corrigée"; fi; done
for d in $(grep -RhE '^\s*server_name\s' /etc/nginx/sites-enabled/ 2>/dev/null | sed -E 's/^\s*server_name\s+//;s/;.*//' | tr -s ' \t' '\n' | grep -vE '^$|^_$|^localhost$|[*~]' | sort -u); do echo "DOMAINE : $d → HTTP $(curl -s -o /dev/null -m 10 -w '%{http_code}' https://$d)"; done
echo "DATE : $(date -u '+%d/%m/%Y à %H:%M') (UTC)"
```

Expect a few seconds of downtime per PHP version while PHP-FPM restarts. If you can pick the time, pick the one with the fewest visitors.

| Message | Meaning |
|---|---|
| `source modifiée` | The package source was switched from Launchpad to the mirror |
| `installation de 8.x.y` | The fixed version is being installed |
| `PAS DE CORRECTIF DISPONIBLE` | No fix available yet on your mirror: nothing installed |
| `corrigée` / `NON corrigée` | PHP-FPM is running a fixed / unfixed version |

## What the command does, step by step

**1. It repairs the package source.** Older Forge servers still point at Launchpad, the original home of the `ondrej/php` repository. Forge now uses `ppa.setup-php.com`, a mirror of that repository. The `for f in …` loop swaps one for the other, after copying the original file to `/root/` (`.bak`). That's the step Forge's button does for you, and the one people forget over SSH.

**2. It checks the fix is actually there.** `apt-get update` only shows errors about PHP or GPG keys. Then, for each installed version (`ls /etc/php`), `apt-cache policy` gives the version you are about to receive. If it isn't in the `FIXED` list, the command installs nothing and says so. That's on purpose: tonight, some packages hadn't reached the mirrors yet, especially on ARM servers (8.4 and 8.5 on arm64, according to [the mirror's maintainer](https://github.com/shivammathur/setup-php/issues/1139){target="_blank" rel="noopener"}).

**3. It upgrades every package for that version.** `--only-upgrade` installs nothing new, `--force-confold` keeps your `php.ini` and PHP-FPM pools as they are. The variables at the top stop apt and `needrestart` from pausing to ask questions. `LC_ALL=C` forces apt to answer in English: on a server set to French, it prints "Candidat" instead of "Candidate", and the command wouldn't find any version.

**4. It turns off one PHP feature as a precaution.** `session.upload_progress.enabled = 0` is one of the temporary mitigations recommended by PHP and relayed by the [Dutch NCSC](https://github.com/NCSC-NL/php2shell){target="_blank" rel="noopener"}. It's a safety net for versions not yet fixed. The downside: upload progress bars built on that feature stop working. If your site has none, leave it off.

**5. It restarts PHP-FPM and Laravel queues.** Until a process restarts, it keeps the old PHP in memory. The command restarts every `php*-fpm` service, then runs `php artisan queue:restart` for each Laravel app found under `/home`, as the user who owns it. If you use Horizon, Reverb or Octane, restart those too: `php artisan horizon:terminate`, `php artisan reverb:restart`, and for Octane, a full restart of its Supervisor program (`octane:reload` isn't enough).

**6. It reports back.** For each PHP version Nginx uses, it prints the installed PHP-FPM version, with ✅ or ❌. Then it calls every domain declared in `sites-enabled` and prints the HTTP code: `200`, `301` or `302`, the site is answering; `502`, PHP-FPM isn't running, go and look; `000`, no answer at all (a domain no longer pointing at this server, a missing certificate).

## Without Forge: Debian and Ubuntu

On Debian with the distribution's own PHP, it's simpler: fixes come through Debian's security repository, like everything else. According to [Mattias Geniar's summary](https://ma.ttias.be/php-cve-2026-109618-patch/){target="_blank" rel="noopener"}, the fixed packages are `8.4.27-1~deb13u1` for Debian 13 and `8.2.35-1~deb12u1` for Debian 12.

```bash
sudo apt-get update
apt-cache policy php8.4-fpm      # or php8.2-fpm on Debian 12
sudo apt-get install --only-upgrade $(dpkg -l 'php8.4*' 'libapache2-mod-php8.4' 2>/dev/null | awk '/^ii/ {print $2}')
sudo systemctl restart php8.4-fpm
```

If `unattended-upgrades` is on, it may already have installed the fix. Check the version anyway, and check that PHP-FPM restarted. With Apache and mod_php, it's `sudo systemctl restart apache2`: a plain `reload` isn't enough.

If you use the `packages.sury.org` repository (several PHP versions on Debian), the command from the start works as is: it only touches Launchpad sources and compares the candidate version against the list. There too, tonight, arm64 packages were lagging.

One trap on **Ubuntu without Forge**, with Ubuntu's own PHP: the distribution backports the fix to its old version without changing the number. PHP 8.3 fixed on Ubuntu 24.04 is `8.3.6-0ubuntu0.24.04.13`, and `php -v` still says 8.3.6. The command from the start doesn't recognise that as a fixed version: it installs nothing and prints "PAS DE CORRECTIF". On those servers, use the Debian method just above (replacing `8.4` with `8.3`), then check the package changelog to confirm the fix is there:

```bash
zgrep -E 'CVE-2026-10961[89]' /usr/share/doc/php8.3-fpm/changelog.Debian.gz
```

One last case: FrankenPHP bundles its own PHP, which apt doesn't update. Move to FrankenPHP 1.13.2, or rebuild the Docker image.

## If the fix isn't available yet

The command prints "PAS DE CORRECTIF DISPONIBLE"? Unless you're on Ubuntu with Ubuntu's own PHP (see above), the package hasn't reached your mirror yet. Run it again in an hour. Meanwhile:

- **The `session.upload_progress` mitigation** is already applied by the command. It lowers the risk, it doesn't remove it.
- **Cloudflare** has deployed firewall rules against the known attacks, for all customers, free plan included, according to [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}. If your site sits behind Cloudflare, that's one more layer. I told how those rules already rid me of unwanted bots in [I got my blog's traffic back (and the bots that come with it)](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).
- **The UK NCSC** advises taking offline whatever can't be fixed right away. For a brochure site that can wait until tomorrow morning, that's the safest option.

And if the server still runs PHP 8.1 or older, no amount of waiting will help: install a supported version and switch the sites to it.

## Checking no process still runs the old PHP

The command's report checks the PHP-FPM version installed on disk, not the one running in memory. To make sure no process, PHP-FPM, a forgotten worker or a script started by hand, still runs the old files:

```bash
sudo grep -lsE 'php.*\(deleted\)$' /proc/[0-9]*/maps
```

No output: nothing uses the old PHP any more. Otherwise, the number in the path (`/proc/<number>/maps`) is the process to restart.

## I'll leave you to it

A flaw that hands over a server without a password, in the language behind a good part of the Web, with attacks already under way: there isn't much to analyse, you patch. I wrote yesterday about a [hacked WordPress site](/en/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre): the bots don't target anyone in particular, they try everything, everywhere. Tonight, they're trying PHP2Shell.

I'll leave you to it… it's going to be a long night.

---

*Photo: [Panumas Nikhomkhai](https://www.pexels.com/photo/1148820/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — on SSH tonight, one server after another*
